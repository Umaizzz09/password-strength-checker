const passwordInput = document.getElementById("password");

function togglePassword() {
    passwordInput.type =
        passwordInput.type === "password" ? "text" : "password";
}

function updateCheck(id, condition, text) {
    const element = document.getElementById(id);

    if (condition) {
        element.innerHTML = "✔ " + text;
        element.className = "valid";
    } else {
        element.innerHTML = "❌ " + text;
        element.className = "invalid";
    }
}

passwordInput.addEventListener("input", () => {
    const password = passwordInput.value;

    let score = 0;

    if (password.length >= 8) score++;
    if (/[A-Z]/.test(password)) score++;
    if (/[a-z]/.test(password)) score++;
    if (/[0-9]/.test(password)) score++;
    if (/[^A-Za-z0-9]/.test(password)) score++;

    const strengthText = document.getElementById("strength-text");
    const strengthFill = document.getElementById("strength-fill");

    // Strength
    if (score <= 2) {
        strengthText.innerText = "Weak";
        strengthFill.style.width = "30%";
        strengthFill.style.background = "#ff4d4d";
    } else if (score <= 4) {
        strengthText.innerText = "Medium";
        strengthFill.style.width = "60%";
        strengthFill.style.background = "#ffaa00";
    } else {
        strengthText.innerText = "Strong";
        strengthFill.style.width = "100%";
        strengthFill.style.background = "#00ff9f";
    }

    // Percentage
    let percent = Math.round((score / 5) * 100);
    document.getElementById("strength-percent").innerText =
        "Strength Level: " + percent + "%";

    // Checklist
    updateCheck("length", password.length >= 8, "At least 8 characters");
    updateCheck("upper", /[A-Z]/.test(password), "Uppercase letter");
    updateCheck("lower", /[a-z]/.test(password), "Lowercase letter");
    updateCheck("number", /[0-9]/.test(password), "Number");
    updateCheck("special", /[^A-Za-z0-9]/.test(password), "Special character");

    // Entropy
    const entropy = password.length * Math.log2(94);
    document.getElementById("entropy").innerText =
        "Entropy: " + entropy.toFixed(2);

    // Crack time
    function formatTime(seconds) {
        if (seconds < 60) return seconds.toFixed(0) + " sec";
        if (seconds < 3600) return (seconds/60).toFixed(1) + " min";
        if (seconds < 86400) return (seconds/3600).toFixed(1) + " hrs";
        if (seconds < 31536000) return (seconds/86400).toFixed(1) + " days";
        if (seconds < 3153600000) return (seconds/31536000).toFixed(1) + " years";
        return "Centuries+";
    }

    let guesses = Math.pow(2, entropy);
    let seconds = guesses / 1000000;

    document.getElementById("crack-time").innerText =
        "Estimated crack time: " + formatTime(seconds);

    // Dictionary check
    const commonPasswords = ["123456", "password", "qwerty", "admin"];
    if (commonPasswords.includes(password)) {
        document.getElementById("dictionary-warning").innerText =
            "⚠️ Common password detected!";
    } else {
        document.getElementById("dictionary-warning").innerText = "";
    }

    // Suggestions
    let suggestion = "";

    if (password.length < 8) suggestion += "Add more characters. ";
    if (!/[A-Z]/.test(password)) suggestion += "Add uppercase letter. ";
    if (!/[0-9]/.test(password)) suggestion += "Add numbers. ";
    if (!/[^A-Za-z0-9]/.test(password)) suggestion += "Add special characters. ";

    document.getElementById("suggestion").innerText =
        suggestion || "Good password!";
});