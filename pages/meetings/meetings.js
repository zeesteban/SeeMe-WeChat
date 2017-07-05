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
    navbar: ['Active', 'Pending', 'Decline'],
    currentNavbar: '0', 
  },

  swichNav(e) {
    this.setData({
      currentNavbar: e.currentTarget.dataset.idx
    })
  },


  meetingTap: function (e) {
    console.log("Meeting data")
    console.log(e.currentTarget.id)
    let that = this
    // let meeting_id = e.target.id
    // var recipient = e.target.dataset.meeting.id
      that.setData({
        // recipients: recipient,
      }),
    wx.navigateTo({
      success: function () {
        console.log("Moved to meeting")
      },
      url: '../meeting/meeting?id=' + e.currentTarget.id

    })
  },

  cancelTap: function(e) {
    console.log(e.currentTarget.id)
    var that = this
    var meeting_id = e.currentTarget.id
    wx.request({
      url: 'https://seeme.shanghaiwogeng.com/api/v1/meetings/' + meeting_id + '/cancel',
      method: 'patch',
      header: {
        'X-User-Token': that.data.token,
      },
      success: function (res) {
        console.log("Success on cancelled a meeting")
        console.log(res.data.status)
      }
    })
    this.onLoad()
  },

  acceptTap: function(e) {
    console.log(e.currentTarget.id)
    var that = this
    var meeting_id = e.currentTarget.id
    wx.request({
      url: 'https://seeme.shanghaiwogeng.com/api/v1/meetings/' + meeting_id + '/accept',
      method: 'patch',
      header: {
        'X-User-Token': that.data.token,
      },
      success: function (res) {
        console.log("Success on accept a meeting")
      }
    })
    this.onLoad()
  },

  declineTap: function(e) {
    console.log(e.currentTarget.id)
    var that = this
    var meeting_id = e.currentTarget.id
    wx.request({
      url: 'https://seeme.shanghaiwogeng.com/api/v1/meetings/' + meeting_id + '/decline',
      method: 'patch',
      header: {
        'X-User-Token': that.data.token,
      },
      success: function (res) {
        console.log("Success on declined a meeting")
      }
    })
    this.onLoad()
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
          meetings: res.data
        })
        }
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
