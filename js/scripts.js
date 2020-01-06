// TechDegree-Project5
// Junior Lam Tiang

// Variable that holds the div with the id of gallery
var gallery = $('#gallery');
// variable that holds the url path to API
var urlAPI = 'https://randomuser.me/api/?results=12';

// function that gets the JSON from a url and uses a callback on the data within
function getJSON(url, callback){
    // create XMLHttp request
    const xhr = new XMLHttpRequest();
    // open a request
    xhr.open('GET', url);
    // create a callback function for the callback parameter
    xhr.onload = () => {
      // conditional that checks if xhr request was success
      if(xhr.status === 200){
        let data = JSON.parse(xhr.responseText);
        return callback(data);
      }
  };
  // send the request
  xhr.send();
}

// function that creates the HTML elements for the data and appends to the HTML doc
function generateCard(data){
  // creates an HTML element
  const section = document.createElement('section');
  // appends the element to the div
  gallery.append(section);
  // creates the card for each employee with summary of person
  section.innerHTML = `
  <div class="card">
      <div class="card-img-container">
          <img class="card-img" src="${data.results[0].picture.large}">
      </div>
      <div class="card-info-container">
          <h3 id="name" class="card-name cap">${data.results[0].name.first + " " + data.results[0].name.last}</h3>
          <p class="card-text">${data.results[0].email}</p>
          <p class="card-text cap">${data.results[0].location.state + ", " + data.results[0].location.city}</p>
      </div>
  </div>
  `;

  // event listener that waits until card is clicked
  section.addEventListener('click', (event) => {
    // variables that hold the parts of the date of birth
    var dob = data.results[0].dob.date;
    var month = dob.substr(5, 2);
    var day = dob.substr(8, 2);
    var year = dob.substr(0, 4);

    // creates the modal window with detailed info on person clicked
    event.target.innerHTML = `
      <div class="modal-container">
          <div class="modal">
              <button type="button" id="modal-close-btn" class="modal-close-btn"><strong>X</strong></button>
              <div class="modal-info-container">
                  <img class="modal-img" src="${data.results[0].picture.large}" alt="profile picture">
                  <h3 id="name" class="modal-name cap">${data.results[0].name.first + " " + data.results[0].name.last}</h3>
                  <p class="modal-text">${data.results[0].email}</p>
                  <p class="modal-text cap">${data.results[0].location.city}</p>
                  <hr>
                  <p class="modal-text">${data.results[0].cell}</p>
                  <p class="modal-text">${data.results[0].location.street.number+" "+data.results[0].location.street.name+" "+data.results[0].location.city+", "+data.results[0].location.state}</p>
                  <p class="modal-text">Birthday: ${month+"/"+day+"/"+year}</p>
              </div>
          </div>
      `;

      // variable that holds the x button
      var button = document.getElementById("modal-close-btn");

      // event listener that waits until x button is clicked
      button.addEventListener('click', (button) => {
        // removes the modal window
        event.target.remove();
      });
  });
};

// gets the JSON from the API and calls back the generateHTML() function for the data
getJSON(urlAPI, (json) => {
  json.results.map( person => {
    getJSON(urlAPI, generateCard);
  });
});
