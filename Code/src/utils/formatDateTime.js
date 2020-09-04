import dayjs from "dayjs"

const formatDateTime = (str, format) => {
  return dayjs(new Date(str)).format(format ? format : 'DD-MMM-YYYY HH:mm')
}

export default formatDateTime
