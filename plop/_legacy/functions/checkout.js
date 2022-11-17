import { case_modifiers } from '../../utils/case_modifiers.js'
import { _check } from '../../utils/check.js'

let keys_of_variables

export const checkout = (
  check = '',
  obj = {},
  key = '',
  variables,
  isMatch = false,
) => {
  keys_of_variables = variables.keys
  const resolve = isMatch
    ? obj[key][check].reduce(
        (p, c, i) => {
          const isFunc = typeof c.value === 'function'
          const { _modifiers, _variables } = _check_(
            {
              [c.key]: isFunc ? false : c.value,
            },
            false,
          )
          return {
            moldes: [...p.moldes, isFunc ? false : c.value],
            keys: [...p.keys, c.key],
            isIncrement: [
              ...p.isIncrement,
              isFunc ? c.value : false,
            ],
            _variables: Object.values({
              ...p['_variables'],
              ..._variables,
            }),
            _modifiers: Object.values({
              ...p['_modifiers'],
              ..._modifiers,
            }),
          }
        },
        {
          moldes: [],
          keys: [],
          isIncrement: [],
          _variables: [],
          _modifiers: [],
        },
      )
    : (() => {
        const { _variables, _modifiers } = _check_(
          { [key]: obj[key][check] },
          'properCase',
          true,
        )
        return {
          default_variable: Object.values(_variables)[0],
          default_modifier: Object.values(_modifiers)[0],
        }
      })()

  return resolve
}

const _check_ = (obj, _default_, allArray) => {
  const _variables = _check(
    obj,
    {
      match: keys_of_variables,
      resolve: keys_of_variables,
      allArray,
    },
    {
      ifNoMatch: false,
      regex: '{{.* __match__ .*}}',
    },
  )
  const _modifiers = _check(
    obj,
    {
      match: case_modifiers.options,
      resolve: case_modifiers.options,
    },
    {
      ifNoMatch: _default_,
      regex: '{{.* __match__ .*}}',
      allArray,
    },
  )

  return { _variables, _modifiers }
}
