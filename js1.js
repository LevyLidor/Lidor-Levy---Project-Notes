
const noteContainer = document.getElementById('container');
const task = document.getElementById('task');
const time = document.getElementById('deadline1');
const date = document.getElementById('deadline2');

function getNote() {
  return notes = JSON.parse(localStorage.getItem("notes")) || [];
} ;


const addNote = (id, task, time, date) => {
  notes.push({
    'id': id,
    'task': task,
    'time': time,
    'date': date
  })

  localStorage.setItem("notes", JSON.stringify(notes))

  return { id, task, time, date };
};



const createNoteElement = ({ id, task, time, date }) => {
  const newDiv = document.createElement("div");
  const newDiv2 = document.createElement("div");
  const newDiv3 = document.createElement("p");
  const deleteButton = document.createElement("div")

  noteContainer.appendChild(newDiv)
  newDiv.appendChild(deleteButton)
  newDiv.appendChild(newDiv2)
  newDiv.appendChild(newDiv3)

  newDiv.className = "note fadeIn col-2 ";
  newDiv2.className = "deatials";
  newDiv3.className = "date";
  deleteButton.className = "deleteButton"

  newDiv2.innerHTML = task;
  newDiv3.innerHTML = `${date} ${time}`;

  addToBeginning(noteContainer, newDiv)

  window.addEventListener("load", () => {
    newDiv.className = "note col-2 ";
  })

  newDiv.addEventListener("mouseover", () => {
    deleteButton.className = "deleteButton bi bi-x-circle";
  })

  newDiv.addEventListener("mouseleave", () => {
    deleteButton.className = "deleteButton";
  })

  deleteButton.addEventListener("click", () => {
    const doDelete = confirm(
      "Are you sure you wish to delete this note?"
    );

    if (doDelete) {
      deleteNote(id, newDiv);
    }
  });
};


getNote().forEach(createNoteElement);


function tasks(e) {

  let id = localStorage.getItem("counterNotesId");
  localStorage.setItem("counterNotesId", ++id);
  
  e.preventDefault();

  const newNotes = addNote(
    id,
    task.value,
    time.value,
    date.value
  )
  createNoteElement(newNotes)

  task.value = "";
  time.value = "";
  date.value = "";

};



function addToBeginning(parent, toInsert) {

  firstChild = parent.firstChild;
  parent.insertBefore(toInsert, firstChild)
}


function deleteNote(id, element) {

  notes = getNote().filter((notes) => notes.id != id);
  localStorage.setItem("notes", JSON.stringify(notes))
  noteContainer.removeChild(element);
};

