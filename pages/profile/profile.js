// profile.js
var app = getApp()
Page({
  /**
   * 页面的初始数据
   */
  data: {
    userInfo: {},
    bio: ""
  },



  meetTap: function () {
    wx.navigateTo({
      url: '../meeting/meeting'
    })
  },

  profileEdit: function () {
    wx.navigateTo({
      url: '../profile_edit/profile_edit'
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function () {
    console.log('onLoad')
    var that = this
    app.getUserInfo(function (userInfo) {
      console.log("userinfo below")
      console.log(userInfo)
      that.setData({
        userInfo: userInfo,
        bio: userInfo.bio
        // At the moment we have no bio.
        // Before that we need to local cache our userInfo data.
        // Secondly, update that information to our database via a POST request.
        // Then GET the user profile data and fill all these fields in.
      })
    })
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    console.log('on show ready')
    var that = this
    wx.request({
              url: 'http://localhost:3000/api/v1/profile', //仅为示例，并非真实的接口地址
              method: 'get',
              header: {
                  'Content-Type': 'application/json',
                  'X-User-Token': 'o1mdRAuDDoy5ef-KSvMm'
              },
              success: function(res) {
                console.log(res.data),
                that.setData({
                  bio: res.data.bio
                })
                }
            })
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})
