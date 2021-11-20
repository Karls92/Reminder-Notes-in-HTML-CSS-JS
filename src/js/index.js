// Using Singleton Pattern  
const Notes = {
    // Array with all notes objects
    listNotes : [], 
    container_notes: document.getElementById('notes_list'),
    // get a note
    get: function(id) {
         return this.listNotes[id]
    }, 
    // Create a note
    add: function(data) {  
        this.listNotes.push(data); 
        const note_liElement = document.createElement("li");
        note_liElement.className = `li-note-container`;
        note_liElement.innerHTML = `<button class="btn-pin-close" type="button" onclick = deleteBtnListener(this);><img src="src/assets/img/push_pin_clip.png" alt="pin to note" class="pin-img"></button> <a href="#" class="notes ${data.colours} ${data.transform}"> <h4 class="note-date">${data.datetime}</h4> <p class="note-details">${data.details}</p> </a>`;
        this.container_notes.appendChild(note_liElement);
    }, 
    // update a note
    update: function(id, data) {       
         this.listNotes[id] = data;
    },
    // delete a note
    delete: function(e) { 
     var li_node = e.parentNode;
     var parent = li_node.parentNode;
     var nodes = Array.prototype.slice.call(parent.children);
     var index = nodes.indexOf(li_node);
     var listArray = this.listNotes;
     e.classList.add('remove-pin');
     li_node.classList.add('remove-note-effect');
          setTimeout(function(){
               //delete data in the array
               listArray.pop(index);
               // delete note
               parent.removeChild(li_node);
          }, 1200);
   },
    // List all notes
    listALl: function() {
         return this.listNotes;
    }
}
//return a formatted string with the now Date-time value 
const getFormattedDateNow = function(){
     let nowDate = new Date();
     const day = (nowDate.getDate() < 10 ? '0' : '') + nowDate.getDate();
     const month = ((nowDate.getMonth() + 1) < 10 ? '0' : '') + (nowDate.getMonth() + 1);
     const year = nowDate.getFullYear();
     const hours = (nowDate.getHours() < 10 ? '0' : '') + nowDate.getHours();
     const minutes = (nowDate.getMinutes() < 10 ? '0' : '') + nowDate.getMinutes();
     return `${year}-${month}-${day}T${hours}:${minutes}`;
}
//return a formatted string with the Date-time value selected by user
const getFormattedDateToNote = function(datetime){
     let choseDate = new Date(datetime);
     const day = (choseDate.getDate() < 10 ? '0' : '') + choseDate.getDate();
     const month = ((choseDate.getMonth() + 1) < 10 ? '0' : '') + (choseDate.getMonth() + 1);
     const year = choseDate.getFullYear();
     const hours = (choseDate.getHours() < 10 ? '0' : '') + choseDate.getHours();
     const minutes = (choseDate.getMinutes() < 10 ? '0' : '') + choseDate.getMinutes();
     return `${day}/${month}/${year} ${hours}:${minutes} ${choseDate.getHours() < 12 ? 'AM' : 'PM'}`;
}
//Set a min Datetime value and a default value for the date-time field
document.getElementById('datetime-task').min = getFormattedDateNow();
document.getElementById('datetime-task').value = getFormattedDateNow();

// get form fields
const myForm = document.forms['info-notes'];
// colours of the notes
const colours = ['light-green', 'light-blue', 'light-yellow', 'fuchsia', 'light-purple', 'strong-orange'];
// transform of the note
const transform_rotate = ['rotate-0', 'rotate-30', 'rotate--30'];

// form submit event. 
myForm.addEventListener('submit', (event) => {
event.preventDefault();
let note_info = {
     details: document.getElementById('write-task').value, 
     datetime: getFormattedDateToNote(document.getElementById('datetime-task').value),
     colours: colours[Math.floor(Math.random() * colours.length)],
     shape: 'squard',
     transform: transform_rotate[Math.floor(Math.random() * transform_rotate.length)]
}
Notes.add(note_info);
});
//function to delete notes from the board.
const deleteBtnListener = function(e) {
     Notes.delete(e);
}


