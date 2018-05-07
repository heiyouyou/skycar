// pages/route/orderDetail/orderDetail.js
let util = require('../../../utils/util');
let app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    orderDetailUrl:'/shuttle-bus/shuttle-detail',
    orderId:0,
    orderDetailObj:{},
    orderStatus:'',
    orderPrice:'',
    currentRouteType:3,
    textarea_content:'',
    success:false,
    star_level:0,
    hide:true,
    show_url:'../../imgs/common/stop@2x.png',
    show:true,
    showCancel: true,
    showPay:false,
    commentShow:false,
    // 控制地图容器的显示与隐藏，防止弹窗被地图组件遮盖
    map_show:true,
    add_height:0,
    markers: [{
      iconPath: "../../imgs/common/starting@2x.png",
      id: 1,
      longitude: 113.3245211,
      latitude: 23.10229,
      width: 22,
      height: 36
    },{
      iconPath: "../../imgs/common/end@2x.png",
      id: 2,
      longitude: 113.324520,
      latitude: 23.21229,
      width: 22,
      height: 36
    }],
    polyline: [{
      points: [{
        longitude: 113.3245211,
        latitude: 23.10229
      }, {
        longitude: 113.324520,
        latitude: 23.21229
      }],
      color:"#F1604F",
      width: 4,
      borderColor:'#000',
      borderWidth:1,
    }],
  },
  maskToggle(){
    app.maskToggle(this)
    this.setData({
      'textarea_content':'',
      'success':false,
      'star_level':0,
      'map_hide':!this.data.map_hide
    })
  },
  // 评论点赞
  commentStar(e){
    let level = e.currentTarget.dataset.level
    this.setData({
      'star_level':level
    })
  },
  textareaBlur(e){
    let content = e.detail.value
    this.setData({
      'textarea_content':content
    })
  },
  // 获取评论的内容
  getCommentData(){
    this.setData({
      'success':!this.data.success
    })
  },
  // 收缩隐藏订单部分内容
  toggle(){
    this.getRect()
    console.log(this.data.show)
    let url = !this.data.show?'../../imgs/common/stop@2x.png':'../../imgs/common/open@2x.png'
    let show = !this.data.show
    this.setData({
      'show_url':url,
      'show':show
    })
  },
  // 获取隐藏部分高度
  getRect(){
    wx.createSelectorQuery().select("#toggle-block").boundingClientRect((rect)=>{
      let height = rect.height
      this.setData({
        'add_height':height
      })
    }).exec()
  },
  regionchange(e) {
    console.log(e.type)
  },
  markertap(e) {
    console.log(e.markerId)
  },
  controltap(e) {
    console.log(e.controlId)
  },
  // 获取订单详情
  getOrderDetail(params){
    const that = this;
    util._ajax_({
      data: params,
      url:util.server+that.data.orderDetailUrl,
      success: function(res) {
        let orderDetail = res.data.data;
        let setDataObj = { 'orderDetailObj': orderDetail};
        if(that.data.currentRouteType==1){//结伴班车（地图）
          Object.assign(setDataObj, {
            'orderStatus': orderDetail.info.status,
            'map_show': true,
            'orderPrice': orderDetailObj.info.price,
            'markers[0].longitude': orderDetail.departure.lng,
            'markers[0].latitude': orderDetail.departure.lat,
            'markers[1].longitude': orderDetail.destination.lng,
            'markers[1].latitude': orderDetail.destination.lat,
            'polyline[0].points[0].longitude': orderDetail.departure.lng,
            'polyline[0].points[0].latitude': orderDetail.departure.lat,
            'polyline[0].points[1].longitude': orderDetail.destination.lng,
            'polyline[0].points[1].latitude': orderDetail.destination.lat
          });
        } else if (that.data.currentRouteType == 3 && orderDetail.mission.length==1 && orderDetail.mission[0].mission_type!=3){//机场接送（接机或者送机地图）
          Object.assign(setDataObj, {
            'orderStatus': orderDetail.mission[0].status_text,
            'map_show':true,
            'orderPrice': orderDetailObj.mission[0].price,
            'markers[0].longitude': orderDetail.mission[0].routes.wayPoints[0].longitude,
            'markers[0].latitude': orderDetail.mission[0].routes.wayPoints[0].latitude,
            'markers[1].longitude': orderDetail.mission[1].routes.wayPoints[0].latitude,
            'markers[1].latitude': orderDetail.mission[1].routes.wayPoints[0].latitude,
            'polyline[0].points': orderDetail.mission[1].routes.waps
          });
        }
        if (that.data.currentRouteType == 3) {//机场接送（支付、取消和评价按钮）
          object.assign(setDataObj,{
            'showCancel': orderDetail.show_cancel?true:false,
            'showPay': orderDetail.show_pay ? true : false,
            'commentShow': orderDetail.mission[0].pay_status?true:false,
          })
        }
        that.setData(setDataObj);
      }
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options)
    let url = this.data.orderDetailUrl;
    let params = {};
    if(options.type==1){
      url = '/shuttle-bus/shuttle-detail';
      params = { id: options.id };
    } else if (options.type == 2){
      
    } else if (options.type == 3) {
      url = '/mission/detail';
      params = {out_trade_no:options.id};
      
    }
    this.setData({
      currentRouteType:options.type,
      orderId:options.id,
      orderDetailUrl:url
    })
    this.getOrderDetail(params);
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