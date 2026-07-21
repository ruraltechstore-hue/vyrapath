import { useLayoutEffect, useMemo, useRef, useState } from "react";
import worldMap from "@svg-maps/world";
import { Card } from "@/components/ui/card";
import { serviceRegions } from "@/data/site";
import { cn } from "@/lib/utils";

const HIGHLIGHTED_CODES = new Set(serviceRegions.map((region) => region.code));

const REGION_COLORS: Record<string, { fill: string; fillHover: string; line: string }> = {
  us: { fill: "#3d5a99", fillHover: "#4a6bb5", line: "#3d5a99" },
  ie: { fill: "#4caf50", fillHover: "#5ec462", line: "#4caf50" },
  gb: { fill: "#e53935", fillHover: "#ef5350", line: "#e53935" },
  de: { fill: "#f5b731", fillHover: "#ffc947", line: "#f5b731" },
};

/** Label offset from the computed country anchor (map units). */
const LABEL_OFFSET: Record<string, { dx: number; dy: number; width: number }> = {
  us: { dx: -155, dy: 125, width: 82 },
  ie: { dx: -150, dy: -28, width: 96 },
  gb: { dx: 8, dy: -105, width: 72 },
  de: { dx: 48, dy: -100, width: 104 },
};

type Point = { x: number; y: number };

type RegionLayout = {
  marker: Point;
  label: Point & { width: number };
  elbow: Point;
};

function anchorFromBBox(code: string, box: DOMRect): Point {
  if (code === "us") {
    // Continental US — full-US bbox is skewed by Alaska/Hawaii.
    return {
      x: box.x + box.width * 0.3,
      y: box.y + box.height * 0.58,
    };
  }

  return {
    x: box.x + box.width / 2,
    y: box.y + box.height / 2,
  };
}

function buildLayout(code: string, marker: Point): RegionLayout {
  const offset = LABEL_OFFSET[code];
  const labelCenterX = marker.x + offset.dx;
  const labelY = marker.y + offset.dy;

  return {
    marker,
    label: {
      x: labelCenterX - offset.width / 2,
      y: labelY,
      width: offset.width,
    },
    elbow: {
      x: marker.x + offset.dx * 0.45,
      y: marker.y + offset.dy * 0.45,
    },
  };
}

const LABEL_HEIGHT = 30;

function RegionCallout({
  layout,
  name,
  fill,
  line,
  active,
  onEnter,
  onLeave,
}: {
  layout: RegionLayout;
  name: string;
  fill: string;
  line: string;
  active: boolean;
  onEnter: () => void;
  onLeave: () => void;
}) {
  const { marker, label, elbow } = layout;
  const labelLeft = label.x;
  const dotX = labelLeft + 14;
  const textX = labelLeft + 28;
  const labelAnchorX = label.x + label.width / 2;

  return (
    <g
      className="cursor-pointer transition-opacity duration-300"
      opacity={active ? 1 : 0.92}
      onMouseEnter={onEnter}
      onMouseLeave={onLeave}
    >
      <polyline
        points={`${marker.x},${marker.y} ${elbow.x},${elbow.y} ${labelAnchorX},${label.y}`}
        fill="none"
        stroke={line}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        opacity={active ? 1 : 0.75}
      />

      <circle
        cx={marker.x}
        cy={marker.y}
        r={active ? 7 : 5.5}
        fill={fill}
        stroke="#ffffff"
        strokeWidth="2"
        className="transition-all duration-300"
      />
      {active && (
        <circle cx={marker.x} cy={marker.y} r="14" fill={fill} opacity="0.2" className="animate-orbit-pulse" />
      )}

      <rect
        x={labelLeft}
        y={label.y - LABEL_HEIGHT / 2}
        width={label.width}
        height={LABEL_HEIGHT}
        rx="8"
        fill="#ffffff"
        stroke={active ? line : "#d1d5db"}
        strokeWidth={active ? 1.5 : 1}
        className="transition-all duration-300"
        filter={active ? "url(#labelShadow)" : undefined}
      />
      <circle cx={dotX} cy={label.y} r="5" fill={fill} />
      <text
        x={textX}
        y={label.y + 4}
        className="fill-foreground text-[11px] font-semibold"
        style={{ fontFamily: "var(--font-sans)" }}
      >
        {name}
      </text>
    </g>
  );
}

