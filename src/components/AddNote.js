import React, { useContext, useState } from 'react'
import noteContext from './context/notes/noteContext'

const AddNote = () => {
    const context = useContext(noteContext);
    const {addNote} = context;
    const [note, setNote] = useState({title:"", description:"", tag:""});

    const handleOnchange = (e)=>{
        setNote({...note, [e.target.name]: e.target.value})
    }

    const handleOnclick = (e)=>{
        e.preventDefault();
        addNote(note.title, note.description, note.tag);
    }

    return (
        <div>
            <h3>Add a Note</h3>
            <form>
                <div className="mb-3">
                    <label htmlFor="title" className="form-label">Title</label>
                    <input type="text" className="form-control" id="title" name='title' aria-describedby="emailHelp" onChange={handleOnchange} />
                </div>
                <div className="mb-3">
                    <label htmlFor="description" className="form-label">Description</label>
                    <input type="text" className="form-control" id="description" name='description' onChange={handleOnchange} />
                </div>
                <button type="submit" onClick={handleOnclick} className="btn btn-primary">Submit</button>
            </form>

        </div>
    )
}

export default AddNote
