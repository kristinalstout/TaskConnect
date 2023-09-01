import { useState } from 'react';
import { nanoid } from 'nanoid'; 

const AddNote = ({ handleAddNote }) => {
  const [noteText, setNoteText] = useState('');
  const characterLimit = 200;

  // Handle changes in the textarea
  const handleChange = (event) => {
    if (characterLimit - event.target.value.length >= 0) {
      setNoteText(event.target.value);
    }
  };

  // Handle the save button click
  const handleSaveClick = () => {
    if (noteText.trim().length > 0) {
      // Call the provided handleAddNote function to add the note
      handleAddNote(noteText);
      setNoteText(''); // Clear the textarea after saving
    }
  };

  return (
    <div className='note new'>
      <textarea
        rows='8'
        cols='10'
        placeholder='Type to add a note...'
        value={noteText}
        onChange={handleChange}
      ></textarea>
      <div className='note-footer'>
        <small>
          {characterLimit - noteText.length} Remaining
        </small>
        <button className='save' onClick={handleSaveClick}>
          Save
        </button>
      </div>
    </div>
  );
};

export default AddNote;