export function ServiceRegionsMap() {
  const locations = useMemo(() => worldMap.locations, []);
  const [activeRegion, setActiveRegion] = useState<string | null>(null);
  const [layouts, setLayouts] = useState<Record<string, RegionLayout>>({});
  const pathRefs = useRef<Record<string, SVGPathElement | null>>({});

  useLayoutEffect(() => {
    const next: Record<string, RegionLayout> = {};

    for (const region of serviceRegions) {
      const path = pathRefs.current[region.code];
      if (!path) continue;

      const box = path.getBBox();
      const marker = anchorFromBBox(region.code, box);
      next[region.code] = buildLayout(region.code, marker);
    }

    setLayouts(next);
  }, [locations]);

  return (
    <div className="max-w-5xl mx-auto">
      <Card className="overflow-hidden rounded-3xl border-border/60 bg-white shadow-elegant">
        <div className="relative bg-white p-4 sm:p-8">
          <svg
            role="img"
            aria-label="World map showing VYRAPATH service regions: USA, UK, Ireland, and Germany"
            viewBox={worldMap.viewBox}
            className="h-auto w-full"
            preserveAspectRatio="xMidYMid meet"
          >
            <defs>
              <filter id="labelShadow" x="-20%" y="-30%" width="140%" height="160%">
                <feDropShadow dx="0" dy="2" stdDeviation="4" floodColor="#000000" floodOpacity="0.12" />
              </filter>
              <filter id="countryLift" x="-15%" y="-15%" width="130%" height="130%">
                <feDropShadow dx="0" dy="2" stdDeviation="3" floodOpacity="0.18" />
              </filter>
            </defs>

            <rect width="1010" height="666" fill="#ffffff" />

            {locations.map((location) => {
              const isHighlighted = HIGHLIGHTED_CODES.has(location.id);
              const colors = REGION_COLORS[location.id];
              const isActive = activeRegion === location.id;
              const dimmed = activeRegion !== null && !isActive && isHighlighted;

              if (!isHighlighted) {
                return (
                  <path
                    key={location.id}
                    d={location.path}
                    aria-label={location.name}
                    fill="#e3e3e3"
                    stroke="#ffffff"
                    strokeWidth="0.65"
                    strokeLinejoin="round"
                  />
                );
              }

              return (
                <path
                  key={location.id}
                  ref={(node) => {
                    pathRefs.current[location.id] = node;
                  }}
                  d={location.path}
                  aria-label={location.name}
                  fill={isActive ? colors.fillHover : colors.fill}
                  stroke="#ffffff"
                  strokeWidth="1.1"
                  strokeLinejoin="round"
                  filter={isActive ? "url(#countryLift)" : undefined}
                  opacity={dimmed ? 0.55 : 1}
                  className="transition-all duration-300"
                  onMouseEnter={() => setActiveRegion(location.id)}
                  onMouseLeave={() => setActiveRegion(null)}
                  style={{ cursor: "pointer" }}
                />
              );
            })}

            {serviceRegions.map((region) => {
              const layout = layouts[region.code];
              const colors = REGION_COLORS[region.code];
              if (!layout) return null;

              return (
                <RegionCallout
                  key={region.code}
                  layout={layout}
                  name={region.name}
                  fill={colors.fill}
                  line={colors.line}
                  active={activeRegion === region.code}
                  onEnter={() => setActiveRegion(region.code)}
                  onLeave={() => setActiveRegion(null)}
                />
              );
            })}
          </svg>
        </div>

        <div className="grid grid-cols-2 gap-3 border-t border-border/60 bg-surface/50 px-5 py-4 sm:grid-cols-4 sm:px-8">
          {serviceRegions.map((region) => {
            const colors = REGION_COLORS[region.code];
            const isActive = activeRegion === region.code;

            return (
              <button
                key={region.code}
                type="button"
                onMouseEnter={() => setActiveRegion(region.code)}
                onMouseLeave={() => setActiveRegion(null)}
                onFocus={() => setActiveRegion(region.code)}
                onBlur={() => setActiveRegion(null)}
                className={cn(
                  "flex items-center gap-2.5 rounded-xl border px-3 py-2.5 text-left text-sm transition-all duration-300",
                  isActive
                    ? "border-border bg-white shadow-card scale-[1.02]"
                    : "border-border/50 bg-white/80 hover:border-border hover:bg-white",
                )}
              >
                <span
                  className="h-3 w-3 shrink-0 rounded-full ring-2 ring-white"
                  style={{ backgroundColor: colors.fill }}
                />
                <span className="font-medium text-foreground">{region.name}</span>
              </button>
            );
          })}
        </div>
      </Card>
    </div>
  );
}
