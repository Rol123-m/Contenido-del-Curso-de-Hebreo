// script.js

// Configuración inicial
const CONFIG = {
    MINISTRY_NAME: 'Vivos para Servir',
    STORAGE_KEY: 'hebrewVocabStats',
    TOTAL_WEEKS: 1,
    CHART_COLORS: ['#27ae60', '#f39c12', '#e74c3c']
};

// Vocabulario base
const VOCABULARY = {
    1: [
        { hebrew: 'אָדָם', transliteration: 'ʾādām', meaning: 'hombre, humanidad, Adán', occurrences: 562 },
        { hebrew: 'אֶ֫רֶץ', transliteration: 'ʾereṣ', meaning: 'tierra, suelo, país', occurrences: 2505 },
        { hebrew: 'אֱלֹהִים', transliteration: 'ʾĕlōhîm', meaning: 'Dios, dioses', occurrences: 2602 },
        { hebrew: 'אָב', transliteration: 'ʾāḇ', meaning: 'padre, antepasado', occurrences: 1211 },
        { hebrew: 'אֵל', transliteration: 'ʾēl', meaning: 'Dios, dios', occurrences: 317 },
        { hebrew: 'בֵּן', transliteration: 'bēn', meaning: 'hijo', occurrences: 4941 },
        { hebrew: 'בַּ֫יִת', transliteration: 'bayiṯ', meaning: 'casa, hogar', occurrences: 2047 },
        { hebrew: 'דָּבָר', transliteration: 'dāḇār', meaning: 'palabra, asunto, cosa', occurrences: 1454 },
        { hebrew: 'יוֹם', transliteration: 'yôm', meaning: 'día', occurrences: 2301 },
        { hebrew: 'יִשְׂרָאֵל', transliteration: 'yiśrāʾēl', meaning: 'Israel', occurrences: 2507 },
        { hebrew: 'יְרוּשָׁלַ֫יִם', transliteration: 'yərûšālayim', meaning: 'Jerusalén', occurrences: 643 },
        { hebrew: 'יְהוָה', transliteration: 'YHWH', meaning: 'Yahweh, SEÑOR', occurrences: 6828 },
        { hebrew: 'מִצְרַ֫יִם', transliteration: 'miṣrayim', meaning: 'Egipto', occurrences: 682 },
        { hebrew: 'מֹשֶׁה', transliteration: 'mōšeh', meaning: 'Moisés', occurrences: 766 },
        { hebrew: 'מֶ֫לֶךְ', transliteration: 'melek', meaning: 'rey, gobernante', occurrences: 2530 },
        { hebrew: 'סוּס', transliteration: 'sûs', meaning: 'caballo', occurrences: 138 },
        { hebrew: 'עֶ֫בֶד', transliteration: 'ʿeḇeḏ', meaning: 'siervo, esclavo', occurrences: 803 },
        { hebrew: 'פַּרְעֹה', transliteration: 'parʿōh', meaning: 'Faraón', occurrences: 274 },
        { hebrew: 'שָׁנָה', transliteration: 'šānāh', meaning: 'año', occurrences: 878 },
        { hebrew: 'שֵׁם', transliteration: 'šēm', meaning: 'nombre, reputación', occurrences: 864 }
    ]
};

// Estado de la aplicación
let appState = {
    currentView: 'study',
    currentWeek: 1,
    currentCardIndex: 0,
    currentPracticeMode: 'multiple',
    stats: null,
    chart: null,
    practiceState: {
        currentWord: null,
        options: [],
        matched: new Set(),
        matchedPairs: new Set(),
        selectedHeb: null,
        score: 0,
        totalQuestions: 0,
        correctAnswers: 0,
        totalPairs: 0
    }
};

// Inicialización
document.addEventListener('DOMContentLoaded', () => {
    initializeApp();
});

function initializeApp() {
    loadStats();
    initializeWeeks();
    initializeEventListeners();
    updateFlashcard();
    startStudyTimer();
    updateStats();
}

