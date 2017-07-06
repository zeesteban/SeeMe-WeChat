// profile.js
var app = getApp()
Page({
  data: {
    userInfo: {},
    bio: [],
    tag_list: []
  },
  onPullDownRefresh: function () {
    wx.stopPullDownRefresh()
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

  /** Side note: make this refactored by making less requests to the profile, only call the getStorageSync   */
  onLoad: function () {
    console.log('onLoad')
    var that = this
    var token = wx.getStorageSync('token')
    var bio = wx.getStorageSync('bio')
    var userInfo = wx.getStorageSync('userInfo')
    var tag_list = wx.getStorageSync('tag_list')
    console.log(tag_list)
    that.setData({
                  bio: bio,
                  userInfo: userInfo,
                  tag_list: tag_list
                })
    // wx.request({
    //   success: function(res) {
    //     app.getUserInfo(function (userInfo) {
    //             that.setData({
    //               bio: bio,
    //               userInfo: userInfo
    //             })
    //           })
    //           },
    //           url: 'https://seeme.shanghaiwogeng.com/api/v1/profile', //仅为示例，并非真实的接口地址
    //           method: 'get',
    //           header: {
    //               'Content-Type': 'application/json',
    //               'X-User-Token': token
    //           }
    //         })
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
    var bio = wx.getStorageSync('bio')
    var userInfo = wx.getStorageSync('userInfo')
    var tag_list = wx.getStorageSync('tag_list')
    console.log(tag_list)
    that.setData({
      bio: bio,
      userInfo: userInfo,
      tag_list: tag_list
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
