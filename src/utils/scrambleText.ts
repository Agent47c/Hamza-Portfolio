import { isElementRevealed, markElementRevealed, getMotionPreference } from "./motion";

const GLYPHS = "01_/-#<>%&";

export const scrambleElement = (
  el: HTMLElement,
  finalText: string,
  cacheKey: string,
  durationMs = 400
) => {
  if (isElementRevealed(cacheKey) || !getMotionPreference()) {
    el.textContent = finalText;
    return;
  }

  markElementRevealed(cacheKey);

  const length = finalText.length;
  const startTime = performance.now();

  const update = (now: number) => {
    const elapsed = now - startTime;
    const progress = Math.min(1, elapsed / durationMs);
    const resolvedChars = Math.floor(progress * length);

    let output = "";
    for (let i = 0; i < length; i++) {
      if (i < resolvedChars) {
        output += finalText[i];
      } else if (finalText[i] === " " || finalText[i] === "/" || finalText[i] === "•") {
        output += finalText[i];
      } else {
        output += GLYPHS[Math.floor(Math.random() * GLYPHS.length)];
      }
    }

    el.textContent = output;

    if (progress < 1) {
      requestAnimationFrame(update);
    } else {
      el.textContent = finalText;
    }
  };

  requestAnimationFrame(update);
};
