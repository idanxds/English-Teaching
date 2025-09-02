document.addEventListener('DOMContentLoaded', () => {
    // State Management
    let currentGrade = null;
    let points = 0;
    const completedAssignments = new Set();

    // DOM Elements
    const app = document.getElementById('app');
    const pointsCounter = document.getElementById('points-counter');

    // Page Navigation Logic
    function showPage(pageId) {
        document.querySelectorAll('#app > section').forEach(section => {
            section.classList.add('hidden');
        });
        const page = document.getElementById(pageId);
        if (page) {
            page.classList.remove('hidden');
        } else {
            console.error(`Page with id ${pageId} not found.`);
        }
    }

    function updatePointsDisplay() {
        pointsCounter.textContent = `נקודות: ${points}`;
    }

    function showPopup(message, duration = 2000) {
        const popup = document.createElement('div');
        popup.className = 'popup';
        popup.textContent = message;
        document.body.appendChild(popup);
        setTimeout(() => popup.classList.add('show'), 10);
        setTimeout(() => {
            popup.classList.remove('show');
            setTimeout(() => document.body.removeChild(popup), 500);
        }, duration);
    }
    
    function addPoint() {
        points++;
        updatePointsDisplay();
        showPopup('+1 נקודה!');
    }

    // --- HOME PAGE LOGIC ---
    document.querySelectorAll('.grade-button').forEach(button => {
        button.addEventListener('click', () => {
            currentGrade = button.dataset.grade;
            points = 0;
            updatePointsDisplay();
            pointsCounter.classList.remove('hidden');
            
            const gradeTitle = document.getElementById('grade-title');
            const hebrewGrades = { '2': 'ב', '3': 'ג', '4': 'ד', '5': 'ה', '6': 'ו' };
            gradeTitle.textContent = `כיתה ${hebrewGrades[currentGrade]} - Grade ${currentGrade}`;
            
            const abcBox = document.getElementById('abc-assignment-box');
            if (['2', '3', '4'].includes(currentGrade)) {
                abcBox.classList.remove('hidden');
            } else {
                abcBox.classList.add('hidden');
            }

             document.querySelectorAll('.assignment-box').forEach(box => {
                const assignmentName = box.dataset.assignment;
                if (completedAssignments.has(`${currentGrade}-${assignmentName}`)) {
                    box.classList.add('completed');
                } else {
                    box.classList.remove('completed');
                }
            });

            showPage('grade-page');
        });
    });
    
    document.getElementById('back-to-home').addEventListener('click', () => {
        pointsCounter.classList.add('hidden');
        showPage('home-page');
    });

    // --- ASSIGNMENT NAVIGATION ---
    document.querySelectorAll('.start-assignment-btn').forEach(button => {
        button.addEventListener('click', () => {
            const targetPageFunc = button.dataset.target;
            createAssignmentPage(targetPageFunc);
        });
    });
    
    function markAssignmentAsCompleted(assignmentName) {
        const key = `${currentGrade}-${assignmentName}`;
        completedAssignments.add(key);
        const box = document.querySelector(`.assignment-box[data-assignment="${assignmentName}"]`);
        if (box) {
            box.classList.add('completed');
        }
    }

    function createAndShowPage(id, content, titleText) {
        let page = document.getElementById(id);
        if (page) page.remove();

        page = document.createElement('section');
        page.id = id;
        page.className = 'assignment-page';
        page.innerHTML = `
            <h1>${titleText}</h1>
            <button class="back-button" onclick="window.showPage('grade-page')">חזרה לבית המשימות</button>
            ${content}
        `;
        app.appendChild(page);
        showPage(id);
        return page;
    }

    // --- DYNAMIC PAGE CREATION FOR ALL ASSIGNMENTS ---
    function createAssignmentPage(pageType) {
        // --- Future Simple Assignment ---
        if (pageType === 'future-simple-explanation-page') {
            const content = `<div class="content-box"><p id="fs-explanation-text" class="hidden">זמן עתיד הוא זמן פשוט להבנה. כל הגופים משתמשים ב- will ו- would, אך מה ההבדל ביניהם? <br> משתמשים ב- will כאשר אנחנו רוצים להגיד משהו שקשור אך ורק לעתיד, ואילו משתמשים ב- would כאשר משהו נאמר בעבר אבל אמור להתרחש בעתיד. יש פעמים שמשתמשים ב- would כדי לבטא בקשה מנומסת שתתרחש לרוב בעתיד. חשוב לזכור ש would זה לא תחליף ל- will. <br> בוא נתרגל את מה שלמדנו:</p><button id="fs-start-explanation-btn" class="action-button">התחל הסבר</button></div>`;
            const page = createAndShowPage(pageType, content, "עתיד פשוט");
            page.querySelector('#fs-start-explanation-btn').addEventListener('click', (e) => {
                e.target.style.display = 'none';
                page.querySelector('#fs-explanation-text').classList.remove('hidden');
                setTimeout(() => {
                    const taskBtn = document.createElement('button');
                    taskBtn.className = 'action-button';
                    taskBtn.textContent = 'התחל משימה';
                    taskBtn.onclick = () => createAssignmentPage('future-simple-task1');
                    page.querySelector('.content-box').appendChild(taskBtn);
                }, 6000);
            });
        }
        if (pageType === 'future-simple-task1') {
            const questions = [
                { q: "I __ go to the mall tomorrow", a: "כלום לא מתאים", o: ["will", "would", "כלום לא מתאים"] },
                { q: "___ your sister come to the movie theater tonight?", a: "will", o: ["will", "would", "כלום לא מתאים"] },
                { q: "How __ we go to the school event this weekend?", a: "will", o: ["will", "would", "כלום לא מתאים"] },
                { q: "__ you want to come to my house today?", a: "would", o: ["will", "would", "כלום לא מתאים"] },
                { q: "Ali __ take Maya to school tomorrow.", a: "will", o: ["will", "would", "כלום לא מתאים"] },
                { q: "My dog __ eat his food tonight.", a: "will", o: ["will", "would", "כלום לא מתאים"] },
                { q: "Tomorrow me and my family __ go to eat in a restaurant.", a: "will", o: ["will", "would", "כלום לא מתאים"] },
                { q: "__ you like to come to my house tomorrow?", a: "would", o: ["will", "would", "כלום לא מתאים"] }
            ];
            createQuizPage('fs-task1', 'תרגיל 1 - השלם את החסר', questions, () => createAssignmentPage('future-simple-explanation-task2'));
        }
        if (pageType === 'future-simple-explanation-task2') {
             const content = `<div class="content-box"><p>נכון שיש לנו את הגופים? אז כאשר אנחנו רוצים לכתוב את המשפט בצורה שלילית, במקום will ו- would משתמשים ב- wont ו- wouldn't. הם מייצגים would-not ו- will not. <br> בוא נתרגל את הנושא הזה.</p><button id="fs-start-task2-btn" class="action-button">התחל תרגיל</button></div>`;
            const page = createAndShowPage(pageType, content, "תרגיל 2 - השלם את החסר");
            page.querySelector('#fs-start-task2-btn').addEventListener('click', () => createAssignmentPage('future-simple-task2'));
        }
        if (pageType === 'future-simple-task2') {
            const questions = [
                 { q: "I __ eat fast food next week", a: "wont", o: ["wouldn't", "wont"] },
                 { q: "Noya is sick, she __ come to the party tonight", a: "wont", o: ["wouldn't", "wont"] },
                 { q: "My parents and I __ open our business tomorrow.", a: "wouldn't", o: ["wouldn't", "wont"] },
                 { q: "My sister __ come to the trip next week.", a: "wont", o: ["wouldn't", "wont"] },
                 { q: "I think she __ like the present that I will give her next week.", a: "wont", o: ["wouldn't", "wont"] },
                 { q: "I think I __ be able to visit your family next week.", a: "wouldn't", o: ["wouldn't", "wont"] },
                 { q: "I ___ do that if I were you.", a: "wouldn't", o: ["wouldn't", "wont"] }
            ];
            createQuizPage('fs-task2', 'תרגיל 2 - השלם את החסר', questions, () => {
                markAssignmentAsCompleted('future-simple');
                createAndShowPage('fs-complete', '<button class="action-button" onclick="window.showPage(\'grade-page\')">בחזרה לבית התרגילים</button>', 'כל הכבוד!');
            });
        }

        // --- Verbs Assignment ---
        if (pageType === 'verbs-explanation-page') {
             const content = `<div class="content-box"><p>פעלים הם מילים המתארות פעולות, מחשבות, רגשות אם מצבים. הם חשובים כי הם מראים מה קורה במשפט.<br>הנה כמה פעלים ותרגומם:</p><button id="verbs-continue-btn" class="action-button hidden">המשך לדוגמאות</button></div>`;
             const page = createAndShowPage(pageType, content, "פעלים");
             setTimeout(() => {
                 const btn = page.querySelector('#verbs-continue-btn');
                 btn.classList.remove('hidden');
                 btn.onclick = () => createAssignmentPage('verbs-examples-page');
             }, 2000);
        }
        if (pageType === 'verbs-examples-page') {
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

    let gridHtml = `
      <div style="display:grid;grid-template-columns:1fr 1fr;gap:10px;text-align:center;font-size:1.1em;">
        <div><b>באנגלית</b></div>
        <div><b>תרגום</b></div>
    `;

    verbs.forEach(([en, he]) => {
        gridHtml += `<div dir="ltr">${en}</div><div dir="rtl">${he}</div>`;
    });

    gridHtml += `</div>
      <button id="verbs-task-btn" class="action-button hidden" style="margin-top:20px;">לתרגול</button>`;

    const page = createAndShowPage(pageType, `<div class="content-box">${gridHtml}</div>`, "דוגמאות");

    setTimeout(() => {
        const btn = page.querySelector('#verbs-task-btn');
        btn.classList.remove('hidden');
        btn.onclick = () => createAssignmentPage('verbs-task1-page');
    }, 5000);
}

        if (pageType === 'verbs-task1-page') {
            const questions = [
                { q: 'מה המשמעות של "jump"?', a: 'לקפוץ', o: ['לשבת', 'לקפוץ', 'לחשוב'] },
                { q: 'מה המשמעות של "write"?', a: 'לכתוב', o: ['לקרוא', 'לכתוב', 'ללכת'] },
                { q: 'אני __ מים כל יום', a: 'drink', o: ['cook', 'look', 'drink'] },
                { q: 'היא __ סיפור במחברתה', a: 'writes', o: ['writes', 'walks', 'runs'] },
                { q: 'אני __ לבית הספר כל יום', a: 'walk', o: ['learn', 'fish', 'walk'] },
                { q: 'היא __ לחנות', a: 'goes', o: ['teaches', 'climbs', 'goes'] },
                { q: 'אנחנו __ ארוחת ערב בשעה', a: 'eat', o: ['cook', 'eat', 'ride'] },
                { q: 'הוא __ ספר בספרייה', a: 'reads', o: ['lives', 'lies', 'reads'] }
            ];
            createQuizPage('verbs-task1', 'פעלים - תרגיל 1', questions, () => createAssignmentPage('verbs-task2-intro'));
        }
        if(pageType === 'verbs-task2-intro') {
            const content = `<div class="content-box"><h2>בניית משפט</h2><p>היו לכם 9 אפשרויות של מילים למען בניית המשפט, בחרו את המילים לפי הסדר המתאים, אם המילה הבאה שבחרתם לא באה בסדר הנכון תבחרו אחת אחרת ותזכרו, המילה שמתחילה באות גדולה באה ראשונה!</p><button id="verbs-task2-btn" class="action-button hidden">המשך לתרגיל</button></div>`;
            const page = createAndShowPage(pageType, content, "פעלים - תרגיל 2");
             setTimeout(() => {
                const btn = page.querySelector('#verbs-task2-btn');
                btn.classList.remove('hidden');
                btn.onclick = () => createAssignmentPage('verbs-task2-builder');
            }, 2000);
        }
        if(pageType === 'verbs-task2-builder') {
             createSentenceBuilderPage();
        }

        // --- ABC Assignment ---
        if (pageType === 'abc-video-page') {
            const content = `<div class="content-box">
                <div class="video-container"><iframe src="https://www.youtube.com/embed/BELlZKpi1Zs" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe></div>
                <button id="abc-continue-btn" class="action-button hidden">המשך</button>
            </div>`;
            const page = createAndShowPage(pageType, content, "הא-ב האנגלי: ABC");
            setTimeout(() => {
                const btn = page.querySelector('#abc-continue-btn');
                btn.classList.remove('hidden');
                btn.onclick = () => createAssignmentPage('abc-audio-page');
            }, 60000); // 1 minute
        }

        if (pageType === 'abc-audio-page') {
            createAbcAudioPage();
        }
        if (pageType === 'abc-special-cases') {
            const steps = [
                {
                    title: "אותיות שורקות",
                    text: "האותיות השורקות הם מקרה מיוחד של שילוב אותיות שיוצרות צלילים שונים, שגם יכולים לחקות אותיות מסוימות.",
                    delay: 2000,
                    button: "המשך"
                },
                {
                    title: "E הקסומה",
                    text: 'e בסוף מילה נקראת "magic e" כיוון שהיא גורמת לאות הניקוד שבאה לפניה לשנות את הצליל, כך שהוא נשמע כמו השם שלה ולאחר מכן הצליל נשמע ארוך יותר.',
                    delay: 2000,
                    button: "המשך לסרטון הסבר"
                },
                {
                    content: '<div class="video-container"><iframe src="https://www.youtube.com/embed/gp1UmVSlLJ4" frameborder="0" allowfullscreen></iframe></div>',
                    delay: 30000,
                    button: "המשך"
                },
                {
                    title: "אותיות ניקוד",
                    text: "מספר אותיות הניקוד במילה משפיע על הצליל שלהן כאשר יש למילה אות ניקוד אחת, הצליל של האות הניקוד יהיה קצר. כאשר יש למילה יותר מאות ניקוד אחת, הצליל של האות הניקוד יהיה ארוך ומעוגל יותר",
                    delay: 2000,
                    button: "המשך"
                },
                {
                    content: '<div class="video-container"><iframe src="https://www.youtube.com/embed/RUSCz41aDug" frameborder="0" allowfullscreen></iframe></div>',
                    delay: 45000,
                    button: "המשך"
                },
                {
                    title: "אותיות שקטות",
                    text: "אותיות שותקות אלו אותיות שיופיע כחלק מהמילה עצמה וחייבות להכתב עם המילה אך הן אינן מושמעות בהגיית המילה",
                    delay: 2000,
                    button: "המשך"
                },
                {
                    content: '<div class="video-container"><iframe src="https://www.youtube.com/embed/A2Pl9Usl5Pg" frameborder="0" allowfullscreen></iframe></div>',
                    delay: 80000,
                    button: "המשך למשימה"
                }
            ];
            createChainedContentPage('abc-special', "מקרים מיוחדים", steps, () => createAssignmentPage('abc-quiz-page'));
        }
        if (pageType === 'abc-quiz-page') {
            const questions = [
                { q: "איזה אות באה אחרי K?", a: "L", o: ["A", "L", "Z"] },
                { q: "איזה אות באה אחרי C?", a: "D", o: ["D", "Y", "M"] },
                { q: "איזה אות באה אחרי S?", a: "T", o: ["T", "C", "O"] },
                { q: "איזה אות באה אחרי W?", a: "X", o: ["K", "B", "X"] },
                { q: "איזה אות באה אחרי Q?", a: "R", o: ["R", "E", "L"] },
                { q: "מהי האות האחרונה בסדר האלף - בית באנגלית?", a: "Z", o: ["Q", "Z", "V"] },
                { q: "כמה אותיות יש באלף - בית של אנגלית?", a: "26", o: ["22", "23", "26"] }
            ];
            createQuizPage('abc-quiz', 'תרגול', questions, () => {
                markAssignmentAsCompleted('abc');
                createAndShowPage('abc-complete', '<button class="action-button" onclick="window.showPage(\'grade-page\')">חזרה לבית המשימות</button>', 'כל הכבוד!');
            });
        }
        
        // --- Simple Past Assignment ---
        if (pageType === 'simple-past-explanation-page') {
             const steps = [
                { text: "הזמן הפשוט הוא היבט בסיסי של דקדוק האנגלית המשמש לתיאור פעולות שהושלמו בעבר. הנה כמה כללים חשובים המתארים את השימוש בו", delay: 2000, button: "המשך" },
                { text: 'פעלים רגילים: עבור פעלים רגילים, עבר פשוט נוצר על ידי הוספת "-ed" לצורת הבסיס של הפועל. כלל זה חל על רוב הפעלים.<br>- Watch → watched (צופה ←צפה)<br>- ask → asked (שואל ← שאל)<br>-clean → cleaned (מנקה ← ניקה)', delay: 2000, button: "המשך" },
                { text: 'אם הפועל מסתיים באות e מוסיפים רק את האות "d" ולא "ed", דוגמאות:<br>- like → liked (מחבב ← חיבב)<br>- arrive → arrived<br>- decide → decided', delay: 2000, button: "המשך" },
                { text: 'אם הפועל מסתיים באות עיצור, אות ניקוד, אות עיצור (cvc), הכפל את האות האחרונה האחרון לפני הוספת "-ed". אך אם במילה יש יותר מהעברה אחת אז cvc לא מתקיים. חוץ מכמה יוצאי דופן שלא מכפילים כגון: x,y,w ולפעמים k.<br>דוגמאות למילים:<br>- play → played (משחק ← שיחק)<br>- stop → stopped (עצור ← עצר)', delay: 2000, button: "המשך" },
                { text: "פעלים לא רגילים: בניגוד לכך, פעלים לא סדירים אינם פועלים לפי תבנית קבועה כאשר יוצרים את זמן העבר שלהם. לכן, חשוב לזכור את הצורות העבריות של הפעלים הללו.<br>דוגמאות למילים:<br>- go → went (הולך ← הלך)<br>- see → saw (רואה ← ראה)<br>- eat → ate (אוכל ← אכל)<br>- know → knew (יודע ← ידע)", delay: 2000, button: "המשך" },
                { text: 'משפטים שליליים: כדי ליצור משפטים שליליים בזמן עבר פשוט, השתמשו ב-"did not" (או הצורה המקוצרת "didn\'t") ואחריה הצורה הבסיסית של הפועל. מבנה זה מעביר ביעילות שהפעולה לא התרחשה בעבר.<br>דוגמאות למשפטים:<br>- I didn\'t walk to school today. (אני לא הלכתי לבית ספר היום)<br>- She didn\'t finish her homework. (היא לא סיימה את שיעורי הבית שלה)', delay: 2000, button: "המשך" },
                { text: 'שאלות: כאשר יוצרים שאלות בזמן עבר פשוט, התחילו ב-"Did" או ב-"Were" או ב-"Was", ואחריו הנושא וצורת הבסיס של הפועל. פורמט זה חיוני להשגת מידע על פעולות בעבר.<br><b>דוגמאות:</b><br>1.What did you do yesterday? (מה עשית אתמול?)<br>2.Where did you go last weekend? (לאן הלכת בסוף השבוע האחרון?)<br>3.Did you play any sports last week? (האם שיחקת בספורט בשבוע שעבר?)', delay: 7000, button: "המשך למשימה" },
            ];
             createChainedContentPage('simple-past-expl', "זמן פשוט", steps, () => createAssignmentPage('simple-past-quiz-page'));
        }
        if (pageType === 'simple-past-quiz-page') {
            const questions = [
                { q: "She _____ (speak) to her boss about the project yesterday", a: "spoke", o: ["spoke", "speaks", "speaked"] },
                { q: "We _____ (drive) to the mountains last weekend", a: "drove", o: ["drived", "drive", "drove"] },
                { q: "The cat _____ (sleep) on the sofa all day", a: "slept", o: ["sleeping", "slept", "sleeped"] },
                { q: "I _____ (read) an interesting book last month", a: "read(red)", o: ["read(red)", "readen", "readed"] },
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
                { q: "The movie _____ (begin) late because of technical issue", a: "begun", o: ["begginning", "begin", "begun"] }
            ];
            createQuizPage('simple-past-quiz', 'תרגול', questions, () => {
                markAssignmentAsCompleted('simple-past');
                createAndShowPage('sp-complete', '<button class="action-button" onclick="window.showPage(\'grade-page\')">בחזרה לבית המשימות</button>', 'כל הכבוד!');
            });
        }
    }
    
    // --- HELPER FUNCTIONS FOR COMPLEX PAGES ---

    function createQuizPage(id, title, questions, onComplete) {
        let currentQuestionIndex = 0;
        const content = `<div class="content-box"><div id="quiz-container"><div id="quiz-question" class="quiz-question"></div><div id="quiz-options" class="quiz-options"></div><p id="feedback-message"></p></div></div>`;
        const page = createAndShowPage(id, content, title);
        const questionEl = page.querySelector('#quiz-question');
        const optionsEl = page.querySelector('#quiz-options');
        const feedbackEl = page.querySelector('#feedback-message');

        function loadQuestion() {
            feedbackEl.textContent = '';
            const question = questions[currentQuestionIndex];
            const formattedQuestion = `${currentQuestionIndex + 1}. ${question.q.replace(/_____/g, '<span style="text-decoration: underline;">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span>')}`;
            questionEl.innerHTML = formattedQuestion;
            optionsEl.innerHTML = '';
            setTimeout(() => {
                question.o.forEach(option => {
                    const button = document.createElement('button');
                    button.className = 'quiz-option-btn';
                    button.textContent = option;
                    button.addEventListener('click', () => checkAnswer(option, button));
                    optionsEl.appendChild(button);
                });
            }, 2000);
        }

        function checkAnswer(selectedOption, button) {
            const correctAnwer = questions[currentQuestionIndex].a;
            if (selectedOption === correctAnwer) {
                addPoint();
                currentQuestionIndex++;
                if (currentQuestionIndex < questions.length) {
                    loadQuestion();
                } else {
                    onComplete();
                }
            } else {
                feedbackEl.textContent = 'תשובה שגויה, נסה שוב!';
                button.classList.add('incorrect');
                setTimeout(() => {
                     button.classList.remove('incorrect');
                     feedbackEl.textContent = '';
                }, 3000);
            }
        }
        loadQuestion();
    }

    function createChainedContentPage(id, title, steps, onComplete) {
        let currentStep = 0;
        const content = `<div class="content-box" id="chained-content-box"></div>`;
        const page = createAndShowPage(id, content, title);
        const contentBox = page.querySelector('#chained-content-box');

        function loadStep() {
            const step = steps[currentStep];
            let html = '';
            if (step.title) html += `<h2>${step.title}</h2>`;
            if (step.text) html += `<p>${step.text}</p>`;
            if (step.content) html += step.content;
            html += `<button class="action-button hidden">${step.button}</button>`;
            contentBox.innerHTML = html;

            setTimeout(() => {
                const btn = contentBox.querySelector('button');
                btn.classList.remove('hidden');
                btn.onclick = () => {
                    currentStep++;
                    if (currentStep < steps.length) {
                        loadStep();
                    } else {
                        onComplete();
                    }
                };
            }, step.delay);
        }
        loadStep();
    }
    
    function createSentenceBuilderPage() {
        const correctOrder = ["He", "won't", "go", "to", "the", "mall", "tomorrow"];
        const words = ["won't", "tomorrow", "apple", "mall", "He", "to", "rise", "go", "the"].sort(() => Math.random() - 0.5);
        const incorrectWords = ["apple", "rise"];
        let builtSentence = [];

        const content = `<div class="content-box">
            <div id="built-sentence-container" style="min-height: 50px; border-bottom: 2px solid #ccc; margin-bottom: 20px; font-size: 1.5em; direction: ltr; text-align: left; padding: 10px;"></div>
            <div id="word-options" class="quiz-options"></div>
            <p id="feedback-message"></p>
        </div>`;
        const page = createAndShowPage('sentence-builder', "בניית משפט", content);
        const sentenceEl = page.querySelector('#built-sentence-container');
        const optionsEl = page.querySelector('#word-options');
        const feedbackEl = page.querySelector('#feedback-message');

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
                button.style.backgroundColor = '#dc3545'; // red
                button.disabled = true;
                return;
            }

            const nextCorrectWord = correctOrder[builtSentence.length];
            if (word === nextCorrectWord) {
                builtSentence.push(word);
                sentenceEl.textContent = builtSentence.join(' ');
                button.style.backgroundColor = '#28a745'; // green
                button.disabled = true;
                
                if (builtSentence.length === correctOrder.length) {
                    feedbackEl.textContent = 'עבודה טובה!';
                    optionsEl.innerHTML = '<button class="action-button" onclick="window.showPage(\'grade-page\')">בחזרה לבית המשימות</button>';
                    markAssignmentAsCompleted('verbs');
                }
            } else {
                const prevWord = builtSentence.length > 0 ? builtSentence[builtSentence.length - 1] : 'התחלה';
                feedbackEl.textContent = `המילה הזו לא באה אחרי "${prevWord}", חשבו על מילה אחרת`;
                button.classList.add('incorrect');
                setTimeout(() => button.classList.remove('incorrect'), 500);
            }
        }
        renderWords();
    }
    
    function createAbcAudioPage() {
        const letters = 'abcdefghijklmnopqrstuvwxyz'.split('');
        let revealedCount = 0;

        const content = `<div class="content-box">
            <p>(שימוש באוזניות או קול חיצוני הוא נדרש בשביל החלק הזה, אם אין לכם גישה לזאת, לחצו על כפתור המשך ללא הקשבה.) <button id="abc-skip-audio" class="action-button">המשך ללא הקשבה</button></p>
            <div id="audio-players-container" class="audio-players-container"></div>
            <button id="abc-audio-continue" class="action-button hidden">המשך</button>
        </div>`;
        const page = createAndShowPage('abc-audio', "האותיות", content);
        const container = page.querySelector('#audio-players-container');
        const continueBtn = page.querySelector('#abc-audio-continue');
        
        page.querySelector('#abc-skip-audio').onclick = () => createAssignmentPage('abc-special-cases');
        continueBtn.onclick = () => createAssignmentPage('abc-special-cases');

        function revealNextLetter() {
            if (revealedCount < letters.length) {
                const letter = letters[revealedCount];
                const playerDiv = document.createElement('div');
                playerDiv.className = 'audio-player';
                // NOTE: You need to have audio files named a.mp3, b.mp3, etc. in a folder called 'audio'
                // Since I cannot provide files, I am using a placeholder. The logic works if files are present.
                playerDiv.innerHTML = `
                    <h3>האות ${letter.toUpperCase()}</h3>
                    <audio controls id="audio-${letter}">
                        <source src="https://upload.wikimedia.org/wikipedia/commons/d/de/En-us-a.ogg" type="audio/ogg">
                        Your browser does not support the audio element.
                    </audio>
                `;
                container.appendChild(playerDiv);
                
                const audioEl = playerDiv.querySelector('audio');
                audioEl.onplay = () => {
                     // Use 'onended' to ensure the user listens to most of it
                     audioEl.onended = () => {
                         if (playerDiv.dataset.revealed !== 'true') {
                             playerDiv.dataset.revealed = 'true';
                             revealNextLetter();
                         }
                     };
                };
                 revealedCount++;
            } else {
                 continueBtn.classList.remove('hidden');
            }
        }
        
        revealNextLetter(); // Start with the first letter
    }


    // Make showPage globally accessible for inline onclicks
    window.showPage = showPage;
});