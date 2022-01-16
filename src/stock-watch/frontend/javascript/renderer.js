// The renderer for the Stock Watch widget

stockWatchWindowAPI.sendToBackend('your-channel-here');

stockWatchWindowAPI.receiveFromBackend('your-channel-here', (args) => {
    // your logic here
});

// The chart
const ctx = document.getElementById('myChart').getContext('2d');
const myChart = new Chart(ctx, {
    type: 'line',
    data: {
        labels: [1, 2, 3, 4, 5],
        datasets: [{
            data: [999, 1056, 1179, 1109, 1019],
            backgroundColor: 'transparent',
            borderColor: '#37cdbe',
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

// The search button and search form
// (need to do change the position of the dropdown dynamically 
// because otherwise the search form becomes draggable, and the
// user can't click inside the form)
document.getElementById('searchButton').onclick = () => {
    if(document.getElementById('dropdown').style.position === 'relative'){
        document.getElementById('dropdown').style.display = 'none';
        document.getElementById('dropdown').style.position = 'absolute';
    }
    else {
        document.getElementById('dropdown').style.position = 'relative';
        document.getElementById('dropdown').style.display = 'flex';
    }
}

document.getElementById('searchButtonForm').onclick = () => {
    document.getElementById('dropdown').style.position = 'absolute';
    document.getElementById('dropdown').style.display = 'none';
}

document.getElementById('widgetTitle').onclick = () => {
    document.getElementById('dropdown').style.position = 'absolute';
    document.getElementById('dropdown').style.display = 'none';
}
