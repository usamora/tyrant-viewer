import type { Application, Container } from "pixi.js";

export function enableZoom(
    app: Application,
    camera: Container
) {
  app.canvas.addEventListener("wheel", (e) => {
    e.preventDefault();

    const scaleFactor = 1 - e.deltaY * 0.001;
    const oldScale = camera.scale.x;
    const newScale = oldScale * scaleFactor;

    // calculate offset from model position
    const dx = e.x - camera.x;
    const dy = e.y - camera.y;

    camera.scale.set(newScale, newScale);

    // adjust position so cursor stays fixed
    camera.x -= dx * (scaleFactor - 1);
    camera.y -= dy * (scaleFactor - 1);
  },
    { passive: false })
}

export function enableTouchZoom(
    app: Application,
    camera: Container
) {
  let lastDistance: number | null = null;

  function getDistance(touch1: Touch, touch2: Touch) {
    const dx = touch1.clientX - touch2.clientX;
    const dy = touch1.clientY - touch2.clientY;
    return Math.sqrt(dx * dx + dy * dy);
  }

  function getMidpoint(touch1: Touch, touch2: Touch) {
    return {
      x: (touch1.clientX + touch2.clientX) / 2,
      y: (touch1.clientY + touch2.clientY) / 2
    };
  }

  app.canvas.addEventListener("touchmove", (e) => {
    if (e.touches.length !== 2) {
      lastDistance = null;
      return;
    }

    e.preventDefault();

    const t1 = e.touches[0];
    const t2 = e.touches[1];

    const distance = getDistance(t1, t2);

    if (lastDistance === null) {
      lastDistance = distance;
      return;
    }

    const scaleFactor = distance / lastDistance;
    const oldScale = camera.scale.x;
    const newScale = oldScale * scaleFactor;

    const mid = getMidpoint(t1, t2);

    const dx = mid.x - camera.x;
    const dy = mid.y - camera.y;

    camera.scale.set(newScale, newScale);

    camera.x -= dx * (scaleFactor - 1);
    camera.y -= dy * (scaleFactor - 1);

    lastDistance = distance;
  }, { passive: false });

  app.canvas.addEventListener("touchend", () => {
    lastDistance = null;
  });
}
