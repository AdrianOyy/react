import * as types from '../constants'

export function setPage(value) {
  return {
    type: types.SET_PAGE,
    payload: value
  }
}
