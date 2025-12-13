// ✅ FUNGSI GLOBAL
function clearData() {
  if (confirm("Yakin hapus semua transaksi?")) {
    localStorage.removeItem("transactions");
    location.reload();
  }
}

// ✅ DAFTAR HARGA (WAJIB ADA)
const priceMap = {
  "5 Diamonds": 2000,
  "12 Diamonds": 4000,
  "19 Diamonds": 6000,
  "568 Diamonds": 154000,
  "6030 Diamonds": 1534498
};

document.addEventListener("DOMContentLoaded", () => {
  const data = JSON.parse(localStorage.getItem("transactions")) || [];
  const table = document.getElementById("adminTable");

  let totalIncome = 0;
  table.innerHTML = "";

  if (data.length === 0) {
    table.innerHTML =
      "<tr><td colspan='6'>Belum ada transaksi</td></tr>";
  } else {
    data.forEach(trx => {
      // ✅ AMBIL HARGA DARI NOMINAL
      const price = priceMap[trx.nominal] || 0;

      if (trx.status === "SUCCESS") {
        totalIncome += price;
      }

      const row = document.createElement("tr");
      row.innerHTML = `
        <td>${trx.id}</td>
        <td>${trx.name}</td>
        <td>${trx.userId}</td>
        <td>${trx.nominal}</td>
        <td>${trx.paymentMethod}</td>
        <td><span class="status-success">${trx.status}</span></td>
      `;
      table.appendChild(row);
    });
  }

  document.getElementById("totalTrx").innerText = data.length;
  document.getElementById("totalIncome").innerText =
    "Rp " + totalIncome.toLocaleString("id-ID");
});
