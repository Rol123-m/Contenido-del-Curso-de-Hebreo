// semana.js - CURSO DE HEBREO BÍBLICO

class SemanaManager {
    constructor() {
        this.semanaActual = this.obtenerNumeroSemana();
        this.usuario = JSON.parse(localStorage.getItem('usuarioActual') || '{}');
        this.contenidoSemanas = this.obtenerContenidoSemanas();
        this.inicializar();
    }

    obtenerNumeroSemana() {
        const params = new URLSearchParams(window.location.search);
        return parseInt(params.get('semana')) || 1;
    }

    obtenerContenidoSemanas() {
        // PLANTILLA ESCALABLE - Modifica aquí el contenido de cada semana
        return {
            // SEMANA 1 - Alefato Hebreo
            1: {
                titulo: "Alefato Hebreo",
                tema: "Introducción al alfabeto, pronunciación y escritura",
                recursos: [
                    { tipo: 'pdf', titulo: 'PDF Contenido semana 1', url: 'https://drive.google.com/file/d/1-OtpJNCwYxjI1V3LqtWPWiEwxWv5HaTw/view?usp=sharing', icono: '📄' },
                    { tipo: 'html', titulo: 'Curiosidad Exegética', url: 'semanas/semana1/html/1. curiosidad exegética.html', icono: 'א' },
                    { tipo: 'html', titulo: 'introducción al Alfabeto Hebreo', url: 'semanas/semana1/html/2. introduction.html', icono: 'ב' },
                    { tipo: 'html', titulo: 'Alfabeto hebreo.', url: 'semanas/semana1/html/3. alfabeto-hebreo.html', icono: '✍️' },
                    { tipo: 'html', titulo: 'Pronunciación', url: 'semanas/semana1/html/4. pronunciación.html', icono: '📖' },
                    { tipo: 'html', titulo: 'Resumen de la Semana', url: 'semanas/semana1/html/5. resumen.html', icono: '📖' },
                     { tipo: 'examen', titulo: 'Examen Semana 1 - Alefato', url: 'https://forms.gle/XQWKHwwnr6RzFvDdA', icono: '📝' }
                ],
                juegos: [
                    { titulo: 'Practica de Alfabeto', url: 'semanas/semana1/Juegos/juego.html', icono: '🎴', nota: 'Solo para los que completaron el contenido previo' },
                    { titulo: 'Ejercicios', url: 'semanas/semana1/Juegos/ejercicios-practicos.html', icono: '🔄', nota: 'Relaciona la letra con su nombre' },
                    { titulo: 'Escribe en hebreo', url: 'semanas/semana1/Juegos/simulador.html', icono: '✏️', nota: 'Practica la escritura' }
                ]
            },
            
            // SEMANA 2 - Las Vocales
            2: {
                titulo: "Las Vocales",
                tema: "Sistema vocálico tiberiano",
                recursos: [
                    { tipo: 'pdf', titulo: 'PDF Contenido semana 2', url: '#', icono: '📄' },
                    { tipo: 'html', titulo: 'Introducción a las vocales', url: '#', icono: 'אָ' },
                    { tipo: 'html', titulo: 'Vocales largas y breves', url: '#', icono: 'אַ' },
                    { tipo: 'html', titulo: 'Shevá y vocales reducidas', url: '#', icono: 'אְ' },
                    { tipo: 'html', titulo: 'Práctica de lectura', url: '#', icono: '🔊' }
                ],
                juegos: [
                    { titulo: 'Identifica las vocales', url: '#', icono: '🎯', nota: 'Reconoce cada signo vocálico' },
                    { titulo: 'Lectura guiada', url: '#', icono: '📢', nota: 'Practica la pronunciación' }
                ]
            },
            
            // SEMANA 3 - Sustantivos
            3: {
                titulo: "Sustantivos",
                tema: "Género y número",
                recursos: [
                    { tipo: 'pdf', titulo: 'PDF Contenido semana 3', url: '#', icono: '📄' },
                    { tipo: 'html', titulo: 'Masculino y femenino', url: '#', icono: '♂️♀️' },
                    { tipo: 'html', titulo: 'Singular y plural', url: '#', icono: '1️⃣🔢' },
                    { tipo: 'html', titulo: 'Dual', url: '#', icono: '2️⃣' },
                    { tipo: 'html', titulo: 'Vocabulario semana 3', url: '#', icono: '📖' }
                ],
                juegos: [
                    { titulo: 'Género de sustantivos', url: '#', icono: '⚥', nota: 'Identifica el género' },
                    { titulo: 'Forma el plural', url: '#', icono: '➕', nota: 'Practica las formas plurales' }
                ]
            },
            
            // SEMANA 4 - El Artículo
            4: {
                titulo: "El Artículo Definido",
                tema: "Uso del artículo",
                recursos: [
                    { tipo: 'pdf', titulo: 'PDF Contenido semana 4', url: '#', icono: '📄' },
                    { tipo: 'html', titulo: 'Forma del artículo', url: '#', icono: 'הַ' },
                    { tipo: 'html', titulo: 'Asimilación', url: '#', icono: 'הַשָּׁמַיִם' },
                    { tipo: 'html', titulo: 'Vocabulario semana 4', url: '#', icono: '📖' }
                ],
                juegos: [
                    { titulo: 'Artículo definido', url: '#', icono: 'הַ', nota: 'Practica la forma correcta' }
                ]
            },
            
            // SEMANA 5 - Preposiciones
            5: {
                titulo: "Preposiciones",
                tema: "Preposiciones básicas e inseparables",
                recursos: [
                    { tipo: 'pdf', titulo: 'PDF Contenido semana 5', url: '#', icono: '📄' },
                    { tipo: 'html', titulo: 'Preposiciones ב, כ, ל', url: '#', icono: 'בְּ' },
                    { tipo: 'html', titulo: 'Preposiciones compuestas', url: '#', icono: 'מִן' },
                    { tipo: 'html', titulo: 'Vocabulario semana 5', url: '#', icono: '📖' }
                ],
                juegos: [
                    { titulo: 'Preposiciones básicas', url: '#', icono: '🔤', nota: 'Aprende las preposiciones' }
                ]
            },
            
            // SEMANA 6 - Adjetivos
            6: {
                titulo: "Adjetivos",
                tema: "Concordancia y uso",
                recursos: [
                    { tipo: 'pdf', titulo: 'PDF Contenido semana 6', url: '#', icono: '📄' },
                    { tipo: 'html', titulo: 'Forma de los adjetivos', url: '#', icono: 'טוֹב' },
                    { tipo: 'html', titulo: 'Adjetivos atributivos', url: '#', icono: '⭐' },
                    { tipo: 'html', titulo: 'Adjetivos predicativos', url: '#', icono: '⚡' },
                    { tipo: 'html', titulo: 'Vocabulario semana 6', url: '#', icono: '📖' }
                ],
                juegos: [
                    { titulo: 'Concordancia', url: '#', icono: '🤝', nota: 'Practica la concordancia' }
                ]
            },
            
            // SEMANA 7 - Pronombres Personales
            7: {
                titulo: "Pronombres Personales",
                tema: "Pronombres independientes",
                recursos: [
                    { tipo: 'pdf', titulo: 'PDF Contenido semana 7', url: '#', icono: '📄' },
                    { tipo: 'html', titulo: 'Primera persona', url: '#', icono: 'אֲנִי' },
                    { tipo: 'html', titulo: 'Segunda persona', url: '#', icono: 'אַתָּה' },
                    { tipo: 'html', titulo: 'Tercera persona', url: '#', icono: 'הוּא' },
                    { tipo: 'html', titulo: 'Vocabulario semana 7', url: '#', icono: '📖' }
                ],
                juegos: [
                    { titulo: 'Pronombres', url: '#', icono: '👤', nota: 'Aprende los pronombres' }
                ]
            },
            
            // SEMANA 8 - Pronombres Sufijos
            8: {
                titulo: "Pronombres Sufijos",
                tema: "Pronombres en sufijos",
                recursos: [
                    { tipo: 'pdf', titulo: 'PDF Contenido semana 8', url: '#', icono: '📄' },
                    { tipo: 'html', titulo: 'Sufijos nominales', url: '#', icono: 'י' },
                    { tipo: 'html', titulo: 'Sufijos preposicionales', url: '#', icono: 'ךָ' },
                    { tipo: 'html', titulo: 'Vocabulario semana 8', url: '#', icono: '📖' }
                ],
                juegos: [
                    { titulo: 'Sufijos', url: '#', icono: '🔚', nota: 'Practica los sufijos' }
                ]
            },
            
            // SEMANA 9 - Verbo Qal Perfecto
            9: {
                titulo: "Verbo Qal Perfecto",
                tema: "Formas perfectas",
                recursos: [
                    { tipo: 'pdf', titulo: 'PDF Contenido semana 9', url: '#', icono: '📄' },
                    { tipo: 'html', titulo: 'Introducción al verbo', url: '#', icono: '📚' },
                    { tipo: 'html', titulo: 'Paradigma del perfecto', url: '#', icono: 'שָׁמַר' },
                    { tipo: 'html', titulo: 'Traducción del perfecto', url: '#', icono: '🌍' },
                    { tipo: 'html', titulo: 'Vocabulario semana 9', url: '#', icono: '📖' },
                    { tipo: 'examen', titulo: 'Examen Semana 9', url: 'https://forms.gle/ejemplo9', icono: '📝' }
                ],
                juegos: [
                    { titulo: 'Perfecto Qal', url: '#', icono: '⚡', nota: 'Practica las conjugaciones' }
                ]
            },
            
            // SEMANA 10 - Verbo Qal Imperfecto
            10: {
                titulo: "Verbo Qal Imperfecto",
                tema: "Formas imperfectas",
                recursos: [
                    { tipo: 'pdf', titulo: 'PDF Contenido semana 10', url: '#', icono: '📄' },
                    { tipo: 'html', titulo: 'Introducción al imperfecto', url: '#', icono: 'יִשְׁמֹר' },
                    { tipo: 'html', titulo: 'Paradigma del imperfecto', url: '#', icono: 'יִקְטֹל' },
                    { tipo: 'html', titulo: 'Usos del imperfecto', url: '#', icono: '📝' },
                    { tipo: 'html', titulo: 'Vocabulario semana 10', url: '#', icono: '📖' },
                    { tipo: 'examen', titulo: 'Examen Semana 10', url: 'https://forms.gle/ejemplo10', icono: '📝' }
                ],
                juegos: [
                    { titulo: 'Imperfecto Qal', url: '#', icono: '⏳', nota: 'Practica el imperfecto' }
                ]
            },
            
            // AÑADE MÁS SEMANAS AQUÍ SIGUIENDO EL MISMO PATRÓN
            11: { titulo: "Verbos Débiles I", tema: "Introducción", recursos: [{ tipo: 'html', titulo: 'Contenido semana 11', url: '#', icono: '📚' }] },
            12: { titulo: "Verbos Débiles II", tema: "Clasificación", recursos: [{ tipo: 'html', titulo: 'Contenido semana 12', url: '#', icono: '📚' }] },
            13: { titulo: "Estado Constructo", tema: "Relación de pertenencia", recursos: [{ tipo: 'html', titulo: 'Contenido semana 13', url: '#', icono: '📚' }] },
            14: { titulo: "Números", tema: "Numeración hebrea", recursos: [{ tipo: 'html', titulo: 'Contenido semana 14', url: '#', icono: '📚' }] },
            15: { titulo: "Repaso General I", tema: "Consolidación", recursos: [{ tipo: 'html', titulo: 'Contenido semana 15', url: '#', icono: '📚' }] },
            16: { titulo: "Verbos Fuertes", tema: "Conjugaciones", recursos: [{ tipo: 'html', titulo: 'Contenido semana 16', url: '#', icono: '📚' }] },
            17: { titulo: "Imperativo", tema: "Modo imperativo", recursos: [{ tipo: 'html', titulo: 'Contenido semana 17', url: '#', icono: '📚' }] },
            18: { titulo: "Infinitivos", tema: "Infinitivo constructo", recursos: [{ tipo: 'html', titulo: 'Contenido semana 18', url: '#', icono: '📚' }] },
            19: { titulo: "Participios", tema: "Participios activos", recursos: [{ tipo: 'html', titulo: 'Contenido semana 19', url: '#', icono: '📚' }] },
            20: { titulo: "Sintaxis Básica", tema: "Orden de palabras", recursos: [{ tipo: 'html', titulo: 'Contenido semana 20', url: '#', icono: '📚' }] },
            21: { titulo: "Oraciones Verbales", tema: "Estructura", recursos: [{ tipo: 'html', titulo: 'Contenido semana 21', url: '#', icono: '📚' }] },
            22: { titulo: "Oraciones Nominales", tema: "Estructura", recursos: [{ tipo: 'html', titulo: 'Contenido semana 22', url: '#', icono: '📚' }] },
            23: { titulo: "Vav Conversivo", tema: "Uso del vav", recursos: [{ tipo: 'html', titulo: 'Contenido semana 23', url: '#', icono: '📚' }] },
            24: { titulo: "Salmos Seleccionados", tema: "Lectura guiada", recursos: [{ tipo: 'html', titulo: 'Contenido semana 24', url: '#', icono: '📚' }] },
            25: { titulo: "Génesis 1-3", tema: "Lectura guiada", recursos: [{ tipo: 'html', titulo: 'Contenido semana 25', url: '#', icono: '📚' }] },
            26: { titulo: "Rut 1-2", tema: "Lectura guiada", recursos: [{ tipo: 'html', titulo: 'Contenido semana 26', url: '#', icono: '📚' }] },
            27: { titulo: "Jonás", tema: "Lectura completa", recursos: [{ tipo: 'html', titulo: 'Contenido semana 27', url: '#', icono: '📚' }] },
            28: { titulo: "Repaso General II", tema: "Consolidación", recursos: [{ tipo: 'html', titulo: 'Contenido semana 28', url: '#', icono: '📚' }] },
            29: { titulo: "Traducción Avanzada", tema: "Textos proféticos", recursos: [{ tipo: 'html', titulo: 'Contenido semana 29', url: '#', icono: '📚' }] },
            30: { titulo: "Examen Final", tema: "Evaluación completa", recursos: [{ tipo: 'html', titulo: 'Contenido semana 30', url: '#', icono: '📚' }] }
        };
    }

