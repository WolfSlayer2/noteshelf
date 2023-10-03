import React, { useContext, useEffect, useRef, useState } from 'react'
import noteContext from '../contexts/notes/noteContext'
import Noteitem from './Noteitem'
import AddNote from './AddNote'

function Notes() {
    const context = useContext(noteContext)
    const { notes, fetchNote } = context
    useEffect(() => {
        fetchNote();
        // eslint-disable-next-line
    }, [])
    const updateNote = (currnote) => {
        reference.current.click()
        setNote({etitle: currnote.title, edescription: currnote.description, etag: currnote.tag})
    }
    const reference = useRef(null)
    const [note, setNote] = useState({ etitle: "", edescription: "", etag: "" })
    // eslint-disable-next-line
    const handleNote = (e) => {
        //no page reload
        e.preventDefault();
    }
    const onChange = (e) => {
        setNote({ ...note, [e.target.name]: e.target.value })
    }

    return (
        <>
            <AddNote />
            <button type="button" className="btn btn-primary d-none" data-bs-toggle="modal" data-bs-target="#exampleModal" ref={reference}>
                Launch demo modal
            </button>
            <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h1 className="modal-title fs-5" id="exampleModalLabel">Modal title</h1>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            <form>
                                <div className="mb-3">
                                    <label htmlFor="etitle" className="form-label">Title</label>
                                    <input type="text" className="form-control" id="etitle" name="etitle" value={note.etitle} aria-describedby="title" onChange={onChange} />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="edescription" className="form-label">Description</label>
                                    <input type="text" className="form-control" id="edescription" name="edescription" value={note.edescription} onChange={onChange} />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="tag" className="form-label">Tag</label>
                                    <input type="text" className="form-control" id="etag" name="etag" value={note.etag} onChange={onChange} />
                                </div>
                            </form>
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                            <button type="button" className="btn btn-primary">Save changes</button>
                        </div>
                    </div>
                </div>
            </div>
            <div className='row'>
                <h2>My Notes</h2>
                {notes.map((note) => {
                    return <Noteitem key={note._id} note={note} updateNote={updateNote} />
                })}

            </div>
        </>
    )
}

export default Notes