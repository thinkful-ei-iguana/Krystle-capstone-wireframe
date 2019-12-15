import React from 'react'
import Note from '../Note/Note'
import ApiContext from '../ApiContext'
import { findNote } from '../notes-helpers'
import './PageMain.css'
import PropTypes from 'prop-types';

export default class PageMain extends React.Component {
  static defaultProps = {
    match: {
      params: {}
    }
  }
  static contextType = ApiContext  

  handleDeleteNote = noteId => {
    this.props.history.push(`/`)
  }

  render() {
    const { notes=[] } = this.context
    const { noteId } = this.props.match.params
    const note = findNote(notes, noteId) || { content: '' }
    if(note){
      return (
        <section className='PageMain'>
          <Note
            id={note.id}
            name={note.name}
            modified={note.modified}
            onDeleteNote={this.handleDeleteNote}
          />
          <div className='PageMain__content'>
            {note.content.split(/\n \r|\n/).map((para, i) =>
              <p key={i}>{para}</p>
            )}
          </div>
        </section>
      )
    }
    else {
      return <></>
    }
    
  }
}

PageMain.propTypes = {
  params: PropTypes.object,
  history: PropTypes.oneOfType([
    PropTypes.object,
    PropTypes.array,
  ])
};