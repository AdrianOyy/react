import * as types from '../constants'

export function setUser(value) {
  return {
    type: types.SET_USER,
    payload: value
  }
}
