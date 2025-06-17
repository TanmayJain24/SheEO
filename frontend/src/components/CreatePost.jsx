// import React, { useRef, useState } from 'react'
// import { Dialog, DialogContent, DialogHeader } from './ui/dialog'
// import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
// import { Textarea } from './ui/textarea';
// import { Button } from './ui/button';
// import { readFileAsDataURL } from '@/lib/utils';
// import { Loader2 } from 'lucide-react';
// import { toast } from 'sonner';
// import axios from 'axios';
// import { useDispatch, useSelector } from 'react-redux';
// import { setPosts } from '@/redux/postSlice';

// const CreatePost = ({ open, setOpen }) => {
//   const imageRef = useRef();
//   const [file, setFile] = useState("");
//   const [caption, setCaption] = useState("");
//   const [imagePreview, setImagePreview] = useState("");
//   const [loading, setLoading] = useState(false);
//   const {user} = useSelector(store=>store.auth);
//   const {posts} = useSelector(store=>store.post);
//   const dispatch = useDispatch();

//   const fileChangeHandler = async (e) => {
//     const file = e.target.files?.[0];
//     if (file) {
//       setFile(file);
//       const dataUrl = await readFileAsDataURL(file);
//       setImagePreview(dataUrl);
//     }
//   }

//   const createPostHandler = async (e) => {
//     const formData = new FormData();
//     formData.append("caption", caption);
//     if (imagePreview) formData.append("image", file);
//     try {
//       setLoading(true);
//       // const res = await axios.post('https://instaclone-g9h5.onrender.com/api/v1/post/addpost', formData, {
//         const res = await axios.post('http://localhost:8000/api/v1/post/addpost', formData, {
//           headers: {
//           'Content-Type': 'multipart/form-data'
//         },
//         withCredentials: true
//       });
//       if (res.data.success) {
//         dispatch(setPosts([res.data.post, ...posts]));// [1] -> [1,2] -> total element = 2
//         toast.success(res.data.message);
//         setOpen(false);
//       }
//     } catch (error) {
//       toast.error(error.response.data.message);
//     } finally {
//       setLoading(false);
//     }
//   }

//   return (
//     <Dialog open={open}>
//       <DialogContent onInteractOutside={() => setOpen(false)}>
//         <DialogHeader className='text-center font-semibold'>Create New Post</DialogHeader>
//         <div className='flex gap-3 items-center'>
//           <Avatar>
//             <AvatarImage src={user?.profilePicture} alt="img" />
//             <AvatarFallback>CN</AvatarFallback>
//           </Avatar>
//           <div>
//             <h1 className='font-semibold text-xs'>{user?.username}</h1>
//             <span className='text-gray-600 text-xs'>Bio here...</span>
//           </div>
//         </div>
//         <Textarea value={caption} onChange={(e) => setCaption(e.target.value)} className="focus-visible:ring-transparent border-none" placeholder="Write a caption..." />
//         {
//           imagePreview && (
//             <div className='w-full h-64 flex items-center justify-center'>
//               <img src={imagePreview} alt="preview_img" className='object-cover h-full w-full rounded-md' />
//             </div>
//           )
//         }
//         <input ref={imageRef} type='file' className='hidden' onChange={fileChangeHandler} />
//         <Button onClick={() => imageRef.current.click()} className='w-fit mx-auto bg-[#0095F6] hover:bg-[#258bcf] '>Select from computer</Button>
//         {
//           imagePreview && (
//             loading ? (
//               <Button>
//                 <Loader2 className='mr-2 h-4 w-4 animate-spin' />
//                 Please wait
//               </Button>
//             ) : (
//               <Button onClick={createPostHandler} type="submit" className="w-full">Post</Button>
//             )
//           )
//         }
//       </DialogContent>
//     </Dialog>
//   )
// }

// export default CreatePost




import React, { useRef, useState } from 'react'
import { Dialog, DialogContent, DialogHeader } from './ui/dialog'
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import { Textarea } from './ui/textarea';
import { Button } from './ui/button';
import { readFileAsDataURL } from '@/lib/utils';
import { Loader2, Image, Clapperboard } from 'lucide-react';
import { toast } from 'sonner';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { setPosts } from '@/redux/postSlice';

