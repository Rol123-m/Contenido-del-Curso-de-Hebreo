// app.js - CURSO DE HEBREO BÍBLICO - VERSIÓN CORREGIDA
// ================================
// CONFIGURACIÓN INICIAL
// ================================
const CONFIG = {
    PASSWORD_UNICA: "hebreo2026",
    CODIGO_ADMIN: "ADMIN2026",
    TOTAL_SEMANAS: 38,
    
    CURSO: {
        nombre: "Introducción a la Gramática Hebrea",
        profesor: "Rolando Y. Desdín García",
        email: "lenguasbiblicasmvps@gmail.com",
        telefono: "+53 58169444",
        inicio: "3 de marzo, 2026"
    }
};

// ================================
// DATOS DE ESTUDIANTES
// ================================
const ESTUDIANTES = [
    { id: 1, nombre: "Raydel Ramón Toranzo Hidalgo", email: "raydelrth@icloud.com", telefono: "58371320", nacionalidad: "Cuba" },
    { id: 2, nombre: "Hector Fernández Valdes", email: "fernandezdahector9@gmail.com", telefono: "58852731", nacionalidad: "Cuba" },
    { id: 3, nombre: "Ernesto Abraham Reyna Rojas", email: "ernesto.reyn41999@gmail.com", telefono: "59491040", nacionalidad: "Cuba" },
    { id: 4, nombre: "Lesyani Nieves Sánchez Ramírez", email: "lesyanisanchez1996@gmail.com", telefono: "58587605", nacionalidad: "Cuba" },
    { id: 5, nombre: "Yurleidy Dominguez Vega", email: "yurleidydominguez@gmail.com", telefono: "58799817", nacionalidad: "Cuba" },
    { id: 6, nombre: "Daniel Ramírez López", email: "danielramirezlopez909@gmail.com", telefono: "50434920", nacionalidad: "Cuba" },
    { id: 7, nombre: "Marcos Gonzalez Gonzalez", email: "socram98gg@gmail.com", telefono: "52454259", nacionalidad: "Cuba" },
    { id: 8, nombre: "Carlos Alberto Dixon Magaña", email: "cdixonmagana@gmail.com", telefono: "52491097", nacionalidad: "Cuba" },
    { id: 9, nombre: "Juan Miguel Gongora Téllez", email: "juansigongora797@gmail.com", telefono: "58248023", nacionalidad: "Cuba" },
    { id: 10, nombre: "Alexei Lores Lamorú", email: "alexei850113@gmail.com", telefono: "54095537", nacionalidad: "Cuba" },
    { id: 11, nombre: "Yordanka Álvarez Pérez.", email: "alvarezyordanka1@gmail.com", telefono: "58169444", nacionalidad: "Cuba" }
];

const PROFESOR = {
    id: 100,
    nombre: "Rolando Y. Desdín García",
    rol: "profesor",
    email: "rolandodesdin3@outlook.com"
};

// ================================
// CLASE PRINCIPAL
// ================================
class CursoHebreoApp {
    constructor() {
        this.usuarioActual = null;
        this.eventosInicializados = false;
        this.inicializar();
    }

    inicializar() {
        this.verificarAutenticacion();
        if (!this.eventosInicializados) {
            this.inicializarEventosGlobales();
            this.eventosInicializados = true;
        }
    }

    verificarAutenticacion() {
        try {
            const usuario = localStorage.getItem('usuarioActual');
            const autenticado = localStorage.getItem('autenticado');
            
            if (usuario && autenticado === 'true') {
                this.usuarioActual = JSON.parse(usuario);
                this.mostrarDashboard();
            } else {
                this.mostrarLogin();
            }
        } catch (error) {
            console.error('Error en autenticación:', error);
            this.mostrarLogin();
        }
    }

