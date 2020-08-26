import dayjs from "dayjs"

const formatDateTime = (str, format) => {
  return dayjs(new Date(str)).format(format ? format : 'YYYY-MM-DD HH:mm')
}

export default formatDateTime
