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


            console.log(resultArray);
        }
        
        
        // const condition = data.conditions.find(item => item.name.toLowerCase() === input);
        // if (condition) {
        // const symptoms = condition.symptoms.join(', ');
        // const prevention = condition.prevention.join(', ');
        // const treatment = condition.treatment;

        // resultDiv.innerHTML += `<h2>${condition.name}</h2>`;
        // resultDiv.innerHTML += `<img src="${condition.imagesrc}" alt="hjh">`;

        // resultDiv.innerHTML += `<p><strong>Symptoms:</strong> ${symptoms}</p>`;
        // resultDiv.innerHTML += `<p><strong>Prevention:</strong> ${prevention}</p>`;
        // resultDiv.innerHTML += `<p><strong>Treatment:</strong> ${treatment}</p>`;
        // } else {
        // resultDiv.innerHTML = 'Condition not found.';
        // }
    })
    .catch(error => {
        console.error('Error:', error);
        resultDiv.innerHTML = 'An error occurred while fetching data.';
    });

}

searchButton.addEventListener("click", getRecommendation);