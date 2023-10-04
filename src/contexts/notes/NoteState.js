import React, { useState } from 'react';
import NoteContext from './noteContext';

const NoteState = (props) => {
  const host = "http://localhost:5000"
  const notesMain = []

  const [notes, setNotes] = useState(notesMain)
  
  //fetch all notes
  const fetchNote = async () => {
      
    const response = await fetch(`${host}/api/notes/fetchnotes`, {
      method: "GET", 
      headers: {
        "Content-Type": "application/json",
        "auth-token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjUwNjBiMzRkNDBiNDNjNDM5N2UxMGYwIn0sImlhdCI6MTY5NTY3MDk0MX0.6hx0kTvsCnlVvVl20UaufX3LHQJTl5PMtGikCYLpwis"
      }
    }); 

    const json = await response.json()
    setNotes(json)
  }

  //add a note
  const addNote = async (title, description, tag) => {
    // eslint-disable-next-line  
    const response = await fetch(`${host}/api/notes/addnote`, {
      method: "POST", 
      headers: {
        "Content-Type": "application/json",
        "auth-token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjUwNjBiMzRkNDBiNDNjNDM5N2UxMGYwIn0sImlhdCI6MTY5NTY3MDk0MX0.6hx0kTvsCnlVvVl20UaufX3LHQJTl5PMtGikCYLpwis"
      },
      body: JSON.stringify({title, description, tag}), 
    }); 

    const note = {
      "_id": "650b48debca998267d9c548ee1",
      "user": "65060b34d40b43c4397e10f0",
      "title": title,
      "description": description,
      "tag": tag,
      "date": "2023-09-20T19:32:46.948Z",
      "__v": 0
    }
    setNotes(notes.concat(note))
  }

  //delete a note 
  const deleteNote = async (id) => {
    // eslint-disable-next-line
    const response = await fetch(`${host}/api/notes/deletenote/${id}`, {
      method: "DELETE", 
      headers: {
        "Content-Type": "application/json",
        "auth-token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjUwNjBiMzRkNDBiNDNjNDM5N2UxMGYwIn0sImlhdCI6MTY5NTY3MDk0MX0.6hx0kTvsCnlVvVl20UaufX3LHQJTl5PMtGikCYLpwis"
      }
    });

    const newNote = notes.filter((note) => { return note._id !== id })
    setNotes(newNote)
  }
  //edit note
  const editNote = async (id, title, description, tag) => {
    // eslint-disable-next-line
    const response = await fetch(`${host}/api/notes/updatenote/${id}`, {
      method: "PUT", 
      headers: {
        "Content-Type": "application/json",
        "auth-token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjUwNjBiMzRkNDBiNDNjNDM5N2UxMGYwIn0sImlhdCI6MTY5NTA2MjczNn0.FY-GflrQOsBqBImVLbCjxrkH_ODhe98RNqPRdWNeHiw"
      },
      body: JSON.stringify({title, description, tag}), 
    });
    
    let newNotes= JSON.parse(JSON.stringify(notes))
    for (let i = 0; i < newNotes.length; i++) {
      const element = newNotes[i];
      if (element._id === id) {
        newNotes[i].title = title;
        newNotes[i].description = description;
        newNotes[i].tag = tag;
        break;
      }
    }
    setNotes(newNotes)
  }

  return (
    <NoteContext.Provider value={{ notes, setNotes, addNote, deleteNote, editNote, fetchNote }}>
      {props.children}
    </NoteContext.Provider>
  )
}

export default NoteState;