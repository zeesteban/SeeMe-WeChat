// pages/userProfile/userProfile.js
var app = getApp()

Page({
  data: {
    user: [],
    id: null
  },
  onLoad: function (e) {
    console.log(e)
    var findId = e.id
    this.setData({
      id: findId
    })
    let page = this;
    // Nearby API request
    wx.request({
      url: 'https://seeme.shanghaiwogeng.com/api/v1/users/' + page.data.id ,
      method: "get",
      // header: {
      //   'content-type': 'application/json'
      // },
      success: function (res) {
        console.log(res.data)
        page.setData({
          user: res.data
        })
      },
      fail: function() {
      }
    })
  },

  meetTap: function(e) {
    console.log(e.currentTarget.id)
    wx.request({
      url: 'https://seeme.shanghaiwogeng.com/api/v1/meetings/',
      method: "post",
      data: {
        meeting: {
          recipient_id: e.currentTarget.id
        }
      },
      header: {
        'X-User-Token': app.globalData.authToken,
        'Content-Type': 'application/json'
      },
      success: function (res) {
        console.log("Sent")
        console.log(res.data.id)
        wx.navigateTo({
           url: '../meeting/meeting?id=' + res.data.id
        //   success: function() {
        //   wx.showToast({
        //     title: 'Success!',
        //     icon: 'success',
        //     duration: 2000
        //   })
        // },
      })
      }
    })
  },

  onReady: function () {

  },
  onShow: function () {

  },
  onHide: function () {

  },
  onPullDownRefresh: function () {

  },

  onReachBottom: function () {

  },
  onShareAppMessage: function () {

  }
})
