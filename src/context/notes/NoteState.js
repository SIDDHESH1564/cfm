import NoteContext from "./noteContext";
import { useState } from "react";

const NoteState = (props) => {
  const notesInitial=[
      {
        "_id": "65a189414cde61a703be5f8b",
        "user": "659e8c652697b8b8d01824f9",
        "title": "My title",
        "description": "please wake up early",
        "tag": "personal",
        "date": "2024-01-12T18:47:29.784Z",
        "__v": 0
      },
      {
        "_id": "65a189624cde61a703be5f8e",
        "user": "659e8c652697b8b8d01824f9",
        "title": "My Second title",
        "description": "please wake up early and go to gym",
        "tag": "personal",
        "date": "2024-01-12T18:48:02.755Z",
        "__v": 0
      }
    ]
  const [notes,setNotes]=useState(notesInitial)
  return (
    <NoteContext.Provider value={{notes,setNotes}}>
      {props.children}
    </NoteContext.Provider>
  );
};

export default NoteState;
