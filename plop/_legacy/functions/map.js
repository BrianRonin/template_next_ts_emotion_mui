import { checkout } from './checkout.js'
import { config } from './config.js'

export const map_plop = (obj, variables, match) => {
  const output = []
  Object.keys(obj).forEach((key) => {
    if (key !== 'variables') {
      const { _var, hasMatch, hasSpaces, default_molde } =
        config(obj[key], key)
      const { default_variable, default_modifier } =
        checkout('default', obj, key, variables)
      if (hasMatch) {
        const {
          keys: M_keys,
          _variables: M_variables,
          _modifiers: M_modifiers,
          moldes: M_moldes,
          isIncrement,
        } = checkout('match', obj, key, variables, true)
        match.addmatch({
          key,
          molde: M_moldes,
          match: M_keys,
          variable: M_variables,
          modifier: M_modifiers,
          isIncrement,
        })
      }
      console.log(default_variable)
      console.log(default_molde)
      console.log(default_modifier)
      output.push({
        [key]: {
          hasSpaces: hasSpaces,
          ...match.Match(
            key,
            {
              //* default if no match
              value: default_variable[0],
              modifier: default_modifier[0],
              molde: default_molde,
            },
            variables,
          ),
        },
      })
    }
  })
  // console.log('___________XXXX_____________')
  // console.log(output)
  return output
}
