// Jared's component
import React from 'react'


const Home = () => {
  return (
    <div class="container">
      <div class="row">
        {/* Left Column */}
        <div class="col-md-4">
            <img src="profile-photo.jpg" class="img-fluid rounded-circle" alt="Profile Photo"/>
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
          <div>
            <h5>Friends List</h5>
            <ul class="list-unstyled">
              <li>
                <div class="media">
                  <img src="friend1-photo.jpg" class="mr-3" alt="Friend 1"/>
                    <div class="media-body">
                      <h6>Friend 1</h6>
                    </div>
                </div>
              </li>
              <li>
                <div class="media">
                  <img src="friend2-photo.jpg" class="mr-3" alt="Friend 2"/>
                    <div class="media-body">
                      <h6>Friend 2</h6>
                    </div>
                </div>
              </li>
              {/* <!-- Add more friend items as needed --> */}
            </ul>
          </div>
        </div>

        {/* <!-- Right Column --> */}
        <div class="col-md-8">
          <div>
            <h4>Submit a Post</h4>
            <form>
              <div class="form-group">
                <label for="postText">Text</label>
                <textarea class="form-control" id="postText"></textarea>
              </div>
              <div class="form-group">
                <label for="postImage">Image</label>
                <input type="file" class="form-control-file" id="postImage"/>
              </div>
              <div class="form-group">
                <label for="postVideo">Video</label>
                <input type="file" class="form-control-file" id="postVideo"/>
              </div>
              <button type="submit" class="btn btn-primary">Submit</button>
            </form>
          </div>

          <div>
            <h4>Posts</h4>
            <div class="media">
              <img src="friend1-photo.jpg" class="mr-3" alt="Friend 1"/>
                <div class="media-body">
                  <h6>Friend 1</h6>
                  <p>Post Text</p>
                  {/* <!-- Optional: Display image or video here --> */}
                </div>
            </div>
            <div class="media">
              <img src="friend2-photo.jpg" class="mr-3" alt="Friend 2"/>
                <div class="media-body">
                  <h6>Friend 2</h6>
                  <p>Post Text</p>
                  {/* <!-- Optional: Display image or video here --> */}
                </div>
            </div>
            {/* <!-- Add more post items as needed --> */}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Home