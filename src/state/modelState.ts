import type { Live2DModel } from "untitled-pixi-live2d-engine/cubism";

export let model: Live2DModel;

export function setModel(newModel: Live2DModel) {
  model = newModel;
}

export function getModel() {
  return model;
}