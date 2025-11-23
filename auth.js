// =============================================
// SUPABASE CONFIG
// =============================================
const SUPABASE_URL = "https://pzbgdyakdckojstksyfd.supabase.co";
const SUPABASE_KEY = "sb_publishable__0qnbB7wyd2XNk7tFV7vAA_cu9h5Q9r";

const supabase = supabase.createClient(SUPABASE_URL, SUPABASE_KEY);

// ADMIN EMAILS
const ADMINS = [
    "Carl.d.rogers@gmail.com",
    "Englishyourway0@gmail.com"
];

// =============================================
// LOGIN / SIGNUP
// =============================================

async function signup() {
    const email = document.getElementById("signup-email").value;
    const password = document.getElementById("signup-password").value;
    const username = document.getElementById("signup-username").value;

    if (!email || !password || !username) return alert("Fill all fields.");

    const { error } = await supabase.auth.signUp({
        email,
        password,
        options: {
            data: { username }
        }
    });

    if (error) alert(error.message);
    else {
        alert("Account created! You can now log in.");
        showLogin();
    }
}

async function login() {
    const email = document.getElementById("login-email").value;
    const password = document.getElementById("login-password").value;

    const { error } = await supabase.auth.signInWithPassword({
        email,
        password,
    });

    if (error) return alert(error.message);

    // Admin password override
    if (ADMINS.includes(email) && password === "CarlRogersTeacherPage") {
        window.location.href = "admin.html";
        return;
    }

    window.location.href = "index.html";
}

async function logout() {
    await supabase.auth.signOut();
    window.location.href = "login.html";
}

// =============================================
// PAGE CONTROL
// =============================================
function showLogin() {
    document.getElementById("login-section")?.classList.remove("hidden");
    document.getElementById("signup-section")?.classList.add("hidden");
}

function showSignUp() {
    document.getElementById("login-section")?.classList.add("hidden");
    document.getElementById("signup-section")?.classList.remove("hidden");
}

// =============================================
// BLOCK UNAUTHORIZED USERS
// =============================================

async function enforceLogin() {
    const { data: { session } } = await supabase.auth.getSession();

    const isLoginPage = window.location.pathname.includes("login.html");
    const isAdminPage = window.location.pathname.includes("admin.html");

    // NOT LOGGED IN → redirect to login
    if (!session && !isLoginPage) {
        window.location.href = "login.html";
        return;
    }

    // LOGGED IN NORMAL USER on admin.html → block them
    if (session && isAdminPage && !ADMINS.includes(session.user.email)) {
        alert("Admins only.");
        window.location.href = "index.html";
        return;
    }

    // INSERT ADMIN BUTTON on normal pages
    if (!isAdminPage && session && ADMINS.includes(session.user.email)) {
        const btn = document.createElement("button");
        btn.textContent = "Admin Mode";
        btn.style = "position:fixed;bottom:20px;right:20px;padding:12px;";
        btn.onclick = () => window.location.href = "admin.html";
        document.body.appendChild(btn);
    }
}

enforceLogin();
