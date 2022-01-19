// The renderer for the Stock Watch widget

const searchButton = document.getElementById('searchButton');
const searchButtonForm = document.getElementById('searchButtonForm');
const dropdown = document.getElementById('dropdown');
const searchInput = document.getElementById('searchInput');
const widgetTitle = document.getElementById('widgetTitle');
const mainContent = document.getElementById('mainContent');

// The search button and search form
// (need to do change the position of the dropdown dynamically 
// because otherwise the search form becomes draggable, and the
// user can't click inside the form)
searchButton.onclick = () => {
    if(dropdown.style.position === 'relative')
        hideDropdown(dropdown);
    else
        showDropdown(dropdown);
}

widgetTitle.onclick = () => {
    hideDropdown(dropdown);
}

searchButtonForm.onclick = () => {
    hideDropdown(dropdown);
    const stockSymbol = searchInput.value;
    if(stockSymbol !== '')
        displayStockInfo(stockSymbol, mainContent);
}

searchInput.addEventListener('keyup', (event) => {
    if(event.code === 'Enter'){
        event.preventDefault();
        hideDropdown(dropdown);
        const stockSymbol = searchInput.value;
        if(stockSymbol !== '')
            displayStockInfo(stockSymbol, mainContent);
    }
});
