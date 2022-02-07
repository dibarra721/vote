import React, {useState} from "react"

const initInputs = {
    title:"",
    description:"",
    
}

export default function AddIssue(props){

    const [inputs, setInputs] = useState(initInputs)
    const { addIssue } = props

    function handleChange(e){
        const {name, value} = e.target
        setInputs(prevInputs => ({
            ...prevInputs,
            [name]: value
        }))
    }

    function handleSubmit(e){
        e.preventDefault()
        addIssue(inputs)
        setInputs(initInputs)
    }



    const {title, description} = inputs

    return(
        <center>
        <form onSubmit={handleSubmit}>
            Issue: 
            <input
            type="text"
            name="title"
            value={title}
            onChange={handleChange}
            placeholder="What is your Issue"
            />
            <br/>
            Description:
             <input
            type="text"
            name="description"
            value={description}
            onChange={handleChange}
            placeholder="Describe the issue"
            />
            <br/>
            <button>Post Issue</button>
        </form>
        </center>
    )
}