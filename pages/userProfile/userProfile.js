// pages/userProfile/userProfile.js
Page({
  data: {
    users: [],
    id: null
  },
  onLoad: function (e) {

    var findId = e.id
    console.log(findId)
    this.setData({
      id: findId
    })
    let page = this;
    // Nearby API request
    wx.request({
      url: 'https://seeme.shanghaiwogeng.com/api/v1/users',
      method: "get",
      // header: {
      //   'content-type': 'application/json'
      // },
      success: function (res) {
        console.log('hey')
        console.log(res.data)
        page.setData({
          users: res.data
        })
      },
      fail: function() {
        console.log('wat');
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