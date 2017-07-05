// // nearby.js
var app = getApp()
Page({
  data: {
    inputShowed: false,
    inputVal: "",
    users: [],
    current_user: null,
  },
  onLoad: function () {
    let page = this;
    var current_user = wx.getStorageSync('currentUserId')
    var token = wx.getStorageSync('token')
    // Nearby API request
    wx.request({
          url: 'http://localhost:3000/api/v1/users',
          method: 'get',
          data: {
            latitude: wx.getStorageSync('lat'),
            longitude: wx.getStorageSync('lng')
          },
          header: {
            'Content-Type': 'application/json',
            'X-User-Token': token
          },
          success: function(res) {
            console.log("Response from get request")
            console.log(res.data)
            page.setData({
              users: res.data,
              current_user: current_user
            })
          }
        })

  },

  // End of API request

  meetViewTap: function(e) {
    console.log(e.target.id)
      wx.showLoading({
        title: 'Creating...',
      })

      setTimeout(function(){
        wx.hideLoading()
      },2000),
    wx.request({
      url: 'http://localhost:3000/api/v1/meetings/',
      method: "post",
      data: {
        meeting: {
          recipient_id: e.target.id
        }
      },
      header: {
        'X-User-Token': wx.getStorageSync('token'),
        'Content-Type': 'application/json'
      },
      success: function (res) {
        wx.navigateTo({
           url: '../meeting/meeting?id=' + res.data.id
        })
      }
    })
  },


  profileTap: function (e) {
    var userid = e.currentTarget.id
    wx.navigateTo({
      url: '../userProfile/userProfile?id=' + userid
    })
  },

  onPullDownRefresh: function(){
    wx.request({
      url: 'http://localhost:3000/api/v1/users',
      method: "get",
      success: function (res) {
        console.log("refreshed")
        page.setData({
          users: res.data,
          current_user: current_user
        })
      }
    })
    wx.stopPullDownRefresh()
  }

  // showInput: function () {
  //   this.setData({
  //     inputShowed: true
  //   });
  // },
  // hideInput: function () {
  //   this.setData({
  //     inputVal: "",
  //     inputShowed: false
  //   });
  // },
  // clearInput: function () {
  //   this.setData({
  //     inputVal: ""
  //   });
  // },
  // inputTyping: function (e) {
  //   this.setData({
  //     inputVal: e.detail.value
  //   });
  // },


});

