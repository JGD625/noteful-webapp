import React, { Component } from 'react'
import NoteContext from '../NoteContext'
import { findNote, findFolder } from '../notes-helpers'
import './NotePageNav.css'

export default class NotePageNav extends Component{
    static defaultProps = {
        history: {
            goBack: () => {}
        },
        match: {
            params: {}
        }
    }
    static contextType = NoteContext;
    
    render(){
        const { folders, notes } = this.context
        const { noteId } = this.props.match.params
        const note = findNote(notes, noteId) || {}
        const folder = findFolder(folders, note.folderId)
        return(
            <div className='notePageNav'>
                <button
                    tag='button'
                    role='link'
                    onClick={() => this.props.history.goBack()}
                    className='NotePageNav__back-button'
                >
                <br/>
                Back
                </button>
                {folder && (
                    <h3 className='NotePageNav__folder-name'>
                        {folder.folder_name}
                    </h3>
                )}
            </div>
        )
    }
}
