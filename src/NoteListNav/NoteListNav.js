import React, { Component } from 'react'
import {NavLink} from 'react-router-dom'
import NoteContext from '../NoteContext.js'
import LinkButton from '../LinkButton/LinkButton.js'
import './NoteListNav.css'


class NoteListNav extends Component{
    static contextType = NoteContext;
    render(){
        const { folders } = this.context
        return (
            <div className='NoteListNav'>
                <ul className='NoteListNav__list'>
                    {folders.map(folder =>
                        <li key={folder.id}>
                            <NavLink
                                className='NoteListNav__folder-link'
                                to={`/folder/${folder.id}`}
                            >
                                {folder.folder_name}
                            </NavLink>
                        </li>
                    )}
                </ul>
                <div className='NoteListNav__button-wrapper'>
                    <LinkButton
                        to='/add-folder'
                        className='NoteListNav__add-folder-button'
                    >
                    Add Folder
                    </LinkButton>
                </div>
            </div>
        )
    } 
}

export default NoteListNav;
