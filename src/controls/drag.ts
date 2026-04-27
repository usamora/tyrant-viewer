import type { Application, Container } from "pixi.js";

export function enableDrag(
  app: Application,
  camera: Container
) {
  let dragging = false;
  let lastX = 0;
  let lastY = 0;

  let lastPinchDistance = 0;
  const MIN_SCALE = 0.2;
  const MAX_SCALE = 5;

  app.stage.eventMode = "static";
  app.stage.hitArea = app.renderer.screen;

  //mouse
  app.stage.on("pointerdown", (e: any) => {
    if (activeTouches.size > 1) return;

    dragging = true;
    lastX = e.global.x;
    lastY = e.global.y;
  });

  app.stage.on("pointermove", (e: any) => {
    if (!dragging || activeTouches.size > 1) return;

    const dx = e.global.x - lastX;
    const dy = e.global.y - lastY;

    camera.x += dx;
    camera.y += dy;

    lastX = e.global.x;
    lastY = e.global.y;
  });

  const stopDrag = () => { dragging = false; };

  app.stage.on("pointerup",        stopDrag);
  app.stage.on("pointerupoutside", stopDrag);

  //touch
  const activeTouches = new Map<number, { x: number; y: number }>();

  const getPinchDistance = (): number => {
    const [a, b] = [...activeTouches.values()];
    const dx = a.x - b.x;
    const dy = a.y - b.y;
    return Math.sqrt(dx * dx + dy * dy);
  };

  const getPinchMidpoint = (): { x: number; y: number } => {
    const [a, b] = [...activeTouches.values()];
    return { x: (a.x + b.x) / 2, y: (a.y + b.y) / 2 };
  };

  const canvas = app.renderer.canvas as HTMLCanvasElement;

  canvas.addEventListener("touchstart", (e: TouchEvent) => {
    e.preventDefault();

    for (const touch of e.changedTouches) {
      activeTouches.set(touch.identifier, { x: touch.clientX, y: touch.clientY });
    }

    if (activeTouches.size === 2) {
      dragging = false;
      lastPinchDistance = getPinchDistance();
    }
  }, { passive: false });

  canvas.addEventListener("touchmove", (e: TouchEvent) => {
    e.preventDefault();

    for (const touch of e.changedTouches) {
      activeTouches.set(touch.identifier, { x: touch.clientX, y: touch.clientY });
    }

    if (activeTouches.size === 2) {
      const newDistance = getPinchDistance();
      const midpoint    = getPinchMidpoint();
      const ratio       = newDistance / lastPinchDistance;

      const prevScale = camera.scale.x;
      const nextScale = Math.min(MAX_SCALE, Math.max(MIN_SCALE, prevScale * ratio));
      const actualRatio = nextScale / prevScale;

      camera.x = midpoint.x - (midpoint.x - camera.x) * actualRatio;
      camera.y = midpoint.y - (midpoint.y - camera.y) * actualRatio;
      camera.scale.set(nextScale);

      lastPinchDistance = newDistance;
      return;
    }

    if (activeTouches.size === 1) {
      const [touch] = [...activeTouches.values()];

      if (dragging) {
        const dx = touch.x - lastX;
        const dy = touch.y - lastY;
        camera.x += dx;
        camera.y += dy;
      }

      lastX = touch.x;
      lastY = touch.y;
      dragging = true;
    }
  }, { passive: false });

  const onTouchEnd = (e: TouchEvent) => {
    for (const touch of e.changedTouches) {
      activeTouches.delete(touch.identifier);
    }

    if (activeTouches.size === 1) {
      const [remaining] = [...activeTouches.values()];
      lastX = remaining.x;
      lastY = remaining.y;
      dragging = true;
    } else {
      dragging = false;
    }
  };

  canvas.addEventListener("touchend",    onTouchEnd, { passive: true });
  canvas.addEventListener("touchcancel", onTouchEnd, { passive: true });

  return () => {
    app.stage.removeAllListeners();
    canvas.removeEventListener("touchstart",  onTouchEnd);
    canvas.removeEventListener("touchmove",   onTouchEnd);
    canvas.removeEventListener("touchend",    onTouchEnd);
    canvas.removeEventListener("touchcancel", onTouchEnd);
  };
}
