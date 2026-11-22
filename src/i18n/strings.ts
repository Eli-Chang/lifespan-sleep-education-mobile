/**
 * Interface strings for every supported locale. Lesson content lives in src/content; this file holds only
 * app chrome (buttons, headings, status notices). Every locale must define every key: the `Record<UiKey,
 * string>` type makes a missing key a compile error, and tests/locale-infrastructure.test.ts checks it again
 * at runtime, so i18next's English fallback is never reached for a shipped locale.
 *
 * Keep this file free of React and i18next imports so Node tests can load it directly.
 */
import type { SupportedLocale } from './locales';
import { ptBRCatalog } from '../content/translations/pt-BR';
import { htCatalog } from '../content/translations/ht';

const en = {
  home:'Home', settings:'Settings', appName:'Sleep Education', backToModules:'Back to Modules', backToModule:'Back to Module',
  welcome:'Learn at your pace. Your progress stays on this device.', start:'Start', continue:'Continue', review:'Review module', allModulesComplete:'All modules complete', reviewModules:'Review any module below.', notStarted:'Not started', inProgress:'In progress', completed:'Completed',
  previous:'Previous', next:'Next', submit:'Check answer', retry:'Try again', about:'About & disclaimer', changeAnswers:'Change answers', submitAnswers:'Check {{count}} answers', language:'Language', narration:'Narration', narrationRate:'Narration speed',
  reset:'Reset progress', resetTitle:'Reset all progress?', resetBody:'This removes lesson progress and saved answers from this device. Language and narration preferences will remain.', cancel:'Cancel', confirmReset:'Reset', stop:'Stop', replay:'Replay', educationalDisclaimer:'This app provides general educational information and does not replace advice from your healthcare professional. Talk with your healthcare team about questions related to your symptoms, diagnosis, pregnancy, or treatment.', loading:'Loading your learning plan…', answerSaved:'Answer submitted. You can continue.', correct:'Correct!', notQuite:'Well, not quite…', choiceNotesRetry:'Read the note under each answer you picked, then change your answers and try again.', choiceNotesMissing:'Everything you picked is right, and at least one correct answer is still missing. Change your answers and try again.', changeAnswer:'Change answer',
  reflectionSaved:'Response saved.', personalReflection:'PERSONAL REFLECTION', reflectionMultiInstruction:'Select any that apply. This response is never graded.', reflectionSingleInstruction:'Select one response. This response is never graded.', saveResponse:'Save response', saveResponses:'Save {{count}} responses', correctChoice:'Correct choice', incorrectChoice:'Selected, but not correct', missedCorrectChoice:'Correct choice not selected', close:'Close', pitch:'Pitch', decrease:'Decrease', increase:'Increase', reflectionPlaceholder:'Write a private reflection (optional).', reflectionPrivacy:'This stays on your device.', reflectionDiscussBody:'Your reflection stays on this device.', saveReflection:'Save reflection', savedLocally:'Saved locally on this device.', editReflection:'Edit response', saveFailed:'Could not save. Your draft is still here.', retrySave:'Retry save', skipOptional:'Skip', completeModule:'Complete module', moduleComplete:'Module complete', accessibility:'Accessibility', reducedMotion:'Reduce motion', reducedMotionBody:'Reduces lesson transition motion.', completionSaved:'Your module progress is saved on this device.', continueToNextModule:'Continue to {{module}}', Inventory:'Inventory',
  aboutPrivacyBody:'Lesson progress, reflections, and preferences stay on this device. Written lessons work offline; narration uses installed system voices.',
  // Home
  switchToThisLanguage:'Switch to English', homeTitle:'Start by understanding sleep.', continueLearningKicker:'CONTINUE LEARNING', startLearningKicker:'START LEARNING',
  moduleNumber:'Module {{number}}', moduleKicker:'MODULE {{number}}', moduleInline:'Module', stepWithTitle:'Step {{number}} · {{title}}', startWith:'Start with {{module}}',
  stepsUnit:'steps', modulesUnit:'modules', overallProgress:'Overall progress', learningPath:'Your learning path',
  // Settings
  settingsSubtitle:'Preferences saved on this device.', languageAvailable:'English is available.', switchKeepsProgress:'You can switch without losing progress.',
  narrationHelp:'Uses a compatible voice installed on your device.', narrationSpeedLabel:'narration speed', narrationPitchLabel:'narration pitch',
  narrationVoiceNote:'Higher-quality en-US voices are preferred when available.', learningData:'Learning data', learningDataBody:'Clear saved progress and answers on this device. Your preferences will be kept.',
  languageStatusNote:'English is the source language of these lessons. The lessons have not completed clinical review.',
  // About
  aboutSubtitle:'An education app with no accounts, ads, or tracking.', disclaimerHeading:'Educational disclaimer', privacyHeading:'Privacy & offline use',
  contentStatusHeading:'Content status', contentStatusBody:'This is a development build for review. The lessons have not completed clinical review.',
  translationStatusBody:'English is the source language. No translation has been professionally reviewed yet.',
  // Module overview and completion
  moduleNotFound:'Module not found', reviewModuleAction:'Review Module', percentComplete:'{{percent}}% complete', reviewModuleKicker:'REVIEW MODULE', nextUpKicker:'NEXT UP',
  stepOf:'Step {{current}} of {{total}}', moduleProgress:'Module progress', inThisModule:'Module steps', upNext:'Up next',
  moduleOverviewNote:'You can leave, go back, and revisit any step. Incorrect answers never block progress.',
  stepKindLesson:'Lesson', stepKindQuestion:'Question', stepKindReflection:'Reflection', stepKindRecap:'Recap',
  moduleCompleteKicker:'MODULE {{number}} COMPLETE', upNextKicker:'UP NEXT',
  // Lesson
  lessonNotFound:'Lesson not found', listen:'Listen', voiceUnavailableTitle:'Narration voice unavailable',
  voiceUnavailableBody:'Check the device language or speech settings. You can continue reading the lesson.',
  listenNoVoice:'Listen: no English voice is available on this device',
  listItems:'{{count}}-item list', orderedListItems:'{{count}}-item ordered list', keyPoint:'KEY POINT', checkUnderstanding:'CHECK YOUR UNDERSTANDING',
  supportingSourceNhlbi:'Supporting source: NHLBI Sleep Apnea', supportingSourcePaper:'Supporting source: {{citation}}', supportingSourcePaperLabel:'Supporting source: {{citation}}. Opens the paper on PubMed.', watchOnYouTube:'Watch on YouTube',
};

