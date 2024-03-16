const searchButton = document.getElementById("searchButton");
const resetButton = document.getElementById("resetButton");
let resultArray = [];

function addRecommendation(object) {
    // create a new div element
    const newDiv = document.createElement("div");

    const newPic = document.createElement("img");
    newPic.setAttribute("src", object.imageUrl);

    const newTitle = document.createElement("h3");
    newTitle.innerHTML = object.name;

    const newText = document.createElement("p");
    newText.innerHTML = object.description;
  
    newDiv.appendChild(newPic);
    newDiv.appendChild(newTitle );
    newDiv.appendChild(newText);
  
    const currentDiv = document.getElementById("result");
    currentDiv.appendChild(newDiv);
  }

function getRecommendation(){
    const input = document.getElementById('userInput').value.toLowerCase();
    const resultDiv = document.getElementById('result');

        
    fetch('travel_recommendation_api.json')
    .then(response => response.json())
    .then(data => {

        if(input === "countries"){
            data.countries.forEach( (el) => {
                resultArray.push(el.cities);
            });

            addRecommendation(resultArray[0][0]);
            addRecommendation(resultArray[1][0]);

        } else if(input === "temples") {
            data.temples.forEach( (el) => {
                resultArray.push(el);
            });

            addRecommendation(resultArray[0]);
            addRecommendation(resultArray[1]);
        } else if(input === "beaches") {
            data.beaches.forEach( (el) => {
                resultArray.push(el);
            });

            addRecommendation(resultArray[0]);
            addRecommendation(resultArray[1]);
        } else {
            alert("Invalid entry. Please choose from these options: temples, countries, beaches.");
        }
        
    })
    .catch(error => {
        console.error('Error:', error);
        resultDiv.innerHTML = 'An error occurred while fetching data.';
    });

}

searchButton.addEventListener("click", getRecommendation);