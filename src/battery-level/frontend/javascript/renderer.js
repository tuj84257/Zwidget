// Renderer process for the Battery Level widget

// Get battery level initially
batteryLevelWindowAPI.sendToBackend('get-battery-level');

// Send message to the backend every second to get the battery level
setInterval(() => {
    batteryLevelWindowAPI.sendToBackend('get-battery-level');
}, 1000);

// Receive battery level from the backend
batteryLevelWindowAPI.receiveFromBackend('got-battery-level', (batteryLevel) => {
    // Update the circle text
    document.getElementById('batteryPercentageText').textContent = batteryLevel + '%';

    var circle = document.getElementById('mainCircle');
    var radius = circle.r.baseVal.value;
    var circumference = radius * 2 * Math.PI;

    circle.style.strokeDasharray = `${circumference} ${circumference}`;
    circle.style.strokeDashoffset = `${circumference}`;

    function setProgress(percent) {
        const offset = circumference - percent / 100 * circumference;
        circle.style.strokeDashoffset = offset;
    }

    setProgress(batteryLevel);
});
