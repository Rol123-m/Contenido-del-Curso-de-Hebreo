// app.js - CURSO DE HEBREO BÍBLICO - VERSIÓN SIMPLIFICADA
// ================================
// CONFIGURACIÓN INICIAL
// ================================
const CONFIG = {
    PASSWORD_UNICA: "hebreo2026",
    CODIGO_ADMIN: "ADMIN2026",
    TOTAL_SEMANAS: 30, // Escalable: puedes aumentar según necesites
    
    // Configuración del curso - Un solo grupo
    CURSO: {
        nombre: "Curso de Hebreo Bíblico",
        profesor: "Rolando Y. Desdín García",
        email: "vivosparaservir@gmail.com",
        telefono: "+53 58169444"
    }
};

// ================================
// DATOS DE ESTUDIANTES (SOLO 10)
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

// ID de profesor (ID reservado: 100)
const PROFESOR = {
    id: 100,
    nombre: "Rolando Y. Desdín García",
    rol: "profesor",
    email: "rolandodesdin3@outlook.com"
};

// ================================
// CLASE PRINCIPAL DE LA APLICACIÓN
// ================================
class CursoHebreoApp {
    constructor() {
        this.usuarioActual = null;
        this.inicializar();
    }

    inicializar() {
        this.verificarAutenticacion();
        this.inicializarEventos();
    }

    // ================================
    // AUTENTICACIÓN SIMPLIFICADA
    // ================================
    verificarAutenticacion() {
        const usuario = localStorage.getItem('usuarioActual');
        const autenticado = localStorage.getItem('autenticado');
        
        if (usuario && autenticado === 'true') {
            this.usuarioActual = JSON.parse(usuario);
            this.mostrarDashboard();
        } else {
            this.mostrarLogin();
        }
    }

