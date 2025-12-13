let selectedNominal = null;

// pilih nominal
document.querySelectorAll('.topup-grid .card').forEach(card => {
  card.addEventListener('click', () => {
    document
      .querySelectorAll('.topup-grid .card')
      .forEach(c => c.classList.remove('active'));

    card.classList.add('active');
    selectedNominal = card.querySelector('h3').innerText;
  });
});

function processPayment() {
  const payment = document.querySelector('input[name="payment"]:checked');

  // INPUT USER DATA
  const name = document.getElementById("nama").value;
  const userId = document.getElementById("userId").value;
  const zoneId = document.getElementById("zoneId").value;
  const phone = document.getElementById("phone").value;

  if (!name || !userId || !zoneId || !phone) {
    alert("Lengkapi data pelanggan");
    return;
  }

  if (!selectedNominal) {
    alert("Silakan pilih nominal top up");
    return;
  }

  if (!payment) {
    alert("Silakan pilih metode pembayaran");
    return;
  }

  // BUAT DATA TRANSAKSI
  const transaction = {
    id: "TRX-" + Date.now(),
    name: name,
    userId: userId,
    zoneId: zoneId,
    phone: phone,
    nominal: selectedNominal,
    paymentMethod: payment.value,
    status: "PENDING",
    date: new Date().toLocaleString()
  };

  // AMBIL DATA LAMA
  let transactions =
    JSON.parse(localStorage.getItem("transactions")) || [];

  // SIMPAN DATA BARU
  transactions.push(transaction);
  localStorage.setItem("transactions", JSON.stringify(transactions));

  // ARAHKAN KE HALAMAN BAYAR
  window.location.href = "pay.html?id=" + transaction.id;
}
