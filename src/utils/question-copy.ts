// Question titles and instructions that only repeat boilerplate (for example "Knowledge check 6: ...")
// are hidden in the lesson, in every language. Pure so it can be unit tested.
export const normalizeQuestionCopy = (value: string) => value.toLocaleLowerCase().replace(/[¿?¡!():,;.…]+/g, ' ').replace(/\s+/g, ' ').trim();
export const boilerplateQuestionCopy = /^(knowledge check|question time|check your understanding|comprehension check(?: \d+)?(?: .*)?|comprobaci[oó]n de conocimientos(?: \d+)?(?: .*)?|comprobar comprensi[oó]n|verificaci[oó]n de comprensi[oó]n(?: \d+)?(?: .*)?|select the right answer|seleccione la respuesta correcta|true or false|verdadero o falso)( this question is for learning not a comprehension check| esta pregunta es para aprender no es una comprobaci[oó]n de conocimientos)?$/;

export const isBoilerplateQuestionCopy = (value: string) => boilerplateQuestionCopy.test(normalizeQuestionCopy(value));
