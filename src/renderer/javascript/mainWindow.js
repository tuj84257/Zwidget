// The renderer for the main window

mainWindowAPI.receiveFromMain('load-widgets', (allWidgets) => {
    // Dynamically load the list of all widgets in the table of the main window
    allWidgets.forEach(widget => {
        let openButtonID = 'open' + widget.name.replace(" ", "") + 'Button';
        let closeButtonID = 'close' + widget.name.replace(" ", "") + 'Button';
        document.getElementById('tableBody').insertAdjacentHTML('beforeend', `
            <tr>
                <td>${widget.name}</td> 
                <td><button id="${openButtonID}" class="btn btn-xs btn-primary">Open</button><button id="${closeButtonID}" class="btn btn-xs btn-secondary ml-2">Close</button></td> 
            </tr>
        `);
    });

    // Invoke the respective messages when the `Open` and `Close` buttons are clicked
    const tableBodyContent = document.getElementById('tableBody').children;
    Array.from(tableBodyContent).forEach(widgetRow => {
        let widgetName = widgetRow.getElementsByTagName('td')[0].textContent;
        let openAndCloseButtons = widgetRow.getElementsByTagName('td')[1].getElementsByTagName('button');
        let openButtonId = openAndCloseButtons[0].id;
        let closeButtonId = openAndCloseButtons[1].id;
        document.getElementById(openButtonId).addEventListener('click', () => {
            mainWindowAPI.sendToMain('open-widget', widgetName);
        });
        document.getElementById(closeButtonId).addEventListener('click', () => {
            mainWindowAPI.sendToMain('close-widget', widgetName);
        });
        // Disable the `Close` buttons initially
        document.getElementById(closeButtonId).disabled = true;
    });

    // Invoke the message to close the window when the cross button is clicked
    document.getElementById('closeMainWindowButton').addEventListener('click', () => {
        mainWindowAPI.sendToMain('close-main-window');
    });

});

// Disable the `Open` button, and enable the `Close` button when the widget is opened
mainWindowAPI.receiveFromMain('opened-widget', (widgetName) => {
    const openButtonID = 'open' + widgetName.replace(' ', '') + 'Button';
    const closeButtonID = 'close' + widgetName.replace(' ', '') + 'Button';
    document.getElementById(openButtonID).disabled = true;
    document.getElementById(closeButtonID).disabled = false;
});

// Enable the `Open` button, and disable the `Close` button when the widget is opened
mainWindowAPI.receiveFromMain('closed-widget', (widgetName) => {
    const openButtonID = 'open' + widgetName.replace(' ', '') + 'Button';
    const closeButtonID = 'close' + widgetName.replace(' ', '') + 'Button';
    document.getElementById(openButtonID).disabled = false;
    document.getElementById(closeButtonID).disabled = true;
});
