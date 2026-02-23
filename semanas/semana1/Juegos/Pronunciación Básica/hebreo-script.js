// Datos para todos los niveles
const levelData = {
    1: {
        name: "Alfabeto",
        screens: 3,
        itemsPerScreen: 5,
        data: [
            // Pantalla 1
            [
                { hebrew: "א", translit: "Alef" },
                { hebrew: "ב", translit: "Bet" },
                { hebrew: "ג", translit: "Gimel" },
                { hebrew: "ד", translit: "Dalet" },
                { hebrew: "ה", translit: "He" }
            ],
            // Pantalla 2
            [
                { hebrew: "ו", translit: "Vav" },
                { hebrew: "ז", translit: "Zayin" },
                { hebrew: "ח", translit: "Het" },
                { hebrew: "ט", translit: "Tet" },
                { hebrew: "י", translit: "Yod" }
            ],
            // Pantalla 3
            [
                { hebrew: "כ", translit: "Kaf" },
                { hebrew: "ל", translit: "Lamed" },
                { hebrew: "מ", translit: "Mem" },
                { hebrew: "נ", translit: "Nun" },
                { hebrew: "ס", translit: "Samekh" }
            ]
        ]
    },
    2: {
        name: "Vocales",
        screens: 3,
        itemsPerScreen: 5,
        data: [
            // Pantalla 1
            [
                { hebrew: "בָ", translit: "Ba (Qamats)", vowel: true },
                { hebrew: "בֵ", translit: "Be (Tzere)", vowel: true },
                { hebrew: "בִ", translit: "Bi (Hiriq)", vowel: true },
                { hebrew: "בֹ", translit: "Bo (Holam)", vowel: true },
                { hebrew: "בֻ", translit: "Bu (Qubuts)", vowel: true }
            ],
            // Pantalla 2
            [
                { hebrew: "בַ", translit: "Ba (Patah)", vowel: true },
                { hebrew: "בֶ", translit: "Be (Segol)", vowel: true },
                { hebrew: "בְ", translit: "Bə (Sheva)", vowel: true },
                { hebrew: "בֲ", translit: "Ba (Hataf Patah)", vowel: true },
                { hebrew: "בֱ", translit: "Be (Hataf Segol)", vowel: true }
            ],
            // Pantalla 3
            [
                { hebrew: "בָּ", translit: "Ba (Dagesh + Qamats)", vowel: true },
                { hebrew: "בֶּ", translit: "Be (Dagesh + Segol)", vowel: true },
                { hebrew: "בִּ", translit: "Bi (Dagesh + Hiriq)", vowel: true },
                { hebrew: "בֹּ", translit: "Bo (Dagesh + Holam)", vowel: true },
                { hebrew: "בַּ", translit: "Ba (Dagesh + Patah)", vowel: true }
            ]
        ]
    },
    3: {
        name: "Palabras Básicas",
        screens: 4,
        itemsPerScreen: 5,
        data: [
            // Pantalla 1
            [
                { hebrew: "אֱלֹהִים", translit: "Elohim", meaning: "Dios" },
                { hebrew: "אָדָם", translit: "Adam", meaning: "Hombre, humanidad" },
                { hebrew: "אֶרֶץ", translit: "Eretz", meaning: "Tierra" },
                { hebrew: "שָׁמַיִם", translit: "Shamayim", meaning: "Cielos" },
                { hebrew: "אוֹר", translit: "Or", meaning: "Luz" }
            ],
            // Pantalla 2
            [
                { hebrew: "מַיִם", translit: "Mayim", meaning: "Agua" },
                { hebrew: "רוּחַ", translit: "Ruach", meaning: "Espíritu, viento" },
                { hebrew: "חַיִּים", translit: "Chayim", meaning: "Vida" },
                { hebrew: "סֵפֶר", translit: "Sefer", meaning: "Libro" },
                { hebrew: "דָּבָר", translit: "Dabar", meaning: "Palabra, cosa" }
            ],
            // Pantalla 3
            [
                { hebrew: "בַּיִת", translit: "Bayit", meaning: "Casa, hogar" },
                { hebrew: "עִיר", translit: "Ir", meaning: "Ciudad" },
                { hebrew: "דֶּרֶךְ", translit: "Derech", meaning: "Camino" },
                { hebrew: "יוֹם", translit: "Yom", meaning: "Día" },
                { hebrew: "לַיְלָה", translit: "Laylah", meaning: "Noche" }
            ],
            // Pantalla 4
            [
                { hebrew: "אָב", translit: "Av", meaning: "Padre" },
                { hebrew: "אֵם", translit: "Em", meaning: "Madre" },
                { hebrew: "בֵּן", translit: "Ben", meaning: "Hijo" },
                { hebrew: "בַּת", translit: "Bat", meaning: "Hija" },
                { hebrew: "מֶלֶךְ", translit: "Melech", meaning: "Rey" }
            ]
        ]
    },
    4: {
        name: "Práctica Auditiva",
        screens: 4,
        itemsPerScreen: 5,
        data: [
            // Pantalla 1
            [
                { hebrew: "שָׁלוֹם", translit: "Shalom", meaning: "Paz", audio: "shalom" },
                { hebrew: "אַהֲבָה", translit: "Ahavah", meaning: "Amor", audio: "ahavah" },
                { hebrew: "תּוֹרָה", translit: "Torah", meaning: "Instrucción, Ley", audio: "torah" },
                { hebrew: "חֶסֶד", translit: "Chesed", meaning: "Misericordia", audio: "chesed" },
                { hebrew: "נֶפֶשׁ", translit: "Nefesh", meaning: "Alma", audio: "nefesh" }
            ],
            // Pantalla 2
            [
                { hebrew: "צֶדֶק", translit: "Tzedek", meaning: "Justicia", audio: "tzedek" },
                { hebrew: "אֱמֶת", translit: "Emet", meaning: "Verdad", audio: "emet" },
                { hebrew: "חָכְמָה", translit: "Chokhmah", meaning: "Sabiduría", audio: "chokhmah" },
                { hebrew: "כָּבוֹד", translit: "Kavod", meaning: "Gloria", audio: "kavod" },
                { hebrew: "בְּרָכָה", translit: "Berakhah", meaning: "Bendición", audio: "berakhah" }
            ],
            // Pantalla 3
            [
                { hebrew: "תְּפִלָּה", translit: "Tefillah", meaning: "Oración", audio: "tefillah" },
                { hebrew: "תְּשׁוּבָה", translit: "Teshuvah", meaning: "Arrepentimiento", audio: "teshuvah" },
                { hebrew: "גְּאוּלָה", translit: "Geulah", meaning: "Redención", audio: "geulah" },
                { hebrew: "יְשׁוּעָה", translit: "Yeshuah", meaning: "Salvación", audio: "yeshuah" },
                { hebrew: "קְדוּשָׁה", translit: "Kedushah", meaning: "Santidad", audio: "kedushah" }
            ],
            // Pantalla 4
            [
                { hebrew: "רַחֲמִים", translit: "Rachamim", meaning: "Compasión", audio: "rachamim" },
                { hebrew: "אֱמוּנָה", translit: "Emunah", meaning: "Fe", audio: "emunah" },
                { hebrew: "תִּקְוָה", translit: "Tikvah", meaning: "Esperanza", audio: "tikvah" },
                { hebrew: "שִׂמְחָה", translit: "Simchah", meaning: "Alegría", audio: "simchah" },
                { hebrew: "שַׁבָּת", translit: "Shabbat", meaning: "Sábado, descanso", audio: "shabbat" }
            ]
        ]
    }
};

