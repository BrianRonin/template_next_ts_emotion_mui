export const config = (obj, key) => {
  let _var = false
  let default_molde = false
  let hasSpaces = false
  let hasMatch = false
  let divisor = ''
  let key_values

  if (obj.var) _var = obj.var
  if (obj.default) default_molde = obj.default
  if (obj.spaces) hasSpaces = true
  if (obj.match) hasMatch = true

  return { _var, hasMatch, hasSpaces, default_molde }
}
