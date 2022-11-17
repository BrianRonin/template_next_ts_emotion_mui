export const add_variables = (obj, variables) => {
  Object.keys(obj.variables).forEach((key) => {
    let {
      divisor = ',',
      input = 'no value',
      isMany = false,
    } = obj.variables[key]
    if (isMany && !input) isMany = false
    variables.addvariables(key, input, isMany, divisor)
    // console.log('***** variables****a')
    // console.log(variables.var)
    // console.log('**** variables ****')
  })
}
