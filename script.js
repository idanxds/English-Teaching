document.addEventListener('DOMContentLoaded', () => {
    
    // --- YOUTUBE CONFIGURATION ---
    // I have added all 20 of your new links.
    const youtubeLinks = {
        "abc-video": { title: "סרטון ABC", url: "https://www.youtube.com/embed/BELlZKpi1Zs" },
        "1": { title: "סרטון 1", url: "https://www.youtube.com/embed/3z4TQfNiqLc" },
        "2": { title: "סרטון 2", url: "https://www.youtube.com/embed/erLktxdLIWU" },
        "3": { title: "סרטון 3", url: "https://www.youtube.com/embed/hKIpbGK3fSM" },
        "4": { title: "סרטון 4", url: "https://www.youtube.com/embed/DuEM_d2GGF8" },
        "5": { title: "סרטון 5", url: "https://www.youtube.com/embed/8r_JUSXBQXA" },
        "6": { title: "סרטון 6", url: "https://www.youtube.com/embed/W4hPBfuabkM" },
        "7": { title: "סרטון 7", url: "https://www.youtube.com/embed/l3XIJFbvBwM" },
        "8": { title: "סרטון 8", url: "https://www.youtube.com/embed/uMVU1toZ7PY" },
        "9": { title: "סרטון 9", url: "https://www.youtube.com/embed/vvDajY8AnQA" },
        "10": { title: "סרטון 10", url: "https://www.youtube.com/embed/yKCkjNynI3o" },
        "11": { title: "סרטון 11", url: "https://www.youtube.com/embed/IOV_vbLyHw0" },
        "12": { title: "סרטון 12", url: "https://www.youtube.com/embed/OPz__UY1l5U" },
        "13": { title: "סרטון 13", url: "https://www.youtube.com/embed/FnzAzZJDq9U" },
        "14": { title: "סרטון 14", url: "https://www.youtube.com/embed/-8-PeyfHMVA" },
        "15": { title: "סרטון 15", url: "https://www.youtube.com/embed/hGos4rKSJKI" },
        "16": { title: "סרטון 16", url: "https://www.youtube.com/embed/TCIG2XszOLo" },
        "17": { title: "סרטון 17", url: "https://www.youtube.com/embed/FvucjOWqfrM" },
        "18": { title: "סרטון 18", url: "https://www.youtube.com/embed/FWtJE9jzjXo" },
        "19": { title: "סרטון 19", url: "https://www.youtube.com/embed/G8PE96MBZtU" },
        "20": { title: "סרטון 20", url: "https://www.youtube.com/embed/nXo1LufKDgc" },
        "21": { title: "סרטון 21", url: "https://www.youtube.com/embed/your-video-id-21" },
        "22": { title: "סרטון 22", url: "https://www.youtube.com/embed/your-video-id-22" },
        "23": { title: "סרטון 23", url: "https://www.youtube.com/embed/your-video-id-23" },
        "24": { title: "סרטון 24", url: "https://www.youtube.com/embed/your-video-id-24" },
        "25": { title: "סרטון 25", url: "https://www.youtube.com/embed/your-video-id-25" },
        "26": { title: "סרטון 26", url: "https://www.youtube.com/embed/your-video-id-26" },
        "27": { title: "סרטון 27", url: "https://www.youtube.com/embed/your-video-id-27" },
        "28": { title: "סרטון 28", url: "https://www.youtube.com/embed/your-video-id-28" },
        "29": { title: "סרטון 29", url: "https://www.youtube.com/embed/your-video-id-29" },
        "30": { title: "סרטון 30", url: "https://www.youtube.com/embed/your-video-id-30" },
        "31": { title: "סרטון 31", url: "https://www.youtube.com/embed/your-video-id-31" },
        "32": { title: "סרטון 32", url: "https://www.youtube.com/embed/your-video-id-32" },
        "33": { title: "סרטון 33", url: "https://www.youtube.com/embed/your-video-id-33" },
        "34": { title: "סרטון 34", url: "https://www.youtube.com/embed/your-video-id-34" },
        "35": { title: "סרטון 35", url: "https://www.youtube.com/embed/your-video-id-35" },
        "36": { title: "סרטון 36", url: "https://www.youtube.com/embed/your-video-id-36" },
    };

    // --- NEW: PRESENTATION CONFIGURATION ---
    const presentationLinks = {
        "1": { title: "My First Presentation", url: "https://docs.google.com/presentation/d/e/2PACX-1vR7vLvZY9TasfkVqcGfpp6mwr1K5amT4FhKUGZwH58UdBo5hVISeIgdc8jjVKoAcCjG7Oq3l1zcF5BT/pubembed?start=false&loop=false&delayms=3000" },
        "2": { title: "מצגת 2", url: "YOUR_GOOGLE_SLIDES_EMBED_URL_2" },
        // Add up to 12 here
        "12": { title: "מצגת 12", url: "YOUR_GOOGLE_SLIDES_EMBED_URL_12" },
    };
    
    // --- STATE MANAGEMENT ---
    let appState = {
        currentPage: 'home-page',
        completedAssignments: JSON.parse(localStorage.getItem('completedAssignments')) || []
    };
    
    // --- DOM ELEMENTS ---
    const app = document.getElementById('app');
    const allPages = document.querySelectorAll('.page');
    const taskPageContent = document.getElementById('task-content');

    // --- NAVIGATION ---
    function showPage(pageId) {
        allPages.forEach(page => {
            page.classList.add('hidden');
        });
        const pageToShow = document.getElementById(pageId);
        if (pageToShow) {
            pageToShow.classList.remove('hidden');
            appState.currentPage = pageId;
            window.scrollTo(0, 0);
        }
        
        // Special logic
        if (pageId === 'assignment-hub-page') {
            updateAssignmentHub();
        }

        // Logic for hiding sidebar
        if (pageId === 'video-player-page' || pageId === 'presentation-viewer-page') {
            document.body.classList.add('video-mode');
        } else {
            document.body.classList.remove('video-mode');
        }
        
        // Close mobile sidebar on any navigation
        document.body.classList.remove('sidebar-open');
    }

    // Main navigation (top bar)
    document.querySelectorAll('.nav-button').forEach(button => {
        button.addEventListener('click', () => {
            const targetPage = button.dataset.target;
            showPage(targetPage);
        });
    });

    // Back buttons
    document.querySelectorAll('.back-button').forEach(button => {
        button.addEventListener('click', () => {
            const targetPage = button.dataset.target;
            showPage(targetPage);
        });
    });
    
    // Home page "כניסה" button
    document.getElementById('login-button').addEventListener('click', () => {
        showPage('assignment-hub-page');
    });

    // --- NEW: MOBILE MENU ---
    const mobileMenuBtn = document.getElementById('mobile-menu-btn');
    if (mobileMenuBtn) {
        mobileMenuBtn.addEventListener('click', () => {
            document.body.classList.toggle('sidebar-open');
        });
    }

    // --- ASSIGNMENT HUB ---
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
            const assignmentId = box.dataset.assignment;
            startAssignment(assignmentId);
        });
    });

    function markAssignmentAsCompleted(assignmentId) {
        if (!appState.completedAssignments.includes(assignmentId)) {
            appState.completedAssignments.push(assignmentId);
            localStorage.setItem('completedAssignments', JSON.stringify(appState.completedAssignments));
        }
    }

    // --- YOUTUBE PAGE ---
    function initYouTubePage() {
        const grid = document.querySelector('#youtube-page .youtube-grid');
        grid.innerHTML = ''; // Clear old buttons
        // Start from 1, skip "abc-video"
        for (let i = 1; i <= 36; i++) {
            const video = youtubeLinks[i.toString()];
            if (video && video.url.includes("embed")) {
                const button = document.createElement('button');
                button.className = 'action-button';
                button.textContent = video.title;
                button.dataset.url = video.url;
                button.dataset.title = video.title;
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

    // Stop video when going back
    document.querySelector('#video-player-page .back-button').addEventListener('click', () => {
        document.getElementById('youtube-iframe').src = ''; // Stop video
    });

    // --- NEW: PRESENTATION PAGE ---
    function initPresentationsPage() {
        const grid = document.querySelector('#presentations-page .presentation-grid');
        grid.innerHTML = '';
        for (let i = 1; i <= 12; i++) { // Assuming max 12 presentations
            const pres = presentationLinks[i.toString()];
            if (pres && pres.url.startsWith("https://")) { // Only show if URL is not a placeholder
                const button = document.createElement('button');
                button.className = 'action-button';
                button.textContent = pres.title;
                button.dataset.url = pres.url;
                button.dataset.title = pres.title;
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

    // Stop presentation when going back
    document.querySelector('#presentation-viewer-page .back-button').addEventListener('click', () => {
        document.getElementById('presentation-iframe').src = '';
    });
    
    // --- TASK & ASSIGNMENT LOADER (FIXED) ---
    
    function startAssignment(assignmentId) {
        // Clear previous content
        taskPageContent.innerHTML = '';
        
        let content = `<h1>${getAssignmentTitle(assignmentId)}</h1>`;
        
        switch(assignmentId) {
            // --- Original Assignments ---
            case 'abc':
                content += `<p>בחר שלב בלימוד ה-ABC:</p>`;
                content += `<button class="action-button" id="abc-video-btn">שלב 1: צפה בסרטון</button>`;
                content += `<button class="action-button" id="abc-audio-btn">שלב 2: האזן לאותיות</button>`;
                content += `<button class="action-button" id="abc-special-btn">שלב 3: מקרים מיוחדים</button>`;
                content += `<button class="action-button task-start-btn" data-quiz="abcQuiz">שלב 4: בוא נתרגל</button>`;
                
                // 1. Add content to the page
                taskPageContent.innerHTML = content;
                // 2. Show the page
                showPage('task-page');
                // 3. NOW add listeners to the buttons that exist
                
                document.getElementById('abc-video-btn').addEventListener('click', () => {
                    const video = youtubeLinks['abc-video'];
                    playVideo(video.url, video.title);
                });
                document.getElementById('abc-audio-btn').addEventListener('click', () => {
                    createAbcAudioPage();
                    showPage('abc-audio-page');
                });
                document.getElementById('abc-special-btn').addEventListener('click', () => {
                    createAbcSpecialCasesPage(assignmentId);
                });
                break;
            
            case 'verbs':
                content += `<p>בחר שלב בלימוד פעלים:</p>`;
                content += `<button class="action-button" id="verbs-table-btn">שלב 1: טבלת פעלים</button>`;
                content += `<button class="action-button task-start-btn" data-quiz="verbs1">שלב 2: תרגול פעלים</button>`;
                content += `<button class="action-button" id="verbs-sentence-btn">שלב 3: בניית משפט</button>`;
                taskPageContent.innerHTML = content;
                showPage('task-page');
                
                document.getElementById('verbs-table-btn').addEventListener('click', createVerbsTablePage);
                document.getElementById('verbs-sentence-btn').addEventListener('click', () => {
                    createSentenceBuilderPage(assignmentId);
                    showPage('sentence-builder-page');
                });
                break;
                
            case 'future-simple':
                content += `<p>בחר שלב בלימוד עתיד פשוט:</p>`;
                content += `<button class="action-button" id="future-simple-expl-btn">שלב 1: הסבר</button>`;
                content += `<button class="action-button task-start-btn" data-quiz="futureSimple1">שלב 2: תרגיל 1 (will/would)</button>`;
                content += `<button class="action-button" id="future-simple-expl2-btn">שלב 3: הסבר (שלילה)</button>`;
                content += `<button class="action-button task-start-btn" data-quiz="futureSimple2">שלב 4: תרגיל 2 (wont/wouldn't)</button>`;
                taskPageContent.innerHTML = content;
                showPage('task-page');
                
                document.getElementById('future-simple-expl-btn').addEventListener('click', createFutureSimpleExplanationPage);
                document.getElementById('future-simple-expl2-btn').addEventListener('click', createFutureSimpleExplanationPage2);
                break;
                
            case 'simple-past':
                content += `<p>בחר שלב בלימוד עבר פשוט:</p>`;
                content += `<button class="action-button" id="simple-past-expl-btn">שלב 1: הסבר מקיף</button>`;
                content += `<button class="action-button task-start-btn" data-quiz="simplePastQuiz">שלב 2: בוא נתרגל</button>`;
                taskPageContent.innerHTML = content;
                showPage('task-page');
                
                document.getElementById('simple-past-expl-btn').addEventListener('click', () => {
                    createSimplePastExplanationPage(assignmentId);
                });
                break;

            // --- PDF/DOCX Assignments ---
            case 'reading':
                content += `<p>בחר את רמת הקריאה לתרגול:</p>`;
                content += `<button class="action-button task-start-btn" data-quiz="reading1">רמה 1 (כיתה ב)</button>`;
                content += `<button class="action-button task-start-btn" data-quiz="reading2">רמה 2 (כיתה ג)</button>`;
                content += `<button class="action-button task-start-btn" data-quiz="reading3">רמה 3 (כיתה ד)</button>`;
                content += `<button class="action-button task-start-btn" data-quiz="reading4">רמה 4 (כיתה ה)</button>`;
                content += `<button class="action-button task-start-btn" data-quiz="reading5">רמה 5 (כיתה ו)</button>`;
                taskPageContent.innerHTML = content;
                showPage('task-page');
                break;
                
            case 'grammar':
                content += `<p>בחר את הנושא לתרגול:</p>`;
                content += `<button class="action-button task-start-btn" data-quiz="whQuestions">שאלות WH (השלם את החסר)</button>`;
                content += `<button class="action-button task-start-btn" data-quiz="prepositions">מילות יחס (Prepositions)</button>`;
                content += `<button class="action-button task-start-btn" data-quiz="presentSimple1">Present Simple - s/es/ies</button>`;
                content += `<button class="action-button task-start-btn" data-quiz="presentSimple2">Present Simple - Don't / Doesn't</button>`;
                content += `<button class="action-button task-start-btn" data-quiz="presentSimple3">Present Simple - Do / Does</button>`;
                taskPageContent.innerHTML = content;
                showPage('task-page');
                break;
                
            case 'writing':
                content += `<p>במשימה זו תלמדו לתאר אובייקטים, להשוות ביניהם ולכתוב פסקאות טיעון. המשימה מבוססת על קובץ הכתיבה שסיפקת.</p>`;
                content += `<h2>שלב 1: תיאור לימון</h2><p class="ltr">A lemon is a yellow fruit. It is often oval in shape. It tastes sour. It has a bright color and a textured rind.</p>`;
                content += `<h2>שלב 2: השוואת בתים</h2><p class="ltr">The first picture shows a traditional, stone house with a calm feeling. The second picture shows a funny, upside-down red house. The first house is normal, while the second house is an unusual tourist attraction.</p>`;
                content += `<h2>שלב 3: תיאור והשוואת עטים</h2><p class="ltr">The first pen is a fancy, red and gold fountain pen. It looks very expensive and decorative. The second pen is a simple, modern, blue ballpoint pen. It looks sleek and practical. The main difference is style: one is classic and ornate, the other is modern and minimalist.</p>`;
                content += `<h2>שלב 4: תיאור רגשות</h2><p class="ltr">The first man (with steam) looks extremely angry or furious. The second man (with fists) looks very happy and triumphant. The third man (crying) looks very sad or distressed.</p>`;
                content += `<h2>שלב 5: פסקת טיעון (6 או 9)</h2><p class="ltr">In the picture, two boys are looking at a number on the floor. From one boy's perspective, it looks like the number 6. From the other boy's perspective, it looks like the number 9. This picture shows that both boys are 'right' based on their point of view. It teaches us that perspective is important and people can see the same thing differently.</p>`;
                content += `<h2>שלב 6: תיאור חוויה</h2><p>כדי לתאר חוויה, עקבו אחר הצעדים הבאים: 1. כותרת. 2. פתיחה (על מה אספר?). 3. גוף הסיפור (מה קרה? מה ראיתי? מה הרגשתי?). 4. סיבה (למה בחרתי בחוויה זו?). 5. סיום (מה מיוחד? המלצה?).</p>`;
                content += `<br><button class="action-button" id="complete-writing-btn">סיימתי לקרוא</button>`;
                taskPageContent.innerHTML = content;
                showPage('task-page');
                
                document.getElementById('complete-writing-btn').addEventListener('click', () => {
                    markAssignmentAsCompleted('writing');
                    showPage('assignment-hub-page');
                });
                break;
                
            case 'speaking':
                content += `<p>במשימה זו תתרגלו זיהוי שגיאות וקריאה בקול.</p>`;
                content += `<h2>טקסט לקריאה (Lvl 3)</h2><div class="text-passage ltr"><h3>The Strength Within</h3><p>Once upon a time in a small village, there lived a girl named Mia. She was like any other girl, with dreams, hopes, and a heart full of kindness. Every morning, she would tie her hair into a pony tail and slip on her favorite blue slippers before heading to her High school...</p><p>(המשך הטקסט מקובץ ה-PDF שלך...)</p></div>`;
                content += `<button class="action-button task-start-btn" data-quiz="speaking1">התחל תרגיל זיהוי שגיאות (Lvl 1)</button>`;
                content += `<button class="action-button task-start-btn" data-quiz="speaking2">התחל תרגיל זיהוי שגיאות (Lvl 2)</button>`;
                taskPageContent.innerHTML = content;
                showPage('task-page');
                break;
                
            case 'adjectives':
                content += `<p>לימוד ותרגול שמות תואר (Adjectives) ותואר הפועל (Adverbs).</p>`;
                content += `<h2>כללים בסיסיים</h2><div class="text-passage ltr"><p>Adjectives describe nouns (e.g., tall man, beautiful day).</p><p>To compare (bigger): add 'er' (taller) or use 'more' for long words (more beautiful).</p><p>For 'the most' (biggest): add 'est' (tallest) or use 'most' (most beautiful).</p><p>Adverbs describe verbs (e.g., run quickly, eat slowly). They often end in -ly.</p></div>`;
                content += `<button class="action-button task-start-btn" data-quiz="adjectivesQuiz">התחל תרגול</button>`;
                taskPageContent.innerHTML = content;
                showPage('task-page');
                break;
        }
        
        // Add event listeners for all quiz buttons on the task page
        document.querySelectorAll('.task-start-btn').forEach(btn => {
            btn.addEventListener('click', () => {
                startQuiz(btn.dataset.quiz, assignmentId);
            });
        });
    }
    
    function getAssignmentTitle(assignmentId) {
        const titles = {
            'reading': 'קריאה',
            'grammar': 'דקדוק',
            'writing': 'כתיבה',
            'speaking': 'דיבור',
            'adjectives': 'שמות תואר',
            'abc': 'ה-ABC האנגלי',
            'verbs': 'פעלים',
            'future-simple': 'עתיד פשוט',
            'simple-past': 'עבר פשוט'
        };
        return titles[assignmentId] || 'משימה';
    }

    // --- HELPER FUNCTIONS FOR ORIGINAL ASSIGNMENTS ---

    function createChainedContentPage(assignmentId, steps, onComplete) {
        let currentStep = 0;
        
        function loadStep() {
            const step = steps[currentStep];
            let html = '<div class="text-passage">';
            if (step.title) html += `<h2>${step.title}</h2>`;
            if (step.text) html += `<p>${step.text.replace(/\n/g, '<br>')}</p>`;
            if (step.content) html += step.content;
            html += `<button class="action-button" id="chain-next-btn">${step.button}</button>`;
            html += '</div>';
            
            taskPageContent.innerHTML = `<h1>${getAssignmentTitle(assignmentId)}</h1>${html}`;
            
            document.getElementById('chain-next-btn').addEventListener('click', () => {
                currentStep++;
                if (currentStep < steps.length) {
                    loadStep();
                } else {
                    onComplete();
                }
            }, { once: true });
        }
        loadStep();
        showPage('task-page');
    }

    function createAbcSpecialCasesPage(assignmentId) {
        const steps = [
            { title: "אותיות שורקות", text: "האותיות השורקות הם מקרה מיוחד של שילוב אותיות שיוצרות צלילים שונים, שגם יכולים לחקות אותיות מסוימות.", button: "המשך" },
            { title: "E הקסומה", text: 'e בסוף מילה נקראת "magic e" כיוון שהיא גורמת לאות הניקוד שבאה לפניה לשנות את הצליל, כך שהוא נשמע כמו השם שלה ולאחר מכן הצליל נשמע ארוך יותר.', button: "המשך" },
            { title: "אותיות ניקוד", text: "מספר אותיות הניקוד במילה משפיע על הצליל שלהן כאשר יש למילה אות ניקוד אחת, הצליל של האות הניקוד יהיה קצר.\nכאשר יש למילה יותר מאות ניקוד אחת, הצליל של האות הניקוד יהיה ארוך ומעוגל יותר", button: "המשך" },
            { title: "אותיות שקטות", text: "אותיות שותקות אלו אותיות שיופיע כחלק מהמילה עצמה וחייבות להכתב עם המילה אך הן אינן מושמעות בהגיית המילה", button: "המשך למשימה" }
        ];
        createChainedContentPage(assignmentId, steps, () => {
            startQuiz('abcQuiz', assignmentId);
        });
    }
    
    function createSimplePastExplanationPage(assignmentId) {
        const steps = [
            { text: "הזמן הפשוט הוא היבט בסיסי של דקדוק האנגלית המשמש לתיאור פעולות שהושלמו בעבר. הנה כמה כללים חשובים המתארים את השימוש בו", button: "המשך" },
            { text: 'פעלים רגילים: עבור פעלים רגילים, עבר פשוט נוצר על ידי הוספת "-ed" לצורת הבסיס של הפועל.\nכלל זה חל על רוב הפעלים.\n- Watch → watched (צופה ←צפה)\n- ask → asked (שואל ← שאל)\n-clean → cleaned (מנקה ← ניקה)', button: "המשך" },
            { text: 'אם הפועל מסתיים באות e מוסיפים רק את האות "d" ולא "ed", דוגמאות:\n- like → liked (מחבב ← חיבב)\n- arrive → arrived\n- decide → decided', button: "המשך" },
            { text: 'אם הפועל מסתיים באות עיצור, אות ניקוד, אות עיצור (cvc), הכפל את האות האחרונה האחרון לפני הוספת "-ed". אך אם במילה יש יותר מהעברה אחת אז cvc לא מתקיים.\nחוץ מכמה יוצאי דופן שלא מכפילים כגון: x,y,w ולפעמים k.\nדוגמאות למילים:\n- play → played (משחק ← שיחק)\n- stop → stopped (עצור ← עצר)', button: "המשך" },
            { text: "פעלים לא רגילים: בניגוד לכך, פעלים לא סדירים אינם פועלים לפי תבנית קבועה כאשר יוצרים את זמן העבר שלהם. לכן, חשוב לזכור את הצורות העבריות של הפעלים הללו.\nדוגמאות למילים:\n- go → went (הולך ← הלך)\n- see → saw (רואה ← ראה)\n- eat → ate (אוכל ← אכל)\n- know → knew (יודע ← ידע)", button: "המשך" },
            { text: 'משפטים שליליים: כדי ליצור משפטים שליליים בזמן עבר פשוט, השתמשו ב-"did not" (או הצורה המקוצרת "didn\'t") ואחריה הצורה הבסיסית של הפועל.\nמבנה זה מעביר ביעילות שהפעולה לא התרחשה בעבר.\nדוגמאות למפטים:\n- I didn\'t walk to school today. (אני לא הלכתי לבית ספר היום)\n- She didn\'t finish her homework. (היא לא סיימה את שיעורי הבית שלה)', button: "המשך" },
            { text: 'שאלות: כאשר יוצרים שאלות בזמן עבר פשוט, התחילו ב-"Did" או ב-"Were" או ב-"Was", ואחריו הנושא וצורת הבסיס של הפועל.\nפורמט זה חיוני להשגת מידע על פעולות בעבר.\nדוגמאות:\n1.What did you do yesterday? (מה עשית אתמול?)\n2.Where did you go last weekend? (לאן הלכת בסוף השבוע האחרון?)\n3.Did you play any sports last week? (האם שיחקת בספורט בשבוע שעבר?)', button: "המשך למשימה" },
        ];
        createChainedContentPage(assignmentId, steps, () => {
            startQuiz('simplePastQuiz', assignmentId);
        });
    }
    
    function createFutureSimpleExplanationPage() {
        taskPageContent.innerHTML = `<h1>עתיד פשוט</h1>
        <div class="text-passage">
            <p>זמן עתיד הוא זמן פשוט להבנה.
            כל הגופים משתמשים ב- will ו- would, אך מה ההבדל ביניהם?
            <br> משתמשים ב- will כאשר אנחנו רוצים להגיד משהו שקשור אך ורק לעתיד, ואילו משתמשים ב- would כאשר משהו נאמר בעבר אבל אמור להתרחש בעתיד.
            יש פעמים שמשתמשים ב- would כדי לבטא בקשה מנומסת שתתרחש לרוב בעתיד.
            חשוב לזכור ש would זה לא תחליף ל- will. <br> בוא נתרגל את מה שלמדנו:</p>
            <button class="action-button task-start-btn" data-quiz="futureSimple1">התחל תרגיל 1</button>
        </div>`;
        showPage('task-page');
        // Re-add listener since we overwrote the page
        document.querySelector('.task-start-btn').addEventListener('click', (e) => {
            startQuiz(e.target.dataset.quiz, 'future-simple');
        });
    }
    
    function createFutureSimpleExplanationPage2() {
        taskPageContent.innerHTML = `<h1>עתיד פשוט - שלילה</h1>
        <div class="text-passage">
            <p>נכון שיש לנו את הגופים?
            אז כאשר אנחנו רוצים לכתוב את המשפט בצורה שלילית, במקום will ו- would משתמשים ב- wont ו- wouldn't.
            הם מייצגים would-not ו- will not. <br> בוא נתרגל את הנושא הזה.</p>
            <button class="action-button task-start-btn" data-quiz="futureSimple2">התחל תרגיל 2</button>
        </div>`;
        showPage('task-page');
        // Re-add listener
        document.querySelector('.task-start-btn').addEventListener('click', (e) => {
            startQuiz(e.target.dataset.quiz, 'future-simple');
        });
    }

    function createVerbsTablePage() {
        const verbs = [
            ["Eat", "לאכול"], ["drink", "לשתות"], ["walk", "ללכת"], ["run", "לרוץ"],
            ["sit", "לשבת"], ["lie", "לשכב"], ["stand", "לעמוד"], ["fall", "ליפול"],
            ["laugh", "לצחוק"], ["speak", "לדבר"], ["cry", "לבכות"], ["answer", "לענות"],
            ["ask", "לשאול"], ["see", "לראות"], ["hear", "לשמוע"], ["break", "לשבור"],
            ["feel", "להרגיש"], ["fix", "לתקן"], ["drive", "לנהוג"], ["ride", "לרכב"],
            ["swim", "לשחות"], ["jump", "לקפוץ"], ["climb", "לטפס"], ["fly", "לעוף"],
            ["push", "לדחוף"], ["pull", "למשוך"], ["throw", "לזרוק"], ["catch", "לתפוס"],
            ["cut", "לחתוך"], ["cook", "לבשל"]
        ];
        let gridHtml = `<div style="display:grid;grid-template-columns:1fr 1fr;gap:10px;text-align:center;font-size:1.1em;">
                        <div><b>באנגלית</b></div><div><b>תרגום</b></div>`;
        verbs.forEach(([en, he]) => {
            gridHtml += `<div dir="ltr">${en}</div><div dir="rtl">${he}</div>`;
        });
        gridHtml += `</div><button class="action-button task-start-btn" data-quiz="verbs1" style="margin-top:20px;">לתרגול</button>`;
        
        taskPageContent.innerHTML = `<h1>טבלת פעלים</h1><div class="text-passage">${gridHtml}</div>`;
        showPage('task-page');
        // Re-add listener
        document.querySelector('.task-start-btn').addEventListener('click', (e) => {
            startQuiz(e.target.dataset.quiz, 'verbs');
        });
    }
    
    function createAbcAudioPage() {
        const container = document.getElementById('audio-players-container');
        container.innerHTML = ''; // Clear previous
        const letters = 'abcdefghijklmnopqrstuvwxyz'.split('');
        
        letters.forEach(letter => {
            const playerDiv = document.createElement('div');
            playerDiv.className = 'audio-player';
            // !!! NOTE: You need to have audio files named a.mp3, b.mp3, etc. in a folder or URL path !!!
            playerDiv.innerHTML = `
                <h3>האות ${letter.toUpperCase()}</h3>
                <audio controls>
                    <source src="path/to/${letter}.mp3" type="audio/mpeg">
                  Your browser does not support the audio element.
                </audio>
            `;
            container.appendChild(playerDiv);
        });
        
        // Add click listener for the continue button on this specific page
        const continueBtn = document.getElementById('abc-audio-continue');
        continueBtn.classList.remove('hidden'); // Show it
        continueBtn.addEventListener('click', (e) => {
            startQuiz(e.target.dataset.quiz, e.target.dataset.assignment);
        }, { once: true });
    }
    
    function createSentenceBuilderPage(assignmentId) {
        const correctOrder = ["He", "won't", "go", "to", "the", "mall", "tomorrow"];
        const words = ["won't", "tomorrow", "apple", "mall", "He", "to", "rise", "go", "the"].sort(() => Math.random() - 0.5);
        const incorrectWords = ["apple", "rise"];
        let builtSentence = [];

        const sentenceEl = document.getElementById('built-sentence-container');
        const optionsEl = document.getElementById('word-options');
        const feedbackEl = document.getElementById('sentence-feedback');
        
        sentenceEl.innerHTML = '';
        optionsEl.innerHTML = '';
        feedbackEl.innerHTML = '';

        function renderWords() {
            optionsEl.innerHTML = '';
            words.forEach(word => {
                const button = document.createElement('button');
                button.className = 'quiz-option-btn';
                button.textContent = word;
                button.onclick = () => handleWordClick(word, button);
                optionsEl.appendChild(button);
            });
        }

        function handleWordClick(word, button) {
            feedbackEl.textContent = '';
            if (incorrectWords.includes(word)) {
                feedbackEl.textContent = 'המילה הזו לא שייכת למשפט!';
                feedbackEl.className = 'quiz-feedback incorrect';
                button.classList.add('incorrect');
                button.disabled = true;
                return;
            }

            const nextCorrectWord = correctOrder[builtSentence.length];
            if (word === nextCorrectWord) {
                builtSentence.push(word);
                sentenceEl.textContent = builtSentence.join(' ');
                button.classList.add('correct');
                button.disabled = true;
                
                if (builtSentence.length === correctOrder.length) {
                    feedbackEl.textContent = 'עבודה טובה!';
                    feedbackEl.className = 'quiz-feedback correct';
                    markAssignmentAsCompleted(assignmentId);
                }
            } else {
                const prevWord = builtSentence.length > 0 ? builtSentence[builtSentence.length - 1] : 'התחלה';
                feedbackEl.textContent = `המילה הזו לא באה אחרי "${prevWord}", חשבו על מילה אחרת`;
                feedbackEl.className = 'quiz-feedback incorrect';
                button.classList.add('incorrect');
                setTimeout(() => button.classList.remove('incorrect'), 500);
            }
        }
        renderWords();
    }

    // --- QUIZ ENGINE ---
    let currentQuiz = [];
    let currentQuestionIndex = 0;
    let wrongAnswers = [];
    let isReviewRound = false;
    let currentQuizId = '';
    let parentAssignmentId = '';

    const quizContainer = document.getElementById('quiz-container');
    const questionEl = document.getElementById('quiz-question');
    const optionsEl = document.getElementById('quiz-options');
    const feedbackEl = document.getElementById('quiz-feedback');
    let nextBtn = document.getElementById('quiz-next-btn');

    function startQuiz(quizId, assignmentId) {
        // First, check if quizData[quizId] exists
        if (!quizData[quizId]) {
            console.error(`Quiz data not found for quizId: ${quizId}`);
            return;
        }
        currentQuizId = quizId;
        parentAssignmentId = assignmentId;
        currentQuiz = shuffleArray([...quizData[quizId]]); // Get a shuffled copy
        currentQuestionIndex = 0;
        wrongAnswers = [];
        isReviewRound = false;
        
        // Add back button to quiz page
        const existingBackBtn = document.querySelector('#quiz-page .back-button');
        if (existingBackBtn) {
            existingBackBtn.remove(); // Remove old one if it exists
        }
        
        const backBtn = document.createElement('button');
        backBtn.className = 'back-button';
        backBtn.textContent = 'חזרה למשימות';
        backBtn.dataset.target = 'assignment-hub-page';
        backBtn.addEventListener('click', () => showPage('assignment-hub-page'));
        document.getElementById('quiz-page').prepend(backBtn);
        
        showPage('quiz-page');
        loadQuestion();
    }

    function loadQuestion() {
        // Clear previous state
        feedbackEl.textContent = '';
        feedbackEl.className = '';
        nextBtn.classList.add('hidden');
        optionsEl.innerHTML = '';
        
        // Re-bind nextBtn in case it was replaced
        nextBtn = document.getElementById('quiz-next-btn');
        nextBtn.removeEventListener('click', nextQuestionHandler);
        nextBtn.addEventListener('click', nextQuestionHandler);


        if (currentQuestionIndex >= currentQuiz.length) {
            finishQuiz();
            return;
        }

        const question = currentQuiz[currentQuestionIndex];
        document.getElementById('quiz-progress').textContent = `שאלה ${currentQuestionIndex + 1} מתוך ${currentQuiz.length}`;
        questionEl.textContent = question.q;
        
        // Ensure LTR/RTL direction
        if (/[a-zA-Z]/.test(question.q)) { // If question contains English
             questionEl.className = 'ltr';
        } else {
             questionEl.className = 'rtl';
        }

        const options = shuffleArray([...question.o]); // Shuffle options
        options.forEach(option => {
            const button = document.createElement('button');
            button.className = 'quiz-option-btn';
            button.textContent = option;
            
            if (/[a-zA-Z]/.test(option)) { // If option contains English
                button.classList.add('ltr');
            } else {
                button.classList.add('rtl');
            }
            
            button.addEventListener('click', () => selectAnswer(button, option, question.a));
            optionsEl.appendChild(button);
        });
    }
    
    function nextQuestionHandler() {
        currentQuestionIndex++;
        loadQuestion();
    }

    function selectAnswer(button, selectedOption, correctAnswer) {
        // Disable all buttons
        optionsEl.querySelectorAll('.quiz-option-btn').forEach(btn => {
            btn.disabled = true;
            // Highlight correct/incorrect
            if (btn.textContent === correctAnswer) {
                btn.classList.add('correct');
            } else if (btn.textContent === selectedOption) {
                btn.classList.add('incorrect');
            }
        });

        if (selectedOption === correctAnswer) {
            feedbackEl.textContent = 'תשובה נכונה!';
            feedbackEl.className = 'correct';
        } else {
            feedbackEl.textContent = `תשובה שגויה. הנכונה היא: ${correctAnswer}`;
            feedbackEl.className = 'incorrect';
            // Add to wrong answers list
            if (!isReviewRound) {
                // Only add if it's not already in the list
                if (!wrongAnswers.includes(currentQuiz[currentQuestionIndex])) {
                     wrongAnswers.push(currentQuiz[currentQuestionIndex]);
                }
            }
        }

        nextBtn.classList.remove('hidden');
    }

    function finishQuiz() {
        if (wrongAnswers.length > 0 && !isReviewRound) {
            // Start review round
            isReviewRound = true;
            currentQuiz = shuffleArray([...wrongAnswers]);
            wrongAnswers = []; // Clear for the next round
            currentQuestionIndex = 0;
            questionEl.textContent = 'בואו נעבור שוב על הטעויות...';
            optionsEl.innerHTML = '';
            feedbackEl.textContent = '';
            
            nextBtn.textContent = 'התחל סבב תיקון';
            nextBtn.classList.remove('hidden');
            
            // Use a one-time listener for "Start Review"
            nextBtn.removeEventListener('click', nextQuestionHandler);
            nextBtn.addEventListener('click', loadQuestion, { once: true });


        } else {
            // Quiz truly finished
            questionEl.textContent = 'כל הכבוד! סיימת את המשימה.';
            optionsEl.innerHTML = '';
            feedbackEl.textContent = (isReviewRound && wrongAnswers.length > 0) ? 'עדיין יש כמה טעויות, נסו שוב מאוחר יותר.' : '';
            
            nextBtn.textContent = 'חזור למשימות';
            nextBtn.classList.remove('hidden');
            
            // Use a one-time listener for "Back to Hub"
            nextBtn.removeEventListener('click', nextQuestionHandler);
            nextBtn.addEventListener('click', () => {
                checkAssignmentCompletion();
                showPage('assignment-hub-page');
            }, { once: true });
        }
    }
    
    function checkAssignmentCompletion() {
        // This is a simple completion check.
        // For multi-part assignments, it marks complete after any quiz.
        // You could add more complex logic here if needed.
        if (parentAssignmentId) {
            markAssignmentAsCompleted(parentAssignmentId);
        }
    }

    function shuffleArray(array) {
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
        return array;
    }

    
    // --- QUIZ DATABASE (ALL ASSIGNMENTS - FIXED) ---
    const quizData = {
        // --- Original Assignments ---
        'futureSimple1': [
            { q: "I __ go to the mall tomorrow", a: "will", o: ["will", "would", "כלום לא מתאים"] },
            { q: "___ your sister come to the movie theater tonight?", a: "will", o: ["will", "would", "כלום לא מתאים"] },
            { q: "How __ we go to the school event this weekend?", a: "will", o: ["will", "would", "כלום לא מתאים"] },
            { q: "__ you want to come to my house today?", a: "would", o: ["will", "would", "כלום לא מתאים"] },
            { q: "Ali __ take Maya to school tomorrow.", a: "will", o: ["will", "would", "כלום לא מתאים"] },
            { q: "My dog __ eat his food tonight.", a: "will", o: ["will", "would", "כלום לא מתאים"] },
            { q: "Tomorrow me and my family __ go to eat in a restaurant.", a: "will", o: ["will", "would", "כלום לא מתאים"] },
            { q: "__ you like to come to my house tomorrow?", a: "would", o: ["will", "would", "כלום לא מתאים"] }
        ],
        'futureSimple2': [
             { q: "I __ eat fast food next week", a: "wont", o: ["wouldn't", "wont"] },
             { q: "Noya is sick, she __ come to the party tonight", a: "wont", o: ["wouldn't", "wont"] },
             { q: "My parents and I __ open our business tomorrow.", a: "wont", o: ["wouldn't", "wont"] },
             { q: "My sister __ come to the trip next week.", a: "wont", o: ["wouldn't", "wont"] },
             { q: "I think she __ like the present that I will give her next week.", a: "wont", o: ["wouldn't", "wont"] },
             { q: "I think I __ be able to visit your family next week.", a: "wont", o: ["wouldn't", "wont"] },
             { q: "I ___ do that if I were you.", a: "wouldn't", o: ["wouldn't", "wont"] }
        ],
        'verbs1': [
            { q: 'מה המשמעות של "jump"?', a: 'לקפוץ', o: ['לשבת', 'לקפוץ', 'לחשוב'] },
            { q: 'מה המשמעות של "write"?', a: 'לכתוב', o: ['לקרוא', 'לכתוב', 'ללכת'] },
            { q: 'אני __ מים כל יום', a: 'drink', o: ['cook', 'look', 'drink'] },
            { q: 'היא __ סיפור במחברתה', a: 'writes', o: ['writes', 'walks', 'runs'] },
            { q: 'אני __ לבית הספר כל יום', a: 'walk', o: ['learn', 'fish', 'walk'] },
            { q: 'היא __ לחנות', a: 'goes', o: ['teaches', 'climbs', 'goes'] },
            { q: 'אנחנו __ ארוחת ערב בשעה', a: 'eat', o: ['cook', 'eat', 'ride'] },
            { q: 'הוא __ ספר בספרייה', a: 'reads', o: ['lives', 'lies', 'reads'] }
        ],
        'abcQuiz': [
            { q: "איזה אות באה אחרי K?", a: "L", o: ["A", "L", "Z"] },
            { q: "איזה אות באה אחרי C?", a: "D", o: ["D", "Y", "M"] },
            { q: "איזה אות באה אחרי S?", a: "T", o: ["T", "C", "O"] },
            { q: "איזה אות באה אחרי W?", a: "X", o: ["K", "B", "X"] },
            { q: "איזה אות באה אחרי Q?", a: "R", o: ["R", "E", "L"] },
            { q: "מהי האות האחרונה בסדר האלף - בית באנגלית?", a: "Z", o: ["Q", "Z", "V"] },
            { q: "כמה אותיות יש באלף - בית של אנגלית?", a: "26", o: ["22", "23", "26"] }
        ],
        'simplePastQuiz': [
            { q: "She _____ (speak) to her boss about the project yesterday", a: "spoke", o: ["spoke", "speaks", "speaked"] },
            { q: "We _____ (drive) to the mountains last weekend", a: "drove", o: ["drived", "drive", "drove"] },
            { q: "The cat _____ (sleep) on the sofa all day", a: "slept", o: ["sleeping", "slept", "sleeped"] },
            { q: "I _____ (read) an interesting book last month", a: "read", o: ["read", "readen", "readed"] },
            { q: "They _____ (swim) in the lake during their vacation", a: "swam", o: ["swimming", "swom", "swam"] },
            { q: "He _____ (break) his arm while skiing two weeks ago", a: "broke", o: ["breaking", "broke", "breaken"] },
            { q: "The children _____ (bake) cookies with their grandmother", a: "baked", o: ["baked", "bake", "baking"] },
            { q: "We _____ (fly) to Paris for our anniversary last year", a: "flew", o: ["flought", "flying", "flew"] },
            { q: "The teacher _____ (give) us a lot of homework yesterday", a: "gave", o: ["gave", "given", "giving"] },
            { q: "I _____ (lose) my keys at the supermarket this morning", a: "lost", o: ["lose", "losing", "lost"] },
            { q: "She _____ (dance) beautifully at the party last night", a: "danced", o: ["dancing", "danced", "donce"] },
            { q: "They _____ (build) a treehouse in their backyard last summer", a: "built", o: ["built", "building", "build"] },
            { q: "He _____ (tell) us an exciting story about his travels", a: "told", o: ["told", "telling", "telled"] },
            { q: "We _____ (meet) our new neighbors at the community barbecue", a: "met", o: ["meeting", "met", "meet"] },
            { q: "The movie _____ (begin) late because of technical issue", a: "began", o: ["begginning", "begin", "began"] }
        ],
        
        // --- PDF/DOCX Assignments ---
        'whQuestions': [
            { q: "___ are you going to the party tonight? (When)", o: ["When", "Where", "Who"], a: "When" },
            { q: "___ is your favorite color?", o: ["What", "Where", "Who"], a: "What" },
            { q: "___ does she live?", o: ["When", "Where", "Why"], a: "Where" },
            { q: "___ is the capital of France?", o: ["Who", "What", "Why"], a: "What" },
            { q: "___ do you usually do on weekends?", o: ["What", "Where", "Who"], a: "What" },
            { q: "___ is your brother's name?", o: ["What", "Why", "How"], a: "What" },
            { q: "___ did you arrive at the airport?", o: ["When", "Who", "What"], a: "When" },
            { q: "___ do you want for lunch?", o: ["Where", "What", "Why"], a: "What" },
            { q: "___ is your favorite movie?", o: ["What", "How", "Who"], a: "What" },
            { q: "___ do you study English?", o: ["Why", "Who", "What"], a: "Why" },
            { q: "___ are they coming to the meeting?", o: ["When", "Where", "What"], a: "When" },
            { q: "___ is your best friend?", o: ["What", "Who", "Why"], a: "Who" },
            { q: "___ is your birthday?", o: ["When", "Where", "How"], a: "When" },
            { q: "___ do you like to read?", o: ["What", "Why", "Who"], a: "What" },
            { q: "___ do you think of this idea?", o: ["What", "Who", "Where"], a: "What" }
        ],
        'prepositions': [
            { q: "The ball is ___ the table.", o: ["on", "under", "next to"], a: "on" }, 
            { q: "The cat is ___ the box.", o: ["in", "behind", "on"], a: "in" },
            { q: "The book is ___ the bed.", o: ["under", "in front of", "next to"], a: "under" },
            { q: "The chair is ___ the desk.", o: ["on", "behind", "under"], a: "behind" },
            { q: "The dog is ___ the door.", o: ["next to", "in", "on"], a: "next to" },
            { q: "The shoes are ___ the floor.", o: ["on", "under", "in front of"], a: "on" },
            { q: "The picture is ___ the wall.", o: ["in", "on", "under"], a: "on" },
            { q: "The boy is sitting ___ the chair.", o: ["under", "on", "next to"], a: "on" },
            { q: "The bag is ___ the table.", o: ["on", "in", "behind"], a: "on" },
            { q: "The bird is ___ the tree.", o: ["in", "under", "next to"], a: "in" },
            { q: "The toys are ___ the box.", o: ["in", "on", "behind"], a: "in" },
            { q: "The car is parked ___ the house.", o: ["next to", "behind", "in"], a: "next to" },
            { q: "The keys are ___ the drawer.", o: ["in", "on", "under"], a: "in" },
            { q: "The children are playing ___ the park.", o: ["in", "on", "behind"], a: "in" },
            { q: "The lamp is ___ the table, not under it.", o: ["on", "next to", "in"], a: "on" },
            { q: "The school bag is ___ the chair and the desk.", o: ["between", "next to", "under"], a: "between" },
            { q: "The clock is hanging ___ the wall above the TV.", o: ["on", "under", "in front of"], a: "on" },
            { q: "The cat is hiding ___ the sofa because it is scared.", o: ["behind", "on", "in"], a: "behind" },
            { q: "The books are neatly placed ___ the shelf.", o: ["on", "under","in front of"], a: "on" },
            { q: "The bike is leaning ___ the wall in the garage.", o: ["next to", "on", "under"], a: "next to" } 
        ],
        'presentSimple1': [ // s/es/ies
            { q: "fix (he)", o: ["fixes", "fixs", "fixies"], a: "fixes" },
            { q: "watch (she)", o: ["watchs", "watches", "watchies"], a: "watches" },
            { q: "brush (he)", o: ["brushs", "brushes", "brushies"], a: "brushes" },
            { q: "tidy (she)", o: ["tidys", "tidies","tidyes"], a: "tidies" },
            { q: "fly (it)", o: ["flys", "flyes", "flies"], a: "flies" },
            { q: "go (he)", o: ["gos", "goes", "goies"], a: "goes" },
            { q: "try (she)", o: ["trys", "tryes", "tries"], a: "tries" },
            { q: "find (he)", o: ["finds", "findes", "findies"], a: "finds" },
            { q: "feel (she)", o: ["feels", "feeles", "feelies"], a: "feels" },
            { q: "make (it)", o: ["makes", "makees", "makies"], a: "makes" },
            { q: "live (he)", o: ["lives", "livees", "livies"], a: "lives" },
            { q: "play (she)", o: ["plays", "playes", "plaies"], a: "plays" },
            { q: "sail (it)", o: ["sails", "sailes", "sailies"], a: "sails" },
            { q: "copy (he)", o: ["copys", "copyes", "copies"], a: "copies" },
            { q: "carry (she)", o: ["carrys", "carryes", "carries"], a: "carries" },
            { q: "do (he)", o: ["dos", "does", "doies"], a: "does" },
            { q: "hurry (she)", o: ["hurrys", "hurryes", "hurries"], a: "hurries" },
            { q: "wash (it)", o: ["washs", "washes", "washies"], a: "washes" }
        ],
        'presentSimple2': [ // Don't / Doesn't
            { q: "I ___ like chicken.", o: ["don't", "doesn't"], a: "don't" },
            { q: "My sister ___ eat pasta.", o: ["don't", "doesn't"], a: "doesn't" },
            { q: "You ___ buy apples.", o: ["don't", "doesn't"], a: "don't" },
            { q: "The dog ___ bark.", o: ["don't", "doesn't"], a: "doesn't" },
            { q: "My mum ___ read comics.", o: ["don't", "doesn't"], a: "doesn't" },
            { q: "Ann and I ___ go to school.", o: ["don't", "doesn't"], a: "don't" },
            { q: "Cows ___ live in the sea.", o: ["don't", "doesn't"], a: "don't" },
            { q: "They ___ play football.", o: ["don't", "doesn't"], a: "don't" },
            { q: "My cat ___ chase mice.", o: ["don't", "doesn't"], a: "doesn't" },
            { q: "Her friend ___ speak English.", o: ["don't", "doesn't"], a: "doesn't" },
            { q: "This man ___ smoke.", o: ["don't", "doesn't"], a: "doesn't" },
            { q: "It ___ run very fast.", o: ["don't", "doesn't"], a: "doesn't" }
        ],
        'presentSimple3': [ // Do / Does
            { q: "___ cats play football?", o: ["Do", "Does"], a: "Do" },
            { q: "___ Pamela Anderson have blonde hair?", o: ["Do", "Does"], a: "Does" },
            { q: "___ your girl/boyfriend like swimming?", o: ["Do", "Does"], a: "Does" },
            { q: "___ David Beckham play football for England?", o: ["Do", "Does"], a: "Does" },
            { q: "___ you want to come with me?", o: ["Do", "Does"], a: "Do" },
            { q: "___ he always do that?", o: ["Do", "Does"], a: "Does" },
            { q: "___ they like dogs?", o: ["Do", "Does"], a: "Do" },
            { q: "___ your father speak German?", o: ["Do", "Does"], a: "Does" },
            { q: "___ your wife/husband come from Argentina?", o: ["Do", "Does"], a: "Does" }, // <-- *** BUG FIXED ***
            { q: "___ Chileans like Tango?", o: ["Do", "Does"], a: "Do" },
            { q: "___ he sing in the shower?", o: ["Do", "Does"], a: "Does" },
            { q: "___ your grandmother have a dog?", o: ["Do", "Does"], a: "Does" },
            { q: "___ you want an ice cream?", o: ["Do", "Does"], a: "Do" },
            { q: "___ your friends like you?", o: ["Do", "Does"], a: "Do" },
            { q: "___ you have a lot of money?", o: ["Do", "Does"], a: "Do" }
        ],
        'speaking1': [ // Lvl 1
            { q: "Where is my friend house?", o: ["Where is my friend house?", "Where is my friend's house?"], a: "Where is my friend's house?" },
            { q: "Mike and Dan is going to the beach.", o: ["Mike and Dan is going...", "Mike and Dan are going..."], a: "Mike and Dan are going..." },
            { q: "I have five cat.", o: ["I have five cat.", "I have five cats."], a: "I have five cats." },
            { q: "Yesterday I were swimming.", o: ["Yesterday I were swimming.", "Yesterday I was swimming."], a: "Yesterday I was swimming." },
            { q: "I will go hiking in the sea.", o: ["I will go hiking in the sea.", "I will go hiking in the mountains."], a: "I will go hiking in the mountains." },
            { q: "We swims every friday.", o: ["We swims every friday.", "We swim every friday."], a: "We swim every friday." },
            { q: "She ate water five minutes ago.", o: ["She ate water...", "She drank water..."], a: "She drank water..." },
            { q: "Is my friend calls every day?", o: ["Is my friend calls...?", "Does my friend call...?"], a: "Does my friend call...?" },
            { q: "We does laundry every week.", o: ["We does laundry...", "We do laundry..."], a: "We do laundry..." },
            { q: "Amira and Lucy am ten years old.", o: ["Amira and Lucy am...", "Amira and Lucy are..."], a: "Amira and Lucy are..." }
        ],
        'speaking2': [ // Lvl 2
            { q: "She ___ allergic to dairy, so she ___ drink milk.", o: ["is / don't", "are / does", "is / doesn't"], a: "is / doesn't" },
            { q: "My grandmother is disabled. So she ___ visit us because she ___ walk.", o: ["can / can't", "can't / can't", "can / can"], a: "can't / can't" },
            { q: "There is ___ power outage, so we ___ use a lot of electronic devices.", o: ["a / don't", "an / don't", "a / do"], a: "a / don't" },
            { q: "Lisa wanted to ___ clean the village. She ___ many empty plastic bottles...", o: ["helped / see", "help / saw", "helping / saw"], a: "help / saw" },
            { q: "Dana ___ Tanya to write... But Tanya replied... that it depends ___ the animal conditions.", o: ["tell / under", "told / on", "told / under"], a: "told / on" },
            { q: "My father ___ ___ police officer, so he ___ commit crimes.", o: ["is / a / doesn't", "are / an / does", "is / an / doesn't"], a: "is / a / doesn't" },
            { q: "I ___ to bake a cake for my friend ___ birthday, but I ran out of eggs...", o: ["wanted / friend's", "want / friend", "wanted / friend"], a: "wanted / friend's" },
            { q: "My phone ___ down after it fell on the ___.", o: ["broke / hard concrete", "break / soft pillow", "broke / soft pillow"], a: "broke / hard concrete" }
        ],
        'adjectivesQuiz': [
            { q: "1. האם צבעים הם גם תארים?", o: ["כן", "לא"], a: "כן" },
            { q: "2. איך לומר באנגלית 'הכי רך'?", o: ["Softer", "Softest", "More soft"], a: "Softest" },
            { q: "3. תרגם: This bag is the most expensive in that shop", o: ["התיק הזה יקר בחנות", "התיק הזה הכי יקר בחנות הזאת", "זה תיק יקר"], a: "התיק הזה הכי יקר בחנות הזאת" },
            { q: "4. תרגם: she is the most beautiful woman in the world", o: ["היא אישה יפה בעולם", "היא האישה הכי יפה בעולם", "היא אישה יפה"], a: "היא האישה הכי יפה בעולם" },
            { q: "5. תרגם: דן הוא הילד הכי חכם בכיתה.", o: ["Dan is a smart boy in class", "Dan is smarter in class", "Dan is the smartest boy in the class"], a: "Dan is the smartest boy in the class" },
            { q: "6. תרגם: הכלב הכי חמוד", o: ["The cutest dog", "The cute dog", "Dog is cute"], a: "The cutest dog" },
            { q: "7. תרגם: הפיצה הכי טעימה.", o: ["The tasty pizza", "The more tasty pizza", "The tastiest pizza"], a: "The tastiest pizza" },
            { q: "8. מה יוצא דופן?", o: ["pink", "purple", "dog"], a: "dog" },
            { q: "9. מה יוצא דופן?", o: ["cold", "cool", "tallest"], a: "tallest" },
            { q: "10. מה יוצא דופן?", o: ["new", "fast", "tasty"], a: "new" } 
        ],
        // Reading Quizzes
        'reading1': [
            { q: "What is the dog's name?", o: ["Charlie", "Anna", "Max"], a: "Charlie" },
            { q: "Where do they play?", o: ["In the house", "In the park", "At school"], a: "In the park" },
            { q: "What does Anna throw for Charlie?", o: ["A stick", "A ball", "Food"], a: "A ball" },
            { q: "What do they do when they get tired?", o: ["Go home", "Sit under a tree", "Eat chips"], a: "Sit under a tree" }
        ],
        'reading2': [
            { q: "What does Tom find in his backyard?", o: ["A magic tree", "A magic paintbrush", "A rainbow"], a: "A magic paintbrush" },
            { q: "What happens to the tree Tom paints?", o: ["It falls down", "It disappears", "It comes to life"], a: "It comes to life" },
            { q: "What does Tom paint after the tree?", o: ["A flower", "A rainbow", "His friends"], a: "A rainbow" },
            { q: "Who does Tom share the magic with?", o: ["His family", "His teacher", "His friends"], a: "His friends" }
        ],
        'reading3': [
            { q: "What is the fox's name?", o: ["Max", "Storm", "Bird"], a: "Max" },
            { q: "What did Max see in the tree?", o: ["A squirrel", "A bird's nest", "His family"], a: "A bird's nest" },
            { q: "What did Max do with the nest?", o: ["He caught it and moved it", "He left it alone", "He told his family"], a: "He caught it and moved it" },
            { q: "How did Max feel after helping?", o: ["Tired", "Proud", "Scared"], a: "Proud" },
            { q: "Why did Max's family clap for him?", o: ["For being brave and kind", "For finding food", "For winning a race"], a: "For being brave and kind" }
        ],
        'reading4': [
            { q: "Where did Jake and Mia find the cave?", o: ["In the school", "In the park", "In the forest"], a: "In the forest" },
            { q: "How did Mia feel about going inside?", o: ["Only scared", "Only excited", "Excited and a little scared"], a: "Excited and a little scared" },
            { q: "What did they find inside the cave?", o: ["A small animal", "A small treasure chest", "Their teacher"], a: "A small treasure chest" },
            { q: "What happened after they opened the chest?", o: ["The cave started shaking", "They found gold", "A noise stopped"], a: "The cave started shaking" }
        ],
        'reading5': [
            { q: "Who was Captain Moshco?", o: ["A famous soldier", "A famous pirate", "A famous captain"], a: "A famous pirate" },
            { q: "What did the old map show?", o: ["A hidden island", "A new ship", "A jungle"], a: "A hidden island" },
            { q: "Where was the 'X' on the map?", o: ["In a cave", "Under a big, old tree", "On the beach"], a: "Under a big, old tree" },
            { q: "What was inside the chest?", o: ["Gold coins, jewels, and a sword", "Only gold coins", "An old map"], a: "Gold coins, jewels, and a sword" },
            { q: "Who won the fight?", o: ["The enemy captain", "Captain Moshco's crew", "Nobody"], a: "Captain Moshco's crew" } // <-- *** BUG FIXED ***
        ]
    };
    
    // --- WORD TOOL (Fixed & Auto Language Detection) ---
    const wordToolBtn = document.getElementById('word-tool-btn');
    const wordInputAuto = document.getElementById('word-input-auto');
    const resultsContainer = document.getElementById('word-tool-results');
    
    if (wordToolBtn && wordInputAuto && resultsContainer) {
      wordToolBtn.addEventListener('click', async () => {
        const originalWord = wordInputAuto.value.trim();
        if (!originalWord) return;
    
        resultsContainer.innerHTML = "מעבד בקשה...";
        resultsContainer.className = "loading";
    
        try {
          // Detect if the word is Hebrew 
          const isHebrew = /[\u0590-\u05FF]/.test(originalWord);
          const sourceLang = isHebrew ? "he" : "en";
          const targetLang = isHebrew ? "en" : "he";
    
          // Step 1: Translate the word itself
          const translateRes = await fetch(
            `https://api.mymemory.translated.net/get?q=${encodeURIComponent(originalWord)}&langpair=${sourceLang}|${targetLang}`
          );
          const translateData = await translateRes.json();
    
          if (!translateData.responseData?.translatedText) {
            throw new Error("Translation failed");
          }
    
          const translatedWord = translateData.responseData.translatedText.trim();
    
          // Step 2: Get definition (English only)
          let definitionText = "";
          let englishWordForDefinition = isHebrew ? translatedWord : originalWord;

          const defRes = await fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${englishWordForDefinition.split(' ')[0]}`);
          if (defRes.ok) {
            const defData = await defRes.json();
            definitionText = defData[0]?.meanings?.[0]?.definitions?.[0]?.definition || "No definition found.";
          } else {
            definitionText = "No definition found.";
          }
    
          // Step 3: Translate definition to Hebrew
          let hebrewDefinition = definitionText; // Default to English definition if translation fails
          if (definitionText !== "No definition found.") {
            const defHeRes = await fetch(
              `https://api.mymemory.translated.net/get?q=${encodeURIComponent(definitionText)}&langpair=en|he`
            );
            const defHeData = await defHeRes.json();
            hebrewDefinition = defHeData.responseData?.translatedText || definitionText;
          }
    
          // Step 4: Display results
          resultsContainer.className = "";
          resultsContainer.innerHTML = `
            <div class="result-block">
              <h3>תרגום לאנגלית</h3>
              <p>${isHebrew ? translatedWord : originalWord}</p>
            </div>
            <div class="result-block">
              <h3>תרגום לעברית</h3>
              <p class="hebrew">${isHebrew ? originalWord : translatedWord}</p>
            </div>
            <div class="result-block">
              <h3>הגדרה (באנגלית)</h3>
              <p>${definitionText === "No definition found." ? "לא נמצאה הגדרה" : definitionText}</p>
            </div>
            <div class="result-block">
              <h3>הגדרה (בעברית)</h3>
              <p class="hebrew">${hebrewDefinition === "No definition found." ? "לא נמצאה הגדרה" : hebrewDefinition}</p>
            </div>
          `;
        } catch (error) {
          console.error(error);
          resultsContainer.className = "";
          resultsContainer.innerHTML = `<p style="text-align: center; font-weight:bold;">אירעה שגיאה. נסה שנית.</p>`;
        }
      });
    }

        
        // Allow pressing Enter to search
        if (wordInputAuto) {
            wordInputAuto.addEventListener('keypress', (e) => {
                if (e.key === 'Enter') {
                    wordToolBtn.click();
                }
            });
        }
    
    // --- INITIALIZE ---
    initYouTubePage();
    initPresentationsPage(); // Initialize new presentation page
    showPage('home-page'); // Start on the home page

// ==========================================
// === NEW FEATURES: AUTH & ADMIN SYSTEM ===
// ==========================================

// 1. Initialize Supabase
// REPLACE THESE WITH YOUR ACTUAL KEYS
const supabaseUrl = 'YOUR_SUPABASE_URL';
const supabaseKey = 'YOUR_SUPABASE_ANON_KEY';
const supabase = supabase.createClient(supabaseUrl, supabaseKey);

// 2. Auth State
let currentUser = null;
const adminEmails = ['Carl.d.rogers@gmail.com', 'Englishyourway0@gmail.com'];

// 3. Connect Login Button on Home Page
// (Modifying the existing listener logic by overwriting the behavior safely)
const originalLoginBtn = document.getElementById('login-button');
if (originalLoginBtn) {
    // Clone node to strip existing event listeners (cleanest way to replace functionality without editing old code)
    const newLoginBtn = originalLoginBtn.cloneNode(true);
    originalLoginBtn.parentNode.replaceChild(newLoginBtn, originalLoginBtn);
    
    newLoginBtn.addEventListener('click', () => {
        if (currentUser) {
            // If logged in, go to hub
            showPage('assignment-hub-page');
        } else {
            // If not logged in, go to login page
            showPage('login-page');
        }
    });
    
    // Update button text based on state
    supabase.auth.onAuthStateChange((event, session) => {
        currentUser = session?.user || null;
        if (currentUser) {
            newLoginBtn.textContent = 'המשך ללמידה';
            handleAdminCheck();
            loadUserProgress();
        } else {
            newLoginBtn.textContent = 'כניסה';
            document.getElementById('admin-switch-btn')?.remove(); // Remove admin btn if exists
        }
    });
}

// 4. Login Logic
document.getElementById('perform-login-btn').addEventListener('click', async () => {
    const email = document.getElementById('login-email').value;
    const password = document.getElementById('login-password').value;
    const errorEl = document.getElementById('login-error');
    
    errorEl.textContent = 'מתחבר...';
    
    const { data, error } = await supabase.auth.signInWithPassword({
        email: email,
        password: password
    });

    if (error) {
        errorEl.textContent = 'שגיאה: ' + error.message;
    } else {
        errorEl.textContent = '';
        showPage('assignment-hub-page');
    }
});

// 5. Signup Logic
document.getElementById('perform-signup-btn').addEventListener('click', async () => {
    const email = document.getElementById('signup-email').value;
    const password = document.getElementById('signup-password').value;
    const username = document.getElementById('signup-username').value;
    const errorEl = document.getElementById('signup-error');

    if (!username) {
        errorEl.textContent = 'נא להזין שם משתמש';
        return;
    }

    errorEl.textContent = 'נרשם...';

    // Check username uniqueness via Supabase Select
    const { data: existingUser } = await supabase
        .from('profiles')
        .select('username')
        .eq('username', username)
        .single();

    if (existingUser) {
        errorEl.textContent = 'שם המשתמש תפוס.';
        return;
    }

    const { data, error } = await supabase.auth.signUp({
        email: email,
        password: password,
        options: {
            data: { username: username }
        }
    });

    if (error) {
        errorEl.textContent = 'שגיאה: ' + error.message;
    } else {
        errorEl.textContent = 'הרשמה הצליחה! אנא התחבר.';
        setTimeout(() => showPage('login-page'), 1500);
    }
});

// 6. Data Sync Logic
async function loadUserProgress() {
    if (!currentUser) return;

    const { data, error } = await supabase
        .from('profiles')
        .select('progress')
        .eq('id', currentUser.id)
        .single();

    if (data && data.progress) {
        // Merge DB progress with App progress
        appState.completedAssignments = data.progress;
        localStorage.setItem('completedAssignments', JSON.stringify(appState.completedAssignments));
        updateAssignmentHub(); // Refresh UI
    }
}

async function syncProgress() {
    if (!currentUser) return;
    
    await supabase
        .from('profiles')
        .update({ progress: appState.completedAssignments })
        .eq('id', currentUser.id);
}

// 7. Admin Logic
function handleAdminCheck() {
    if (currentUser && adminEmails.includes(currentUser.email)) {
        if (!document.getElementById('admin-switch-btn')) {
            const btn = document.createElement('button');
            btn.id = 'admin-switch-btn';
            btn.className = 'action-button small';
            btn.textContent = 'Admin Panel';
            btn.onclick = () => {
                loadAdminUsers();
                showPage('admin-page');
            };
            document.body.appendChild(btn);
        }
    }
}

async function loadAdminUsers() {
    const listEl = document.getElementById('admin-users-list');
    listEl.innerHTML = 'טוען...';

    const { data: users, error } = await supabase
        .from('profiles')
        .select('*')
        .order('email', { ascending: true });

    if (error) {
        listEl.innerHTML = 'שגיאה בטעינת נתונים';
        return;
    }

    listEl.innerHTML = '';
    
    if (users.length === 0) {
        listEl.innerHTML = '<p>אין משתמשים רשומים.</p>';
        return;
    }

    users.forEach(user => {
        // Calculate progress percentage or count
        const progressCount = Array.isArray(user.progress) ? user.progress.length : 0;
        
        const row = document.createElement('div');
        row.className = 'admin-user-row';
        row.innerHTML = `
            <div class="admin-user-info">
                <strong>${user.username || 'No Name'}</strong>
                <span>${user.email}</span>
                <br>
                <span style="font-size:0.8em; color:#7f8c8d;">Progress: ${progressCount} tasks</span>
            </div>
            <div class="admin-controls">
                <button class="action-button small admin-btn-delete">Disable</button>
            </div>
        `;

        // Delete/Disable Logic
        row.querySelector('.admin-btn-delete').addEventListener('click', async () => {
            if(confirm('האם אתה בטוח שברצונך למחוק/להשבית משתמש זה?')) {
                // We delete from profiles table as requested (logic proxy for disable)
                const { error } = await supabase
                    .from('profiles')
                    .delete()
                    .eq('id', user.id);
                
                if (!error) {
                    row.remove();
                } else {
                    alert('Error: ' + error.message);
                }
            }
        });

        listEl.appendChild(row);
    });
}

// 8. Hook into Completion (Strictly required modification)
// We save the original function reference
const originalMarkComplete = markAssignmentAsCompleted;
// We overwrite it to add the sync capability while keeping original logic
markAssignmentAsCompleted = function(assignmentId) {
    // Run original logic exactly as is
    originalMarkComplete(assignmentId);
    // Add new sync logic
    syncProgress();
};
