import type { Container, Application } from "pixi.js";

export function handleResize(
  app: Application, 
  camera: Container
) {
  app.canvas.addEventListener("resize", (e) => {
    e.stopPropagation();

    const canvas = document.querySelector("#main-canvas") as HTMLElement;

    const width = canvas.clientWidth;
    const height = canvas.clientHeight;

    app.renderer.resize(width, height);

    camera.x = 0;
    camera.y = 0;
    camera.scale.set(1);
  })
}
