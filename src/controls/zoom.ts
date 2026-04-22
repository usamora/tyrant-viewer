import type { Container } from "pixi.js";
type Live2DModel = Container;

export function enableZoom(
    model: Live2DModel
) {
  window.addEventListener("wheel", (e) => {
    e.preventDefault();

    const scaleFactor = 1 - e.deltaY * 0.001;
    const oldScale = model.scale.x;
    const newScale = oldScale * scaleFactor;

    // calculate offset from model position
    const dx = e.x - model.x;
    const dy = e.y - model.y;

    model.scale.set(newScale, newScale);

    // adjust position so cursor stays fixed
    model.x -= dx * (scaleFactor - 1);
    model.y -= dy * (scaleFactor - 1);
  },
    { passive: false })
}