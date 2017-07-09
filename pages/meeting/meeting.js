var app = getApp()
Page({
  /**
   * 页面的初始数据
   */
  data: {
    userInfo: {},
    sender: null,
    recipient: null,
    messages: [],
    recipient_meetings: [],
    meeting_id: null,
    current_user: null,
    request: true,
    meeting: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (e) {
    // console.log(e.data.recipient)
    var that = this
    var token = wx.getStorageSync('token')
    var userInfo = wx.getStorageSync('userInfo')
    var current_user = wx.getStorageSync('currentUserId')
    var meeting_id = e.id
    wx.setStorageSync('meeting_id', meeting_id)
      that.setData({
        meeting_id: meeting_id,
        userInfo: userInfo,
        current_user: current_user,
      }),
     wx.request({
      url: 'https://seeme.shanghaiwogeng.com/api/v1/meetings/' + e.id,
      method: "get",
      header: {
        'Content-Type': 'application/json',
        'X-User-Token': token
      },
      success: function (res) {
        console.log("got user meeting")
        console.log(res)
        var recipient_id = res.data.recipient.id
        // do a loop here to check id...not in view layer.
        that.setData({
          meeting: res.data,
          recipient: res.data.recipient,
          sender: res.data.sender
        })
      }
    })
     //  Refactor
     if (that.data.request == true) {
      // setInterval(function(){
       wx.request({
        url: 'https://seeme.shanghaiwogeng.com/api/v1/meetings/' + e.id + '/messages',
        method: "get",
        header: {
          'Content-Type': 'application/json',
          'X-User-Token': token
        },
        success: function (res) {
          console.log("got user meeting")
          console.log(res.data)
          // do a loop here to check id...not in view layer.
          that.setData({
            message: res.data,
            request: true
          })
        }
      })
      // }, 3000 )
    }

  },

  onUnload: function(e) {
    console.log("Onunload")
    let that = this
    console.log(that.data.request)
    that.setData({
      request: false
    })
  console.log(that.data.request)
  },

   onHide: function () {
    console.log("onHide")
  },

  bindFormSubmit: function (e) {
    var message = e.detail.value
    var sender = e.currentTarget.dataset.sender
    var recipient = e.target.dataset.recipient
    var token = wx.getStorageSync('token')
    var current_user = wx.getStorageSync('currentUserId')
    var meeting_id = e.currentTarget.id
    console.log('current user id')
    console.log(current_user)
    console.log("message")
    console.log(message)
    let that = this
    // console.log('https://seeme.shanghaiwogeng.com/api/v1/meetings/' + e.currentTarget.id + '/messages')
      wx.request({
        url: 'https://seeme.shanghaiwogeng.com/api/v1/meetings/' + meeting_id + '/messages', //仅为示例，并非真实的接口地址
        method: 'post',
        data: {
          message: {
            content: message,
            sender_id: current_user
          }
        },
        header: {
          'content-type': 'application/json',
          'X-User-Token': token
       },
        success: function(res) {
            // console.log(res.data.id)
          wx.request({
        url: 'https://seeme.shanghaiwogeng.com/api/v1/meetings/' + meeting_id + '/messages',
        method: "get",
        header: {
          'Content-Type': 'application/json',
          'X-User-Token': token
        },
        success: function (res) {
          console.log("got user meeting")
          console.log(res.data)
          // do a loop here to check id...not in view layer.
          that.setData({
            message: res.data,
            request: true
          })
        }
      })
        }
})
},


  cancelTap: function(e) {
    console.log(e.currentTarget.id)
    var that = this
    var meeting_id = e.currentTarget.dataset.id
    wx.request({
      url: 'https://seeme.shanghaiwogeng.com/api/v1/meetings/' + meeting_id + '/cancel',
      method: 'put',
      header: {
        'X-User-Token': wx.getStorageSync('token'),
      },
      success: function (res) {
        console.log("Success on cancelled a meeting")
        console.log(res.data.status)
        wx.showToast({
            title: 'Cancelled',
            icon: 'complete',
            duration: 2000
          }),
         wx.navigateBack({
          url: '../meetings/meetings'
          })
      }
    })
    // this.onLoad()
  },

  acceptTap: function(e) {
    console.log(e.currentTarget.id)
    var that = this
    var meeting_id = e.currentTarget.dataset.id
    console.log("this is the meeting id")
    console.log(meeting_id)
    wx.request({
      url: 'https://seeme.shanghaiwogeng.com/api/v1/meetings/' + meeting_id + '/accept',
      method: 'put',
      header: {
        'X-User-Token': wx.getStorageSync('token'),
      },
      success: function (res) {
        console.log("Success on accept a meeting")
        console.log(res)
         wx.showToast({
            title: 'Accepted',
            icon: 'complete',
            duration: 2000
          }),
        wx.redirectTo({
          url: '../meeting/meeting?id=' + res.data.id
      })
      }
    })
    // this.onLoad()
  },

  declineTap: function(e) {
    console.log(e.currentTarget.id)
    var that = this
    var meeting_id = e.currentTarget.dataset.id
    wx.request({
      url: 'https://seeme.shanghaiwogeng.com/api/v1/meetings/' + meeting_id + '/decline',
      method: 'put',
      header: {
        'X-User-Token': wx.getStorageSync('token'),
      },
      success: function (res) {
        console.log("Success on declined a meeting")
          wx.showToast({
            title: 'Declined',
            icon: 'complete',
            duration: 2000
          }),
        wx.navigateBack({
          url: '../meetings/meetings'
        })
      }
    })
    // this.onLoad()
  },

profileTap: function (e) {
    var userid = e.currentTarget.id
    wx.navigateTo({
      url: '../userProfile/userProfile?id=' + userid
    })
  },

  onPullDownRefresh: function () {
    let that = this
    var meeting_id = wx.getStorageSync('meeting_id')
    console.log(meeting_id)
    var token = wx.getStorageSync('token')
    wx.request({
      url: 'https://seeme.shanghaiwogeng.com/api/v1/meetings/' + meeting_id + '/messages',
      method: "get",
      header: {
        'Content-Type': 'application/json',
        'X-User-Token': token
      },
      success: function (res) {
        console.log("got user meeting")
        console.log(res.data)
        wx.stopPullDownRefresh()
        // do a loop here to check id...not in view layer.
        that.setData({
          message: res.data,
          request: true
        })
      }
    })
  }

})
