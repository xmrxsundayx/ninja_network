import React, {useState, useEffect} from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

const Posts = () => {
    const [postList, setPostList] = useState([])
    const navigate = useNavigate()

    useEffect(() => {
        axios.get('http://localhost:8000/api/posts/all')
            .then(res => {
                console.log(res.data);
                setPostList(res.data)
            })
            .catch(err => console.log("Error fetching all posts" + err))
    }, [])

    const deletePost = (id) => {
        axios.delete(`http://localhost:8000/api/posts/delete/${id}`)
            .then(res => {
                console.log(res.data);
                setPostList(postList.filter(post => post._id !== id))
            })
            .catch(err => console.log("Error deleting post" + err))
    }


    return (
        <div>
            
        </div>
    )
}

export default Posts