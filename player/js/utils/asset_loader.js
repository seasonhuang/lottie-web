var assetLoader = (function () {

  function noop() {}

  function loadNetworkAsset(path, callback, errorCallback) {
    wx.request({
      url: path,
      method: 'GET',
      dataType: 'json',
      success: function (res) {
        if (Object.prototype.toString.call(res.data) === '[object Object]') {
          callback(res.data)
        } else {
          errorCallback()
        }
      },
      fail: function (res) {
        console.error(res.errMsg)
        errorCallback(res)
      },
    })
  }

  function loadLocalAsset(path, callback, errorCallback) {
    var fs = wx.getFileSystemManager()
    fs.readFile({
      filePath: path,
      encoding: 'utf8',
      success: function (res) {
        try {
          var jsonData = JSON.parse(res.data)
          callback(jsonData)
        } catch (e) {
          console.error(e)
          errorCallback(e)
        }
      },
      fail: function (res) {
        console.error(res)
        errorCallback(res)
      },
    })
  }

  function loadAsset(path, callback, errorCallback) {
    if (/^https?\:\/\//.test(path)) {
      loadNetworkAsset(path, callback, errorCallback || noop)
    } else {
      loadLocalAsset(path, callback, errorCallback || noop)
    }
  }
  return {
    load: loadAsset
  }
}())
