// // nearby.js
var app = getApp()
Page({
  data: {
    inputShowed: false,
    inputVal: "",
    users: [],
    current_user: null
  },

  changeStatus: function () {
    this.setData({
      active: "scroll-tag-active"
    })
  },

  onLoad: function (e) {
    console.log("this is search")
    var tag = wx.getStorageSync('tag')
    console.log(tag)
    var tag = e.id
    let page = this;
    var current_user = wx.getStorageSync('currentUserId')
    var token = wx.getStorageSync('token')
    // API request for search. the value e is from the search page.
    // wx.request({
    //   url: 'https://seeme.shanghaiwogeng.com/api/v1/users/search?tag=' + tag,
    //   method: "patch",
    //   success: function (res) {
    //     console.log(res)
    //     page.setData({
    //       users: res.data,
    //       current_user: current_user


    // Nearby API request
    wx.request({
          url: 'https://seeme.shanghaiwogeng.com/api/v1/users',
          method: 'get',
          data: {
            latitude: wx.getStorageSync('lat'),
            longitude: wx.getStorageSync('lng'),
            tag: tag
          },
          header: {
            'Content-Type': 'application/json',
            'X-User-Token': token
          },
          success: function(res) {
            console.log("Response from get request")
            console.log('this is search result')
            console.log(res.data)
            page.setData({
              users: res.data,
              current_user: current_user,
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
    let page = this
    var current_user = wx.getStorageSync('currentUserId')
    var token = wx.getStorageSync('token')
    wx.request({
      url: 'https://seeme.shanghaiwogeng.com/api/v1/users',
      method: "get",
      data: {
        latitude: wx.getStorageSync('lat'),
        longitude: wx.getStorageSync('lng')
      },
      header: {
        'Content-Type': 'application/json',
        'X-User-Token': token
      },
      success: function (res) {
        console.log("refreshed")
        console.log(res)
        page.setData({
          users: res.data,
          current_user: current_user
        })
      }
    })
    wx.stopPullDownRefresh()
  },
onShow: function (e) {
  console.log(e)
  wx.request({
    url: 'https://seeme.shanghaiwogeng.com/api/v1/users',
    method: 'get',
    data: {
      latitude: wx.getStorageSync('lat'),
      longitude: wx.getStorageSync('lng'),
      tag: wx.getStorageSync('tag')
    },
    header: {
      'Content-Type': 'application/json',
      'X-User-Token': token
    },
    success: function (res) {
      console.log("Response from get request")
      console.log('this is search result')
      console.log(res.data)
      page.setData({
        users: res.data,
        current_user: current_user,
      })
    }

  })
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

