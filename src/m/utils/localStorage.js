export default {
  getItem: function (key) {
    let value
    try {
      value = localStorage.getItem(key)
    } catch (ex) {
      // 开发环境下提示error
      if (process.env.NODE_ENV === 'development') {
        console.error('localStorage.getItem报错, ', ex.message)
      }
    } finally {
      // eslint-disable-next-line no-unsafe-finally
      return value
    }
  },
  setItem: function (key, value) {
    try {
      // ios safari 无痕模式下，直接使用 localStorage.setItem 会报错
      localStorage.setItem(key, value)
    } catch (ex) {
      // 开发环境下提示 error
      if (process.env.NODE_ENV === 'development') {
        console.error('localStorage.setItem报错, ', ex.message)
      }
    }
  }
}