    inicializar() {
        if (!localStorage.getItem('autenticado')) {
            window.location.href = 'index.html';
            return;
        }

        if (!this.verificarSemanaDesbloqueada()) {
            this.mostrarContenidoBloqueado();
            return;
        }

        this.cargarContenido();
        this.inicializarEventos();
    }

    verificarSemanaDesbloqueada() {
        if (this.semanaActual === 1) return true;
        
        const semanasDesbloqueadas = JSON.parse(
            localStorage.getItem(`semanasDesbloqueadas_${this.usuario.id}`) || '[]'
        );
        
        return semanasDesbloqueadas.includes(this.semanaActual);
    }

    mostrarContenidoBloqueado() {
        const container = document.getElementById('weekContent');
        container.innerHTML = `
            <div class="text-center" style="padding: 60px 20px;">
                <i class="fas fa-lock fa-4x text-muted mb-20"></i>
                <h2>Contenido Bloqueado</h2>
                <p class="text-muted mb-20">
                    Esta semana aún no está disponible. 
                    ${this.semanaActual > 1 ? 'Completa las semanas anteriores.' : ''}
                </p>
                <a href="index.html" class="btn btn-primary">
                    <i class="fas fa-arrow-left"></i> Volver al Dashboard
                </a>
            </div>
        `;
        
        document.getElementById('markComplete').style.display = 'none';
    }