    mostrarLogin() {
        const container = document.getElementById('app-container');
        if (!container) return;
        
        container.innerHTML = `
            <div class="login-container fade-in">
                <div class="login-header">
                    <img src="mas%20logos.jpeg" alt="Ministerio Vivos para Servir" class="logo-main" onerror="this.src='data:image/svg+xml;utf8,<svg xmlns=%22http://www.w3.org/2000/svg%22 width=%22100%22 height=%22100%22 viewBox=%220 0 100 100%22><rect width=%22100%22 height=%22100%22 fill=%22%23722F37%22/><text x=%2220%22 y=%2265%22 fill=%22white%22 font-size=%2250%22>📖</text></svg>'">
                    <h1>Introducción a la Gramática Hebrea</h1>
                    <p class="text-muted">Ministerio "Vivos para Servir"</p>
                    <p class="text-muted"><small>Inicio: 3 de marzo, 2026</small></p>
                </div>
                
                <div class="form-group">
                    <label for="tipoUsuario">
                        <i class="fas fa-user-tag"></i> Acceder como:
                    </label>
                    <select id="tipoUsuario" class="form-control">
                        <option value="">-- Selecciona --</option>
                        <option value="estudiante">Estudiante</option>
                        <option value="profesor">Profesor (Rolando Desdín)</option>
                    </select>
                </div>
                
                <div id="estudianteSection" class="d-none">
                    <div class="form-group">
                        <label for="estudianteSelect">
                            <i class="fas fa-user"></i> Selecciona tu nombre:
                        </label>
                        <select id="estudianteSelect" class="form-control">
                            <option value="">-- Selecciona tu nombre --</option>
                            ${ESTUDIANTES.map(est => 
                                `<option value="${est.id}">${est.id} - ${est.nombre}</option>`
                            ).join('')}
                        </select>
                    </div>
                    
                    <div class="form-group">
                        <label for="userId">
                            <i class="fas fa-key"></i> ID de usuario:
                        </label>
                        <input type="text" id="userId" class="form-control" 
                               placeholder="Ingresa tu ID numérico">
                    </div>
                    
                    <div class="form-group">
                        <label for="password">
                            <i class="fas fa-lock"></i> Contraseña:
                        </label>
                        <input type="password" id="password" class="form-control" 
                               placeholder="Ingresa la contraseña del curso">
                    </div>
                    
                    <button onclick="app.loginEstudiante()" class="btn btn-block">
                        <i class="fas fa-sign-in-alt"></i> Ingresar al Curso
                    </button>
                </div>
                
                <div id="profesorSection" class="d-none">
                    <div class="form-group">
                        <label for="profesorId">
                            <i class="fas fa-key"></i> ID de Profesor:
                        </label>
                        <input type="text" id="profesorId" class="form-control" 
                               placeholder="Ingresa tu ID (100)">
                    </div>
                    
                    <div class="form-group">
                        <label for="profesorPassword">
                            <i class="fas fa-lock"></i> Contraseña:
                        </label>
                        <input type="password" id="profesorPassword" class="form-control" 
                               placeholder="Ingresa la contraseña">
                    </div>
                    
                    <button onclick="app.loginProfesor()" class="btn btn-block btn-secondary">
                        <i class="fas fa-sign-in-alt"></i> Ingresar como Profesor
                    </button>
                </div>
                
                <div id="loginError" class="alert alert-danger mt-20 d-none">
                    <i class="fas fa-exclamation-circle"></i>
                    <span id="errorText"></span>
                </div>
            </div>
        `;

        // Agregar evento change al select
        const tipoSelect = document.getElementById('tipoUsuario');
        if (tipoSelect) {
            tipoSelect.addEventListener('change', (e) => this.cambiarTipoUsuario(e));
        }
    }

    cambiarTipoUsuario(event) {
        const tipo = event.target.value;
        const estudianteSection = document.getElementById('estudianteSection');
        const profesorSection = document.getElementById('profesorSection');
        
        if (!estudianteSection || !profesorSection) return;
        
        estudianteSection.classList.add('d-none');
        profesorSection.classList.add('d-none');
        
        if (tipo === 'estudiante') {
            estudianteSection.classList.remove('d-none');
        } else if (tipo === 'profesor') {
            profesorSection.classList.remove('d-none');
        }
    }

    loginEstudiante() {
        try {
            const estudianteId = parseInt(document.getElementById('estudianteSelect').value);
            const userId = document.getElementById('userId').value.trim();
            const password = document.getElementById('password').value;
            
            if (!estudianteId) {
                this.mostrarError('Debes seleccionar tu nombre');
                return;
            }
            
            if (!userId) {
                this.mostrarError('Debes ingresar tu ID numérico');
                return;
            }
            
            if (!password) {
                this.mostrarError('Debes ingresar la contraseña');
                return;
            }
            
            if (userId !== estudianteId.toString()) {
                this.mostrarError('El ID no coincide con el estudiante seleccionado');
                return;
            }
            
            if (password === CONFIG.PASSWORD_UNICA) {
                const estudiante = ESTUDIANTES.find(e => e.id === estudianteId);
                
                if (!estudiante) {
                    this.mostrarError('Estudiante no encontrado');
                    return;
                }
                
                const usuario = {
                    id: estudianteId.toString(),
                    nombre: estudiante.nombre,
                    email: estudiante.email,
                    telefono: estudiante.telefono,
                    nacionalidad: estudiante.nacionalidad,
                    fechaRegistro: new Date().toISOString(),
                    rol: 'estudiante',
                    esProfesor: false,
                    progreso: this.obtenerProgresoUsuario(estudianteId.toString())
                };
                
                localStorage.setItem('usuarioActual', JSON.stringify(usuario));
                localStorage.setItem('autenticado', 'true');
                
                this.usuarioActual = usuario;
                this.mostrarDashboard();
            } else {
                this.mostrarError('Contraseña incorrecta');
            }
        } catch (error) {
            console.error('Error en login:', error);
            this.mostrarError('Error al iniciar sesión');
        }
    }

