let isLogin = false;

function toggleMode() {
    isLogin = !isLogin;

    document.getElementById("formTitle").innerText = isLogin ? "Вход" : "Регистрация";
    document.querySelector(".switch").innerText = isLogin
        ? "Нет аккаунта? Зарегистрироваться"
        : "Уже есть аккаунт? Войти";

    document.getElementById("name").style.display = isLogin ? "none" : "block";
}

function submitAuth() {
    const name = document.getElementById("name").value.trim();
    const email = document.getElementById("email").value.trim().toLowerCase();
    const password = document.getElementById("password").value.trim();

    if (!email || !password || (!isLogin && !name)) {
        alert("Заполни все поля");
        return;
    }

    // ===== ПРОВЕРКА СЛОЖНОСТИ ПАРОЛЯ =====
    if (!isLogin) {
        if (password.length < 6) {
            alert("Пароль должен быть минимум 6 символов");
            return;
        }
        if (!/[A-Z]/.test(password) || !/[0-9]/.test(password)) {
            alert("Пароль должен содержать хотя бы 1 заглавную букву и 1 цифру");
            return;
        }
    }

    const userKey = "user_" + email;
    let existingUser = JSON.parse(localStorage.getItem(userKey));

    // ===== РЕГИСТРАЦИЯ =====
    if (!isLogin) {
        if (existingUser) {
            alert("Пользователь уже существует");
            return;
        }

        const newUser = {
            name: name,
            email: email,
            password: password,
            achievements: [],
            lessonsCompleted: [],
            xp: 0,
            level: 1,
            subscription: null
        };

        localStorage.setItem(userKey, JSON.stringify(newUser));
        localStorage.setItem("currentUser", email);

        window.location.href = "profile.html";
    }

    // ===== ВХОД =====
    else {
        if (!existingUser || existingUser.password !== password) {
            alert("Неверный email или пароль");
            return;
        }

        localStorage.setItem("currentUser", email);
        window.location.href = "profile.html";
    }
}