    cargarContenido() {
        const contenido = this.contenidoSemanas[this.semanaActual] || this.contenidoPorDefecto();
        this.mostrarContenido(contenido);
        this.actualizarProgresoBarra();
    }

    contenidoPorDefecto() {
        return {
            titulo: `Semana ${this.semanaActual}`,
            tema: "Contenido del curso",
            recursos: [
                { tipo: 'html', titulo: `Contenido semana ${this.semanaActual}`, url: `#`, icono: '📚' }
            ]
        };
    }

    mostrarContenido(contenido) {
        const progreso = this.calcularProgreso();
        
        const container = document.getElementById('weekContent');
        container.innerHTML = `
            <div class="week-header">
                <div class="d-flex justify-between align-center">
                    <div>
                        <h1><i class="fas fa-scroll"></i> Semana ${this.semanaActual}</h1>
                        <h2>${contenido.titulo}</h2>
                        <p class="text-muted">${contenido.tema}</p>
                    </div>
                    <div class="d-flex flex-column align-center">
                        <div class="completion-badge">
                            <i class="fas fa-check"></i>
                            <span>${progreso.completados}/${progreso.total} completados</span>
                        </div>
                        <small class="text-muted">Progreso de la semana</small>
                    </div>
                </div>
            </div>

            <div class="progress-bar-container">
                <div class="progress-bar-fill" id="progressBar"></div>
            </div>

            <div class="mb-20">
                <h3><i class="fas fa-graduation-cap"></i> Objetivos de Aprendizaje</h3>
                <p>Completar todos los recursos y el examen de esta semana.</p>
            </div>

            <!-- Materiales de Estudio -->
            ${contenido.recursos && contenido.recursos.length > 0 ? `
                <div class="resource-section">
                    <h2><i class="fas fa-book"></i> Materiales de Estudio</h2>
                    <ul class="resource-list">
                        ${contenido.recursos.map((recurso, index) => `
                            <li class="resource-item">
                                <span class="resource-icon">${recurso.icono || '📄'}</span>
                                ${recurso.tipo === 'examen' ? 
                                    `<a href="${recurso.url}" target="_blank">${recurso.titulo}</a>` :
                                    `<a href="#" onclick="semanaManager.abrirRecurso(${index}, '${recurso.tipo}')">${recurso.titulo}</a>`
                                }
                                ${this.generarBadgeCompletado(index)}
                            </li>
                        `).join('')}
                    </ul>
                </div>
            ` : ''}

            <!-- Juegos Interactivos -->
            ${contenido.juegos && contenido.juegos.length > 0 ? `
                <div class="resource-section">
                    <h2><i class="fas fa-gamepad"></i> Ejercicios Interactivos</h2>
                    <ul class="resource-list">
                        ${contenido.juegos.map((juego, index) => `
                            <li class="resource-item game-item">
                                <span class="resource-icon">${juego.icono || '🎮'}</span>
                                <a href="#" onclick="semanaManager.abrirJuego(${index})">${juego.titulo}</a>
                                ${juego.nota ? `<small class="text-muted"> - ${juego.nota}</small>` : ''}
                                ${this.generarBadgeCompletado(index + 100)}
                            </li>
                        `).join('')}
                    </ul>
                </div>
            ` : ''}

            <!-- Examen -->
            <div class="resource-section">
                <h2><i class="fas fa-clipboard-check"></i> Examen Semanal</h2>
                <p>Completa el examen para validar tus conocimientos:</p>
                ${this.generarBotonExamen()}
            </div>
            
            <div class="mt-30 text-center">
                <button onclick="semanaManager.marcarSemanaCompletada()" class="btn btn-success" id="markComplete">
                    <i class="fas fa-check-circle"></i> Marcar Semana como Completada
                </button>
            </div>
        `;
    }

