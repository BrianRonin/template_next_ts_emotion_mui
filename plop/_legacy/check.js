export function _check(
  obj,
  _match = {
    match: ['camelCase'],
    resolve: ['camelCase'],
  },
  config = {
    ifNoMatch: 'no match',
    regex: '',
    flags: '',
    allArray: true,
  },
) {
  let regex
  const __match = config.regex
    ? (input, match, isReplace) => {
        // console.log(
        //   JSON.stringify(match) + '<- match input-> ',
        // )
        // console.log(JSON.stringify(input))
        const _regex = config.regex.replace(
          '__match__',
          match,
        )
        regex = new RegExp(_regex, config.flags)
        return input.match(regex)
      }
    : false

  let resolve = {}
  Object.keys(obj).forEach(function (_key, _index) {
    let isMany = false
    let Resolve = (many, noMany) =>
      isMany ? many() : noMany()
    config.allArray && (resolve[_key] = [])
    if (Array.isArray(obj[_key])) {
      resolve[_key] = []
      isMany = true
      for (const index in obj[_key]) {
        check(index)
      }
    } else {
      check()
    }
    function check(__index) {
      let output = []
      _match.match.forEach((match, index) => {
        Resolve(
          () => {
            output[_key] = []
            if (typeof obj[_key][__index] === 'string') {
              typeof _match.resolve === 'function'
                ? output.push(
                    _match.resolve({
                      isMany: true,
                      value: obj[_key][__index],
                      regex,
                      match: _match.match[index],
                      isMatch: __match
                        ? __match(
                            obj[_key][__index],
                            match,
                          ) &&
                          output.push(_match.resolve[index])
                        : obj[_key][__index].match(match) &&
                          output.push(
                            _match.resolve[index],
                          ),
                      key: _key,
                      index: index,
                    }),
                  )
                : __match
                ? __match(obj[_key][__index], match) &&
                  output.push(_match.resolve[index])
                : obj[_key][__index].match(match) &&
                  output.push(_match.resolve[index])
            }
          },
          () => {
            if (typeof obj[_key] === 'string') {
              typeof _match.resolve === 'function'
                ? output[_key].push(
                    _match.resolve({
                      isMany: false,
                      value: obj[_key],
                      regex,
                      match: _match.match[index],
                      isMatch: __match
                        ? __match(obj[_key], match) &&
                          config.allArray
                          ? output.push(
                              _match.resolve[index],
                            )
                          : (output[_key] =
                              _match.resolve[index])
                        : obj[_key].match(match) &&
                          config.allArray
                        ? output.push(_match.resolve[index])
                        : (output[_key] =
                            _match.resolve[index]),
                      key: _key,
                    }),
                  )
                : __match
              if (__match(obj[_key], match)) {
                config.allArray
                  ? output.push(_match.resolve[index])
                  : (output[_key] = _match.resolve[index])
              }
              if (obj[_key].match(match)) {
                config.allArray
                  ? output.push(_match.resolve[index])
                  : (output[_key] = _match.resolve[index])
              }
            }
          },
        )
      })

      if (output[0]) {
        if (output.length > 1) {
          if (isMany) {
            resolve[_key][__index] = []
            output.forEach((output) => {
              resolve[_key][__index].push(output)
            })
          } else {
            resolve[_key] = []
            output.forEach((output) => {
              resolve[_key].push(output)
            })
          }
        } else {
          if (isMany) {
            resolve[_key].push(output[0])
          } else {
            config.allArray
              ? resolve[_key].push(output[0])
              : (resolve[_key] = output[0])
          }
        }
      } else {
        if (isMany) {
          resolve[_key].push(
            config.ifNoMatch === 'it'
              ? obj[_key][__index]
              : config.ifNoMatch,
          )
        } else {
          config.allArray
            ? resolve[_key].push(
                config.ifNoMatch === 'it'
                  ? obj[_key]
                  : config.ifNoMatch,
              )
            : (resolve[_key] =
                config.ifNoMatch === 'it'
                  ? obj[_key]
                  : config.ifNoMatch)
        }
      }
    }
  })
  return resolve
}

const x = {
  nome: '{{ properCase }}',
  sobrenome: 'properCase foa;eiyhfa;esjf;laesij',
  cidades: ['{{ camelCase }}', 'China', 'Canada'],
  apelidos: [
    {
      key: '#',
      value: 'apelido um {{ camelCase }} properCase',
    },
    { key: '_', value: 'apelido dois properCase' },
  ],
}

// const value_of_variables = (() => {
//   let output = []
//   const x = Object.keys(x)
//   return output
// })()

console.log(
  _check(
    x,
    {
      match: ['camelCase', 'properCase'],
      resolve: ['tem camel', 'tem proper'],
    },
    {
      ifNoMatch: 'deu match em nada',
      regex: '{{ __match__ }}',
      allArray: false,
    },
  ),
)
