import { createSignal, For, Suspense, createEffect } from "solid-js";
import CTA from "~/components/CTA";
import Card from "~/components/Card";

interface ComponentItem {
  component: string;
  props: Record<string, any>;
}

const componentMap: Record<string, any> = {
  CTA: CTA,
  Card: Card,
};

export default function Home() {
  const [items, setItems] = createSignal<ComponentItem[]>([]);
  const [loading, setLoading] = createSignal(true);
  const [error, setError] = createSignal<string | null>(null);

  const fetchContent = async () => {
    try {
      setLoading(true);
      setError(null);
      console.log("Fetching from /api/home");
      const response = await fetch("/api/home");

      if (!response.ok) {
        throw new Error(`Error ${response.status}: ${response.statusText}`);
      }

      const data = await response.json() as ComponentItem[];
      setItems(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Error desconocido");
      setItems([]);
    } finally {
      setLoading(false);
    }
  };

  createEffect(() => {
    fetchContent();
  });

  return (
    <Suspense fallback={<div class="text-muted-foreground">Cargando...</div>}>
      {loading() && <div class="text-muted-foreground">Cargando...</div>}
      {error() && <div class="text-destructive">Error: {error()}</div>}
      {!loading() && !error() && (
        <div class="flex flex-col gap-6">
          <For each={items()}>
            {(item) => {
              const Component = componentMap[item.component];
              return Component ? <Component {...item.props} /> : null;
            }}
          </For>
        </div>
      )}
    </Suspense>
  );
}
