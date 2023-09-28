import React, { useState } from 'react';
import NoteContext from './noteContext';

const NoteState = (props) => {
    const notesMain = [
        {
          "_id": "6509dff79b0ff98e2c86f0be",
          "user": "65060b34d40b43c4397e10f0",
          "title": "Web Dev",
          "description": "Join fullstack dev journey",
          "tag": "fun",
          "date": "2023-09-19T17:52:55.904Z",
          "__v": 0
        },
        {
          "_id": "650b48debca99267d9c548ee1",
          "user": "65060b34d40b43c4397e10f0",
          "title": "Design",
          "description": "Ever tried UI/UX design?",
          "tag": "fun",
          "date": "2023-09-20T19:32:46.948Z",
          "__v": 0
        },
        {
          "_id": "650b48debca99267d9c548ee",
          "user": "65060b34d40b43c4397e10f0",
          "title": "Design",
          "description": "Ever tried UI/UX design?",
          "tag": "fun",
          "date": "2023-09-20T19:32:46.948Z",
          "__v": 0
        },
        {
          "_id": "650b48debca99267d9c548ee2",
          "user": "65060b34d40b43c4397e10f0",
          "title": "Design",
          "description": "Ever tried UI/UX design?",
          "tag": "fun",
          "date": "2023-09-20T19:32:46.948Z",
          "__v": 0
        }
      ]

     const [notes, setNotes] = useState(notesMain) 

     return(
         <NoteContext.Provider value={{notes, setNotes}}>
            {props.children}
         </NoteContext.Provider>
     )
}

export default NoteState;