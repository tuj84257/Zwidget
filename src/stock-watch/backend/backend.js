// The back-end for the Stock Watch widget

const ipcMain = global.share.ipcMain;
const { getWidgetWindow } = require('../../main-window/utils/utils');
const yahooFinance = require('yahoo-finance2').default;

ipcMain.handle('get-stock-info', (event, stockSymbol) => {
    const stockWatchWindow = getWidgetWindow('Stock Watch');
    const currentDateTime = new Date();
    const currentDate = currentDateTime.toISOString().split('T')[0];
    const twentyDays = 20 * 86400000;
    const twentyDaysAgoDateTime = new Date(currentDateTime - twentyDays);
    const twentyDaysAgoDate = twentyDaysAgoDateTime.toISOString().split('T')[0];
    const results = yahooFinance.historical(stockSymbol, { period1: twentyDaysAgoDate, period2: currentDate });

    results.then(jsonArray => {
        const lastFiveDaysData = jsonArray.slice(1).slice(-5);
        let chartLabels = [], chartData = [];
        lastFiveDaysData.forEach(day => {
            chartLabels.push(day.date.toISOString().split('T')[0]);
            chartData.push(parseFloat(day.close.toFixed(2)));
        });
        const lastClosingPrice = chartData.slice(-1)[0];
        const previousClosingPrice = chartData[0];
        const closingPriceDifference = parseFloat((lastClosingPrice - previousClosingPrice).toFixed(2));
        const differencePercentage = parseFloat(((Math.abs(closingPriceDifference) / parseFloat(previousClosingPrice.toFixed(2))) * 100).toFixed(2));
        let stockData = {};
        stockData.chartLabels = chartLabels;
        stockData.chartData = chartData;
        stockData.lastClosingPrice = lastClosingPrice;
        stockData.closingPriceDifference = closingPriceDifference;
        stockData.differencePercentage = differencePercentage;
        stockWatchWindow.webContents.send('stock-info', stockData);
    }, error => {
        stockWatchWindow.webContents.send('stock-info', 'error');
    });
});
