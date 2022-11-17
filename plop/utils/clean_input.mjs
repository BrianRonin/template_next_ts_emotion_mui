export default function cleanInput(
  input,
  regex_start,
  regex_end,
) {
  let resolve = input
  let start_indice
  let end_indice
  if (start_indice)
    for (let i = 0; i <= input.length; i++) {
      if (input[i].match(new RegExp(regex_start))) {
        resolve = input.substring(i)
      }
    }
  if (end_indice)
    for (let i = 0; i <= input.length; i++) {
      if (input[i].match(new RegExp(regex_end))) {
        resolve = input.substring(i)
      }
    }
  return resolve
}
