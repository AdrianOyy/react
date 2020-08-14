import API from '../../../../api/tenantQuotaMapping'
export function checkEmpty(key, value) {
  if (!value) {
    return {
      error: true,
      msg: `${key} is required`
    }
  }
  return {
    error: false,
    msg: ''
  }
}

export function getCheckTypeExist() {
  return async function(id, value) {
    const { tenantId, type } = value
    const { data } = await API.checkTypeExist(id, tenantId, type)
    if (data.data < 1) {
      return {
        error: false,
        msg: ''
      }
    }
    return {
      error: true,
      msg: `This type is already existed`
    }
  }
}

export function getCheckYearExist() {
  return async function(id, value) {
    const { tenantId, year } = value
    const { data } = await API.checkYearExist(id, tenantId, year)
    if (data.data < 1) {
      return {
        error: false,
        msg: ''
      }
    }
    return {
      error: true,
      msg: `This year is already existed`
    }
  }
}