// URLs de audio
const audioUrls = {
    "shalom": "https://translate.google.com/translate_tts?ie=UTF-8&tl=iw&client=tw-ob&q=שלום",
    "ahavah": "https://translate.google.com/translate_tts?ie=UTF-8&tl=iw&client=tw-ob&q=אהבה",
    "torah": "https://translate.google.com/translate_tts?ie=UTF-8&tl=iw&client=tw-ob&q=תורה",
    "chesed": "https://translate.google.com/translate_tts?ie=UTF-8&tl=iw&client=tw-ob&q=חסד",
    "nefesh": "https://translate.google.com/translate_tts?ie=UTF-8&tl=iw&client=tw-ob&q=נפש",
    "tzedek": "https://translate.google.com/translate_tts?ie=UTF-8&tl=iw&client=tw-ob&q=צדק",
    "emet": "https://translate.google.com/translate_tts?ie=UTF-8&tl=iw&client=tw-ob&q=אמת",
    "chokhmah": "https://translate.google.com/translate_tts?ie=UTF-8&tl=iw&client=tw-ob&q=חכמה",
    "kavod": "https://translate.google.com/translate_tts?ie=UTF-8&tl=iw&client=tw-ob&q=כבוד",
    "berakhah": "https://translate.google.com/translate_tts?ie=UTF-8&tl=iw&client=tw-ob&q=ברכה",
    "tefillah": "https://translate.google.com/translate_tts?ie=UTF-8&tl=iw&client=tw-ob&q=תפילה",
    "teshuvah": "https://translate.google.com/translate_tts?ie=UTF-8&tl=iw&client=tw-ob&q=תשובה",
    "geulah": "https://translate.google.com/translate_tts?ie=UTF-8&tl=iw&client=tw-ob&q=גאולה",
    "yeshuah": "https://translate.google.com/translate_tts?ie=UTF-8&tl=iw&client=tw-ob&q=ישועה",
    "kedushah": "https://translate.google.com/translate_tts?ie=UTF-8&tl=iw&client=tw-ob&q=קדושה",
    "rachamim": "https://translate.google.com/translate_tts?ie=UTF-8&tl=iw&client=tw-ob&q=רחמים",
    "emunah": "https://translate.google.com/translate_tts?ie=UTF-8&tl=iw&client=tw-ob&q=אמונה",
    "tikvah": "https://translate.google.com/translate_tts?ie=UTF-8&tl=iw&client=tw-ob&q=תקווה",
    "simchah": "https://translate.google.com/translate_tts?ie=UTF-8&tl=iw&client=tw-ob&q=שמחה",
    "shabbat": "https://translate.google.com/translate_tts?ie=UTF-8&tl=iw&client=tw-ob&q=שבת"
};

