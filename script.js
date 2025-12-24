let qr;

function generateQR() {
  const text = document.getElementById("text").value;
  const qrContainer = document.getElementById("qrcode");

  qrContainer.innerHTML = "";

  if (!text) {
    alert("Escribí algo primero");
    return;
  }

  qr = new QRCode(qrContainer, {
    text: text,
    width: 200,
    height: 200,
    correctLevel: QRCode.CorrectLevel.H
  });
}

async function copyQR() {
  const canvas = document.querySelector("#qrcode canvas");

  if (!canvas) {
    alert("Primero generá un QR");
    return;
  }

  canvas.toBlob(async (blob) => {
    try {
      await navigator.clipboard.write([
        new ClipboardItem({ "image/png": blob })
      ]);
      alert("QR copiado al portapapeles ✅");
    } catch (err) {
      alert("Tu navegador no permite copiar imágenes");
    }
  });
}

function saveQRasJPG() {
  const canvas = document.querySelector("#qrcode canvas");

  if (!canvas) {
    alert("Primero generá un QR");
    return;
  }

  // Canvas auxiliar para JPG
  const jpgCanvas = document.createElement("canvas");
  jpgCanvas.width = canvas.width;
  jpgCanvas.height = canvas.height;

  const ctx = jpgCanvas.getContext("2d");

  // Fondo blanco (JPG no soporta transparencia)
  ctx.fillStyle = "#ffffff";
  ctx.fillRect(0, 0, jpgCanvas.width, jpgCanvas.height);

  // Dibujar QR
  ctx.drawImage(canvas, 0, 0);

  // Descargar JPG
  const link = document.createElement("a");
  link.download = "qr.jpg";
  link.href = jpgCanvas.toDataURL("image/jpeg", 1.0);
  link.click();
}
