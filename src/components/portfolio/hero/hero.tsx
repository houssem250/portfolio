import * as React from "react";
import { HeroContent } from "./hero-content";
import { HeroActions } from "./hero-actions";
import { SocialLinks } from "./social-links";
import { HeroImage } from "./hero-image";

export function Hero() {
  return (
    <section
      id="home"
      className="relative flex items-center justify-center py-16 sm:py-24 lg:py-32 overflow-hidden w-full min-h-[calc(100vh-4rem)]"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 w-full relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 items-center gap-12 lg:gap-8 w-full">
          {/* Content (Left Column) - Order 2 on mobile, Order 1 on desktop */}
          <div className="flex flex-col gap-8 lg:col-span-7 order-2 lg:order-1 items-start max-w-xl lg:max-w-none mx-auto lg:mx-0 w-full">
            <HeroContent />
            <div className="flex flex-col gap-6 w-full items-start">
              <HeroActions />
              <div className="pt-2">
                <SocialLinks />
              </div>
            </div>
          </div>

          {/* Graphic/Illustration (Right Column) - Order 1 on mobile, Order 2 on desktop */}
          <div className="lg:col-span-5 order-1 lg:order-2 w-full flex justify-center lg:justify-end">
            <HeroImage />
          </div>
        </div>
      </div>
    </section>
  );
}
