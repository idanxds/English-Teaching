document.addEventListener('DOMContentLoaded', () => {

    // --- STATE MANAGEMENT ---
    let appState = {
        currentPage: 'home-page',
        points: 0,
        completedAssignments: JSON.parse(localStorage.getItem('completedAssignments')) || []
    };
    
    // --- YOUTUBE CONFIG ---
    // !!! מדריך YOUTUBE !!!
    // החלף את הקישורים בקישורי ה-EMBED שלך מ-YouTube.
    // כדי לקבל קישור embed:
    // 1. פתח את הסרטון ב-YouTube
    // 2. לחץ על "Share" (שיתוף)
    // 3. לחץ על "Embed" (הטמעה)
    // 4. העתק את ה-URL מתוך תג ה-iframe (רק את מה שבתוך src="")
    // למשל: "https://www.youtube.com/embed/dQw4w9WgXcQ"
    const youtubeLinks = {
        "1": { title: "סרטון 1", url: "https://www.youtube.com/embed/your-video-id-1" },
        "2": { title: "סרטון 2", url: "https://www.youtube.com/embed/your-video-id-2" },
        "3": { title: "סרטון 3", url: "https://www.youtube.com/embed/your-video-id-3" },
        "4": { title: "סרטון 4", url: "https://www.youtube.com/embed/your-video-id-4" },
        "5": { title: "סרטון 5", url: "https://www.youtube.com/embed/your-video-id-5" },
        "6": { title: "סרטון 6", url: "https://www.youtube.com/embed/your-video-id-6" },
        "7": { title: "סרטון 7", url: "https://www.youtube.com/embed/your-video-id-7" },
        "8": { title: "סרטון 8", url: "https://www.youtube.com/embed/your-video-id-8" },
        "9": { title: "סרטון 9", url: "https://www.youtube.com/embed/your-video-id-9" },
        "10": { title: "סרטון 10", url: "https://www.youtube.com/embed/your-video-id-10" },
        "11": { title: "סרטון 11", url: "https://www.youtube.com/embed/your-video-id-11" },
        "12": { title: "סרטון 12", url: "https://www.youtube.com/embed/your-video-id-12" },
        "13": { title: "סרטון 13", url: "https://www.youtube.com/embed/your-video-id-13" },
        "14": { title: "סרטון 14", url: "https://www.youtube.com/embed/your-video-id-14" },
        "15": { title: "סרטון 15", url: "https://www.youtube.com/embed/your-video-id-15" },
        "16": { title: "סרטון 16", url: "https://www.youtube.com/embed/your-video-id-16" },
        "17": { title: "סרטון 17", url: "https://www.youtube.com/embed/your-video-id-17" },
        "18": { title: "סרטון 18", url: "https://www.youtube.com/embed/your-video-id-18" },
        "19": { title: "סרטון 19", url: "https://www.youtube.com/embed/your-video-id-19" },
        "20": { title: "סרטון 20", url: "https://www.youtube.com/embed/your-video-id-20" },
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

    // --- DOM ELEMENTS ---
    const app = document.getElementById('app');
    const allPages = document.querySelectorAll('.page');

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
        
        // Special logic for assignment hub
        if (pageId === 'assignment-hub-page') {
            updateAssignmentHub();
        }
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
        for (let i = 1; i <= 36; i++) {
            const video = youtubeLinks[i.toString()];
            if (video) {
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
    
    // --- TASK & ASSIGNMENT LOADER ---
    const taskPageContent = document.getElementById('task-content');

    function startAssignment(assignmentId) {
        // Clear previous content
        taskPageContent.innerHTML = '';
        
        let content = `<h1>${getAssignmentTitle(assignmentId)}</h1>`;
        
        // This function builds the introduction page for each assignment
        // and provides buttons to start the quizzes.
        
        switch(assignmentId) {
            case 'reading':
                content += `<p>בחר את רמת הקריאה לתרגול:</p>`;
                content += `<button class="action-button task-start-btn" data-quiz="reading1">רמה 1 (כיתה ב)</button>`;
                content += `<button class="action-button task-start-btn" data-quiz="reading2">רמה 2 (כיתה ג)</button>`;
                content += `<button class="action-button task-start-btn" data-quiz="reading3">רמה 3 (כיתה ד)</button>`;
                content += `<button class="action-button task-start-btn" data-quiz="reading4">רמה 4 (כיתה ה)</button>`;
                content += `<button class="action-button task-start-btn" data-quiz="reading5">רמה 5 (כיתה ו)</button>`;
                break;
                
            case 'grammar':
                content += `<p>בחר את הנושא לתרגול:</p>`;
                content += `<button class="action-button task-start-btn" data-quiz="whQuestions">שאלות WH (השלם את החסר)</button>`;
                content += `<button class="action-button task-start-btn" data-quiz="prepositions">מילות יחס (Prepositions)</button>`;
                content += `<button class="action-button task-start-btn" data-quiz="presentSimple1">Present Simple - s/es/ies</button>`;
                content += `<button class="action-button task-start-btn" data-quiz="presentSimple2">Present Simple - Don't / Doesn't</button>`;
                content += `<button class="action-button task-start-btn" data-quiz="presentSimple3">Present Simple - Do / Does</button>`;
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
                break;
                
            case 'speaking':
                content += `<p>במשימה זו תתרגלו זיהוי שגיאות וקריאה בקול.</p>`;
                content += `<h2>טקסט לקריאה (Lvl 3)</h2><div class="text-passage ltr"><h3>The Strength Within</h3><p>Once upon a time in a small village, there lived a girl named Mia. She was like any other girl, with dreams, hopes, and a heart full of kindness. Every morning, she would tie her hair into a pony tail and slip on her favorite blue slippers before heading to her High school...</p><p>(המשך הטקסט מקובץ ה-PDF שלך...)</p></div>`;
                content += `<button class="action-button task-start-btn" data-quiz="speaking1">התחל תרגיל זיהוי שגיאות (Lvl 1)</button>`;
                content += `<button class="action-button task-start-btn" data-quiz="speaking2">התחל תרגיל זיהוי שגיאות (Lvl 2)</button>`;
                break;
                
            case 'adjectives':
                content += `<p>לימוד ותרגול שמות תואר (Adjectives) ותואר הפועל (Adverbs).</p>`;
                content += `<h2>כללים בסיסיים</h2><div class="text-passage ltr"><p>Adjectives describe nouns (e.g., tall man, beautiful day).</p><p>To compare (bigger): add 'er' (taller) or use 'more' for long words (more beautiful).</p><p>For 'the most' (biggest): add 'est' (tallest) or use 'most' (most beautiful).</p><p>Adverbs describe verbs (e.g., run quickly, eat slowly). They often end in -ly.</p></div>`;
                content += `<button class="action-button task-start-btn" data-quiz="adjectivesQuiz">התחל תרגול</button>`;
                break;
        }
        
        showPage('task-page');
        
        // Add event listeners for the new buttons
        document.querySelectorAll('.task-start-btn').forEach(btn => {
            btn.addEventListener('click', () => {
                startQuiz(btn.dataset.quiz, assignmentId);
            });
        });
        
        if (document.getElementById('complete-writing-btn')) {
            document.getElementById('complete-writing-btn').addEventListener('click', () => {
                markAssignmentAsCompleted('writing');
                showPage('assignment-hub-page');
            });
        }
    }
    
    function getAssignmentTitle(assignmentId) {
        const titles = {
            'reading': 'קריאה',
            'grammar': 'דקדוק',
            'writing': 'כתיבה',
            'speaking': 'דיבור',
            'adjectives': 'שמות תואר'
        };
        return titles[assignmentId] || 'משימה';
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
    const nextBtn = document.getElementById('quiz-next-btn');

    function startQuiz(quizId, assignmentId) {
        currentQuizId = quizId;
        parentAssignmentId = assignmentId;
        currentQuiz = shuffleArray([...quizData[quizId]]); // Get a shuffled copy
        currentQuestionIndex = 0;
        wrongAnswers = [];
        isReviewRound = false;
        
        // Add back button to quiz page
        if (!document.querySelector('#quiz-page .back-button')) {
            const backBtn = document.createElement('button');
            backBtn.className = 'back-button';
            backBtn.textContent = 'חזרה למשימות';
            backBtn.dataset.target = 'assignment-hub-page';
            backBtn.addEventListener('click', () => showPage('assignment-hub-page'));
            document.getElementById('quiz-page').prepend(backBtn);
        }
        
        showPage('quiz-page');
        loadQuestion();
    }

    function loadQuestion() {
        // Clear previous state
        feedbackEl.textContent = '';
        feedbackEl.className = '';
        nextBtn.classList.add('hidden');
        optionsEl.innerHTML = '';

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
                wrongAnswers.push(currentQuiz[currentQuestionIndex]);
            }
        }

        nextBtn.classList.remove('hidden');
    }

    nextBtn.addEventListener('click', () => {
        currentQuestionIndex++;
        loadQuestion();
    });

    function finishQuiz() {
        if (wrongAnswers.length > 0 && !isReviewRound) {
            // Start review round
            isReviewRound = true;
            currentQuiz = shuffleArray([...wrongAnswers]);
            wrongAnswers = [];
            currentQuestionIndex = 0;
            questionEl.textContent = 'בואו נעבור שוב על הטעויות...';
            optionsEl.innerHTML = '';
            feedbackEl.textContent = '';
            nextBtn.textContent = 'התחל סבב תיקון';
            nextBtn.classList.remove('hidden');
            // Remove the event listener to avoid recursive calls
            const newNextBtn = nextBtn.cloneNode(true);
            nextBtn.parentNode.replaceChild(newNextBtn, nextBtn);
            newNextBtn.addEventListener('click', loadQuestion);

        } else {
            // Quiz truly finished
            questionEl.textContent = 'כל הכבוד! סיימת את המשימה.';
            optionsEl.innerHTML = '';
            feedbackEl.textContent = '';
            nextBtn.textContent = 'חזור למשימות';
            nextBtn.classList.remove('hidden');
            // Remove the event listener
            const newNextBtn = nextBtn.cloneNode(true);
            nextBtn.parentNode.replaceChild(newNextBtn, nextBtn);
            newNextBtn.addEventListener('click', () => {
                // Check if this was the last quiz for the assignment
                checkAssignmentCompletion();
                showPage('assignment-hub-page');
            });
        }
    }
    
    function checkAssignmentCompletion() {
        // This is a simple check. For a multi-quiz assignment, this needs more logic.
        // For now, completing any quiz marks the parent assignment as complete.
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

    // --- QUIZ DATABASE ---
    // All questions imported from your files
    const quizData = {
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
            { q: "The ball is ___ the table.", o: ["on", "under", "next to"], a: "on" }, // Assuming 'on' is a valid option from the doc
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
            { q: "The car is parked ___ the house.", o: ["next to", "behind", "in"], a: "next to" }, // All could be right, chose one
            { q: "The keys are ___ the drawer.", o: ["in", "on", "under"], a: "in" },
            { q: "The children are playing ___ the park.", o: ["in", "on", "behind"], a: "in" },
            { q: "The lamp is ___ the table, not under it.", o: ["on", "next to", "in"], a: "on" },
            { q: "The school bag is ___ the chair and the desk.", o: ["between", "next to", "under"], a: "between" },
            { q: "The clock is hanging ___ the wall above the TV.", o: ["on", "under", "in front of"], a: "on" },
            { q: "The cat is hiding ___ the sofa because it is scared.", o: ["behind", "on", "in"], a: "behind" },
            { q: "The books are neatly placed ___ the shelf.", o: ["on", "under", "in front of"], a: "on" },
            { q: "The bike is leaning ___ the wall in the garage.", o: ["next to", "on", "under"], a: "next to" } // 'against' would be better, but 'next to' fits
        ],
        'presentSimple1': [ // s/es/ies
            { q: "fix (he)", o: ["fixes", "fixs", "fixies"], a: "fixes" },
            { q: "watch (she)", o: ["watchs", "watches", "watchies"], a: "watches" },
            { q: "brush (he)", o: ["brushs", "brushes", "brushies"], a: "brushes" },
            { q: "tidy (she)", o: ["tidys", "tidies", "tidyes"], a: "tidies" },
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
            { q: "___ your wife/husband come from Argentina?", o: ["Do", "Does"], a: "Does" },
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
            { q: "10. מה יוצא דופן?", o: ["new", "fast", "tasty"], a: "new" } // Based on the visual grouping in the PDF
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
            { q:s: "How did Mia feel about going inside?", o: ["Only scared", "Only excited", "Excited and a little scared"], a: "Excited and a little scared" },
            { q: "What did they find inside the cave?", o: ["A small animal", "A small treasure chest", "Their teacher"], a: "A small treasure chest" },
            { q: "What happened after they opened the chest?", o: ["The cave started shaking", "They found gold", "A noise stopped"], a: "The cave started shaking" }
        ],
        'reading5': [
            { q: "Who was Captain Moshco?", o: ["A famous soldier", "A famous pirate", "A famous captain"], a: "A famous pirate" },
            { q: "What did the old map show?", o: ["A hidden island", "A new ship", "A jungle"], a: "A hidden island" },
            { q: "Where was the 'X' on the map?", o: ["In a cave", "Under a big, old tree", "On the beach"], a: "Under a big, old tree" },
            { q: "What was inside the chest?", o: ["Gold coins, jewels, and a sword", "Only gold coins", "An old map"], a: "Gold coins, jewels, and a sword" },
            { q: "Who won the fight?", o: ["The enemy captain", "Captain Moshco's crew", "Nobody"], a: "Captain Moshco's crew" }
        ]
    };
    
    // --- INITIALIZE ---
    initYouTubePage();
    showPage('home-page'); // Start on the home page

});
