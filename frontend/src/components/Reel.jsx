// import React, { useState, useRef, useEffect } from 'react'
// import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar'
// import { Dialog, DialogContent, DialogTrigger } from './ui/dialog'
// import { Bookmark, MessageCircle, MoreHorizontal } from 'lucide-react'
// import { Button } from './ui/button'
// import { FaHeart, FaRegHeart } from "react-icons/fa";
// import { useDispatch, useSelector } from 'react-redux'
// import axios from 'axios'
// import { toast } from 'sonner'
// import { Badge } from './ui/badge'

// const Reel = ({ reel }) => {
//     const { user } = useSelector(store => store.auth);

//     const [liked, setLiked] = useState(reel.likes.includes(user?._id) || false);
//     const [reelLike, setReelLike] = useState(reel.likes.length);
//     const [isPlaying, setIsPlaying] = useState(false);
//     const videoRef = useRef(null);
//     const dispatch = useDispatch();

//     const togglePlay = () => {
//         if (videoRef.current) {
//             if (isPlaying) {
//                 videoRef.current.pause();
//             } else {
//                 videoRef.current.play();
//             }
//             setIsPlaying(!isPlaying);
//         }
//     };

//     const likeOrDislikeHandler = async () => {
//         try {
//             const action = liked ? 'dislike' : 'like';
//             const res = await axios.get(`http://localhost:8000/api/v1/reel/${reel._id}/${action}`, { 
//                 withCredentials: true 
//             });
            
//             if (res.data.success) {
//                 setReelLike(liked ? reelLike - 1 : reelLike + 1);
//                 setLiked(!liked);
//                 toast.success(res.data.message);
//             }
//         } catch (error) {
//             console.log(error);
//         }
//     }

//     const bookmarkHandler = async () => {
//         try {
//             const res = await axios.get(`http://localhost:8000/api/v1/reel/${reel?._id}/bookmark`, {
//                 withCredentials: true
//             });
//             if(res.data.success){
//                 toast.success(res.data.message);
//             }
//         } catch (error) {
//             console.log(error);
//         }
//     }

//     return (
//         <div className='my-8 w-full max-w-sm mx-auto'>
//             <div className='flex items-center justify-between'>
//                 <div className='flex items-center gap-2'>
//                     <Avatar>
//                         <AvatarImage src={reel.author?.profilePicture} alt="reel_author" />
//                         <AvatarFallback>CN</AvatarFallback>
//                     </Avatar>
//                     <div className='flex items-center gap-3'>
//                         <h1>{reel.author?.username}</h1>
//                         {user?._id === reel.author._id && <Badge variant="secondary">Author</Badge>}
//                     </div>
//                 </div>
//                 <Dialog>
//                     <DialogTrigger asChild>
//                         <MoreHorizontal className='cursor-pointer' />
//                     </DialogTrigger>
//                     <DialogContent className="flex flex-col items-center text-sm text-center">
//                         {reel?.author?._id !== user?._id && (
//                             <Button variant='ghost' className="cursor-pointer w-fit text-[#ED4956] font-bold">
//                                 Unfollow
//                             </Button>
//                         )}
//                         <Button variant='ghost' className="cursor-pointer w-fit">
//                             Add to favorites
//                         </Button>
//                         {user && user?._id === reel?.author._id && (
//                             <Button variant='ghost' className="cursor-pointer w-fit">
//                                 Delete
//                             </Button>
//                         )}
//                     </DialogContent>
//                 </Dialog>
//             </div>
            
//             {/* Video Player */}
//             <div className="relative">
//                 <video
//                     ref={videoRef}
//                     className='rounded-sm my-2 w-full aspect-[9/16] object-cover'
//                     src={reel.video}
//                     loop
//                     onClick={togglePlay}
//                 />
//                 {!isPlaying && (
//                     <div 
//                         className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-30"
//                         onClick={togglePlay}
//                     >
//                         <div className="w-16 h-16 rounded-full bg-white bg-opacity-50 flex items-center justify-center">
//                             <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 20 20">
//                                 <path d="M6.3 2.841A1.5 1.5 0 004 4.11v11.78a1.5 1.5 0 002.3 1.269l9.344-5.89a1.5 1.5 0 000-2.538L6.3 2.84z"/>
//                             </svg>
//                         </div>
//                     </div>
//                 )}
//             </div>