    loginProfesor() {
        try {
            const userId = document.getElementById('profesorId').value.trim();
            const password = document.getElementById('profesorPassword').value;
            
            if (!userId) {
                this.mostrarError('Debes ingresar tu ID');
                return;
            }
            
            if (!password) {
                this.mostrarError('Debes ingresar la contraseña');
                return;
            }
            
            if (userId !== PROFESOR.id.toString()) {
                this.mostrarError('ID de profesor incorrecto');
                return;
            }
            
            if (password === CONFIG.PASSWORD_UNICA || password === CONFIG.CODIGO_ADMIN) {
                const usuario = {
                    id: PROFESOR.id.toString(),
                    nombre: PROFESOR.nombre,
                    email: PROFESOR.email,
                    rol: 'profesor',
                    esProfesor: true,
                    fechaRegistro: new Date().toISOString(),
                    permisos: ['ver_todos', 'editar_contenido', 'generar_codigos', 'ver_estadisticas']
                };
                
                localStorage.setItem('usuarioActual', JSON.stringify(usuario));
                localStorage.setItem('autenticado', 'true');
                
                this.usuarioActual = usuario;
                this.mostrarDashboard();
            } else {
                this.mostrarError('Contraseña incorrecta');
            }
        } catch (error) {
            console.error('Error en login profesor:', error);
            this.mostrarError('Error al iniciar sesión');
        }
    }

    logout() {
        localStorage.removeItem('usuarioActual');
        localStorage.removeItem('autenticado');
        this.usuarioActual = null;
        this.mostrarLogin();
    }

    mostrarDashboard() {
        if (!this.usuarioActual) return;
        
        const esProfesor = this.usuarioActual.esProfesor || false;
        const progreso = this.usuarioActual.progreso || {};
        const semanasHTML = this.generarGridSemanas();
        
        const container = document.getElementById('app-container');
        if (!container) return;
        
        container.innerHTML = `
            <div class="dashboard fade-in">
                <div class="dashboard-header">
                    <div class="user-info">
                        <div class="user-avatar ${esProfesor ? 'avatar-profesor' : 'avatar-estudiante'}">
                            ${this.usuarioActual.nombre.charAt(0).toUpperCase()}
                        </div>
                        <div>
                            <h2>Bienvenido, ${this.usuarioActual.nombre}</h2>
                            <p class="text-muted">
                                ${esProfesor ? 
                                    '<i class="fas fa-chalkboard-teacher"></i> Profesor - ' : 
                                    '<i class="fas fa-user-graduate"></i> Estudiante - '}
                                Introducción a la Gramática Hebrea
                            </p>
                            <p class="text-muted"><small>Inicio: 3 de marzo, 2026</small></p>
                        </div>
                    </div>
                    
                    <div class="user-actions">
                        <button onclick="app.logout()" class="btn btn-danger">
                            <i class="fas fa-sign-out-alt"></i> Cerrar Sesión
                        </button>
                    </div>
                </div>
                
                ${!esProfesor ? this.generarResumenProgreso(progreso) : ''}
                
                <div class="weeks-section">
                    <div class="section-title">
                        <i class="fas fa-scroll"></i>
                        <h3>Plan de Estudios (${CONFIG.TOTAL_SEMANAS} semanas)</h3>
                    </div>
                    <p class="text-muted mb-20">Haz clic en una semana para acceder a sus contenidos</p>
                    
                    <div class="weeks-grid" id="weeksGrid">
                        ${semanasHTML}
                    </div>
                </div>
                
                ${esProfesor ? this.generarPanelAdministracion() : ''}
            </div>
            
            ${!esProfesor ? this.generarModalDesbloqueo() : ''}
            ${esProfesor ? this.generarModalAdministracion() : ''}
        `;
    }

    generarResumenProgreso(progreso) {
        return `
            <div class="progress-summary">
                <div class="section-title">
                    <i class="fas fa-chart-line"></i>
                    <h3>Tu Progreso</h3>
                </div>
                
                <div class="progress-cards">
                    <div class="progress-card">
                        <i class="fas fa-calendar-week"></i>
                        <div class="progress-number">${progreso.semanasCompletadas || 0}/${CONFIG.TOTAL_SEMANAS}</div>
                        <p>Semanas Completadas</p>
                    </div>
                    
                    <div class="progress-card">
                        <i class="fas fa-book"></i>
                        <div class="progress-number">${progreso.leccionesCompletadas || 0}</div>
                        <p>Lecciones</p>
                    </div>
                    
                    <div class="progress-card">
                        <i class="fas fa-gamepad"></i>
                        <div class="progress-number">${progreso.juegosCompletados || 0}</div>
                        <p>Ejercicios</p>
                    </div>
                    
                    <div class="progress-card">
                        <i class="fas fa-clipboard-check"></i>
                        <div class="progress-number">${progreso.examenesCompletados || 0}</div>
                        <p>Exámenes</p>
                    </div>
                </div>
                
                <div class="mt-20 d-flex gap-10">
                    <button onclick="app.descargarProgreso()" class="btn btn-secondary">
                        <i class="fas fa-download"></i> Descargar Progreso
                    </button>
                    
                    <button onclick="app.mostrarModalDesbloqueo()" class="btn btn-warning">
                        <i class="fas fa-unlock"></i> Desbloquear Semana
                    </button>
                </div>
            </div>
        `;
    }

