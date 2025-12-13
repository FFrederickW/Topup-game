function loadTransactions() {
  const table = document.getElementById("transactionTable");
  table.innerHTML = "";

  const transactions =
    JSON.parse(localStorage.getItem("transactions")) || [];

  if (transactions.length === 0) {
    table.innerHTML =
      "<tr><td colspan='8'>Belum ada transaksi</td></tr>";
    return;
  }

  transactions.forEach(trx => {
    const row = document.createElement("tr");

    row.innerHTML = `
      <td>${trx.name}</td>
      <td>${trx.id}</td>
      <td>${trx.userId}</td>
      <td>${trx.zoneId}</td>
      <td>${trx.nominal}</td>
      <td>${trx.paymentMethod}</td>
      <td>${trx.status}</td>
      <td>
        <a href="invoice.html?id=${trx.id}">Invoice</a>
      </td>
    `;

    table.appendChild(row);
  });
}

window.addEventListener("storage", () => {
  loadTransactions();
});


// LOAD SAAT HALAMAN DIBUKA
loadTransactions();
