// import React, {useState, useEffect} from "react";
// import axios from "axios";


// const Upload = ({ user, setUser }) => {
//     const [image, setImage] = useState("");
//     const [response, setResponse] = useState("");
//     const url = "https://res.cloudinary.com/dijdukoam/image/upload/"

//     useEffect(() => {
//         axios
//             .get(`http://localhost:8000/api/users/logged`, { withCredentials: true })
//             .then(res => {
//                 // show the user returned
//                 console.log("logged user:" + res.data._id)
//                 console.log(res.data.friends)
//                 setUser(res.data);
//             })
//             .catch(err => {
//                 console.log("current user error: " + err)
//                 setUser({})
//             });
//     }, []);
    
//     const uploadImage = () => {
//         const formData = new FormData();
//         formData.append("file", image);
//         formData.append("upload_preset", "byjlcqbx"); // This requires a preset created on cloudinary
    
//         axios
//         .post("https://api.cloudinary.com/v1_1/dijdukoam/image/upload", formData)
//         .then((response) => {
//             console.log(response);
//             setResponse(response.data);
//         })
//     };

//     useEffect(() => {
//     const viewImage = () => {
//         console.log("this is the image",image)
//         axios
//         .get(`https://api.cloudinary.com/v1_1/dijdukoam/image/upload/${response.data.public_id}`)
//         .then((response) => {
//             console.log(response);
//         })
//     };
//     viewImage();
//     }, [image]);

    
//     return (
//         <div>
//             <input
//                 type="file"
//                 onChange={(e) => {
//                     setImage(e.target.files[0]);
//                 }}
//             />
//             <button onClick={uploadImage}>Upload</button>
//             <img src='https://res.cloudinary.com/dijdukoam/image/upload/c_thumb,g_faces,h_250,w_250/r_max/co_rgb:F8F3F0,e_outline:10/b_rgb:DBE0EA/eybictwllosk4a8ragyi' />
            
// {/* 
//             <AdvancedImage cloudName="dijdukoam" publicId="" /> */}
//         </div>
//     );
// };

// export default Upload;



