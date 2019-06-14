import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom'
import './Note.css'
import { format } from 'date-fns'
import NoteContext from '../NoteContext.js'
import PropTypes from 'prop-types'

class Note extends Component{
    static defaultProps = {
        history: {
          push: () => { },
          goBack: () => {}
        },
    }
    static contextType = NoteContext;

    handleClickDelete = e => {
        e.preventDefault()
        const noteId = this.props.id
        console.log('id', noteId)
        fetch(`https://frozen-escarpment-37250.herokuapp.com/api/notes/${noteId}`, {
            method: 'DELETE',
            headers: {
              'content-type': 'application/json'
            },
          })
            .then(res => {
              if (!res.ok)
                return res.json().then(e => Promise.reject(e))
              return res.json()
            })
            .then(resJson => {
              console.log('id2', resJson.noteId)
              this.context.deleteNote(resJson.noteId)
              this.props.history.push(`/`)
            })
            .catch(error => {
              console.log('delete note ',{ error })
            })
 }
    render(){
        const { name, id, modified } = this.props
        return(
          <form onSubmit={this.handleClickDelete}>
          <div className='Note'>
              <h2 className='Note__title'>
                  <Link to={`/note/${id}`}>
                      {name}
                  </Link>
              </h2>
              <button 
                  className='Note__delete'
                  type='submit'>Delete</button>
              <div className='Note__dates'>
                  <div className='Note__dates-modified'>
                      Modified
                      {' '}
                      <span className='Date'>
                          {format(modified, 'Do MMM YYYY')}
                      </span>
                  </div>
              </div>
          </div>
          </form>
        )
    }
}
Note.propTypes = {
  modified: PropTypes.string,
  name: PropTypes.string,
  id: PropTypes.number,
};
export default withRouter(Note)
