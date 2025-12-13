// ✅ FUNGSI GLOBAL (WAJIB)
function clearData() {
  if (confirm("Yakin hapus semua transaksi?")) {
    localStorage.removeItem("transactions");
    location.reload();
  }
}

document.addEventListener("DOMContentLoaded", () => {
  const data = JSON.parse(localStorage.getItem("transactions")) || [];
  const table = document.getElementById("adminTable");

  table.innerHTML = "";

  if (data.length === 0) {
    table.innerHTML =
      "<tr><td colspan='5'>Belum ada transaksi</td></tr>";
  } else {
    data.forEach(trx => {
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
  document.getElementById("totalIncome").innerText = "Rp 0";
});
