// // nearby.js

Page({
  data: {
    inputShowed: false,
    inputVal: "",
    users: [],
  },
  onLoad: function () {
    let page = this;
    // Nearby API request
    // wx.request({
    //   url: 'https://seeme.shanghaiwogeng.com/api/v1/users',
    //   method: "get",
    //     header: {
    //       'content-type': 'application/json'
    //     },
    //   success: function (res) {
    //     page.setData({
    //       users: res.data
    //     })
    //   }
    // })
  },

  // End of API request

  meetViewTap: function () {
    wx.navigateTo({
      url: '../meeting/meeting'
    })
  },
  profileTap: function () {
    wx.navigateTo({
      url: '../profile/profile'
    })
  },

  showInput: function () {
    this.setData({
      inputShowed: true
    });
  },
  hideInput: function () {
    this.setData({
      inputVal: "",
      inputShowed: false
    });
  },
  clearInput: function () {
    this.setData({
      inputVal: ""
    });
  },
  inputTyping: function (e) {
    this.setData({
      inputVal: e.detail.value
    });
  },


});

