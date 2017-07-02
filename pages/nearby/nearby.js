// // nearby.js
var app = getApp()
Page({
  data: {
    inputShowed: false,
    inputVal: "",
    users: [],
  },
  onLoad: function () {
    let page = this;
    // Nearby API request
    wx.request({
      url: 'http://localhost:3000/api/v1/users',
      method: "get",
      // header: {
      //   'content-type': 'application/json'
      // },
      success: function (res) {
        console.log("users")
        console.log(res.data)
        page.setData({
          users: res.data
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
        'X-User-Token': 'o1mdRAuDDoy5ef-KSvMm',
        'Content-Type': 'application/json'
      },
      success: function (res) {
        console.log("Sent")
        console.log(res.data.id)
        wx.navigateTo({
           url: '../meeting/meeting?id=' + res.data.id
        //   success: function() {
        //   wx.showToast({
        //     title: 'Success!',
        //     icon: 'success',
        //     duration: 2000
        //   })
        // },
      })
      }
    })
  },


  profileTap: function (e) {
    var userid = e.currentTarget.id
    console.log(e.currentTarget.id)
    wx.navigateTo({
      url: '../userProfile/userProfile?id=' + userid
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