// Gestión de Estadísticas
function loadStats() {
    const storedStats = localStorage.getItem(CONFIG.STORAGE_KEY);
    
    if (storedStats) {
        appState.stats = JSON.parse(storedStats);
    } else {
        appState.stats = {
            totalSessions: 0,
            totalStudyTime: 0,
            sessionStartTime: Date.now(),
            wordsMastered: {},
            weekProgress: {},
            masteryLevels: { easy: 0, medium: 0, hard: 0 },
            streak: 0,
            lastStudyDate: null,
            practiceHistory: [],
            practiceStats: {
                multipleChoice: { correct: 0, total: 0 },
                matching: { correct: 0, total: 0 },
                writing: { correct: 0, total: 0 }
            }
        };
        
        for (let week = 1; week <= CONFIG.TOTAL_WEEKS; week++) {
            appState.stats.weekProgress[week] = 0;
        }
        
        saveStats();
    }
}

function saveStats() {
    localStorage.setItem(CONFIG.STORAGE_KEY, JSON.stringify(appState.stats));
}

function startStudyTimer() {
    setInterval(() => {
        if (appState.currentView === 'study') {
            appState.stats.totalStudyTime++;
            saveStats();
        }
    }, 60000);
}

function updateStats() {
    const today = new Date().toDateString();
    if (appState.stats.lastStudyDate !== today) {
        if (appState.stats.lastStudyDate === new Date(Date.now() - 86400000).toDateString()) {
            appState.stats.streak++;
        } else {
            appState.stats.streak = 1;
        }
        appState.stats.lastStudyDate = today;
    }
    
    document.getElementById('streakCount').textContent = appState.stats.streak;
    document.getElementById('totalStudySessions').textContent = appState.stats.totalSessions;
    document.getElementById('totalStudyTime').textContent = Math.floor(appState.stats.totalStudyTime);
    document.getElementById('wordsMastered').textContent = Object.keys(appState.stats.wordsMastered).length;
    document.getElementById('currentStreak').textContent = appState.stats.streak;
    
    updateWeekProgress();
    updateMasteryChart();
    saveStats();
}

function updateWeekProgress() {
    const weekProgressBars = document.getElementById('weekProgressBars');
    if (!weekProgressBars) return;
    
    weekProgressBars.innerHTML = '';
    
    for (let week = 1; week <= CONFIG.TOTAL_WEEKS; week++) {
        const progress = appState.stats.weekProgress[week] || 0;
        
        const progressItem = document.createElement('div');
        progressItem.className = 'progress-item';
        progressItem.innerHTML = `
            <span>Semana ${week}</span>
            <div class="progress-bar-container">
                <div class="progress-bar-fill" style="width: ${progress}%"></div>
            </div>
        `;
        
        weekProgressBars.appendChild(progressItem);
    }
}

function updateMasteryChart() {
    const ctx = document.getElementById('masteryChart');
    if (!ctx) return;
    
    if (appState.chart) {
        appState.chart.destroy();
    }
    
    appState.chart = new Chart(ctx, {
        type: 'doughnut',
        data: {
            labels: ['Fácil', 'Medio', 'Difícil'],
            datasets: [{
                data: [
                    appState.stats.masteryLevels.easy,
                    appState.stats.masteryLevels.medium,
                    appState.stats.masteryLevels.hard
                ],
                backgroundColor: CONFIG.CHART_COLORS,
                borderWidth: 0
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    position: 'bottom'
                }
            }
        }
    });
}

function initializeWeeks() {
    const weekSelects = ['weekSelect', 'practiceWeekSelect'];
    
    weekSelects.forEach(selectId => {
        const select = document.getElementById(selectId);
        if (!select) return;
        
        select.innerHTML = '';
        
        for (let week = 1; week <= CONFIG.TOTAL_WEEKS; week++) {
            const option = document.createElement('option');
            option.value = week;
            option.textContent = `Semana ${week}`;
            select.appendChild(option);
        }
    });
}

