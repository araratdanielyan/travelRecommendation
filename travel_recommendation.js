const searchButton = document.getElementById("searchButton");
const resetButton = document.getElementById("resetButton");
let resultArray = [];

function addRecommendation() {
    // create a new div element
    const newDiv = document.createElement("div");
  
    // and give it some content
    const newContent = document.createTextNode("Hi there and greetings!");
  
    // add the text node to the newly created div
    newDiv.appendChild(newContent);
  
    // add the newly created element and its content into the DOM
    const currentDiv = document.getElementById("div1");
    document.body.insertAfter(newDiv, currentDiv);
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