    generarGridSemanas() {
        let html = '';
        const esProfesor = this.usuarioActual?.esProfesor || false;
        
        if (esProfesor) {
            for (let semana = 1; semana <= CONFIG.TOTAL_SEMANAS; semana++) {
                const tituloSemana = this.obtenerTituloSemana(semana);
                
                html += `
                    <div class="week-card profesor-week" data-week="${semana}" onclick="app.abrirSemanaProfesor(${semana})">
                        <div class="week-number">${semana}</div>
                        <h4>${tituloSemana.titulo}</h4>
                        <p class="text-muted">${tituloSemana.tema}</p>
                        <p class="text-muted small">${tituloSemana.fecha || ''}</p>
                    </div>
                `;
            }
        } else {
            const semanasDesbloqueadas = JSON.parse(localStorage.getItem(`semanasDesbloqueadas_${this.usuarioActual.id}`) || '[]');
            const semanasCompletadas = JSON.parse(localStorage.getItem(`semanasCompletadas_${this.usuarioActual.id}`) || '[]');
            
            const fechaInicio = new Date(2026, 2, 3);
            const hoy = new Date();
            const diffDias = Math.floor((hoy - fechaInicio) / (1000 * 60 * 60 * 24));
            const semanaActual = Math.min(Math.max(Math.floor(diffDias / 7) + 1, 1), CONFIG.TOTAL_SEMANAS);
            
            for (let semana = 1; semana <= CONFIG.TOTAL_SEMANAS; semana++) {
                const estaDesbloqueada = semanasDesbloqueadas.includes(semana) || semana <= semanaActual || semana === 1;
                const estaCompletada = semanasCompletadas.includes(semana);
                const esActual = semana === semanaActual && !estaCompletada;
                
                let badge = '';
                if (esActual) {
                    badge = '<span class="week-badge">Actual</span>';
                } else if (estaCompletada) {
                    badge = '<span class="week-badge" style="background:var(--success);color:white;"><i class="fas fa-check"></i></span>';
                }
                
                const tituloSemana = this.obtenerTituloSemana(semana);
                
                html += `
                    <div class="week-card ${estaDesbloqueada ? '' : 'locked'} ${estaCompletada ? 'completed' : ''} ${esActual ? 'current' : ''}" 
                         data-week="${semana}" 
                         ${estaDesbloqueada ? `onclick="app.abrirSemana(${semana})"` : ''}>
                        ${badge}
                        <div class="week-number">${semana}</div>
                        <h4>${tituloSemana.titulo}</h4>
                        <p class="text-muted">${tituloSemana.tema}</p>
                        <p class="text-muted small">${tituloSemana.fecha || ''}</p>
                        ${!estaDesbloqueada ? 
                            `<p><small><i class="fas fa-lock"></i> Disponible ${tituloSemana.fecha || 'pronto'}</small></p>` : ''}
                    </div>
                `;
            }
        }
        
        return html;
    }

