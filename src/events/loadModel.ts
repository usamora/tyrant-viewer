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
    currentModel.destroy({ children: true });

    await new Promise(r => requestAnimationFrame(r));

    const model = await Live2DModel.from(newModelPath);

    camera.addChild(model);

    //reset model and camera position on canvas
    model.position.set(0, 0);
    model.anchor?.set?.(0.5);

    camera.x = 0;
    camera.y = 0;
    camera.scale.set(1);

    setModel(model);

    fitModelToScreen(app);
}