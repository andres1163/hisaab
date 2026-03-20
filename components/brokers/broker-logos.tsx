"use client";

import { cn } from "@/lib/utils";

interface LogoProps {
  className?: string;
}

function ZerodhaLogo({ className }: LogoProps) {
  return (
    <div className={cn("flex items-center gap-1.5", className)}>
      <svg viewBox="0 0 24 24" className="h-4 w-4" fill="currentColor" aria-hidden="true">
        <path d="M20.378 5.835A27.267 27.267 0 0124 12.169V0H13.666c2.486 1.343 4.763 3.308 6.712 5.835zM5.48 1.297c-1.914 0-3.755.409-5.48 1.166V24h22.944C22.766 11.44 15 1.297 5.48 1.297z" />
      </svg>
      <span className="text-xs font-semibold tracking-tight">Zerodha</span>
    </div>
  );
}

function GrowwLogo({ className }: LogoProps) {
  return (
    <div className={cn("flex items-center gap-1.5", className)}>
      <svg viewBox="0 0 24 24" className="h-4 w-4" fill="currentColor" aria-hidden="true">
        <path d="M3 17l4-4 4 4 6-8 4 4" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" fill="none" />
        <circle cx="21" cy="13" r="2" fill="currentColor" />
      </svg>
      <span className="text-xs font-semibold tracking-tight">Groww</span>
    </div>
  );
}

function UpstoxLogo({ className }: LogoProps) {
  return (
    <div className={cn("flex items-center gap-1.5", className)}>
      <svg viewBox="0 0 24 24" className="h-4 w-4" fill="currentColor" aria-hidden="true">
        <path d="M4 18V6l8 6-8 6z" />
        <path d="M12 18V6l8 6-8 6z" opacity="0.6" />
      </svg>
      <span className="text-xs font-semibold tracking-tight">Upstox</span>
    </div>
  );
}

function AngelOneLogo({ className }: LogoProps) {
  return (
    <div className={cn("flex items-center gap-1.5", className)}>
      <svg viewBox="0 0 24 24" className="h-4 w-4" fill="currentColor" aria-hidden="true">
        <path d="M12 2L2 22h20L12 2zm0 5l6.5 13h-13L12 7z" />
      </svg>
      <span className="text-xs font-semibold tracking-tight">Angel One</span>
    </div>
  );
}

export function BrokerStrip() {
  return (
    <div className="flex flex-col items-center gap-3">
      <p className="text-[10px] uppercase tracking-widest text-muted-foreground/50 font-medium">
        Works with
      </p>
      <div className="flex items-center justify-center gap-5 sm:gap-8 flex-wrap text-muted-foreground/40">
        <ZerodhaLogo />
        <GrowwLogo />
        <UpstoxLogo />
        <AngelOneLogo />
      </div>
    </div>
  );
}