    obtenerTituloSemana(numero) {
        const semanas = {
            1: { titulo: "El Alfabeto Hebreo", tema: "Alefato y escritura", fecha: "3 mar - 9 mar" },
            2: { titulo: "Las Vocales Hebreas", tema: "Sistema vocálico", fecha: "10 mar - 16 mar" },
            3: { titulo: "Silabeo y Pronunciación", tema: "Reglas de silabeo", fecha: "17 mar - 23 mar" },
            4: { titulo: "Sustantivos Hebreos", tema: "Género y número", fecha: "24 mar - 30 mar" },
            5: { titulo: "Artículo Definido y Waw", tema: "Artículo y conjunción", fecha: "31 mar - 6 abr" },
            6: { titulo: "Preposiciones Hebreas", tema: "Preposiciones básicas", fecha: "7 abr - 13 abr" },
            7: { titulo: "Adjetivos Hebreos", tema: "Concordancia", fecha: "14 abr - 20 abr" },
            8: { titulo: "Pronombres", tema: "Personales, demostrativos", fecha: "21 abr - 27 abr" },
            9: { titulo: "Sufijos Pronominales", tema: "Sufijos en nombres", fecha: "28 abr - 4 may" },
            10: { titulo: "Cadena Constructa", tema: "Estado constructo", fecha: "5 may - 11 may" },
            11: { titulo: "Números", tema: "Numeración hebrea", fecha: "12 may - 18 may" },
            12: { titulo: "Introducción a Verbos", tema: "Fundamentos verbales", fecha: "19 may - 25 may" },
            13: { titulo: "Qal Perfecto - Fuertes", tema: "Verbos fuertes", fecha: "26 may - 1 jun" },
            14: { titulo: "Qal Perfecto - Débiles", tema: "Verbos débiles", fecha: "2 jun - 8 jun" },
            15: { titulo: "Qal Imperfecto - Fuertes", tema: "Imperfecto fuerte", fecha: "9 jun - 15 jun" },
            16: { titulo: "Qal Imperfecto - Débiles", tema: "Imperfecto débil", fecha: "16 jun - 22 jun" },
            17: { titulo: "Waw Consecutivo", tema: "Vav conversivo", fecha: "23 jun - 29 jun" },
            18: { titulo: "Qal Imperativo", tema: "Imperativo, cohortativo", fecha: "30 jun - 5 jul" },
            19: { titulo: "EXAMEN INTERMEDIO", tema: "Repaso temas 1-18", fecha: "6 jul - 12 jul" },
            20: { titulo: "Sufijos Pronominales en Verbos", tema: "Sufijos verbales", fecha: "1 sep - 7 sep" },
            21: { titulo: "Qal Infinitivo Constructo", tema: "Infinitivo constructo", fecha: "8 sep - 14 sep" },
            22: { titulo: "Qal Infinitivo Absoluto", tema: "Infinitivo absoluto", fecha: "15 sep - 21 sep" },
            23: { titulo: "Qal Participio", tema: "Participios", fecha: "22 sep - 28 sep" },
            24: { titulo: "Sintaxis de la Oración", tema: "Estructura oracional", fecha: "29 sep - 5 oct" },
            25: { titulo: "Niphal - Verbos Fuertes", tema: "Niphal fuerte", fecha: "6 oct - 12 oct" },
            26: { titulo: "Niphal - Verbos Débiles", tema: "Niphal débil", fecha: "13 oct - 19 oct" },
            27: { titulo: "Piel - Verbos Fuertes", tema: "Piel fuerte", fecha: "20 oct - 26 oct" },
            28: { titulo: "Piel - Verbos Débiles", tema: "Piel débil", fecha: "27 oct - 2 nov" },
            29: { titulo: "Pual - Verbos Fuertes", tema: "Pual fuerte", fecha: "3 nov - 9 nov" },
            30: { titulo: "Pual - Verbos Débiles", tema: "Pual débil", fecha: "10 nov - 16 nov" },
            31: { titulo: "Hiphil - Verbos Fuertes", tema: "Hiphil fuerte", fecha: "17 nov - 23 nov" },
            32: { titulo: "Hiphil - Verbos Débiles", tema: "Hiphil débil", fecha: "24 nov - 30 nov" },
            33: { titulo: "Hophal - Verbos Fuertes", tema: "Hophal fuerte", fecha: "1 dic - 7 dic" },
            34: { titulo: "Hophal - Verbos Débiles", tema: "Hophal débil", fecha: "8 dic - 14 dic" },
            35: { titulo: "Hithpael - Verbos Fuertes", tema: "Hithpael fuerte", fecha: "15 dic - 21 dic" },
            36: { titulo: "Hithpael - Verbos Débiles", tema: "Hithpael débil", fecha: "22 dic - 28 dic" },
            37: { titulo: "EXAMEN FINAL", tema: "Repuesto temas 20-36", fecha: "5 ene - 11 ene" },
            38: { titulo: "¿A dónde vamos ahora?", tema: "Continuidad en el estudio", fecha: "12 ene - 19 ene" }
        };
        
        return semanas[numero] || { titulo: `Semana ${numero}`, tema: "Contenido del curso", fecha: "" };
    }

    abrirSemana(numero) {
        localStorage.setItem('semanaActual', numero);
        window.location.href = `semana.html?semana=${numero}`;
    }

    abrirSemanaProfesor(numero) {
        localStorage.setItem('semanaActual', numero);
        window.location.href = `semana.html?semana=${numero}&mode=edit`;
    }

    obtenerProgresoUsuario(userId) {
        try {
            return JSON.parse(localStorage.getItem(`progreso_${userId}`)) || {
                semanasCompletadas: 0,
                leccionesCompletadas: 0,
                juegosCompletados: 0,
                examenesCompletados: 0,
                ultimaActividad: new Date().toISOString()
            };
        } catch {
            return {
                semanasCompletadas: 0,
                leccionesCompletadas: 0,
                juegosCompletados: 0,
                examenesCompletados: 0,
                ultimaActividad: new Date().toISOString()
            };
        }
    }

