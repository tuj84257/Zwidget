// The renderer for the Stock Watch widget

stockWatchWindowAPI.sendToBackend('your-channel-here');

stockWatchWindowAPI.receiveFromBackend('your-channel-here', (args) => {
    // your logic here
});


const ctx = document.getElementById('myChart').getContext('2d');
const myChart = new Chart(ctx, {
    type: 'line',
    data: {
        labels: [1, 2, 3, 4, 5, 6],
        datasets: [{
            data: [214, 230, 224, 260, 250, 256],
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
        }
    }
});
