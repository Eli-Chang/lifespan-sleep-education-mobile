import { draftSpanishModule } from '@/src/content/es/localize';
import { module08 as en } from '@/src/content/en/modules/module-08';

// Spanish draft (usted) of display Module 9, translated by Claude from the 2026-11-22 English rewrite.
// Awaiting native and clinical review. Lines that start with "•" render as a bullet list.
const checkInstructions = 'Seleccione todas las que correspondan. Pista: hay 2 respuestas correctas.';

export const module08 = draftSpanishModule(en, {
  title: 'Cómo empezar con PAP',
  shortTitle: 'Cómo empezar con PAP',
  description: 'Acostúmbrese a PAP paso a paso y apóyese en su equipo de atención para las preguntas sobre el tratamiento.',
}, {
  'm8-01': { title: 'Cómo empezar con PAP', body: [
    '¡Felicidades por dar este paso tan importante para tratar su AOS! Acostumbrarse a PAP puede tomar tiempo, y eso está bien. Avance por los pasos de práctica de este módulo a su propio ritmo.',
    'Su PAP viene con una mascarilla (también llamada interfaz) y una configuración elegida para usted. Al principio, la meta es sentirse cómoda con la mascarilla y el flujo de aire para poder usarlos mientras duerme. No necesita una noche perfecta desde el primer día.',
    'Mantenga a su equipo de atención al tanto. Ellos pueden:',
    '• Revisar cómo le queda la mascarilla\n• Revisar los datos de su dispositivo\n• Decidir si un cambio para su comodidad tiene sentido para usted',
    'No cambie por su cuenta la presión indicada. Comuníquese con el profesional de salud que le indicó PAP cuando tenga preguntas o surjan problemas.',
  ], keyPoints: [
    'Las sesiones cortas de práctica que puede repetir son un avance real. Una noche difícil no significa que PAP haya fallado.',
    'Anote lo que le resulta difícil para llevar una pregunta concreta a su equipo de PAP o de atención del sueño.',
  ] },
  'm8-02': { title: 'Empiece con una mascarilla cómoda', body: [
    'Primero, busque una mascarilla y un arnés que le resulten cómodos. Las mascarillas se adaptan a distintas caras y formas de dormir, así que quizás tenga que probar más de una, y eso es normal.',
    'Concéntrese en la comodidad antes de preocuparse por usar la máquina. Con la máquina encendida, ajuste las correas solo lo necesario para crear un sello. La mascarilla debe sentirse firme, no dolorosamente apretada.',
    'Si la mascarilla solo sella cuando las correas están muy apretadas, pida a su equipo de equipos médicos que revise el tamaño, el cojín o el estilo. Los estilos más comunes se ajustan de forma distinta:',
    '• Almohadillas nasales\n• Mascarilla nasal\n• Mascarilla facial completa',
  ], keyPoints: [
    'Ajuste la mascarilla con el aire encendido y haga un pequeño cambio a la vez.',
    'Pida otro tamaño u otro estilo si la mascarilla solo sella cuando la aprieta demasiado.',
  ] },
  'm8-03': { title: 'Practique mientras está despierta', body: [
    'Empiece usando PAP mientras está despierta. Siéntese derecha en un lugar cómodo durante alrededor de una hora al día por varios días. ¡Leer o ver televisión al mismo tiempo puede ayudar!',
    'Encienda la máquina antes de ponerse la mascarilla y fíjese en cómo se siente el flujo de aire. Una actividad tranquila le da tiempo para practicar la respiración con la mascarilla sin tratar de dormirse al mismo tiempo.',
    'Si empieza a sentir que es demasiado, tome un descanso y vuelva más tarde para una sesión más corta. Repetir una práctica que puede manejar ayuda más que aguantar el malestar.',
  ], keyPoints: [
    'Elija algo que disfrute hacer para que la práctica sea una parte predecible de su día.',
    'Aumente el tiempo de práctica poco a poco a medida que la mascarilla y el flujo de aire le resulten más familiares.',
  ] },
  'm8-04': { title: 'Practique mientras descansa', body: [
    'Después, use PAP acostada durante un descanso o una siesta planificados. Apoye la cabeza y cierre los ojos. No tiene que dormirse para que esta práctica le ayude.',
    'Durante un descanso corto y planificado, fíjese en qué siente como el mayor obstáculo, por ejemplo:',
    '• Su posición para dormir\n• La presión del aire\n• El sello de la mascarilla\n• El tubo',
    'Sujete el tubo para que no jale la mascarilla cuando se mueva. Si se siente incómoda, tome un descanso y pruebe una sesión más corta en otro momento. Si le sigue costando, pida orientación a su equipo de equipos médicos o de salud.',
  ], keyPoints: [
    'Practique en la posición y con la preparación que piensa usar para dormir.',
    'Mantenga el tubo sujeto para que al moverse no saque la mascarilla de su lugar.',
  ] },
  'm8-q1': { title: 'Comprobación de conocimientos', instructions: checkInstructions, body: [
    'Ya puede usar PAP cómodamente alrededor de una hora mientras está despierta, pero una noche entera todavía le parece mucho. ¿Qué podría hacer ahora?',
    'Subir un poco la presión para que el aire se sienta más natural.',
    'Practicar con PAP acostada durante un descanso o una siesta planificados.',
    'Saltarse la práctica en descanso e intentar una noche completa de inmediato.',
    'Dejar PAP una semana y luego empezar de nuevo desde el principio.',
    'Hacer sesiones cortas y sumar tiempo cuando le resulten más fáciles.',
    'Gane comodidad paso a paso. Practique mientras descansa y mantenga sesiones lo bastante cortas para repetirlas.',
  ] },
  'm8-05': { title: 'Incluya PAP en su rutina para dormir', body: [
    'Cuando practicar despierta y en descanso le resulte cómodo, ¡es hora de llevar PAP a la cama! Empiece usándolo durante la primera parte de su sueño nocturno.',
    'Facilítese la preparación. Tenga la mascarilla, el tubo y la máquina listos antes de sentir sueño, y coloque el tubo donde no jale la mascarilla.',
    'Si todavía le cuesta dormirse, pregunte a su equipo de atención del sueño si su dispositivo tiene una función de rampa o autorrampa adecuada para usted. La rampa baja la presión inicial mientras se duerme. Revise estas configuraciones con su equipo en lugar de cambiarlas por su cuenta.',
  ], keyPoints: [
    'Empiece con la primera parte de la noche y avance desde ahí.',
    'Pregunte a su equipo de atención por la rampa o la autorrampa en lugar de cambiar la presión usted misma.',
  ] },
  'm8-06': { title: 'Avance hacia la noche completa', body: [
    'Después de practicar durante la primera parte de la noche, trabaje para usar PAP toda la noche. Puede ir a su propio ritmo.',
    'Si se quita la mascarilla durante la noche, vuelva a ponérsela cuando esté lo bastante despierta para hacerlo con seguridad. Anote qué la llevó a quitársela, por ejemplo:',
    '• Incomodidad\n• Sequedad\n• Fugas\n• Congestión\n• Ruido\n• Presión',
    'Su dispositivo también registra sus horas de uso, las fugas y la presión, lo que ayuda a su equipo de atención a ver patrones. Use esta información para empezar una conversación con su equipo, no para cambiar la configuración por su cuenta.',
  ], keyPoints: [
    'Lleve pronto a su equipo de atención los problemas que se repiten. El apoyo puede facilitar el siguiente paso.',
    'Las notas sobre lo que le molesta ayudan a su equipo a encontrar la solución adecuada.',
  ] },
  'm8-07': { title: '¿Cómo sé si PAP me está ayudando?', body: [
    'Lleve un registro de sus síntomas antes y después de empezar PAP, por ejemplo:',
    '• Somnolencia\n• Siestas durante el día\n• Insomnio (dificultad para dormirse o para seguir dormida)',
    'Algunos síntomas pueden mejorar rápido, mientras que otros pueden tardar semanas.',
    'Su dispositivo PAP también recoge datos de tratamiento y de uso que su equipo de salud puede revisar. Sus notas muestran cómo se siente, y el dispositivo muestra el uso, las fugas y la información del tratamiento. Si sigue con sueño o sus síntomas empeoran, hable con su profesional de salud en lugar de cambiar la presión usted misma.',
  ], keyPoints: [
    'Anote cómo se siente y las noches u horas en que usó PAP.',
    'Una cita de seguimiento puede detectar problemas de mascarilla, fugas, comodidad o configuración que sus síntomas por sí solos quizás no muestren.',
  ] },
  'm8-q2': { title: 'Comprobación de conocimientos', instructions: checkInstructions, body: [
    'Ya empezó a usar PAP durante la primera parte de la noche. ¿Cuáles de estas opciones pueden ayudarle a avanzar hasta usarlo toda la noche?',
    'Usar PAP solo las noches en que se sienta muy cansada o con mucho sueño.',
    'Volver a ponerse la mascarilla si se despierta y ve que se le salió.',
    'Bajar la presión las noches en que le cueste dormirse.',
    'Preguntar a su equipo del sueño si la rampa le conviene.',
    'Esperar a sentirse mejor antes de empezar a registrar los síntomas.',
    'Siga avanzando a su propio ritmo. Vuelva a ponerse la mascarilla si se le sale y pregunte a su equipo por la función de rampa.',
  ] },
  'm8-08': { title: '¿Qué pasa si PAP me resulta incómodo al principio?', body: [
    'No se sorprenda si acostumbrarse a PAP le toma un tiempo. ¡Es normal! Lograr que la mascarilla quede bien, sentir la presión del aire e incluir PAP en su rutina para dormir toman tiempo. Hable con su profesional de salud o con su equipo de equipos médicos sobre los problemas que no desaparecen.',
    'Trate de nombrar el problema exacto, porque cada uno puede tener una solución diferente:',
    '• Presión de la mascarilla\n• Fugas\n• Sequedad\n• Congestión\n• Ruido\n• Sensación de encierro (claustrofobia)\n• Dificultad para exhalar',
    'Pregunte si alguna de estas opciones está disponible y es adecuada para su dispositivo:',
    '• Otro tamaño u otro estilo de mascarilla\n• Humidificación con calor\n• Rampa o autorrampa\n• Una función de comodidad que facilite exhalar',
    'Su equipo de atención toma estas decisiones con usted. Si un problema le sigue impidiendo usar PAP, comuníquese con ellos de inmediato en lugar de abandonar el tratamiento o cambiar la configuración sin orientación.',
  ], keyPoints: [
    'Cuéntele a su equipo cuándo empieza el problema y cómo se siente. Los detalles les ayudan a resolverlo.',
    'La incomodidad al principio no significa que PAP no pueda funcionar para usted.',
  ] },
  'm8-09': { title: '¿Cuándo debo usar PAP?', body: [
    'Use PAP cada vez que duerma, incluido:',
    '• El sueño nocturno\n• Las siestas\n• Cuando viaja',
    'Usarlo cada vez que duerme le da al tratamiento la mejor oportunidad de apoyar su respiración todo el tiempo que está dormida. Si no puede usarlo en un período de sueño determinado, pregunte a su equipo de salud cómo manejarlo de forma segura.',
  ], keyPoints: [
    'Haga que la mascarilla y la máquina sean parte de su rutina habitual para dormir, no solo algo que usa cuando se siente cansada.',
    'Pida ayuda a su equipo de atención con cualquier cosa que le dificulte usarlo en las siestas o al dormir fuera de casa.',
  ] },
  'm8-10': { title: '¿Quién ajusta la configuración de mi PAP?', body: [
    'Su profesional de salud recomienda su configuración inicial y puede ajustarla según cómo se sienta y los datos de su PAP. Por favor, no cambie por su cuenta la presión indicada.',
    'En las citas de seguimiento, comparta sus notas de síntomas y pida a su equipo que revise sus horas de uso, las fugas y otros datos del tratamiento. Su equipo puede decidir que un cambio de mascarilla o una función de comodidad ayudará más que un cambio de presión.',
    'Use solo las funciones de comodidad y las configuraciones que le hayan enseñado a usar. Si el aire se siente demasiado fuerte, demasiado débil o le cuesta exhalar contra él, comuníquese con el profesional que le indicó PAP o con su equipo de equipos médicos.',
  ], keyPoints: [
    'La configuración de su PAP es parte de su tratamiento indicado, así que deje los cambios a su equipo de atención.',
    'Sus notas y los datos del dispositivo ayudan a su equipo de atención a hacer un ajuste seguro.',
  ] },
  'm8-q3': { title: 'Comprobación de conocimientos', instructions: checkInstructions, body: [
    'Ha usado PAP durante unos días, pero todavía se siente cansada. Se pregunta si su presión está demasiado baja. ¿Qué debe hacer?',
    'Subir un poco la presión cada noche hasta sentirse descansada.',
    'Tomarse un descanso de PAP hasta que se le pase el cansancio.',
    'Seguir usando PAP cada vez que duerma, incluidas las siestas.',
    'Apretar las correas de la mascarilla para que llegue más aire a sus vías respiratorias.',
    'Llevar sus notas de síntomas y los datos de PAP a su profesional de salud.',
    'Siga usando PAP y lleve sus notas y datos a su profesional de salud, quien decide si hace falta cambiar la configuración.',
  ] },
});
