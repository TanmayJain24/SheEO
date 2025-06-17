// import React, { useState, useEffect } from 'react'
// import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar'
// import useGetUserProfile from '@/hooks/useGetUserProfile';
// import { Link, useParams, useNavigate  } from 'react-router-dom';
// import { useSelector, useDispatch } from 'react-redux';
// import { Button } from './ui/button';
// import { Badge } from './ui/badge';
// import { AtSign, Heart, MessageCircle } from 'lucide-react';


// //
// import { setAuthUser } from '@/redux/authSlice'
// import CreatePost from './CreatePost'
// import { setPosts, setSelectedPost } from '@/redux/postSlice'
// import axios from 'axios';



// const Profile = () => {
//   const params = useParams();
//   const userId = params.id;
//   useGetUserProfile(userId);
//   const [activeTab, setActiveTab] = useState('posts');

//   const navigate = useNavigate();

//   const dispatch = useDispatch();
//   console.log(dispatch); // This will show if dispatch is properly defined


//   const { userProfile, user } = useSelector(store => store.auth);

//   if (!user) {
//   navigate("/login"); // Redirect if there's no user logged in
// }

//   const isLoggedInUserProfile = user?._id === userProfile?._id;
//   // const isFollowing = false;
//   // const [isFollowing, setIsFollowing] = useState(userProfile?.followers?.includes(user?._id));

//   const [isFollowing, setIsFollowing] = useState(false); // default to false

// useEffect(() => {
//   if (userProfile && user) {
//     setIsFollowing(userProfile.followers.includes(user._id));
//   }
// }, [userProfile, user]);


//   const handleTabChange = (tab) => {
//     setActiveTab(tab);
//   }

  
//   //  Chatgpt Added Code
//   const handleFollow = async () => {
//     console.log('Trying to follow...');

//     try {
//       const res = await fetch(`http://localhost:8000/api/v1/user/follow/${userProfile._id}`, {
//         method: 'PUT',
//         credentials: 'include'
//       });
//       const data = await res.json();
//       if (res.ok) {
//         setIsFollowing(true);
//       }
//     } catch (error) {
//       console.error('Error following:', error);
//     }
//   };
  
//   const handleUnfollow = async () => {
//     console.log('Trying to unnfollow...');

//     try {
//       const res = await fetch(`http://localhost:8000/api/v1/user/unfollow/${userProfile._id}`, {
//         method: 'PUT',
//         credentials: 'include'
//       });
//       const data = await res.json();
//       if (res.ok) {
//         setIsFollowing(false);
//       }
//     } catch (error) {
//       console.error('Error unfollowing:', error);
//     }
//   };


//   const logoutHandler = async () => {
//     console.log("Logging out...");
//     try {
//       const res = await axios.get('http://localhost:8000/api/v1/user/logout', { withCredentials: true });
      
//       // Check if response is defined and contains the data
//       if (res && res.data && res.data.success) {
//         dispatch(setAuthUser(null));
//         dispatch(setSelectedPost(null));
//         dispatch(setPosts([]));
//         navigate("/login");
//       } else {
//         // Handle case where res.data doesn't have the expected properties
//         console.log("Logout failed:", res?.data?.message || "Unknown error");
//       }
//     } catch (error) {
//       console.error("Error during logout:", error);
//       // You can also use error.response to get the error message if available
//       if (error.response) {
//         console.log(error.response.data.message);
//       }
//     }
//   };
  
//   //*************************************************************** */
  

//   const displayedPost = activeTab === 'posts' ? userProfile?.posts : userProfile?.bookmarks;

//   return (
//     // <div className='flex max-w-5xl justify-center mx-auto pl-10'>
// <div className='flex max-w-5xl justify-center mx-auto px-4 sm:px-6 md:px-10'>

