//index.js
//获取应用实例
var app = getApp()
Page({
  data: {
    motto: 'Hello World',
    userInfo: {},
    userAvatar: {}
  },
  //事件处理函数
  bindViewTap: function() {
    wx.reLaunch({
      url: '../search/search'

    })
  },
  onReady: function () {
    console.log('onLoad')
    var that = this
    //调用应用实例的方法获取全局数据
      var userInfo = wx.getStorageSync('userInfo')
      //更新数据
      that.setData({
        userInfo: userInfo
      }),
    wx.getLocation({
      type: 'wgs84',
      success: function (res) {
        var token = wx.getStorageSync('token')
        console.log("nearby users")
        console.log(res)
        var lat = res.latitude
        var lng = res.longitude
        var current_user = wx.getStorageSync('currentUserId')
        var token = wx.getStorageSync('token')
        wx.setStorageSync('lat', lat)
        wx.setStorageSync('lng', lng)
        wx.request({
          url: 'https://seeme.shanghaiwogeng.com/api/v1/profile',
          method: 'patch',
          data: {
            "user": {
              "lat": lat,
              "lng": lng
            }
          },
          header: {
            'Content-Type': 'application/json',
            'X-User-Token': token
          }
        })
      }
    })
  },
  onPullDownRefresh: function(){
    wx.stopPullDownRefresh()
  }
})
