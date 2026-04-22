export function handleResize(app: any, model: any) {
  window.addEventListener("resize", () => {
    const canvas = document.querySelector("#main-canvas") as HTMLElement;

    const width = canvas.clientWidth;
    const height = canvas.clientHeight;

    app.renderer.resize(width, height);

    model.x = width / 2;
    model.y = height / 2;
  })
}
