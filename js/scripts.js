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
  data.results.map( person => {
      // creates an HTML element
      const galleryDiv = document.createElement('div');

      galleryDiv.classList.add("card");
      // appends the element to the div
      gallery.append(galleryDiv);
      // console.log(data);
      // creates the card for each employee with summary of person
      galleryDiv.innerHTML = `
          <div class="card-img-container">
              <img class="card-img" src="${person.picture.large}">
          </div>
          <div class="card-info-container">
              <h3 id="name" class="card-name cap">${person.name.first + " " + person.name.last}</h3>
              <p class="card-text">${person.email}</p>
              <p class="card-text cap">${person.location.state + ", " + person.location.city}</p>
          </div>
      `;

      // event listener that waits until card is clicked
      galleryDiv.addEventListener('click', (event) => {
        // variables that hold the parts of the date of birth
        var dob = person.dob.date;
        var month = dob.substr(5, 2);
        var day = dob.substr(8, 2);
        var year = dob.substr(0, 4);

        // variable that creates a div for the modalWindow
        var modalWindow = document.createElement('div');

        // adds the div to the body
        document.body.append(modalWindow);
        // creates the modal window with detailed info on person clicked
        modalWindow.innerHTML = `
          <div class="modal-container">
              <div class="modal">
                  <button type="button" id="modal-close-btn" class="modal-close-btn"><strong>X</strong></button>
                  <div class="modal-info-container">
                      <img class="modal-img" src="${person.picture.large}" alt="profile picture">
                      <h3 id="name" class="modal-name cap">${person.name.first + " " + person.name.last}</h3>
                      <p class="modal-text">${person.email}</p>
                      <p class="modal-text cap">${person.location.city}</p>
                      <hr>
                      <p class="modal-text">${person.cell}</p>
                      <p class="modal-text">${person.location.street.number+" "+person.location.street.name+" "+person.location.city+", "+person.location.state}</p>
                      <p class="modal-text">Birthday: ${month+"/"+day+"/"+year}</p>
                  </div>
              </div>
          `;

          // variable that holds the x button
          var xButton = document.getElementById("modal-close-btn");
          // event listener that waits until x button is clicked
          xButton.addEventListener('click', (button) => {
            // removes the modal window
            modalWindow.remove();
          });
      });
    });
  };


// gets the JSON from the API and calls back the generateHTML() function for the data
// makes sure only 12 users are GET from the API
getJSON(urlAPI, (json) => {
  json.results.map( person => {
    getJSON(urlAPI, generateCard);
  });
});
