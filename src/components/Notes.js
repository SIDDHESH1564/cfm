import React, { useContext } from 'react'
import noteContext from "../context/notes/noteContext";
import Noteitem from "../components/Noteitem";
const Notes = () => {
    const context = useContext(noteContext);
    const { notes, setNotes } = context;
    return (
        <div className="container my-4">
            <h2>Your Notes</h2>
            {notes.map((note) => {
                return <Noteitem note={note}/>;
            })}
        </div>
    )
}

export default Notes
