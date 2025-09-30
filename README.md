วิธีการรันโค้ด

my-canvas-app/
├─ index.html         ← หน้า HTML (โหลดเป็น module)
├─ main.js            ← โค้ดที่คุณส่ง (มี `import { getContext, FPS } from "./utils-module.js";`)
└─ utils-module.js    ← โมดูลช่วยเหลือ (ต้องมี `getContext` และ `FPS`)
<!doctype html>
<html lang="th">
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width,initial-scale=1" />
  <title>Woraphob</title>
  <style>
    html,body { height:100%; margin:0; display:flex; align-items:center; justify-content:center; background:#f3f4f6; }
    canvas { border:1px solid #ccc; }
  </style>
</head>
<body>
  <canvas id="myCanvas"></canvas>
  <script type="module" src="./main.js"></script>
</body>
</html>

แนวคิด

โค้ดนี้คือการฝึกวาดภาพ 2D บน canvas โดยแยกองค์ประกอบของธรรมชาติและสิ่งก่อสร้างออกเป็นฟังก์ชันย่อย แล้วรวมเป็นฉากชนบทที่สมบูรณ์

