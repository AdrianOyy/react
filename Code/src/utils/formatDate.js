import dayjs from "dayjs"

const formatDate = (str, format) => {
  return str ? dayjs(new Date(str)).format(format ? format : 'YYYY-MM-DD') : str
}

export default formatDate
