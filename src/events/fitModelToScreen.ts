import type { Application } from "pixi.js";
import { getModel, setModel } from "../state/modelState";

export function fitModelToScreen(
  app: Application, 
) {
  const model = getModel();

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

  setModel(model);
}