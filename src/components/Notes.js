import React, { useContext } from 'react'
import noteContext from '../contexts/notes/noteContext'
import Noteitem from './Noteitem'

function Notes() {
    const context = useContext(noteContext)
    const {notes, addNote} = context
    return (
        <div className='row'>
            <h2>My Notes</h2>
            {notes.map((note) => {
                return <Noteitem key={note._id} note={note}/>
            })}

        </div>
    )
}

export default Notes