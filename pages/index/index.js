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
  onLoad: function () {
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
        console.log("Getting Location data")
        console.log(res)
        var latitude = res.latitude
        var longitude = res.longitude
        var current_user = wx.getStorageSync('currentUserId')
        var token = wx.getStorageSync('token')
        console.log(token)
        wx.setStorageSync('lat', latitude)
        wx.setStorageSync('lng', longitude)
        wx.request({
          url: 'https://seeme.shanghaiwogeng.com/api/v1/profile',
          method: 'put',
          data: {
            "user": {
              "latitude": latitude,
              "longitude": longitude
            }
          },
          header: {
            'Content-Type': 'application/json',
            'X-User-Token': token
          },
          success: function(res){
            console.log("Patch success")
            console.log(res.data)
          }
        })
      }
    })
  },
  onPullDownRefresh: function(){
    wx.stopPullDownRefresh()
  },
})
