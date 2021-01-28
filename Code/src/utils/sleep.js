async function sleep(time) {
  await new Promise(resolve => {
    resolve()
  }, time)
}
export default sleep
