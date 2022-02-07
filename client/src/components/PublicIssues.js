
import React, { useState, useEffect, useContext} from "react"
import Comment from "./Comment.js"
import CommentForm from "../forms/CommentForm.js"
import axios from "axios"
import swal from 'sweetalert';
import { CommentContext} from "../context/CommentProvider"


export default function PublicIssues(props) {
    const { title, description, _id, upVotes, downVotes, votedUser } = props


    const { deleteComment, submitComment}= useContext(CommentContext)


    const userAxios = axios.create()

    userAxios.interceptors.request.use(config => {
        const token = localStorage.getItem("token")
        config.headers.Authorization = `Bearer ${token}`
        return config
    })


    

    const [userComments, setUserComments] = useState([])
    const [votes, setVotes] = useState({ upVotes: upVotes || 0, downVotes: downVotes || 0 })
    const [voteErrMsg, setVoteErr] = useState("")
    const [commentToggle, setCommentToggle] = useState(false)
    const [hasVoted, setHasVoted]=useState(false)





    function getAllComments() {
        userAxios.get(`/api/comment/${_id}`)
        .then(res => {
            setUserComments(res.data)
            console.log(res.data)
        }
        )
        .catch(err => console.log(err))
    }

    useEffect(() => {
      getAllComments()
    }, [deleteComment, submitComment])
    
   
    function upVote(id) {
        userAxios.put(`api/issue/upvotes/${id}`)
            .then(res => setVotes(prevVotes => ({ ...prevVotes, upVotes: res.data.upVotes || prevVotes.upVotes })))
            setHasVoted(prevStatus => !prevStatus)
            swal("thanks for voting"," you can only vote once", "success")
            .catch(err => setVoteErr(err.response.data.errMsg))
    }

    function downVote(id) {
        userAxios.put(`api/issue/downvotes/${id}`)
            .then(res => setVotes(prevVotes => ({ ...prevVotes, downVotes: res.data.downVotes || prevVotes.downVotes })))
            setHasVoted(prevStatus => !prevStatus)
            swal("thanks for voting"," you can only vote once", "success")
            .catch(err => console.log(err.response.data.errMsg))
    }


    function AuthVoterLike(){
        if(votedUser.includes(_id)) {
          alert("you already voted on that issue");
        } else {
         upVote(_id)
        }
      }
      function AuthVoterDislike(){
        if(votedUser.includes(_id)) {
          alert("you already voted on that issue");
        } else {
          downVote(_id)
        }
      }

    return (

        !commentToggle ?
            <div className="issue">
                <h2>Issue Name: {title}</h2>
                <p>Description:{description}</p>
                <p>Likes: {votes.upVotes}</p>
                <p>Dislikes: {votes.downVotes}</p>

                <button  style={{backgroundColor:"green"}} disabled= {hasVoted} onClick={() => AuthVoterLike(_id)}>Like Issue</button>
                <button  style={{backgroundColor:"#EF3054"}} disabled= {hasVoted} onClick={() => AuthVoterDislike(_id)}>Dislike Issue</button>
                <button onClick={() => setCommentToggle(prevToggle => !prevToggle)}>View Comments</button>
               
            </div>
            :
            <div className="comment">
                <CommentForm _id={_id} submitComment={submitComment}/>
                {userComments.map(comment => <Comment key={comment._id} {...comment} deleteComment={deleteComment} />)}
                <button onClick={() => setCommentToggle(prevToggle => !prevToggle)}>Close Comments</button>
            </div>


    )
}