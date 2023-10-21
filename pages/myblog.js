// import { getSession } from "next-auth/react"
// import Link from "next/link"



// export default function Myblog() {
//     return(
//         <>
//         <div class="mar-left">
//         <Link href="/profile" class="prof"><h4>Back To Profile</h4></Link>
//           <div class="wi">
//             <div class="mb-3">
//   <label for="exampleFormControlInput1" class="form-label">Topic</label>
//   <input type="email" class="form-control" id="exampleFormControlInput1" placeholder="Topic Here"/>
// </div>
// <div class="mb-3">
//   <label for="exampleFormControlTextarea1" class="form-label">Description</label>
//   <textarea class="form-control" id="exampleFormControlTextarea1" rows="3"></textarea>
// </div>
// <button type="button" className="btn btn-primary bt"> Creeate Blog </button>
// </div>
// </div>
//         </>
//     )
// }
// export async function getServerSideProps({req}){
//   const session =await getSession({req})
//  if (!session) {
//    return{
//     redirect:{
//       destination:"/auth/login",
//       permanent:false
//     }
//   }
//  }return{
//   props:{
//     session
//   }
//  }
 
// }
// pages/myblog.js

// pages/myblog.js

// pages/myblog.js

// pages/myblog.js

import { getSession, useSession } from 'next-auth/react';
import React, { useState, useEffect } from 'react';
import Link from 'next/link';

export default function Myblog() {
  const { data: session } = useSession();
  const [topic, setTopic] = useState('');
  const [description, setDescription] = useState('');
  const [blogPosts, setBlogPosts] = useState([]);
  const [editingPostId, setEditingPostId] = useState(null);

  useEffect(() => {
    async function fetchPosts() {
      const response = await fetch('/api/posts');
      const data = await response.json();
      setBlogPosts(data);
    }
    fetchPosts();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await fetch('/api/posts', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ topic, description }),
    });
    const newPost = await response.json();
    setBlogPosts([...blogPosts, newPost]);
    setTopic('');
    setDescription('');
  };

  const handleEdit = (id) => {
    setEditingPostId(id);
    const postToEdit = blogPosts.find((post) => post.id === id);
    if (postToEdit) {
      setTopic(postToEdit.topic);
      setDescription(postToEdit.description);
    }
  };

  const handleSaveEdit = async () => {
    const response = await fetch(`/api/posts`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id: editingPostId, topic, description }),
    });
    await response.json();
    const updatedPosts = blogPosts.map((post) =>
      post.id === editingPostId ? { ...post, topic, description } : post
    );
    setBlogPosts(updatedPosts);
    setEditingPostId(null);
    setTopic('');
    setDescription('');
  };

  const handleDelete = async (id) => {
    const response = await fetch('/api/posts', {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id }),
    });
    await response.json();
    const updatedPosts = blogPosts.filter((post) => post.id !== id);
    setBlogPosts(updatedPosts);
  };

  return (
    <>
      <div className="mar-left">
        <Link href="/profile" className="prof">
          <h4>Back To Profile</h4>
        </Link>
        <div className="wi">
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label htmlFor="topic" className="form-label">
                Topic
              </label>
              <input
                type="text"
                className="form-control"
                id="topic"
                placeholder="Enter topic"
                value={topic}
                onChange={(e) => setTopic(e.target.value)}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="description" className="form-label">
                Description
              </label>
              <textarea
                className="form-control"
                id="description"
                rows="3"
                placeholder="Enter description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              ></textarea>
            </div>
            <button type="submit" className="btn btn-primary bt">
              Create Post
            </button>
          </form>
        </div>
        <div className="wi">
          {blogPosts.map((post) => (
            <div key={post.id} className="blog-card">
              <div className="card mb-3 custom-card">
                <div className="row g-0">
                  <div className="col-md-4">
                    <img
                      src={post.imageURL} // Use the actual image URL here
                      className="img-fluid rounded-start siz"
                      alt="err"
                    />
                  </div>
                  <div className="col-md-8">
                    <div className="card-body">
                      <div className="fle">
                        <h3 className="card-title">{post.topic}</h3>
                        <h6 className="card-title">Posted by You</h6>
                      </div>
                      <p className="card-text par">{post.description}</p> {/* Display post description */}
                      <div className="edit-delete-buttons">
                        {editingPostId === post.id ? (
                          <button
                            className="btn btn-primary bt"
                            onClick={handleSaveEdit}
                          >
                            Save
                          </button>
                        ) : (
                          <>
                            <button
                              className="btn btn-primary bt"
                              onClick={() => handleEdit(post.id)}
                            >
                              Edit
                            </button>
                            <button
                              className="btn btn-primary bt"
                              onClick={() => handleDelete(post.id)}
                            >
                              Delete
                            </button>
                          </>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

export async function getServerSideProps({ req }) {
  const session = await getSession({ req });
  if (!session) {
    return {
      redirect: {
        destination: '/auth/login',
        permanent: false,
      },
    };
  }
  return {
    props: {
      session,
    },
  };
}




