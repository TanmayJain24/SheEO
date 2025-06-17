// import React from 'react'
// import Post from './Post'
// import { useSelector } from 'react-redux'

// const Posts = () => {
//   const {posts} = useSelector(store=>store.post);
//   return (
//     <div>
//         {
//             posts.map((post) => <Post key={post._id} post={post}/>)
//         }
//     </div>
//   )
// }

// export default Posts



import React, { useEffect } from 'react'
import Post from './Post'
import { useSelector, useDispatch } from 'react-redux'
import axios from 'axios'
import { setPosts } from '@/redux/postSlice'

const Posts = () => {
  const { posts } = useSelector(store => store.post);
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchPosts = async () => {
        try {
            const res = await axios.get(
                'http://localhost:8000/api/feed/personalized', 
                { withCredentials: true }
            );
            if (res.data.success) {
                dispatch(setPosts(res.data.posts));
            }
        } catch (error) {
            console.error("Error fetching posts:", error);
            // Fallback to regular posts if personalized feed fails
            const res = await axios.get(
                'http://localhost:8000/api/v1/post/all', 
                { withCredentials: true }
            );
            dispatch(setPosts(res.data.posts));
        }
    };
    fetchPosts();
}, [dispatch]);

  return (
    <div>
      {posts.map((post) => <Post key={post._id} post={post}/>)}
    </div>
  )
}

export default Posts