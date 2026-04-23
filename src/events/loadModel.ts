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

    //set model position back
    model.anchor.set(0.5, 0.5);
    const width = app.renderer.width;
    const height = app.renderer.height;
    model.x = width / 2;
    model.y = height / 2;

    setModel(model);

    fitModelToScreen(app);
}