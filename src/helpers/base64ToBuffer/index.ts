export default (base64: string) => {
  const arr = base64.split(',')
  const bstr = atob(arr[1])
  let n = bstr.length
  const u8arr = new Uint8Array(n)

  while (n--) {
    u8arr[Number(n)] = bstr.charCodeAt(Number(n))
  }

  return Buffer.from(u8arr)
}
