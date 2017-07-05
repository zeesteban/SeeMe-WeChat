// pages/search/search.js
Page({
  data: {
    tag_list: ["lala", "something", "something else", "tags", "hobbies"],
    navbar: ['Fun', 'Chill', 'Active', "Geeky"],
    currentNavbar: '0'
  },
  swichNav(e) {
    this.setData({
      currentNavbar: e.currentTarget.dataset.idx
    })
  },
  addTag: function (e) {
    console.log(e)
    var token = wx.getStorageSync('token')
    var tag = e.currentTarget.id
    wx.request({
      url: 'https://seeme.shanghaiwogeng.com/api/v1/profile',
      method: 'patch',
      data: {
        "user": {
          "tag_list": tag
        }
      },
      header: {
        'Content-Type': 'application/json',
        'X-User-Token': token
      },
      success: function (res) {
        try {
          wx.setStorageSync('tag_list', res.data.tag_list)
        } catch (e) {
          console.log("Didn't set storage")
        }

      }
    }),
      wx.reLaunch({
        url: '../nearby/nearby'
      })
  },
})