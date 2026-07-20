import { cn } from "@/lib/utils";

type BrandLogoProps = {
  className?: string;
  size?: "sm" | "md" | "lg";
};

const sizeClasses = {
  sm: "h-9",
  md: "h-10",
  lg: "h-12",
} as const;

export function BrandLogo({ className, size = "md" }: BrandLogoProps) {
  return (
    <img
      src="/images/vyrapath-logo.png"
      alt="VYRAPATH — Your path to global career"
      className={cn(sizeClasses[size], "w-auto object-contain", className)}
    />
  );
}
