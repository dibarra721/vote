import React, { useState, useEffect, useContext } from 'react'
import User from './User.js'
import axios from "axios"
import PublicIssues from './PublicIssues.js'
import { UserContext} from "../context/UserProvider"

export default function Public() {
  const userAxios = axios.create()

  userAxios.interceptors.request.use(config => {
    const token = localStorage.getItem("token")
    config.headers.Authorization = `Bearer ${token}`
    return config
  })

  const [users, setUsers] = useState([])



  const {allIssues, getAllIssues}= useContext(UserContext)
 
  useEffect(() => {
    userAxios.get("/api/users")
    .then(res => setUsers(res.data))
    .catch(err => console.log(err.response.data.errMsg))
  }, [])

    useEffect(() =>{
  getAllIssues()
    }, [])




  return (
    <><div className="public">
      <h1>Take at what users in our community care about </h1>
    </div><div className="publicIssues">
        {users.map(user => <User {...user} key={user._id} />)}
      </div>
      
      <div className="sortedIssue">
      <h2> All Issues in order of number of Likes.</h2>
        {allIssues.sort((a,b) => Number(b.upVotes) -  Number(a.upVotes)).map(issue => <PublicIssues {...issue} key={issue._id } />)}
      </div>
      
      </>

  )

}