export type UiKey = keyof typeof en;

const es: Record<UiKey, string> = {
  home:'Inicio', settings:'Ajustes', appName:'Educación del sueño', backToModules:'Volver a módulos', backToModule:'Volver al módulo', welcome:'Aprenda a su ritmo. Su progreso permanece en este dispositivo.', start:'Comenzar', continue:'Continuar', review:'Repasar módulo', allModulesComplete:'Todos los módulos están completos', reviewModules:'Repase cualquier módulo a continuación.', notStarted:'No iniciado', inProgress:'En curso', completed:'Completado', previous:'Anterior', next:'Siguiente', submit:'Comprobar respuesta', retry:'Intentar de nuevo', about:'Información y aviso', changeAnswers:'Cambiar respuestas', submitAnswers:'Comprobar {{count}} respuestas', language:'Idioma', narration:'Narración', narrationRate:'Velocidad de narración', reset:'Restablecer progreso', resetTitle:'¿Restablecer todo el progreso?', resetBody:'Esto elimina el progreso y las respuestas guardadas de este dispositivo. El idioma y la narración se conservan.', cancel:'Cancelar', confirmReset:'Restablecer', stop:'Detener', replay:'Repetir', educationalDisclaimer:'Esta aplicación ofrece información educativa general y no reemplaza el consejo de su profesional de salud. Hable con su equipo médico sobre preguntas relacionadas con sus síntomas, diagnóstico, embarazo o tratamiento.', loading:'Cargando su plan de aprendizaje…', answerSaved:'Respuesta enviada. Puede continuar.', correct:'¡Correcto!', notQuite:'Bueno, no del todo…', choiceNotesRetry:'Lea la nota debajo de cada respuesta que eligió, luego cambie sus respuestas e intente de nuevo.', choiceNotesMissing:'Todo lo que eligió es correcto, y todavía falta al menos una respuesta correcta. Cambie sus respuestas e intente de nuevo.', changeAnswer:'Cambiar respuesta', reflectionSaved:'Respuesta guardada.', personalReflection:'REFLEXIÓN PERSONAL', reflectionMultiInstruction:'Seleccione todas las opciones que correspondan. Esta respuesta nunca se califica.', reflectionSingleInstruction:'Seleccione una respuesta. Esta respuesta nunca se califica.', saveResponse:'Guardar respuesta', saveResponses:'Guardar {{count}} respuestas', correctChoice:'Opción correcta', incorrectChoice:'Seleccionada, pero no correcta', missedCorrectChoice:'Opción correcta no seleccionada', close:'Cerrar', pitch:'Tono', decrease:'Disminuir', increase:'Aumentar', reflectionPlaceholder:'Escriba una reflexión privada (opcional).', reflectionPrivacy:'Esto permanece en su dispositivo.', reflectionDiscussBody:'Su reflexión permanece en este dispositivo.', saveReflection:'Guardar reflexión', savedLocally:'Guardada localmente en este dispositivo.', editReflection:'Editar respuesta', saveFailed:'No se pudo guardar. El borrador sigue aquí.', retrySave:'Reintentar guardado', skipOptional:'Omitir', completeModule:'Completar módulo', moduleComplete:'Módulo completado', accessibility:'Accesibilidad', reducedMotion:'Reducir movimiento', reducedMotionBody:'Reduce el movimiento de transición de las lecciones.', completionSaved:'El progreso de su módulo se guarda en este dispositivo.', continueToNextModule:'Continuar a {{module}}', Inventory:'Inventario', aboutPrivacyBody:'El progreso, las reflexiones y las preferencias de las lecciones permanecen en este dispositivo. Las lecciones escritas funcionan sin conexión; la narración usa las voces instaladas.',
  switchToThisLanguage:'Cambiar a español', homeTitle:'Empiece por comprender su sueño.', continueLearningKicker:'CONTINUAR APRENDIENDO', startLearningKicker:'EMPEZAR A APRENDER',
  moduleNumber:'Módulo {{number}}', moduleKicker:'MÓDULO {{number}}', moduleInline:'módulo', stepWithTitle:'Paso {{number}} · {{title}}', startWith:'Comience con {{module}}',
  stepsUnit:'pasos', modulesUnit:'módulos', overallProgress:'Progreso total', learningPath:'Su ruta de aprendizaje',
  settingsSubtitle:'Preferencias guardadas en este dispositivo.', languageAvailable:'Español está disponible.', switchKeepsProgress:'Puede cambiar sin perder su progreso.',
  narrationHelp:'Usa una voz en español instalada en su dispositivo.', narrationSpeedLabel:'velocidad de narración', narrationPitchLabel:'tono de narración',
  narrationVoiceNote:'La narración no usará una voz inglesa como alternativa.', learningData:'Datos de aprendizaje', learningDataBody:'Borre su progreso y respuestas guardadas en este dispositivo. Sus preferencias se conservarán.',
  languageStatusNote:'La traducción al español es un borrador: todavía no la ha revisado un traductor profesional. Las lecciones no han completado la revisión clínica.',
  aboutSubtitle:'Aplicación educativa sin cuentas, anuncios ni seguimiento.', disclaimerHeading:'Aviso educativo', privacyHeading:'Privacidad y conexión',
  contentStatusHeading:'Estado del contenido', contentStatusBody:'Esta es una versión de desarrollo para revisión. Las lecciones no han completado la revisión clínica.',
  translationStatusBody:'La traducción al español es un borrador que todavía no ha revisado un traductor profesional.',
  moduleNotFound:'Módulo no encontrado', reviewModuleAction:'Repasar módulo', percentComplete:'{{percent}}% completado', reviewModuleKicker:'REPASAR MÓDULO', nextUpKicker:'SIGUIENTE PASO',
  stepOf:'Paso {{current}} de {{total}}', moduleProgress:'Progreso del módulo', inThisModule:'Pasos del módulo', upNext:'Siguiente',
  moduleOverviewNote:'Puede salir, volver atrás y repasar cualquier paso. Las respuestas incorrectas no bloquean el progreso.',
  stepKindLesson:'Lección', stepKindQuestion:'Pregunta', stepKindReflection:'Reflexión', stepKindRecap:'Resumen',
  moduleCompleteKicker:'MÓDULO {{number}} COMPLETADO', upNextKicker:'SIGUIENTE',
  lessonNotFound:'Lección no encontrada', listen:'Escuchar', voiceUnavailableTitle:'Voz no disponible',
  voiceUnavailableBody:'Revise los ajustes de idioma o voz del dispositivo. Puede continuar leyendo la lección.',
  listenNoVoice:'Escuchar: no hay una voz en español disponible en este dispositivo',
  listItems:'Lista de {{count}} elementos', orderedListItems:'Lista ordenada de {{count}} elementos', keyPoint:'PUNTO CLAVE', checkUnderstanding:'COMPROBAR COMPRENSIÓN',
  supportingSourceNhlbi:'Fuente de apoyo: NHLBI sobre la apnea del sueño', supportingSourcePaper:'Fuente de apoyo: {{citation}}', supportingSourcePaperLabel:'Fuente de apoyo: {{citation}}. Abre el artículo en PubMed.', watchOnYouTube:'Ver en YouTube',
};

// Portuguese and Haitian Creole interface strings live in their generated catalogs with the lesson text.
export const UI_STRINGS: Record<SupportedLocale, Record<UiKey, string>> = { en, es, 'pt-BR': ptBRCatalog.ui, ht: htCatalog.ui };
export const UI_KEYS = Object.keys(en) as UiKey[];
