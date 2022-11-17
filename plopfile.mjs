import plop_actions_component from './plop/component_react/actions.mjs'
import prompts_components from './plop/component_react/prompts.mjs'

export default function (
  /** @type {import('plop').NodePlopAPI} */
  plop,
) {
  // plop generator code
  plop.setWelcomeMessage('Oque deseja criar?')

  plop.setGenerator('component', {
    description: 'criação de componentes react com js/ts',
    prompts: [...prompts_components],
    actions: [...plop_actions_component],
  })

  plop.setGenerator('markdown component', {
    description: 'this is a skeleton plopfile',
    prompts: [
      {
        type: 'input',
        name: 'element',
        message: 'qual o elemento HTML?',
      },
      {
        type: 'input',
        name: 'name',
        message: 'qual o nome do seu componente markdown?',
      },
      {
        type: 'input',
        name: 'group',
        message:
          'o componente esta em um grupo especifico?',
        filter: (x, r) => {
          if (x) {
            const y = x.replace('', '/')
            return 'markdown/' + y + r.name
          } else {
            return 'markdown/' + r.name
          }
        },
      },
      {
        type: 'rawlist',
        name: 'chield',
        choices: ['chield', 'noChield'],
        message: 'tem chield?',
      },
      {
        type: 'rawlist',
        name: 'isTs',
        choices: ['ts', 'js'],
        message: 'tem typescript?',
      },
    ], // array of inquirer prompts
    actions: [
      {
        type: 'addMany',
        destination:
          './src/components/markdown/components/{{ snakeCase name }}', //diretorio destiono
        stripExtensions: 'hbs', // .extension a ser removido
        templateFiles:
          'src/components/generator/markdown/{{isTs}}/{{chield}}/**.hbs',
        base: 'src/components/generator/markdown/{{isTs}}/{{chield}}/',
      },
    ], // array of actions
  })
}
