export const handle_spaces_legacy = (
  index,
  maxLength,
  array,
  start,
  between,
  end,
  onlyOne,
) => {
  return index === 0
    ? maxLength > 0
      ? array.push(start)
      : array.push(onlyOne)
    : maxLength === index + 1
    ? array.push(end)
    : array.push(between)
}