//       <div className='flex flex-col gap-20 p-8'>
//         {/* <div className='grid grid-cols-2'> */}
//         <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>

          
//           <section className='flex flex-col items-center justify-center'>
//             <Avatar className='h-24 w-24'>
//               <AvatarImage src={userProfile?.profilePicture} alt="profilephoto" />
//               <AvatarFallback>CN</AvatarFallback>
//             </Avatar>
//             <span>{userProfile?.username}</span>
//             <span className='font-semibold'>{userProfile?.bio || 'bio here...'}</span>


//           </section>
//           <section>
//             <div className='flex flex-col gap-5'>
//               <div className='flex items-center gap-2'>
//                 {/* <span>{userProfile?.username}</span> */}
//                 {/* {
//                   isLoggedInUserProfile ? (
//                     <>
//                       <Link to="/account/edit"><Button variant='secondary' className='hover:bg-gray-200 h-8'>Edit profile</Button></Link>
//                       <Button variant='secondary' className='hover:bg-gray-200 h-8'>View archive</Button>
//                       <Button variant='secondary' className='hover:bg-gray-200 h-8'>Ad tools</Button>
//                     </>
//                   ) : (
//                     isFollowing ? (
//                       <>
//                         <Button variant='secondary' className='h-8'>Unfollow</Button>
//                         <Button variant='secondary' className='h-8'>Message</Button>
//                       </>
//                     ) : (
//                       <Button className='bg-[#0095F6] hover:bg-[#3192d2] h-8'>Follow</Button>
//                     )
//                   )
//                 } */}

// {isLoggedInUserProfile ? (
//   <>
//     <Link to="/account/edit"><Button variant='secondary' className='hover:bg-gray-200 h-8'>Edit profile</Button></Link>
//     {/* <Button variant='secondary' className='hover:bg-gray-200 h-8'>View archive</Button> */}
//     <Button variant='secondary' className='hover:bg-gray-200 h-8' onClick={logoutHandler}>Log Out</Button>
//   </>
// ) : (
//   isFollowing ? (
//     <>
//       <Button variant='secondary' className='h-8' onClick={handleUnfollow}>Unfollow</Button>
//       <Button variant='secondary' className='h-8'>Message</Button>
//     </>
//   ) : (
//     <Button className='bg-[#0095F6] hover:bg-[#3192d2] h-8' onClick={handleFollow}>Follow</Button>
//   )
// )}


//               </div>
//               <div className='flex items-center gap-4'>
//                 <p><span className='font-semibold'>{userProfile?.posts.length} </span>posts</p>
//                 <p><span className='font-semibold'>{userProfile?.followers.length} </span>followers</p>
//                 <p><span className='font-semibold'>{userProfile?.following.length} </span>following</p>
//               </div>
              
//               <div className='flex flex-col gap-1'>
//                 {/* <span className='font-semibold'>{userProfile?.bio || 'bio here...'}</span> */}
//                 {/* <Badge className='w-fit' variant='secondary'><AtSign /> <span className='pl-1'>{userProfile?.username}</span> </Badge>
//                 <span>🤯Learn code with patel mernstack style</span>
//                 <span>🤯Turing code into fun</span>
//                 <span>🤯DM for collaboration</span> */}
//               </div>
//             </div>
//           </section>
//           {/* <span>{userProfile?.username}</span> */}

//         </div>
//         <div className='border-t border-t-gray-200'>
//           <div className='flex items-center justify-center gap-10 text-sm'>
//             <span className={`py-3 cursor-pointer ${activeTab === 'posts' ? 'font-bold' : ''}`} onClick={() => handleTabChange('posts')}>
//               POSTS
//             </span>
//             <span className={`py-3 cursor-pointer ${activeTab === 'saved' ? 'font-bold' : ''}`} onClick={() => handleTabChange('saved')}>
//               SAVED
//             </span>
//             <span className='py-3 cursor-pointer'>REELS</span>
//           </div>
//           <div className='grid grid-cols-3 gap-1'>
//             {
//               displayedPost?.map((post) => {
//                 return (
//                   <div key={post?._id} className='relative group cursor-pointer'>
//                     <img src={post.image} alt='postimage' className='rounded-sm my-2 w-full aspect-square object-cover' />
//                     <div className='absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 opacity-0 group-hover:opacity-100 transition-opacity duration-300'>
//                       <div className='flex items-center text-white space-x-4'>
//                         <button className='flex items-center gap-2 hover:text-gray-300'>
//                           <Heart />
//                           <span>{post?.likes.length}</span>
//                         </button>
//                         <button className='flex items-center gap-2 hover:text-gray-300'>
//                           <MessageCircle />
//                           <span>{post?.comments.length}</span>
//                         </button>
//                       </div>
//                     </div>
//                   </div>
//                 )
//               })
//             }
//           </div>
//         </div>
//       </div>
//     </div>
//   )
// }

