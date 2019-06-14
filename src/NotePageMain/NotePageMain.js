import React from 'react'
import Note from '../Note/Note'
import './NotePageMain.css'
import { findNote } from '../note-helpers'
import NotefulContext from '../NotefulContext/NotefulContext'
import PropTypes from 'prop-types'

export default class NotePageMain extends React.Component {
  static propTypes = {
    match: PropTypes.shape ({
      params: PropTypes.func.isRequired
    })
  }
  static defaultProps = {
    match: {
      params: {}
    }
  }

  static contextType = NotefulContext

  handleDeleteNote = note_id => {
    this.props.history.push(`/`)
  }

  render() {
    const { notes } = this.context
    const { note_id } = this.props.match.params
    const note = findNote(notes, note_id) || { content: '' }
    return (
      <section className='NotePageMain'>
        <Note
          id={note.id}
          name={note.name}
          modified={note.modified}
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