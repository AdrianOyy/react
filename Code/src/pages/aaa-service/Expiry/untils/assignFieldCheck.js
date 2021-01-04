import assignAPi from '../../../../api/assign'
export function checkEmpty(key, value, name) {
  if (!value) {
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
    const { data } = await assignAPi.checkExist(id, value)
    if (data.data < 1) {
      return {
        error: false,
        msg: ''
      }
    }
    return {
      error: true,
      msg: `This mapping already had role`
    }
  }
}