// export default Profile





import React, { useState, useEffect } from 'react'
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar'
import useGetUserProfile from '@/hooks/useGetUserProfile';
import { Link, useParams, useNavigate  } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { AtSign, Heart, MessageCircle } from 'lucide-react';

import { setAuthUser } from '@/redux/authSlice'
import CreatePost from './CreatePost'
import { setPosts, setSelectedPost } from '@/redux/postSlice'
import axios from 'axios';

const Profile = () => {
  const params = useParams();
  const userId = params.id;
  useGetUserProfile(userId);
  const [activeTab, setActiveTab] = useState('posts');
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { userProfile, user } = useSelector(store => store.auth);

  if (!user) {
    navigate("/login");
  }

  const isLoggedInUserProfile = user?._id === userProfile?._id;
  const [isFollowing, setIsFollowing] = useState(false);

  useEffect(() => {
    if (userProfile && user) {
      setIsFollowing(userProfile.followers.includes(user._id));
    }
  }, [userProfile, user]);

  const handleTabChange = (tab) => {
    setActiveTab(tab);
  }

  // const handleFollow = async () => {
  //   console.log('Trying to follow...');
  //   try {
  //     const res = await fetch(`http://localhost:8000/api/v1/user/follow/${userProfile._id}`, {
  //       method: 'PUT',
  //       credentials: 'include'
  //     });
  //     const data = await res.json();
  //     if (res.ok) {
  //       setIsFollowing(true);
  //     }
  //   } catch (error) {
  //     console.error('Error following:', error);
  //   }
  // };
  
  // const handleUnfollow = async () => {
  //   console.log('Trying to unnfollow...');
  //   try {
  //     const res = await fetch(`http://localhost:8000/api/v1/user/unfollow/${userProfile._id}`, {
  //       method: 'PUT',
  //       credentials: 'include'
  //     });
  //     const data = await res.json();
  //     if (res.ok) {
  //       setIsFollowing(false);
  //     }
  //   } catch (error) {
  //     console.error('Error unfollowing:', error);
  //   }
  // };


  const handleFollow = async () => {
    try {
      const endpoint = isFollowing 
        ? `http://localhost:8000/api/v1/user/unfollow/${userProfile._id}`
        : `http://localhost:8000/api/v1/user/follow/${userProfile._id}`;
        
      const res = await fetch(endpoint, {
        method: 'PUT',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json'
        }
      });
      
      if (!res.ok) {
        throw new Error(await res.text());
      }
      
      setIsFollowing(!isFollowing);
    } catch (error) {
      console.error('Error:', error);
      // Show error to user
    }
  };

  const logoutHandler = async () => {
    console.log("Logging out...");
    try {
      const res = await axios.get('http://localhost:8000/api/v1/user/logout', { withCredentials: true });
      if (res && res.data && res.data.success) {
        dispatch(setAuthUser(null));
        dispatch(setSelectedPost(null));
        dispatch(setPosts([]));
        navigate("/login");
      } else {
        console.log("Logout failed:", res?.data?.message || "Unknown error");
      }
    } catch (error) {
      console.error("Error during logout:", error);
      if (error.response) {
        console.log(error.response.data.message);
      }
    }
  };
  
  const displayedPost = activeTab === 'posts' ? userProfile?.posts : userProfile?.bookmarks;

  return (
    <div className='flex max-w-5xl justify-center mx-auto px-4 sm:px-6 md:px-0 ml-0 md:ml-[250px]'>

    {/* // <div className='flex max-w-5xl justify-center mx-auto px-4 sm:px-6 md:px-10'> */}
      <div className='flex flex-col gap-8 md:gap-20 p-4 md:p-8 w-full'>
        <div className='flex flex-col md:grid md:grid-cols-2 gap-6'>
          <section className='flex flex-col items-center justify-center'>
            <Avatar className='h-24 w-24'>
              <AvatarImage src={userProfile?.profilePicture} alt="profilephoto" />
              <AvatarFallback>CN</AvatarFallback>
            </Avatar>
            <span><b>{userProfile?.username}</b></span>
            <span className='font-semibold'>{userProfile?.bio || 'bio here...'}</span>
            <span><b>{userProfile?.role}</b></span>

          </section>
          
          <section className='flex flex-col gap-4'>
            {/* User stats - will appear on one line */}
            <div className='flex items-center justify-center md:justify-start gap-4'>
              <p><span className='font-semibold'>{userProfile?.posts.length} </span>posts</p>
              <p><span className='font-semibold'>{userProfile?.followers.length} </span>followers</p>
              <p><span className='font-semibold'>{userProfile?.following.length} </span>following</p>
            </div>
            
            {/* Action buttons - will appear on next line */}
            <div className='flex flex-wrap items-center justify-center md:justify-start gap-2'>
              {isLoggedInUserProfile ? (
                <>
                  <Link to="/account/edit" className='w-full sm:w-auto'>
                    <Button variant='secondary' className='hover:bg-gray-200 h-8 w-full'>Edit profile</Button>
                  </Link>
                  <Button 
                    variant='secondary' 
                    className='hover:bg-gray-200 h-8 w-full sm:w-auto' 
                    onClick={logoutHandler}
                  >
                    Log Out
                  </Button>
                </>
              ) : (
                isFollowing ? (
                  <>
                    <Button 
                      variant='secondary' 
                      className='h-8 w-full sm:w-auto' 
                      onClick={handleFollow}
                    >
                      Unfollow
                    </Button>
                    {/* <Button variant='secondary' className='h-8 w-full sm:w-auto'>Message</Button> */}
                  </>
                ) : (
                  <Button 
                    className='bg-[#0095F6] hover:bg-[#3192d2] h-8 w-full sm:w-auto' 
                    onClick={handleFollow}
                  >
                    Follow
                  </Button>
                )
              )}
            </div>
          </section>
        </div>
        
        <div className='border-t border-t-gray-200'>
          <div className='flex items-center justify-center gap-10 text-sm'>
            <span className={`py-3 cursor-pointer ${activeTab === 'posts' ? 'font-bold' : ''}`} onClick={() => handleTabChange('posts')}>
              POSTS
            </span>
            <span className={`py-3 cursor-pointer ${activeTab === 'saved' ? 'font-bold' : ''}`} onClick={() => handleTabChange('saved')}>
              SAVED
            </span>
            {/* <span className='py-3 cursor-pointer'>Pitches</span> */}
          </div>
          <div className='grid grid-cols-3 gap-1'>
            {displayedPost?.map((post) => (
              <div key={post?._id} className='relative group cursor-pointer'>
                <img src={post.image} alt='postimage' className='rounded-sm my-2 w-full aspect-square object-cover' />
                <div className='absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 opacity-0 group-hover:opacity-100 transition-opacity duration-300'>
                  <div className='flex items-center text-white space-x-4'>
                    <button className='flex items-center gap-2 hover:text-gray-300'>
                      <Heart />
                      <span>{post?.likes.length}</span>
                    </button>
                    <button className='flex items-center gap-2 hover:text-gray-300'>
                      <MessageCircle />
                      <span>{post?.comments.length}</span>
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Profile