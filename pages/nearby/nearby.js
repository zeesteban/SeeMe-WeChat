// // nearby.js

Page({
  data: {
    inputShowed: false,
    inputVal: ""
  },
  meetViewTap: function () {
    wx.navigateTo({
      url: '../meeting/meeting'
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
  }
});

