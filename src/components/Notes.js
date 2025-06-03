import React, { useContext, useEffect } from 'react'
import noteContext from './context/notes/noteContext'
import NoteItem from './NoteItem';
import AddNote from './AddNote';

const Notes = (props) => {
  const context = useContext(noteContext);
  const { notes, getNotes } = context;
  // Used useEffect because we want the updated notes every time we do something with them
  useEffect(() => {
    getNotes()
  })
  return (
    <>
      <AddNote />
      <div className='row my-3'>
        <h3>Your Notes</h3>
        {notes.length === 0 ? (
          <p>Please add a note to display</p>
        ) : (
          notes.map((note) => (
            <NoteItem key={note._id} note={note} showAlert={props.showAlert} />
          ))
        )}
      </div>

    </>
  )
}

export default Notes
