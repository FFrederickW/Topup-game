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

  if (!/^[A-Za-z\s]{3,}$/.test(name)) {
    alert("❌ Nama minimal 3 huruf dan tidak boleh angka");
    return;
  }

  // User ID: angka 6–12 digit
  if (!/^[0-9]{6,12}$/.test(userId)) {
    alert("❌ User ID harus angka 6–12 digit");
    return;
  }

 
  // Server ID: angka 4–6 digit
  if (!/^[0-9]{4,6}$/.test(zoneId)) {
    alert("❌ Server ID harus angka 4–6 digit");
    return;
  }

  // Nomor WhatsApp: 08xxxxxxxxxx
  if (!/^08[0-9]{8,11}$/.test(phone)) {
    alert("❌ Nomor WhatsApp tidak valid");
    return;
  }

  if (!selectedNominal) {
    alert("❌ Silakan pilih nominal top up");
    return;
  }

  if (!payment) {
    alert("❌ Silakan pilih metode pembayaran");
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
