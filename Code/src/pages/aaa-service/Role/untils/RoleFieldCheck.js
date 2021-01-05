import roleApi from '../../../../api/role'
export function checkEmpty(key, value) {
  if (!value) {
    let name = key === 'label' ? "Tenant's Group" : 'Right'
    return {
      error: true,
      msg: `${name} is required`
    }
  }
  return {
    error: false,
    msg: ''
  }
}

export function getCheckExist() {
  return async function(id, value) {
    const { data } = await roleApi.checkLabel(id, value)
    if (data.data < 1) {
      return {
        error: false,
        msg: ''
      }
    }
    return {
      error: true,
      msg: `'${value}' is already existed`
    }
  }
}

