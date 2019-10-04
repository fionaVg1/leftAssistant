var wxCharts = require('../../utils/wxcharts.js');
var app = getApp();
var incomePieChart = null, consumptionPieChart = null, columnChart = null;
Page({
    data: {
    },
    touchHandler: function (e) {
        console.log(incomePieChart.getCurrentDataIndex(e));
    },
    convertIncomeData: function (data) {
        var result = [];
        result.push({
            name: '工资',
            data: parseInt(data['salary'])
        });
        result.push({
            name: '其他收入',
            data: parseInt(data['otherIncome'])
        });
        return result;
    },
    convertConsumptionData: function (data) {
        var result = [];
        result.push({
            name: '信用卡消费',
            data: parseInt(data['creditCardConsumption'])
        });
        result.push({
            name: '蚂蚁花呗消费',
            data: parseInt(data['antConsumption'])
        });
        result.push({
            name: '其他消费',
            data: parseInt(data['otherConsumption'])
        });
        return result;
    },
    convertColumnChartData: function (data) {
        var incomeSum = parseInt(data['salary']) + parseInt(data['otherIncome']);
        var consumptionSum = parseInt(data['creditCardConsumption']) + parseInt(data['antConsumption']) + parseInt(data['otherConsumption']);
        var balance = incomeSum - consumptionSum;
        var chartData = {
            main:{
                title:"月账单",
                data:[incomeSum,consumptionSum,balance],
                categories:['总收入','总支出','结余']
            }
        };
        return chartData;
    },
    onLoad: function (e) {
        var windowWidth = 320;
        try {
            var res = wx.getSystemInfoSync();
            windowWidth = res.windowWidth;
        } catch (e) {
            console.error('getSystemInfoSync failed!');
        }
        var pages = getCurrentPages();
        var prevPage = pages[pages.length - 2];
        var info = prevPage.data;
        var incomePieData = this.convertIncomeData(info);
        incomePieChart = new wxCharts({
            animation: true,
            canvasId: 'incomePieCanvas',
            type: 'pie',
            series: incomePieData,
            width: windowWidth,
            height: 250,
            dataLabel: true,
        });

        var consumptionPieData = this.convertConsumptionData(info);
        consumptionPieChart = new wxCharts({
            animation: true,
            canvasId: 'consumptionPieCanvas',
            type: 'pie',
            series: consumptionPieData,
            width: windowWidth,
            height: 250,
            dataLabel: true,
        }); 

        var chartData = this.convertColumnChartData(info);
        columnChart = new wxCharts({
            canvasId: 'columnCanvas',
            type: 'column',
            animation: true,
            categories: chartData.main.categories,
            series: [{
                name: '月账单',
                data: chartData.main.data,
                format: function (val, name) {
                    return val.toFixed(2) + '元';
                }
            }],
            yAxis: {
                format: function (val) {
                    return val + '元';
                },
                title: '金额',
                min: 0
            },
            xAxis: {
                disableGrid: false,
                type: 'calibration'
            },
            extra: {
                column: {
                    width: 15
                }
            },
            width: windowWidth,
            height: 200,
        });
    }
});