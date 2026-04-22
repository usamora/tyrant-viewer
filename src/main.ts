import { Application } from 'pixi.js'
import { Live2DModel } from 'untitled-pixi-live2d-engine/cubism'
import { 
  enableDrag, 
  enableZoom, 
  handleResize 
} from './controls/index'

document.addEventListener('DOMContentLoaded', async () => {
  const app = new Application()
  await app.init({
    resizeTo: document.getElementById('main-canvas') as HTMLElement,
    preference: 'webgl',
    autoDensity: true,
    resolution: window.devicePixelRatio,
    antialias: true,
  })

  const canvas = document.getElementById('main-canvas');
  if(canvas) {
    canvas.appendChild(app.canvas);
  }

  // Configure Cubism Modern work memory (optional, default is 16MB)
  // Increase this value when loading multiple or high-complexity models
  // configureCubismSDK({
  //   memorySizeMB: 32
  // })

  const model = await Live2DModel.from('src/assets/chars/10303/10303_l/10303_L_b.model3.json')
  model.anchor.set(0.5)
  model.position.set(app.screen.width / 2, app.screen.height / 2)

  enableDrag(model);
  enableZoom(model);
  handleResize(app, model);
  app.stage.addChild(model);
});

