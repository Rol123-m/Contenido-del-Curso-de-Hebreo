// script.js - Versión Mejorada

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
        multipleChoice: {
            currentWord: null,
            correctAnswers: 0,
            totalQuestions: 0,
            answered: false,
            options: []
        },
        matching: {
            selectedWords: [],
            matchedPairs: [],
            selectedHebrew: null,
            totalPairs: 0,
            gameStarted: false,
            hebrewItems: [],
            meaningItems: []
        },
        writing: {
            currentWord: null,
            correctAnswers: 0,
            totalQuestions: 0,
            answered: false,
            currentAttempts: 0
        }
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
            practiceStats: {
                multipleChoice: { correct: 0, total: 0 },
                matching: { gamesPlayed: 0, gamesCompleted: 0 },
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
    
    // Actualizar racha
    if (appState.stats.lastStudyDate !== today) {
        const yesterday = new Date(Date.now() - 86400000).toDateString();
        if (appState.stats.lastStudyDate === yesterday) {
            appState.stats.streak++;
        } else if (appState.stats.lastStudyDate) {
            appState.stats.streak = 1;
        }
        appState.stats.lastStudyDate = today;
    }
    
    // Actualizar elementos del DOM
    const streakEl = document.getElementById('streakCount');
    const sessionsEl = document.getElementById('totalStudySessions');
    const timeEl = document.getElementById('totalStudyTime');
    const masteredEl = document.getElementById('wordsMastered');
    const streakCurrentEl = document.getElementById('currentStreak');
    
    if (streakEl) streakEl.textContent = appState.stats.streak;
    if (sessionsEl) sessionsEl.textContent = appState.stats.totalSessions;
    if (timeEl) timeEl.textContent = Math.floor(appState.stats.totalStudyTime / 60); // Convertir a minutos
    if (masteredEl) masteredEl.textContent = Object.keys(appState.stats.wordsMastered).length;
    if (streakCurrentEl) streakCurrentEl.textContent = appState.stats.streak;
    
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
                    appState.stats.masteryLevels.easy || 0,
                    appState.stats.masteryLevels.medium || 0,
                    appState.stats.masteryLevels.hard || 0
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
    // Navegación
    document.querySelectorAll('.nav-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
            const view = e.currentTarget.dataset.view;
            switchView(view);
        });
    });
    
    // Selector de semana en estudio
    const weekSelect = document.getElementById('weekSelect');
    if (weekSelect) {
        weekSelect.addEventListener('change', (e) => {
            appState.currentWeek = parseInt(e.target.value);
            appState.currentCardIndex = 0;
            updateFlashcard();
        });
    }
    
    // Selector de semana en práctica
    const practiceWeekSelect = document.getElementById('practiceWeekSelect');
    if (practiceWeekSelect) {
        practiceWeekSelect.addEventListener('change', (e) => {
            appState.currentWeek = parseInt(e.target.value);
            resetPracticeState();
            loadPracticeMode();
        });
    }
    
    // Controles de flashcard
    const flashcard = document.getElementById('flashcard');
    if (flashcard) {
        flashcard.addEventListener('click', (e) => {
            // Evitar que el clic en los botones active el flip
            if (!e.target.closest('.control-btn') && !e.target.closest('.mastery-btn')) {
                flashcard.classList.toggle('flipped');
            }
        });
    }
    
    const prevCard = document.getElementById('prevCard');
    if (prevCard) {
        prevCard.addEventListener('click', (e) => {
            e.stopPropagation();
            navigateCard('prev');
        });
    }
    
    const nextCard = document.getElementById('nextCard');
    if (nextCard) {
        nextCard.addEventListener('click', (e) => {
            e.stopPropagation();
            navigateCard('next');
        });
    }
    
    const flipCard = document.getElementById('flipCard');
    if (flipCard) {
        flipCard.addEventListener('click', (e) => {
            e.stopPropagation();
            document.getElementById('flashcard').classList.toggle('flipped');
        });
    }
    
    // Botones de dominio
    const markEasy = document.getElementById('markEasy');
    if (markEasy) {
        markEasy.addEventListener('click', (e) => {
            e.stopPropagation();
            markWord('easy');
        });
    }
    
    const markMedium = document.getElementById('markMedium');
    if (markMedium) {
        markMedium.addEventListener('click', (e) => {
            e.stopPropagation();
            markWord('medium');
        });
    }
    
    const markHard = document.getElementById('markHard');
    if (markHard) {
        markHard.addEventListener('click', (e) => {
            e.stopPropagation();
            markWord('hard');
        });
    }
    
    // Modos de práctica
    document.querySelectorAll('.mode-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
            document.querySelectorAll('.mode-btn').forEach(b => b.classList.remove('active'));
            e.currentTarget.classList.add('active');
            appState.currentPracticeMode = e.currentTarget.dataset.mode;
            resetPracticeState();
            loadPracticeMode();
        });
    });
    
    // Reset estadísticas
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
        multipleChoice: {
            currentWord: null,
            correctAnswers: 0,
            totalQuestions: 0,
            answered: false,
            options: []
        },
        matching: {
            selectedWords: [],
            matchedPairs: [],
            selectedHebrew: null,
            totalPairs: 0,
            gameStarted: false,
            hebrewItems: [],
            meaningItems: []
        },
        writing: {
            currentWord: null,
            correctAnswers: 0,
            totalQuestions: 0,
            answered: false,
            currentAttempts: 0
        }
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
        loadPracticeMode();
    } else if (view === 'stats') {
        updateStats();
    }
}

