// Jared's component
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Navbar from './Navbar';
import api from '../api/dummy';

const Home = () => {
  const [apiPosts, setApiPosts] = useState([]);
  const [apiUsers, setApiUsers] = useState([])

  useEffect(() => {
    const fetchAllApiUsers = async () => {
      try {
        const response = await api.get('/user', { params: { limit: 5 } });
        setApiUsers(response.data.data);
        console.log(response.data.data);
      } catch (error) {
        console.error('Error fetching ninjas:', error);
      }
    };

    fetchAllApiUsers();
  }, []);

  useEffect(() => {
    const fetchAllApiPosts = async () => {
      try {
        const response = await api.get('/post', { params: { limit: 50 } });
        setApiPosts(response.data.data);
        console.log(response.data.data);
      } catch (error) {
        console.error('Error fetching ninjas:', error);
      }
    };

    fetchAllApiPosts();
  }, []);

  return (
    <div>
      <Navbar />
      <div class="container mt-5">
        <div class="row">
          {/* Left Column */}
          <div class="col-md-5">
            <img src="profile-photo.jpg" class="img-fluid rounded-circle" alt="Profile Photo" />
            <div class="text-center">
              <h2>Ninja Name</h2>
            </div>
            <div>
              <h5>Languages Learned</h5>
              <div className='d-flex'>
                <p className='mr-3'>Language 1</p>
                <p className='mr-3'>Language 2</p>
                <p>Language 3</p>
              </div>
            </div>
            <div>
              <h5>Social Media Links</h5>
              <ul>
                <li><a href="#">Social Media 1</a></li>
                <li><a href="#">Social Media 2</a></li>
                <li><a href="#">Social Media 3</a></li>
              </ul>
            </div>
            <div>
              <h5>Location</h5>
              <p>State, City</p>
            </div>
            <div style={{
              padding: '0px 10px',
              border: '1px solid',
              borderRadius: '20px',
              background: "lightgrey"
            }}>
              <h4 className='p-2'>Friends List</h4>
              <div>
                {apiUsers.map((apiUser) => (
                  <div
                    key={apiUser.id}
                    style={{
                      // width: '350px',
                      padding: '0px 10px',
                      border: '1px solid',
                      borderRadius: '20px',
                      // display: 'flex',
                      // justifyContent: 'space-between',
                      // alignItems: 'center',
                      margin: '10px 0',
                      background: "lightblue"
                    }}
                  >
                    <img className='rounded-circle'
                      src={apiUser.picture}
                      alt={`${apiUser.firstName} ${apiUser.lastName}`}
                      style={{ width: '100px', height: 'auto', margin: '20px' }}
                    />
                    {apiUser.firstName} {apiUser.lastName}
                  </div>
                ))}
              </div>
            </div>
          </div>
          {/* ---------------------------------------------------------------------------------------------------- */}
          {/* <!-- Right Column --> */}
          <div class="col-md-7">
            <div style={{

              padding: '10px 10px',
              marginBottom: '10px',
              border: '1px solid',
              borderRadius: '20px',
              justifyContent: 'space-between',
              alignItems: 'center',
              background: "lightgrey"
            }}>
              <h4 className='p-2'>Submit a Post</h4>
              <form>
                <div class="form-group">
                  <textarea class="form-control" id="postText" placeholder="What's on your mind?"></textarea>
                </div>
                <div className="row">
                  <div className="col-sm-6 mt-3">
                    <label htmlFor="imageInput" className="btn bg-secondary text-white ">Image</label>
                    <label htmlFor="videoInput" className="btn bg-secondary text-white mx-1">Video</label>
                    <input id="imageInput" type="file" style={{ display: 'none' }} />
                    <input id="videoInput" type="file" style={{ display: 'none' }} />
                  </div>
                  <div className="col-sm-6 text-end mt-3">
                    <button type="submit" className="btn btn-primary">Submit</button>
                  </div>
                </div>
              </form>
            </div>

            <div style={{

              padding: '0px 10px',
              border: '1px solid',
              borderRadius: '20px',
              justifyContent: 'space-between',
              alignItems: 'center',
              background: "lightgrey"
            }}>
              <h4 className='p-2'>Posts</h4>
              {/* we will populate new api data on top of the fake api data here. */}
              {/* <div class="media"
              style={{

                padding: '10px 10px',
                marginBottom: '10px',
                border: '1px solid',
                borderRadius: '20px',
                justifyContent: 'space-between',
                alignItems: 'center'
              }}>
              <img src="friend1-photo.jpg" class="mr-3" alt="Friend 1" />
              <div class="media-body">
                <h6>Friend 1</h6>
                <p>Post Text</p> */}
              {/* <!-- Optional: Display image or video here --> */}
              {/* </div> */}
              {/* </div> */}
              {apiPosts.map((apiPost) => (
                <div
                  key={apiPost.id}
                  style={{

                    padding: '0px 10px',
                    marginBottom: '10px',
                    border: '1px solid',
                    borderRadius: '20px',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    background: "lightblue"
                  }}
                >
                  <div
                    style={{
                      display: 'flex',
                      alignItems: 'center'
                    }}>
                    <img className='rounded-circle'
                      src={apiPost.owner.picture}
                      alt={`${apiPost.owner.firstName} ${apiPost.owner.lastName}`}
                      style={{
                        width: '50px',
                        height: 'auto',
                        margin: '20px'
                      }}
                    />
                    {apiPost.owner.firstName} {apiPost.owner.lastName}</div>
                  <p style={{
                    paddingLeft: '20px',
                  }}>{apiPost.text}</p>
                  <img
                    src={apiPost.image}
                    alt={apiPost.text}
                    style={{ width: '300px', height: 'auto', margin: '20px', display: 'block' }}
                  />
                </div>
              ))}
              {/* <!-- Add more post items as needed --> */}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Home