// Estado de la aplicación
const appState = {
    currentLevel: 1,
    currentScreen: 1,
    selectedItems: {
        columnA: { element: null, id: null },
        columnB: { element: null, id: null }
    },
    audioPlayer: null,
    isCheckingMatch: false,
    completedPairs: {} // Para rastrear pares completados por pantalla
};

// Inicialización
document.addEventListener('DOMContentLoaded', function() {
    appState.audioPlayer = document.getElementById('audio-player');
    initializeCompletedPairs();
    setupLevelNavigation();
    loadAllScreens();
    setupScreenNavigation();
    initializeScreen(1, 1);
});

// Inicializar estructura de pares completados
function initializeCompletedPairs() {
    for (const level in levelData) {
        appState.completedPairs[level] = {};
        for (let i = 1; i <= levelData[level].screens; i++) {
            appState.completedPairs[level][i] = new Set();
        }
    }
}

// Mezclar array
function shuffleArray(array) {
    const shuffled = [...array];
    for (let i = shuffled.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    return shuffled;
}

// Cargar pantallas
function loadAllScreens() {
    for (const level in levelData) {
        const levelInfo = levelData[level];
        
        for (let screenNum = 1; screenNum <= levelInfo.screens; screenNum++) {
            const screenId = `screen-${level}-${screenNum}`;
            const screenElement = document.getElementById(screenId);
            
            if (screenElement) {
                const screenData = levelInfo.data[screenNum - 1];
                
                // Columna A (orden original)
                const columnA = screenElement.querySelector(`#column-a-${level}-${screenNum}`);
                if (columnA) {
                    columnA.innerHTML = '';
                    screenData.forEach(item => {
                        const matchItem = createMatchItem(item, 'A', level);
                        columnA.appendChild(matchItem);
                    });
                }
                
                // Columna B (mezclada)
                const columnB = screenElement.querySelector(`#column-b-${level}-${screenNum}`);
                if (columnB) {
                    columnB.innerHTML = '';
                    
                    if (level == 4) {
                        // Nivel 4: audio (mezclado)
                        const shuffledData = shuffleArray([...screenData]);
                        shuffledData.forEach(item => {
                            const audioItem = createAudioItem(item);
                            columnB.appendChild(audioItem);
                        });
                    } else {
                        // Otros niveles: items mezclados
                        const shuffledData = shuffleArray([...screenData]);
                        shuffledData.forEach(item => {
                            const matchItem = createMatchItem(item, 'B', level);
                            columnB.appendChild(matchItem);
                        });
                    }
                }
                
                updateProgress(screenElement, false);
            }
        }
    }
}

// Crear elemento de coincidencia
function createMatchItem(item, column, level) {
    const div = document.createElement('div');
    div.className = 'match-item';
    div.setAttribute('data-id', item.hebrew);
    
    if (column === 'A') {
        if (level == 1) {
            div.innerHTML = `<span class="hebrew-text">${item.hebrew}</span>`;
        } else if (level == 2) {
            div.innerHTML = `<span class="vowel-text">${item.hebrew}</span>`;
        } else {
            div.innerHTML = `<span class="hebrew-text">${item.hebrew}</span>`;
        }
    } else {
        if (level == 1 || level == 2) {
            div.textContent = item.translit;
        } else if (level == 3) {
            div.innerHTML = `
                <div class="transliteration">${item.translit}</div>
                <div class="meaning">${item.meaning}</div>
            `;
        }
    }
    
    div.addEventListener('click', function() {
        if (appState.isCheckingMatch) return;
        handleItemClick(this, column, level);
    });
    
    return div;
}

// Crear elemento de audio
function createAudioItem(item) {
    const div = document.createElement('div');
    div.className = 'audio-item';
    div.setAttribute('data-id', item.hebrew);
    div.setAttribute('data-audio', item.audio || item.translit.toLowerCase());
    
    div.innerHTML = `
        <button class="audio-btn">
            <i class="fas fa-volume-up"></i>
        </button>
    `;
    
    const audioBtn = div.querySelector('.audio-btn');
    audioBtn.addEventListener('click', function(e) {
        e.stopPropagation();
        if (appState.isCheckingMatch) return;
        handleAudioClick(this, item, div);
    });
    
    div.addEventListener('click', function(e) {
        if (e.target.closest('.audio-btn')) return;
        if (appState.isCheckingMatch) return;
        handleAudioItemClick(this, item.hebrew);
    });
    
    return div;
}

// Manejar clic en item
function handleItemClick(element, column, level) {
    if (element.classList.contains('matched')) return;
    
    const screen = element.closest('.practice-screen');
    const feedback = screen.querySelector('.match-feedback');
    const columnKey = column === 'A' ? 'columnA' : 'columnB';
    
    // Deseleccionar si ya está seleccionado
    if (element.classList.contains('selected')) {
        element.classList.remove('selected');
        appState.selectedItems[columnKey] = { element: null, id: null };
        
        if (!appState.selectedItems.columnA.element && !appState.selectedItems.columnB.element) {
            feedback.textContent = "";
            feedback.className = "match-feedback";
        }
        return;
    }
    
    // Deseleccionar otros en la misma columna
    const allItemsInColumn = screen.querySelectorAll(`.match-item:not(.matched)`);
    allItemsInColumn.forEach(item => {
        const itemColumn = item.closest('.column');
        const elementColumn = element.closest('.column');
        
        if (itemColumn === elementColumn && item !== element && !item.classList.contains('matched')) {
            item.classList.remove('selected');
            item.classList.remove('incorrect');
        }
    });
    
    // Seleccionar nuevo elemento
    element.classList.add('selected');
    element.classList.remove('incorrect');
    
    appState.selectedItems[columnKey] = {
        element: element,
        id: element.getAttribute('data-id')
    };
    
    // Verificar si hay ambas selecciones
    if (appState.selectedItems.columnA.element && appState.selectedItems.columnB.element) {
        appState.isCheckingMatch = true;
        setTimeout(() => {
            checkMatch(screen, feedback, level);
            appState.isCheckingMatch = false;
        }, 100);
    } else {
        feedback.textContent = "";
        feedback.className = "match-feedback";
    }
}

// Manejar clic en audio
function handleAudioClick(button, item, audioItemElement) {
    handleAudioItemClick(audioItemElement, item.hebrew);
    
    if (!appState.audioPlayer) return;
    
    if (!appState.audioPlayer.paused) {
        appState.audioPlayer.pause();
        appState.audioPlayer.currentTime = 0;
        
        document.querySelectorAll('.audio-btn').forEach(btn => {
            btn.classList.remove('playing');
            btn.innerHTML = '<i class="fas fa-volume-up"></i>';
        });
    }
    
    button.classList.add('playing');
    button.innerHTML = '<i class="fas fa-pause"></i>';
    
    const audioUrl = audioUrls[item.audio] || 
        `https://translate.google.com/translate_tts?ie=UTF-8&tl=iw&client=tw-ob&q=${encodeURIComponent(item.hebrew)}`;
    
    appState.audioPlayer.src = audioUrl;
    
    appState.audioPlayer.play().catch(error => {
        console.log("Audio fallback:", item.translit);
        button.classList.remove('playing');
        button.innerHTML = '<i class="fas fa-volume-up"></i>';
        
        const screen = button.closest('.practice-screen');
        const feedback = screen.querySelector('.match-feedback');
        feedback.textContent = `Pronunciación: ${item.translit}`;
        feedback.className = "match-feedback correct";
        
        setTimeout(() => {
            if (feedback.textContent === `Pronunciación: ${item.translit}`) {
                feedback.textContent = "";
                feedback.className = "match-feedback";
            }
        }, 3000);
    });
    
    appState.audioPlayer.onended = function() {
        button.classList.remove('playing');
        button.innerHTML = '<i class="fas fa-volume-up"></i>';
    };
    
    appState.audioPlayer.onerror = function() {
        button.classList.remove('playing');
        button.innerHTML = '<i class="fas fa-volume-up"></i>';
        
        const screen = button.closest('.practice-screen');
        const feedback = screen.querySelector('.match-feedback');
        feedback.textContent = `Pronunciación: ${item.translit}`;
        feedback.className = "match-feedback correct";
        
        setTimeout(() => {
            if (feedback.textContent === `Pronunciación: ${item.translit}`) {
                feedback.textContent = "";
                feedback.className = "match-feedback";
            }
        }, 3000);
    };
}

// Manejar clic en item de audio
function handleAudioItemClick(element, hebrewWord) {
    const screen = element.closest('.practice-screen');
    const feedback = screen.querySelector('.match-feedback');
    
    if (element.classList.contains('selected')) {
        element.classList.remove('selected');
        appState.selectedItems.columnB = { element: null, id: null };
        
        if (!appState.selectedItems.columnA.element) {
            feedback.textContent = "";
            feedback.className = "match-feedback";
        }
        return;
    }
    
    screen.querySelectorAll('.audio-item.selected').forEach(item => {
        if (item !== element) {
            item.classList.remove('selected');
        }
    });
    
    element.classList.add('selected');
    appState.selectedItems.columnB = {
        element: element,
        id: hebrewWord
    };
    
    if (appState.selectedItems.columnA.element) {
        appState.isCheckingMatch = true;
        setTimeout(() => {
            checkMatch(screen, feedback, 4);
            appState.isCheckingMatch = false;
        }, 100);
    } else {
        feedback.textContent = "¡Audio seleccionado! Ahora elige la palabra hebrea.";
        feedback.className = "match-feedback correct";
        
        setTimeout(() => {
            if (feedback.textContent === "¡Audio seleccionado! Ahora elige la palabra hebrea.") {
                feedback.textContent = "";
                feedback.className = "match-feedback";
            }
        }, 2000);
    }
}

// Verificar coincidencia
function checkMatch(screen, feedback, level) {
    const { columnA, columnB } = appState.selectedItems;
    
    if (columnA.element && columnB.element) {
        if (columnA.id === columnB.id) {
            // CORRECTO
            feedback.textContent = level === 4 
                ? "¡Correcto! Has identificado la palabra correctamente." 
                : "¡Correcto! Has emparejado correctamente.";
            feedback.className = "match-feedback correct";
            
            columnA.element.classList.remove('selected');
            columnA.element.classList.add('matched');
            columnA.element.classList.remove('incorrect');
            
            if (level !== 4) {
                columnB.element.classList.remove('selected');
                columnB.element.classList.add('matched');
                columnB.element.classList.remove('incorrect');
            } else {
                columnB.element.classList.remove('selected');
                columnB.element.classList.add('matched');
            }
            
            // GUARDAR PAR COMPLETADO
            const screenLevel = parseInt(screen.getAttribute('data-level'));
            const screenNum = parseInt(screen.getAttribute('data-screen'));
            if (!appState.completedPairs[screenLevel][screenNum]) {
                appState.completedPairs[screenLevel][screenNum] = new Set();
            }
            appState.completedPairs[screenLevel][screenNum].add(columnA.id);
            
            // Limpiar selecciones
            appState.selectedItems.columnA = { element: null, id: null };
            appState.selectedItems.columnB = { element: null, id: null };
            
            updateProgress(screen, true);
            checkScreenCompletion(screen);
            
        } else {
            // INCORRECTO
            feedback.textContent = "Incorrecto. Intenta de nuevo.";
            feedback.className = "match-feedback incorrect";
            
            columnA.element.classList.add('incorrect');
            if (level !== 4) {
                columnB.element.classList.add('incorrect');
            }
            
            setTimeout(() => {
                columnA.element.classList.remove('selected');
                columnA.element.classList.remove('incorrect');
                
                if (level !== 4) {
                    columnB.element.classList.remove('selected');
                    columnB.element.classList.remove('incorrect');
                } else {
                    columnB.element.classList.remove('selected');
                }
                
                feedback.textContent = "";
                feedback.className = "match-feedback";
                
                appState.selectedItems.columnA = { element: null, id: null };
                appState.selectedItems.columnB = { element: null, id: null };
            }, 1500);
        }
    }
}

// Verificar si la pantalla está completa
function checkScreenCompletion(screen) {
    const level = parseInt(screen.getAttribute('data-level'));
    const screenNum = parseInt(screen.getAttribute('data-screen'));
    const totalItems = levelData[level].itemsPerScreen;
    
    const completedCount = appState.completedPairs[level][screenNum] ? 
        appState.completedPairs[level][screenNum].size : 0;
    
    console.log(`Pantalla ${level}-${screenNum}: ${completedCount}/${totalItems} completados`);
    
    if (completedCount >= totalItems) {
        console.log(`¡Pantalla ${level}-${screenNum} COMPLETADA!`);
        
        // Habilitar botón siguiente
        const nextBtn = screen.querySelector('.next-btn');
        if (nextBtn) {
            nextBtn.disabled = false;
            console.log("Botón siguiente habilitado");
        }
        
        // Mostrar mensaje
        setTimeout(() => {
            const feedback = screen.querySelector('.match-feedback');
            feedback.innerHTML = "¡Pantalla completada! Puedes pasar a la siguiente. <i class='fas fa-check-circle'></i>";
            feedback.className = "match-feedback correct";
        }, 500);
        
        // También actualizar la navegación en la pantalla actual
        updateScreenNavigation(level, screenNum);
    }
}

// Actualizar navegación de pantalla
function updateScreenNavigation(level, screenNum) {
    const screen = document.getElementById(`screen-${level}-${screenNum}`);
    if (!screen) return;
    
    const prevBtn = screen.querySelector('.prev-btn');
    const nextBtn = screen.querySelector('.next-btn');
    
    // Actualizar botón anterior
    if (prevBtn) {
        prevBtn.disabled = screenNum === 1;
    }
    
    // Actualizar botón siguiente
    if (nextBtn) {
        const completedCount = appState.completedPairs[level][screenNum] ? 
            appState.completedPairs[level][screenNum].size : 0;
        const totalItems = levelData[level].itemsPerScreen;
        const isComplete = completedCount >= totalItems;
        const totalScreens = levelData[level].screens;
        
        // Solo deshabilitar si no es la última pantalla y no está completa
        nextBtn.disabled = !isComplete && screenNum < totalScreens;
    }
}

// Actualizar progreso
function updateProgress(screen, fromCheck = false) {
    const level = parseInt(screen.getAttribute('data-level'));
    const screenNum = parseInt(screen.getAttribute('data-screen'));
    const totalItems = levelData[level].itemsPerScreen;
    
    let completedCount = 0;
    if (appState.completedPairs[level] && appState.completedPairs[level][screenNum]) {
        completedCount = appState.completedPairs[level][screenNum].size;
    }
    
    // Actualizar texto
    const progressText = screen.querySelector('.current-progress');
    if (progressText) {
        progressText.textContent = `${completedCount}/${totalItems}`;
    }
    
    // Actualizar barra
    const progressFill = screen.querySelector('.progress-fill');
    if (progressFill) {
        const progressPercent = (completedCount / totalItems) * 100;
        progressFill.style.width = `${progressPercent}%`;
    }
    
    // Verificar si la pantalla está completa para habilitar siguiente
    if (fromCheck && completedCount >= totalItems) {
        const nextBtn = screen.querySelector('.next-btn');
        if (nextBtn) {
            nextBtn.disabled = false;
        }
        updateScreenNavigation(level, screenNum);
    }
}

// Configurar navegación de niveles
function setupLevelNavigation() {
    const levelButtons = document.querySelectorAll('.level-btn');
    
    levelButtons.forEach(button => {
        button.addEventListener('click', function() {
            const level = parseInt(this.getAttribute('data-level'));
            
            levelButtons.forEach(btn => btn.classList.remove('active'));
            this.classList.add('active');
            
            switchLevel(level);
        });
    });
}

// Cambiar nivel
function switchLevel(level) {
    document.querySelectorAll('.practice-screen').forEach(screen => {
        screen.classList.remove('active');
    });
    
    appState.currentLevel = level;
    appState.currentScreen = 1;
    appState.selectedItems = {
        columnA: { element: null, id: null },
        columnB: { element: null, id: null }
    };
    appState.isCheckingMatch = false;
    
    const firstScreen = document.getElementById(`screen-${level}-1`);
    if (firstScreen) {
        firstScreen.classList.add('active');
        initializeScreen(level, 1);
    }
}

// Inicializar pantalla
function initializeScreen(level, screenNum) {
    const screen = document.getElementById(`screen-${level}-${screenNum}`);
    if (!screen) return;
    
    screen.setAttribute('data-level', level);
    screen.setAttribute('data-screen', screenNum);
    
    // Actualizar título
    const title = screen.querySelector('h2');
    if (title && levelData[level]) {
        const levelName = levelData[level].name;
        const totalScreens = levelData[level].screens;
        title.innerHTML = `<i class="fas fa-${getLevelIcon(level)}"></i> Nivel ${level}: ${levelName} - Pantalla ${screenNum} de ${totalScreens}`;
    }
    
    updateProgress(screen, false);
    
    // Configurar botones de navegación
    const prevBtn = screen.querySelector('.prev-btn');
    const nextBtn = screen.querySelector('.next-btn');
    
    if (prevBtn) {
        prevBtn.disabled = screenNum === 1;
        prevBtn.onclick = function(e) {
            e.preventDefault();
            if (!this.disabled) navigateToPrevScreen();
        };
    }
    
    if (nextBtn) {
        // Verificar si la pantalla está completa
        const completedCount = appState.completedPairs[level] && appState.completedPairs[level][screenNum] ?
            appState.completedPairs[level][screenNum].size : 0;
        const totalItems = levelData[level].itemsPerScreen;
        const isComplete = completedCount >= totalItems;
        const totalScreens = levelData[level].screens;
        
        console.log(`Inicializando pantalla ${level}-${screenNum}: ${completedCount}/${totalItems}, completa: ${isComplete}`);
        
        // Solo deshabilitar si no es la última pantalla y no está completa
        nextBtn.disabled = !isComplete && screenNum < totalScreens;
        
        nextBtn.onclick = function(e) {
            e.preventDefault();
            if (!this.disabled) navigateToNextScreen();
        };
    }
    
    // Limpiar feedback
    const feedback = screen.querySelector('.match-feedback');
    if (feedback) {
        feedback.textContent = "";
        feedback.className = "match-feedback";
    }
}

// Obtener icono
function getLevelIcon(level) {
    switch(level) {
        case 1: return 'font';
        case 2: return 'volume-up';
        case 3: return 'book';
        case 4: return 'headphones';
        default: return 'circle';
    }
}

// Configurar navegación
function setupScreenNavigation() {
    document.addEventListener('click', function(e) {
        const nextBtn = e.target.closest('.next-btn');
        const prevBtn = e.target.closest('.prev-btn');
        
        if (nextBtn && !nextBtn.disabled) {
            e.preventDefault();
            navigateToNextScreen();
        }
        
        if (prevBtn && !prevBtn.disabled) {
            e.preventDefault();
            navigateToPrevScreen();
        }
    });
}

// Navegar siguiente
function navigateToNextScreen() {
    console.log("Navegando a siguiente pantalla...");
    const currentLevel = appState.currentLevel;
    const currentScreen = appState.currentScreen;
    const totalScreens = levelData[currentLevel].screens;
    
    console.log(`Actual: Nivel ${currentLevel}, Pantalla ${currentScreen} de ${totalScreens}`);
    
    if (currentScreen < totalScreens) {
        const currentScreenElement = document.querySelector('.practice-screen.active');
        if (currentScreenElement) {
            currentScreenElement.classList.remove('active');
        }
        
        const nextScreenNum = currentScreen + 1;
        const nextScreenElement = document.getElementById(`screen-${currentLevel}-${nextScreenNum}`);
        if (nextScreenElement) {
            nextScreenElement.classList.add('active');
            appState.currentScreen = nextScreenNum;
            initializeScreen(currentLevel, nextScreenNum);
            console.log(`Cambiando a pantalla ${currentLevel}-${nextScreenNum}`);
        } else {
            console.error(`No se encontró la pantalla ${currentLevel}-${nextScreenNum}`);
        }
    } else {
        console.log("Última pantalla de este nivel. Cambiando al siguiente nivel o volviendo al inicio.");
        if (currentLevel < 4) {
            switchLevel(currentLevel + 1);
        } else {
            switchLevel(1);
        }
    }
}

// Navegar anterior
function navigateToPrevScreen() {
    const currentLevel = appState.currentLevel;
    const currentScreen = appState.currentScreen;
    
    if (currentScreen > 1) {
        const currentScreenElement = document.querySelector('.practice-screen.active');
        if (currentScreenElement) {
            currentScreenElement.classList.remove('active');
        }
        
        const prevScreenNum = currentScreen - 1;
        const prevScreenElement = document.getElementById(`screen-${currentLevel}-${prevScreenNum}`);
        if (prevScreenElement) {
            prevScreenElement.classList.add('active');
            appState.currentScreen = prevScreenNum;
            initializeScreen(currentLevel, prevScreenNum);
        }
    }
}