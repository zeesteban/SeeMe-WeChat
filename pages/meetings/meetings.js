// profile.js
var app = getApp()
Page({
  /**
   * 页面的初始数据
   */
  data: {
    userInfo: {},
    meetings: [],
    sender_meetings: [],
    recipient_meetings: [],
    meeting_id: null,
    recipients: null,
  },

  cancelTap: function(e) {
    console.log(e.currentTarget.id)
    var meeting_id = e.currentTarget.id
    wx.request({
      url: 'http://localhost:3000/api/v1/meetings/' + meeting_id + '/cancel',
      method: 'patch',
      header: {
        'X-User-Token': 'TmQBvysyZYTdzwJZkse3',
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
    var meeting_id = e.currentTarget.id
    wx.request({
      url: 'http://localhost:3000/api/v1/meetings/' + meeting_id + '/accept',
      method: 'patch',
      header: {
        'X-User-Token': 'TmQBvysyZYTdzwJZkse3',
      },
      success: function (res) {
        console.log("Success on accept a meeting")
      }
    })
    this.onLoad()
  },

  declineTap: function(e) {
    console.log(e.currentTarget.id)
    var meeting_id = e.currentTarget.id
    wx.request({
      url: 'http://localhost:3000/api/v1/meetings/' + meeting_id + '/decline',
      method: 'patch',
      header: {
        'X-User-Token': 'TmQBvysyZYTdzwJZkse3',
      },
      success: function (res) {
        console.log("Success on declined a meeting")
      }
    })
    this.onLoad()
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
    console.log("num ;eeti")
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (e) {
    console.log('onLoad')
    let that = this
    app.getUserInfo(function (userInfo) {
      that.setData({
        userInfo: userInfo
      })
    }),
    wx.request({
      url: 'http://localhost:3000/api/v1/meetings/',
      method: 'get',
      header: {
        'X-User-Token': 'TmQBvysyZYTdzwJZkse3',
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
