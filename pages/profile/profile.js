// profile.js
var app = getApp()
Page({
  /**
   * 页面的初始数据
   */
  data: {
    userInfo: {},
    bio: null
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

})
