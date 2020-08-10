import ManagementApi from '../../../../api/management'
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

export function getCheckExist() {
  return async function(id, value) {
    const { tenantId, groupId } = value
    const { data } = await ManagementApi.checkExist(id, tenantId, groupId)
    if (data.data < 1) {
      return {
        error: false,
        msg: ''
      }
    }
    return {
      error: true,
      msg: `This management is already existed`
    }
  }
}

