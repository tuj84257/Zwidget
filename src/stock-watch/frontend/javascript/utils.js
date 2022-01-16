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
    mainContentHTML = `
        <div class="grid grid-cols-2 gap-2">\
            <!-- Left column -->\
            <div>\
                <p class="font-thin text-white">$${stockSymbol.toUpperCase()}</p>\
                <div class="mt-9">\
                    <p class="text-white text-3xl font-thin">$256.45</p>\
                    <div class="flex text-accent">\
                        <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 rotate-45 mt-1" viewBox="3 -4 28 28" fill="currentColor">\
                            <path fill-rule="evenodd" d="M5.293 7.707a1 1 0 010-1.414l4-4a1 1 0 011.414 0l4 4a1 1 0 01-1.414 1.414L11 5.414V17a1 1 0 11-2 0V5.414L6.707 7.707a1 1 0 01-1.414 0z" clip-rule="evenodd" />\
                        </svg>\
                        <span class="-ml-1.5 text-sm">$9.51 (3.85%)</span>\
                    </div>\
                </div>\
            </div>\
            <!-- Right column -->\
            <div class="w-[120px] mt-[10px]">\
                <canvas height="240" id="stockChart"></canvas>\
            </div>\
        </div>\
    `
    // Empty the main content div
    emptyDiv(mainContent);
    // Insert the HTML with the stock price information
    mainContent.insertAdjacentHTML('afterbegin', mainContentHTML);
    // Generate the chart
    const chartCanvas = document.getElementById('stockChart').getContext('2d');
    const chart = generateChart(chartCanvas, [1, 2, 3, 4, 5], [999, 1056, 1179, 1109, 1019], '#37cdbe');
    // Change chart color
    // chart.data.datasets[0].borderColor = '#000';
    // chart.update();
}
