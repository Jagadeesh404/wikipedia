let inputElement = document.getElementById("searchInput");
let searchResults = document.getElementById("searchResults");
let spinnerEl = document.getElementById("spinner");


function createAndAppendResults(result) {
    let {
        title,
        link,
        description
    } = result;

    //creating result name
    let resultEl = document.createElement("div");
    resultEl.classList.add("result-item");
    searchResults.appendChild(resultEl);

    //creating title element
    let anchorEl = document.createElement("a");
    anchorEl.classList.add("result-title");
    anchorEl.textContent = title;
    anchorEl.href = link;
    anchorEl.target = "_blank";
    resultEl.appendChild(anchorEl);


    //creating break element
    let breakEl = document.createElement("br");
    resultEl.appendChild(breakEl);
    //creating url element
    let urlEl = document.createElement("a");
    urlEl.classList.add("result-url");
    urlEl.href = link;
    urlEl.target = "_blank";
    urlEl.textContent = link;
    resultEl.appendChild(urlEl);
    //creating break element
    let lineBreakEl = document.createElement("br");
    resultEl.appendChild(lineBreakEl);
    //creating description element

    let descriptionEl = document.createElement("p");
    descriptionEl.classList.add("link-description");
    descriptionEl.textContent = description;
    resultEl.appendChild(descriptionEl);


}

function displaySearchResults(searchResults) {
    spinnerEl.classList.toggle("d-none");
    for (let result of searchResults)
        createAndAppendResults(result);
}

function wikipediaSearch(event) {
    if (event.key === "Enter") {
        spinnerEl.classList.toggle("d-none");
        searchResults.textContent = "";
        let inputValue = inputElement.value;
        let url = "https://apis.ccbp.in/wiki-search?search=" + inputValue;
        let options = {
            method: "GET"
        };
        fetch(url, options)
            .then(function(response) {
                return response.json()
            })
            .then(function(data) {
                let {
                    search_results
                } = data;
                displaySearchResults(search_results);
            })

    }
}


inputElement.addEventListener("keydown", wikipediaSearch);