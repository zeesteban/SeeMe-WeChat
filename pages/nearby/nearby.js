// // nearby.js
var app = getApp()
Page({
  data: {
    inputShowed: false,
    inputVal: "",
    users: [],
    current_user: null
  },
  onLoad: function () {
    let page = this;
    var current_user = wx.getStorageSync('currentUserId')
    // Nearby API request
    wx.request({
      url: 'https://seeme.shanghaiwogeng.com/api/v1/users',
      method: "get",
      success: function (res) {
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
        console.log("Sent")
        console.log(res.data.id)
        wx.reLaunch({
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



    // Calculate Distance between the User and all the users

    //   function getDistanceFromLatLonInKm(lat1, lon1, lat2, lon2) {
    //     var R = 6371; // Radius of the earth in km
    //     var dLat = deg2rad(lat2 - lat1);  // deg2rad below
    //     var dLon = deg2rad(lon2 - lon1);
    //     var a =
    //       Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    //       Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2)) *
    //       Math.sin(dLon / 2) * Math.sin(dLon / 2)
    //       ;
    //     var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    //     var d = R * c; // Distance in km
    //     return d;
    //   }

    // function deg2rad(deg) {
    //   return deg * (Math.PI / 180)
    // }




// }

  
