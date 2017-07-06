// pages/search/search.js
Page({
  data: {
    tag_list_fun: ["Stand-up Comedy", "Hot Sauce Tasting", "Taobao Shopping", "Bargaining", "Mispronouncing Mandarin Tones", "外卖 at 2 am", "Drinking beer", "Having no personal space", "KTV", "Beyoncé", "Craving Western food", "Hot Pot"],
    tag_list_active: ["Cutting in line", "Dancing", "Subway Combat Sports", "Stalking", "Using chopsticks", "Spitting", "Visiting friends in Pudong", "Beerwalking", "Running from pollution", "Queuing", "Finding Mobikes", "Taxi catching"],
    tag_list_geeky: ["Le Wagon", "HTML", "CSS", "AR/VR", "Startups", "UX/UI", "Ruby", "Finding the right VPN server", "Meetups", "Orbital Mechanics", "Octocat", "Collecting stickers", "Fizz Buzz", "Chewbacca"],
    tag_list_chill: ["Netflix"],
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
    wx.setStorageSync('tag', tag)
    var latitude = wx.getStorageSync('latitude')
    var longitude = wx.getStorageSync('longitude')
    wx.request({
      // this is the url for add hobby, we pass value through the url, so inside this request we dont need body of data.
      url: 'https://seeme.shanghaiwogeng.com/api/v1/profile',
      method: 'put',
      data: {
        "user": {
          "latitude": latitude,
          "longitude": longitude,
          "tag": tag
        }
      },
      header: {
        'Content-Type': 'application/json',
        'X-User-Token': token
      },
      success: function (res) {
        try {
          console.log(res)
          wx.setStorageSync('tag_list', res.data.tag_list)
        } catch (e) {
          console.log("Didn't set storage")
        }

      }
    }),
      wx.switchTab({
        url: '../nearby/nearby?id=' + tag,
        success: wx.showToast({
          icon: 'success',
          title: 'Added to profile 😊',
          duration: 3000
        }) 
      })
  },

  showAll: function (e) {
    console.log(e)
    var tag = e.currentTarget.id
    wx.reLaunch({
      url: '../nearby/nearby?id=' + tag
    })
  },
  onPullDownRefresh: function () {
    wx.stopPullDownRefresh()
  },
})