    generarBadgeCompletado(indice) {
        const recursosCompletados = JSON.parse(
            localStorage.getItem(`recursosCompletados_${this.usuario.id}_${this.semanaActual}`) || '[]'
        );
        
        if (recursosCompletados.includes(indice)) {
            return `<span class="completion-badge" style="margin-left: auto;">
                <i class="fas fa-check-circle"></i> Completado
            </span>`;
        }
        return '';
    }

    generarBotonExamen() {
        const contenido = this.contenidoSemanas[this.semanaActual];
        if (contenido && contenido.recursos) {
            const examen = contenido.recursos.find(r => r.tipo === 'examen');
            if (examen) {
                return `
                    <a href="${examen.url}" target="_blank" class="btn btn-warning">
                        <i class="fas fa-external-link-alt"></i> Ir al Examen
                    </a>
                    <button onclick="semanaManager.marcarExamenCompletado()" class="btn btn-success mt-10">
                        <i class="fas fa-check"></i> Marcar Examen como Completado
                    </button>
                `;
            }
        }
        
        return `
            <a href="#" target="_blank" class="btn btn-warning">
                <i class="fas fa-external-link-alt"></i> Ir al Examen (Google Forms)
            </a>
            <button onclick="semanaManager.marcarExamenCompletado()" class="btn btn-success mt-10">
                <i class="fas fa-check"></i> Marcar Examen como Completado
            </button>
        `;
    }

