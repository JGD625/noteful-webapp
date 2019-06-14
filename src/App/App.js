
import React, { Component } from 'react';
import { Route} from 'react-router-dom';
import Header from '../Header/Header';
import NotePageNav from '../NotePageNav/NotePageNav';
import NoteListNav from '../NoteListNav/NoteListNav';
import NoteListMain from '../NoteListMain/NoteListMain';
import NotePageMain from '../NotePageMain/NotePageMain';
import AddFolder from '../AddFolder/AddFolder';
import AddNote from '../AddNote/AddNote';
import NoteContext from '../NoteContext.js';
import './App.css'


class App extends Component {
    state = {
    notes: [],
    folders: [],
  };
  static defaultProps = {
    history: {
      push: () => { },
      goBack: () => {}
    },
}
  componentDidMount() {
    //fetch folders from the api
    this.updateList()
  }

  updateList = () => {
    Promise.all([
      fetch(`https://frozen-escarpment-37250.herokuapp.com/api/notes`),
      fetch(`https://frozen-escarpment-37250.herokuapp.com/api/folders`)
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
      })
      .catch(error => {
        console.error({ error })
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

  handleAddNote = note => {
    this.setState({
      notes: [
        ...this.state.notes,
        note
      ]
    })
  }
  handleDeleteNote = noteId => {
    this.updateList()
  }
  renderNavRoutes(){
    return(
      <>
        {['/', '/folder/:folderId'].map(path =>
          <Route
            exact
            key={path}
            path={path}
            component={NoteListNav}
          />
        )}
        <Route
          path='/note/:noteId'
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
  renderMainRoutes(){
    return (
      <>
      {['/', '/folder/:folderId'].map(path =>
        <Route
          exact
          key={path}
          path={path}
          component={NoteListMain}
        />
      )}
      <Route
        path='/note/:noteId'
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
  render(){
    const contextValue = {
      notes: this.state.notes,
      folders: this.state.folders,
      deleteNote: this.handleDeleteNote,
      addFolder: this.handleAddFolder,
      addNote: this.handleAddNote,
    }
    return (
      <NoteContext.Provider value={contextValue}>
        <div className='App'>
          <Header ></Header>
          <nav className="App__nav">
            {this.renderNavRoutes()}
          </nav>
          <main className='App__main'>
            {this.renderMainRoutes()} 
          </main>
        </div>
      </NoteContext.Provider>
    );
  }
}

export default App;
