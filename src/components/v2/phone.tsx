import Image, { type StaticImageData } from "next/image";
import { cn } from "@/lib/utils";

/**
 * Realistic iPhone-style frame. All dimensions derive from `--w` (the outer width),
 * so set it with a class, e.g. `[--w:260px] md:[--w:300px]`.
 */
export function Phone({
  src,
  alt,
  statusBg = "#836656",
  statusFg = "#ffffff",
  priority,
  className,
  children,
}: {
  src?: StaticImageData;
  alt?: string;
  /** Coded screen content; sized in `em` (1em ≈ 4% of the phone width). */
  children?: React.ReactNode;
  statusBg?: string;
  statusFg?: string;
  priority?: boolean;
  className?: string;
}) {
  const u = (n: number) => `calc(var(--w) * ${n})`;
  const button = "absolute w-[3px] bg-gradient-to-b from-[#b9b9be] via-[#8d8d93] to-[#b9b9be]";

  return (
    <div className={cn("relative w-(--w)", className)}>
      {/* Hardware buttons */}
      <span className={cn(button, "-left-[2px] rounded-l-[2px]")} style={{ top: u(0.36), height: u(0.07) }} />
      <span className={cn(button, "-left-[2px] rounded-l-[2px]")} style={{ top: u(0.5), height: u(0.13) }} />
      <span className={cn(button, "-left-[2px] rounded-l-[2px]")} style={{ top: u(0.67), height: u(0.13) }} />
      <span className={cn(button, "-right-[2px] rounded-r-[2px]")} style={{ top: u(0.55), height: u(0.2) }} />

      {/* Titanium rim */}
      <div
        className="relative bg-[linear-gradient(140deg,#f0f0f2_0%,#a9a9ae_22%,#e4e4e7_48%,#9b9ba0_76%,#d6d6d9_100%)] shadow-[0_50px_100px_-30px_rgba(15,23,42,0.45),0_20px_40px_-20px_rgba(15,23,42,0.25)]"
        style={{ padding: u(0.011), borderRadius: u(0.175) }}
      >
        {/* Black bezel */}
        <div className="bg-[#060606]" style={{ padding: u(0.034), borderRadius: u(0.164) }}>
          {/* Screen */}
          <div
            className="relative isolate aspect-[0.462] overflow-hidden bg-white"
            style={{ borderRadius: u(0.128) }}
          >
            {/* Status bar */}
            <div
              className={cn(
                "z-10 flex items-center justify-between font-ui font-semibold",
                statusBg === "transparent" ? "absolute inset-x-0 top-0" : "relative",
              )}
              style={{
                height: u(0.125),
                paddingInline: u(0.085),
                paddingTop: u(0.012),
                fontSize: u(0.043),
                backgroundColor: statusBg,
                color: statusFg,
              }}
            >
              <span>9:41</span>
              <span className="flex items-center" style={{ gap: u(0.014) }}>
                <svg viewBox="0 0 18 12" fill="currentColor" style={{ height: u(0.032) }} aria-hidden>
                  <rect x="0" y="8" width="3" height="4" rx="0.8" />
                  <rect x="5" y="5.5" width="3" height="6.5" rx="0.8" />
                  <rect x="10" y="3" width="3" height="9" rx="0.8" />
                  <rect x="15" y="0" width="3" height="12" rx="0.8" />
                </svg>
                <svg viewBox="0 0 16 12" fill="currentColor" style={{ height: u(0.032) }} aria-hidden>
                  <path d="M8 2.2c2.3 0 4.4.9 6 2.4l1.3-1.4A10.4 10.4 0 0 0 8 .3 10.4 10.4 0 0 0 .7 3.2L2 4.6a8.5 8.5 0 0 1 6-2.4Zm0 3.8c1.3 0 2.5.5 3.4 1.3l1.3-1.4A6.6 6.6 0 0 0 8 4.1 6.6 6.6 0 0 0 3.3 5.9l1.3 1.4C5.5 6.5 6.7 6 8 6Zm0 3.8c.4 0 .8.2 1.1.4L8 11.7 6.9 10.2c.3-.2.7-.4 1.1-.4Z" />
                </svg>
                <svg viewBox="0 0 27 12" fill="none" style={{ height: u(0.034) }} aria-hidden>
                  <rect x="0.5" y="0.5" width="23" height="11" rx="3.2" stroke="currentColor" opacity="0.45" />
                  <rect x="2" y="2" width="18" height="8" rx="2" fill="currentColor" />
                  <path d="M25 4v4c.8-.3 1.4-1.1 1.4-2S25.8 4.3 25 4Z" fill="currentColor" opacity="0.5" />
                </svg>
              </span>
            </div>

            {/* Dynamic Island */}
            <div
              className="absolute left-1/2 z-20 -translate-x-1/2 rounded-full bg-black"
              style={{ top: u(0.028), width: u(0.3), height: u(0.088) }}
            />

            {children ? (
              <div className="absolute inset-0 font-ui" style={{ fontSize: u(0.04) }}>
                {children}
              </div>
            ) : (
              src && <Image src={src} alt={alt ?? ""} priority={priority} placeholder="blur" sizes="320px" className="block h-auto w-full" />
            )}

            {/* Home indicator */}
            <div
              className="absolute left-1/2 z-20 -translate-x-1/2 rounded-full bg-black/80"
              style={{ bottom: u(0.022), width: u(0.36), height: u(0.012) }}
            />

            {/* Glass reflection */}
            <div className="pointer-events-none absolute inset-0 z-30 bg-[linear-gradient(118deg,rgba(255,255,255,0.22)_0%,rgba(255,255,255,0.04)_32%,transparent_33%)]" />
          </div>
        </div>
      </div>
    </div>
  );
}