    abrirRecurso(indice, tipo) {
        const contenido = this.contenidoSemanas[this.semanaActual];
        if (!contenido || !contenido.recursos[indice]) return;
        
        const recurso = contenido.recursos[indice];
        
        this.marcarRecursoCompletado(indice);
        
        if (tipo === 'video' || tipo === 'pdf') {
            this.abrirModal(recurso.titulo, recurso.url);
        } else {
            window.open(recurso.url, '_blank');
        }
    }

    abrirJuego(indice) {
        const contenido = this.contenidoSemanas[this.semanaActual];
        if (!contenido || !contenido.juegos[indice]) return;
        
        const juego = contenido.juegos[indice];
        
        this.marcarRecursoCompletado(indice + 100);
        window.open(juego.url, '_blank');
    }

    abrirModal(titulo, url) {
        const modal = document.createElement('div');
        modal.className = 'modal active';
        modal.innerHTML = `
            <div class="modal-content" style="max-width: 800px;">
                <span class="close-modal" onclick="this.parentElement.parentElement.remove()">&times;</span>
                <h3>${titulo}</h3>
                <div class="iframe-container">
                    <iframe src="${url}" allowfullscreen></iframe>
                </div>
            </div>
        `;
        document.body.appendChild(modal);
    }

    calcularProgreso() {
        const recursosCompletados = JSON.parse(
            localStorage.getItem(`recursosCompletados_${this.usuario.id}_${this.semanaActual}`) || '[]'
        );
        
        const contenido = this.contenidoSemanas[this.semanaActual];
        const totalRecursos = (contenido.recursos ? contenido.recursos.length : 0) + 
                             (contenido.juegos ? contenido.juegos.length : 0) + 1; // +1 por el examen
        
        return {
            completados: recursosCompletados.length,
            total: totalRecursos
        };
    }

