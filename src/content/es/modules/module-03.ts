import { module03 as en } from '@/src/content/en/modules/module-03';
import { draftSpanishModule as d } from '../localize';

const drafted = d(en, { title: 'Resultados de la AOS y motivación', shortTitle: 'Resultados y motivación', description: 'Comprenda las asociaciones de la AOS durante el embarazo y cree próximos pasos realistas para PAP.' }, {
  'm3-05': { title: 'Resultados del embarazo asociados con la AOS', body: [
    'Las investigaciones han encontrado asociaciones entre la AOS durante el embarazo y afecciones como la diabetes gestacional, la presión arterial alta y la preeclampsia.',
    'Estos resultados ocurren con mayor frecuencia en algunos grupos con AOS, pero la AOS no es necesariamente su única causa, y una asociación no predice lo que ocurrirá en un embarazo individual.',
    'Su equipo de atención prenatal puede explicarle las pruebas de detección y su riesgo personal.',
  ] },
  'm3-q5': { title: 'Resultados del embarazo', body: [
    '¿Qué afecciones se han observado con mayor frecuencia en algunos grupos de personas embarazadas con AOS?',
    'Preeclampsia', 'Alergias alimentarias', 'Intolerancia a la lactosa', 'Presión arterial alta', 'Diabetes gestacional',
    'Las investigaciones han encontrado asociaciones a nivel de grupo con la preeclampsia, la presión arterial alta y la glucosa elevada o diabetes gestacional. Estas asociaciones no predicen un resultado individual.',
  ] },
  'm3-ai1': { title: 'Describa una barrera de PAP', body: ['¿Qué hace que PAP sea más difícil para usted ahora?'], placeholder: 'Describa lo que ocurre con sus propias palabras.' },
  'm3-ai2': { title: 'Cree un próximo paso realista', body: ['¿Qué cambio relacionado con PAP o el sueño le gustaría hacer?'] },
});

const feedbackById = {
  'm3-q1': 'La AOS sin tratar puede coexistir con afecciones como diabetes, presión arterial alta y obesidad que se asocian con una mayor probabilidad de parto por cesárea. Esto no predice un resultado individual.',
  'm3-q3': 'La obstrucción repetida de la vía respiratoria puede implicar cambios de oxígeno y estrés fisiológico asociados con tensión cardiovascular. Esto no significa que cada persona con AOS tendrá una complicación cardíaca.',
  'm3-q4': 'Los estudios han observado una asociación entre los trastornos respiratorios del sueño durante el embarazo y un menor peso del recién nacido. Es una asociación a nivel de grupo, no una predicción individual.',
};

export const module03 = {
  ...drafted,
  screens: drafted.screens.map((screen) => {
    if (screen.id === 'm3-01' && screen.type === 'content') return { ...screen, paragraphs: [
      'En este módulo, aprenderá sobre los resultados de salud que las investigaciones han asociado con la AOS sin tratar durante el embarazo y por qué es importante tratarla.',
      'Las asociaciones describen patrones entre grupos; no predicen lo que ocurrirá con usted o su bebé. Su equipo de atención puede explicarle su riesgo personal.',
    ] };
    if (screen.id === 'm3-recap' && screen.type === 'summary') return { ...screen, title: 'Gracias por completar este módulo', keyPoints: [
      'Espero que hayas aprendido que la AOS sin tratar durante el embarazo se ha asociado con parto por cesárea, tensión cardiovascular, menor peso del recién nacido, diabetes gestacional, presión arterial alta y preeclampsia.',
      'PAP trata la obstrucción de la vía respiratoria durante el sueño. Sus equipos de atención prenatal y del sueño pueden ayudarle a comprender su riesgo y tratamiento.',
    ] };
    if (screen.id === 'm3-04' && screen.type === 'content') return { ...screen, paragraphs: [
      'Una máquina de presión positiva en la vía respiratoria (PAP) suministra aire presurizado que ayuda a mantener abierta la vía respiratoria y reducir los episodios de obstrucción durante el sueño.',
      'Usar PAP según la indicación trata la AOS. Pida ayuda a su equipo de atención del sueño o prenatal si las molestias u otra barrera dificultan el tratamiento.',
    ] };
    if (screen.id === 'm3-q5' && screen.type === 'multiSelect') return { ...screen, instructions: 'Seleccione todas las que correspondan.', questionFeedback: {
      ...screen.questionFeedback, correctSummary: '¡Correcto!', incorrectSummary: 'Bueno, no del todo…', incorrectExplanation: 'Algunas opciones no son asociaciones establecidas entre el embarazo y la AOS. Piense en las afecciones de presión arterial y metabólicas que se explicaron en la lección, y vuelva a intentarlo.',
    } };
    if (!(screen.id in feedbackById) || (screen.type !== 'singleChoice' && screen.type !== 'multiSelect')) return screen;
    return { ...screen, questionFeedback: {
      ...screen.questionFeedback,
      correctSummary: '¡Correcto!', incorrectSummary: 'Bueno, no del todo…',
      generalExplanation: feedbackById[screen.id as keyof typeof feedbackById],
      ...(screen.id === 'm3-q4' ? { incorrectExplanation: 'La relación observada se refiere al crecimiento del recién nacido, pero no predice lo que ocurrirá en un embarazo individual. Revise las opciones y vuelva a intentarlo.' } : {}),
      ...(screen.id === 'm3-q3' ? { optionExplanations: {
        c1: 'Los resfriados son causados por virus contagiosos; no se sabe que la AOS sin tratar aumente de manera significativa el riesgo de infección a corto plazo.',
        c3: 'La intoxicación alimentaria proviene de alimentos contaminados; no se sabe que la AOS sin tratar aumente ese riesgo de manera significativa.',
        c4: 'Las hemorragias nasales suelen relacionarse con aire seco, irritación o algunos medicamentos; no se sabe que la AOS sin tratar aumente su probabilidad de manera significativa.',
      } } : {}),
    } };
  }),
};
