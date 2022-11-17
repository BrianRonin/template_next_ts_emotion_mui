export class Match {
  constructor() {
    this.match = {}
    /**
     * {
     *  key: [
     *  match = '',
     *  value = 'variable' | ' {{}} ',
     *  caseModifier = 'Modifiers' | false
     * ] }
     * */
  }
  addmatch({
    key,
    match,
    variable,
    modifier,
    isIncrement,
    molde,
  }) {
    this.match[key] = {
      isIncrement,
      match,
      variable,
      modifier,
      molde,
    }
  }

  Match(
    key,
    _default = {
      value: '',
      modifier: '',
      molde: '',
    },
    variables,
  ) {
    const input = variables.input(_default.value)
    const isMany = Array.isArray(input)
    return isMany
      ? input.reduce(
          (prev, input) => {
            const resolve = this._match(
              key,
              input,
              _default,
            )
            return {
              modifier: [
                ...prev.modifier,
                resolve.modifier,
              ],
              value: [...prev.value, resolve.value],
              increment: [
                ...prev.increment,
                resolve.increment,
              ],
              molde: [...prev.molde, resolve.molde],
            }
          },
          {
            molde: [],
            modifier: [],
            value: [],
            increment: [],
          },
        )
      : this._match(key, input, _default)
  }

  _match(key, input, _default) {
    const resolve = {
      modifier: _default.modifier,
      value: _default.value,
      molde: _default.molde,
      increment: false,
    }
    this.match[key] &&
      this.match[key].match.map((match, match_i) => {
        const _match_ = input.match(match)
        if (
          this.match[key].isIncrement[match_i] &&
          _match_
        ) {
          resolve.increment =
            this.match[key].isIncrement[match_i]
        } else {
          this.match[key].modifier[match_i] &&
            _match_ &&
            (resolve.modifier =
              this.match[key].modifier[match_i])
          this.match[key].variable[match_i] &&
            _match_ &&
            (resolve.value =
              this.match[key].variable[match_i])
          this.match[key].molde[match_i] &&
            _match_ &&
            (resolve.molde = this.match[key].molde[match_i])
        }
      })
    return resolve
  }
}
