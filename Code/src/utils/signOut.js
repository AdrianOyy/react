const signOut = () => {
  window.localStorage.removeItem('token')
  window.location.href = '/'
}

export default signOut
