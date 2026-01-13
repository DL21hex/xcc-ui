export async function request<T>(url: string, options: RequestInit = {}): Promise<T>
{
	options.credentials = "include";
	const response = await fetch(url, options);

	if (response.status === 401)
	{
		if (typeof window !== "undefined")
		{
			window.location.href = "/login";
		}

		return new Promise(() => {});
	}

	let data: any;
	const contentType = response.headers.get("content-type");
	if (contentType && contentType.indexOf("application/json") !== -1)
	{
		try
		{
			data = await response.json();
		}
		catch (e)
		{
			// Ignore JSON parse error if it's not JSON
		}
	}

	return data as T;
}
