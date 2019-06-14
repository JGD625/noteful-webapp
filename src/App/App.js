import React, { Component } from 'react'
import { Route, Link } from 'react-router-dom'
import Context from '../Context'
import NoteListMain from '../NoteListMain/NoteListMain'
import NotePageMain from '../NotePageMain/NotePageMain'
import NoteListNav from '../NoteListNav/NoteListNav'
import NotePageNav from '../NotePageNav/NotePageNav'
import AddNote from '../AddNote/AddNote'
import AddFolder from '../AddFolder/AddFolder'
import './App.css'
import config from '../config'
import ErrorBoundary from '../errorboundary/errorBoundary'
import Header from '../Header/Header'

class App extends Component {
  state = {
    notes: [],
    folders: [],
  };

  componentDidMount() {
    Promise.all([
      fetch(`${config.API_ENDPOINT}/api/notes`),
      fetch(`${config.API_ENDPOINT}/api/folders`)
    ])
      .then(([notesRes, foldersRes]) => {
        if (!notesRes.ok)
          return notesRes.json().then(e => Promise.reject(e))
        if (!foldersRes.ok)
          return foldersRes.json().then(e => Promise.reject(e))

        return Promise.all([
          notesRes.json(),
          foldersRes.json(),
        ])
      })
      .then(([notes, folders]) => {
        this.setState({ notes, folders })
        Context.notes = notes;
        Context.folders = folders;
      })
      .catch(error => {
        console.error(error);
      })
  }

  handleAddNote = note => {
    this.setState({
      notes: [
        ...this.state.notes,
        note
      ]
    })
  }

  handleAddFolder = folder => {
    this.setState({
      folders: [
        ...this.state.folders,
        folder
      ]
    })
  }

  handleDeleteNote = note_id => {
    this.setState({
      notes: this.state.notes.filter(note => note.id !== note_id)
    })
  }

  renderNavRoutes() {
    return (
      <>
       {['/', '/folder/:folder_id'].map(path =>
          <Route
            exact
            key={path}
            path={path}
            component={NoteListNav}
          />
        )}
        <Route
          path='/note/:note_id'
          component={NotePageNav}
        />
        <Route
          path='/add-folder'
          component={NotePageNav}
        />
        <Route
          path='/add-note'
          component={NotePageNav}
        />
      </>
    )
  }

  renderMainRoutes() {
    return (
      <>
        {['/', '/folder/:folder_id'].map(path =>
          <Route
            exact
            key={path}
            path={path}
            component={NoteListMain}
          />
        )}
        <Route
          path='/note/:note_id'
          component={NotePageMain}
        />
        <Route
          path='/add-folder'
          component={AddFolder}
        />
        <Route
          path='/add-note'
          component={AddNote}
        />
      </>
    )
  }

  render() {
    const value = {
      notes: this.state.notes,
      folders: this.state.folders,
      addFolder: this.handleAddFolder,
      addNote: this.handleAddNote,
      deleteNote: this.handleDeleteNote,
    }
    return (
      <ErrorBoundary>
        <Context.Provider value={value}>
          <div className='App'>
            <nav className='App__nav'>
              {this.renderNavRoutes()}
            </nav>
            <Header className='App__header'>
              <h1>
                <Link to='/'>Noteful</Link>
                {' '}
                
              </h1>
            </Header>
            <main className='App__main'>
              {this.renderMainRoutes()}
            </main>
          </div>
        </Context.Provider>
      </ErrorBoundary>
    )
  }
}

export default App
