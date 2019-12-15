import React, {Component} from 'react';
import {Route, Link} from 'react-router-dom';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import ListNav from '../ListNav/ListNav';
import ListMain from '../ListMain/ListMain';
import PageMain from '../PageMain/PageMain';
import ApiContext from '../ApiContext';
import config from '../config';
import './App.css';
import FolderForm from '../FolderForm/folderForm';
import Form from '../Form/Form';
import ErrorBoundary from '../ErrorBoundary/errorBoundary'

class App extends Component {
    state = {
        notes: [],
        folders: []
    };

    componentDidMount() {
        Promise.all([
            fetch(`${config.API_ENDPOINT}/notes`),
            fetch(`${config.API_ENDPOINT}/folders`)
        ])
            .then(([notesRes, foldersRes]) => {
                if (!notesRes.ok)
                    return notesRes.json().then(e => Promise.reject(e));
                if (!foldersRes.ok)
                    return foldersRes.json().then(e => Promise.reject(e));

                return Promise.all([notesRes.json(), foldersRes.json()]);
            })
            .then(([notes, folders]) => {
                this.setState({notes, folders});
            })
            .catch(error => {
                console.error({error});
            });
    }

    addNote = response => {
        this.setState({
            notes: this.state.notes.push(response)
        });
    }

    addFolder = response => {
        this.setState({
            folders: this.state.folders.push(response)
        });
    }

    handleDeleteNote = noteId => {
        this.setState({
            notes: this.state.notes.filter(note => note.id !== noteId)
        });
    };

    handleDeleteFolder = folderId => {
        this.setState({
            folders: this.state.folders.filter(folder => folder.id !== folderId)
        });
    }

    renderNavRoutes() {
        return (
            <>
                {['/', '/folder/:folderId'].map(path => (
                    <Route
                        exact
                        key={path}
                        path={path}
                        component={ListNav}
                    />
                ))}
                <Route path="/note/:noteId" component={NotePageNav} />
                <Route path="/add-note" component={NotePageNav} />
                <Route path="/add-folder" component={NotePageNav} />
            </>
        );
    }

    renderMainRoutes() {
        return (
            <>
                {['/', '/folder/:folderId'].map(path => (
                    <Route
                        exact
                        key={path}
                        path={path}
                        component={ListMain}
                    />
                ))}
                {/* <Route path="/" exact key="/" component={NoteListMain}/>
                <Route path="/folder/:folderId" exact key="/folder/:folderId" component={NoteListMain}/> */}
                <Route path="/note/:noteId" component={PageMain} />
                <Route path="/add-note" component={Form} />
                <Route path="/add-folder" component={FolderForm} />
            </>
        );
    }

    render() {
        const value = {
            notes: this.state.notes,
            folders: this.state.folders,
            deleteNote: this.handleDeleteNote,
            addNote: this.addNote,
            addFolder: this.addFolder,
            deleteFolder: this.handleDeleteFolder
        };
        return (
            <ApiContext.Provider value={value}>
                <ErrorBoundary>
                <div className="App">
                    <nav className="App__nav">{this.renderNavRoutes()}</nav>
                    <header className="App__header">
                        <h1>
                            <Link to="/">Noteful</Link>{' '}
                            <FontAwesomeIcon icon="check-double" />
                        </h1>
                    </header>
                    <main className="App__main">{this.renderMainRoutes()}</main>
                </div>
                </ErrorBoundary>
            </ApiContext.Provider>
        );
    }
}

export default App;
