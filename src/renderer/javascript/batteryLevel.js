batteryLevelWindowAPI.sendToMain('test');
batteryLevelWindowAPI.receiveFromMain('tested', (args) => {
    console.log('received from battery level!')
});
