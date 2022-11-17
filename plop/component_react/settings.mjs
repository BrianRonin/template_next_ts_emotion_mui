import Cases from '../utils/cases.mjs'
import file_name from './file_name.mjs'
// ! only support camelCase, snakeCase, properCase, constantCase
//*  camelCase: changeFormatToThis
//*  snakeCase: change_format_to_this
//*  dashCase: change-format-to-this
//*  dotCase: change.format.to.this
//*  pathCase: change/format/to/this
//*  properCase: ChangeFormatToThis
//*  lowerCase: change format to this
//*  sentenceCase: Change Format To this
//*  constantCase: CHANGE_FORMAT_TO_THIS
//*  titleCase: Change Format To This

// ************* COMPONENTS ****************** //

export default (var_) => {
  const prop_component_snakeCase = []
  const c = Cases('__', {
    component: '{{ properCase __ }}',
    type_component: '{{ camelCase __ }}Props',
    prop: '{{ camelCase __ }}',
    prop_component: '{{ properCase __ }}Props',
    mock: 'mock_{{ snakeCase __ }}',
    type_style: 'S_{{ ...prop }}',
  })
  return {
    custom: {
      prop_component_snakeCase: prop_component_snakeCase,
    },
    input: {
      name: var_.name,
      props: var_.props,
    },
    config: {
      // *** general cases
      // *** index
      name_type: {
        input: [var_.name, 'name'],
        default: '{{ camelCase name }}Props',
      },
      name_component: {
        input: [var_.name, 'name'],
        default: '{{ properCase name }}',
      },
      export_and_import_mock: {
        input: [var_.name, 'name'],
        default: c.mock('name'),
      },
      prop: {
        input: [var_.props.split(','), 'props'],
        default: c.prop('props'),
        match: [
          {
            key: '#',
            value: c.prop_component('props'),
          },
        ],
        spaces: {
          start: '{{}}, ',
          between: '{{}}, ',
          end: '{{}}',
          onlyOne: '{{}}',
        },
      },
      prop_type: {
        input: [var_.props.split(','), 'props'],
        default: c.prop('props') + ': any',
        match: [
          {
            key: '_',
            stages: {
              stage_3: (x) => {
                return x.match(/\?/g)
                  ? x
                  : x.replace(':', '?:')
              },
            },
          },
          {
            key: '#',
            value: `${c.prop_component(
              'props',
            )}: ${c.type_component('props')}`,
          },
        ],
        spaces: {
          start: '{\n\t{{}}\n',
          between: '\t{{}}\n',
          end: '\t{{}}\n}',
          onlyOne: '{ {{}} }',
        },
      },
      import_props_component: {
        input: [var_.props.split(','), 'props'],
        match: [
          {
            key: /##/,
            value: `import { ${c.type_component(
              'props',
            )} } from '../${file_name.folder(
              'props',
            )}/${file_name.folder('props')}'`,
          },
        ],
        spaces: {
          start: '\n{{}}',
          between: '\n{{}}',
          end: '\n{{}}\n',
          onlyOne: '\n{{}}\n',
        },
      },
      // *** styles
      type_style: {
        input: [var_.name, 'name'],
        default: 'S_{{ camelCase name }}',
      },
      prop_component: {
        input: [var_.props.split(','), 'props'],
        match: [
          {
            key: '#',
            value: c.prop_component('props'),
          },
        ],
        spaces: {
          start: ', {{}}, ',
          between: '{{}}, ',
          end: '{{}} ',
          onlyOne: ', {{}}',
        },
      },
      prop_type_style: {
        input: [var_.props.split(','), 'props'],
        match: [
          {
            key: '@',
            value: `Pick<${c.type_component(
              'name',
            )}, '${c.prop('props')}'>`,
          },
          {
            key: '#@',
            value: `Pick<${c.type_component(
              'name',
            )}, '${c.prop_component('props')}'>`,
          },
        ],
        spaces: {
          start: '\n{{}} &',
          between: '\n{{}} &',
          end: '\n{{}}',
          onlyOne: '{{}}',
        },
      },
      // *** mock
      import_mock_prop_component: {
        input: [var_.props.split(','), 'props'],
        match: [
          {
            key: '##',
            value: `import { ${c.mock(
              'props',
            )} } from '../${file_name.folder(
              'props',
            )}/${file_name._mock('props')}'`,
          },
        ],
        spaces: {
          start: '\n{{}} \n',
          between: '{{}} \n',
          end: '{{}}',
          onlyOne: '\n{{}} \n',
        },
      },
      name_mock: {
        input: [var_.name, 'name'],
        default: c.mock('name'),
      },
      prop_mock: {
        input: [var_.props.split(','), 'props'],
        default: `// ${c.prop('props')}: `,
        match: [
          {
            key: '#',
            value: `// ${c.prop_component(
              'props',
            )}: ${c.mock('props')}`,
          },
          {
            key: '##',
            value: `${c.prop_component('props')}: ${c.mock(
              'props',
            )}`,
          },
        ],
        spaces: {
          start: '\n\t{{}}, \n',
          between: '\t{{}}, \n',
          end: '\t{{}},',
          onlyOne: '\n\t{{}}, \n',
        },
      },
      // *** stories && test
      import_mock: {
        input: [var_.name, 'name'],
        default:
          "import { mock_{{ snakeCase name }} } from './M.{{ snakeCase name }}'",
        spaces: {
          start: '{{}} \n',
          between: '{{}} \n',
          end: '{{}}',
          onlyOne: '{{}} \n',
        },
      },
    },
  }
}

// * Styled component

// ? ex: div, h1, etc..
export const default_import_html_of_styled_components =
  'div'
