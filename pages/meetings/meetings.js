// profile.js
var app = getApp()
Page({
  /**
   * 页面的初始数据
   */
  data: {
    userInfo: {},
    meetings: [],
    meeting_id: null,
    recipient: null,
    current_user: null,
    token: null,
    navbar: ['Accepted', 'Pending', 'Declined'],
    currentNavbar: '1',
  },

  swichNav(e) {
    this.setData({
      currentNavbar: e.currentTarget.dataset.idx
    })
  },


  meetingTap: function (e) {
    console.log("Meeting data")
    console.log(e.currentTarget.id)

    wx.navigateTo({
      success: function () {
        console.log("Moved to meeting")
      },
      url: '../meeting/meeting?id=' + e.currentTarget.id

    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (e) {
    console.log('onLoad--!')
    let that = this
    var token = wx.getStorageSync('token')
    var current_user = wx.getStorageSync('currentUserId')
    console.log(token)
    console.log(current_user)
    app.getUserInfo(function (userInfo) {
      that.setData({
        userInfo: app.userInfo,
        current_user: current_user,
        token: token
      })
    }),
      // setInterval(function(){
      wx.request({
        url: 'https://seeme.shanghaiwogeng.com/api/v1/meetings/',
        method: 'get',
        header: {
          'X-User-Token': token
        },
        success: function (res) {
          console.log("Success on getting meetings")
          console.log(res.data)
          that.setData({
            current_user: current_user,
            meetings: res.data
          })
        }
      })
    // }, 3000 )

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
    let that = this
    var token = wx.getStorageSync('token')
    var current_user = wx.getStorageSync('currentUserId')
    wx.request({
      url: 'https://seeme.shanghaiwogeng.com/api/v1/meetings/',
      method: 'get',
      header: {
        'X-User-Token': token
      },
      success: function (res) {
        console.log("Success on getting meetings")
        console.log(res.data)
        that.setData({
          current_user: current_user,
          meetings: res.data
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
    let that = this
    wx.request({
      url: 'https://seeme.shanghaiwogeng.com/api/v1/meetings/',
      method: 'get',
      header: {
        'X-User-Token': wx.getStorageSync('token')
      },
      success: function (res) {
        wx.stopPullDownRefresh()
        console.log("Success on getting meetings")
        console.log(res.data)
        that.setData({
          meetings: res.data
        })
      },
      fail: function(){
        wx.stopPullDownRefresh()
      }
    })

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
