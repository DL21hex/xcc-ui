export async function request<T>(url: string, options?: RequestInit): Promise<T> {
  const response = await fetch(url, options);

  // Try to parse JSON regardless of status, as errors might be JSON
  let data: any;
  const contentType = response.headers.get("content-type");
  if (contentType && contentType.indexOf("application/json") !== -1) {
    try {
        data = await response.json();
    } catch (e) {
        // Ignore JSON parse error if it's not JSON
    }
  }

  // Handle the specific auth redirect structure
  if (data && typeof data === 'object' && 'redirect' in data) {
    if (data.redirect === '/login') {
         // Create a synthetic delay to show notif if needed?
         // For now, immediate redirect.
         // Since we are likely on the client, use window.location
         if (typeof window !== 'undefined') {
             // Prevent infinite loop if already on the target page
             if (window.location.pathname !== data.redirect) {
                window.location.href = data.redirect;
                // Return a promise that never resolves so the calling code doesn't try to use 'data' as T
                return new Promise(() => {});
             } else {
                 throw new Error(data.notification?.message || "Redirect loop detected");
             }
         }
    }
  }

  return data as T;
}