function initializeEventListeners() {
    document.querySelectorAll('.nav-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
            const view = e.currentTarget.dataset.view;
            switchView(view);
        });
    });
    
    const weekSelect = document.getElementById('weekSelect');
    if (weekSelect) {
        weekSelect.addEventListener('change', (e) => {
            appState.currentWeek = parseInt(e.target.value);
            appState.currentCardIndex = 0;
            updateFlashcard();
        });
    }
    
    const practiceWeekSelect = document.getElementById('practiceWeekSelect');
    if (practiceWeekSelect) {
        practiceWeekSelect.addEventListener('change', (e) => {
            appState.currentWeek = parseInt(e.target.value);
            resetPracticeState();
            loadPracticeMode(appState.currentWeek);
        });
    }
    
    const flashcard = document.getElementById('flashcard');
    if (flashcard) {
        flashcard.addEventListener('click', () => {
            document.getElementById('flashcard').classList.toggle('flipped');
        });
    }
    
    const prevCard = document.getElementById('prevCard');
    if (prevCard) {
        prevCard.addEventListener('click', () => {
            navigateCard('prev');
        });
    }
    
    const nextCard = document.getElementById('nextCard');
    if (nextCard) {
        nextCard.addEventListener('click', () => {
            navigateCard('next');
        });
    }
    
    const flipCard = document.getElementById('flipCard');
    if (flipCard) {
        flipCard.addEventListener('click', () => {
            document.getElementById('flashcard').classList.toggle('flipped');
        });
    }
    
    const markEasy = document.getElementById('markEasy');
    if (markEasy) {
        markEasy.addEventListener('click', () => markWord('easy'));
    }
    
    const markMedium = document.getElementById('markMedium');
    if (markMedium) {
        markMedium.addEventListener('click', () => markWord('medium'));
    }
    
    const markHard = document.getElementById('markHard');
    if (markHard) {
        markHard.addEventListener('click', () => markWord('hard'));
    }
    
    document.querySelectorAll('.mode-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
            document.querySelectorAll('.mode-btn').forEach(b => b.classList.remove('active'));
            e.currentTarget.classList.add('active');
            appState.currentPracticeMode = e.currentTarget.dataset.mode;
            resetPracticeState();
            loadPracticeMode(appState.currentWeek);
        });
    });
    
    const resetStats = document.getElementById('resetStats');
    if (resetStats) {
        resetStats.addEventListener('click', () => {
            if (confirm('¿Estás seguro de que quieres resetear todas las estadísticas?')) {
                localStorage.removeItem(CONFIG.STORAGE_KEY);
                loadStats();
                updateStats();
            }
        });
    }
}

function resetPracticeState() {
    appState.practiceState = {
        currentWord: null,
        options: [],
        matched: new Set(),
        matchedPairs: new Set(),
        selectedHeb: null,
        score: 0,
        totalQuestions: 0,
        correctAnswers: 0,
        totalPairs: 0
    };
}

function switchView(view) {
    document.querySelectorAll('.nav-btn').forEach(btn => {
        btn.classList.remove('active');
        if (btn.dataset.view === view) {
            btn.classList.add('active');
        }
    });
    
    document.querySelectorAll('.view').forEach(v => {
        v.classList.remove('active');
    });
    
    const viewElement = document.getElementById(`${view}View`);
    if (viewElement) {
        viewElement.classList.add('active');
    }
    
    appState.currentView = view;
    
    if (view === 'practice') {
        resetPracticeState();
        loadPracticeMode(appState.currentWeek);
    } else if (view === 'stats') {
        updateStats();
    }
}

// Funciones de Flashcard
function updateFlashcard() {
    const weekWords = VOCABULARY[appState.currentWeek];
    if (!weekWords) return;
    
    const word = weekWords[appState.currentCardIndex];
    
    const hebrewWord = document.getElementById('hebrewWord');
    const transliteration = document.getElementById('transliteration');
    const meaning = document.getElementById('meaning');
    const occurrences = document.getElementById('occurrences');
    const currentCard = document.getElementById('currentCard');
    const totalCards = document.getElementById('totalCards');
    
    if (hebrewWord) hebrewWord.textContent = word.hebrew;
    if (transliteration) transliteration.textContent = word.transliteration;
    if (meaning) meaning.textContent = word.meaning;
    if (occurrences) occurrences.textContent = `Ocurrencias: ${word.occurrences}`;
    if (currentCard) currentCard.textContent = appState.currentCardIndex + 1;
    if (totalCards) totalCards.textContent = weekWords.length;
    
    const flashcard = document.getElementById('flashcard');
    if (flashcard) {
        flashcard.classList.remove('flipped');
    }
}

function navigateCard(direction) {
    const weekWords = VOCABULARY[appState.currentWeek];
    
    if (direction === 'next') {
        if (appState.currentCardIndex < weekWords.length - 1) {
            appState.currentCardIndex++;
        } else {
            appState.currentCardIndex = 0;
        }
    } else if (direction === 'prev') {
        if (appState.currentCardIndex > 0) {
            appState.currentCardIndex--;
        } else {
            appState.currentCardIndex = weekWords.length - 1;
        }
    }
    
    updateFlashcard();
}

