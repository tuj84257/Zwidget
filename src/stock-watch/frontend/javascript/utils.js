/**
 * Generates the stock chart.
 * @param {DOMString} chartCanvas - The canvas element
 * @param {Array} labels - The chart labels
 * @param {Array} data - The chart data
 * @param {String} color - The chart color
 * @returns {Chart} The generated chart
 */
function generateChart(chartCanvas, labels, data, color) {
    const stockChart = new Chart(chartCanvas, {
        type: 'line',
        data: {
            labels: labels,
            datasets: [{
                data: data,
                backgroundColor: 'transparent',
                borderColor: color,
                borderWidth: 3,
                pointRadius: 0,
                lineTension: 0
            }]
        },
        options: {
            maintainAspectRatio: true,
            scales: {
                x: {
                    display: false,
                },
                y: {
                    beginAtZero: false,
                    display: false
                }
            },
            plugins: {
                legend: {
                    display: false
                }
            },
            layout: {
                padding: {
                    top: 5
                }
            }
        }
    });
    return stockChart;
}

/** Hides the dropdown search form. */
function hideDropdown(dropdown) {
    dropdown.style.position = 'absolute';
    dropdown.style.display = 'none';
}

/** Displays the dropdown search form. */
function showDropdown(dropdown) {
    dropdown.style.position = 'relative';
    dropdown.style.display = 'flex';
}

/**
 * Empties the div content.
 * @param {Element} element - The DOM element to be emptied
 */
function emptyDiv(element) {
    while(element.firstChild)
        element.removeChild(element.firstChild);
}

/**
 * Displays the stock price information for a given stock ticker.
 * @param {String} stockSymbol - the stock symbol
 * @param {Element} mainContent - the main content div where the information will be displayed
 */
function displayStockInfo(stockSymbol, mainContent) {
    stockWatchWindowAPI.sendToBackend('get-stock-info', stockSymbol);
    // After the first call to the backend, get
    // stock info from the backend every 4 hours
    const interval = setInterval(() => {
        stockWatchWindowAPI.sendToBackend('get-stock-info', stockSymbol);
    }, 4 * 3600 * 1000);
    // Receive the stock data from the backend
    stockWatchWindowAPI.receiveFromBackend('stock-info', (stockData) => {
        emptyDiv(mainContent);
        if(stockData === 'error') {
            clearInterval(interval);
            mainContent.insertAdjacentHTML('afterbegin', `\
                <p class="text-center text-white mt-[24px]">\
                    Could not find stock price information for the given stock symbol!\
                </p>\
            `);
        }
        else {
            let chartColor = (stockData.closingPriceDifference < 0) ? '#bd1491' : '#37cdbe';
            let classColor = (stockData.closingPriceDifference < 0) ? 'text-secondary' : 'text-accent';
            let arrowRotationAngleClass = (stockData.closingPriceDifference < 0) ? 'rotate-225' : 'rotate-45';
            let arrowViewBox = (stockData.closingPriceDifference < 0) ? '-10 -4 28 28' : '3 -4 28 28'
            const mainContentHTML = `
                <div class="grid grid-cols-2 gap-2">\
                    <!-- Left column -->\
                    <div>\
                        <p class="font-thin text-white">$${stockSymbol.toUpperCase()}</p>\
                        <div class="mt-9">\
                            <p class="text-white text-3xl font-thin">$${stockData.lastClosingPrice.toLocaleString()}</p>\
                            <div class="flex ${classColor}">\
                                <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 ${arrowRotationAngleClass} mt-1" viewBox="${arrowViewBox}" fill="currentColor">\
                                    <path fill-rule="evenodd" d="M5.293 7.707a1 1 0 010-1.414l4-4a1 1 0 011.414 0l4 4a1 1 0 01-1.414 1.414L11 5.414V17a1 1 0 11-2 0V5.414L6.707 7.707a1 1 0 01-1.414 0z" clip-rule="evenodd" />\
                                </svg>\
                                <span class="-ml-1.5 text-sm">$${Math.abs(stockData.closingPriceDifference).toLocaleString()} (${stockData.differencePercentage}%)</span>\
                            </div>\
                        </div>\
                    </div>\
                    <!-- Right column -->\
                    <div class="w-[120px] mt-[10px]">\
                        <canvas height="240" id="stockChart"></canvas>\
                    </div>\
                </div>\
            `
            mainContent.insertAdjacentHTML('afterbegin', mainContentHTML);
            const chartCanvas = document.getElementById('stockChart').getContext('2d');
            const chart = generateChart(chartCanvas, stockData.chartLabels, stockData.chartData, chartColor);
        }
    });
}
