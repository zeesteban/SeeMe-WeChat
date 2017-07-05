// pages/search/search.js
Page({
  data: {
    tag_list_fun: ["Stand-up Comedy", "Hot Sauce Tasting", "Taobao Shopping", "Bargaining", "Mispronouncing Mandarin Tones", "Drinking beer", "Having no personal space"],
    tag_list_chill: ["Netflix"],
    tag_list_active: ["Cutting in line", "Dancing", "Subway Combat Sports", "Stalking", "Using chopsticks", "Beerwalking", "Running from pollution", "Queuing", "Finding Mobikes", "Taxi catching"],
    tag_list_geeky: ["Ruby", "HTML", "CSS", "AR/VR", "Startups", "UX/UI", "Le Wagon", "Finding the right VPN server", "Meetups", "Orbital Mechanics"],
    navbar: ['Fun', 'Geeky', 'Active', "Chill"],
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
      // this is the url for add hobby, we pass value through the url, so inside this request we dont need body of data.
      url: 'https://seeme.shanghaiwogeng.com/api/v1/profile/addhobby?hobby=' + tag,
      method: 'patch',
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
        url: '../nearby/nearby?id=' + tag
      })
  },

  showAll: function (e) {
    console.log(e)
    var tag = e.currentTarget.id
    wx.reLaunch({
      url: '../nearby/nearby?id=' + tag
    })
  }
})