    generarModalDesbloqueo() {
        return `
            <div class="modal" id="unlockModal">
                <div class="modal-content">
                    <span class="close-modal" onclick="app.cerrarModalDesbloqueo()">&times;</span>
                    <h3><i class="fas fa-unlock-alt"></i> Desbloquear Contenido</h3>
                    
                    <div class="form-group mt-20">
                        <label for="unlockCode">Código de Desbloqueo:</label>
                        <input type="text" id="unlockCode" class="form-control" 
                               placeholder="Código especial proporcionado por el profesor">
                    </div>
                    
                    <div class="form-group">
                        <label for="weekToUnlock">Semana a desbloquear:</label>
                        <select id="weekToUnlock" class="form-control">
                            ${Array.from({length: CONFIG.TOTAL_SEMANAS}, (_, i) => 
                                `<option value="${i + 1}">Semana ${i + 1}</option>`
                            ).join('')}
                        </select>
                    </div>
                    
                    <button onclick="app.desbloquearSemana()" class="btn btn-success btn-block mt-20">
                        <i class="fas fa-check"></i> Desbloquear
                    </button>
                    
                    <div id="unlockError" class="alert alert-danger mt-20 d-none">
                        <i class="fas fa-exclamation-circle"></i>
                        <span id="unlockErrorText"></span>
                    </div>
                </div>
            </div>
        `;
    }

    generarModalAdministracion() {
        return `
            <div class="modal" id="adminModal">
                <div class="modal-content">
                    <span class="close-modal" onclick="app.cerrarModalAdmin()">&times;</span>
                    <h3><i class="fas fa-cogs"></i> Panel de Administración</h3>
                    
                    <div class="admin-controls">
                        <div class="control-group">
                            <h4><i class="fas fa-calendar-alt"></i> Configurar Fecha de Inicio</h4>
                            <input type="date" id="fechaInicio" class="form-control mt-10" 
                                   value="2026-03-03">
                            <button onclick="app.configurarFechaInicio()" class="btn btn-secondary mt-10">
                                <i class="fas fa-save"></i> Establecer Fecha
                            </button>
                        </div>
                        
                        <div class="control-group">
                            <h4><i class="fas fa-key"></i> Generar Códigos de Acceso</h4>
                            <input type="number" id="cantidadCodigos" class="form-control mt-10" 
                                   placeholder="Número de códigos" min="1" max="100" value="5">
                            <button onclick="app.generarCodigos()" class="btn btn-success mt-10">
                                <i class="fas fa-key"></i> Generar Códigos
                            </button>
                            <div id="codigosGenerados" class="mt-10"></div>
                        </div>
                        
                        <div class="control-group">
                            <h4><i class="fas fa-chart-bar"></i> Ver Estadísticas</h4>
                            <button onclick="app.verEstadisticas()" class="btn btn-info mt-10">
                                <i class="fas fa-chart-pie"></i> Ver Estadísticas del Curso
                            </button>
                        </div>
                        
                        <div class="control-group">
                            <h4><i class="fas fa-users"></i> Gestión de Estudiantes</h4>
                            <button onclick="app.verEstudiantes()" class="btn btn-primary mt-10">
                                <i class="fas fa-eye"></i> Ver Lista de Estudiantes
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        `;
    }

    generarPanelAdministracion() {
        return `
            <div class="admin-panel">
                <div class="section-title">
                    <i class="fas fa-cogs"></i>
                    <h3>Panel de Administración</h3>
                </div>
                
                <div class="admin-controls">
                    <div class="control-group">
                        <h4><i class="fas fa-tools"></i> Herramientas de Gestión</h4>
                        <button onclick="app.mostrarModalAdmin()" class="btn btn-info mt-10">
                            <i class="fas fa-cogs"></i> Abrir Panel Completo
                        </button>
                        <button onclick="app.verEstadisticasRapido()" class="btn btn-success mt-10">
                            <i class="fas fa-chart-bar"></i> Estadísticas Rápidas
                        </button>
                    </div>
                    
                    <div class="control-group">
                        <h4><i class="fas fa-unlock"></i> Desbloquear Contenido</h4>
                        <p>Desbloquear semanas para estudiantes</p>
                        <button onclick="app.desbloquearParaEstudiante()" class="btn btn-warning mt-10">
                            <i class="fas fa-user-unlock"></i> Desbloquear para Estudiante
                        </button>
                    </div>
                    
                    <div class="control-group">
                        <h4><i class="fas fa-file-export"></i> Exportar Datos</h4>
                        <button onclick="app.exportarDatos()" class="btn btn-secondary mt-10">
                            <i class="fas fa-file-excel"></i> Exportar Progreso
                        </button>
                    </div>
                </div>
            </div>
        `;
    }

    mostrarModalDesbloqueo() {
        const modal = document.getElementById('unlockModal');
        if (modal) modal.classList.add('active');
    }

    cerrarModalDesbloqueo() {
        const modal = document.getElementById('unlockModal');
        if (modal) modal.classList.remove('active');
    }

