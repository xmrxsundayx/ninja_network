import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { useNavigate, useParams } from 'react-router-dom'


const UpdateForm = ({ postList, setPostList }) => {
    const { id } = useParams()
    const [errors, setErrors] = useState({})
    const [post, setPost] = useState({})
    const navigate = useNavigate()
    const [loaded, setLoaded] = useState(false)

    useEffect(() => {
        console.log("getting all posts", postList)
    }
        , [])

    useEffect(() => {
        if (id) {
            axios.get(`http://localhost:8000/api/post/${id}`)
                .then(res => {
                    console.log(res.data);
                    setPost(res.data)
                })
                .catch(err => console.log("Error fetching post" + err))
        }
    }, [])


    const handleChange = (e) => {
        setPost({ ...post, [e.target.name]: e.target.value })
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log("submitting post");
        axios
            .post('http://localhost:8000/api/post/create', post, { withCredentials: true })
            .then(res => {
                console.log("Post created", res.data);
                setErrors([]);
                setLoaded(true);
                setPostList(prevPostList => [...prevPostList, res.data]); 
                setPost({ title: '', content: '' });
            })
            .catch(err => {
                console.log("Error creating post", err);
                setErrors(err.response.data.errors);
                setLoaded(false);
            });
    };

    const handleUpdate = (e) => {
        e.preventDefault()
        console.log("updating post")
        axios.put(`http://localhost:8000/api/post/update/${id}`, post, { withCredentials: true })
            .then(res => {
                console.log(res.data);
                navigate('/profile/' + id)
            })
            .catch(err => {
                console.log("Error updating post" + err)
                setErrors(err.response.data.errors)
            })
    }

    return (
        <div>
            {/* Section: Projects modals */}
<section class="">

{/* Button trigger modal */}
  <button type="button" class="btn btn-primary" data-mdb-toggle="modal" data-mdb-target="#exampleModal">
    Launch demo modal
  </button>

{/* Modal */}
  <div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title" id="exampleModalLabel">Modal title</h5>
          <button type="button" class="btn-close" data-mdb-dismiss="modal" aria-label="Close"></button>
        </div>
        <div class="modal-body">...</div>
        <div class="modal-footer">
          <button type="button" class="btn btn-secondary" data-mdb-dismiss="modal">Close</button>
          <button type="button" class="btn btn-primary">Save changes</button>
        </div>
      </div>
    </div>
  </div>

</section>
{/* Section: Projects modals */}
        </div>
    )
}

export default PostForm
