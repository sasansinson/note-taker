const save = document.getElementById('save');
const notesContainer = document.getElementById('notes-container');

const createCard = (note) => {
  // Create card
  const cardEl = document.createElement('div');
  cardEl.classList.add('card', 'mb-3');
  cardEl.setAttribute('key', note.note_id);


  // Create card body
  const cardBodyEl = document.createElement('div');
  cardBodyEl.classList.add('card-body', 'bg-light', 'p-2');
  cardBodyEl.innerHTML = `<p>${note.note}</p>`;

  // Append the body to the card element
  cardEl.appendChild(cardBodyEl);

  // Append the card element to the notes container in the DOM
  notesContainer.appendChild(cardEl);
};

// Get a list of existing notes from the server
const getNotes = () =>
  fetch('api/notes', {
    method: 'GET', 
    headers: {
      'Content-Type': 'application/json',
    },
    // body: JSON.stringify(data),
  })
    .then((response) => response.json())
    .then((data) => data)
    .catch((error) => {
      console.error('Error:', error);
    });

// Post a new note to the page
const postNote = (note) =>
  fetch('api/notes', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(note),
  })
    .then((response) => response.json())
    .then((data) => {
      alert(data);
      createCard(note);
    })
    .catch((error) => {
      console.error('Error:', error);
    });

// When the page loads, get all the notes
getNotes().then((data) => data.forEach((note) => createCard(note)));

// Function to handle when a user submits a note
const handleSubmit = (e) => {
  e.preventDefault();
  console.log('Note submit invoked');

  // Get the value of the note and save it to a variable
  const noteContent = document.getElementById('note-text').value;

  // get the value of the title and save it to a variable
  const title = document.getElementById('note-title').value.trim();

  // Create an object 
  const newNote = {
    title: title,
    text: noteContent,
  };

  // Make a fetch POST request to the server
  postNote(newNote);
};

// Listen for when the form is submitted
save.addEventListener('click', handleSubmit);