    mostrarLogin() {
        const container = document.getElementById('app-container');
        container.innerHTML = `
            <div class="login-container fade-in">
                <div class="login-header">
                    <img src="mas logos.jpeg" alt="Ministerio Vivos para Servir" class="logo-main">
                    <h1>Curso de Hebreo Bíblico</h1>
                    <p class="text-muted">Ministerio "Vivos para Servir"</p>
                </div>
                
                <div class="form-group">
                    <label for="tipoUsuario">
                        <i class="fas fa-user-tag"></i> Acceder como:
                    </label>
                    <select id="tipoUsuario" class="form-control" onchange="app.cambiarTipoUsuario()">
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
    }

    cambiarTipoUsuario() {
        const tipo = document.getElementById('tipoUsuario').value;
        const estudianteSection = document.getElementById('estudianteSection');
        const profesorSection = document.getElementById('profesorSection');
        
        estudianteSection.classList.add('d-none');
        profesorSection.classList.add('d-none');
        
        if (tipo === 'estudiante') {
            estudianteSection.classList.remove('d-none');
        } else if (tipo === 'profesor') {
            profesorSection.classList.remove('d-none');
        }
    }

    loginEstudiante() {
        const estudianteId = parseInt(document.getElementById('estudianteSelect').value);
        const userId = document.getElementById('userId').value.trim();
        const password = document.getElementById('password').value;
        
        // Validaciones
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
        
        // Verificar que el ID coincida
        if (userId !== estudianteId.toString()) {
            this.mostrarError('El ID no coincide con el estudiante seleccionado');
            return;
        }
        
        // Verificar contraseña
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
                progreso: this.obtenerProgresoUsuario(estudianteId.toString())
            };
            
            localStorage.setItem('usuarioActual', JSON.stringify(usuario));
            localStorage.setItem('autenticado', 'true');
            
            this.usuarioActual = usuario;
            this.mostrarDashboard();
        } else {
            this.mostrarError('Contraseña incorrecta');
        }
    }

    loginProfesor() {
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
                fechaRegistro: new Date().toISOString(),
                esProfesor: true,
                permisos: ['ver_todos', 'editar_contenido', 'generar_codigos', 'ver_estadisticas']
            };
            
            localStorage.setItem('usuarioActual', JSON.stringify(usuario));
            localStorage.setItem('autenticado', 'true');
            
            this.usuarioActual = usuario;
            this.mostrarDashboard();
        } else {
            this.mostrarError('Contraseña incorrecta');
        }
    }

    logout() {
        localStorage.removeItem('usuarioActual');
        localStorage.removeItem('autenticado');
        this.usuarioActual = null;
        this.mostrarLogin();
    }

    // ================================
    // DASHBOARD
    // ================================
    mostrarDashboard() {
        const esProfesor = this.usuarioActual.esProfesor || false;
        const progreso = this.usuarioActual.progreso || {};
        const semanasHTML = this.generarGridSemanas();
        
        const container = document.getElementById('app-container');
        container.innerHTML = `
            <div class="dashboard fade-in">
                <!-- Header -->
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
                                Curso de Hebreo Bíblico
                            </p>
                            ${!esProfesor ? `<p class="text-muted">ID: ${this.usuarioActual.id}</p>` : ''}
                        </div>
                    </div>
                    
                    <div class="user-actions">
                        <button onclick="app.logout()" class="btn btn-danger">
                            <i class="fas fa-sign-out-alt"></i> Cerrar Sesión
                        </button>
                    </div>
                </div>
                
                ${!esProfesor ? this.generarResumenProgreso(progreso) : ''}
                
                <!-- Semanas del Curso -->
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
            
            <!-- Modal Desbloquear -->
            ${!esProfesor ? this.generarModalDesbloqueo() : ''}
            
            <!-- Modal Administración -->
            ${esProfesor ? this.generarModalAdministracion() : ''}
        `;
        
        this.inicializarEventosDashboard();
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
        const esProfesor = this.usuarioActual.esProfesor || false;
        
        if (esProfesor) {
            for (let semana = 1; semana <= CONFIG.TOTAL_SEMANAS; semana++) {
                const tituloSemana = this.obtenerTituloSemana(semana);
                
                html += `
                    <div class="week-card profesor-week" data-week="${semana}" onclick="app.abrirSemanaProfesor(${semana})">
                        <div class="week-number">${semana}</div>
                        <h4>${tituloSemana.titulo}</h4>
                        <p class="text-muted">${tituloSemana.tema}</p>
                        <div class="mt-10">
                            <button onclick="event.stopPropagation(); app.gestionarSemana(${semana})" class="btn btn-sm btn-info">
                                <i class="fas fa-cog"></i> Gestionar
                            </button>
                        </div>
                    </div>
                `;
            }
        } else {
            const semanasDesbloqueadas = JSON.parse(localStorage.getItem(`semanasDesbloqueadas_${this.usuarioActual.id}`) || '[]');
            const semanasCompletadas = JSON.parse(localStorage.getItem(`semanasCompletadas_${this.usuarioActual.id}`) || '[]');
            
            const fechaInicio = new Date(localStorage.getItem('fechaInicioCurso') || new Date().toISOString());
            const semanaActual = Math.floor((Date.now() - fechaInicio.getTime()) / (7 * 24 * 60 * 60 * 1000)) + 1;
            
            for (let semana = 1; semana <= CONFIG.TOTAL_SEMANAS; semana++) {
                const estaDesbloqueada = semanasDesbloqueadas.includes(semana) || semana <= semanaActual;
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
                        ${!estaDesbloqueada ? 
                            `<p><small><i class="fas fa-lock"></i> Disponible pronto</small></p>` : ''}
                    </div>
                `;
            }
        }
        
        return html;
    }

    obtenerTituloSemana(numero) {
        // PLANTILLA ESCALABLE - Modifica aquí los títulos de las semanas
        const semanas = {
            1: { titulo: "Alefato Hebreo", tema: "Introducción al alfabeto" },
            2: { titulo: "Las Vocales", tema: "Sistema vocálico" },
            3: { titulo: "Sustantivos", tema: "Género y número" },
            4: { titulo: "El Artículo", tema: "Artículo definido" },
            5: { titulo: "Preposiciones", tema: "Preposiciones básicas" },
            6: { titulo: "Adjetivos", tema: "Concordancia" },
            7: { titulo: "Pronombres Personales", tema: "Pronombres independientes" },
            8: { titulo: "Pronombres Sufijos", tema: "Pronombres en sufijos" },
            9: { titulo: "Verbo Qal Perfecto", tema: "Formas perfectas" },
            10: { titulo: "Verbo Qal Imperfecto", tema: "Formas imperfectas" },
            11: { titulo: "Verbos Débiles I", tema: "Introducción" },
            12: { titulo: "Verbos Débiles II", tema: "Clasificación" },
            13: { titulo: "Estado Constructo", tema: "Relación de pertenencia" },
            14: { titulo: "Números", tema: "Numeración hebrea" },
            15: { titulo: "Repaso General I", tema: "Consolidación" },
            16: { titulo: "Verbos Fuertes", tema: "Conjugaciones" },
            17: { titulo: "Imperativo", tema: "Modo imperativo" },
            18: { titulo: "Infinitivos", tema: "Infinitivo constructo" },
            19: { titulo: "Participios", tema: "Participios activos" },
            20: { titulo: "Sintaxis Básica", tema: "Orden de palabras" },
            21: { titulo: "Oraciones Verbales", tema: "Estructura" },
            22: { titulo: "Oraciones Nominales", tema: "Estructura" },
            23: { titulo: "Vav Conversivo", tema: "Uso del vav" },
            24: { titulo: "Salmos Seleccionados", tema: "Lectura guiada" },
            25: { titulo: "Génesis 1-3", tema: "Lectura guiada" },
            26: { titulo: "Rut 1-2", tema: "Lectura guiada" },
            27: { titulo: "Jonás", tema: "Lectura completa" },
            28: { titulo: "Repaso General II", tema: "Consolidación" },
            29: { titulo: "Traducción Avanzada", tema: "Textos proféticos" },
            30: { titulo: "Examen Final", tema: "Evaluación completa" }
        };
        
        return semanas[numero] || { titulo: `Semana ${numero}`, tema: "Contenido del curso" };
    }

    // ================================
    // GESTIÓN DE SEMANAS
    // ================================
    abrirSemana(numero) {
        localStorage.setItem('semanaActual', numero);
        window.location.href = `semana.html?semana=${numero}`;
    }

    abrirSemanaProfesor(numero) {
        localStorage.setItem('semanaActual', numero);
        window.location.href = `semana.html?semana=${numero}&mode=edit`;
    }

    gestionarSemana(numero) {
        alert(`Gestión de semana ${numero}\nAquí puedes editar contenido, ver estadísticas, etc.`);
    }

    // ================================
    // PROGRESO Y DESBLOQUEO
    // ================================
    obtenerProgresoUsuario(userId) {
        return JSON.parse(localStorage.getItem(`progreso_${userId}`)) || {
            semanasCompletadas: 0,
            leccionesCompletadas: 0,
            juegosCompletados: 0,
            examenesCompletados: 0,
            ultimaActividad: new Date().toISOString()
        };
    }

    guardarProgreso() {
        if (this.usuarioActual && !this.usuarioActual.esProfesor) {
            localStorage.setItem(`progreso_${this.usuarioActual.id}`, JSON.stringify(this.usuarioActual.progreso));
        }
    }

    // ================================
    // MODALES
    // ================================
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
                                   value="${new Date().toISOString().split('T')[0]}">
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
        document.getElementById('unlockModal').classList.add('active');
    }

    cerrarModalDesbloqueo() {
        document.getElementById('unlockModal').classList.remove('active');
    }

    mostrarModalAdmin() {
        document.getElementById('adminModal').classList.add('active');
    }

    cerrarModalAdmin() {
        document.getElementById('adminModal').classList.remove('active');
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
        else if (codigo === this.generarCodigoDesbloqueo(semana)) {
            this.agregarSemanaDesbloqueada(semana);
            this.mostrarExito(`¡Semana ${semana} desbloqueada!`);
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

    generarCodigoDesbloqueo(semana) {
        return `SEMANA_${semana}_${this.usuarioActual.id}`;
    }

    // ================================
    // ADMINISTRACIÓN
    // ================================
    configurarFechaInicio() {
        const fecha = document.getElementById('fechaInicio').value;
        localStorage.setItem('fechaInicioCurso', new Date(fecha).toISOString());
        alert('Fecha de inicio actualizada correctamente');
        this.mostrarDashboard();
    }

    generarCodigos() {
        const cantidad = parseInt(document.getElementById('cantidadCodigos').value);
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
        contenedor.innerHTML = `
            <h5>Códigos generados (${cantidad}):</h5>
            <div style="background: #f8f9fa; padding: 10px; border-radius: 5px; max-height: 200px; overflow-y: auto; font-family: monospace;">
                ${codigos.map(c => `<div>${c}</div>`).join('')}
            </div>
            <button onclick="this.parentElement.innerHTML=''" class="btn btn-sm btn-danger mt-10">
                <i class="fas fa-times"></i> Ocultar
            </button>
        `;
        
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
        let listaHTML = '<h4>Lista de Estudiantes</h4><ul style="max-height: 300px; overflow-y: auto;">';
        ESTUDIANTES.forEach(est => {
            const progreso = localStorage.getItem(`progreso_${est.id}`);
            const prog = progreso ? JSON.parse(progreso) : null;
            const semanas = prog ? prog.semanasCompletadas || 0 : 0;
            listaHTML += `<li><strong>ID ${est.id}:</strong> ${est.nombre} - Semanas completadas: ${semanas}</li>`;
        });
        listaHTML += '</ul>';
        
        alert(listaHTML);
    }

    desbloquearParaEstudiante() {
        const estudiantesLista = ESTUDIANTES.map(e => `${e.id}: ${e.nombre}`).join('\n');
        const idEstudiante = prompt(`ID del estudiante:\n${estudiantesLista}`);
        if (!idEstudiante) return;
        
        const semana = prompt('Número de semana a desbloquear (1-30):');
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
            curso: "Hebreo Bíblico",
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

    // ================================
    // MENSAJES DE ERROR Y ÉXITO
    // ================================
    mostrarError(mensaje) {
        const error = document.getElementById('loginError');
        if (error) {
            document.getElementById('errorText').textContent = mensaje;
            error.classList.remove('d-none');
            setTimeout(() => error.classList.add('d-none'), 5000);
        } else {
            alert(`Error: ${mensaje}`);
        }
    }

    mostrarErrorDesbloqueo(mensaje) {
        const error = document.getElementById('unlockError');
        if (error) {
            document.getElementById('unlockErrorText').textContent = mensaje;
            error.classList.remove('d-none');
            setTimeout(() => error.classList.add('d-none'), 5000);
        }
    }

    mostrarExito(mensaje) {
        this.cerrarModalDesbloqueo();
        alert(mensaje);
        this.mostrarDashboard();
    }

    // ================================
    // EVENTOS
    // ================================
    inicializarEventos() {
        document.addEventListener('keyup', (e) => {
            if (e.key === 'Enter') {
                const tipo = document.getElementById('tipoUsuario')?.value;
                if (tipo === 'estudiante' && document.getElementById('password')) {
                    this.loginEstudiante();
                } else if (tipo === 'profesor' && document.getElementById('profesorPassword')) {
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

    inicializarEventosDashboard() {
        // Los eventos se manejan con onclick
    }
}

// ================================
// INICIALIZAR APLICACIÓN
// ================================
document.addEventListener('DOMContentLoaded', () => {
    window.app = new CursoHebreoApp();
});