export default function (_identifier, _obj) {
  let obj = _obj ? _obj : _identifier
  let identifier = _obj ? _identifier : '__'

  const add_hooks = (obj) => {
    return Object.keys(obj).reduce((prev, match) => {
      return obj[match].match(/{{ \.\.\..* }}/)
        ? prev
        : {
            ...prev,
            [match]: `{{ ...${match} }}`,
          }
    }, {})
  }

  const hooks = add_hooks(obj)
  return Object.keys(obj).reduce((prev, k, i) => {
    const _resolve = {
      [k]: (name) => {
        let str = obj[k]
        obj[k].match(/{{ \.\.\..* }}/) &&
          Object.keys(hooks).forEach((k) => {
            str = str.replace(hooks[k], obj[k])
          })
        return name ? str.replace(identifier, name) : str
      },
    }
    return { ...prev, ..._resolve }
  }, {})
}

// console.log(c)
// console.log(c.test('teste'))
// console.log(c.testDois('teste'))
