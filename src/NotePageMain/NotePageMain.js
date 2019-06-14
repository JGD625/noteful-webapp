import React, { Component } from 'react'
import Note from '../Note/Note'
import NoteContext from '../NoteContext'
import { findNote } from '../notes-helpers'
import './NotePageMain.css'

export default class NotePageMain extends Component {
  static defaultProps = {
    match: {
        params: {}
    }
  }
  static contextType = NoteContext;
  render(){
    const { notes } = this.context
    const { noteId } = this.props.match.params
    const note = findNote(notes, parseInt(noteId)) || { content: '' }
    return (
      <section className='NotePageMain'>
        <Note
          id={note.id}
          name={note.note_name}
          modified={note.modified_date}
          onDeleteNote={this.handleDeleteNote}
        />
        <div className='NotePageMain__content'>
          {note.content.split(/\n \r|\n/).map((para, i) =>
            <p key={i}>{para}</p>
          )}
        </div>
      </section>
    )
  }
}
