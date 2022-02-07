import React from "react"
import { DateTime } from "luxon";


export default function Comment(props) {

const { username, deleteComment, _id, comment, date} = props

const newDate=DateTime.now(date).toLocaleString(DateTime.DATE_MED)	

    return (
        <>

        
        <p>"{comment}"</p>
        <p>Comment submitted by: @{username}</p>
        <p>Commented Posted: {newDate}</p>
        {/* <p>Id Issue: {issueId}</p> */}
        <button onClick={()=> deleteComment(_id)}>Delete Comment</button>
        </>
    )

}