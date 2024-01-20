import NoteContext from "./noteContext";
import { useState } from "react";

const NoteState = (props) => {
  const host = "https://inotebook-backend-beta.vercel.app"
  const notesInitial = []
  const [notes, setNotes] = useState(notesInitial)

  // Get all Notes
  const getNotes = async () => {
    // API Call 
    const response = await fetch(`${host}/api/notes/fetchallnotes`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        "auth-token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjU5ZThjNjUyNjk3YjhiOGQwMTgyNGY5In0sImlhdCI6MTcwNDk0NTEwN30.zv0NCZn3IfbH9LoXCnQxXMZWPLZFeEDvL4HsaTUKqY8"
      }
    });
    const json = await response.json()
    console.log(json)
    setNotes(json)
  }

  //add a note
  const addNote = async (title, description, tag) => {
    const response = await fetch(`${host}/api/notes/addnote`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        "auth-token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjU5ZThjNjUyNjk3YjhiOGQwMTgyNGY5In0sImlhdCI6MTcwNDk0NTEwN30.zv0NCZn3IfbH9LoXCnQxXMZWPLZFeEDvL4HsaTUKqY8"
      },
      body: JSON.stringify({ title, description, tag })
    });
    console.log("Adding a new note")
    const note = {
      "_id": "",
      "user": "659e8c652697b8b8d01824f9",
      "title": title,
      "description": description,
      "tag": tag,
      "date": "2024-01-19T16:33:05.930+00:00",
      "__v": 0
    };
    setNotes(notes.concat(note))
  }
  //delete a note
  const deleteNote = async (id) => {
    const response = await fetch(`${host}/api/notes/deletenote/${id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        "auth-token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjU5ZThjNjUyNjk3YjhiOGQwMTgyNGY5In0sImlhdCI6MTcwNDk0NTEwN30.zv0NCZn3IfbH9LoXCnQxXMZWPLZFeEDvL4HsaTUKqY8"
      }
    });
    const json= response.json();
    console.log(json);
    console.log("Deleting the note with id" + id);
    const newNotes = notes.filter((note) => { return note._id !== id })
    setNotes(newNotes)
  }
  // edit a note 
  const editNote = async (id, title, description, tag) => {
    const response = await fetch(`${host}/api/notes/updatenote/${id}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        "auth-token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjU5ZThjNjUyNjk3YjhiOGQwMTgyNGY5In0sImlhdCI6MTcwNDk0NTEwN30.zv0NCZn3IfbH9LoXCnQxXMZWPLZFeEDvL4HsaTUKqY8"
      },
      body: JSON.stringify({ title, description, tag })
    });
    const json = response.json();
    // Logic to edit in client
    for (let index = 0; index < notes.length; index++) {
      const element = notes[index];
      if (element._id === id) {
        element.title = title;
        element.description = description;
        element.tag = tag;
      }
    }
  }
  return (
    <NoteContext.Provider value={{ notes, addNote, deleteNote, editNote, getNotes}}>
      {props.children}
    </NoteContext.Provider>
  );
};

export default NoteState;