//             <div className='flex items-center justify-between my-2'>
//                 <div className='flex items-center gap-3'>
//                     {liked ? (
//                         <FaHeart 
//                             onClick={likeOrDislikeHandler} 
//                             size={'24'} 
//                             className='cursor-pointer text-red-600' 
//                         />
//                     ) : (
//                         <FaRegHeart 
//                             onClick={likeOrDislikeHandler} 
//                             size={'22px'} 
//                             className='cursor-pointer hover:text-gray-600' 
//                         />
//                     )}
//                     <MessageCircle className='cursor-pointer hover:text-gray-600' />
//                 </div>
//                 <Bookmark 
//                     onClick={bookmarkHandler} 
//                     className='cursor-pointer hover:text-gray-600' 
//                 />
//             </div>
            
//             <span className='font-medium block mb-2'>{reelLike} likes</span>
//             <p>
//                 <span className='font-medium mr-2'>{reel.author?.username}</span>
//                 {reel.caption}
//             </p>
//         </div>
//     )
// }

// export default Reel











// import React, { useState, useRef, useEffect } from 'react';
// import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
// import { FaHeart, FaRegHeart, FaComment, FaShare, FaMusic } from 'react-icons/fa';
// import { FiMoreHorizontal } from 'react-icons/fi';
// import { useSelector } from 'react-redux';
// import axios from 'axios';
// import { toast } from 'sonner';

// const Reel = ({ reel }) => {
//   const videoRef = useRef(null);
//   const [isPlaying, setIsPlaying] = useState(false);
//   const [liked, setLiked] = useState(reel.likes.includes(reel.author._id));
//   const [likeCount, setLikeCount] = useState(reel.likes.length);
//   const { user } = useSelector(store => store.auth);

//   // Auto-play when component mounts
//   useEffect(() => {
//     const observer = new IntersectionObserver(
//       (entries) => {
//         entries.forEach(entry => {
//           if (entry.isIntersecting) {
//             videoRef.current.play();
//             setIsPlaying(true);
//           } else {
//             videoRef.current.pause();
//             setIsPlaying(false);
//           }
//         });
//       },
//       { threshold: 0.8 } // 80% of video must be visible
//     );

//     if (videoRef.current) {
//       observer.observe(videoRef.current);
//     }

//     return () => {
//       if (videoRef.current) {
//         observer.unobserve(videoRef.current);
//       }
//     };
//   }, []);

//   const togglePlay = () => {
//     if (isPlaying) {
//       videoRef.current.pause();
//     } else {
//       videoRef.current.play();
//     }
//     setIsPlaying(!isPlaying);
//   };

//   const handleLike = async () => {
//     try {
//       const action = liked ? 'dislike' : 'like';
//       const res = await axios.get(
//         `http://localhost:8000/api/v1/reel/${reel._id}/${action}`,
//         { withCredentials: true }
//       );

//       if (res.data.success) {
//         setLiked(!liked);
//         setLikeCount(liked ? likeCount - 1 : likeCount + 1);
//         toast.success(res.data.message);
//       }
//     } catch (error) {
//       toast.error('Failed to update like');
//     }
//   };

//   return (
//     <div className="relative h-screen w-full max-w-md mx-auto flex items-center justify-center bg-black" style={{height: "94%"}}>
//       {/* Video Player */}
//       <video
//         ref={videoRef}
//         src={reel.video}
//         loop
//         muted
//         className="h-full w-full object-cover"
//         onClick={togglePlay}
//       />

//       {/* Bottom Gradient */}
//       <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-black/80 to-transparent" />

//       {/* Right Sidebar (Like, Comment, Share) */}
//       <div className="absolute right-4 bottom-24 flex flex-col items-center space-y-6">
//         <div className="flex flex-col items-center">
//           <button 
//             onClick={handleLike}
//             className="p-2 rounded-full bg-black/30 backdrop-blur-md"
//           >
//             {liked ? (
//               <FaHeart className="text-red-500 text-2xl" />
//             ) : (
//               <FaRegHeart className="text-white text-2xl" />
//             )}
//           </button>
//           <span className="text-white text-sm mt-1">{likeCount}</span>
//         </div>

