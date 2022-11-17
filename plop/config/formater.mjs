import case_modifiers from '../utils/case_modifiers.mjs'
import cleanInput from '../utils/clean_input.mjs'
import format_hooks from './format_hooks.mjs'
import plop_config_components from '../component_react/settings.mjs'
import handle_spaces from '../utils/handle_spaces.mjs'

export default function build_my_plop(obj) {
  const single_inputs = {}
  Object.keys(obj.input).forEach((input) => {
    if (!Array.isArray(obj.input[input])) {
      single_inputs[input] = obj.input[input]
    }
  })
  return format_hooks(_formater(obj.config, single_inputs))
}
build_my_plop(
  plop_config_components({
    name: 'componente novo',
    props:
      '_prop opcional, #prop component, prop normal, _##prop opcional component importado, ##prop importada',
  }),
)
function _formater(obj, single_inputs) {
  const resolve = {}
  Object.keys(obj).forEach((k) => {
    if (Array.isArray(obj[k].input[0])) {
      let outputs = []
      obj[k].input[0].map((_input, index) => {
        const _output = formater(
          {
            ...obj[k],
            input: _input,
          },
          {
            ...single_inputs,
            [obj[k].input[1]]: _input,
          },
        )
        _output && outputs.push(_output)
      })
      resolve[k] =
        outputs.length > 0
          ? outputs
              .reduce((prev, output, index) => {
                const resolve = handle_spaces(
                  index,
                  outputs.length,
                  outputs,
                  obj[k].spaces.start.replace(
                    /{{}}/,
                    output,
                  ),
                  obj[k].spaces.between.replace(
                    /{{}}/,
                    output,
                  ),
                  obj[k].spaces.end.replace(/{{}}/, output),
                  obj[k].spaces.onlyOne.replace(
                    /{{}}/,
                    output,
                  ),
                )
                return [...prev, resolve]
              }, [])
              .join('')
          : ''
    } else {
      resolve[k] = formater(
        {
          ...obj[k],
          input: obj[k].input[0],
        },
        single_inputs,
      )
    }
  })
  obj.custom && (resolve.custom = obj.custom)
  return resolve
}

function formater(obj, inputs) {
  let resolve
  let stages = {
    stage_0: (x) => x,
    stage_1: (x) => x,
    stage_2: (x) => x,
    stage_3: (x) => x,
  }
  let keys_of_match = []
  resolve = obj.default ? obj.default : ''
  obj.match &&
    obj.match.map((match) => {
      keys_of_match.push(match.key)
      if (obj.input.match(match.key)) {
        match.value &&
          typeof match.value === 'string' &&
          (resolve = match.value)
        match.stages &&
          (stages = {
            ...stages,
            ...match.stages,
          })
      }
    })
  Object.keys(inputs).forEach((input) => {
    case_modifiers.options.map((modifier) => {
      const regex = new RegExp(
        `{{ ${modifier} ${input} }}`,
        'g',
      )
      if (resolve.match(regex)) {
        const output = stages.stage_2(
          case_modifiers[modifier](
            stages.stage_1(
              cleanInput(
                stages.stage_0(inputs[input]),
                new RegExp(`[^${keys_of_match.join()} ]`),
              ),
            ),
          ),
        )
        resolve = stages.stage_3(
          resolve.replace(regex, output),
        )
      }
    })
  })
  return resolve
}
