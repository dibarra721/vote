import React, {useContext, useEffect, useState} from 'react'
import IssueForm from '../forms/AddIssue.js'
import IssueList from './IssueList.js'
import { UserContext } from "../context/UserProvider.js"
import {CommentContext} from "../context/CommentProvider.js"
import Comment from './Comment.js'



export default function Profile(props) {

    const {
        user: { username },
        addIssue,
        getUserIssues,
        issues,
    
    } = useContext(UserContext)

    const { _id, date, issueId, comment, userComments} = props
    
    const {getUserComments}= useContext(CommentContext)

    
    const [commentToggle, setCommentToggle] = useState(false)

    function toggleComment() {
        setCommentToggle(prevState => !prevState)
      }



      function getComments() {
        setCommentToggle(prevState => !prevState)
        if(!commentToggle){
          getUserComments()
          

        }
      }



 useEffect(() => {
        getUserIssues()
    }, [])

   
    
    
    
    
    return (
        <>
        <div className="profile">
            <h1>Welcome {username}! This is your private portal</h1>
            <center><h3>Post your Issue</h3></center>
            <IssueForm addIssue={addIssue} />
            
</div>

            <div className="topics">
               <center> <h3>Issues you care about</h3></center>
                <IssueList issues={issues} /><br/>

                <div className='comment'>
              
              
                </div>
               

            
            </div>
           


            </>
       
    )
}