//         <div className="flex flex-col items-center">
//           <button className="p-2 rounded-full bg-black/30 backdrop-blur-md">
//             <FaComment className="text-white text-2xl" />
//           </button>
//           <span className="text-white text-sm mt-1">{reel.comments?.length || 0}</span>
//         </div>

//         {/* <button className="p-2 rounded-full bg-black/30 backdrop-blur-md">
//           <FaShare className="text-white text-2xl" />
//         </button> */}

//         {/* <button className="p-2 rounded-full bg-black/30 backdrop-blur-md">
//           <FiMoreHorizontal className="text-white text-2xl" />
//         </button> */}
//       </div>

//       {/* Creator Info & Caption */}
//       <div className="absolute bottom-6 left-4 text-white">
//         <div className="flex items-center space-x-2 mb-3">
//           <Avatar className="w-8 h-8 border-2 border-white">
//             <AvatarImage src={reel.author.profilePicture} />
//             <AvatarFallback>U</AvatarFallback>
//           </Avatar>
//           <span className="font-semibold">{reel.author.username}</span>
//         </div>
        
//         <p className="text-sm mb-2">{reel.caption}</p>
        
//         <div className="flex items-center space-x-2">
//           <FaMusic className="text-sm" />
//           <span className="text-xs">Original Sound</span>
//         </div>
//       </div>

//       {/* Play/Pause Indicator */}
//       {!isPlaying && (
//         <div className="absolute inset-0 flex items-center justify-center">
//           <div className="w-16 h-16 rounded-full bg-black/50 flex items-center justify-center">
//             <svg
//               className="w-8 h-8 text-white"
//               fill="currentColor"
//               viewBox="0 0 20 20"
//             >
//               <path d="M6.3 2.841A1.5 1.5 0 004 4.11v11.78a1.5 1.5 0 002.3 1.269l9.344-5.89a1.5 1.5 0 000-2.538L6.3 2.84z" />
//             </svg>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default Reel;













// import React, { useState, useRef, useEffect } from 'react';
// import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
// import { FaHeart, FaRegHeart, FaComment, FaMusic } from 'react-icons/fa';
// import { Dialog, DialogContent, DialogTrigger } from './ui/dialog';
// import { Button } from './ui/button';
// import { Input } from './ui/input';
// import { useSelector } from 'react-redux';
// import axios from 'axios';
// import { toast } from 'sonner';
// // import { ScrollArea } from './ui/scroll-area';
// import { ScrollArea } from "./ui/scroll-area";

// const Reel = ({ reel }) => {
//   const videoRef = useRef(null);
//   const [isPlaying, setIsPlaying] = useState(false);
//   const [liked, setLiked] = useState(reel.likes.includes(reel.author._id));
//   const [likeCount, setLikeCount] = useState(reel.likes.length);
//   const [commentText, setCommentText] = useState('');
//   const [comments, setComments] = useState([]);
//   const [showComments, setShowComments] = useState(false);
//   const [loadingComments, setLoadingComments] = useState(false);
//   const [page, setPage] = useState(1);
//   const [hasMoreComments, setHasMoreComments] = useState(true);
//   const { user } = useSelector(store => store.auth);

//   // Video play/pause logic
//   useEffect(() => {
//     const observer = new IntersectionObserver(
//       (entries) => {
//         entries.forEach(entry => {
//           if (entry.isIntersecting) {
//             videoRef.current.play().catch(e => console.log('Autoplay prevented:', e));
//             setIsPlaying(true);
//           } else {
//             videoRef.current.pause();
//             setIsPlaying(false);
//           }
//         });
//       },
//       { threshold: 0.8 }
//     );

//     if (videoRef.current) observer.observe(videoRef.current);

//     return () => {
//       if (videoRef.current) observer.unobserve(videoRef.current);
//     };
//   }, []);

//   const togglePlay = () => {
//     if (isPlaying) {
//       videoRef.current.pause();
//     } else {
//       videoRef.current.play().catch(e => console.log('Play prevented:', e));
//     }
//     setIsPlaying(!isPlaying);
//   };