    mostrarModalAdmin() {
        const modal = document.getElementById('adminModal');
        if (modal) modal.classList.add('active');
    }

    cerrarModalAdmin() {
        const modal = document.getElementById('adminModal');
        if (modal) modal.classList.remove('active');
    }

    desbloquearSemana() {
        const codigo = document.getElementById('unlockCode').value.trim();
        const semana = parseInt(document.getElementById('weekToUnlock').value);
        
        if (codigo === 'DESBLOQUEAR_TODO') {
            this.desbloquearTodasSemanas();
            this.mostrarExito('¡Todas las semanas han sido desbloqueadas!');
        } 
        else if (codigo.startsWith('DESBLOQUEAR_')) {
            const semanaCodigo = parseInt(codigo.replace('DESBLOQUEAR_', ''));
            if (semanaCodigo >= 1 && semanaCodigo <= CONFIG.TOTAL_SEMANAS) {
                this.agregarSemanaDesbloqueada(semanaCodigo);
                this.mostrarExito(`¡Semana ${semanaCodigo} desbloqueada!`);
            } else {
                this.mostrarErrorDesbloqueo('Código inválido');
            }
        }
        else {
            this.mostrarErrorDesbloqueo('Código de desbloqueo inválido');
        }
    }

    agregarSemanaDesbloqueada(semana) {
        const semanasDesbloqueadas = JSON.parse(localStorage.getItem(`semanasDesbloqueadas_${this.usuarioActual.id}`) || '[]');
        if (!semanasDesbloqueadas.includes(semana)) {
            semanasDesbloqueadas.push(semana);
            localStorage.setItem(`semanasDesbloqueadas_${this.usuarioActual.id}`, JSON.stringify(semanasDesbloqueadas));
            this.mostrarDashboard();
        }
    }

    desbloquearTodasSemanas() {
        const todasSemanas = Array.from({length: CONFIG.TOTAL_SEMANAS}, (_, i) => i + 1);
        localStorage.setItem(`semanasDesbloqueadas_${this.usuarioActual.id}`, JSON.stringify(todasSemanas));
    }

    configurarFechaInicio() {
        const fecha = document.getElementById('fechaInicio').value;
        localStorage.setItem('fechaInicioCurso', new Date(fecha).toISOString());
        alert('Fecha de inicio actualizada correctamente');
    }

    generarCodigos() {
        const cantidad = parseInt(document.getElementById('cantidadCodigos').value) || 5;
        const codigos = [];
        const caracteres = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
        
        for (let i = 0; i < cantidad; i++) {
            let codigo = 'HEBREO_';
            for (let j = 0; j < 8; j++) {
                codigo += caracteres.charAt(Math.floor(Math.random() * caracteres.length));
            }
            codigos.push(codigo);
        }
        
        const contenedor = document.getElementById('codigosGenerados');
        if (contenedor) {
            contenedor.innerHTML = `
                <h5>Códigos generados (${cantidad}):</h5>
                <div style="background: #f8f9fa; padding: 10px; border-radius: 5px; max-height: 200px; overflow-y: auto; font-family: monospace;">
                    ${codigos.map(c => `<div>${c}</div>`).join('')}
                </div>
                <button onclick="this.innerHTML=''" class="btn btn-sm btn-danger mt-10">
                    <i class="fas fa-times"></i> Ocultar
                </button>
            `;
        }
        
        const codigosValidos = JSON.parse(localStorage.getItem('codigosValidos') || '[]');
        codigosValidos.push(...codigos);
        localStorage.setItem('codigosValidos', JSON.stringify(codigosValidos));
    }

    verEstadisticas() {
        const estudiantesActivos = ESTUDIANTES.length;
        const progresos = ESTUDIANTES.map(e => {
            const prog = localStorage.getItem(`progreso_${e.id}`);
            return prog ? JSON.parse(prog) : null;
        }).filter(p => p !== null);
        
        const semanasCompletadasTotal = progresos.reduce((acc, p) => acc + (p.semanasCompletadas || 0), 0);
        
        alert(`Estadísticas del Curso:
        
Total Estudiantes: ${estudiantesActivos}
Estudiantes con actividad: ${progresos.length}
Semanas completadas total: ${semanasCompletadasTotal}
Promedio de semanas: ${(semanasCompletadasTotal / estudiantesActivos).toFixed(1)}`);
    }

    verEstadisticasRapido() {
        this.verEstadisticas();
    }

    verEstudiantes() {
        let mensaje = 'Lista de Estudiantes:\n\n';
        ESTUDIANTES.forEach(est => {
            const progreso = localStorage.getItem(`progreso_${est.id}`);
            const prog = progreso ? JSON.parse(progreso) : null;
            const semanas = prog ? prog.semanasCompletadas || 0 : 0;
            mensaje += `ID ${est.id}: ${est.nombre} - Semanas: ${semanas}\n`;
        });
        
        alert(mensaje);
    }

