// ====== REGISTER USER ======
function registerUser(username, password) {

  if (!username || !password) {
    return { success: false, message: "Semua field harus diisi!" };
  }

  if (password.length < 5) {
    return { success: false, message: "Password minimal 5 karakter!" };
  }

  let users = JSON.parse(localStorage.getItem("users")) || [];

  // Cek user sudah ada atau belum
  let exist = users.find(u => u.username === username);

  if (exist) {
    return { success: false, message: "Username sudah digunakan!" };
  }

  // Simpan user baru dengan tanggal
  users.push({ 
    username, 
    password,
    date: new Date().toLocaleString()
  });

  localStorage.setItem("users", JSON.stringify(users));

  return { success: true, message: "Register berhasil!" };
}



// ====== SIMPAN LOGIN HISTORY ======
function saveLoginHistory(username) {
  let history = JSON.parse(localStorage.getItem("loginHistory")) || [];

  history.push({
    username: username,
    time: new Date().toLocaleString()
  });

  localStorage.setItem("loginHistory", JSON.stringify(history));
}



// ====== LOGIN USER ======
function loginUser(username, password) {

  let users = JSON.parse(localStorage.getItem("users")) || [];

  let found = users.find(u => u.username === username && u.password === password);

  if (found) {
    localStorage.setItem("loggedInUser", username);
    saveLoginHistory(username);
    return { success: true, message: "Login berhasil!" };
  }

  return { success: false, message: "Username atau password salah!" };
}



// ====== LOGOUT ======
function logoutUser() {
  localStorage.removeItem("loggedInUser");
}
