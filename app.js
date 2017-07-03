App({
  onLaunch: function () {
    // WX code
    let app = this;
    wx.checkSession({
      success: function() {
        console.log("success, has account")
      },
      fail: function() {
         wx.login({
      success: function (res) {
        console.log(res)
        if (res.code) {
          //发起网络请求
          app.getUserInfo(function (userInfo) {

              try {
                wx.setStorageSync('userInfo', userInfo)
                console.log("stored user")
              } catch (e) {
                console.log("couldn't set storage for avatar")
              }
            wx.request({
              success: function (res) {
                console.log(res)
                try {
                  wx.setStorageSync('token', res.data.authentication_token)
                  wx.setStorageSync('currentUserId', res.data.id)
                } catch (e) {
                    console.log("Didn't set storage")
                }
              },
              
              url: 'https://seeme.shanghaiwogeng.com/api/v1/users',
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
      }
    }),

// Localisation
  wx.getLocation({
  type: 'wgs84',
  success: function(res) {
    var lat = res.latitude
    var lng = res.longitude
     console.log(res)

   },
  url: 'https://seeme.shanghaiwogeng.com/api/v1/profile',
  method: "patch",
  data: {
    "user":{
      "lat" :e.detail.value.lat,
      "lng": e.detail.value.lng
    }
        }
  })
  console.log(lat)
  console.log(lng)
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
    userInfo: null
  }
})