function markWord(level) {
    const word = VOCABULARY[appState.currentWeek][appState.currentCardIndex];
    const wordKey = `${word.hebrew}_${appState.currentWeek}`;
    
    appState.stats.wordsMastered[wordKey] = level;
    appState.stats.masteryLevels[level]++;
    
    const weekWords = VOCABULARY[appState.currentWeek];
    const masteredInWeek = weekWords.filter((w, i) => {
        const key = `${w.hebrew}_${appState.currentWeek}`;
        return appState.stats.wordsMastered[key];
    }).length;
    
    appState.stats.weekProgress[appState.currentWeek] = 
        (masteredInWeek / weekWords.length) * 100;
    
    saveStats();
    
    const btn = document.querySelector(`.mastery-btn.${level}`);
    if (btn) {
        btn.classList.add('pulse');
        setTimeout(() => btn.classList.remove('pulse'), 500);
    }
    
    setTimeout(() => navigateCard('next'), 300);
}

// Funciones de Práctica
function loadPracticeMode(week) {
    const weekWords = VOCABULARY[week];
    const practiceArea = document.getElementById('practiceArea');
    
    if (!practiceArea) return;
    
    switch(appState.currentPracticeMode) {
        case 'multiple':
            loadMultipleChoice(weekWords);
            break;
        case 'match':
            loadMatchingGame(weekWords);
            break;
        case 'write':
            loadWritingPractice(weekWords);
            break;
    }
}

function loadMultipleChoice(words) {
    const practiceArea = document.getElementById('practiceArea');
    
    let randomWord;
    do {
        randomWord = words[Math.floor(Math.random() * words.length)];
    } while (appState.practiceState.currentWord === randomWord && words.length > 1);
    
    appState.practiceState.currentWord = randomWord;
    appState.practiceState.totalQuestions++;
    
    let options = [randomWord];
    const otherWords = words.filter(w => w !== randomWord);
    
    while (options.length < 4 && otherWords.length > 0) {
        const randomIndex = Math.floor(Math.random() * otherWords.length);
        const randomOption = otherWords[randomIndex];
        if (!options.includes(randomOption)) {
            options.push(randomOption);
        }
    }
    
    options = shuffleArray(options);
    appState.practiceState.options = options;
    
    practiceArea.innerHTML = `
        <div class="practice-header">
            <h3>Selección Múltiple</h3>
            <div class="practice-score">
                Aciertos: <span id="correctCount">${appState.practiceState.correctAnswers}</span>/<span id="totalCount">${appState.practiceState.totalQuestions}</span>
            </div>
        </div>
        <div class="multiple-choice-question">
            <div class="hebrew-word">${randomWord.hebrew}</div>
            <div class="transliteration">${randomWord.transliteration}</div>
            <p>¿Cuál es el significado?</p>
        </div>
        <div class="options-grid" id="optionsGrid">
            ${options.map(opt => `
                <button class="option-btn" data-meaning="${opt.meaning}" data-correct="${opt.meaning === randomWord.meaning}">
                    ${opt.meaning}
                </button>
            `).join('')}
        </div>
        <div class="practice-controls">
            <button id="nextQuestionBtn" class="next-question-btn" style="display: none;">
                Siguiente Pregunta <i class="fas fa-arrow-right"></i>
            </button>
        </div>
    `;
    
    document.querySelectorAll('.option-btn').forEach(btn => {
        btn.addEventListener('click', function(e) {
            const isCorrect = this.dataset.correct === 'true';
            
            document.querySelectorAll('.option-btn').forEach(b => {
                b.disabled = true;
            });
            
            document.querySelectorAll('.option-btn').forEach(b => {
                if (b.dataset.correct === 'true') {
                    b.classList.add('correct');
                }
            });
            
            if (!isCorrect) {
                this.classList.add('incorrect');
            } else {
                appState.practiceState.correctAnswers++;
                appState.stats.practiceStats.multipleChoice.correct++;
            }
            
            appState.stats.practiceStats.multipleChoice.total++;
            appState.stats.totalSessions++;
            
            document.getElementById('correctCount').textContent = appState.practiceState.correctAnswers;
            document.getElementById('totalCount').textContent = appState.practiceState.totalQuestions;
            
            document.getElementById('nextQuestionBtn').style.display = 'block';
            
            updateStats();
        });
    });
    
    document.getElementById('nextQuestionBtn').addEventListener('click', () => {
        loadMultipleChoice(words);
    });
}

