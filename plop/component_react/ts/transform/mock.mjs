export default (x, t) => {
  const { prop_mock, import_mock_prop_component } = t.start
  let doc = x
  // *** modfy MOCK
  doc = doc.replace(
    /__importMock__/,
    import_mock_prop_component,
  )
  doc = doc.replace(
    /__prop_mock__/,
    t.state(
      "\n\tchildren: ':D',",
      prop_mock,
      "\n\tchildren: ':D'," + prop_mock,
      '\n\t//',
    ),
  )
  return doc
}
