document.addEventListener('DOMContentLoaded', () => {
    
    // ==========================================
    // 1. SUPABASE & AUTH CONFIGURATION
    // ==========================================
    
    // CRITICAL: Replace these placeholders with your actual Supabase project credentials
    const SUPABASE_URL = 'PASTE_YOUR_PROJECT_URL_HERE';
    const SUPABASE_KEY = 'PASTE_YOUR_ANON_PUBLIC_KEY_HERE';

    // Initialize the Supabase Client
    const supabase = supabase.createClient(SUPABASE_URL, SUPABASE_KEY);

    // DOM Elements for Auth
    const authPage = document.getElementById('auth-page');
    const userStatusDisplay = document.getElementById('user-status-display');
    const userDisplayName = document.getElementById('user-display-name');
    const navLogoutBtn = document.getElementById('nav-logout-btn');
    const loginSection = document.getElementById('login-section');
    const signupSection = document.getElementById('signup-section');
    const authMessage = document.getElementById('auth-message');

    // Global State Container
    let appState = {
        currentPage: 'home-page',
        completedAssignments: JSON.parse(localStorage.getItem('completedAssignments')) ||,
        user: null // Will hold the Supabase User object
    };

    // ==========================================
    // 2. AUTHENTICATION LOGIC & HANDLERS
    // ==========================================

    // Toggle: Show Signup Form
    document.getElementById('go-to-signup').addEventListener('click', (e) => {
        e.preventDefault();
        loginSection.classList.add('hidden');
        signupSection.classList.remove('hidden');
        authMessage.classList.add('hidden');
    });

    // Toggle: Show Login Form
    document.getElementById('go-to-login').addEventListener('click', (e) => {
        e.preventDefault();
        signupSection.classList.add('hidden');
        loginSection.classList.remove('hidden');
        authMessage.classList.add('hidden');
    });

    // Helper: Display Success/Error Messages
    function showAuthMessage(msg, type) {
        authMessage.textContent = msg;
        authMessage.className = `auth-feedback ${type}`; // classes: 'success' or 'error'
        authMessage.classList.remove('hidden');
    }

    // HANDLER: Sign Up
    async function handleSignup() {
        const username = document.getElementById('signup-username').value;
        const email = document.getElementById('signup-email').value;
        const password = document.getElementById('signup-password').value;

        if (!email ||!password ||!username) {
            showAuthMessage("נא למלא את כל השדות", "error");
            return;
        }

        // We store 'username' in the user_metadata JSON blob
        const { data, error } = await supabase.auth.signUp({
            email: email,
            password: password,
            options: {
                data: { username: username }
            }
        });

        if (error) {
            showAuthMessage("שגיאה: " + error.message, "error");
        } else {
            showAuthMessage("הרשמה הצליחה! אנא אשר את המייל או התחבר.", "success");
        }
    }

    // HANDLER: Login
    async function handleLogin() {
        const email = document.getElementById('login-email').value;
        const password = document.getElementById('login-password').value;

        if (!email ||!password) {
            showAuthMessage("נא למלא אימייל וסיסמה", "error");
            return;
        }

        const { data, error } = await supabase.auth.signInWithPassword({
            email: email,
            password: password
        });

        if (error) {
            showAuthMessage("התחברות נכשלה: " + error.message, "error");
        } else {
            // Success is implicitly handled by onAuthStateChange
            console.log("Login successful via Supabase");
        }
    }

    // HANDLER: Logout
    async function handleLogout() {
        const { error } = await supabase.auth.signOut();
        if (error) console.error("Logout error:", error);
    }

    // Bind Buttons
    document.getElementById('btn-signup-action').addEventListener('click', handleSignup);
    document.getElementById('btn-login-action').addEventListener('click', handleLogin);
    navLogoutBtn.addEventListener('click', handleLogout);

    // ==========================================
    // 3. AUTH STATE LISTENER (Observer Pattern)
    // ==========================================
    
    // This listener fires automatically on Login, Logout, or Token Refresh.
    // It is the single source of truth for the UI state.
    supabase.auth.onAuthStateChange((event, session) => {
        console.log("Auth Event Triggered:", event);
        
        if (session) {
            // --- STATE: AUTHENTICATED ---
            appState.user = session.user;
            const username = session.user.user_metadata.username |

| "משתמש";
            userDisplayName.textContent = username;
            
            // 1. Show User Status in Nav
            userStatusDisplay.classList.remove('hidden');
            
            // 2. Unlock Protected Routes in Nav
            document.querySelectorAll('.protected-route').forEach(el => el.classList.remove('hidden'));

            // 3. Redirect Logic
            // If the user was on the home page or auth page, send them to the dashboard
            if (appState.currentPage === 'home-page' |

| appState.currentPage === 'auth-page') {
                showPage('assignment-hub-page');
            }

        } else {
            // --- STATE: UNAUTHENTICATED ---
            appState.user = null;
            userStatusDisplay.classList.add('hidden');
            
            // 1. Hide Protected Routes
            document.querySelectorAll('.protected-route').forEach(el => el.classList.add('hidden'));

            // 2. Force Redirect to Home if on a protected page
            if (appState.currentPage!== 'home-page' && appState.currentPage!== 'auth-page') {
                showPage('home-page');
            }
        }
    });

    // ==========================================
    // 4. CORE APPLICATION LOGIC (LMS Features)
    // ==========================================

    // --- YOUTUBE LINKS DATA ---
    const youtubeLinks = {
        "abc-video": { title: "סרטון ABC", url: "https://www.youtube.com/embed/BELlZKpi1Zs" },
        "1": { title: "סרטון 1", url: "https://www.youtube.com/embed/3z4TQfNiqLc" },
        "2": { title: "סרטון 2", url: "https://www.youtube.com/embed/erLktxdLIWU" },
        "3": { title: "סרטון 3", url: "https://www.youtube.com/embed/hKIpbGK3fSM" },
        "4": { title: "סרטון 4", url: "https://www.youtube.com/embed/DuEM_d2GGF8" },
        //... (Include full list from original snippet for production)
        "36": { title: "סרטון 36", url: "https://www.youtube.com/embed/your-video-id-36" }
    };

    // --- PRESENTATION LINKS DATA ---
    const presentationLinks = {
        "1": { title: "My First Presentation", url: "https://docs.google.com/presentation/d/e/2PACX-1vR7vLvZY9TasfkVqcGfpp6mwr1K5amT4FhKUGZwH58UdBo5hVISeIgdc8jjVKoAcCjG7Oq3l1zcF5BT/pubembed?start=false&loop=false&delayms=3000" },
        "2": { title: "מצגת 2", url: "YOUR_GOOGLE_SLIDES_EMBED_URL_2" }
    };

    // --- DOM REFERENCES ---
    const allPages = document.querySelectorAll('.page');
    const taskPageContent = document.getElementById('task-content');

    // --- NAVIGATION CONTROLLER ---
    function showPage(pageId) {
        // SECURITY GUARD: Prevent unauthorized access to specific IDs
        const protectedPages = ['assignment-hub-page', 'task-page', 'quiz-page', 'youtube-page', 'podcast-page'];
        
        // If user tries to access a protected page while not logged in -> Redirect to Auth
        if (protectedPages.includes(pageId) &&!appState.user) {
            console.warn("Unauthorized access attempt. Redirecting to auth.");
            pageId = 'auth-page';
        }

        // Hide all pages
        allPages.forEach(page => {
            page.classList.add('hidden');
        });
        
        // Show target page
        const pageToShow = document.getElementById(pageId);
        if (pageToShow) {
            pageToShow.classList.remove('hidden');
            appState.currentPage = pageId;
            window.scrollTo(0, 0);
        }
        
        // Component-Specific Initializers
        if (pageId === 'assignment-hub-page') {
            updateAssignmentHub();
        }

        // Layout Adjustments (Sidebar Hiding for Cinema Mode)
        if (pageId === 'video-player-page' |

| pageId === 'presentation-viewer-page') {
            document.body.classList.add('video-mode');
        } else {
            document.body.classList.remove('video-mode');
        }
        
        // Close mobile sidebar on nav
        document.body.classList.remove('sidebar-open');
    }

    // Event Listeners: Nav Buttons
    document.querySelectorAll('.nav-button').forEach(button => {
        button.addEventListener('click', () => {
            showPage(button.dataset.target);
        });
    });

    // Event Listeners: Back Buttons
    document.querySelectorAll('.back-button').forEach(button => {
        button.addEventListener('click', () => {
            showPage(button.dataset.target);
        });
    });

    // Event Listener: Home Page "Start" Button
    const mainLoginStartBtn = document.getElementById('main-login-start-btn');
    if (mainLoginStartBtn) {
        mainLoginStartBtn.addEventListener('click', () => {
            if (appState.user) {
                showPage('assignment-hub-page');
            } else {
                showPage('auth-page');
            }
        });
    }

    // --- MOBILE MENU TOGGLE ---
    const mobileMenuBtn = document.getElementById('mobile-menu-btn');
    if (mobileMenuBtn) {
        mobileMenuBtn.addEventListener('click', () => {
            document.body.classList.toggle('sidebar-open');
        });
    }

    // --- ASSIGNMENT LOGIC ---
    function updateAssignmentHub() {
        document.querySelectorAll('.assignment-box').forEach(box => {
            const assignmentId = box.dataset.assignment;
            if (appState.completedAssignments.includes(assignmentId)) {
                box.classList.add('completed');
            } else {
                box.classList.remove('completed');
            }
        });
    }

    document.querySelectorAll('.assignment-box').forEach(box => {
        box.addEventListener('click', () => {
            startAssignment(box.dataset.assignment);
        });
    });

    function markAssignmentAsCompleted(assignmentId) {
        if (!appState.completedAssignments.includes(assignmentId)) {
            appState.completedAssignments.push(assignmentId);
            localStorage.setItem('completedAssignments', JSON.stringify(appState.completedAssignments));
        }
    }

    // --- YOUTUBE & PRESENTATION INIT ---
    function initYouTubePage() {
        const grid = document.querySelector('#youtube-page.youtube-grid');
        grid.innerHTML = ''; 
        for (let i = 1; i <= 36; i++) {
            const video = youtubeLinks;
            if (video && video.url.includes("embed")) {
                const button = document.createElement('button');
                button.className = 'action-button';
                button.textContent = video.title;
                button.addEventListener('click', () => {
                    playVideo(video.url, video.title);
                });
                grid.appendChild(button);
            }
        }
    }

    function playVideo(url, title) {
        document.getElementById('video-player-title').textContent = title;
        document.getElementById('youtube-iframe').src = url;
        showPage('video-player-page');
    }

    document.querySelector('#video-player-page.back-button').addEventListener('click', () => {
        document.getElementById('youtube-iframe').src = ''; 
    });

    function initPresentationsPage() {
        const grid = document.querySelector('#presentations-page.presentation-grid');
        grid.innerHTML = '';
        for (let i = 1; i <= 12; i++) {
            const pres = presentationLinks;
            if (pres && pres.url.startsWith("https://")) {
                const button = document.createElement('button');
                button.className = 'action-button';
                button.textContent = pres.title;
                button.addEventListener('click', () => {
                    playPresentation(pres.url, pres.title);
                });
                grid.appendChild(button);
            }
        }
    }

    function playPresentation(url, title) {
        document.getElementById('presentation-viewer-title').textContent = title;
        document.getElementById('presentation-iframe').src = url;
        showPage('presentation-viewer-page');
    }

    document.querySelector('#presentation-viewer-page.back-button').addEventListener('click', () => {
        document.getElementById('presentation-iframe').src = '';
    });

    // --- DYNAMIC TASK RENDERER ---
    function startAssignment(assignmentId) {
        taskPageContent.innerHTML = '';
        let content = `<h1>${getAssignmentTitle(assignmentId)}</h1>`;
        
        // Content Switching Logic based on Assignment ID
        switch(assignmentId) {
            case 'abc':
                content += `<p>בחר שלב בלימוד ה-ABC:</p>`;
                content += `<button class="action-button" id="abc-video-btn">שלב 1: צפה בסרטון</button>`;
                content += `<button class="action-button" id="abc-audio-btn">שלב 2: האזן לאותיות</button>`;
                content += `<button class="action-button" id="abc-special-btn">שלב 3: מקרים מיוחדים</button>`;
                content += `<button class="action-button task-start-btn" data-quiz="abcQuiz">שלב 4: בוא נתרגל</button>`;
                taskPageContent.innerHTML = content;
                showPage('task-page');
                
                document.getElementById('abc-video-btn').addEventListener('click', () => {
                    playVideo(youtubeLinks['abc-video'].url, youtubeLinks['abc-video'].title);
                });
                document.getElementById('abc-audio-btn').addEventListener('click', () => {
                    createAbcAudioPage();
                    showPage('abc-audio-page');
                });
                document.getElementById('abc-special-btn').addEventListener('click', () => {
                    createAbcSpecialCasesPage(assignmentId);
                });
                break;
            
            // Note: Add cases for 'verbs', 'future-simple', etc. from original code here.
            //...
            
            default:
                 content += `<p>תוכן המשימה בטעינה...</p>`;
                 taskPageContent.innerHTML = content;
                 showPage('task-page');
                 break;
        }
        
        // Attach listener to any generated quiz buttons
        document.querySelectorAll('.task-start-btn').forEach(btn => {
            btn.addEventListener('click', () => {
                startQuiz(btn.dataset.quiz, assignmentId);
            });
        });
    }
    
    function getAssignmentTitle(assignmentId) {
        const titles = { 'reading': 'קריאה', 'grammar': 'דקדוק', 'writing': 'כתיבה', 'speaking': 'דיבור', 'adjectives': 'שמות תואר', 'abc': 'ה-ABC האנגלי', 'verbs': 'פעלים', 'future-simple': 'עתיד פשוט', 'simple-past': 'עבר פשוט' };
        return titles[assignmentId] |

| 'משימה';
    }

    // --- PLACEHOLDERS FOR CONTENT GENERATORS (Copy from legacy jdrjud.txt) ---
    function createChainedContentPage(assignmentId, steps, onComplete) { /* Implementation */ }
    function createAbcSpecialCasesPage(assignmentId) { /* Implementation */ }
    function createAbcAudioPage() { /* Implementation */ }

    // --- QUIZ LOGIC & DATA ---
    const quizData = {
        'abcQuiz': [
            { q: "איזה אות באה אחרי K?", a: "L", o: ["A", "L", "Z"] }
        ]
        // Add full quiz dataset here
    };

    function startQuiz(quizId, assignmentId) {
        // Implementation of quiz engine (shuffle, display, check answer)
        //...
        showPage('quiz-page');
    }

    // --- WORD TOOL INTEGRATION ---
    const wordToolBtn = document.getElementById('word-tool-btn');
    const wordInputAuto = document.getElementById('word-input-auto');
    const resultsContainer = document.getElementById('word-tool-results');
    
    if (wordToolBtn && wordInputAuto) {
        wordToolBtn.addEventListener('click', async () => {
            const originalWord = wordInputAuto.value.trim();
            if (!originalWord) return;
            resultsContainer.innerHTML = "מעבד בקשה...";
            // API Fetch logic here...
        });
    }

    // ==========================================
    // 5. BOOTSTRAP
    // ==========================================
    initYouTubePage();
    initPresentationsPage();
    
    // Initial Auth Check:
    // We run getSession() once to handle the edge case where the user refreshes.
    // However, onAuthStateChange will usually fire immediately after this.
    supabase.auth.getSession().then(({ data: { session } }) => {
        if (!session) {
            // Ensure we are on a public page
            if (appState.currentPage!== 'auth-page') showPage('home-page');
        }
    });

});
