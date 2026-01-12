import { createSignal, Show } from "solid-js";

const typeColorMap: Record<string, { border: string; bg: string; badge: string; icon: string; button: string }> = {
  warning: {
    border: "border-l-amber-500",
    bg: "bg-gradient-to-r from-amber-50 to-white",
    badge: "bg-amber-100 text-amber-700",
    icon: "text-amber-500 bg-amber-100",
    button: "bg-amber-600 hover:bg-amber-700",
  },
  info: {
    border: "border-l-blue-500",
    bg: "bg-gradient-to-r from-blue-50 to-white",
    badge: "bg-blue-100 text-blue-700",
    icon: "text-blue-500 bg-blue-100",
    button: "bg-blue-600 hover:bg-blue-700",
  },
  success: {
    border: "border-l-green-500",
    bg: "bg-gradient-to-r from-green-50 to-white",
    badge: "bg-green-100 text-green-700",
    icon: "text-green-500 bg-green-100",
    button: "bg-green-600 hover:bg-green-700",
  },
};

interface CTAProps {
  type: "warning" | "info" | "success";
  badge: string;
  title: string;
  description: string;
  button_name: string;
  button_href: string;
}

export default function CTA(props: CTAProps) {
  const [isDismissed, setIsDismissed] = createSignal(false);
  const colors = typeColorMap[props.type] || typeColorMap.warning;

  return (
    <Show when={!isDismissed()}>
      <div
        data-slot="card"
        class={`text-card-foreground flex flex-col gap-6 rounded-xl border py-6 border-l-4 overflow-hidden transition-all duration-300 hover:shadow-md shadow-sm ${colors.border} ${colors.bg}`}
      >
        <div data-slot="card-content" class="p-4 sm:p-5">
        <div class="flex items-start gap-4">
          <div class={`p-2.5 rounded-xl ${colors.icon} shrink-0`}>
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
              class="lucide h-5 w-5"
            >
              <circle cx="12" cy="12" r="10"></circle>
              <line x1="12" x2="12" y1="8" y2="12"></line>
              <line x1="12" x2="12.01" y1="16" y2="16"></line>
            </svg>
          </div>
          <div class="flex-1 min-w-0">
            <div class="flex items-center gap-2 mb-1">
              <span
                data-slot="badge"
                class={`inline-flex items-center justify-center rounded-md border px-2 py-0.5 w-fit whitespace-nowrap shrink-0 text-xs font-medium ${colors.badge}`}
              >
                {props.badge}
              </span>
            </div>
            <h3 class="font-semibold text-slate-900 mb-1">{props.title}</h3>
            <p class="text-sm text-muted-foreground line-clamp-2">
              {props.description}
            </p>
          </div>
          <div class="flex items-center gap-2 shrink-0">
            <a href={props.button_href}>
              <button
                data-slot="button"
                class={`inline-flex items-center justify-center whitespace-nowrap text-sm font-medium transition-all disabled:pointer-events-none disabled:opacity-50 h-8 rounded-md gap-1.5 px-3 text-white ${colors.button}`}
              >
                {props.button_name}
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
                  class="lucide lucide-arrow-right h-4 w-4 ml-1.5"
                >
                  <path d="M5 12h14"></path>
                  <path d="m12 5 7 7-7 7"></path>
                </svg>
              </button>
            </a>
            <button
              data-slot="button"
              class="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-all hover:bg-accent size-9 h-8 w-8 text-muted-foreground hover:text-slate-700"
              onClick={() => setIsDismissed(true)}
            >
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
                class="lucide lucide-x h-4 w-4"
              >
                <path d="M18 6 6 18"></path>
                <path d="m6 6 12 12"></path>
              </svg>
              <span class="sr-only">Descartar</span>
            </button>
          </div>
        </div>
        </div>
      </div>
    </Show>
  );
}
