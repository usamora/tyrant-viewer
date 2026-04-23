import type { Container, Application } from "pixi.js";

export function handleResize(
  app: Application, 
  camera: Container
) {
  window.addEventListener("resize", () => {
    const canvas = document.querySelector("#main-canvas") as HTMLElement;

    const width = canvas.clientWidth;
    const height = canvas.clientHeight;

    app.renderer.resize(width, height);

    camera.x = width / 2;
    camera.y = height / 2;
  })
}
