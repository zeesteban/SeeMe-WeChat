var app = getApp()

Page({
  data: {
    pickerHidden: true,
    chosen: '',
    bio: null,
    tag_list: []
  },

  onLoad: function() {
    let that = this
    that.setData ({
      bio: wx.getStorageSync('bio'),
      tag_list: wx.getStorageSync('tag_list')
    })
  },

  formSubmit: function (e) {
    var token = wx.getStorageSync('token')
    var base = e.detail.value
  
    wx.request({
      url: 'https://seeme.shanghaiwogeng.com/api/v1/profile', //仅为示例，并非真实的接口地址
      method: 'patch',
      data: {
        "user": {
          "bio": base.bio,
         }
      },
      header: {
          'Content-Type': 'application/json',
          'X-User-Token': token
      },
      success: function(res) {
        try {
          wx.setStorageSync('bio', res.data.bio)
          wx.setStorageSync('tag_list', res.data.tag_list)
          // wx.setStorageSync('token', res.data.interests)
        } catch (e) {
            console.log("Didn't set storage")
        }

      }
    }),
    wx.reLaunch({
      url: '../profile/profile'
    })
  },


  // profileUpdate: function () {
  //   wx.request({
  //     url: 'https://seeme.shanghaiwogeng.com/api/v1/profile', //仅为示例，并非真实的接口地址
  //     method: 'patch',
  //     body: {
  //        "user": { "nickname": "testtt!" }
  //     },
  //     header: {
  //         'content-type': 'application/json',
  //         'X-User-Token': app.globalData.authToken
  //     },
  //     success: function(res) {
  //       console.log(res.data)
  //     }
  //   })
  // }
})
