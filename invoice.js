const params = new URLSearchParams(window.location.search);
const id = params.get("id");

const transactions = JSON.parse(localStorage.getItem("transactions")) || [];
const trx = transactions.find(t => t.id === id);

const invoice = document.getElementById("invoiceContent");

if (!trx) {
  invoice.innerHTML = "<p>Invoice tidak ditemukan</p>";
} else {
  invoice.innerHTML = `
    <p><strong>ID Transaksi:</strong> ${trx.id}</p>
    <p><strong>Nama:</strong> ${trx.name}</p>
    <p><strong>User ID:</strong> ${trx.userId}</p>
    <p><strong>Zone ID:</strong> ${trx.zoneId}</p>
    <p><strong>No HP:</strong> ${trx.phone}</p>
    <hr>
    <p><strong>Nominal:</strong> ${trx.nominal}</p>
    <p><strong>Harga:</strong> ${trx.price}</p>
    <p><strong>Pembayaran:</strong> ${trx.paymentMethod}</p>
    <p><strong>Status:</strong> ${trx.status}</p>
    <p><strong>Tanggal:</strong> ${trx.date}</p>
  `;
}
