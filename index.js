import { getContext, FPS } from "./utils-module.js";

// ตั้งชื่อเอกสาร
document.title = "Woraphob";
// รอ DOM โหลดเสร็จก่อนค่อยทำงาน
document.addEventListener("DOMContentLoaded", main);

function main(ev) {
  const ctx = getContext("#myCanvas");

  const config = {
    width: 800,
    height: 600,
    bgColor: "white",
    debug: true,
  };

  ctx.canvas.width = config.width;
  ctx.canvas.height = config.height;

  // -------------------------------
  // ข้อมูลเมฆ (เก็บเป็นอาเรย์)
  let clouds = [
    { x: 150, y: 100, scale: 1.2, speed: 0.3 },
    { x: 400, y: 80, scale: 1.0, speed: 0.2 },
    { x: 650, y: 130, scale: 1.4, speed: 0.25 },
  ];

  // ฟังก์ชันวาดเมฆ
  function drawCloud(x, y, scale = 1) {
    ctx.fillStyle = "white";
    ctx.beginPath();
    ctx.arc(x, y, 20 * scale, 0, Math.PI * 2);
    ctx.arc(x + 25 * scale, y - 10 * scale, 25 * scale, 0, Math.PI * 2);
    ctx.arc(x + 55 * scale, y, 20 * scale, 0, Math.PI * 2);
    ctx.arc(x + 30 * scale, y + 10 * scale, 25 * scale, 0, Math.PI * 2);
    ctx.fill();
  }

  // -------------------------------
  // ข้อมูลฝน
  const drops = [];
  const dropCount = 200;

  // สร้างฝนเริ่มต้น
  for (let i = 0; i < dropCount; i++) {
    drops.push({
      x: Math.random() * config.width,
      y: Math.random() * config.height,
      speed: 2 + Math.random() * 3,
      length: 8 + Math.random() * 5,
    });
  }

  function drawRain() {
    ctx.strokeStyle = "#87CEFA"; // ฟ้าสว่าง
    ctx.lineWidth = 1.2;

    for (let drop of drops) {
      ctx.beginPath();
      ctx.moveTo(drop.x, drop.y);
      ctx.lineTo(drop.x, drop.y + drop.length);
      ctx.stroke();

      // อัปเดตตำแหน่ง
      drop.y += drop.speed;
      if (drop.y > config.height) {
        drop.y = -10; // รีเซ็ตกลับไปข้างบน
        drop.x = Math.random() * config.width;
      }
    }
  }

  // -------------------------------
  function draw() {
    FPS.update();

    // พื้นหลัง
    ctx.fillStyle = config.bgColor;
    ctx.fillRect(0, 0, config.width, config.height);

    // ====== วาดท้องฟ้า ======
    ctx.fillStyle = "#1522e0ff";
    ctx.fillRect(0, 0, config.width, config.height);

    // วาดเมฆแบบเลื่อน
    for (let c of clouds) {
      drawCloud(c.x, c.y, c.scale);
      c.x += c.speed; // ขยับไปทางขวา
      if (c.x - 60 > config.width) c.x = -60; // วนกลับ
    }

    // ====== วาดภูเขา ======
    ctx.fillStyle = "#2ecc71";
    ctx.beginPath();
    ctx.moveTo(0, 400);
    ctx.quadraticCurveTo(200, 200, 400, 400);
    ctx.lineTo(0, 400);
    ctx.fill();

    ctx.beginPath();
    ctx.moveTo(300, 400);
    ctx.quadraticCurveTo(500, 180, 800, 400);
    ctx.lineTo(300, 400);
    ctx.fill();

    // ====== พระอาทิตย์ ======
    ctx.beginPath();
    ctx.arc(650, 120, 60, 0, Math.PI * 2);
    ctx.fillStyle = "yellow";
    ctx.fill();

    // รังสี
    ctx.strokeStyle = "orange";
    ctx.lineWidth = 3;
    for (let i = 0; i < 18; i++) {
      let angle = (i / 18) * Math.PI * 2;
      let x1 = 650 + Math.cos(angle) * 70;
      let y1 = 120 + Math.sin(angle) * 70;
      let x2 = 650 + Math.cos(angle) * 90;
      let y2 = 120 + Math.sin(angle) * 90;
      ctx.beginPath();
      ctx.moveTo(x1, y1);
      ctx.lineTo(x2, y2);
      ctx.stroke();
    }

    // ====== พื้นดิน ======
    for (let i = 0; i < 6; i++) {
      ctx.fillStyle = i % 2 === 0 ? "#518023ff" : "#ADFF2F";
      ctx.fillRect(0, 400 + i * 35, config.width, 35);
    }

    // ====== แม่น้ำ ======
    ctx.beginPath();
    ctx.moveTo(300, 400);
    ctx.bezierCurveTo(350, 450, 450, 500, 400, 600);
    ctx.lineTo(500, 600);
    ctx.bezierCurveTo(550, 500, 450, 450, 500, 400);
    ctx.closePath();
    ctx.fillStyle = "#1E90FF";
    ctx.fill();

    // ====== ต้นไม้ ======
    function drawTree(x, y, scale = 1) {
      ctx.fillStyle = "#8B4513";
      ctx.fillRect(x - 5 * scale, y, 10 * scale, 40 * scale);

      ctx.fillStyle = "#006400";
      for (let i = 0; i < 3; i++) {
        ctx.beginPath();
        ctx.moveTo(x, y - (40 * scale) - (30 * i * scale));
        ctx.lineTo(x - 25 * scale, y - (10 * i * scale));
        ctx.lineTo(x + 25 * scale, y - (10 * i * scale));
        ctx.closePath();
        ctx.fill();
      }
    }
    drawTree(150, 400, 1.2);
    drawTree(250, 420, 1.0);
    drawTree(200, 380, 0.8);

    // ====== บ้าน ======
    ctx.fillStyle = "#dd29ddff";
    ctx.fillRect(600, 350, 120, 80);

    ctx.beginPath();
    ctx.moveTo(580, 350);
    ctx.lineTo(660, 290);
    ctx.lineTo(740, 350);
    ctx.closePath();
    ctx.fillStyle = "#1aee4fff";
    ctx.fill();

    ctx.fillStyle = "black";
    ctx.fillRect(645, 380, 30, 50);

    ctx.fillStyle = "#fff";
    ctx.fillRect(615, 365, 20, 20);
    ctx.fillRect(685, 365, 20, 20);
    ctx.strokeStyle = "black";
    ctx.strokeRect(615, 365, 20, 20);
    ctx.strokeRect(685, 365, 20, 20);

    // ====== นาข้าว ======
    function drawRiceFieldRect(x, y, w, h, rows, cols) {
      ctx.fillStyle = "#ADFF2F";
      ctx.fillRect(x, y, w, h);

      for (let i = 0; i < rows; i++) {
        for (let j = 0; j < cols; j++) {
          let px = x + (j + 0.5) * (w / cols);
          let py = y + (i + 0.5) * (h / rows);

          ctx.strokeStyle = "#006400";
          ctx.lineWidth = 2;

          ctx.beginPath();
          ctx.moveTo(px, py);
          ctx.lineTo(px, py - 6);
          ctx.stroke();

          ctx.beginPath();
          ctx.moveTo(px, py - 3);
          ctx.lineTo(px - 4, py - 8);
          ctx.stroke();

          ctx.beginPath();
          ctx.moveTo(px, py - 3);
          ctx.lineTo(px + 4, py - 8);
          ctx.stroke();
        }
      }
    }
    drawRiceFieldRect(50, 480, 200, 120, 5, 6);

    // ====== วาดฝน ======
    drawRain();

    // ====== FPS ======
    if (config.debug) FPS.show(ctx, 10, 28);

    requestAnimationFrame(draw);
  }

  draw();
}
