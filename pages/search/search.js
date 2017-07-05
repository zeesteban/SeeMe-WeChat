// pages/search/search.js
Page({
  data: {
    tag_list_fun: ["Stand-up Comedy", "Hot Sauce Tasting", "Taobao Shopping", "Mispronouncing Mandarin Tones"],
    tag_list_chill: ["Netflix"],
    tag_list_active: ["Basketball", "Subway Combat Sports", "Dancing", "Stalking", "Golf", "Beerwalking", "Running from pollution", "Swimming", "Tennis", "Finding Mobikes", "Taxi catching"],
    tag_list_geeky: ["Ruby", "HTML", "CSS", "AR/VR", "Startups", "UX/UI", "Le Wagon", "Databases", "Star Wars", "Orbital Mechanics"],
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