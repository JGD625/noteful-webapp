import React, { Component } from 'react'
import Note from '../Note/Note'
import NoteContext from '../NoteContext'
import { getNotesForFolder } from '../notes-helpers'
import LinkButton from '../LinkButton/LinkButton.js'
import LoadingError from '../LoadingError'
import './NoteListMain.css'

class NoteListMain extends Component {
  static defaultProps = {
    match: {
        params: {}
    }
  }
  static contextType = NoteContext;
  render(){
    const { notes } = this.context
    const { folderId } = this.props.match.params
    const notesForFolder = getNotesForFolder(notes, parseInt(folderId))

    return (
      <section className='NoteListMain'>
        <ul>
          {notesForFolder.map(note =>
            <li key={note.id}>
              <LoadingError key={note.id}>
                <Note
                  id={note.id}
                  name={note.note_name}
                  modified={note.modified_date}
                />
              </LoadingError>
            </li>
          )}
        </ul>
        <div className='NoteListMain__button-container'>
          <LinkButton
            to='/add-note'
            className='NoteListMain__add-note-button'
          >
            Add Note!
          </LinkButton>
        </div>
      </section>
    )
  }
}

export default NoteListMain;
