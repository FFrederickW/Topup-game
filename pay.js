const params = new URLSearchParams(window.location.search);
const id = params.get("id");

let data = JSON.parse(localStorage.getItem("transactions")) || [];
const index = data.findIndex(t => t.id === id);

const payInfo = document.getElementById("payInfo");

if (index === -1) {
  payInfo.innerHTML = "<p>❌ Transaksi tidak ditemukan</p>";
} else {
  const trx = data[index];

  payInfo.innerHTML = `
    <p><strong>ID:</strong> ${trx.id}</p>
    <p><strong>Nama:</strong> ${trx.name || "Tidak ada nama"}</p>
    <p><strong>Nominal:</strong> ${trx.nominal}</p>
    <p><strong>Total:</strong> ${trx.price || "-"}</p>
    <p><strong>Metode:</strong> ${trx.paymentMethod}</p>
    <p><strong>Status:</strong> ${trx.status}</p>
    <hr>
    <p>Silakan lakukan pembayaran (SIMULASI)</p>
  `;
}

function confirmPayment() {
  if (index === -1) {
    alert("Transaksi tidak ditemukan");
    return;
  }

  // ✅ UPDATE STATUS LEWAT ARRAY
  data[index].status = "SUCCESS";

  // ✅ SIMPAN ULANG
  localStorage.setItem("transactions", JSON.stringify(data));

  alert("✅ Pembayaran berhasil");

  // KE INVOICE
  window.location.href = "history.html";



}