    actualizarProgresoBarra() {
        const progreso = this.calcularProgreso();
        const porcentaje = (progreso.completados / progreso.total) * 100;
        const barra = document.getElementById('progressBar');
        if (barra) {
            barra.style.width = `${porcentaje}%`;
        }
    }

    marcarRecursoCompletado(indice) {
        const recursosCompletados = JSON.parse(
            localStorage.getItem(`recursosCompletados_${this.usuario.id}_${this.semanaActual}`) || '[]'
        );
        
        if (!recursosCompletados.includes(indice)) {
            recursosCompletados.push(indice);
            localStorage.setItem(
                `recursosCompletados_${this.usuario.id}_${this.semanaActual}`,
                JSON.stringify(recursosCompletados)
            );
            
            this.actualizarProgresoUsuario('leccion');
            this.actualizarProgresoBarra();
            this.cargarContenido();
        }
    }

    marcarExamenCompletado() {
        this.marcarRecursoCompletado(999);
        
        const progreso = this.usuario.progreso || {};
        progreso.examenesCompletados = (progreso.examenesCompletados || 0) + 1;
        this.usuario.progreso = progreso;
        localStorage.setItem('usuarioActual', JSON.stringify(this.usuario));
        localStorage.setItem(`progreso_${this.usuario.id}`, JSON.stringify(progreso));
        
        alert('¡Examen marcado como completado!');
        this.cargarContenido();
    }

    actualizarProgresoUsuario(tipo) {
        const progreso = this.usuario.progreso || {};
        
        switch(tipo) {
            case 'leccion':
                progreso.leccionesCompletadas = (progreso.leccionesCompletadas || 0) + 1;
                break;
            case 'juego':
                progreso.juegosCompletados = (progreso.juegosCompletados || 0) + 1;
                break;
        }
        
        progreso.ultimaActividad = new Date().toISOString();
        
        this.usuario.progreso = progreso;
        localStorage.setItem('usuarioActual', JSON.stringify(this.usuario));
        localStorage.setItem(`progreso_${this.usuario.id}`, JSON.stringify(progreso));
    }

    marcarSemanaCompletada() {
        const semanasCompletadas = JSON.parse(
            localStorage.getItem(`semanasCompletadas_${this.usuario.id}`) || '[]'
        );
        
        if (!semanasCompletadas.includes(this.semanaActual)) {
            semanasCompletadas.push(this.semanaActual);
            localStorage.setItem(
                `semanasCompletadas_${this.usuario.id}`,
                JSON.stringify(semanasCompletadas)
            );
            
            const siguienteSemana = this.semanaActual + 1;
            if (siguienteSemana <= CONFIG.TOTAL_SEMANAS) {
                const semanasDesbloqueadas = JSON.parse(
                    localStorage.getItem(`semanasDesbloqueadas_${this.usuario.id}`) || '[]'
                );
                
                if (!semanasDesbloqueadas.includes(siguienteSemana)) {
                    semanasDesbloqueadas.push(siguienteSemana);
                    localStorage.setItem(
                        `semanasDesbloqueadas_${this.usuario.id}`,
                        JSON.stringify(semanasDesbloqueadas)
                    );
                }
            }
            
            const progreso = this.usuario.progreso || {};
            progreso.semanasCompletadas = semanasCompletadas.length;
            this.usuario.progreso = progreso;
            localStorage.setItem('usuarioActual', JSON.stringify(this.usuario));
            localStorage.setItem(`progreso_${this.usuario.id}`, JSON.stringify(progreso));
            
            alert(`¡Felicidades! Has completado la semana ${this.semanaActual}`);
            window.location.href = 'index.html';
        } else {
            alert('Esta semana ya estaba marcada como completada');
        }
    }

    inicializarEventos() {
        // Los eventos se manejan con onclick
    }
}

// Inicializar
document.addEventListener('DOMContentLoaded', () => {
    window.semanaManager = new SemanaManager();
});