import React from 'react';
import NoteContext from './noteContext';

const NoteState = (props) => {
     return(
         <NoteContext.Provider value={{state: "state"}}>
            {props.children}
         </NoteContext.Provider>
     )
}

export default NoteState;