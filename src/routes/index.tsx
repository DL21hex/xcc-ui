import { For } from "solid-js";
import CTA from "~/components/CTA";
import Card from "~/components/Card";
import homeData from "~/data/home.json";

interface ComponentItem {
  component: string;
  props: Record<string, any>;
}

const componentMap: Record<string, any> = {
  CTA: CTA,
  Card: Card,
};

export default function Home() {
  const items = homeData as ComponentItem[];

  return (
    <div class="flex flex-col gap-6">
      <For each={items}>
        {(item) => {
          const Component = componentMap[item.component];
          return Component ? <Component {...item.props} /> : null;
        }}
      </For>
    </div>
  );
}