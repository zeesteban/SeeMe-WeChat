var app = getApp()
Page({
  /**
   * 页面的初始数据
   */
  data: {
    userInfo: {},
    recipient: null,
    messages: [],
    recipient_meetings: [],
    meeting_id: null,
    current_user: null
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (e) {
    console.log(e)
    console.log(e.id)
    // console.log(e.data.recipient)
    var that = this
    var token = wx.getStorageSync('token')
    var userInfo = wx.getStorageSync('userInfo')
    var current_user = wx.getStorageSync('currentUserId')
    var meeting_id = e.id
      that.setData({
        meeting_id: meeting_id,
        userInfo: userInfo,
        current_user: current_user
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
          recipient: res.data.recipient,
          sender: res.data.sender
        })
      }
    })
     setInterval(function(){
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
          message: res.data
        })
      }
    })
    }, 9000 )
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
          // console.log(res)
        }
})
}
})
