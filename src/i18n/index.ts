import { createInstance } from 'i18next';
import { initReactI18next } from 'react-i18next';

const i18n = createInstance();

export const ui = {
  en: { translation: {
    home: 'Home', progress: 'Progress', settings: 'Settings', appName: 'Sleep Education', back: 'Back', you: 'You', askLesson: 'Ask about this lesson',
    welcome: 'Learn at your pace. Your progress stays on this device.',
    start: 'Start', continue: 'Continue', review: 'Review module',
    notStarted: 'Not started', inProgress: 'In progress', completed: 'Completed',
    overallProgress: 'Overall progress', steps: 'steps', previous: 'Previous', next: 'Next',
    submit: 'Submit answer', retry: 'Try again', selected: 'selected', about: 'About & disclaimer',
    language: 'Language', narration: 'Narration', narrationRate: 'Narration speed',
    reset: 'Reset progress', resetTitle: 'Reset all progress?', resetBody: 'This removes lesson progress and saved answers from this device. Language and narration preferences will remain.',
    cancel: 'Cancel', confirmReset: 'Reset', play: 'Play', stop: 'Stop', replay: 'Replay',
    educationalDisclaimer: 'This app provides general educational information and does not replace advice from your healthcare professional. Talk with your healthcare team about questions related to your symptoms, diagnosis, pregnancy, or treatment.',
    loading: 'Loading your learning plan…', answerSaved: 'Answer submitted. You can continue.',
    correct: 'Correct.', notQuite: 'Not quite.', changeAnswer: 'Change answer',
    reflectionSaved: 'Response saved.', correctChoice: 'Correct choice',
    incorrectChoice: 'Selected, but not correct', missedCorrectChoice: 'Correct choice not selected',
    aiTools: 'AI learning tools', aiOptionalFeedback: 'Optional educational feedback. Normal lessons work without AI.', revokeAiConsent: 'Revoke AI consent',
    chatPrivacyNotice: 'Do not enter names, emails, phone numbers, dates, addresses, record numbers, clinician names, or appointment dates. Automated checks cannot guarantee removal of identifying information.',
    close: 'Close', closeLessonChat: 'Close lesson chat', reflectTutor: 'Reflect with tutor', openAiActivity: 'Open AI activity', openOptionalAiActivity: 'Open optional AI activity', yourResponse: 'Your response', pitch: 'Pitch', decrease: 'Decrease', increase: 'Increase', aiFeatures: 'AI features', imageSource: 'Image source',
    chatPrivacyWarning: 'Please remove identifying details before sending. This check is supplementary and cannot guarantee removal of health information.',
    chatComplete: 'You’ve covered the main idea. Continue the lesson when you’re ready.', chatSend: 'Send', chatPlaceholder: 'Write your response. Avoid names or identifying details.', chatConsent: 'I understand and consent', chatTutor: 'Learning conversation', chatFeedback: 'Educational feedback', chatContinue: 'Continue lesson', chatLimit: 'You can continue this lesson without AI.', chatPrivacy: 'This optional tutor uses only approved lesson content. Your message is sent only after consent and is not saved as an AI conversation on this device.', chatThinking: 'Thinking…', chatEmpty: 'Share what you understand or what you would like to ask.', chatUnavailable: 'AI feedback is temporarily unavailable. Your lesson and saved progress are still available.',
  }},
  es: { translation: {
    home: 'Inicio', progress: 'Progreso', settings: 'Ajustes', appName: 'Educación del sueño', back: 'Atrás', you: 'Usted', askLesson: 'Preguntar sobre esta lección',
    welcome: 'Aprenda a su ritmo. Su progreso permanece en este dispositivo.',
    start: 'Comenzar', continue: 'Continuar', review: 'Repasar módulo',
    notStarted: 'No iniciado', inProgress: 'En curso', completed: 'Completado',
    overallProgress: 'Progreso total', steps: 'pasos', previous: 'Anterior', next: 'Siguiente',
    submit: 'Enviar respuesta', retry: 'Intentar de nuevo', selected: 'seleccionado', about: 'Información y aviso',
    language: 'Idioma', narration: 'Narración', narrationRate: 'Velocidad de narración',
    reset: 'Restablecer progreso', resetTitle: '¿Restablecer todo el progreso?', resetBody: 'Esto elimina el progreso y las respuestas guardadas de este dispositivo. El idioma y la narración se conservan.',
    cancel: 'Cancelar', confirmReset: 'Restablecer', play: 'Reproducir', stop: 'Detener', replay: 'Repetir',
    educationalDisclaimer: 'Esta aplicación ofrece información educativa general y no reemplaza el consejo de su profesional de salud. Hable con su equipo médico sobre preguntas relacionadas con sus síntomas, diagnóstico, embarazo o tratamiento.',
    loading: 'Cargando su plan de aprendizaje…', answerSaved: 'Respuesta enviada. Puede continuar.',
    correct: 'Correcto.', notQuite: 'Aún no.', changeAnswer: 'Cambiar respuesta',
    reflectionSaved: 'Respuesta guardada.', correctChoice: 'Opción correcta',
    incorrectChoice: 'Seleccionada, pero no correcta', missedCorrectChoice: 'Opción correcta no seleccionada',
    aiTools: 'Herramientas educativas de IA', aiOptionalFeedback: 'Orientación educativa opcional. Las lecciones funcionan sin IA.', revokeAiConsent: 'Revocar consentimiento de IA',
    chatPrivacyNotice: 'No escriba nombres, correos, teléfonos, fechas, direcciones, números de expediente, nombres de profesionales ni citas. Las comprobaciones automáticas no garantizan eliminar información identificativa.',
    close: 'Cerrar', closeLessonChat: 'Cerrar el chat de la lección', reflectTutor: 'Reflexionar con el tutor', openAiActivity: 'Abrir actividad de IA', openOptionalAiActivity: 'Abrir actividad opcional de IA', yourResponse: 'Su respuesta', pitch: 'Tono', decrease: 'Disminuir', increase: 'Aumentar', aiFeatures: 'Funciones de IA', imageSource: 'Fuente de imagen',
    chatPrivacyWarning: 'Quite los datos identificativos antes de enviar. Esta comprobación es complementaria y no garantiza eliminar información de salud.',
    chatComplete: 'Ha cubierto la idea principal. Continúe la lección cuando esté listo.', chatSend: 'Enviar', chatPlaceholder: 'Escriba su respuesta. Evite nombres o datos identificativos.', chatConsent: 'Entiendo y doy mi consentimiento', chatTutor: 'Conversación educativa', chatFeedback: 'Orientación educativa', chatContinue: 'Continuar la lección', chatLimit: 'Puede continuar esta lección sin usar IA.', chatPrivacy: 'Este tutor opcional usa solo contenido aprobado. Su mensaje se envía después del consentimiento y no se guarda como conversación de IA en este dispositivo.', chatThinking: 'Pensando…', chatEmpty: 'Comparta lo que entiende o lo que desea preguntar.', chatUnavailable: 'La orientación de IA no está disponible temporalmente. Su lección y progreso guardado siguen disponibles.',
  }},
} as const;

void i18n.use(initReactI18next).init({
  resources: ui,
  lng: 'en',
  fallbackLng: 'en',
  interpolation: { escapeValue: false },
  compatibilityJSON: 'v4',
});

if (typeof document !== 'undefined') {
  document.documentElement.lang = i18n.language;
  i18n.on('languageChanged', (language) => { document.documentElement.lang = language; });
}

export default i18n;
