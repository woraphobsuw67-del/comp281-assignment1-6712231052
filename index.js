import { getContext, FPS } from "./utils-module.js";

// กำหนดชื่อเรื่องของเอกสาร HTML
document.title = "Woraphob";
// กำหนดให้ฟังก์ชัน main ทำงานเมื่อ DOM ถูกโหลดเสร็จสมบูรณ์
document.addEventListener("DOMContentLoaded", main);

// ฟังก์ชันหลักที่ใช้ในการเริ่มต้นแอปพลิเคชัน ทำงานเมื่อ DOM ถูกโหลดเสร็จสมบูรณ์
function main(ev) {
	// เข้าถึง context ของ canvas ที่มี id เป็น "myCanvas"
	const ctx = getContext("#myCanvas");

	// กำหนดค่าเริ่มต้นสำหรับแอปพลิเคชันในรูปแบบของอ็อบเจกต์ config
	const config = {
		width : 800,
		height : 600,
		bgColor : "white",
		debug : true,
	};

	// กำหนดขนาดของ canvas ตามค่า config
	ctx.canvas.width = config.width;
	ctx.canvas.height = config.height;

	function draw() {
		// ใช้ FPS สำหรับการวัดอัตราเฟรมต่อวินาที
		FPS.update();

		// กำหนดสีพื้นหลังของ canvas และใช้ fillRect เพื่อเติมสีพื้นหลัง
		ctx.fillStyle = config.bgColor;
		ctx.fillRect(0, 0, config.width, config.height);

		// วาดรูปจากส่วนนี้ไป **แนะนำให้วาดจากรูปที่อยู่ด้านหลังไปด้านหน้าตามลำดับ**
		// ใช้ภาพจาก MP1-app-graphics-2d.jpg เป็นแนวทางในการวาดรูป แต่จะวาดอย่างไรก็ได้ตามต้องการ

		// TODO:
// 1) ท้องฟ้า
ctx.fillStyle = "#87CEEB"; 
ctx.fillRect(0, 0, config.width, config.height);

// เมฆ
function drawCloud(x, y, scale = 1) {
  ctx.fillStyle = "white";
  ctx.beginPath();
  ctx.arc(x, y, 20 * scale, 0, Math.PI * 2);
  ctx.arc(x + 25 * scale, y - 10 * scale, 25 * scale, 0, Math.PI * 2);
  ctx.arc(x + 55 * scale, y, 20 * scale, 0, Math.PI * 2);
  ctx.arc(x + 30 * scale, y + 10 * scale, 25 * scale, 0, Math.PI * 2);
  ctx.fill();
}
drawCloud(150, 100, 1.2);
drawCloud(400, 80, 1.0);
drawCloud(650, 130, 1.4);

// 2) ภูเขา
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

// 3) พระอาทิตย์
ctx.beginPath();
ctx.arc(650, 120, 60, 0, Math.PI * 2);
ctx.fillStyle = "yellow";
ctx.fill();


// รังสีพระอาทิตย์
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

// 4) ทุ่งนา (เขียวเข้ม/อ่อนสลับ)
for (let i = 0; i < 6; i++) {
  ctx.fillStyle = i % 2 === 0 ? "#518023ff" : "#ADFF2F";
  ctx.fillRect(0, 400 + i * 35, config.width, 35);
}

// 5) แม่น้ำ
ctx.beginPath();
ctx.moveTo(300, 400);
ctx.bezierCurveTo(350, 450, 450, 500, 400, 600);
ctx.lineTo(500, 600);
ctx.bezierCurveTo(550, 500, 450, 450, 500, 400);
ctx.closePath();
ctx.fillStyle = "#1E90FF";
ctx.fill();

// 6) ต้นไม้เท่ๆ (แบบต้นสน)
function drawTree(x, y, scale = 1) {
  // ลำต้น
  ctx.fillStyle = "#8B4513";
  ctx.fillRect(x - 5 * scale, y, 10 * scale, 40 * scale);

  // กิ่งใบเป็นสามเหลี่ยมซ้อน
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

// 7) บ้าน
ctx.fillStyle = "#dd29ddff";
ctx.fillRect(600, 350, 120, 80);

// หลังคา
ctx.beginPath();
ctx.moveTo(580, 350);
ctx.lineTo(660, 290);
ctx.lineTo(740, 350);
ctx.closePath();
ctx.fillStyle = "#1aee4fff";
ctx.fill();

// ประตู
ctx.fillStyle = "black";
ctx.fillRect(645, 380, 30, 50);

// หน้าต่าง
ctx.fillStyle = "#fff";
ctx.fillRect(615, 365, 20, 20);
ctx.fillRect(685, 365, 20, 20);
ctx.strokeStyle = "black";
ctx.strokeRect(615, 365, 20, 20);
ctx.strokeRect(685, 365, 20, 20);
// ฟังก์ชันวาดแปลงนาข้าวเล็กๆ
function drawRiceFieldRect(x, y, w, h, rows, cols) {
  ctx.fillStyle = "#ADFF2F"; // สีพื้นนา (เขียวอ่อน)
  ctx.fillRect(x, y, w, h);

  for (let i = 0; i < rows; i++) {
    for (let j = 0; j < cols; j++) {
      let px = x + (j + 0.5) * (w / cols);
      let py = y + (i + 0.5) * (h / rows);

      // วาดต้นข้าวเล็กๆ
      ctx.strokeStyle = "#006400"; // เขียวเข้ม
      ctx.lineWidth = 2;

      ctx.beginPath();
      ctx.moveTo(px, py);
      ctx.lineTo(px, py - 6); // เส้นตั้ง
      ctx.stroke();

      ctx.beginPath();
      ctx.moveTo(px, py - 3);
      ctx.lineTo(px - 4, py - 8); // ใบเฉียงซ้าย
      ctx.stroke();

      ctx.beginPath();
      ctx.moveTo(px, py - 3);
      ctx.lineTo(px + 4, py - 8); // ใบเฉียงขวา
      ctx.stroke();
    }
  }
}

// เรียกใช้ → กรอบสี่เหลี่ยมทางซ้าย
// ขยับนาข้าวลงมา (y จาก 420 → 480)
drawRiceFieldRect(50, 480, 200, 120, 5, 6);


		// เขตสิ้นสุดของการวาดรูป


		// แสดงข้อความ FPS บน canvas ถ้า config.debug เป็น true
		if (config.debug) FPS.show(ctx, 10, 28);

		// ใช้ requestAnimationFrame เพื่อเรียกใช้ฟังก์ชัน draw ต่อไป
		requestAnimationFrame(draw);
	}
	// เริ่มต้นการวาดภาพบน canvas
	draw();
}