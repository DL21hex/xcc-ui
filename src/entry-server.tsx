import { createHandler, StartServer } from "@solidjs/start/server";

export default createHandler(() => {
	return (
		<StartServer
			document={({ assets, children, scripts }) => (
			<html lang="es" class="--font-inter h-full">
				<head>
					<meta charset="utf-8" />
					<meta name="viewport" content="width=device-width, initial-scale=1" />
					<link rel="icon" href="/favicon.png" />
					{assets}
				</head>
				<body class="font-sans antialiased h-full overflow-hidden">
					{children}
				{scripts}
				</body>
			</html>
			)}
		/>
	);
});