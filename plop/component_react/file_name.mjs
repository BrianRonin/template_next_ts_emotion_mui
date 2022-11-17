import _cases from '../utils/cases.mjs'

const cases = _cases('__', {
  folder: '{{ snakeCase __ }}',
  index: '{{ snakeCase __ }}.tsx',
  stories: '{{ snakeCase __ }}.stories.tsx',
  styles: 'S.{{ snakeCase __ }}.tsx',
  mock: 'M.{{ snakeCase __ }}.ts',
  test: '{{ snakeCase __ }}.test.tsx',
})

const cases_without_extension = Object.keys(cases).reduce(
  (p, k) => {
    const str = cases[k]().replace(/}}\.[^\s]*/g, '}}')
    return { ...p, ['_' + k]: str }
  },
  {},
)

export default {
  ...cases,
  ..._cases(cases_without_extension),
}

// console.log(cases.mock())
// console.log(cases.styles())
// console.log(cases.stories())
// console.log(_cases(cases_without_extension)._mock())
// console.log(_cases(cases_without_extension)._styles())
// console.log(_cases(cases_without_extension)._stories())
