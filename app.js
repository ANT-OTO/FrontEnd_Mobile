var util = require('./utils/util.js');
var api = require('./config/api.js');
var user = require('./services/user.js');

App({
  onLaunch: function () {
    //获取用户的登录信息
    user.checkLogin().then(res => {
      console.log('app login')
      this.globalData.userInfo = wx.getStorageSync('userInfo');
      this.globalData.token = wx.getStorageSync('token');
      wx.switchTab({
        url: '/pages/products/index',
        success:function(res){
        },
        fail:function(res){
          console.log(res)
        }
      })
    }).catch((error) => {
      //1.ask permison to login or register
      console.log(error)
      user.loginByWeixin().then(res => {
        // this.setData({
        //   userInfo: res.data.userInfo
        // });
        this.globalData.userInfo = res.data.userInfo;
        this.globalData.token = res.data.token;
      }).catch((err) => {
        console.log(err)
        
      });

    });
  },
  
  globalData: {
    
    userInfo: {
      nickname: 'Hi,游客',
      username: '点击去登录',
      avatar: 'http://yanxuan.nosdn.127.net/8945ae63d940cc42406c3f67019c5cb6.png'
    },
    token: '',
  }
})