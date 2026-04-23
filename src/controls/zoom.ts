import type { Container } from "pixi.js";

export function enableZoom(
    camera: Container
) {
  window.addEventListener("wheel", (e) => {
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
