// pages/search/search.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    tag_list: ["lala", "something", "something else", "tags", "hobbies"]
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
