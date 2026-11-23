import { module03 as en } from '@/src/content/en/modules/module-03';
import type { LessonScreen } from '@/src/types/content';
import { draftSpanishModule as d } from '../localize';

const CHECK = 'Comprobación de conocimientos';
const narrate = (...parts: (string | undefined)[]) => parts.filter(Boolean).join(' ').replace(/•\s*/g, '');

const drafted = d(en, { title: 'Resultados de la AOS y motivación', shortTitle: 'Resultados y motivación', description: 'Comprenda las asociaciones de la AOS durante el embarazo y cree próximos pasos realistas para PAP.' }, {
  'm3-05': { title: 'Resultados del embarazo asociados con la AOS', body: [
    'Las investigaciones han encontrado asociaciones entre la AOS durante el embarazo y afecciones como la diabetes gestacional, la presión arterial alta y la preeclampsia.',
    '• La diabetes gestacional es azúcar alta en la sangre que comienza durante el embarazo.\n• La presión arterial alta durante el embarazo exige un esfuerzo adicional a su corazón y a sus vasos sanguíneos.\n• La preeclampsia es presión arterial alta durante el embarazo junto con señales de que órganos como los riñones o el hígado están afectados.',
    'Estos resultados ocurren con mayor frecuencia en algunos grupos con AOS, pero la AOS no es necesariamente su única causa, y una asociación no predice lo que ocurrirá en un embarazo individual.',
    'Su equipo de atención prenatal puede explicarle las pruebas de detección y su riesgo personal.',
  ] },
  'm3-q5': { title: CHECK, instructions: 'Seleccione todas las que correspondan.', body: [
    '¿Qué afecciones se han observado con mayor frecuencia en algunos grupos de personas embarazadas con AOS?',
    'Preeclampsia', 'Infección urinaria', 'Hemorroides', 'Presión arterial alta', 'Diabetes gestacional',
    'Las investigaciones han encontrado asociaciones a nivel de grupo con la preeclampsia, la presión arterial alta y la diabetes gestacional. Estas asociaciones no predicen un resultado individual.',
  ] },
  'm3-06': { title: 'Otras afecciones de salud y el parto por cesárea', body: [
    'Un parto por cesárea es cuando su bebé nace a través de un corte quirúrgico en el abdomen y el útero, en lugar de nacer por la vagina.',
    'Las personas embarazadas con AOS a menudo tienen otras afecciones de salud al mismo tiempo. Los médicos las llaman afecciones coexistentes (comorbilidades). En un gran estudio de Estados Unidos con más de 18 millones de partos en hospitales, las personas con AOS tenían más probabilidades de tener también:',
    '• Obesidad\n• Asma\n• Presión arterial alta que comenzó antes del embarazo',
    'Afecciones como estas pueden aumentar la probabilidad de un parto por cesárea. En el mismo estudio, los partos por cesárea fueron más comunes en las personas con AOS. Este es un patrón entre grupos. No significa que usted vaya a necesitar una cesárea.',
  ] },
  'm3-07': { title: 'Lo que la AOS sin tratar puede hacerle a su corazón', body: [
    'Cuando su vía respiratoria se cierra durante el sueño, su nivel de oxígeno baja y su cuerpo libera hormonas del estrés que aumentan su frecuencia cardíaca y su presión arterial. Con la AOS sin tratar, esto puede ocurrir muchas veces por noche, lo que exige un esfuerzo adicional a su corazón y a sus vasos sanguíneos.',
    'Un estudio nacional de más de 1.5 millones de partos encontró que las personas con AOS tenían un mayor riesgo de problemas cardíacos poco frecuentes pero graves, como la miocardiopatía y la insuficiencia cardíaca.',
    '• La miocardiopatía es un debilitamiento del músculo del corazón.\n• La insuficiencia cardíaca significa que el corazón no puede bombear sangre tan bien como su cuerpo lo necesita.',
    'Estos problemas son poco frecuentes, y la mayoría de las personas con AOS no los presenta.',
  ] },
  'm3-q6': { title: CHECK, instructions: 'Seleccione la respuesta correcta.', body: [
    '¿Qué hace una máquina PAP mientras usted duerme?',
    'Le da oxígeno adicional de un tanque', 'Envía pequeños impulsos eléctricos a su lengua', 'Usa presión de aire para mantener abierta su vía respiratoria', 'Administra un medicamento suave por la mascarilla',
    'PAP usa el aire de su habitación, con una presión suave, para mantener abierta su vía respiratoria mientras duerme.',
  ] },
  'm3-ai1': { title: 'Describa una barrera de PAP', body: ['¿Qué hace que PAP sea más difícil para usted ahora?'], placeholder: 'Describa lo que ocurre con sus propias palabras.' },
  'm3-ai2': { title: 'Cree un próximo paso realista', body: ['¿Qué cambio relacionado con PAP o el sueño le gustaría hacer?'] },
});

const cesareanStatement = 'Las embarazadas con AOS no tratada tienen más probabilidades de presentar enfermedades coexistentes, como la obesidad o la presión arterial alta, que aumentan el riesgo de parto por cesárea.';
const q3Prompt = 'Las embarazadas con AOS no tratada durante su ingreso hospitalario para el parto tienen un riesgo significativamente mayor de:';
const q3Choices = ['tener apendicitis', 'tener problemas cardíacos', 'tener una infección urinaria', 'tener hemorroides'];

