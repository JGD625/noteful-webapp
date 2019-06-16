    
import React from 'react'

const NoteContext = React.createContext({
    deleteNote: () => {},
    addNote: () => {},
    addFolder: () => {},
    folders: [],
    notes:[],

})

export default NoteContext
