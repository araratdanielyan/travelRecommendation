const searchButton = document.getElementById("searchButton");
const resetButton = document.getElementById("resetButton");
let resultArray = [];

function addRecommendation(object, time) {
    // create a new div element
    const newDiv = document.createElement("div");
    newDiv.classList.add("recommendation_item");

    const newPic = document.createElement("img");
    newPic.setAttribute("src", object.imageUrl);

    const newTitle = document.createElement("h3");
    newTitle.innerHTML = object.name;

    const newText = document.createElement("p");
    newText.innerHTML = object.description;

    const newTime = document.createElement("p");
    newTime.innerHTML = time;
  
    newDiv.appendChild(newPic);
    newDiv.appendChild(newTitle );
    newDiv.appendChild(newText);
    newDiv.appendChild(newTime);
  
    const currentDiv = document.getElementById("result");
    currentDiv.appendChild(newDiv);
}

function getRecommendation(){

    fetch('travel_recommendation_api.json')
    .then(response => response.json())
    .then(data => {
        let input = document.getElementById('userInput').value.toLowerCase().trim().replace(/,/g,"");

        if(input === "beach" || input === "beaches"){
            input = "beaches";
        } else if(input === "temple" || input === "temples"){
            input = "temples";
        }else if (input === "country" || input === "countries"){
            input = "countries";
        }

        if(input === "countries"){
            data.countries.forEach( (el) => {
                resultArray.push(el.cities);
            });

            const optionsOne = { timeZone: "Australia/Sydney", hour12: true, hour: 'numeric', minute: 'numeric', second: 'numeric' };
            const sydneyTime = new Date().toLocaleTimeString('en-US', optionsOne);

            const optionsTwo = { timeZone: "Asia/Tokyo", hour12: true, hour: 'numeric', minute: 'numeric', second: 'numeric' };
            const tokyoTime = new Date().toLocaleTimeString('en-US', optionsTwo);

            addRecommendation(resultArray[0][0], sydneyTime);
            addRecommendation(resultArray[1][0], tokyoTime);



        } else if(input === "temples") {
            data.temples.forEach( (el) => {
                resultArray.push(el);
            });

            const optionsOne = { timeZone: "Australia/Sydney", hour12: true, hour: 'numeric', minute: 'numeric', second: 'numeric' };
            const tampleOneTime = new Date().toLocaleTimeString('en-US', optionsOne);

            const optionsTwo = { timeZone: "Australia/Sydney", hour12: true, hour: 'numeric', minute: 'numeric', second: 'numeric' };
            const tampleTwoTime = new Date().toLocaleTimeString('en-US', optionsTwo);

            addRecommendation(resultArray[0], tampleOneTime);
            addRecommendation(resultArray[1], tampleTwoTime);
        } else if(input === "beaches") {
            data.beaches.forEach( (el) => {
                resultArray.push(el);
            });

            const optionsOne = { timeZone: "Australia/Sydney", hour12: true, hour: 'numeric', minute: 'numeric', second: 'numeric' };
            const beachOneTime = new Date().toLocaleTimeString('en-US', optionsOne);

            const optionsTwo = { timeZone: "Australia/Sydney", hour12: true, hour: 'numeric', minute: 'numeric', second: 'numeric' };
            const beachTwoTime = new Date().toLocaleTimeString('en-US', optionsTwo);

            addRecommendation(resultArray[0], beachOneTime);
            addRecommendation(resultArray[1], beachTwoTime);
        } else {
            alert("Invalid entry. Please choose from these options: temples, countries, beaches.");
        }
        
    })
    .catch(error => {
        console.error('Error:', error);
        resultDiv.innerHTML = 'An error occurred while fetching data.';
    });

}

function reset(){
    resultArray = [];
    const currentDiv = document.getElementById("result");
    currentDiv.innerHTML = "";
}

searchButton.addEventListener("click", getRecommendation);
resetButton.addEventListener("click", reset);