//   // Fetch initial comments
//   useEffect(() => {
//     if (showComments && comments.length === 0) {
//       fetchComments();
//     }
//   }, [showComments]);

//   const fetchComments = async () => {
//     try {
//       setLoadingComments(true);
//       const res = await axios.get(
//         `http://localhost:8000/api/v1/reel/${reel._id}/comments?page=${page}`,
//         { withCredentials: true }
//       );

//       if (res.data.success) {
//         setComments(prev => [...prev, ...res.data.comments]);
//         setHasMoreComments(res.data.comments.length > 0);
//       }
//     } catch (error) {
//       toast.error('Failed to load comments');
//     } finally {
//       setLoadingComments(false);
//     }
//   };

//   const handleLike = async () => {
//     try {
//       const action = liked ? 'dislike' : 'like';
//       const res = await axios.get(
//         `http://localhost:8000/api/v1/reel/${reel._id}/${action}`,
//         { withCredentials: true }
//       );

//       if (res.data.success) {
//         setLiked(!liked);
//         setLikeCount(liked ? likeCount - 1 : likeCount + 1);
//         toast.success(res.data.message);
//       }
//     } catch (error) {
//       toast.error('Failed to update like');
//     }
//   };

//   const handleAddComment = async () => {
//     if (!commentText.trim()) return;

//     try {
//       const res = await axios.post(
//         `http://localhost:8000/api/v1/reel/${reel._id}/comment`,
//         { text: commentText },
//         {
//           headers: { 'Content-Type': 'application/json' },
//           withCredentials: true
//         }
//       );

//       if (res.data.success) {
//         setComments(prev => [res.data.comment, ...prev]);
//         setCommentText('');
//         toast.success('Comment added');
//       }
//     } catch (error) {
//       toast.error('Failed to add comment');
//     }
//   };

//   const handleDeleteComment = async (commentId) => {
//     try {
//       const res = await axios.delete(
//         `http://localhost:8000/api/v1/reel/comment/${commentId}`,
//         { withCredentials: true }
//       );

//       if (res.data.success) {
//         setComments(prev => prev.filter(c => c._id !== commentId));
//         toast.success('Comment deleted');
//       }
//     } catch (error) {
//       toast.error('Failed to delete comment');
//     }
//   };

//   const loadMoreComments = () => {
//     setPage(prev => prev + 1);
//     fetchComments();
//   };

//   return (
//     <div className="relative h-screen w-full max-w-md mx-auto flex items-center justify-center bg-black" style={{ height: "94%" }}>
//       {/* Video Player */}
//       <video
//         ref={videoRef}
//         src={reel.video}
//         loop
//         muted
//         className="h-full w-full object-cover"
//         onClick={togglePlay}
//       />

//       {/* Bottom Gradient */}
//       <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-black/80 to-transparent" />

//       {/* Right Sidebar (Like, Comment) */}
//       <div className="absolute right-4 bottom-24 flex flex-col items-center space-y-6">
//         <div className="flex flex-col items-center">
//           <button 
//             onClick={handleLike}
//             className="p-2 rounded-full bg-black/30 backdrop-blur-md"
//           >
//             {liked ? (
//               <FaHeart className="text-red-500 text-2xl" />
//             ) : (
//               <FaRegHeart className="text-white text-2xl" />
//             )}
//           </button>
//           <span className="text-white text-sm mt-1">{likeCount}</span>
//         </div>

//         <div className="flex flex-col items-center">
//           <button 
//             onClick={() => setShowComments(true)}
//             className="p-2 rounded-full bg-black/30 backdrop-blur-md"
//           >
//             <FaComment className="text-white text-2xl" />
//           </button>
//           <span className="text-white text-sm mt-1">{reel.comments?.length || 0}</span>
//         </div>
//       </div>

//       {/* Creator Info & Caption */}
//       <div className="absolute bottom-6 left-4 text-white">
//         <div className="flex items-center space-x-2 mb-3">
//           <Avatar className="w-8 h-8 border-2 border-white">
//             <AvatarImage src={reel.author.profilePicture} />
//             <AvatarFallback>U</AvatarFallback>
//           </Avatar>
//           <span className="font-semibold">{reel.author.username}</span>
//         </div>
        
