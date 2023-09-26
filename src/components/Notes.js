import React, { useContext } from 'react'
import noteContext from '../contexts/notes/noteContext'
import Noteitem from './Noteitem'

function Notes() {
    const context = useContext(noteContext)
    const {notes, setNotes} = context;
    return (
        <div className='row my-3'>
            <h2>My Notes</h2>
            {notes.map((note) => {
                return <Noteitem note={note}/>
            })}

        </div>
    )
}

export default Notes