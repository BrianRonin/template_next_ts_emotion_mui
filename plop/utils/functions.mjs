export const isEmptyObject = (obj) => {
  return (JSON.stringify(obj) === '{}') |
    (typeof JSON.stringify(obj) === 'undefined')
    ? true
    : false
}

// export function arrayObject(arr) {
//   let output = {}
//   arr.map((e) => {
//     const x = [...e]
//     output[e[0]] = x
//   })
//   return output
// }

// const testGroup = [
//   ['#', '{{ properCase props }}Props'],
//   ['_', '{{}}?'],
// ]

// console.log(arrayObject(testGroup))
