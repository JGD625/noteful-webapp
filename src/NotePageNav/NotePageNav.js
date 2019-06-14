import React from 'react'
import AppButton from '../AppButton'
import './NotePageNav.css'
import { findNote, findFolder } from '../note-helpers'
import NotefulContext from '../NotefulContext/NotefulContext'



export default class NotePageNav extends React.Component {
 
  static contextType = NotefulContext;

  render() {
    const { notes, folders, } = this.context
    const { note_id } = this.props.match.params
    const note = findNote(notes, note_id) || {}
    const folder = findFolder(folders, note.folder_id)
    return (
      <div className='NotePageNav'>
        <AppButton
          tag='button'
          role='link'
          onClick={() => this.props.history.goBack()}
          className='NotePageNav__back-button'
        >
          
          <br />
          Back
        </AppButton>
        {folder && (
          <h3 className='NotePageNav__folder-name'>
            {folder.name}
          </h3>
        )}
      </div>
    )
  }
}
