var app = getApp()

Page({
  data: {
    pickerHidden: true,
    chosen: ''
  },

  formSubmit: function (e) {
    console.log(e.detail.value.bio),
    wx.request({
      url: 'https://seeme.shanghaiwogeng.com/api/v1/profile', //仅为示例，并非真实的接口地址
      method: 'patch',
      data: {
         "user": { "bio": e.detail.value.bio }
      },
      header: {
          'Content-Type': 'application/json',
          'X-User-Token': app.globalData.authToken.authentication_token
      },
      success: function(res) {
        console.log(res.data)
      }
    }),
    wx.switchTab({
      url: '../profile/profile'
    })
  },


  profileUpdate: function () {
    wx.request({
      url: 'https://seeme.shanghaiwogeng.com/api/v1/profile', //仅为示例，并非真实的接口地址
      method: 'patch',
      body: {
         "user": { "nickname": "testtt!" }
      },
      header: {
          'content-type': 'application/json',
          'X-User-Token': app.globalData.authToken.authentication_token
      },
      success: function(res) {
        console.log(res.data)
      }
    })
  }
})
