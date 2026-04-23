import type { Application, Container } from "pixi.js";

export function enableDrag(
  app: Application,
  camera: Container
) {
  let dragging = false;
  let lastX = 0;
  let lastY = 0;

  app.stage.eventMode = "static";
  app.stage.hitArea = app.renderer.screen;

  app.stage.on("pointerdown", (e: any) => {
    dragging = true;
    lastX = e.global.x;
    lastY = e.global.y;
  })

  app.stage.on("pointermove", (e: any) => {
    if (!dragging) return;

    const dx = e.global.x - lastX;
    const dy = e.global.y - lastY;

    camera.x += dx;
    camera.y += dy;

    lastX = e.global.x;
    lastY = e.global.y;
  })

  app.stage.on("pointerup", () => {
    dragging = false;
  })

  app.stage.on("pointerupoutside", () => {
    dragging = false;
  })
}