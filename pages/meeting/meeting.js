var app = getApp()
Page({
  /**
   * 页面的初始数据
   */
  data: {
    userInfo: {},
    recipient: [],
    recipient_id: null,
    messages: [],
    recipient_meetings: [],
    meeting_id: null
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (e) {
    console.log(e)
    console.log(e.id)
    // console.log(e.data.recipient)
    var that = this
    app.getUserInfo(function (userInfo) {
      that.setData({
        userInfo: userInfo
      })
    }),
      that.setData({
        meeting_id: e.id
      }),
     wx.request({
      url: 'https://seeme.shanghaiwogeng.com/api/v1/meetings/' + e.id,
      method: "get",
      header: {
        'Content-Type': 'application/json',
        'X-User-Token': app.globalData.authToken
      },
      success: function (res) {
        console.log("got user meeting")
        console.log()
        console.log(res.data.recipient.id)
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
        'X-User-Token': app.globalData.authToken
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
    }, 2000 )
  },

  bindFormSubmit: function (e) {
    console.log(app.globalData.authToken)
    // var sender = e.target.dataset.sender
    var message = e.detail.value.content
    var sender = e.currentTarget.dataset.sender
    var meeting_id = e.currentTarget.id
    var recipient = e.target.dataset.recipient
    console.log(e)
    console.log("Sending message...")
    console.log(message)
    // console.log('https://seeme.shanghaiwogeng.com/api/v1/meetings/' + e.currentTarget.id + '/messages')
      wx.request({
        url: 'https://seeme.shanghaiwogeng.com/api/v1/meetings/' + meeting_id + '/messages', //仅为示例，并非真实的接口地址
        method: 'post',
        data: {
          message: {
            content: message,
            sender_id: sender,
            recipient_id: recipient
          }
        },
        header: {
          'content-type': 'application/json',
          'X-User-Token': app.globalData.authToken
       },
        success: function(res) {
          console.log(res)
        }
})
}
})