function loadMatchingGame(words) {
    const practiceArea = document.getElementById('practiceArea');
    
    const shuffledWords = shuffleArray([...words]);
    const selectedWords = shuffledWords.slice(0, 6);
    
    appState.practiceState.matchedPairs = new Set();
    appState.practiceState.selectedHeb = null;
    appState.practiceState.totalPairs = selectedWords.length;
    
    const hebrewWords = shuffleArray([...selectedWords]);
    const meanings = shuffleArray([...selectedWords]);
    
    practiceArea.innerHTML = `
        <div class="practice-header">
            <h3>Juego de Emparejar</h3>
            <div class="matching-score">
                Emparejados: <span id="matchedCount">0</span>/${selectedWords.length}
            </div>
        </div>
        <div class="matching-game">
            <div class="matching-columns">
                <div class="matching-col" id="hebrewCol">
                    ${hebrewWords.map((word, index) => `
                        <div class="matching-item" data-id="heb-${index}" data-hebrew="${word.hebrew}" data-meaning="${word.meaning}" data-matched="false">
                            ${word.hebrew}
                        </div>
                    `).join('')}
                </div>
                <div class="matching-col" id="meaningCol">
                    ${meanings.map((word, index) => `
                        <div class="matching-item" data-id="mean-${index}" data-meaning="${word.meaning}" data-hebrew="${word.hebrew}" data-matched="false">
                            ${word.meaning}
                        </div>
                    `).join('')}
                </div>
            </div>
            <div class="practice-controls">
                <button id="resetMatchingBtn" class="reset-btn">
                    <i class="fas fa-redo-alt"></i> Reiniciar Juego
                </button>
                <button id="newMatchingBtn" class="next-question-btn">
                    Nuevo Juego <i class="fas fa-arrow-right"></i>
                </button>
            </div>
        </div>
    `;
    
    function updateMatchedCount() {
        const matchedCount = appState.practiceState.matchedPairs.size;
        document.getElementById('matchedCount').textContent = matchedCount;
        
        if (matchedCount === appState.practiceState.totalPairs) {
            setTimeout(() => {
                const message = document.createElement('div');
                message.className = 'success-message';
                message.innerHTML = `
                    <i class="fas fa-trophy"></i>
                    <p>¡Felicidades! Has completado el juego.</p>
                `;
                practiceArea.appendChild(message);
                
                appState.stats.totalSessions++;
                appState.stats.practiceStats.matching.correct++;
                appState.stats.practiceStats.matching.total++;
                updateStats();
            }, 300);
        }
    }
    
    document.querySelectorAll('#hebrewCol .matching-item').forEach(item => {
        item.addEventListener('click', function() {
            if (this.dataset.matched === 'true') return;
            
            document.querySelectorAll('#hebrewCol .matching-item').forEach(i => {
                if (i.dataset.matched !== 'true') {
                    i.classList.remove('selected');
                }
            });
            
            this.classList.add('selected');
            appState.practiceState.selectedHeb = this;
        });
    });
    
    document.querySelectorAll('#meaningCol .matching-item').forEach(item => {
        item.addEventListener('click', function() {
            if (this.dataset.matched === 'true') return;
            
            const selectedHeb = appState.practiceState.selectedHeb;
            
            if (selectedHeb && selectedHeb.dataset.meaning === this.dataset.meaning) {
                const pairId = `${selectedHeb.dataset.hebrew}-${this.dataset.meaning}`;
                
                if (!appState.practiceState.matchedPairs.has(pairId)) {
                    selectedHeb.dataset.matched = 'true';
                    this.dataset.matched = 'true';
                    
                    selectedHeb.classList.remove('selected');
                    selectedHeb.classList.add('matched');
                    this.classList.add('matched');
                    
                    appState.practiceState.matchedPairs.add(pairId);
                    
                    updateMatchedCount();
                }
                
                appState.practiceState.selectedHeb = null;
            } else if (selectedHeb) {
                this.classList.add('incorrect');
                setTimeout(() => this.classList.remove('incorrect'), 500);
                
                selectedHeb.classList.remove('selected');
                appState.practiceState.selectedHeb = null;
            }
        });
    });
    
    document.getElementById('resetMatchingBtn').addEventListener('click', () => {
        loadMatchingGame(words);
    });
    
    document.getElementById('newMatchingBtn').addEventListener('click', () => {
        loadMatchingGame(words);
    });
}

