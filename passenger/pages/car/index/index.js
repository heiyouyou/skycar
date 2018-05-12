// pages/car/index/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    price: {
      rmb: 28,
      usd: 2.8
    },
    form: {
      departure: [],//出发地
      destination: [],//目的地
      city_id: '',//城市id
      adults: '',//成人数量
      childre: '', //儿童数量
      use_time_local: '',//用车时间
      bigBaggage: '',//大行李数量
      smallBaggage: '',//小行李数量
    }
  },
  getPrice() {
    let self = this,
        form = this.data.form
    util.ajax('/appoint-car/check-price', form, res => {
      
    })
  },
  onBtn() {
    this.getPrice()
  },
  getSysInfo() {
    wx.getSystemInfo({
      success: res => {
        this.setData({
          height: res.windowHeight
        })
        console.log(res)
      },
      fail: function (res) { },
      complete: function (res) { },
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})