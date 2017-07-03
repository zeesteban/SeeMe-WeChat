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
      url: '../nearby/nearby'

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
      })
  },
  onPullDownRefresh: function(){
    wx.stopPullDownRefresh()
  }
})
