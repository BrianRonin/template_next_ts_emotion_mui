// getcomponent: '{{ properCase __ }}',
// prop: '{{ camelCase __ }}',
// prop_component: '{{ properCase __ }}Props',
// files: '{{ snakeCase __ }}',
// mock: 'mock_{{ snakeCase __ }}',
// type_style: `S.${this.prop}`,
// type_style_component: `S.${this.prop_component}`,

// class Cases {
//   constructor(identifier = '__') {
//     this.identifier = identifier
//   }

//   cases = {}
//   hooks = {}

//   add_hooks(obj) {
//     this.hooks = Object.keys(obj).reduce((prev, match) => {
//       return obj[match].match(/{{ \.\.\..* }}/)
//         ? prev
//         : {
//             ...prev,
//             [match]: `{{ ...${match} }}`,
//           }
//     }, {})
//   }

//   static add(obj) {
//     this.add_hooks(obj)
//     return Object.keys(obj).reduce((prev, k, i) => {
//       const _resolve = {
//         [k]: (name) => {
//           let str = obj[k]
//           obj[k].match(/{{ \.\.\..* }}/) &&
//             Object.keys(this.hooks).forEach((k) => {
//               str = str.replace(this.hooks[k], obj[k])
//             })
//           return name
//             ? str.replace(this.identifier, name)
//             : str
//         },
//       }
//       return { ...prev, ..._resolve }
//     }, {})
//   }
// }

const cases = (identifier = '__', obj = {}) => {
  const add_hooks = (obj) => {
    return Object.keys(obj).reduce((prev, match) => {
      return obj[match].match(/{{ \.\.\..* }}/)
        ? prev
        : {
            ...prev,
            [match]: new RegExp(`{{ ...${match} }}`),
          }
    }, {})
  }

  const hooks = add_hooks(obj)
  return Object.keys(obj).reduce((prev, k, i) => {
    const _resolve = {
      [k]: (name) => {
        let str = obj[k]
        obj[k].match(/{{ \.\.\..* }}/) &&
          Object.keys(hooks).forEach((k) => {
            str = str.replace(hooks[k], obj[k])
          })
        return name ? str.replace(identifier, name) : str
      },
    }
    return { ...prev, ..._resolve }
  }, {})
}
import x from './utils/cases.mjs'
const c = x('__', {
  component: '{{ properCase __ }}',
  type_component: '{{ camelCase __ }}Props',
  prop: '{{ camelCase __ }}',
  prop_component: '{{ properCase __ }}Props',
  mock: 'mock_{{ snakeCase __ }}',
  prop_mock: 'mock_{{ ...prop }}',
  prop_mock_component: 'mock_{{ ...prop_component }}',
  type_style: 'S_{{ ...prop }}',
})

// console.log(c)
console.log(c.type_style('teste'))
console.log(c.prop_mock('teste'))
// console.log('n_a_m_e'.replace(/_/g, ''))

// console.log(c.cases.prop_component('teste'))
