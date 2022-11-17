import { _check } from '../../utils/check.js'
import { cleanInput } from '../../utils/clean_input.js'

export class Variables {
  constructor() {
    this.variables = {}
    this.hooks = {}
    /**
     * { key: [
     * input = '' | [],
     * inputClean = '' | []
     * isMany = bool
     * ] }
     */
  }
  addvariables(key, input, isMany, divisor) {
    if (isMany) input = input.split(divisor)
    let inputClean = isMany
      ? input.map((v) => cleanInput(v))
      : cleanInput(input)
    this.variables[key] = {
      input: input,
      inputClean: inputClean,
      isMany: isMany,
    }
  }
  addhooks(key, value) {
    this.hooks[key] = value
  }
  get keys() {
    return Object.keys(this.variables)
  }

  input(key) {
    return this.variables[key]['input']
  }

  inputClean(key) {
    return this.variables[key]['inputClean']
  }

  changeHook() {}

  matchHooks() {
    const output = { ...this.hooks }
    const keys = Object.keys(output)
    Object.keys(output).forEach((k) => {
      const isMany = Array.isArray(output[k])
      isMany
        ? output[k].map((input, index) => {
            keys.forEach((key) => {
              const isMany = Array.isArray(output[key])
              output[k][index].match(`{{ -${key} }}`) &&
                (output[k][index] = input.replace(
                  `{{ -${key} }}`,
                  isMany
                    ? output[key].join('')
                    : output[key],
                ))
            })
          })
        : (() =>
            keys.forEach((key) => {
              const isMany = Array.isArray(output[key])
              output[k].match(`{{ -${key} }}`) &&
                (output[k] = output[k].replace(
                  `{{ -${key} }}`,
                  isMany
                    ? output[key].join('')
                    : output[key],
                ))
            }))()
    })
    console.log(output)
    return output
  }
}
