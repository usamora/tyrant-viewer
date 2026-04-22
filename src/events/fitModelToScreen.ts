import type { Container, Application } from "pixi.js";
type Live2DModel = Container;

export function fitModelToScreen(app: Application, model: Live2DModel) {
  const screenWidth = app.renderer.width;
  const screenHeight = app.renderer.height;

  const offset = 500; //to make some space above and below
  const bounds = model.getBounds();
  const modelWidth = bounds.width;
  const modelHeight = bounds.height + offset;

  const scaleX = screenWidth / modelWidth;
  const scaleY = screenHeight / modelHeight;
  const scale = Math.min(scaleX, scaleY);

  model.scale.set(scale, scale);

  model.x = screenWidth / 2;
  model.y = screenHeight / 2;
}