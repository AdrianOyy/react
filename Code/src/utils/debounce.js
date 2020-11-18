
export default function debounce(func, wait) {
  let timer
  return function() {
    let  args = arguments
    if (timer) clearTimeout(timer)
    timer = setTimeout(() => {
      func.apply(this, args)
    }, wait)
  }
}
