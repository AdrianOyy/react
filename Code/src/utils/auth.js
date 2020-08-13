export default function auth(path) {
  if (path === '/' || getToken()) {
    return true
  }
  return false
}

function getToken() {
  return window.localStorage.getItem("token")
}
