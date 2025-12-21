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

