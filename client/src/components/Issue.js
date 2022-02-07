import React, { useState, useContext } from "react"
import { UserContext } from "../context/UserProvider.js"
import EditIssueForm from "../forms/EditIssueForm.js"

export default function Issue(props) {

  const { title, description, _id } = props
  const [editToggle, setEditToggle] = useState(false)
  const { addIssue, deleteIssue } = useContext(UserContext)

  return (
    <div className="issue">
      {
        !editToggle ?
          <>
            <h2>{ title }</h2>
            <h3>{ description }</h3>
            
            <button onClick={() => deleteIssue(_id)}>Delete Issue</button>
            <button onClick={() => setEditToggle(prevState => !prevState)}>Edit Issue</button>
          </>
          :
          <>
            <EditIssueForm {...props}  setEditToggle={setEditToggle} addUserIssue={addIssue} />
            <button onClick={() => deleteIssue(_id)}>Delete Issue</button>
            <button onClick={() => setEditToggle(prevState => !prevState)}>Cancel</button>
          </>
      }
    </div>
  )
}