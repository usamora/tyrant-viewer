import { Application } from 'pixi.js'
import { Live2DModel } from 'untitled-pixi-live2d-engine/cubism'
import { enableDrag, enableZoom } from './controls/index'

const app = new Application()
await app.init({
  resizeTo: window,
  preference: 'webgl',
  autoDensity: true,
  resolution: window.devicePixelRatio,
  antialias: true,
})

document.body.appendChild(app.canvas)

// Configure Cubism Modern work memory (optional, default is 16MB)
// Increase this value when loading multiple or high-complexity models
// configureCubismSDK({
//   memorySizeMB: 32
// })

const model = await Live2DModel.from('src/assets/chars/15501/15501_l/15501_L.model3.json')
model.anchor.set(0.5)
model.position.set(app.screen.width / 2, app.screen.height / 2)

enableDrag(model)
enableZoom(model)

app.stage.addChild(model)