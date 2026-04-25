import { Application, Container } from 'pixi.js'
import { 
  enableDrag, 
  enableZoom, 
  handleResize 
} from './controls/index';
import { 
  createCharactersList,
  loadModel
} from './events/index';

interface ApplicationExtended extends Application {
  camera: Container
}

document.addEventListener('DOMContentLoaded', async () => {
  const app = new Application();
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

  // TODO: add checkbox to enable/disable interaction
  // model.interactive = false
  
  const camera = new Container();
  app.stage.addChild(camera);
  (app as ApplicationExtended).camera = camera;

  const initialModel = import.meta.env.BASE_URL + '/assets/chars/10301/10301_l/10301_L.model3.json';
  loadModel(app, initialModel);

  createCharactersList(app);
  
  handleResize(app, camera);

  enableDrag(app, camera);
  enableZoom(app, camera);
});
