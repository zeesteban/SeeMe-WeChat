var app = getApp()
Page({
  /**
   * 页面的初始数据
   */
  data: {
    userInfo: {}
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function () {
    console.log('onLoad')
    var that = this
    app.getUserInfo(function (userInfo) {
      that.setData({
        userInfo: userInfo
      })
    })
  },
  bindViewTap: function () {
    console.log("below is the auth token")
    console.log(app.globalData.authToken)
    wx.request({
      url: 'http://localhost:3000/api/v1/meetings/3/messages', //仅为示例，并非真实的接口地址
      method: 'post',
      data: {
        content: 'hello'
      },
      header: {
        'content-type': 'application/json',
        'X-User-Token': app.globalData.authToken
      },
      success: function (res) {
        console.log(res.data)
      }
    })
  }
})
