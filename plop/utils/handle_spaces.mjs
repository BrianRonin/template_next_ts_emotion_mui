export default (
  index,
  maxLength,
  array,
  start,
  between,
  end,
  onlyOne,
) => {
  return index === 0
    ? maxLength !== 1
      ? start
      : onlyOne
    : maxLength === index + 1
    ? end
    : between
}
