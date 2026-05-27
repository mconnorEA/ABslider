import * as coda from "@codahq/packs-sdk";

export const pack = coda.newPack();

// Formula to generate the AB slider
pack.addFormula({
  name: "ABSlider",
  description: "Creates an A/B comparison slider with before and after images",
  parameters: [
    coda.makeParameter({
      type: coda.ParameterType.String,
      name: "beforeImage",
      description: "URL of the 'before' image",
    }),
    coda.makeParameter({
      type: coda.ParameterType.String,
      name: "afterImage",
      description: "URL of the 'after' image",
    }),
    coda.makeParameter({
      type: coda.ParameterType.Number,
      name: "height",
      description: "Height in pixels (default: 400)",
      optional: true,
    }),
  ],
  resultType: coda.ValueType.String,
  codaType: coda.ValueHintType.Html,

  execute: async function ([beforeImage, afterImage, height = 400]) {
    // Embed the entire slider HTML inline
    return `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <style>
    html, body {
      margin: 0;
      padding: 0;
      width: 100%;
      height: ${height}px;
      overflow: hidden;
    }
    .slider {
      position: relative;
      width: 100%;
      height: 100%;
      overflow: hidden;
      user-select: none;
      background-color: #000;
    }
    .slider > img.before-img {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      object-fit: contain;
      z-index: 0;
    }
    .slider img.after-img {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      object-fit: contain;
      z-index: 1;
      clip-path: inset(0 50% 0 0);
    }
    .slider .handle {
      position: absolute;
      top: 0;
      left: 50%;
      width: 4px;
      height: 100%;
      background: rgba(255, 255, 255, 0.9);
      cursor: ew-resize;
      z-index: 2;
      transform: translateX(-2px);
    }
    .slider .handle::before {
      content: '';
      position: absolute;
      top: 50%;
      left: 50%;
      width: 12px;
      height: 12px;
      background: rgba(0, 0, 0, 0.5);
      border-radius: 50%;
      transform: translate(-50%, -50%);
    }
  </style>
</head>
<body>
  <div class="slider" id="slider">
    <img id="beforeImg" class="before-img" src="${beforeImage}" alt="Before" />
    <img id="afterImg"  class="after-img"  src="${afterImage}" alt="After" />
    <div class="handle" id="handle"></div>
  </div>

  <script>
    (function() {
      const slider    = document.getElementById('slider');
      const beforeImg = document.getElementById('beforeImg');
      const afterImg  = document.getElementById('afterImg');
      const handle    = document.getElementById('handle');
      let isDragging  = false;

      beforeImg.addEventListener('load', () => {
        afterImg.style.clipPath = 'inset(0 50% 0 0)';
        handle.style.left       = '50%';
      });

      function onDrag(e) {
        if (!isDragging) return;
        const rect = slider.getBoundingClientRect();
        let x = (e.touches ? e.touches[0].clientX : e.clientX) - rect.left;
        if (x < 0) x = 0;
        if (x > rect.width) x = rect.width;
        const pct = (x / rect.width) * 100;
        afterImg.style.clipPath = \`inset(0 \${100 - pct}% 0 0)\`;
        handle.style.left = pct + '%';
      }

      handle.addEventListener('mousedown',  () => isDragging = true);
      handle.addEventListener('touchstart', () => isDragging = true);
      document.addEventListener('mousemove', onDrag);
      document.addEventListener('touchmove',   onDrag);
      document.addEventListener('mouseup',  () => isDragging = false);
      document.addEventListener('touchend', () => isDragging = false);
    })();
  </script>
</body>
</html>
    `.trim();
  },
});
