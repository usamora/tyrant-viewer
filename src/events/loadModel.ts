import type { Container, Application } from "pixi.js";
import { fitModelToScreen } from "./fitModelToScreen";
import { Live2DModel } from 'untitled-pixi-live2d-engine/cubism'
interface ApplicationExtended extends Application {
  camera: Container
};
import { getModel, setModel } from "../state/modelState";

export async function loadModel(
    app: Application,
    newModelPath: string
) {
    const camera = (app as ApplicationExtended).camera;
    const currentModel = getModel();
    
    camera.removeChild(currentModel);
    currentModel.destroy();

    await new Promise(r => requestAnimationFrame(r));

    const model = await Live2DModel.from(newModelPath);

    camera.addChild(model);
    setModel(model);

    fitModelToScreen(app);
}