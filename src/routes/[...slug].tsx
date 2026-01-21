import { useLocation, useNavigate } from "@solidjs/router";
import { createEffect, For, Show, Suspense } from "solid-js";
import { createAsync, redirect } from "@solidjs/router";
import { getRequestEvent, isServer } from "solid-js/web";
import { setBreadcrumbs } from "~/components/Breadcrumb";
import { setActiveMenuItem } from "~/components/Nav";
import Card from "~/components/Card";
import CTA from "~/components/CTA";
import Nav from "~/components/Nav";
import Profile from "~/components/Profile";
import Toolbar from "~/components/Toolbar";
import IconFolderCode from '~icons/lucide/folder-code';
import IconLoaderCircle from '~icons/lucide/loader-circle';

// Mapa de componentes dinámicos
const componentMap: Record<string, any> = { CTA, Card, Nav, Profile, Toolbar };

/**
 * Función del Servidor (Server Function)
 * Recibe el pathname y el token (pasado desde el cliente)
 */
const getData = async (pathname: string, token?: string | null) => {
  "use server";
  const evt = getRequestEvent();

  if (!evt) return null;

  // --- CORRECCIÓN AQUÍ ---
  // Si no hay token, NO llamamos al backend.
  // Esto previene que el servidor (que nunca tiene token) reciba un 401 y cause un error.
  if (!token) {
      // Retornamos null silenciosamente.
      // El createEffect del cliente se encargará de redirigir si es necesario.
      return null;
  }

  const env = evt.nativeEvent.context.cloudflare.env;
  const originalRequest = evt.request;
  const urlDestino = new URL("https://app.xcc32.app" + pathname);

  const newHeaders = new Headers(originalRequest.headers);
  newHeaders.set("Host", "app.xcc32.app");
  newHeaders.set("Authorization", `Bearer ${token}`);

  try {
      const res = await env.CORE_SERVICE.fetch(urlDestino.toString(), {
          method: originalRequest.method,
          headers: newHeaders,
      });

      // Si Rust nos dice 401, aquí sí redirigimos (porque significa que el token ERA válido pero expiró)
      if (res.status === 401) {
          throw redirect("/login");
      }

      if (!res.ok) {
          console.error("Rust Error:", await res.text());
          return null;
      }

      return await res.json();
  } catch (e: any) {
      if (e instanceof Response || (e.response && e.response instanceof Response)) {
          throw e;
      }
      console.error("Binding Error:", e);
      return null;
  }
};
export default function CatchAll()
{
    const location = useLocation();
    const navigate = useNavigate();

    // Helper para obtener el token solo en el lado del cliente
    const getToken = () => {
        if (!isServer) {
            return localStorage.getItem("auth_token");
        }
        return null;
    };

    // Llamamos a getData pasando el token actual
    const pageData = createAsync(() => getData(location.pathname, getToken()));

    createEffect(() => {
        // 1. Validación Client-Side: Si no hay token en el navegador, mandar al login
        if (!isServer) {
            const token = localStorage.getItem("auth_token");
            if (!token) {
                navigate("/login", { replace: true });
                return;
            }
        }

        // 2. Procesar datos si llegaron
        const data = pageData();
        if (data) {
            if (data.breadcrumbs) setBreadcrumbs(data.breadcrumbs);
            if (data.main_menu?.set_active) setActiveMenuItem(data.main_menu.set_active);
        }
        else
        {
            // Limpieza si no hay datos o es 404
            setBreadcrumbs([]);
            setActiveMenuItem(null);
        }
    });

    return (
        <Suspense fallback={<Loading />}>
            <Show when={pageData()} fallback={<NotFound />}>
                {(data) => (
                    <div class="flex flex-col gap-6">
                        <For each={data().content}>
                            {(item: any) => {
                                const Component = componentMap[item.component];
                                // Renderizado dinámico de componentes
                                return Component ? <Component {...item.props} /> : null;
                            }}
                        </For>
                    </div>
                )}
            </Show>
        </Suspense>
    );
}

// --- COMPONENTES AUXILIARES ---

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