const CreatePost = ({ open, setOpen }) => {
  const fileRef = useRef();
  const [file, setFile] = useState("");
  const [caption, setCaption] = useState("");
  const [mediaPreview, setMediaPreview] = useState("");
  const [loading, setLoading] = useState(false);
  const [isReel, setIsReel] = useState(false); // false = post, true = reel
  const {user} = useSelector(store=>store.auth);
  const {posts} = useSelector(store=>store.post);
  const dispatch = useDispatch();

  const fileChangeHandler = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Validate file type based on selection
    if ((isReel && !file.type.startsWith('video/'))) {
      toast.error('Please select a video file for reels');
      return;
    } else if (!isReel && !file.type.startsWith('image/')) {
      toast.error('Please select an image file for posts');
      return;
    }

    setFile(file);
    const dataUrl = await readFileAsDataURL(file);
    setMediaPreview(dataUrl);
  }

  // const createMediaHandler = async (e) => {
  //   const formData = new FormData();
  //   formData.append("caption", caption);
    
  //   // Change this line to match your backend expectation
  //   if (mediaPreview) formData.append("image", file); // Changed from "media" to "image"

  //   try {
  //     setLoading(true);
  //     const endpoint = isReel ? '/api/v1/reel/addreel' : '/api/v1/post/addpost';
      
  //     const res = await axios.post(`http://localhost:8000${endpoint}`, formData, {
  //       headers: {
  //         'Content-Type': 'multipart/form-data'
  //       },
  //       withCredentials: true
  //     });

  //     if (res.data.success) {
  //       if (!isReel) {
  //         dispatch(setPosts([res.data.post, ...posts]));
  //       }
  //       toast.success(res.data.message);
  //       resetForm();
  //     }
  //   } catch (error) {
  //     toast.error(error.response?.data?.message || "Something went wrong");
  //   } finally {
  //     setLoading(false);
  //   }
  // }


  const createMediaHandler = async (e) => {
    const formData = new FormData();
    formData.append("caption", caption);
    
    // Use the correct field name based on post/reel
    if (mediaPreview) {
      if (isReel) {
        formData.append("video", file); // For reels
      } else {
        formData.append("image", file); // For posts
      }
    }

    try {
      setLoading(true);
      const endpoint = isReel ? '/api/v1/reel/addreel' : '/api/v1/post/addpost';
      
      const res = await axios.post(`http://localhost:8000${endpoint}`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        },
        withCredentials: true
      });

      if (res.data.success) {
        if (!isReel) {
          dispatch(setPosts([res.data.post, ...posts]));
        }
        toast.success(res.data.message);
        resetForm();
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  }

  const resetForm = () => {
    setFile("");
    setCaption("");
    setMediaPreview("");
    setIsReel(false);
    setOpen(false);
  }

  return (
    <Dialog open={open}>
      <DialogContent onInteractOutside={() => setOpen(false)}>
        <DialogHeader className='text-center font-semibold'>
          {isReel ? 'Create New Short Video Pitch' : 'Create New Post'}
        </DialogHeader>
        
        <div className='flex gap-3 items-center'>
          <Avatar>
            <AvatarImage src={user?.profilePicture} alt="img" />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>
          <div>
            <h1 className='font-semibold text-xs'>{user?.username}</h1>
            {/* <span className='text-gray-600 text-xs'>Bio here...</span> */}
          </div>
        </div>

        {/* Post/Reel toggle */}
        <div className="flex gap-4 mb-4">
          <Button 
            variant={!isReel ? "default" : "outline"} 
            onClick={() => {
              setIsReel(false);
              setFile("");
              setMediaPreview("");
            }}
            className="flex-1"
          >
            <Image className="mr-2 h-4 w-4" /> Post
          </Button>
          <Button 
            variant={isReel ? "default" : "outline"} 
            onClick={() => {
              setIsReel(true);
              setFile("");
              setMediaPreview("");
            }}
            className="flex-1"
          >
            <Clapperboard className="mr-2 h-4 w-4" /> Short Video Pitch
          </Button>
        </div>
        
        <Textarea 
          value={caption} 
          onChange={(e) => setCaption(e.target.value)} 
          className="focus-visible:ring-transparent border-none" 
          placeholder={isReel ? "Add a caption for your reel..." : "Write a caption..."} 
        />
        
        {mediaPreview && (
          <div className='w-full h-40 flex items-center justify-center'>
            {isReel ? (
              <video 
                src={mediaPreview} 
                controls 
                className='object-cover h-full w-full rounded-md'
              />
            ) : (
              <img 
                src={mediaPreview} 
                alt="preview" 
                className='object-cover h-full w-full rounded-md' 
              />
            )}
          </div>
        )}
        
        <input 
          ref={fileRef} 
          type='file' 
          className='hidden' 
          onChange={fileChangeHandler}
          accept={isReel ? "video/*" : "image/*"}
        />
        
        <Button 
          onClick={() => fileRef.current.click()} 
          className='w-fit mx-auto bg-[#0095F6] hover:bg-[#258bcf]'
        >
          {isReel ? "Select video from computer" : "Select image from computer"}
        </Button>
        
        {mediaPreview && (
          loading ? (
            <Button>
              <Loader2 className='mr-2 h-4 w-4 animate-spin' />
              Please wait
            </Button>
          ) : (
            <Button onClick={createMediaHandler} type="submit" className="w-full">
              {isReel ? "Share Reel" : "Share Post"}
            </Button>
          )
        )}
      </DialogContent>
    </Dialog>
  )
}

export default CreatePost