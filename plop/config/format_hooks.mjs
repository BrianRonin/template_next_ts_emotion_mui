export default function format_hooks(obj) {
  const output = { ...obj }
  const keys = Object.keys(output)
  Object.keys(output).forEach((k) => {
    const isMany = Array.isArray(output[k])
    isMany
      ? output[k].map((input, index) => {
          keys.forEach((key) => {
            const regex = new RegExp(`{{ ...${key} }}`, 'g')
            const isMany = Array.isArray(output[key])
            output[k][index].match(regex) &&
              (output[k][index] = input.replace(
                regex,
                isMany ? output[key].join('') : output[key],
              ))
          })
        })
      : (() =>
          keys.forEach((key) => {
            const regex = new RegExp(`{{ ...${key} }}`, 'g')
            const isMany = Array.isArray(output[key])
            output[k].match(regex) &&
              (output[k] = output[k].replace(
                regex,
                isMany ? output[key].join('') : output[key],
              ))
          }))()
  })
  console.log(output)
  return output
}