function loadWritingPractice(words) {
    const practiceArea = document.getElementById('practiceArea');
    
    const randomWord = words[Math.floor(Math.random() * words.length)];
    appState.practiceState.currentWord = randomWord;
    appState.practiceState.totalQuestions++;
    
    practiceArea.innerHTML = `
        <div class="practice-header">
            <h3>Práctica de Escritura</h3>
            <div class="practice-score">
                Aciertos: <span id="correctCount">${appState.practiceState.correctAnswers}</span>/<span id="totalCount">${appState.practiceState.totalQuestions}</span>
            </div>
        </div>
        <div class="writing-practice">
            <div class="writing-question">
                <div class="hebrew-word">${randomWord.hebrew}</div>
                <div class="transliteration">${randomWord.transliteration}</div>
                <p>Escribe el significado completo:</p>
            </div>
            <input type="text" id="writingInput" class="writing-input" placeholder="Ej: hombre, humanidad, Adán" autocomplete="off">
            <button id="checkWriting" class="check-btn">Comprobar</button>
            <div id="writingFeedback" class="writing-feedback"></div>
            <div class="practice-controls">
                <button id="nextWritingBtn" class="next-question-btn" style="display: none;">
                    Siguiente Palabra <i class="fas fa-arrow-right"></i>
                </button>
            </div>
        </div>
    `;
    
    document.getElementById('checkWriting').addEventListener('click', function() {
        const input = document.getElementById('writingInput').value.toLowerCase().trim();
        const feedback = document.getElementById('writingFeedback');
        const correctMeanings = randomWord.meaning.toLowerCase().split(',').map(m => m.trim());
        
        const userWords = input.split(/[,\s]+/).filter(word => word.length > 0);
        
        let allWordsValid = true;
        let hasCompleteWord = false;
        const matchedMeanings = [];
        
        for (const userWord of userWords) {
            if (userWord.length < 3) continue;
            
            hasCompleteWord = true;
            let wordValid = false;
            
            for (const correctMeaning of correctMeanings) {
                const correctWords = correctMeaning.split(/[\s,]+/).filter(w => w.length > 0);
                
                for (const correctWord of correctWords) {
                    const normalizedUser = removeAccents(userWord);
                    const normalizedCorrect = removeAccents(correctWord);
                    
                    if (normalizedUser === normalizedCorrect) {
                        wordValid = true;
                        if (!matchedMeanings.includes(correctMeaning)) {
                            matchedMeanings.push(correctMeaning);
                        }
                        break;
                    }
                }
                
                if (wordValid) break;
            }
            
            if (!wordValid) {
                allWordsValid = false;
                break;
            }
        }
        
        const isCorrect = allWordsValid && hasCompleteWord && userWords.length > 0 && matchedMeanings.length > 0;
        
        if (isCorrect) {
            feedback.textContent = '¡Correcto! Muy bien.';
            feedback.className = 'writing-feedback correct';
            appState.practiceState.correctAnswers++;
            appState.stats.practiceStats.writing.correct++;
        } else {
            feedback.textContent = `Incorrecto. Las respuestas correctas son: ${randomWord.meaning}`;
            feedback.className = 'writing-feedback incorrect';
        }
        
        appState.stats.practiceStats.writing.total++;
        appState.stats.totalSessions++;
        
        document.getElementById('correctCount').textContent = appState.practiceState.correctAnswers;
        document.getElementById('totalCount').textContent = appState.practiceState.totalQuestions;
        
        document.getElementById('checkWriting').style.display = 'none';
        document.getElementById('nextWritingBtn').style.display = 'block';
        
        updateStats();
    });
    
    document.getElementById('nextWritingBtn').addEventListener('click', function() {
        loadWritingPractice(words);
    });
    
    document.getElementById('writingInput').addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            document.getElementById('checkWriting').click();
        }
    });
}

function removeAccents(str) {
    return str.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
}

function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}

function addNewWeek(weekNumber, words) {
    VOCABULARY[weekNumber] = words;
    CONFIG.TOTAL_WEEKS = Math.max(CONFIG.TOTAL_WEEKS, weekNumber);
    
    initializeWeeks();
    
    if (!appState.stats.weekProgress[weekNumber]) {
        appState.stats.weekProgress[weekNumber] = 0;
        saveStats();
    }
}

window.addHebrewWeek = addNewWeek;