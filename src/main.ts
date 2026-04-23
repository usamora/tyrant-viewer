import { Application, Container } from 'pixi.js'
import { Live2DModel } from 'untitled-pixi-live2d-engine/cubism'
import { 
  enableDrag, 
  enableZoom, 
  handleResize 
} from './controls/index';
import { 
  fitModelToScreen,
  createCharactersList
} from './events/index';
import { setModel } from './state/modelState';

interface ApplicationExtended extends Application {
  camera: Container
}

document.addEventListener('DOMContentLoaded', async () => {
  const app = new Application()
  await app.init({
    resizeTo: document.getElementById('main-canvas') as HTMLElement,
    preference: 'webgl',
    autoDensity: true,
    resolution: window.devicePixelRatio,
    antialias: true,
  });

  const canvas = document.getElementById('main-canvas');
  if(canvas) {
    canvas.appendChild(app.canvas);
  }

  // Configure Cubism Modern work memory (optional, default is 16MB)
  // Increase this value when loading multiple or high-complexity models
  // configureCubismSDK({
  //   memorySizeMB: 32
  // })

  let model = await Live2DModel.from('/assets/chars/10301/10301_l/10301_L.model3.json');

  model.anchor.set(0.5);
  model.position.set(app.screen.width / 2, app.screen.height / 2);

  setModel(model);

  fitModelToScreen(app);

  const camera = new Container();
  app.stage.addChild(camera);
  (app as ApplicationExtended).camera = camera;
  camera.addChild(model);

  createCharactersList(app);
  handleResize(app, camera);

  enableDrag(app, camera);
  enableZoom(camera);
});

