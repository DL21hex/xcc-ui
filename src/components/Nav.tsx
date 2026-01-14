import { For, createSignal, createEffect, type Component, type JSX } from "solid-js";
import IconHome from '~icons/lucide/home';
import IconHCM from '~icons/lucide/users';
import IconFinancial from '~icons/lucide/trending-up';
import IconFactory from '~icons/lucide/factory';
import IconShoppingCart from '~icons/lucide/shopping-cart';
import IconIT from '~icons/lucide/bot';
import IconHAS from '~icons/lucide/hard-hat';
import IconWatchmen from '~icons/lucide/shield-user';

export const [activeMenuItem, setActiveMenuItem] = createSignal<string | null>(null);

const iconMap: Record<string, Component<JSX.SvgSVGAttributes<SVGSVGElement>>> = {
  home: IconHome,
  hcm: IconHCM,
  financial: IconFinancial,
  has: IconHAS,
  production: IconFactory,
  purchasing: IconShoppingCart,
  it: IconIT,
  watchmen: IconWatchmen,
};

interface MenuItem {
  id: string;
  label: string;
  href: string;
  icon: string;
  is_active?: boolean;
}

interface NavProps {
  items?: MenuItem[];
  set_active?: string;
  collapsed?: boolean;
}

export default function Nav(props: NavProps) {
  createEffect(() => {
    if (props.set_active) {
      setActiveMenuItem(props.set_active);
    }
  });

  if (!props.items) {
    return null;
  }

  return (
    <>
      <div class={`px-3 mb-2 ${props.collapsed ? 'hidden' : ''}`}>
        <span class="text-[11px] font-medium text-muted-foreground uppercase tracking-wider px-3">
          Menú principal
        </span>
      </div>
      <nav class={`space-y-0.5 px-3`}>
        <For each={props.items}>
          {(item) => {
            const IconComponent = iconMap[item.icon];
            return (
              <div>
                <a
                  href={item.href}
                  class={`flex items-center w-full rounded-md text-[13px] font-medium transition-all duration-150 ${props.collapsed ? 'justify-center px-2' : 'justify-between px-3'} py-2 ${
                    (activeMenuItem() ? item.id === activeMenuItem() : item.is_active)
                      ? "bg-sidebar-accent text-sidebar-accent-foreground"
                      : "text-sidebar-foreground/70 hover:bg-sidebar-accent/50 hover:text-sidebar-foreground"
                  }`}
                  data-state="closed"
                  data-slot="tooltip-trigger"
                  title={props.collapsed ? item.label : undefined}
                >
                  <div class={`flex items-center ${props.collapsed ? 'gap-0' : 'gap-3'}`}>
                    {IconComponent && (
                      <IconComponent
                        class={`lucide h-[18px] w-[18px] shrink-0 ${
                          (activeMenuItem() ? item.id === activeMenuItem() : item.is_active)
                            ? "text-sidebar-accent-foreground"
                            : "text-sidebar-foreground/60"
                        }`}
                      />
                    )}
                    <span class={props.collapsed ? 'hidden' : ''}>{item.label}</span>
                  </div>
                </a>
              </div>
            );
          }}
        </For>
      </nav>
    </>
  );
}
