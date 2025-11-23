// auth.js - initialize supabase and provide auth functions
const SUPABASE_URL = "https://pzbgdyakdckojstksyfd.supabase.co";
const SUPABASE_KEY = "sb_publishable__0qnbB7wyd2XNk7tFV7vAA_cu9h5Q9r";
const supabase = supabase.createClient(SUPABASE_URL, SUPABASE_KEY);

const ADMINS = ["Carl.d.rogers@gmail.com","Englishyourway0@gmail.com"];

async function signup() {
    const email = document.getElementById("signup-email").value;
    const password = document.getElementById("signup-password").value;
    const username = document.getElementById("signup-username").value;
    if (!email || !password || !username) return alert("Fill all fields.");
    const { error } = await supabase.auth.signUp({ email, password, options: { data: { username } } });
    if (error) alert(error.message); else { alert("Account created! You can now log in."); showLogin(); }
}

async function login() {
    const email = document.getElementById("login-email").value;
    const password = document.getElementById("login-password").value;
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) return alert(error.message);
    if (ADMINS.includes(email) && password === "CarlRogersTeacherPage") { window.location.href = "admin.html"; return; }
    window.location.href = "index.html";
}

async function logout() { await supabase.auth.signOut(); window.location.href = "login.html"; }

function showLogin() { document.getElementById("login-section")?.classList.remove("hidden"); document.getElementById("signup-section")?.classList.add("hidden"); }
function showSignUp(){ document.getElementById("login-section")?.classList.add("hidden"); document.getElementById("signup-section")?.classList.remove("hidden"); }

// auth state listener
supabase.auth.onAuthStateChange(async (event, session) => {
    if (session?.user) {
        await Progress.ensureProfile(session.user);
        await Progress.ensureProgress(session.user.id);
        const isAdmin = ADMINS.includes(session.user.email);
        if (isAdmin && !document.getElementById("admin-button")) {
            const btn = document.createElement("button");
            btn.id = "admin-button";
            btn.textContent = "Admin Panel";
            btn.style.position = "fixed"; btn.style.bottom = "20px"; btn.style.right = "20px"; btn.style.zIndex = "999999";
            btn.onclick = () => window.location.href = "admin.html";
            document.body.appendChild(btn);
        }
    } else {
        if (!window.location.pathname.includes("login.html")) window.location.href = "login.html";
    }
});

// check session on load
(async function checkSession(){
    const { data: { session } } = await supabase.auth.getSession();
    if (session && !window.location.pathname.includes("login.html")) {
        await Progress.ensureProfile(session.user);
        await Progress.ensureProgress(session.user.id);
    }
})();
