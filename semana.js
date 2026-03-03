// semana.js - CURSO DE HEBREO BÍBLICO (Adaptado al sílabo)

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
        // CONTENIDO COMPLETO SEGÚN EL SÍLABO
        return {
            // SECCIÓN 1: Escritura
              1: {
                titulo: "Alefato Hebreo",
                tema: "Introducción al alfabeto, pronunciación y escritura",
                recursos: [
                    { tipo: 'pdf', titulo: 'PDF Contenido semana 1', url: 'https://drive.google.com/file/d/1-Jjy_zQJXU21lx4EyYOwuOM0WUDginWH/view?usp=sharing', icono: '📄' },
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
            
            2: {
                titulo: "Las Vocales Hebreas",
                tema: "Sistema vocálico tiberiano",
                fecha: "10 mar - 16 mar",
                evaluacion: "Examen 2",
                recursos: [
                    { tipo: 'pdf', titulo: 'PDF: Las Vocales', url: 'semanas/semana2/pdf/vocales.pdf', icono: '📄' },
                    { tipo: 'html', titulo: 'Introducción a las Vocales', url: 'semanas/semana2/html/introduccion.html', icono: 'אָ' },
                    { tipo: 'html', titulo: 'Vocales Largas', url: 'semanas/semana2/html/largas.html', icono: 'אַ' },
                    { tipo: 'html', titulo: 'Vocales Breves', url: 'semanas/semana2/html/breves.html', icono: 'אִ' },
                    { tipo: 'html', titulo: 'Vocales Reducidas y Shevá', url: 'semanas/semana2/html/sheva.html', icono: 'אְ' },
                    { tipo: 'html', titulo: 'Resumen Semana 2', url: 'semanas/semana2/html/resumen.html', icono: '📝' }
                ],
                juegos: [
                    { titulo: 'Reconoce las Vocales', url: 'semanas/semana2/juegos/vocales.html', icono: '🎯' },
                    { titulo: 'Práctica de Lectura', url: 'semanas/semana2/juegos/lectura.html', icono: '📢' }
                ]
            },
            
            3: {
                titulo: "Silabeo y Pronunciación",
                tema: "Reglas de silabeo y acentuación",
                fecha: "17 mar - 23 mar",
                evaluacion: "Examen 3 + Foro 1",
                recursos: [
                    { tipo: 'pdf', titulo: 'PDF: Silabeo', url: 'semanas/semana3/pdf/silabeo.pdf', icono: '📄' },
                    { tipo: 'html', titulo: 'Reglas de Silabeo', url: 'semanas/semana3/html/silabeo.html', icono: '📏' },
                    { tipo: 'html', titulo: 'Acentuación', url: 'semanas/semana3/html/acentuacion.html', icono: '⚡' },
                    { tipo: 'html', titulo: 'Sílaba Abierta y Cerrada', url: 'semanas/semana3/html/tipos.html', icono: '🔓' },
                    { tipo: 'html', titulo: 'Práctica de Lectura', url: 'semanas/semana3/html/practica.html', icono: '📖' },
                    { tipo: 'html', titulo: 'Foro 1 - Preguntas', url: 'semanas/semana3/html/foro.html', icono: '💬' }
                ],
                juegos: [
                    { titulo: 'Divide en Sílabas', url: 'semanas/semana3/juegos/silabas.html', icono: '✂️' }
                ]
            },
            
            // SECCIÓN 2: Nombres y Nominados
            4: {
                titulo: "Sustantivos Hebreos",
                tema: "Género y número",
                fecha: "24 mar - 30 mar",
                evaluacion: "Examen 4",
                recursos: [
                    { tipo: 'pdf', titulo: 'PDF: Sustantivos', url: 'semanas/semana4/pdf/sustantivos.pdf', icono: '📄' },
                    { tipo: 'html', titulo: 'Género: Masculino y Femenino', url: 'semanas/semana4/html/genero.html', icono: '♂️♀️' },
                    { tipo: 'html', titulo: 'Número: Singular y Plural', url: 'semanas/semana4/html/numero.html', icono: '1️⃣🔢' },
                    { tipo: 'html', titulo: 'Formas Duales', url: 'semanas/semana4/html/dual.html', icono: '2️⃣' },
                    { tipo: 'html', titulo: 'Vocabulario Semana 4', url: 'semanas/semana4/html/vocabulario.html', icono: '📖' }
                ],
                juegos: [
                    { titulo: 'Identifica el Género', url: 'semanas/semana4/juegos/genero.html', icono: '⚥' },
                    { titulo: 'Forma el Plural', url: 'semanas/semana4/juegos/plural.html', icono: '➕' }
                ]
            },
            
            5: {
                titulo: "Artículo Definido y Waw",
                tema: "Artículo definido y conjunción",
                fecha: "31 mar - 6 abr",
                evaluacion: "Examen 5",
                recursos: [
                    { tipo: 'pdf', titulo: 'PDF: Artículo y Waw', url: 'semanas/semana5/pdf/articulo.pdf', icono: '📄' },
                    { tipo: 'html', titulo: 'El Artículo הַ', url: 'semanas/semana5/html/articulo.html', icono: 'הַ' },
                    { tipo: 'html', titulo: 'Asimilación del Artículo', url: 'semanas/semana5/html/asimilacion.html', icono: 'הַשָּׁמַיִם' },
                    { tipo: 'html', titulo: 'La Conjunción Waw', url: 'semanas/semana5/html/waw.html', icono: 'וְ' },
                    { tipo: 'html', titulo: 'Vocabulario Semana 5', url: 'semanas/semana5/html/vocabulario.html', icono: '📖' }
                ],
                juegos: [
                    { titulo: 'Artículo Correcto', url: 'semanas/semana5/juegos/articulo.html', icono: 'הַ' }
                ]
            },
            
            6: {
                titulo: "Preposiciones Hebreas",
                tema: "Preposiciones básicas e inseparables",
                fecha: "7 abr - 13 abr",
                evaluacion: "Examen 6 + Foro 2",
                recursos: [
                    { tipo: 'pdf', titulo: 'PDF: Preposiciones', url: 'semanas/semana6/pdf/preposiciones.pdf', icono: '📄' },
                    { tipo: 'html', titulo: 'Preposiciones ב, כ, ל', url: 'semanas/semana6/html/inseparables.html', icono: 'בְּ' },
                    { tipo: 'html', titulo: 'Preposición מִן', url: 'semanas/semana6/html/min.html', icono: 'מִן' },
                    { tipo: 'html', titulo: 'Preposiciones Compuestas', url: 'semanas/semana6/html/compuestas.html', icono: 'עַל' },
                    { tipo: 'html', titulo: 'Vocabulario Semana 6', url: 'semanas/semana6/html/vocabulario.html', icono: '📖' }
                ],
                juegos: [
                    { titulo: 'Preposiciones Básicas', url: 'semanas/semana6/juegos/preposiciones.html', icono: '🔤' }
                ]
            },
            
            7: {
                titulo: "Adjetivos Hebreos",
                tema: "Concordancia y uso",
                fecha: "14 abr - 20 abr",
                evaluacion: "Examen 7",
                recursos: [
                    { tipo: 'pdf', titulo: 'PDF: Adjetivos', url: 'semanas/semana7/pdf/adjetivos.pdf', icono: '📄' },
                    { tipo: 'html', titulo: 'Forma de los Adjetivos', url: 'semanas/semana7/html/forma.html', icono: 'טוֹב' },
                    { tipo: 'html', titulo: 'Adjetivos Atributivos', url: 'semanas/semana7/html/atributivos.html', icono: '⭐' },
                    { tipo: 'html', titulo: 'Adjetivos Predicativos', url: 'semanas/semana7/html/predicativos.html', icono: '⚡' },
                    { tipo: 'html', titulo: 'Vocabulario Semana 7', url: 'semanas/semana7/html/vocabulario.html', icono: '📖' }
                ],
                juegos: [
                    { titulo: 'Concordancia', url: 'semanas/semana7/juegos/concordancia.html', icono: '🤝' }
                ]
            },
            
            8: {
                titulo: "Pronombres",
                tema: "Personales, demostrativos, interrogativos",
                fecha: "21 abr - 27 abr",
                evaluacion: "Examen 8",
                recursos: [
                    { tipo: 'pdf', titulo: 'PDF: Pronombres', url: 'semanas/semana8/pdf/pronombres.pdf', icono: '📄' },
                    { tipo: 'html', titulo: 'Pronombres Personales', url: 'semanas/semana8/html/personales.html', icono: 'אֲנִי' },
                    { tipo: 'html', titulo: 'Pronombres Demostrativos', url: 'semanas/semana8/html/demostrativos.html', icono: 'זֶה' },
                    { tipo: 'html', titulo: 'Pronombres Interrogativos', url: 'semanas/semana8/html/interrogativos.html', icono: 'מִי' },
                    { tipo: 'html', titulo: 'Vocabulario Semana 8', url: 'semanas/semana8/html/vocabulario.html', icono: '📖' }
                ],
                juegos: [
                    { titulo: 'Identifica el Pronombre', url: 'semanas/semana8/juegos/pronombres.html', icono: '👤' }
                ]
            },
            
            9: {
                titulo: "Sufijos Pronominales",
                tema: "Sufijos en nombres",
                fecha: "28 abr - 4 may",
                evaluacion: "Examen 9 + Foro 3",
                recursos: [
                    { tipo: 'pdf', titulo: 'PDF: Sufijos Pronominales', url: 'semanas/semana9/pdf/sufijos.pdf', icono: '📄' },
                    { tipo: 'html', titulo: 'Sufijos en Singular', url: 'semanas/semana9/html/singular.html', icono: 'י' },
                    { tipo: 'html', titulo: 'Sufijos en Plural', url: 'semanas/semana9/html/plural.html', icono: 'ים' },
                    { tipo: 'html', titulo: 'Sufijos en Preposiciones', url: 'semanas/semana9/html/preposiciones.html', icono: 'ךָ' },
                    { tipo: 'html', titulo: 'Vocabulario Semana 9', url: 'semanas/semana9/html/vocabulario.html', icono: '📖' }
                ],
                juegos: [
                    { titulo: 'Sufijos en Nombres', url: 'semanas/semana9/juegos/sufijos.html', icono: '🔚' }
                ]
            },
            
            10: {
                titulo: "Cadena Constructa",
                tema: "Estado constructo",
                fecha: "5 may - 11 may",
                evaluacion: "Examen 10",
                recursos: [
                    { tipo: 'pdf', titulo: 'PDF: Estado Constructo', url: 'semanas/semana10/pdf/constructo.pdf', icono: '📄' },
                    { tipo: 'html', titulo: 'Introducción al Constructo', url: 'semanas/semana10/html/introduccion.html', icono: 'דְּבַר' },
                    { tipo: 'html', titulo: 'Formas del Constructo', url: 'semanas/semana10/html/formas.html', icono: 'בֵּית' },
                    { tipo: 'html', titulo: 'Usos del Constructo', url: 'semanas/semana10/html/usos.html', icono: '🔗' },
                    { tipo: 'html', titulo: 'Vocabulario Semana 10', url: 'semanas/semana10/html/vocabulario.html', icono: '📖' }
                ],
                juegos: [
                    { titulo: 'Identifica el Constructo', url: 'semanas/semana10/juegos/constructo.html', icono: '⛓️' }
                ]
            },
            
            11: {
                titulo: "Números",
                tema: "Numeración hebrea",
                fecha: "12 may - 18 may",
                evaluacion: "Examen 11",
                recursos: [
                    { tipo: 'pdf', titulo: 'PDF: Números', url: 'semanas/semana11/pdf/numeros.pdf', icono: '📄' },
                    { tipo: 'html', titulo: 'Números Cardinales', url: 'semanas/semana11/html/cardinales.html', icono: '1️⃣' },
                    { tipo: 'html', titulo: 'Números Ordinales', url: 'semanas/semana11/html/ordinales.html', icono: '🥇' },
                    { tipo: 'html', titulo: 'Concordancia Numérica', url: 'semanas/semana11/html/concordancia.html', icono: '⚖️' },
                    { tipo: 'html', titulo: 'Vocabulario Semana 11', url: 'semanas/semana11/html/vocabulario.html', icono: '📖' }
                ],
                juegos: [
                    { titulo: 'Los Números', url: 'semanas/semana11/juegos/numeros.html', icono: '🔢' }
                ]
            },
            
            // SECCIÓN 3: Verbos Qal
            12: {
                titulo: "Introducción a los Verbos",
                tema: "Fundamentos verbales",
                fecha: "19 may - 25 may",
                evaluacion: "Examen 12 + Foro 4",
                recursos: [
                    { tipo: 'pdf', titulo: 'PDF: Introducción Verbos', url: 'semanas/semana12/pdf/introverbos.pdf', icono: '📄' },
                    { tipo: 'html', titulo: 'El Sistema Verbal', url: 'semanas/semana12/html/sistema.html', icono: '🔤' },
                    { tipo: 'html', titulo: 'Raíces Triliteras', url: 'semanas/semana12/html/raices.html', icono: 'שָׁמַר' },
                    { tipo: 'html', titulo: 'Tiempos y Aspectos', url: 'semanas/semana12/html/tiempos.html', icono: '⏳' },
                    { tipo: 'html', titulo: 'Vocabulario Semana 12', url: 'semanas/semana12/html/vocabulario.html', icono: '📖' }
                ],
                juegos: [
                    { titulo: 'Identifica la Raíz', url: 'semanas/semana12/juegos/raiz.html', icono: '🌱' }
                ]
            },
            
            13: {
                titulo: "Qal Perfecto - Verbos Fuertes",
                tema: "Conjugaciones del perfecto",
                fecha: "26 may - 1 jun",
                evaluacion: "Examen 13",
                recursos: [
                    { tipo: 'pdf', titulo: 'PDF: Qal Perfecto', url: 'semanas/semana13/pdf/qalperfecto.pdf', icono: '📄' },
                    { tipo: 'html', titulo: 'Paradigma del Perfecto', url: 'semanas/semana13/html/paradigma.html', icono: 'שָׁמַר' },
                    { tipo: 'html', titulo: 'Traducción del Perfecto', url: 'semanas/semana13/html/traduccion.html', icono: '🌍' },
                    { tipo: 'html', titulo: 'Ejemplos Bíblicos', url: 'semanas/semana13/html/ejemplos.html', icono: '📖' },
                    { tipo: 'html', titulo: 'Vocabulario Semana 13', url: 'semanas/semana13/html/vocabulario.html', icono: '📖' }
                ],
                juegos: [
                    { titulo: 'Conjuga el Perfecto', url: 'semanas/semana13/juegos/conjuga.html', icono: '⚡' }
                ]
            },
            
            14: {
                titulo: "Qal Perfecto - Verbos Débiles",
                tema: "Verbos con guturales",
                fecha: "2 jun - 8 jun",
                evaluacion: "Examen 14",
                recursos: [
                    { tipo: 'pdf', titulo: 'PDF: Perfecto Débiles', url: 'semanas/semana14/pdf/debiles.pdf', icono: '📄' },
                    { tipo: 'html', titulo: 'Verbos I-Gutural', url: 'semanas/semana14/html/igutural.html', icono: 'אָמַר' },
                    { tipo: 'html', titulo: 'Verbos III-א', url: 'semanas/semana14/html/iiialef.html', icono: 'מָצָא' },
                    { tipo: 'html', titulo: 'Verbos III-ה', url: 'semanas/semana14/html/iiihe.html', icono: 'בָּנָה' },
                    { tipo: 'html', titulo: 'Vocabulario Semana 14', url: 'semanas/semana14/html/vocabulario.html', icono: '📖' }
                ],
                juegos: [
                    { titulo: 'Verbos Débiles', url: 'semanas/semana14/juegos/debiles.html', icono: '🍃' }
                ]
            },
            
            15: {
                titulo: "Qal Imperfecto - Verbos Fuertes",
                tema: "Formas del imperfecto",
                fecha: "9 jun - 15 jun",
                evaluacion: "Examen 15 + Foro 5",
                recursos: [
                    { tipo: 'pdf', titulo: 'PDF: Imperfecto Fuertes', url: 'semanas/semana15/pdf/imperfecto.pdf', icono: '📄' },
                    { tipo: 'html', titulo: 'Paradigma del Imperfecto', url: 'semanas/semana15/html/paradigma.html', icono: 'יִשְׁמֹר' },
                    { tipo: 'html', titulo: 'Prefijos y Sufijos', url: 'semanas/semana15/html/prefijos.html', icono: '➕' },
                    { tipo: 'html', titulo: 'Usos del Imperfecto', url: 'semanas/semana15/html/usos.html', icono: '⏱️' },
                    { tipo: 'html', titulo: 'Vocabulario Semana 15', url: 'semanas/semana15/html/vocabulario.html', icono: '📖' }
                ],
                juegos: [
                    { titulo: 'Imperfecto Qal', url: 'semanas/semana15/juegos/imperfecto.html', icono: '⏳' }
                ]
            },
            
            16: {
                titulo: "Qal Imperfecto - Verbos Débiles",
                tema: "Imperfecto de débiles",
                fecha: "16 jun - 22 jun",
                evaluacion: "Examen 16",
                recursos: [
                    { tipo: 'pdf', titulo: 'PDF: Imperfecto Débiles', url: 'semanas/semana16/pdf/imperfectodeb.pdf', icono: '📄' },
                    { tipo: 'html', titulo: 'Verbos I-Nun', url: 'semanas/semana16/html/inun.html', icono: 'נָפַל' },
                    { tipo: 'html', titulo: 'Verbos I-Yod', url: 'semanas/semana16/html/iyod.html', icono: 'יָשַׁב' },
                    { tipo: 'html', titulo: 'Verbos Doblemente Débiles', url: 'semanas/semana16/html/doble.html', icono: '⚡' },
                    { tipo: 'html', titulo: 'Vocabulario Semana 16', url: 'semanas/semana16/html/vocabulario.html', icono: '📖' }
                ],
                juegos: [
                    { titulo: 'Imperfecto Débiles', url: 'semanas/semana16/juegos/imperfectodeb.html', icono: '🍂' }
                ]
            },
            
            17: {
                titulo: "Waw Consecutivo",
                tema: "Vav conversivo",
                fecha: "23 jun - 29 jun",
                evaluacion: "Examen 17",
                recursos: [
                    { tipo: 'pdf', titulo: 'PDF: Waw Consecutivo', url: 'semanas/semana17/pdf/waw.pdf', icono: '📄' },
                    { tipo: 'html', titulo: 'Waw + Perfecto', url: 'semanas/semana17/html/wawperfecto.html', icono: 'וְקָטַל' },
                    { tipo: 'html', titulo: 'Waw + Imperfecto', url: 'semanas/semana17/html/wawimperfecto.html', icono: 'וַיִּקְטֹל' },
                    { tipo: 'html', titulo: 'Narrativa Hebrea', url: 'semanas/semana17/html/narrativa.html', icono: '📖' },
                    { tipo: 'html', titulo: 'Vocabulario Semana 17', url: 'semanas/semana17/html/vocabulario.html', icono: '📖' }
                ],
                juegos: [
                    { titulo: 'Waw Consecutivo', url: 'semanas/semana17/juegos/waw.html', icono: '🔄' }
                ]
            },
            
            18: {
                titulo: "Qal Imperativo",
                tema: "Imperativo, cohortativo, yusivo",
                fecha: "30 jun - 5 jul",
                evaluacion: "Examen 18 + Foro 6",
                recursos: [
                    { tipo: 'pdf', titulo: 'PDF: Imperativo', url: 'semanas/semana18/pdf/imperativo.pdf', icono: '📄' },
                    { tipo: 'html', titulo: 'Imperativo Afirmativo', url: 'semanas/semana18/html/afirmativo.html', icono: 'שְׁמֹר' },
                    { tipo: 'html', titulo: 'Imperativo Negativo', url: 'semanas/semana18/html/negativo.html', icono: 'אַל' },
                    { tipo: 'html', titulo: 'Cohortativo y Yusivo', url: 'semanas/semana18/html/cohortativo.html', icono: 'אֶקְטְלָה' },
                    { tipo: 'html', titulo: 'Vocabulario Semana 18', url: 'semanas/semana18/html/vocabulario.html', icono: '📖' }
                ],
                juegos: [
                    { titulo: 'Formas Imperativas', url: 'semanas/semana18/juegos/imperativo.html', icono: '⚡' }
                ]
            },
            
            19: {
                titulo: "EXAMEN INTERMEDIO",
                tema: "Repaso temas 1-18",
                fecha: "6 jul - 12 jul",
                evaluacion: "Examen Intermedio",
                recursos: [
                    { tipo: 'pdf', titulo: 'Guía de Repaso Intermedio', url: 'semanas/semana19/pdf/repaso.pdf', icono: '📚' },
                    { tipo: 'html', titulo: 'Resumen Sección 1', url: 'semanas/semana19/html/seccion1.html', icono: '📝' },
                    { tipo: 'html', titulo: 'Resumen Sección 2', url: 'semanas/semana19/html/seccion2.html', icono: '📝' },
                    { tipo: 'html', titulo: 'Resumen Verbos Qal', url: 'semanas/semana19/html/verbos.html', icono: '📝' },
                    { tipo: 'html', titulo: 'Ejercicios de Repaso', url: 'semanas/semana19/html/ejercicios.html', icono: '✍️' },
                    { tipo: 'examen', titulo: 'Examen Intermedio', url: 'https://forms.gle/intermedio', icono: '📝' }
                ],
                juegos: [
                    { titulo: 'Repaso General', url: 'semanas/semana19/juegos/repaso.html', icono: '🔄' }
                ]
            },
            
            // Continuación después de vacaciones
            20: {
                titulo: "Sufijos Pronominales en Verbos",
                tema: "Sufijos en formas verbales",
                fecha: "1 sep - 7 sep",
                evaluacion: "Examen 19",
                recursos: [
                    { tipo: 'pdf', titulo: 'PDF: Sufijos Verbales', url: 'semanas/semana20/pdf/sufijosverb.pdf', icono: '📄' },
                    { tipo: 'html', titulo: 'Sufijos en Perfecto', url: 'semanas/semana20/html/perfecto.html', icono: 'קְטָלַנִי' },
                    { tipo: 'html', titulo: 'Sufijos en Imperfecto', url: 'semanas/semana20/html/imperfecto.html', icono: 'יִקְטְלֵנִי' },
                    { tipo: 'html', titulo: 'Vocabulario Semana 20', url: 'semanas/semana20/html/vocabulario.html', icono: '📖' }
                ],
                juegos: [
                    { titulo: 'Sufijos en Verbos', url: 'semanas/semana20/juegos/sufijosverb.html', icono: '🔤' }
                ]
            },
            
            21: {
                titulo: "Qal Infinitivo Constructo",
                tema: "Infinitivo constructo",
                fecha: "8 sep - 14 sep",
                evaluacion: "Examen 20 + Foro 7",
                recursos: [
                    { tipo: 'pdf', titulo: 'PDF: Infinitivo Constructo', url: 'semanas/semana21/pdf/infconstructo.pdf', icono: '📄' },
                    { tipo: 'html', titulo: 'Forma del Infinitivo', url: 'semanas/semana21/html/forma.html', icono: 'לִשְׁמֹר' },
                    { tipo: 'html', titulo: 'Usos del Constructo', url: 'semanas/semana21/html/usos.html', icono: 'לְ' },
                    { tipo: 'html', titulo: 'Preposiciones con Infinitivo', url: 'semanas/semana21/html/preposiciones.html', icono: 'בִּשְׁמֹר' },
                    { tipo: 'html', titulo: 'Vocabulario Semana 21', url: 'semanas/semana21/html/vocabulario.html', icono: '📖' }
                ],
                juegos: [
                    { titulo: 'Infinitivo Constructo', url: 'semanas/semana21/juegos/infinitivo.html', icono: '🔧' }
                ]
            },
            
            22: {
                titulo: "Qal Infinitivo Absoluto",
                tema: "Infinitivo absoluto",
                fecha: "15 sep - 21 sep",
                evaluacion: "Examen 21",
                recursos: [
                    { tipo: 'pdf', titulo: 'PDF: Infinitivo Absoluto', url: 'semanas/semana22/pdf/infabsoluto.pdf', icono: '📄' },
                    { tipo: 'html', titulo: 'Forma del Absoluto', url: 'semanas/semana22/html/forma.html', icono: 'שָׁמֹר' },
                    { tipo: 'html', titulo: 'Usos del Absoluto', url: 'semanas/semana22/html/usos.html', icono: 'הָלֹךְ' },
                    { tipo: 'html', titulo: 'Infinitivo Absoluto + Verbo', url: 'semanas/semana22/html/compuesto.html', icono: 'מוֹת תָּמוּת' },
                    { tipo: 'html', titulo: 'Vocabulario Semana 22', url: 'semanas/semana22/html/vocabulario.html', icono: '📖' }
                ],
                juegos: [
                    { titulo: 'Infinitivo Absoluto', url: 'semanas/semana22/juegos/absoluto.html', icono: '⚡' }
                ]
            },
            
            23: {
                titulo: "Qal Participio",
                tema: "Participios activos y pasivos",
                fecha: "22 sep - 28 sep",
                evaluacion: "Examen 22 + Foro 8",
                recursos: [
                    { tipo: 'pdf', titulo: 'PDF: Participios', url: 'semanas/semana23/pdf/participios.pdf', icono: '📄' },
                    { tipo: 'html', titulo: 'Participio Activo', url: 'semanas/semana23/html/activo.html', icono: 'שֹׁמֵר' },
                    { tipo: 'html', titulo: 'Participio Pasivo', url: 'semanas/semana23/html/pasivo.html', icono: 'שָׁמוּר' },
                    { tipo: 'html', titulo: 'Usos del Participio', url: 'semanas/semana23/html/usos.html', icono: '📌' },
                    { tipo: 'html', titulo: 'Vocabulario Semana 23', url: 'semanas/semana23/html/vocabulario.html', icono: '📖' }
                ],
                juegos: [
                    { titulo: 'Participios Qal', url: 'semanas/semana23/juegos/participios.html', icono: '📌' }
                ]
            },
            
            24: {
                titulo: "Sintaxis de la Oración",
                tema: "Estructura oracional",
                fecha: "29 sep - 5 oct",
                evaluacion: "Examen 23",
                recursos: [
                    { tipo: 'pdf', titulo: 'PDF: Sintaxis', url: 'semanas/semana24/pdf/sintaxis.pdf', icono: '📄' },
                    { tipo: 'html', titulo: 'Orden de Palabras', url: 'semanas/semana24/html/orden.html', icono: '🔤' },
                    { tipo: 'html', titulo: 'Oraciones Verbales', url: 'semanas/semana24/html/verbales.html', icono: '📝' },
                    { tipo: 'html', titulo: 'Oraciones Nominales', url: 'semanas/semana24/html/nominales.html', icono: '⚖️' },
                    { tipo: 'html', titulo: 'Vocabulario Semana 24', url: 'semanas/semana24/html/vocabulario.html', icono: '📖' }
                ],
                juegos: [
                    { titulo: 'Sintaxis Básica', url: 'semanas/semana24/juegos/sintaxis.html', icono: '📐' }
                ]
            },
            
            // SECCIÓN 4: Tallos Derivados
            25: {
                titulo: "Niphal - Verbos Fuertes",
                tema: "Tallo Niphal fuerte",
                fecha: "6 oct - 12 oct",
                evaluacion: "Examen 24 + Foro 9",
                recursos: [
                    { tipo: 'pdf', titulo: 'PDF: Niphal', url: 'semanas/semana25/pdf/niphal.pdf', icono: '📄' },
                    { tipo: 'html', titulo: 'Introducción a Niphal', url: 'semanas/semana25/html/intro.html', icono: 'נִקְטַל' },
                    { tipo: 'html', titulo: 'Perfecto Niphal', url: 'semanas/semana25/html/perfecto.html', icono: 'נִשְׁמַר' },
                    { tipo: 'html', titulo: 'Imperfecto Niphal', url: 'semanas/semana25/html/imperfecto.html', icono: 'יִשָּׁמֵר' },
                    { tipo: 'html', titulo: 'Vocabulario Semana 25', url: 'semanas/semana25/html/vocabulario.html', icono: '📖' }
                ],
                juegos: [
                    { titulo: 'Niphal', url: 'semanas/semana25/juegos/niphal.html', icono: '🔄' }
                ]
            },
            
            26: {
                titulo: "Niphal - Verbos Débiles",
                tema: "Niphal en verbos débiles",
                fecha: "13 oct - 19 oct",
                evaluacion: "Examen 25",
                recursos: [
                    { tipo: 'pdf', titulo: 'PDF: Niphal Débiles', url: 'semanas/semana26/pdf/niphaldeb.pdf', icono: '📄' },
                    { tipo: 'html', titulo: 'Niphal I-Gutural', url: 'semanas/semana26/html/igutural.html', icono: 'נֶאֱמַר' },
                    { tipo: 'html', titulo: 'Niphal I-Nun', url: 'semanas/semana26/html/inun.html', icono: 'נִגַּשׁ' },
                    { tipo: 'html', titulo: 'Niphal III-ה', url: 'semanas/semana26/html/iiihe.html', icono: 'נִבְנָה' },
                    { tipo: 'html', titulo: 'Vocabulario Semana 26', url: 'semanas/semana26/html/vocabulario.html', icono: '📖' }
                ],
                juegos: [
                    { titulo: 'Niphal Débiles', url: 'semanas/semana26/juegos/niphaldeb.html', icono: '🍃' }
                ]
            },
            
            27: {
                titulo: "Piel - Verbos Fuertes",
                tema: "Tallo Piel fuerte",
                fecha: "20 oct - 26 oct",
                evaluacion: "Examen 26 + Foro 10",
                recursos: [
                    { tipo: 'pdf', titulo: 'PDF: Piel', url: 'semanas/semana27/pdf/piel.pdf', icono: '📄' },
                    { tipo: 'html', titulo: 'Introducción a Piel', url: 'semanas/semana27/html/intro.html', icono: 'קִטֵּל' },
                    { tipo: 'html', titulo: 'Perfecto Piel', url: 'semanas/semana27/html/perfecto.html', icono: 'דִּבֶּר' },
                    { tipo: 'html', titulo: 'Imperfecto Piel', url: 'semanas/semana27/html/imperfecto.html', icono: 'יְדַבֵּר' },
                    { tipo: 'html', titulo: 'Vocabulario Semana 27', url: 'semanas/semana27/html/vocabulario.html', icono: '📖' }
                ],
                juegos: [
                    { titulo: 'Piel', url: 'semanas/semana27/juegos/piel.html', icono: '🔨' }
                ]
            },
            
            28: {
                titulo: "Piel - Verbos Débiles",
                tema: "Piel en verbos débiles",
                fecha: "27 oct - 2 nov",
                evaluacion: "Examen 27",
                recursos: [
                    { tipo: 'pdf', titulo: 'PDF: Piel Débiles', url: 'semanas/semana28/pdf/pieldeb.pdf', icono: '📄' },
                    { tipo: 'html', titulo: 'Piel I-Gutural', url: 'semanas/semana28/html/igutural.html', icono: 'בֵּרַךְ' },
                    { tipo: 'html', titulo: 'Piel III-ה', url: 'semanas/semana28/html/iiihe.html', icono: 'כִּלָּה' },
                    { tipo: 'html', titulo: 'Piel Doblemente Débil', url: 'semanas/semana28/html/doble.html', icono: '⚡' },
                    { tipo: 'html', titulo: 'Vocabulario Semana 28', url: 'semanas/semana28/html/vocabulario.html', icono: '📖' }
                ],
                juegos: [
                    { titulo: 'Piel Débiles', url: 'semanas/semana28/juegos/pieldeb.html', icono: '🍂' }
                ]
            },
            
            29: {
                titulo: "Pual - Verbos Fuertes",
                tema: "Tallo Pual fuerte",
                fecha: "3 nov - 9 nov",
                evaluacion: "Examen 28",
                recursos: [
                    { tipo: 'pdf', titulo: 'PDF: Pual', url: 'semanas/semana29/pdf/pual.pdf', icono: '📄' },
                    { tipo: 'html', titulo: 'Introducción a Pual', url: 'semanas/semana29/html/intro.html', icono: 'קֻטַּל' },
                    { tipo: 'html', titulo: 'Perfecto Pual', url: 'semanas/semana29/html/perfecto.html', icono: 'בֻּקַּשׁ' },
                    { tipo: 'html', titulo: 'Imperfecto Pual', url: 'semanas/semana29/html/imperfecto.html', icono: 'יְבֻקַּשׁ' },
                    { tipo: 'html', titulo: 'Vocabulario Semana 29', url: 'semanas/semana29/html/vocabulario.html', icono: '📖' }
                ],
                juegos: [
                    { titulo: 'Pual', url: 'semanas/semana29/juegos/pual.html', icono: '🔇' }
                ]
            },
            
            30: {
                titulo: "Pual - Verbos Débiles",
                tema: "Pual en verbos débiles",
                fecha: "10 nov - 16 nov",
                evaluacion: "Examen 29 + Foro 11",
                recursos: [
                    { tipo: 'pdf', titulo: 'PDF: Pual Débiles', url: 'semanas/semana30/pdf/pualdeb.pdf', icono: '📄' },
                    { tipo: 'html', titulo: 'Pual III-ה', url: 'semanas/semana30/html/iiihe.html', icono: 'בֻּנְּתָה' },
                    { tipo: 'html', titulo: 'Pual con Guturales', url: 'semanas/semana30/html/guturales.html', icono: 'אֻמַּץ' },
                    { tipo: 'html', titulo: 'Vocabulario Semana 30', url: 'semanas/semana30/html/vocabulario.html', icono: '📖' }
                ],
                juegos: [
                    { titulo: 'Pual Débiles', url: 'semanas/semana30/juegos/pualdeb.html', icono: '🔇' }
                ]
            },
            
            31: {
                titulo: "Hiphil - Verbos Fuertes",
                tema: "Tallo Hiphil fuerte",
                fecha: "17 nov - 23 nov",
                evaluacion: "Examen 30",
                recursos: [
                    { tipo: 'pdf', titulo: 'PDF: Hiphil', url: 'semanas/semana31/pdf/hiphil.pdf', icono: '📄' },
                    { tipo: 'html', titulo: 'Introducción a Hiphil', url: 'semanas/semana31/html/intro.html', icono: 'הִקְטִיל' },
                    { tipo: 'html', titulo: 'Perfecto Hiphil', url: 'semanas/semana31/html/perfecto.html', icono: 'הִשְׁמִיד' },
                    { tipo: 'html', titulo: 'Imperfecto Hiphil', url: 'semanas/semana31/html/imperfecto.html', icono: 'יַשְׁמִיד' },
                    { tipo: 'html', titulo: 'Vocabulario Semana 31', url: 'semanas/semana31/html/vocabulario.html', icono: '📖' }
                ],
                juegos: [
                    { titulo: 'Hiphil', url: 'semanas/semana31/juegos/hiphil.html', icono: '⬆️' }
                ]
            },
            
            32: {
                titulo: "Hiphil - Verbos Débiles",
                tema: "Hiphil en verbos débiles",
                fecha: "24 nov - 30 nov",
                evaluacion: "Examen 31",
                recursos: [
                    { tipo: 'pdf', titulo: 'PDF: Hiphil Débiles', url: 'semanas/semana32/pdf/hiphildeb.pdf', icono: '📄' },
                    { tipo: 'html', titulo: 'Hiphil I-Gutural', url: 'semanas/semana32/html/igutural.html', icono: 'הֶעֱמִיד' },
                    { tipo: 'html', titulo: 'Hiphil I-Nun', url: 'semanas/semana32/html/inun.html', icono: 'הִפִּיל' },
                    { tipo: 'html', titulo: 'Hiphil III-ה', url: 'semanas/semana32/html/iiihe.html', icono: 'הִגְלָה' },
                    { tipo: 'html', titulo: 'Vocabulario Semana 32', url: 'semanas/semana32/html/vocabulario.html', icono: '📖' }
                ],
                juegos: [
                    { titulo: 'Hiphil Débiles', url: 'semanas/semana32/juegos/hiphildeb.html', icono: '⬆️' }
                ]
            },
            
            33: {
                titulo: "Hophal - Verbos Fuertes",
                tema: "Tallo Hophal fuerte",
                fecha: "1 dic - 7 dic",
                evaluacion: "Examen 32 + Foro 12",
                recursos: [
                    { tipo: 'pdf', titulo: 'PDF: Hophal', url: 'semanas/semana33/pdf/hophal.pdf', icono: '📄' },
                    { tipo: 'html', titulo: 'Introducción a Hophal', url: 'semanas/semana33/html/intro.html', icono: 'הָקְטַל' },
                    { tipo: 'html', titulo: 'Perfecto Hophal', url: 'semanas/semana33/html/perfecto.html', icono: 'הָשְׁמַד' },
                    { tipo: 'html', titulo: 'Imperfecto Hophal', url: 'semanas/semana33/html/imperfecto.html', icono: 'יָשְׁמַד' },
                    { tipo: 'html', titulo: 'Vocabulario Semana 33', url: 'semanas/semana33/html/vocabulario.html', icono: '📖' }
                ],
                juegos: [
                    { titulo: 'Hophal', url: 'semanas/semana33/juegos/hophal.html', icono: '⬇️' }
                ]
            },
            
            34: {
                titulo: "Hophal - Verbos Débiles",
                tema: "Hophal en verbos débiles",
                fecha: "8 dic - 14 dic",
                evaluacion: "Examen 33",
                recursos: [
                    { tipo: 'pdf', titulo: 'PDF: Hophal Débiles', url: 'semanas/semana34/pdf/hophaldeb.pdf', icono: '📄' },
                    { tipo: 'html', titulo: 'Hophal III-ה', url: 'semanas/semana34/html/iiihe.html', icono: 'הָגְלָה' },
                    { tipo: 'html', titulo: 'Hophal con Guturales', url: 'semanas/semana34/html/guturales.html', icono: 'הָעֳמַד' },
                    { tipo: 'html', titulo: 'Vocabulario Semana 34', url: 'semanas/semana34/html/vocabulario.html', icono: '📖' }
                ],
                juegos: [
                    { titulo: 'Hophal Débiles', url: 'semanas/semana34/juegos/hophaldeb.html', icono: '⬇️' }
                ]
            },
            
            35: {
                titulo: "Hithpael - Verbos Fuertes",
                tema: "Tallo Hithpael fuerte",
                fecha: "15 dic - 21 dic",
                evaluacion: "Examen 34",
                recursos: [
                    { tipo: 'pdf', titulo: 'PDF: Hithpael', url: 'semanas/semana35/pdf/hithpael.pdf', icono: '📄' },
                    { tipo: 'html', titulo: 'Introducción a Hithpael', url: 'semanas/semana35/html/intro.html', icono: 'הִתְקַטֵּל' },
                    { tipo: 'html', titulo: 'Perfecto Hithpael', url: 'semanas/semana35/html/perfecto.html', icono: 'הִתְהַלֵּךְ' },
                    { tipo: 'html', titulo: 'Imperfecto Hithpael', url: 'semanas/semana35/html/imperfecto.html', icono: 'יִתְהַלֵּךְ' },
                    { tipo: 'html', titulo: 'Vocabulario Semana 35', url: 'semanas/semana35/html/vocabulario.html', icono: '📖' }
                ],
                juegos: [
                    { titulo: 'Hithpael', url: 'semanas/semana35/juegos/hithpael.html', icono: '🔄' }
                ]
            },
            
            36: {
                titulo: "Hithpael - Verbos Débiles",
                tema: "Hithpael en verbos débiles",
                fecha: "22 dic - 28 dic",
                evaluacion: "Examen 35 + Foro 13",
                recursos: [
                    { tipo: 'pdf', titulo: 'PDF: Hithpael Débiles', url: 'semanas/semana36/pdf/hithpaeldeb.pdf', icono: '📄' },
                    { tipo: 'html', titulo: 'Hithpael con Silbantes', url: 'semanas/semana36/html/silbantes.html', icono: 'הִשְׁתַּחֲוָה' },
                    { tipo: 'html', titulo: 'Hithpael III-ה', url: 'semanas/semana36/html/iiihe.html', icono: 'הִתְגַּלָּה' },
                    { tipo: 'html', titulo: 'Vocabulario Semana 36', url: 'semanas/semana36/html/vocabulario.html', icono: '📖' }
                ],
                juegos: [
                    { titulo: 'Hithpael Débiles', url: 'semanas/semana36/juegos/hithpaeldeb.html', icono: '🔄' }
                ]
            },
            
            // Vacaciones de fin de año
            37: {
                titulo: "EXAMEN FINAL",
                tema: "Repaso temas 20-36",
                fecha: "5 ene - 11 ene",
                evaluacion: "Examen Final",
                recursos: [
                    { tipo: 'pdf', titulo: 'Guía de Repaso Final', url: 'semanas/semana37/pdf/repasofinal.pdf', icono: '📚' },
                    { tipo: 'html', titulo: 'Resumen Tallos Derivados', url: 'semanas/semana37/html/tallos.html', icono: '📝' },
                    { tipo: 'html', titulo: 'Tabla Comparativa', url: 'semanas/semana37/html/comparativa.html', icono: '📊' },
                    { tipo: 'html', titulo: 'Ejercicios de Traducción', url: 'semanas/semana37/html/ejercicios.html', icono: '✍️' },
                    { tipo: 'examen', titulo: 'Examen Final', url: 'https://forms.gle/final', icono: '📝' }
                ],
                juegos: [
                    { titulo: 'Repaso General', url: 'semanas/semana37/juegos/repaso.html', icono: '🔄' }
                ]
            },
            
            38: {
                titulo: "¿A dónde vamos ahora?",
                tema: "Continuidad en el estudio",
                fecha: "12 ene - 19 ene",
                evaluacion: "Orientaciones finales",
                recursos: [
                    { tipo: 'pdf', titulo: 'Guía de Continuidad', url: 'semanas/semana38/pdf/continuidad.pdf', icono: '📄' },
                    { tipo: 'html', titulo: 'Recursos Avanzados', url: 'semanas/semana38/html/recursos.html', icono: '🔍' },
                    { tipo: 'html', titulo: 'Lecturas Recomendadas', url: 'semanas/semana38/html/lecturas.html', icono: '📚' },
                    { tipo: 'html', titulo: 'Próximos Pasos', url: 'semanas/semana38/html/proximos.html', icono: '👣' },
                    { tipo: 'html', titulo: 'Certificado y Cierre', url: 'semanas/semana38/html/cierre.html', icono: '🎓' }
                ],
                juegos: [
                    { titulo: 'Evaluación del Curso', url: 'semanas/semana38/juegos/evaluacion.html', icono: '📋' }
                ]
            }
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
            fecha: "",
            evaluacion: "",
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
                        ${contenido.fecha ? `<p class="text-muted"><small><i class="fas fa-calendar"></i> ${contenido.fecha}</small></p>` : ''}
                        ${contenido.evaluacion ? `<p class="text-muted"><small><i class="fas fa-clipboard-list"></i> ${contenido.evaluacion}</small></p>` : ''}
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
            if (siguienteSemana <= 38) {
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