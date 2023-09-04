import React from 'react';
import Notes from './Notes';
import AddNote from './AddNote';

function NotesList(props) {
  const { notes, handleAddNote, handleDeleteNote, searchQuery } = props; // Destructure searchQuery here
  // Provide a default value for searchQuery in case it's undefined
  const searchText = searchQuery || '';

  const filteredNotes = notes.filter((note) =>
    note.text.toLowerCase().includes(searchText.toLowerCase())
  );

  return (
    <div className='notes-list'>
      {filteredNotes.map((note) => (
        <Notes
          key={note.id}
          id={note.id}
          text={note.text}
          date={note.date}
          handleDeleteNote={handleDeleteNote}
        />
      ))}
      <AddNote handleAddNote={handleAddNote} />
    </div>
  );
};

export default NotesList;
