App({
  onLaunch: function () {
    //调用API从本地缓存中获取数据
    var logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)
    let app = this;
    wx.login({
      success: function (res) {
        if (res.code) {
          //发起网络请求
          console.log(res.code)
          console.log(app.globalData.userInfo)
          app.getUserInfo(function (userInfo) {
            wx.request({
              success: function (res) {
                app.globalData.authToken = res.data
                console.log(app.globalData.authToken)
              },
              url: 'http://localhost:3000/api/v1/users',
              method: "post",
              data: {
                code: res.code,
                userInfo: userInfo
              }
            })
          })
        } else {
          console.log('error' + res.errMsg)
        }
      }
    });
  },
  getUserInfo: function (cb) {
    var that = this
    if (this.globalData.userInfo) {
      typeof cb == "function" && cb(this.globalData.userInfo)
    } else {
      //调用登录接口
      wx.getUserInfo({
        // withCredentials: false,
        success: function (res) {
          that.globalData.userInfo = res.userInfo
          typeof cb == "function" && cb(that.globalData.userInfo)
        }
      })
    }
  },
  globalData: {
    userInfo: null,
    authToken: null
  }
})