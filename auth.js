let isLogin = false;

/* =========================
   ПЕРЕКЛЮЧЕНИЕ РЕЖИМА
========================= */
function setMode(login){
  isLogin = login;

  const title = document.getElementById("formTitle");
  const nameField = document.getElementById("name");
  const registerTab = document.getElementById("registerTab");
  const loginTab = document.getElementById("loginTab");
  const switchText = document.querySelector(".switch-link");
  const errorBox = document.getElementById("errorBox");

  title.innerText = login ? "Вход" : "Регистрация";
  nameField.style.display = login ? "none" : "block";

  registerTab.classList.toggle("active", !login);
  loginTab.classList.toggle("active", login);

  switchText.innerText = login
    ? "Нет аккаунта? Зарегистрироваться"
    : "Уже есть аккаунт? Войти";

  errorBox.innerText = "";
}

function toggleMode(){
  setMode(!isLogin);
}

/* =========================
   ВАЛИДАЦИЯ
========================= */
function isValidEmail(email){
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

/* =========================
   ОСНОВНАЯ КНОПКА (ВХОД/РЕГ)
========================= */
function submitAuth(){
  const nameInput = document.getElementById("name");
  const emailInput = document.getElementById("email");
  const passInput = document.getElementById("password");
  const errorBox = document.getElementById("errorBox");

  const name = nameInput.value.trim();
  const email = emailInput.value.trim().toLowerCase();
  const password = passInput.value.trim();

  errorBox.innerText = "";

  if(!email || !password || (!isLogin && !name)){
    errorBox.innerText = "Заполни все поля";
    return;
  }

  if(!isValidEmail(email)){
    errorBox.innerText = "Введите корректный email";
    return;
  }

  const userKey = "user_" + email;
  let existingUser = JSON.parse(localStorage.getItem(userKey));

  /* ===== РЕГИСТРАЦИЯ ===== */
  if(!isLogin){
    if(password.length < 6){
      errorBox.innerText = "Пароль минимум 6 символов";
      return;
    }

    if(existingUser){
      errorBox.innerText = "Пользователь уже существует";
      return;
    }

    const newUser = {
      name,
      email,
      password,
      xp: 0,
      level: 1,
      achievements: [],
      lessonsCompleted: []
    };

    localStorage.setItem(userKey, JSON.stringify(newUser));
    localStorage.setItem("currentUser", email);

    window.location.href = "profile.html";
    return;
  }

  /* ===== ВХОД ===== */
  if(!existingUser || existingUser.password !== password){
    errorBox.innerText = "Неверный email или пароль";
    return;
  }

  localStorage.setItem("currentUser", email);
  window.location.href = "profile.html";
}

/* =========================
   ЗАЩИТА СТРАНИЦ
========================= */
function requireAuth(){
  if(!localStorage.getItem("currentUser")){
    window.location.href = "auth.html";
  }
}

/* =========================
   ПОЛУЧИТЬ ПОЛЬЗОВАТЕЛЯ
========================= */
function getCurrentUser(){
  const email = localStorage.getItem("currentUser");
  if(!email) return null;
  return JSON.parse(localStorage.getItem("user_" + email));
}

/* =========================
   ВЫХОД
========================= */
function logout(){
  localStorage.removeItem("currentUser");
  window.location.href = "auth.html";
}

function openPrivacy(){
  alert("Политика конфиденциальности:\n\nМы храним только email, имя и прогресс обучения. Данные используются только внутри платформы CodeStart и не передаются третьим лицам.");
}

function openTerms(){
  alert("Пользовательское соглашение:\n\nИспользуя платформу CodeStart, вы соглашаетесь использовать материалы только в образовательных целях. Администрация не несёт ответственности за неправильное использование материалов.");
}