    desbloquearParaEstudiante() {
        const estudiantesLista = ESTUDIANTES.map(e => `${e.id}: ${e.nombre}`).join('\n');
        const idEstudiante = prompt(`ID del estudiante:\n${estudiantesLista}`);
        if (!idEstudiante) return;
        
        const semana = prompt('Número de semana a desbloquear (1-38):');
        if (!semana) return;
        
        const semanasDesbloqueadas = JSON.parse(localStorage.getItem(`semanasDesbloqueadas_${idEstudiante}`) || '[]');
        if (!semanasDesbloqueadas.includes(parseInt(semana))) {
            semanasDesbloqueadas.push(parseInt(semana));
            localStorage.setItem(`semanasDesbloqueadas_${idEstudiante}`, JSON.stringify(semanasDesbloqueadas));
            alert(`Semana ${semana} desbloqueada para estudiante ID ${idEstudiante}`);
        } else {
            alert('Esta semana ya estaba desbloqueada');
        }
    }

    exportarDatos() {
        const datos = {
            curso: "Introducción a la Gramática Hebrea",
            fecha: new Date().toISOString(),
            estudiantes: ESTUDIANTES.map(e => {
                const progreso = localStorage.getItem(`progreso_${e.id}`);
                const semanasDesbloqueadas = localStorage.getItem(`semanasDesbloqueadas_${e.id}`);
                const semanasCompletadas = localStorage.getItem(`semanasCompletadas_${e.id}`);
                
                return {
                    id: e.id,
                    nombre: e.nombre,
                    email: e.email,
                    progreso: progreso ? JSON.parse(progreso) : null,
                    semanasDesbloqueadas: semanasDesbloqueadas ? JSON.parse(semanasDesbloqueadas) : [],
                    semanasCompletadas: semanasCompletadas ? JSON.parse(semanasCompletadas) : []
                };
            })
        };
        
        const blob = new Blob([JSON.stringify(datos, null, 2)], {type: 'application/json'});
        const url = URL.createObjectURL(blob);
        
        const a = document.createElement('a');
        a.href = url;
        a.download = `hebreo_datos_${new Date().toISOString().split('T')[0]}.json`;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
        
        alert('Datos exportados correctamente');
    }

    descargarProgreso() {
        if (!this.usuarioActual || this.usuarioActual.esProfesor) return;
        
        const progreso = {
            usuario: this.usuarioActual.nombre,
            id: this.usuarioActual.id,
            fechaRegistro: this.usuarioActual.fechaRegistro,
            progreso: this.usuarioActual.progreso,
            semanasCompletadas: JSON.parse(localStorage.getItem(`semanasCompletadas_${this.usuarioActual.id}`) || '[]'),
            semanasDesbloqueadas: JSON.parse(localStorage.getItem(`semanasDesbloqueadas_${this.usuarioActual.id}`) || '[]'),
            ultimaActualizacion: new Date().toISOString()
        };
        
        const blob = new Blob([JSON.stringify(progreso, null, 2)], {type: 'application/json'});
        const url = URL.createObjectURL(blob);
        
        const a = document.createElement('a');
        a.href = url;
        a.download = `progreso_${this.usuarioActual.nombre}_${new Date().toISOString().split('T')[0]}.json`;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
    }

    mostrarError(mensaje) {
        const error = document.getElementById('loginError');
        const errorText = document.getElementById('errorText');
        if (error && errorText) {
            errorText.textContent = mensaje;
            error.classList.remove('d-none');
            setTimeout(() => error.classList.add('d-none'), 5000);
        } else {
            alert(`Error: ${mensaje}`);
        }
    }

    mostrarErrorDesbloqueo(mensaje) {
        const error = document.getElementById('unlockError');
        const errorText = document.getElementById('unlockErrorText');
        if (error && errorText) {
            errorText.textContent = mensaje;
            error.classList.remove('d-none');
            setTimeout(() => error.classList.add('d-none'), 5000);
        }
    }

    mostrarExito(mensaje) {
        this.cerrarModalDesbloqueo();
        alert(mensaje);
        this.mostrarDashboard();
    }

    inicializarEventosGlobales() {
        document.addEventListener('keyup', (e) => {
            if (e.key === 'Enter') {
                const tipo = document.getElementById('tipoUsuario')?.value;
                if (tipo === 'estudiante') {
                    this.loginEstudiante();
                } else if (tipo === 'profesor') {
                    this.loginProfesor();
                }
            }
        });
        
        document.addEventListener('click', (e) => {
            if (e.target.classList.contains('modal')) {
                e.target.classList.remove('active');
            }
        });
    }
}

// ================================
// INICIALIZAR APLICACIÓN
// ================================
document.addEventListener('DOMContentLoaded', () => {
    // Limpiar cualquier instancia anterior
    if (window.app) {
        delete window.app;
    }
    window.app = new CursoHebreoApp();
});