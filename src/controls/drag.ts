import type { Container } from "pixi.js";
type Live2DModel = Container;

export function enableDrag(model: Live2DModel) {
  let dragging = false;
  let lastX = 0;
  let lastY = 0;

  model.eventMode = "static";
  model.cursor = "grab";

  model.on("pointerdown", (e: any) => {
    dragging = true;
    lastX = e.global.x;
    lastY = e.global.y;
    model.cursor = "grabbing";
  })

  model.on("pointerup", () => {
    dragging = false;
    model.cursor = "grab";
  })

  model.on("pointerupoutside", () => {
    dragging = false;
    model.cursor = "grab";
  })

  model.on("pointermove", (e: any) => {
    if (!dragging) return;

    const dx = e.global.x - lastX;
    const dy = e.global.y - lastY;

    model.x += dx;
    model.y += dy;

    lastX = e.global.x;
    lastY = e.global.y;
  })
}