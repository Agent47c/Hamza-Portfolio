import { useState, useEffect, useRef } from "react";
import { getMotionPreference } from "../utils/motion";

interface CountUpMetricProps {
  end: number;
  suffix?: string;
  duration?: number;
}

export const CountUpMetric = ({ end, suffix = "%+", duration = 1000 }: CountUpMetricProps) => {
  const [val, setVal] = useState<number>(0);
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    if (!getMotionPreference()) {
      setVal(end);
      return;
    }

    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          observer.disconnect();

          const startTime = performance.now();
          const tick = (now: number) => {
            const progress = Math.min(1, (now - startTime) / duration);
            // Ease out cubic
            const eased = 1 - Math.pow(1 - progress, 3);
            setVal(Math.round(eased * end));

            if (progress < 1) {
              requestAnimationFrame(tick);
            }
          };

          requestAnimationFrame(tick);
        }
      },
      { threshold: 0.1 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [end, duration]);

  return (
    <span ref={ref} className="count-up-number">
      {val}{suffix}
    </span>
  );
};

export default CountUpMetric;