const overrides: Record<string, (screen: LessonScreen) => LessonScreen> = {
  'm3-01': (screen) => {
    const paragraphs = [
      'En este módulo, aprenderá sobre los resultados de salud que las investigaciones han relacionado con la apnea obstructiva del sueño (AOS) sin tratar durante el embarazo, y por qué tratar la AOS es importante para usted y su bebé.',
      'Aprenderá sobre:',
      '• Las afecciones del embarazo relacionadas con la AOS\n• La relación entre la AOS y el parto por cesárea\n• Lo que la AOS sin tratar puede hacerle a su corazón\n• Cómo ayuda una máquina PAP',
      'Estas relaciones describen patrones en grupos grandes de personas. No predicen lo que ocurrirá con usted o su bebé. Su equipo de atención puede explicarle su riesgo personal.',
    ];
    return { ...screen, paragraphs, narrationText: narrate(...paragraphs) } as LessonScreen;
  },
  'm3-q1': (screen) => ({ ...screen, title: CHECK, prompt: '¿Verdadero o falso?', instructions: undefined, contextParagraphs: [cesareanStatement],
    narrationText: narrate('¿Verdadero o falso?', cesareanStatement, 'Verdadero', 'Falso'),
    questionFeedback: { ...('questionFeedback' in screen ? screen.questionFeedback : {}), correctSummary: '¡Correcto!', incorrectSummary: 'Bueno, no del todo…',
      generalExplanation: 'La AOS sin tratar a menudo se presenta junto con afecciones como la obesidad y la presión arterial alta, y esas afecciones se relacionan con una mayor probabilidad de parto por cesárea. Esto no predice un resultado individual.' } }) as LessonScreen,
  'm3-q3': (screen) => ({ ...screen, title: CHECK, prompt: q3Prompt, instructions: 'Seleccione la respuesta correcta.',
    choices: q3Choices.map((label, index) => ({ id: `c${index + 1}`, label })),
    narrationText: narrate(q3Prompt, 'Seleccione la respuesta correcta.', ...q3Choices),
    questionFeedback: { ...('questionFeedback' in screen ? screen.questionFeedback : {}), correctSummary: '¡Correcto!', incorrectSummary: 'Bueno, no del todo…',
      generalExplanation: 'Grandes estudios de partos en hospitales encontraron que las personas con AOS tenían un mayor riesgo de problemas cardíacos, como la miocardiopatía y la insuficiencia cardíaca. Estos problemas son poco frecuentes, y esto no significa que toda persona con AOS vaya a tener uno.' } }) as LessonScreen,
  'm3-q5': (screen) => ({ ...screen, questionFeedback: { ...('questionFeedback' in screen ? screen.questionFeedback : {}), correctSummary: '¡Correcto!', incorrectSummary: 'Bueno, no del todo…',
    incorrectExplanation: 'Algunas opciones son comunes en el embarazo, pero no se han relacionado con la AOS. Piense en las afecciones de presión arterial y de azúcar en la sangre de la lección, y vuelva a intentarlo.' } }) as LessonScreen,
  'm3-q6': (screen) => ({ ...screen, questionFeedback: { ...('questionFeedback' in screen ? screen.questionFeedback : {}), correctSummary: '¡Correcto!', incorrectSummary: 'Bueno, no del todo…' } }) as LessonScreen,
  'm3-04': (screen) => {
    const paragraphs = [
      'Una máquina de presión positiva en la vía respiratoria (PAP) suministra aire presurizado que ayuda a mantener abierta la vía respiratoria y reducir los episodios de obstrucción durante el sueño.',
      'PAP no le da oxígeno adicional ni medicamentos. Toma el aire de su habitación y lo empuja suavemente a través de una mascarilla. La presión del aire mantiene abierta su vía respiratoria, como si fuera una férula hecha de aire.',
      'Cuando su vía respiratoria se mantiene abierta, su nivel de oxígeno se mantiene más estable durante la noche y su cuerpo tiene menos respuestas de estrés durante el sueño.',
      'Usar PAP según la indicación trata la AOS. Pida ayuda a su equipo de atención del sueño o prenatal si las molestias u otra barrera dificultan el tratamiento.',
    ];
    return { ...screen, paragraphs, narrationText: narrate(...paragraphs) } as LessonScreen;
  },
  'm3-recap': (screen) => {
    const keyPoints = [
      'Espero que haya aprendido que la AOS sin tratar durante el embarazo se ha relacionado con la preeclampsia, la presión arterial alta, la diabetes gestacional, el parto por cesárea y problemas cardíacos poco frecuentes, como la miocardiopatía y la insuficiencia cardíaca.',
      'PAP usa presión de aire para mantener abierta su vía respiratoria durante el sueño. Sus equipos de atención prenatal y del sueño pueden ayudarle a comprender su riesgo personal y su tratamiento.',
    ];
    return { ...screen, title: 'Gracias por completar este módulo', keyPoints, narrationText: narrate('Gracias por completar este módulo', ...keyPoints) } as LessonScreen;
  },
};

export const module03 = {
  ...drafted,
  screens: drafted.screens.map((screen) => overrides[screen.id]?.(screen) ?? screen),
};