// Funciones de Flashcard
function updateFlashcard() {
    const weekWords = VOCABULARY[appState.currentWeek];
    if (!weekWords || weekWords.length === 0) return;
    
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
    if (!weekWords) return;
    
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
    appState.stats.masteryLevels[level] = (appState.stats.masteryLevels[level] || 0) + 1;
    
    const weekWords = VOCABULARY[appState.currentWeek];
    const masteredInWeek = weekWords.filter((w, i) => {
        const key = `${w.hebrew}_${appState.currentWeek}`;
        return appState.stats.wordsMastered[key];
    }).length;
    
    appState.stats.weekProgress[appState.currentWeek] = 
        (masteredInWeek / weekWords.length) * 100;
    
    saveStats();
    updateStats();
    
    const btn = document.querySelector(`.mastery-btn.${level}`);
    if (btn) {
        btn.classList.add('pulse');
        setTimeout(() => btn.classList.remove('pulse'), 500);
    }
    
    setTimeout(() => navigateCard('next'), 300);
}

// Funciones de Práctica
function loadPracticeMode() {
    const week = appState.currentWeek;
    const weekWords = VOCABULARY[week];
    const practiceArea = document.getElementById('practiceArea');
    
    if (!practiceArea || !weekWords) return;
    
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

// MODO 1: SELECCIÓN MÚLTIPLE
function loadMultipleChoice(words) {
    const practiceArea = document.getElementById('practiceArea');
    const mcState = appState.practiceState.multipleChoice;
    
    if (!practiceArea) return;
    
    // Seleccionar palabra aleatoria que no sea la actual (si es posible)
    let randomWord;
    do {
        randomWord = words[Math.floor(Math.random() * words.length)];
    } while (mcState.currentWord === randomWord && words.length > 1);
    
    mcState.currentWord = randomWord;
    mcState.totalQuestions++;
    mcState.answered = false;
    
    // Generar opciones
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
    mcState.options = options;
    
    practiceArea.innerHTML = `
        <div class="practice-header">
            <h3>📝 Selección Múltiple</h3>
            <div class="practice-score">
                <span class="score-badge">
                    <i class="fas fa-check-circle"></i> 
                    <span id="mcCorrect">${mcState.correctAnswers}</span>/<span id="mcTotal">${mcState.totalQuestions}</span>
                </span>
            </div>
        </div>
        
        <div class="multiple-choice-question">
            <div class="hebrew-word-large">${randomWord.hebrew}</div>
            <div class="transliteration-large">${randomWord.transliteration}</div>
            <p class="question-text">¿Cuál es el significado?</p>
        </div>
        
        <div class="options-grid" id="mcOptions">
            ${options.map(opt => `
                <button class="option-btn" data-meaning="${opt.meaning}" data-correct="${opt.meaning === randomWord.meaning}">
                    ${opt.meaning}
                </button>
            `).join('')}
        </div>
        
        <div class="practice-controls">
            <button id="mcNextBtn" class="next-question-btn" style="display: none;">
                Siguiente Pregunta <i class="fas fa-arrow-right"></i>
            </button>
        </div>
    `;
    
    // Event listeners para opciones
    document.querySelectorAll('#mcOptions .option-btn').forEach(btn => {
        btn.addEventListener('click', function() {
            if (mcState.answered) return;
            
            const isCorrect = this.dataset.correct === 'true';
            mcState.answered = true;
            
            // Deshabilitar todos los botones
            document.querySelectorAll('#mcOptions .option-btn').forEach(b => {
                b.disabled = true;
            });
            
            // Marcar correctas e incorrectas
            document.querySelectorAll('#mcOptions .option-btn').forEach(b => {
                if (b.dataset.correct === 'true') {
                    b.classList.add('correct');
                }
            });
            
            if (!isCorrect) {
                this.classList.add('incorrect');
            } else {
                mcState.correctAnswers++;
                appState.stats.practiceStats.multipleChoice.correct++;
            }
            
            appState.stats.practiceStats.multipleChoice.total++;
            appState.stats.totalSessions++;
            
            // Actualizar contador
            document.getElementById('mcCorrect').textContent = mcState.correctAnswers;
            document.getElementById('mcTotal').textContent = mcState.totalQuestions;
            
            // Mostrar botón siguiente
            document.getElementById('mcNextBtn').style.display = 'block';
            
            updateStats();
        });
    });
    
    // Botón siguiente pregunta
    const nextBtn = document.getElementById('mcNextBtn');
    if (nextBtn) {
        // Remover event listeners anteriores
        const newNextBtn = nextBtn.cloneNode(true);
        nextBtn.parentNode.replaceChild(newNextBtn, nextBtn);
        
        newNextBtn.addEventListener('click', () => {
            loadMultipleChoice(words);
        });
    }
}

// MODO 2: EMPAREJAR
function loadMatchingGame(words) {
    const practiceArea = document.getElementById('practiceArea');
    const matchState = appState.practiceState.matching;
    
    if (!practiceArea) return;
    
    // Seleccionar 6 palabras aleatorias
    const shuffledWords = shuffleArray([...words]);
    const selectedWords = shuffledWords.slice(0, Math.min(6, words.length));
    
    matchState.selectedWords = selectedWords;
    matchState.matchedPairs = [];
    matchState.selectedHebrew = null;
    matchState.totalPairs = selectedWords.length;
    matchState.gameStarted = true;
    
    const hebrewWords = shuffleArray([...selectedWords]);
    const meanings = shuffleArray([...selectedWords]);
    
    matchState.hebrewItems = hebrewWords;
    matchState.meaningItems = meanings;
    
    practiceArea.innerHTML = `
        <div class="practice-header">
            <h3>🔗 Juego de Emparejar</h3>
            <div class="matching-score">
                <span class="score-badge">
                    <i class="fas fa-link"></i>
                    <span id="matchCount">0</span>/<span id="matchTotal">${selectedWords.length}</span>
                </span>
            </div>
        </div>
        
        <div class="matching-game">
            <div class="matching-columns">
                <div class="matching-col" id="hebrewCol">
                    ${hebrewWords.map((word, index) => `
                        <div class="matching-item" 
                             data-id="heb-${index}" 
                             data-hebrew="${word.hebrew}" 
                             data-meaning="${word.meaning}"
                             data-paired="false">
                            ${word.hebrew}
                        </div>
                    `).join('')}
                </div>
                <div class="matching-col" id="meaningCol">
                    ${meanings.map((word, index) => `
                        <div class="matching-item" 
                             data-id="mean-${index}" 
                             data-meaning="${word.meaning}" 
                             data-hebrew="${word.hebrew}"
                             data-paired="false">
                            ${word.meaning}
                        </div>
                    `).join('')}
                </div>
            </div>
        </div>
        
        <div class="practice-controls">
            <button id="resetMatchBtn" class="reset-btn">
                <i class="fas fa-redo-alt"></i> Reiniciar
            </button>
            <button id="newMatchBtn" class="next-question-btn">
                Nuevo Juego <i class="fas fa-arrow-right"></i>
            </button>
        </div>
    `;
    
    // Función para actualizar contador
    function updateMatchCounter() {
        const matchedCount = matchState.matchedPairs.length;
        const matchCountEl = document.getElementById('matchCount');
        if (matchCountEl) {
            matchCountEl.textContent = matchedCount;
        }
        
        if (matchedCount === matchState.totalPairs && matchState.totalPairs > 0) {
            setTimeout(() => {
                const messageDiv = document.createElement('div');
                messageDiv.className = 'success-message';
                messageDiv.innerHTML = `
                    <i class="fas fa-trophy"></i>
                    <p>¡Felicidades! Has completado el juego.</p>
                `;
                practiceArea.appendChild(messageDiv);
                
                appState.stats.practiceStats.matching.gamesCompleted++;
                updateStats();
            }, 300);
        }
    }
    
    // Event listeners para columna hebrea
    document.querySelectorAll('#hebrewCol .matching-item').forEach(item => {
        item.addEventListener('click', function() {
            if (this.dataset.paired === 'true') return;
            
            // Remover selección anterior
            document.querySelectorAll('#hebrewCol .matching-item').forEach(i => {
                if (i.dataset.paired !== 'true') {
                    i.classList.remove('selected');
                }
            });
            
            this.classList.add('selected');
            matchState.selectedHebrew = this;
        });
    });
    
    // Event listeners para columna significados
    document.querySelectorAll('#meaningCol .matching-item').forEach(item => {
        item.addEventListener('click', function() {
            if (this.dataset.paired === 'true') return;
            
            const selectedHeb = matchState.selectedHebrew;
            
            if (selectedHeb && selectedHeb.dataset.meaning === this.dataset.meaning) {
                // Verificar que no esté ya emparejado
                const pairId = `${selectedHeb.dataset.hebrew}-${this.dataset.meaning}`;
                if (!matchState.matchedPairs.includes(pairId)) {
                    // Marcar como emparejados
                    selectedHeb.dataset.paired = 'true';
                    this.dataset.paired = 'true';
                    
                    selectedHeb.classList.remove('selected');
                    selectedHeb.classList.add('matched');
                    this.classList.add('matched');
                    
                    matchState.matchedPairs.push(pairId);
                    updateMatchCounter();
                }
                
                matchState.selectedHebrew = null;
            } else if (selectedHeb) {
                // Error
                this.classList.add('incorrect');
                setTimeout(() => this.classList.remove('incorrect'), 500);
                
                selectedHeb.classList.remove('selected');
                matchState.selectedHebrew = null;
            }
        });
    });
    
    // Botón reiniciar
    const resetBtn = document.getElementById('resetMatchBtn');
    if (resetBtn) {
        const newResetBtn = resetBtn.cloneNode(true);
        resetBtn.parentNode.replaceChild(newResetBtn, resetBtn);
        
        newResetBtn.addEventListener('click', () => {
            loadMatchingGame(words);
        });
    }
    
    // Botón nuevo juego
    const newBtn = document.getElementById('newMatchBtn');
    if (newBtn) {
        const newNewBtn = newBtn.cloneNode(true);
        newBtn.parentNode.replaceChild(newNewBtn, newBtn);
        
        newNewBtn.addEventListener('click', () => {
            appState.stats.practiceStats.matching.gamesPlayed++;
            loadMatchingGame(words);
        });
    }
}

// MODO 3: ESCRITURA
function loadWritingPractice(words) {
    const practiceArea = document.getElementById('practiceArea');
    const writeState = appState.practiceState.writing;
    
    if (!practiceArea) return;
    
    // Seleccionar palabra aleatoria que no sea la actual (si es posible)
    let randomWord;
    do {
        randomWord = words[Math.floor(Math.random() * words.length)];
    } while (writeState.currentWord === randomWord && words.length > 1);
    
    writeState.currentWord = randomWord;
    writeState.totalQuestions++;
    writeState.answered = false;
    writeState.currentAttempts = 0;
    
    practiceArea.innerHTML = `
        <div class="practice-header">
            <h3>✍️ Práctica de Escritura</h3>
            <div class="practice-score">
                <span class="score-badge">
                    <i class="fas fa-pencil-alt"></i>
                    <span id="writeCorrect">${writeState.correctAnswers}</span>/<span id="writeTotal">${writeState.totalQuestions}</span>
                </span>
            </div>
        </div>
        
        <div class="writing-practice">
            <div class="writing-question">
                <div class="hebrew-word-large">${randomWord.hebrew}</div>
                <div class="transliteration-large">${randomWord.transliteration}</div>
                <p class="question-text">Escribe el significado:</p>
            </div>
            
            <div class="input-container">
                <input type="text" id="writingInput" class="writing-input" 
                       placeholder="Ej: hombre, humanidad, Adán" 
                       autocomplete="off">
                <button id="checkWriting" class="check-btn">
                    <i class="fas fa-check"></i> Comprobar
                </button>
            </div>
            
            <div id="writingFeedback" class="writing-feedback"></div>
            
            <div class="practice-controls">
                <button id="nextWritingBtn" class="next-question-btn" style="display: none;">
                    Siguiente Palabra <i class="fas fa-arrow-right"></i>
                </button>
            </div>
        </div>
    `;
    
    // Botón comprobar
    const checkBtn = document.getElementById('checkWriting');
    if (checkBtn) {
        checkBtn.addEventListener('click', function checkHandler() {
            if (writeState.answered) return;
            
            const input = document.getElementById('writingInput').value.toLowerCase().trim();
            const feedback = document.getElementById('writingFeedback');
            const correctMeanings = randomWord.meaning.toLowerCase().split(',').map(m => m.trim());
            
            writeState.answered = true;
            
            // Validar respuesta
            let isCorrect = false;
            
            for (const correctMeaning of correctMeanings) {
                const correctWords = correctMeaning.split(/[\s,]+/).filter(w => w.length > 0);
                const inputWords = input.split(/[\s,]+/).filter(w => w.length > 0);
                
                if (inputWords.length === 0) continue;
                
                let allWordsMatch = true;
                
                for (const inputWord of inputWords) {
                    if (inputWord.length < 3) continue;
                    
                    let wordMatch = false;
                    for (const correctWord of correctWords) {
                        const normalizedInput = removeAccents(inputWord);
                        const normalizedCorrect = removeAccents(correctWord);
                        
                        if (normalizedInput === normalizedCorrect) {
                            wordMatch = true;
                            break;
                        }
                    }
                    
                    if (!wordMatch) {
                        allWordsMatch = false;
                        break;
                    }
                }
                
                if (allWordsMatch && inputWords.length > 0) {
                    isCorrect = true;
                    break;
                }
            }
            
            if (isCorrect) {
                feedback.textContent = '¡Correcto! Muy bien.';
                feedback.className = 'writing-feedback correct';
                writeState.correctAnswers++;
                appState.stats.practiceStats.writing.correct++;
            } else {
                feedback.textContent = `❌ Incorrecto. Significado: ${randomWord.meaning}`;
                feedback.className = 'writing-feedback incorrect';
            }
            
            appState.stats.practiceStats.writing.total++;
            appState.stats.totalSessions++;
            
            // Actualizar contadores
            document.getElementById('writeCorrect').textContent = writeState.correctAnswers;
            document.getElementById('writeTotal').textContent = writeState.totalQuestions;
            
            // Ocultar botón comprobar y mostrar siguiente
            checkBtn.style.display = 'none';
            document.getElementById('nextWritingBtn').style.display = 'block';
            document.getElementById('writingInput').disabled = true;
            
            updateStats();
        });
    }
    
    // Botón siguiente palabra
    const nextBtn = document.getElementById('nextWritingBtn');
    if (nextBtn) {
        nextBtn.addEventListener('click', () => {
            loadWritingPractice(words);
        });
    }
    
    // Enter para comprobar
    const input = document.getElementById('writingInput');
    if (input) {
        input.addEventListener('keypress', (e) => {
            if (e.key === 'Enter' && !writeState.answered) {
                document.getElementById('checkWriting')?.click();
            }
        });
    }
}

// Utilidades
function removeAccents(str) {
    return str.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
}

function shuffleArray(array) {
    const newArray = [...array];
    for (let i = newArray.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
    }
    return newArray;
}

// Función para añadir nuevas semanas
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