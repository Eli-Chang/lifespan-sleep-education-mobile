import { draftSpanishModule } from '@/src/content/es/localize';
import { module09 as en } from '@/src/content/en/modules/module-09';

// Spanish draft (usted) of display Module 10, translated by Claude from the 2026-11-22 English rewrite.
// Awaiting native and clinical review. Lines that start with "•" render as a bullet list.
const checkInstructions = 'Seleccione todas las que correspondan. Pista: hay 2 respuestas correctas.';

export const module09 = draftSpanishModule(en, {
  title: 'Resolución de problemas con PAP',
  shortTitle: 'Resolución de problemas con PAP',
  description: 'Consejos prácticos para problemas comunes con PAP.',
}, {
  'm9-01': { title: 'Resolución de problemas con PAP', body: [
    'A continuación encontrará nuestros consejos para problemas comunes con PAP. Si una preocupación no desaparece, hable con su profesional de salud o con su equipo de equipos médicos.',
    'Revise un aspecto a la vez para saber qué le ayudó:',
    '• El ajuste de la mascarilla\n• El tubo y las conexiones\n• La humidificación\n• La comodidad de la nariz\n• Los datos del dispositivo',
    'Los cambios pequeños hechos con el apoyo de su equipo son más fáciles de evaluar que cambiar varias cosas a la vez.',
    'Esta aplicación no puede diagnosticar un problema ni indicar una configuración. Si un problema le sigue impidiendo usar PAP, pida ayuda al profesional que se lo indicó o a su equipo de equipos médicos. Busque atención médica de inmediato si tiene síntomas graves o que empeoran rápido.',
  ], keyPoints: [
    'Siga las instrucciones del fabricante para su mascarilla y su dispositivo.',
    'Anote cuándo empieza el problema, cómo se siente y qué ha probado ya.',
  ] },
  'm9-02': { title: 'Mi mascarilla se siente demasiado apretada o incómoda', body: [
    'Su mascarilla no debería tener que estar dolorosamente apretada ni dejarle marcas duraderas en la cara. Ajustar las correas puede ayudar sin perder el sello. Si solo sella cuando está muy apretada, pregunte por otro estilo de mascarilla.',
    'Con la máquina encendida, vuelva a colocar la mascarilla con suavidad y ajuste una correa a la vez. La meta es un sello que se mantenga en su lugar sin doler. Apretarla demasiado puede empeorar los puntos de presión y las fugas.',
    'Si la mascarilla sigue siendo incómoda, pida a su equipo de equipos médicos que revise:',
    '• El tamaño\n• El cojín\n• El arnés\n• El estilo de mascarilla',
    'Cada estilo de mascarilla toca la cara en lugares distintos, así que otro podría resultarle más cómodo.',
  ], keyPoints: [
    'Ajuste la mascarilla con el aire encendido y haga el cambio más pequeño que mejore el sello.',
    'Pida un nuevo ajuste si la mascarilla solo funciona cuando está dolorosamente apretada.',
  ] },
  'm9-03': { title: 'Mi mascarilla tiene fugas o se mueve', body: [
    'Puede que oiga o sienta aire que se escapa alrededor de la mascarilla. Una fuga puede significar que el aire destinado a sus vías respiratorias se está escapando, así que revise el ajuste y las correas.',
    'Tener los ojos rojos o adoloridos al despertar puede ser una señal de que el aire se escapa por la parte superior de la mascarilla. Si la fuga o la irritación de los ojos sigue, quizás necesite otro estilo de mascarilla.',
    'Para corregir una fuga con la máquina encendida:',
    '• Separe un poco la mascarilla de la cara y deje que vuelva a sellar\n• Ajuste el arnés poco a poco\n• Revise que el cojín no esté doblado\n• Asegúrese de que el tubo y los conectores estén bien encajados',
    'Para evitar que el tubo jale, páselo por encima del pecho o use un soporte para el tubo. Si duerme de lado, una almohada con espacio para la mascarilla puede ayudar. Las fugas o la irritación de los ojos que se repiten son un buen motivo para revisar el ajuste de su mascarilla.',
  ], keyPoints: [
    'Un buen sello no debería requerir tapar las ventilaciones de la mascarilla ni apretarla hasta que le duela la piel.',
    'Avise a su equipo de PAP si las fugas, los ojos rojos o una mascarilla que se mueve se repiten.',
  ] },
  'm9-04': { title: 'Hay agua en mi mascarilla u oigo un silbido', body: [
    'Se puede acumular agua (condensación) cuando hay demasiada humidificación o una gran diferencia de temperatura entre el tubo y el aire a su alrededor. Use los controles del humidificador y del calentamiento del tubo según las indicaciones.',
    'Si se acumula agua, pruebe una de estas opciones, cambiando una configuración a la vez y siguiendo el manual de su dispositivo:',
    '• Bajar la configuración del humidificador con calor\n• Calentar la habitación\n• Cubrir el tubo para mantenerlo caliente\n• Usar un tubo con calefacción si su dispositivo lo permite',
    'Un silbido puede venir de una fuga pequeña, una conexión suelta o una ventilación o un cojín que hay que revisar. No tape las ventilaciones que dejan salir el aire a propósito. Si un sonido extraño no desaparece, pida a su equipo de equipos médicos que lo revise.',
  ], keyPoints: [
    'El agua en el tubo suele llamarse "lluvia" (rainout). Puede mejorar cuando la temperatura del tubo y la de la habitación son más parecidas.',
    'Use solo las opciones de humidificación y de tubo hechas para su máquina.',
  ] },
  'm9-q1': { title: 'Comprobación de conocimientos', instructions: checkInstructions, body: [
    'Se despierta con los ojos rojos y adoloridos y nota aire que sopla cerca del borde superior de su mascarilla. ¿Qué debe hacer?',
    'Bajar la presión por una noche y ver si sus ojos se sienten mejor.',
    'Volver a colocar la mascarilla y ajustar las correas con la máquina encendida.',
    'Subir el humidificador para aliviar los ojos antes de revisar el ajuste.',
    'Preguntar por otro estilo de mascarilla si la fuga sigue ocurriendo.',
    'Tapar las ventilaciones de la mascarilla para que salga menos aire cerca de los ojos.',
    'El aire cerca de la parte superior de la mascarilla puede indicar una fuga. Revise primero el ajuste y pregunte por otro estilo de mascarilla si sigue pasando.',
  ] },
  'm9-05': { title: 'Tengo la piel irritada', body: [
    'La irritación de la piel que no desaparece puede deberse a cómo la mascarilla toca su cara, cómo le queda o de qué está hecha. Si continúa o cree que podría estar teniendo una reacción, hable con su profesional de salud o con su equipo de equipos médicos sobre otra opción de mascarilla.',
    'Asegúrese de que la mascarilla esté firme pero no dolorosamente apretada. Limpie y seque su cara y las piezas de la mascarilla según las indicaciones del fabricante, porque la grasa de la piel o los residuos pueden afectar el sello.',
    'Si el roce continúa, pregunte por:',
    '• Otro tamaño u otro estilo\n• Un forro para la mascarilla\n• Otro cojín aprobado',
    'Una llaga abierta, un enrojecimiento que se extiende o una reacción que empeora necesita que un profesional de salud la revise pronto.',
  ], keyPoints: [
    'Una lesión en la piel que no sana es un problema de ajuste o de cuidado de la piel que hay que revisar, no algo que deba aguantar.',
    'Consulte al fabricante o a su equipo de atención antes de ponerse cualquier producto nuevo en la mascarilla o en la piel.',
  ] },
  'm9-06': { title: 'Siento la nariz o la boca secas', body: [
    'El flujo de aire de PAP puede resecar. La solución salina nasal y la humidificación de PAP pueden hacerla sentir más cómoda, pero demasiada humedad puede causar exceso de agua en la mascarilla. Hable con su equipo de salud o de equipos médicos sobre la sequedad que no desaparece.',
    'Primero revise si hay una fuga por la mascarilla o por la boca, sobre todo si usa una mascarilla nasal o almohadillas nasales. Si su dispositivo tiene humidificador, pregunte si una configuración de calor más alta o un tubo con calefacción son adecuados para usted. Trate de encontrar un equilibrio entre la comodidad y la acumulación de agua.',
    'El aerosol o el gel de solución salina puede ayudar a algunas personas con la nariz seca, y los productos de saliva artificial pueden ayudar a algunas personas con la boca seca. Pregunte a su equipo de atención antes de añadir una mentonera o cambiar el tipo de mascarilla.',
  ], keyPoints: [
    'La sequedad puede ser una señal de una fuga, no solo de que necesita más humedad.',
    'Cambie la humidificación poco a poco y anote si la sequedad o la acumulación de agua mejora.',
  ] },
  'm9-07': { title: 'Mi boca se abre mientras duermo', body: [
    'Si su boca se abre a menudo mientras duerme, puede contribuir a la boca seca y a otros problemas con PAP. Algunas personas podrían necesitar una mascarilla facial completa, y el equipo de salud que le indicó PAP puede ayudarle a resolverlo.',
    'Con una mascarilla nasal o almohadillas nasales, la boca abierta puede dejar escapar el aire y resecarle la boca. La nariz tapada puede hacer que esto pase más, así que mencione la congestión cuando hable de esto con su equipo.',
    'Pregunte a su equipo de atención si una mentonera o una mascarilla facial completa ajustada por un profesional clínico es adecuada para usted. La mejor mascarilla depende del ajuste, la comodidad al respirar, las fugas y su plan de tratamiento.',
  ], keyPoints: [
    'Una fuga por la boca es un motivo para revisar su mascarilla, no para apretar todas las correas.',
    'Pida a su equipo de PAP que le ayude a elegir y ajustar cualquier mascarilla nueva.',
  ] },
  'm9-08': { title: 'Tengo congestión, alergias o irritación nasal', body: [
    'Si tiene la nariz tapada o irritada, estos pasos pueden ayudar:',
    '• Mantenga limpios los filtros de su PAP, y límpielos o cámbielos según el calendario del manual de su dispositivo\n• Use las opciones de humidificador y calor que correspondan a su dispositivo y a su comodidad\n• Use agua destilada según las indicaciones\n• Reduzca el polvo, el humo, las fragancias y otros irritantes donde duerme',
    'La humidificación con calor o el tubo con calefacción pueden hacerla sentir más cómoda. El aerosol o el gel de solución salina puede ayudar con la irritación nasal. Si la congestión no desaparece, pregunte a su profesional de salud si un aerosol nasal es adecuado para usted, sobre todo durante el embarazo.',
    'También puede preguntar si otra mascarilla sería más fácil de usar mientras tiene la nariz tapada.',
  ], keyPoints: [
    'Las decisiones sobre medicamentos le corresponden a su profesional de salud. Esta aplicación no los elige ni indica dosis.',
    'La congestión que no desaparece, los sangrados nasales o una respiración que empeora necesitan que un profesional clínico los revise.',
  ] },
  'm9-q2': { title: 'Comprobación de conocimientos', instructions: checkInstructions, body: [
    'Usa una mascarilla nasal y siente la boca seca todas las mañanas. ¿Cuáles de estas opciones podrían ayudar?',
    'Revisar si el aire se escapa por la boca mientras duerme.',
    'Apretar todas las correas de la mascarilla al máximo.',
    'Apagar el humidificador para que se acumule menos agua dentro de la mascarilla.',
    'No usar PAP las noches en que sienta la boca más seca.',
    'Preguntar a su equipo por una mentonera o una mascarilla facial completa.',
    'La boca seca con una mascarilla nasal puede deberse al aire que se escapa por la boca. Revise si hay una fuga por la boca y pregunte a su equipo de atención por una mentonera o una mascarilla facial completa.',
  ] },
  'm9-09': { title: 'Eructo mucho o me siento hinchada', body: [
    'Los eructos o la hinchazón pueden ser una señal de que está tragando aire. Algunos dispositivos PAP tienen una función de rampa que baja la presión mientras se duerme. Hable con su profesional de salud sobre los cambios de presión en lugar de hacerlos usted misma.',
    'Cambiar la posición para dormir o la forma de acomodar las almohadas puede ayudar a algunas personas. Si su dispositivo tiene rampa, pregunte a su equipo de atención cómo usarla.',
    'La hinchazón que no desaparece, que duele o que empeora necesita una revisión pronta de su mascarilla, la presión y el modo del dispositivo. Su profesional clínico puede considerar una función de comodidad para exhalar, auto-PAP o PAP binivel cuando sea apropiado. No son cambios para hacer por su cuenta.',
  ], keyPoints: [
    'No siga subiendo o bajando la presión indicada para perseguir un síntoma.',
    'Comuníquese con su equipo de atención si la hinchazón duele, se repite o le impide usar PAP.',
  ] },
  'm9-10': { title: 'El aire se siente demasiado frío', body: [
    'El aire de su PAP puede sentirse frío. Cambiar la temperatura de la habitación o usar humidificación con calor, si la tiene, puede ayudar.',
    'También puede preguntar por un tubo con calefacción o una funda aislante para el tubo. Pasar el tubo por encima del pecho o debajo de una manta puede mantenerlo más caliente, si las instrucciones de su dispositivo lo permiten.',
    'Si el aire frío viene con una fuga, un silbido o la nariz irritada, revise el sello y las conexiones de la mascarilla, y pida a su equipo de equipos médicos que revise su configuración.',
  ], keyPoints: [
    'Use solo tubos con calefacción u opciones de humidificación hechas para su dispositivo.',
    'Los cambios para su comodidad no reemplazan una revisión del ajuste cuando los síntomas siguen.',
  ] },
  'm9-11': { title: 'Limpiar el equipo de PAP', body: [
    'Revise siempre primero el manual de su máquina. En general, la limpieza incluye jabón suave, un buen enjuague y dejar secar al aire las piezas de la mascarilla y del humidificador, además de limpiar el tubo cada semana y hacer una limpieza más profunda de vez en cuando. Use agua destilada en el humidificador según las indicaciones.',
    'Esta es una rutina sencilla:',
    '• Cada mañana, vacíe la cámara del humidificador\n• Antes de acostarse, vuelva a llenarla con agua destilada fresca\n• Limpie o lave el cojín de la mascarilla como indica su manual\n• Lave las piezas de la mascarilla, el tubo y el arnés con agua tibia y jabón suave según el calendario de su dispositivo, y luego enjuáguelos y déjelos secar al aire lejos del calor directo o del sol',
    'Limpie el exterior de la máquina según las indicaciones, y limpie o cambie los filtros y otros suministros según el calendario del fabricante.',
    'Nunca meta la máquina en agua, y no use lejía, alcohol, limpiadores fuertes, toallitas de limpieza para el hogar ni aparatos de limpieza que no estén aprobados para equipos de PAP.',
    'Las piezas y los materiales varían, así que las instrucciones del fabricante van antes que cualquier calendario general que encuentre en internet.',
  ], keyPoints: [
    'El agua destilada fresca y una rutina constante de vaciar y volver a llenar ayudan a reducir la acumulación en la cámara del humidificador.',
    'Pregunte a su equipo de equipos médicos cuando una pieza esté dañada o le toque cambiarla.',
  ] },
  'm9-q3': { title: 'Comprobación de conocimientos', instructions: checkInstructions, body: [
    'Ha estado eructando mucho y además ya le toca limpiar su equipo de PAP. ¿Cuáles de estas opciones son buenas?',
    'Preguntar a su equipo si la rampa podría ayudar con la hinchazón.',
    'Bajar la presión usted misma hasta que dejen los eructos.',
    'Lavar la máquina misma con agua tibia y jabón una vez a la semana.',
    'Seguir primero el manual de su máquina al limpiar su equipo.',
    'Remojar el tubo en lejía diluida para asegurarse de que quede bien limpio.',
    'La función de rampa y su equipo de atención pueden ayudar con la hinchazón, y el manual de su máquina debe guiar cómo limpiarla.',
  ] },
});