//         <p className="text-sm mb-2">{reel.caption}</p>
        
//         <div className="flex items-center space-x-2">
//           <FaMusic className="text-sm" />
//           <span className="text-xs">Original Sound</span>
//         </div>
//       </div>

//       {/* Play/Pause Indicator */}
//       {!isPlaying && (
//         <div className="absolute inset-0 flex items-center justify-center">
//           <div className="w-16 h-16 rounded-full bg-black/50 flex items-center justify-center">
//             <svg
//               className="w-8 h-8 text-white"
//               fill="currentColor"
//               viewBox="0 0 20 20"
//             >
//               <path d="M6.3 2.841A1.5 1.5 0 004 4.11v11.78a1.5 1.5 0 002.3 1.269l9.344-5.89a1.5 1.5 0 000-2.538L6.3 2.84z" />
//             </svg>
//           </div>
//         </div>
//       )}

//       {/* Comments Dialog */}
//       <Dialog open={showComments} onOpenChange={setShowComments}>
//         <DialogContent className="max-h-[80vh] overflow-hidden">
//           <div className="flex flex-col h-full">
//             <h2 className="text-xl font-bold mb-4">Comments ({reel.comments?.length || 0})</h2>
            
//             <ScrollArea className="flex-1 pr-4">
//               <div className="space-y-4">
//                 {comments.map(comment => (
//                   <div key={comment._id} className="flex items-start gap-3 group">
//                     <Avatar className="w-8 h-8">
//                       <AvatarImage src={comment.author.profilePicture} />
//                       <AvatarFallback>U</AvatarFallback>
//                     </Avatar>
//                     <div className="flex-1">
//                       <div className="flex items-center gap-2">
//                         <p className="font-semibold">{comment.author.username}</p>
//                         <p className="text-sm text-gray-500">
//                           {new Date(comment.createdAt).toLocaleString()}
//                         </p>
//                       </div>
//                       <p>{comment.text}</p>
//                     </div>
//                     {(user._id === comment.author._id || user._id === reel.author._id) && (
//                       <button 
//                         onClick={() => handleDeleteComment(comment._id)}
//                         className="opacity-0 group-hover:opacity-100 text-red-500 text-sm"
//                       >
//                         Delete
//                       </button>
//                     )}
//                   </div>
//                 ))}
                
//                 {hasMoreComments && !loadingComments && (
//                   <Button 
//                     variant="ghost" 
//                     onClick={loadMoreComments}
//                     className="w-full"
//                   >
//                     Load more comments
//                   </Button>
//                 )}
                
//                 {loadingComments && (
//                   <div className="text-center text-gray-500">Loading...</div>
//                 )}
//               </div>
//             </ScrollArea>

//             <div className="mt-4 flex gap-2">
//               <Input
//                 type="text"
//                 value={commentText}
//                 onChange={(e) => setCommentText(e.target.value)}
//                 placeholder="Add a comment..."
//                 onKeyPress={(e) => e.key === 'Enter' && handleAddComment()}
//               />
//               <Button 
//                 onClick={handleAddComment}
//                 disabled={!commentText.trim()}
//               >
//                 Post
//               </Button>
//             </div>
//           </div>
//         </DialogContent>
//       </Dialog>
//     </div>
//   );
// };

// export default Reel;












import React, { useState, useRef, useEffect } from 'react';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import { FaHeart, FaRegHeart, FaComment, FaMusic } from 'react-icons/fa';
import { Dialog, DialogContent, DialogTrigger } from './ui/dialog';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { useSelector } from 'react-redux';
import axios from 'axios';
import { toast } from 'sonner';

