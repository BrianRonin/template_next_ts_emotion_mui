import { default_if_there_are_no_modifiers } from '../component_react/ts/settings.js'
import { case_modifiers } from '../utils/case_modifiers.js'

export const formater_each = (molde, input) => {
  let output = {}
  Object.keys(molde).forEach(function (key, index) {
    let hasModifier = false
    output[key] = []

    if (molde[key].match('camelCase')) {
      output[key][0] = 'camelCase'
      hasModifier = true
    }
    if (molde[key].match('properCase')) {
      output[key][0] = 'properCase'
      hasModifier = true
    }
    if (molde[key].match('snakeCase')) {
      output[key][0] = 'snakeCase'
      hasModifier = true
    }
    if (molde[key].match('constantCase')) {
      output[key][0] = 'constantCase'
      hasModifier = true
    }
    if (!hasModifier)
      output[key][0] = default_if_there_are_no_modifiers

    output[key][1] = molde[key].replace(/{{.*}}/gi, '$')
    output[key][2] = molde[key].replace(/{{.*}}/gi, '$')
    output[key][1] = output[key][1].replace(
      '$',
      case_modifiers[output[key][0]](input),
    )
  })
  return output
}
