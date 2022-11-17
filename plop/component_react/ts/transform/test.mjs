export default (x, t) => {
  const { import_mock, name_mock } = t.start
  let doc = x
  doc = doc.replace(
    /__importMock__/,
    t.var.hasMock ? import_mock : '',
  )
  doc = doc.replace(
    /__hasMock__/,
    t.var.hasMock ? '{ ...' + name_mock + ' }' : '',
  )
  t.var.hasGroup &&
    (doc = doc.replace(
      /..\/..\/styles\/render-theme/,
      '../../../styles/render-theme',
    ))
  return doc
}
