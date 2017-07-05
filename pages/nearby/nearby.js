// // nearby.js
var app = getApp()
Page({
  data: {
    inputShowed: false,
    inputVal: "",
    users: [],
    current_user: null,
    unactive: "scroll-tag-tiny-text",
    active: null,
    items: [
      {name: 0, value: 'All', checked: 'true'},
      {name: 1, value: 'Male'},
      {name: 2, value: 'Female'},
    ]
  },

  changeStatus: function () {
    this.setData({
      active: "scroll-tag-active"
    })
  },

  onLoad: function (e) {
    console.log(e.id)
    var tag = e.id
    let page = this;
    var current_user = wx.getStorageSync('currentUserId')
    // API request for search. the value e is from the search page.
    wx.request({
      url: 'https://seeme.shanghaiwogeng.com/api/v1/users/search?tag=' + tag,
      method: "patch",
      success: function (res) {
        console.log(res)
        page.setData({
          users: res.data,
          current_user: current_user
        })
      }
    })
  },

  radioChange: function(e) {
    console.log(e.detail.value)
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
      url: 'https://seeme.shanghaiwogeng.com/api/v1/meetings/',
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
      url: 'https://seeme.shanghaiwogeng.com/api/v1/users',
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

