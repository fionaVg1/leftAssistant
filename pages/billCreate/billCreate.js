Page({
  data: {
    salary: '',
    otherIncome: '',
    creditCardConsumption: '',
    antConsumption: '',
    otherConsumption: ''
  },
  goToBill: function (e) {    
    wx.navigateTo({
      url: '../bill/bill'
    });
    this.setData(e.detail.value);
  },
  onLoad: function () {

  }
})