import { var_components } from '../../plopfile.js'
// ! can only match with just one increment, one modifier, and one value
// ! '$' <== match reserved
// ? increment ===> -- {{}} --

// const inputs = {
//   name: '_#meu nome',
//   title: 'titulo qualquer',
//   props: [
//     'propNormal',
//     '_propOpcional',
//     '#propComponent',
//     '_#propOpcionalComponent',
//   ],
// }

// // const array_inputs = {}

// const obj = {
//   name_component: {
//     input: [inputs.name, 'name'],
//     default:
//       '{{ camelCase name }} xxx {{ camelCase title }}',
//     match: [
//       {
//         key: '_',
//         value:
//           '{{ camelCase name }} yyy {{ camelCase title }}',
//       },
//       {
//         key: '#',
//         value: (x) => x.replace('yyy', ':D'),
//       },
//     ],
//   },
//   export_and_import_mock: {
//     input: [inputs.name, 'name'],
//     default: 'mock_{{ snakeCase name }}',
//   },
//   prop_mock: {
//     input: [inputs.props, 'props'],
//     default: '// {{ camelCase props }}',
//     match: [
//       {
//         key: '#',
//         value:
//           '{{ properCase props }}: {{ ...export_and_import_mock }}',
//       },
//     ],
//     spaces: {
//       start: '\n\t{{}}: any\n',
//       between: '\t{{}}: any\n',
//       end: '\t{{}}: any\n\t',
//       onlyOne: '\t{{}}: any\n\t',
//     },
//   },
//   prop: {
//     input: [inputs.props, 'props'],
//     spaces: {
//       start: 'inicial_{{}}, ',
//       between: 'meio_{{}}, ',
//       end: 'fim_{{}}',
//       onlyOne: 'only_{{}}',
//     },
//     default:
//       '{{ camelCase props }}: {{ properCase props }}',
//     match: [
//       {
//         key: '_',
//         value: '{{ snakeCase props }}:',
//       },
//       {
//         key: '#',
//         value: (x) => {
//           return x.match(/\?/g) ? x : x.replace(':', '?:')
//         },
//       },
//     ],
//   },
// }
