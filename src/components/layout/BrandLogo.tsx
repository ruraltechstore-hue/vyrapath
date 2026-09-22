import { cn } from "@/lib/utils";

type BrandLogoProps = {
  className?: string;
  size?: "sm" | "md" | "lg";
};

const sizeClasses = {
  sm: "h-10",
  md: "h-12",
  lg: "h-16",
} as const;

export function BrandLogo({ className, size = "md" }: BrandLogoProps) {
  const isLg = size === "lg";
  
  return (
    <div className={cn("flex items-center", isLg ? "gap-4" : "gap-3", className)}>
      <img
        src="/images/vyrapath-logo.png"
        alt="VYRAPATH — Your path to global career"
        className={cn(sizeClasses[size], "w-auto object-contain rounded-md shadow-sm")}
      />
      <div className="flex flex-col justify-center">
        <span className={cn("font-display font-bold tracking-tight leading-none", isLg ? "text-3xl" : "text-xl")}>
          VYRAPATH
        </span>
        <span className={cn("font-medium tracking-wide text-muted-foreground uppercase leading-none mt-1", isLg ? "text-xs sm:text-sm" : "text-[10px] sm:text-xs")}>
          Affiliated with Samrik Solutions
        </span>
      </div>
    </div>
  );
}
