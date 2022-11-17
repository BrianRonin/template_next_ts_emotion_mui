import { Variables } from './class/Variables.js'
import { Match } from './class/Match.js'
import { add_variables } from './functions/add_variables.js'
import { map_plop } from './functions/map.js'
import { formater_plop } from './functions/formater.js'

export const build_my_plop = (obj) => {
  const variables = new Variables()
  const match = new Match()
  add_variables(obj, variables)
  console.log(variables.variables)
  const molde = map_plop(obj, variables, match)
  formater_plop(molde, variables, obj)
  return variables.matchHooks()
}

const x = build_my_plop({
  variables: {
    name: {
      input: '#um componente',
      isMany: false,
    },
    props: {
      input:
        '_prop opcional, #prop component, prop normal, _#prop opcional e component',
      divisor: ',',
      isMany: true,
    },
    bola: {
      input: 'bola, bola1, #bola2, bola3',
      divisor: ',',
      isMany: true,
    },
  },
  name_component: { default: '{{ properCase name }}}' },
  title: {
    default: '{{ camelCase name }}}',
    match: [
      {
        key: '#',
        value:
          '{{ camelCase name }} {{ -export_and_import_mock }}',
      },
    ],
  },
  export_and_import_mock: {
    default: 'mock_{{ snakeCase name }}',
  },
  prop: {
    default: '{{ camelCase props }} {{ -prop_type }}',
    match: [
      { key: '#', value: '{{ properCase props }}Props' },
    ],
    spaces: {
      start: '{{}}, ',
      between: '{{}}, ',
      end: '{{}}',
      onlyOne: '{{}}',
    },
  },
  prop_type: {
    default: '{{ camelCase props }}: any',
    match: [
      { key: '_', value: (v) => v.replace(':', '?:') },
      {
        key: '#',
        value: '{{ properCase props }}Props: faaaaa', // {{ camelCase props }}
      },
    ],
    spaces: {
      start: '\n\t{{}}\n',
      between: '\t{{}}\n',
      end: '\t{{}}\n\t',
      onlyOne: '\t{{}}\n\t',
    },
  },
  prop_mock: {
    default: '// {{ camelCase props }}',
    match: [
      {
        key: '#',
        value:
          '{{ properCase props }}: {{ -export_and_import_mock }}',
      },
    ],
    spaces: {
      start: '\n\t{{}}: any\n',
      between: '\t{{}}: any\n',
      end: '\t{{}}: any\n\t',
      onlyOne: '\t{{}}: any\n\t',
    },
  },
})
console.log(x)
