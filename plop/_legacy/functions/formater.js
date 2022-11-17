import { case_modifiers } from '../../utils/case_modifiers.js'
import { _check } from '../../utils/check.js'
import { handle_spaces } from './handle_spaces.js'
let obj
export const formater_plop = (_molde, variables, _obj) => {
  obj = _obj
  _molde.forEach((molde) => {
    Object.keys(molde).forEach((key, index) => {
      const isMany = Array.isArray(molde[key].value)
      isMany
        ? format(molde, key, variables, true)
        : format(molde, key, variables)
    })
  })
}

const format = (molde, key, variables, isMany = false) => {
  const hasSpaces = obj[key].spaces
  const output = []
  const resolve = isMany
    ? molde[key].value.reduce((prev, input, index) => {
        let resolve = ''
        input = variables.inputClean(input)[index]
        const hasIncrement = molde[key].increment[index]
        const hasHooks =
          molde[key].molde[index].match(/{{.*[$.*].*}}/g)
        resolve = format_modifier(
          molde[key].molde[index],
          input,
          molde[key].modifier[index],
        )
        if (hasIncrement) {
          resolve = hasIncrement(resolve)
        }
        hasSpaces &&
          handle_spaces(
            index,
            molde[key].value.length,
            output,
            obj[key].spaces.start.replace('{{}}', resolve),
            obj[key].spaces.between.replace(
              '{{}}',
              resolve,
            ),
            obj[key].spaces.end.replace('{{}}', resolve),
            obj[key].spaces.onlyOne.replace(
              '{{}}',
              resolve,
            ),
          )

        return [...prev, resolve]
      }, [])
    : format_modifier(
        molde[key].molde,
        variables.inputClean(molde[key].value),
        molde[key].modifier,
      )
  hasSpaces && isMany
    ? variables.addhooks(key, output.join(''))
    : variables.addhooks(key, resolve)
  return hasSpaces && isMany ? output.join('') : resolve
}

const format_modifier = (molde, input, modifier) => {
  return molde.replace(
    /{{[^-.*]*}}/g,
    case_modifiers[modifier](input),
  )
}
