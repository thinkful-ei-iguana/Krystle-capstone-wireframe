import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import Note from '../Note/Note'
import CircleButton from '../CircleButton/CircleButton'
import ApiContext from '../ApiContext'
import { getNotesForFolder } from '../notes-helpers'
import './ListMain.css'
import PropTypes from 'prop-types';

export default class ListMain extends React.Component {
  static defaultProps = {
    match: {
      params: {}
    }
  }
  static contextType = ApiContext

  render() {
    const { folderId } = this.props.match.params
    const { notes = [] } = this.context
    const notesForFolder = getNotesForFolder(notes, folderId)
    return (
      <section className='ListMain'>
        <ul>
          {notesForFolder.map(note =>
            <li key={note.id}>
              <Note
                id={note.id}
                name={note.name}
                modified={note.modified}
              />
            </li>
          )}
        </ul>
        <div className='ListMain__button-container'>
          <CircleButton
            tag='link'
            to='/add-note'
            type='button'
            className='ListMain__add-note-button'
          >
            <>
              <FontAwesomeIcon icon='plus' />
              <br />
              Note
            </>
          </CircleButton>
        </div>
      </section>
    )
  }
}

ListMain.propTypes = {
  params: PropTypes.object
}
