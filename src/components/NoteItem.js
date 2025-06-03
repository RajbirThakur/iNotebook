import React, { useContext, useState } from 'react';
import noteContext from './context/notes/noteContext';

const NoteItem = (props) => {
    const { note } = props;
    const context = useContext(noteContext);
    const { deleteNote, updateNote } = context;

    const [showModal, setShowModal] = useState(false);
    const [title, setTitle] = useState(note.title);
    const [description, setDescription] = useState(note.description);

    const handleDelete = () => {
        deleteNote(note._id);
        props.showAlert('success', 'Your note have been deleted');
    };

    const handleSave = () => {
        // Add your update logic here, e.g., context.updateNote(note._id, title, description)
        updateNote(title, description, note._id);
        setShowModal(false); // close modal
        props.showAlert('success', 'Your note have been updated');
    };

    return (
        <>
            <div className='col-md-3 my-2'>
                <div className="card">
                    <div className="card-body">
                        <h5 className="card-title">{note.title}</h5>
                        <p className="card-text">{note.description}</p>
                        <i className="fa-solid fa-trash mx-1" onClick={handleDelete}></i>
                        <i className="fa-solid fa-pen-to-square mx-1" onClick={() => setShowModal(true)}></i>
                    </div>
                </div>
            </div>

            {showModal && (
                <div className="modal fade show d-block" tabIndex="-1" style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}>
                    <div className="modal-dialog">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title">Edit Note</h5>
                                <button type="button" className="btn-close" onClick={() => setShowModal(false)}></button>
                            </div>
                            <div className="modal-body">
                                <div className="mb-3">
                                    <label className="form-label">Title</label>
                                    <input type="text" className="form-control" value={title} onChange={(e) => setTitle(e.target.value)} />
                                </div>
                                <div className="mb-3">
                                    <label className="form-label">Description</label>
                                    <textarea className="form-control" value={description} onChange={(e) => setDescription(e.target.value)}></textarea>
                                </div>
                            </div>
                            <div className="modal-footer">
                                <button className="btn btn-secondary" onClick={() => setShowModal(false)}>Close</button>
                                <button className="btn btn-primary" onClick={handleSave}>Save changes</button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};

export default NoteItem;
