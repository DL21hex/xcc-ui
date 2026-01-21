import { useLocation } from "@solidjs/router";
import { createEffect, For, Show, Suspense } from "solid-js";
import { createAsync } from "@solidjs/router";
import { getRequestEvent } from "solid-js/web";
import { setBreadcrumbs } from "~/components/Breadcrumb";
import { setActiveMenuItem } from "~/components/Nav";
import Card from "~/components/Card";
import CTA from "~/components/CTA";
import Nav from "~/components/Nav";
import Profile from "~/components/Profile";
import Toolbar from "~/components/Toolbar";
import IconFolderCode from '~icons/lucide/folder-code';
import IconLoaderCircle from '~icons/lucide/loader-circle';

const componentMap: Record<string, any> = { CTA, Card, Nav, Profile, Toolbar };

const getData = async (pathname: string) => {
  "use server";
  const evt = getRequestEvent();

  if (!evt) return null;

  const env = evt.nativeEvent.context.cloudflare.env;

  // 1. Obtenemos la request original que hizo el navegador
  const originalRequest = evt.request;

  // 2. Construimos la URL usando un dominio que tu Rust reconozca como válido.
  //    Si tu Rust valida el dominio 'xcc32.app', úsalo aquí.
  //    Al usar service binding, no saldrá a internet, pero el Rust recibirá ese Host.
  const urlDestino = new URL("https://app.xcc32.app" + pathname);

  // 3. Clonamos los headers originales (Cookies, Auth, Host, etc.)
  const newHeaders = new Headers(originalRequest.headers);

  // Opcional: Si Rust depende estrictamente del header Host para saber el tenant:
  newHeaders.set("Host", "app.xcc32.app");

  try {
      // 4. Hacemos el fetch al CORE_SERVICE pasando los headers
      const res = await env.CORE_SERVICE.fetch(urlDestino.toString(), {
          method: originalRequest.method,
          headers: newHeaders,
          // Si hubiera body (POST), lo pasaríamos aquí
      });

      if (!res.ok) {
          console.error("Rust Error:", await res.text());
          return null;
      }

      return await res.json();
  } catch (e) {
      console.error("Binding Error:", e);
      return null;
  }
};







export default function CatchAll()
{
	const location = useLocation();
	const pageData = createAsync(() => getData(location.pathname));

	createEffect(() => {
		const data = pageData();
		if (data) {
			if (data.breadcrumbs) setBreadcrumbs(data.breadcrumbs);
			if (data.main_menu?.set_active) setActiveMenuItem(data.main_menu.set_active);
		}
		else
		{
			setBreadcrumbs([]);
			setActiveMenuItem(null);
		}
	});

	return (
		<Suspense fallback={<Loading />}>

			<div class="bg-gray-900 text-green-400 p-4 m-4 rounded overflow-auto text-xs font-mono border border-green-700">
				<strong>DEBUG - Respuesta de RUST:</strong>
				<pre>{JSON.stringify(pageData(), null, 2)}</pre>
			</div>

			{/* 4. Usamos Show para manejar 404 vs Contenido */}
			<Show when={pageData()} fallback={<NotFound />}>
				{(data) => (
					<div class="flex flex-col gap-6">
						<For each={data().content}>
							{(item: any) => {
								const Component = componentMap[item.component];
								// Pasamos las props dinámicamente
								return Component ? <Component {...item.props} /> : null;
							}}
						</For>
					</div>
				)}
			</Show>
		</Suspense>
	);
}

function Loading() {
return (
	<div data-slot="empty" class="flex min-w-0 flex-1 flex-col items-center justify-center gap-6 rounded-lg border-dashed p-6 text-center text-balance md:p-12 w-full">
	<div data-slot="empty-header" class="flex max-w-sm flex-col items-center gap-2 text-center">
		<div data-slot="empty-icon" data-variant="icon" class="mb-2 [&_svg]:pointer-events-none [&_svg]:shrink-0 bg-muted text-foreground flex size-10 shrink-0 items-center justify-center rounded-lg [&_svg:not([class*='size-'])]:size-6">
		<IconLoaderCircle class="size-4 animate-spin" />
		</div>
		<div data-slot="empty-title" class="text-lg font-medium tracking-tight">Cargando</div>
		<div data-slot="empty-description" class="text-muted-foreground [&>a:hover]:text-primary text-sm/relaxed [&>a]:underline [&>a]:underline-offset-4">
		Por favor espere mientras cargamos el contenido.
		</div>
	</div>
	</div>
);
}

function NotFound() {
return (
	<div data-slot="empty" class="flex min-w-0 flex-1 flex-col items-center justify-center gap-6 rounded-lg border-dashed p-6 text-center text-balance md:p-12">
	<div data-slot="empty-header" class="flex max-w-sm flex-col items-center gap-2 text-center">
		<div data-slot="empty-icon" data-variant="icon" class="mb-2 [&_svg]:pointer-events-none [&_svg]:shrink-0 bg-muted text-foreground flex size-10 shrink-0 items-center justify-center rounded-lg [&_svg:not([class*='size-'])]:size-6">
		<IconFolderCode />
		</div>
		<div data-slot="empty-title" class="text-lg font-medium tracking-tight">Página no encontrada</div>
		<div data-slot="empty-description" class="text-muted-foreground [&>a:hover]:text-primary text-sm/relaxed [&>a]:underline [&>a]:underline-offset-4">
		La página que buscas no existe o ha ocurrido un error.
		</div>
	</div>
	<div data-slot="empty-content" class="flex w-full max-w-sm min-w-0 flex-col items-center gap-4 text-sm text-balance">
		<div class="flex gap-2">
		<a href="/" data-slot="button" data-variant="default" data-size="default" class="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-all disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 shrink-0 [&_svg]:shrink-0 outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive bg-primary text-primary-foreground hover:bg-primary/90 h-9 px-4 py-2 has-[>svg]:px-3">
			Volver al inicio
		</a>
		</div>
	</div>
	</div>
);
}