export default (x, t) => {
  const { type_style, prop_type_style } = t.start
  let doc = x.replace(
    /__prop_style__/,
    t.var.hasTypeStyle
      ? `\ntype ${type_style} = ${prop_type_style}`
      : '',
  )
  doc = doc.replace(
    /__type_style__/,
    t.var.hasTypeStyle ? `<${type_style}>` : '',
  )
  return doc
}
