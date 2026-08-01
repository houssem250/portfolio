"use client";

import * as React from "react";
import { Dialog } from "@base-ui/react/dialog";
import { Menu, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { navigationItems } from "@/content/navigation";
import { useActiveSection } from "@/hooks/use-active-section";

const sectionIds = navigationItems.map((item) => item.href.replace(/^#/, ""));

export function MobileNav() {
  const [open, setOpen] = React.useState(false);
  const activeId = useActiveSection(sectionIds);
  const isAtTop = activeId === "" || activeId === "home";

  return (
    <Dialog.Root open={open} onOpenChange={setOpen}>
      <Dialog.Trigger
        className="lg:hidden inline-flex size-9 items-center justify-center rounded-md text-muted-foreground hover:text-foreground hover:bg-muted/50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring transition-colors"
        aria-label="Toggle Menu"
      >
        <Menu className="size-5" />
      </Dialog.Trigger>
      <Dialog.Portal>
        {/* Backdrop for the drawer */}
        <Dialog.Backdrop
          className="fixed inset-0 z-50 bg-background/80 backdrop-blur-sm transition-opacity duration-200 data-[state=closed]:opacity-0"
        />
        {/* Popup (Drawer Container) */}
        <Dialog.Popup
          className="fixed inset-y-0 right-0 z-50 w-full max-w-xs border-l border-border bg-background p-6 shadow-xl flex flex-col transition-transform duration-250 ease-in-out data-[state=closed]:translate-x-full"
        >
          <Dialog.Title className="sr-only">Navigation Menu</Dialog.Title>
          <Dialog.Description className="sr-only">
            Mobile menu to navigate between sections of the portfolio.
          </Dialog.Description>

          <div className="flex justify-between items-center mb-8">
            <span className="font-semibold text-lg tracking-tight">Navigation</span>
            <Dialog.Close
              className="inline-flex size-8 items-center justify-center rounded-md text-muted-foreground hover:text-foreground hover:bg-muted/50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring transition-colors"
              aria-label="Close menu"
            >
              <X className="size-4" />
            </Dialog.Close>
          </div>

          <nav className="flex flex-col gap-5 text-base font-medium">
            {navigationItems.map((item) => {
              const id = item.href.replace(/^#/, "");
              const isActive = id === "home" ? isAtTop : id === activeId;
              return (
                <a
                  key={item.href}
                  href={item.href}
                  onClick={() => setOpen(false)}
                  aria-current={isActive ? "page" : undefined}
                  className={cn(
                    "py-2.5 border-b border-border/20 text-sm font-medium transition-colors",
                    isActive
                      ? "text-foreground"
                      : "text-muted-foreground hover:text-foreground",
                  )}
                >
                  {item.label}
                </a>
              );
            })}
          </nav>
        </Dialog.Popup>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
