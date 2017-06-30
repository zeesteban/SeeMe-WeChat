Page({
  data: {
    pickerHidden: true,
    chosen: ''
  },

  formSubmit: function (e) {
    console.log(e.detail.value.bio),
    wx.request({
      url: 'http://localhost:3000/api/v1/profile', //仅为示例，并非真实的接口地址
      method: 'patch',
      data: {
         "user": { "bio": e.detail.value.bio }
      },
      header: {
          'Content-Type': 'application/json',
          'X-User-Token': 'o1mdRAuDDoy5ef-KSvMm'
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
      url: 'http://localhost:3000/api/v1/profile', //仅为示例，并非真实的接口地址
      method: 'patch',
      body: {
         "user": { "nickname": "testtt!" }
      },
      header: {
          'content-type': 'application/json',
          'X-User-Token': 'o1mdRAuDDoy5ef-KSvMm'
      },
      success: function(res) {
        console.log(res.data)
      }
    })
  }
})
