import { createMiddleware } from "@solidjs/start/middleware";

export default createMiddleware({
	onRequest: [
		async (event) => {
			const url = new URL(event.request.url);
			return;

			if (url.pathname.startsWith("/_build") || url.pathname.startsWith("/assets") || url.pathname.includes(".png") || url.pathname.endsWith("/login"))
			{
				return;
			}

			const cookieHeader = event.request.headers.get("Cookie");
			if (!cookieHeader || !/(?:^|; )auth_token=/.test(cookieHeader))
			{
				console.log("No auth_token cookie found");
				return redirectToLogin();
			}

			try
			{
				const response = await fetch("http://localhost/xcctechpeople/tools/sandbox/validate_session_public", {
					method: "GET",
					headers: {
						Cookie: cookieHeader,
						"Content-Type": "application/json",
					},
				});

				if (!response.ok)
				{
					return redirectToLogin();
				}
			}
			catch (error)
			{
				return redirectToLogin();
			}
		},
	],
});

function redirectToLogin()
{
    return new Response(null, {
        status: 302,
        headers: {
            Location: "/login",
            "Cache-Control": "no-store",
        },
    });
}