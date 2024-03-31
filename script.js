let currentSection = null;

function createSection() {
    const sectionName = document.getElementById('section-name').value;
    if (!sectionName) {
        alert('Please enter a section name.');
        return;
    }
    const sectionsList = document.getElementById('sections-list');
    const li = document.createElement('li');
    li.textContent = sectionName;
    li.addEventListener('click', () => {
        // Set the clicked section as active
        if (currentSection) {
            currentSection.classList.remove('active-section');
        }
        currentSection = li;
        currentSection.classList.add('active-section');
        updateNotesVisibility();
    });
    sectionsList.appendChild(li);
}

function createNote() {
    const noteContent = document.getElementById('note-content').value;
    const notesContainer = document.getElementById('notes-container');
    if (!currentSection) {
        alert('Please select a section to add the note.');
        return;
    }
    const noteDiv = document.createElement('div');
    noteDiv.classList.add('note');
    noteDiv.dataset.section = currentSection.textContent; // Store the section name as data attribute
    noteDiv.innerHTML = `
        <div class="note-content">${noteContent}</div>
        <div class="note-options">
            <button class="edit-btn" onclick="editNote(this)">Edit</button>
            <button class="delete-btn" onclick="deleteNote(this)">Delete</button>
        </div>
    `;
    notesContainer.appendChild(noteDiv);
    document.getElementById('note-content').value = ''; // Clear the textarea after saving note
    updateNotesVisibility();
}

function editNote(button) {
    const noteDiv = button.parentElement.parentElement;
    const noteContent = noteDiv.querySelector('.note-content').textContent;
    const textarea = document.createElement('textarea');
    textarea.value = noteContent;
    noteDiv.replaceChild(textarea, noteDiv.querySelector('.note-content'));
    button.textContent = 'Save';
    button.setAttribute('onclick', 'saveEditedNote(this)');
}

function saveEditedNote(button) {
    const noteDiv = button.parentElement.parentElement;
    const editedContent = noteDiv.querySelector('textarea').value;
    noteDiv.innerHTML = `
        <div class="note-content">${editedContent}</div>
        <div class="note-options">
            <button class="edit-btn" onclick="editNote(this)">Edit</button>
            <button class="delete-btn" onclick="deleteNote(this)">Delete</button>
        </div>
    `;
}

function deleteNote(button) {
    const noteDiv = button.parentElement.parentElement;
    noteDiv.remove();
}

function updateNotesVisibility() {
    const notes = document.querySelectorAll('.note');
    notes.forEach(note => {
        if (currentSection && note.dataset.section !== currentSection.textContent) {
            note.style.display = 'none';
        } else {
            note.style.display = 'block';
        }
    });
}
