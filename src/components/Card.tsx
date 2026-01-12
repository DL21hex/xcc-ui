import { Show } from "solid-js";

interface CardProps {
  icon: string;
  title: string;
  description: string;
  href?: string;
}

const iconMap: Record<string, string> = {
  "certificate": 'M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z M9 10h.01 M13 10h.01',
  "document": 'M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z M14 2v6h6 M12 19v-2 M8 19v-2',
  "check-circle": 'M22 11.08V12a10 10 0 1 1-5.93-9.14 M22 4l-8.97 8.97 M3.5 8.5l1.42-1.42 M17.5 10.5l1.42-1.42 M20.5 8.5l-1.42 1.42 M5.5 16.5l-1.42 1.42',
};

const cardClass = "rounded-lg border border-border bg-card p-4 transition-all duration-200";
const hoverClass = "cursor-pointer hover:shadow-md hover:border-primary/50";

export default function Card(props: CardProps) {
  return (
    <Show
      when={props.href}
      fallback={
        <div class={cardClass}>
          <CardContent {...props} />
        </div>
      }
    >
      <a href={props.href} class={`${cardClass} ${hoverClass} block`}>
        <CardContent {...props} />
      </a>
    </Show>
  );
}

function CardContent(props: CardProps) {
  return (
    <div class="flex items-start gap-3">
      <div class="flex-shrink-0 mt-1">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
          class="h-6 w-6 text-primary"
        >
          <path d={iconMap[props.icon] || ""}></path>
        </svg>
      </div>
      <div class="flex-1 min-w-0">
        <h3 class="font-semibold text-foreground">{props.title}</h3>
        <p class="text-sm text-muted-foreground mt-1">{props.description}</p>
      </div>
    </div>
  );
}