const Reel = ({ reel }) => {
  if (!reel || !reel.author) {
    return <div className="h-screen w-full bg-black flex items-center justify-center text-white">
      This reel is no longer available
    </div>;
  }

  const videoRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [liked, setLiked] = useState(reel.likes.includes(reel.author?._id));
  const [likeCount, setLikeCount] = useState(reel.likes.length);
  const [commentText, setCommentText] = useState('');
  const [comments, setComments] = useState([]);
  const [showComments, setShowComments] = useState(false);
  const [loadingComments, setLoadingComments] = useState(false);
  const [page, setPage] = useState(1);
  const [hasMoreComments, setHasMoreComments] = useState(true);
  const { user } = useSelector(store => store.auth);

  // Video play/pause logic
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            videoRef.current.play().catch(e => console.log('Autoplay prevented:', e));
            setIsPlaying(true);
          } else {
            videoRef.current.pause();
            setIsPlaying(false);
          }
        });
      },
      { threshold: 0.8 }
    );

    if (videoRef.current) observer.observe(videoRef.current);

    return () => {
      if (videoRef.current) observer.unobserve(videoRef.current);
    };
  }, []);

  const togglePlay = (e) => {
    // Only toggle play if clicking directly on video (not buttons)
    if (e.target === videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
        setIsPlaying(false);
      } else {
        videoRef.current.play().catch(e => console.log('Play prevented:', e));
        setIsPlaying(true);
      }
    }
  };

  // Fetch initial comments
  useEffect(() => {
    if (showComments) {
      fetchComments();
    }
  }, [showComments]);

  const fetchComments = async () => {
    try {
      setLoadingComments(true);
      const res = await axios.get(
        `http://localhost:8000/api/v1/reel/${reel._id}/comments?page=${page}`,
        { withCredentials: true }
      );

      if (res.data.success) {
        // Only add new comments if we're loading more
        if (page > 1) {
          setComments(prev => [...prev, ...res.data.comments]);
        } else {
          setComments(res.data.comments);
        }
        setHasMoreComments(res.data.comments.length > 0);
      }
    } catch (error) {
      toast.error('Failed to load comments');
    } finally {
      setLoadingComments(false);
    }
  };

  const handleLike = async (e) => {
    e.stopPropagation(); // Prevent triggering video play/pause
    try {
      const action = liked ? 'dislike' : 'like';
      const res = await axios.get(
        `http://localhost:8000/api/v1/reel/${reel._id}/${action}`,
        { withCredentials: true }
      );

      if (res.data.success) {
        setLiked(!liked);
        setLikeCount(liked ? likeCount - 1 : likeCount + 1);
        toast.success(res.data.message);
      }
    } catch (error) {
      toast.error('Failed to update like');
    }
  };

  const handleCommentClick = (e) => {
    e.stopPropagation(); // Prevent triggering video play/pause
    setShowComments(true);
  };

  const handleAddComment = async () => {
    if (!commentText.trim()) return;

    try {
      const res = await axios.post(
        `http://localhost:8000/api/v1/reel/${reel._id}/comment`,
        { text: commentText },
        {
          headers: { 'Content-Type': 'application/json' },
          withCredentials: true
        }
      );

      if (res.data.success) {
        // Add the new comment to the beginning of the list
        setComments(prev => [res.data.comment, ...prev]);
        setCommentText('');
        toast.success('Comment added');
      }
    } catch (error) {
      toast.error('Failed to add comment');
    }
  };

  const handleDeleteComment = async (commentId) => {
    try {
      const res = await axios.delete(
        `http://localhost:8000/api/v1/reel/comment/${commentId}`,
        { withCredentials: true }
      );

      if (res.data.success) {
        setComments(prev => prev.filter(c => c._id !== commentId));
        toast.success('Comment deleted');
      }
    } catch (error) {
      toast.error('Failed to delete comment');
    }
  };

  const loadMoreComments = () => {
    setPage(prev => prev + 1);
  };

  // Load more comments when page changes
  useEffect(() => {
    if (page > 1) {
      fetchComments();
    }
  }, [page]);

  return (
    <div className="relative h-screen w-full max-w-md mx-auto flex items-center justify-center bg-black" style={{ height: "94%" }}>
      {/* Video Player */}
      <video
        ref={videoRef}
        src={reel.video.url}
        loop
        // muted
        className="h-full w-full object-cover"
        onClick={togglePlay}
      />

      {/* Bottom Gradient */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-black/80 to-transparent" />

      {/* Right Sidebar (Like, Comment) */}
      <div className="absolute right-4 bottom-24 flex flex-col items-center space-y-6">
        <div className="flex flex-col items-center">
          <button 
            onClick={handleLike}
            className="p-2 rounded-full bg-black/30 backdrop-blur-md"
          >
            {liked ? (
              <FaHeart className="text-red-500 text-2xl" />
            ) : (
              <FaRegHeart className="text-white text-2xl" />
            )}
          </button>
          <span className="text-white text-sm mt-1">{likeCount}</span>
        </div>

        <div className="flex flex-col items-center">
          <button 
            onClick={handleCommentClick}
            className="p-2 rounded-full bg-black/30 backdrop-blur-md"
          >
            <FaComment className="text-white text-2xl" />
          </button>
          <span className="text-white text-sm mt-1">{comments.length || 0}</span>
        </div>
      </div>

      {/* Creator Info & Caption */}
      <div className="absolute bottom-6 left-4 text-white">
        <div className="flex items-center space-x-2 mb-3">
          <Avatar className="w-8 h-8 border-2 border-white">
            <AvatarImage src={reel.author.profilePicture} />
            <AvatarFallback>U</AvatarFallback>
          </Avatar>
          <span className="font-semibold">{reel.author.username}</span>
        </div>
        
        <p className="text-sm mb-2">{reel.caption}</p>
        
        <div className="flex items-center space-x-2">
          <FaMusic className="text-sm" />
          <span className="text-xs">Original Sound</span>
        </div>
      </div>

      {/* Play/Pause Indicator */}
      {!isPlaying && (
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <div className="w-16 h-16 rounded-full bg-black/50 flex items-center justify-center">
            <svg
              className="w-8 h-8 text-white"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path d="M6.3 2.841A1.5 1.5 0 004 4.11v11.78a1.5 1.5 0 002.3 1.269l9.344-5.89a1.5 1.5 0 000-2.538L6.3 2.84z" />
            </svg>
          </div>
        </div>
      )}

      {/* Comments Dialog */}
      <Dialog open={showComments} onOpenChange={setShowComments}>
        <DialogContent 
          className="max-h-[80vh] overflow-hidden"
          // onInteractOutside={(e) => e.preventDefault()} // Prevent closing when clicking outside
        >
          <div className="flex flex-col h-full">
            <h2 className="text-xl font-bold mb-4">Comments ({comments.length || 0})</h2>
            
            <div className="flex-1 pr-4 overflow-y-auto">
              <div className="space-y-4">
                {comments.map(comment => (
                  <div key={comment._id} className="flex items-start gap-3 group">
                    <Avatar className="w-8 h-8">
                      <AvatarImage src={comment.author.profilePicture} />
                      <AvatarFallback>U</AvatarFallback>
                    </Avatar>
                    <div className="flex-1">
                      <div className="flex items-center gap-2">
                        <p className="font-semibold">{comment.author.username}</p>
                        <p className="text-sm text-gray-500">
                          {new Date(comment.createdAt).toLocaleString()}
                        </p>
                      </div>
                      <p>{comment.text}</p>
                    </div>
                    {(user._id === comment.author._id || user._id === reel.author._id) && (
                      <button 
                        onClick={() => handleDeleteComment(comment._id)}
                        className="opacity-0 group-hover:opacity-100 text-red-500 text-sm"
                      >
                        Delete
                      </button>
                    )}
                  </div>
                ))}
                
                {hasMoreComments && !loadingComments && (
                  <Button 
                    variant="ghost" 
                    onClick={loadMoreComments}
                    className="w-full"
                  >
                    Load more comments
                  </Button>
                )}
                
                {loadingComments && (
                  <div className="text-center text-gray-500">Loading...</div>
                )}
              </div>
            </div>

            <div className="mt-4 flex gap-2">
              <Input
                type="text"
                value={commentText}
                onChange={(e) => setCommentText(e.target.value)}
                placeholder="Add a comment..."
                onKeyPress={(e) => e.key === 'Enter' && handleAddComment()}
              />
              <Button 
                onClick={handleAddComment}
                disabled={!commentText.trim()}
              >
                Post
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Reel;