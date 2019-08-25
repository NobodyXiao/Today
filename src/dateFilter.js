let padDate = function (value) {
  return value < 10 ? '0' + value : value
}
export function dateFilterWithTime (value) {
  let date = new Date(value)
  let year = date.getFullYear()
  let month = padDate(date.getMonth() + 1)
  let day = padDate(date.getDate())
  let hours = padDate(date.getHours())
  let minutes = padDate(date.getMinutes())
  let seconds = padDate(date.getSeconds())
  // 将整理好的格式化的日期返回
  return year + '-' + month + '-' + day + ' ' + hours + ':' + minutes + ':' + seconds
}

export function dateFilter (value) {
  let date = new Date(value)
  let year = date.getFullYear()
  let month = padDate(date.getMonth() + 1)
  let day = padDate(date.getDate())
  // 将整理好的格式化的日期返回
  return year + '-' + month + '-' + day
}
