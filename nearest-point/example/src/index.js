import { points } from './data';
import { calculate } from '../../src';

const div = document.createElement('div');
document.body.appendChild(div);

const width = 800;
const height = 400;

let data = points;

let showRect = true;
let showClientRect = false;
let gapRect = 10;
let weightRect = 10;
let enableEditor = false;

div.innerHTML = `
  <div>
    <input type="checkbox" class="show-rect" ${showRect ? 'checked' : ''} />
    <label>show rects</label>
    <input type="checkbox" class="show-client-rect" ${showClientRect ? 'checked' : ''} />
    <label>show mouse rects</label>
    <input type="number" class="gap-rect" style="width: 50px" value="${gapRect}" />
    <label>gap</label>
    <input type="number" class="weight-rect" style="width: 50px" value="${weightRect}" />
    <label>weight</label>
    <button class="draw-line">draw line</button>
  </div>
  <div>
    <canvas style="border: 1px solid black;">
  </div>
`;

const canvas = div.querySelector('canvas');
const showRectInput = div.querySelector('input.show-rect');
const showClientRectInput = div.querySelector('input.show-client-rect');
const gapRectInput = div.querySelector('input.gap-rect');
const weightRectInput = div.querySelector('input.weight-rect');
const drawLineButton = div.querySelector('button.draw-line');

canvas.width = width.toString();
canvas.height = height.toString();

const context = canvas.getContext('2d');

// -------------------------------------------------

const clean = () => {
  context.beginPath();
  context.fillStyle = 'white';
  context.globalAlpha = 1;
  context.lineWidth = 1;
  context.fillRect(0, 0, width, height);
  context.stroke();
};

const drawCircle = (pnt, radius) => {
  context.beginPath();
  context.arc(pnt.x, pnt.y, radius, 0, 2 * Math.PI, false);
  context.fillStyle = 'green';
  context.fill();
  context.lineWidth = 5;
  context.strokeStyle = '#003300';
  context.stroke();
};

const drawFillRect = (rect) => {
  context.beginPath();

  let [point] = rect.rect;
  context.moveTo(point.x, point.y);

  for (let i = 1; i < 4; ++i) {
    point = rect.rect[i];
    context.lineTo(point.x, point.y);
  }

  [point] = rect.rect;
  context.lineTo(point.x, point.y);

  context.globalAlpha = rect.inside ? 0.6 : 0.2;
  context.fillStyle = 'green';
  context.fill();
  context.lineWidth = 1;
  context.strokeStyle = '#003300';
  context.stroke();
};

const drawRect = (rect) => {
  context.beginPath();

  let [point] = rect.clientRect;
  context.moveTo(point.x, point.y);

  for (let i = 1; i < 4; ++i) {
    point = rect.clientRect[i];
    context.lineTo(point.x, point.y);
  }

  [point] = rect.clientRect;
  context.lineTo(point.x, point.y);

  context.globalAlpha = 0.2;
  context.lineWidth = 1;
  context.strokeStyle = 'black';
  context.stroke();
};

const drawLine = () => {
  const ln = data.length;
  if (ln < 2) {
    return;
  }

  context.beginPath();

  let point = data[0];
  context.moveTo(point.x, point.y);

  for (let i = 1; i < ln; ++i) {
    point = data[i];
    context.lineTo(point.x, point.y);
  }

  context.globalAlpha = 0.4;
  context.fillStyle = 'green';
  context.lineWidth = 1;
  context.stroke();
};

const redraw = (point = { x: -100, y: -100 }) => {
  if (enableEditor) {
    return;
  }

  const info = calculate(data, point, {
    gap: gapRect,
    weight: weightRect,
    rects: showRect,
    clientRects: showClientRect,
  });

  clean();

  if (showRect) {
    info.rects.forEach((rect) => {
      drawFillRect(rect);
    });
  }

  if (showClientRect) {
    info.rects.forEach((rect) => {
      drawRect(rect);
    });

    drawCircle(point, 2);
  }

  drawLine();

  data.forEach((pnt, index) => {
    const selected = info.nearest.index === index;
    drawCircle(pnt, selected ? 5 : 2);
  });
};

// -------------------------------------------------

showRectInput.addEventListener('change', (e) => {
  showRect = e.target.checked;
  redraw();
});

showClientRectInput.addEventListener('change', (e) => {
  showClientRect = e.target.checked;
  redraw();
});

gapRectInput.addEventListener('change', (e) => {
  gapRect = parseInt(e.target.value, 10) || 0;
  redraw();
});

weightRectInput.addEventListener('change', (e) => {
  weightRect = parseInt(e.target.value, 10) || 0;
  redraw();
});

// editor
drawLineButton.addEventListener('click', () => {
  enableEditor = true;
  data = [{ x: 0, y: 0 }];
  clean();
});

canvas.addEventListener('click', () => {
  if (!enableEditor) {
    return;
  }

  const ln = data.length;
  const last = data[ln - 1];

  if (ln > 1) {
    const prev = data[ln - 2];

    if (Math.abs(prev.x - last.x) < 5 && Math.abs(prev.y - last.y) < 5) {
      data.pop();
      enableEditor = false;
      redraw();
      return;
    }
  }

  data.push(last);

  clean();
  drawLine();
});

canvas.addEventListener('mousemove', (e) => {
  if (!enableEditor) {
    return;
  }

  const { left, top } = canvas.getBoundingClientRect();
  const { clientX, clientY } = e;

  const point = {
    x: Math.floor(clientX - left),
    y: Math.floor(clientY - top),
  };

  data[data.length - 1] = point;

  clean();
  drawLine();
});

redraw();

canvas.addEventListener('mousemove', (e) => {
  redraw({
    x: e.offsetX,
    y: e.offsetY,
  });
});
