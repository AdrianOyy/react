import tenantGroupMapping from '../../../../api/tenantGroupMapping'
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

export function checkGroupEmpty(key, value) {
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

export function getCheckExist() {
  return async function(id, value) {
    const { tenantId, groupId } = value
    const { data } = await tenantGroupMapping.checkExist(id, tenantId, groupId)
    if (data.data < 1) {
      return {
        error: false,
        msg: ''
      }
    }
    return {
      error: true,
      msg: `This mapping is already existed`
    }
  }
}

