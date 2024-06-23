function hideButton() {
    document.getElementById('create-note-btn').classList.add('hidden');
    document.querySelector('.form-container').classList.remove('hidden');
}

function closeForm(event) {
    event.preventDefault();

    document.querySelector('.form-container').classList.add('hidden');
    document.getElementById('create-note-btn').classList.remove('hidden');

    createNote();
}


function createNote(){
    const container = document.getElementById('note-container');
    const title = document.getElementById('title-input').value;
    const content = document.getElementById('content-input').value;

    const note = document.createElement('div');
    note.classList.add('note');
    note.innerHTML = `<h2>${title}</h2><p>${content}</p>`;
    note.addEventListener('click', deleteNote);
    
    container.appendChild(note);
    saveToStorage(title, content);
    
    document.getElementById('title-input').value = '';
    document.getElementById('content-input').value = '';
}

function deleteNote(event) {
    const noteElement = event.target;
    const title = noteElement.querySelector('h2').innerText;
    const content = noteElement.querySelector('p').innerText;

    noteElement.remove();

    let notes = JSON.parse(localStorage.getItem('notes')) || [];
    notes = notes.filter(note => note.title !== title || note.content !== content);
    localStorage.setItem('notes', JSON.stringify(notes));
}

function saveToStorage(title, content){
    const notes = JSON.parse(localStorage.getItem('notes')) || [];
    notes.push({title, content});
    localStorage.setItem('notes', JSON.stringify(notes));
}

function loadFromStorage(){
    const notes = JSON.parse(localStorage.getItem('notes')) || [];
    const container = document.getElementById('note-container');

    notes.forEach(note => {
        const noteElement = document.createElement('div');

        noteElement.classList.add('note');
        noteElement.innerHTML = `<h2>${note.title}</h2><p>${note.content}</p>`;
        noteElement.addEventListener('click', deleteNote);
        container.appendChild(noteElement);
    });
}

document.addEventListener('DOMContentLoaded', loadFromStorage);