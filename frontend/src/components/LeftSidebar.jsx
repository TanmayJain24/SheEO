// import { Heart, Home, LogOut, MessageCircle, PlusSquare, Search, TrendingUp } from 'lucide-react'
// import React, { useState } from 'react'
// import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar'
// import { toast } from 'sonner'
// import axios from 'axios'
// import { useNavigate } from 'react-router-dom'
// import { useDispatch, useSelector } from 'react-redux'
// import { setAuthUser } from '@/redux/authSlice'
// import CreatePost from './CreatePost'
// import { setPosts, setSelectedPost } from '@/redux/postSlice'
// import { Popover, PopoverContent, PopoverTrigger } from './ui/popover'
// import { Button } from './ui/button'

// const LeftSidebar = () => {
//     const navigate = useNavigate();
//     const { user } = useSelector(store => store.auth);
//     const { likeNotification } = useSelector(store => store.realTimeNotification);
//     const dispatch = useDispatch();
//     const [open, setOpen] = useState(false);


//     const logoutHandler = async () => {
//         try {
//             // const res = await axios.get('https://instaclone-g9h5.onrender.com/api/v1/user/logout', { withCredentials: true });
//             const res = await axios.get('http://localhost:8000/api/v1/user/logout', { withCredentials: true });
//             if (res.data.success) {
//                 dispatch(setAuthUser(null));
//                 dispatch(setSelectedPost(null));
//                 dispatch(setPosts([]));
//                 navigate("/login");
//                 toast.success(res.data.message);
//             }
//         } catch (error) {
//             toast.error(error.response.data.message);
//         }
//     }

//     const sidebarHandler = (textType) => {
//         if (textType === 'Logout') {
//             logoutHandler();
//         } else if (textType === "Create") {
//             setOpen(true);
//         } else if (textType === "Profile") {
//             navigate(`/profile/${user?._id}`);
//         } else if (textType === "Home") {
//             navigate("/");
//         } else if (textType === 'Messages') {
//             navigate("/chat");
//         }
//     }

//     const sidebarItems = [
//         { icon: <Home />, text: "Home" },
//         { icon: <Search />, text: "Search" },
//         // { icon: <TrendingUp />, text: "Explore" },
//         { icon: <MessageCircle />, text: "Messages" },
//         // { icon: <Heart />, text: "Notifications" },
//         { icon: <PlusSquare />, text: "Create" },
//         {
//             icon: (
//                 <Avatar className='w-6 h-6'>
//                     <AvatarImage src={user?.profilePicture} alt="@shadcn" />
//                     <AvatarFallback>CN</AvatarFallback>
//                 </Avatar>
//             ),
//             text: "Profile"
//         },
//         { icon: <LogOut />, text: "Logout" },
//     ]
//     // return (
//     //     <div className='fixed top-0 z-10 left-0 px-4 border-r border-gray-300 w-[16%] h-screen'>
//     //         <div className='flex flex-col'>
//     //             <h1 className='my-8 pl-3 font-bold text-xl'>LOGO</h1>
//     //             <div>
//     //                 {
//     //                     sidebarItems.map((item, index) => {
//     //                         return (
//     //                             <div onClick={() => sidebarHandler(item.text)} key={index} className='flex items-center gap-3 relative hover:bg-gray-100 cursor-pointer rounded-lg p-3 my-3'>
//     //                                 {item.icon}
//     //                                 <span>{item.text}</span>
//     //                                 {
//     //                                     item.text === "Notifications" && likeNotification.length > 0 && (
//     //                                         <Popover>
//     //                                             <PopoverTrigger asChild>
//     //                                                 <Button size='icon' className="rounded-full h-5 w-5 bg-red-600 hover:bg-red-600 absolute bottom-6 left-6">{likeNotification.length}</Button>
//     //                                             </PopoverTrigger>
//     //                                             <PopoverContent>
//     //                                                 <div>
//     //                                                     {
//     //                                                         likeNotification.length === 0 ? (<p>No new notification</p>) : (
//     //                                                             likeNotification.map((notification) => {
//     //                                                                 return (
//     //                                                                     <div key={notification.userId} className='flex items-center gap-2 my-2'>
//     //                                                                         <Avatar>
//     //                                                                             <AvatarImage src={notification.userDetails?.profilePicture} />
//     //                                                                             <AvatarFallback>CN</AvatarFallback>
//     //                                                                         </Avatar>
//     //                                                                         <p className='text-sm'><span className='font-bold'>{notification.userDetails?.username}</span> liked your post</p>
//     //                                                                     </div>
//     //                                                                 )
//     //                                                             })
//     //                                                         )
//     //                                                     }
//     //                                                 </div>
//     //                                             </PopoverContent>
//     //                                         </Popover>
//     //                                     )
//     //                                 }
//     //                             </div>
//     //                         )
//     //                     })
//     //                 }
//     //             </div>
//     //         </div>

            

//     //         <CreatePost open={open} setOpen={setOpen} />

//     //     </div>
//     // )


//     return (
//         <>
//           {/* Desktop Sidebar */}
//           <div className='hidden md:flex fixed top-0 z-10 left-0 px-4 border-r border-gray-300 w-[16%] h-screen'>
//             <div className='flex flex-col'>
//               <h1 className='my-8 pl-3 font-bold text-xl'>LOGO</h1>
//               <div>
//                 {sidebarItems.map((item, index) => (
//                   <div
//                     onClick={() => sidebarHandler(item.text)}
//                     key={index}
//                     className='flex items-center gap-3 relative hover:bg-gray-100 cursor-pointer rounded-lg p-3 my-3'
//                   >
//                     {item.icon}
//                     <span>{item.text}</span>
//                     {item.text === "Notifications" && likeNotification.length > 0 && (
//                       <Popover>
//                         <PopoverTrigger asChild>
//                           <Button
//                             size='icon'
//                             className='rounded-full h-5 w-5 bg-red-600 hover:bg-red-600 absolute bottom-6 left-6'
//                           >
//                             {likeNotification.length}
//                           </Button>
//                         </PopoverTrigger>
//                         <PopoverContent>
//                           <div>
//                             {likeNotification.length === 0 ? (
//                               <p>No new notification</p>
//                             ) : (
//                               likeNotification.map((notification) => (
//                                 <div key={notification.userId} className='flex items-center gap-2 my-2'>
//                                   <Avatar>
//                                     <AvatarImage src={notification.userDetails?.profilePicture} />
//                                     <AvatarFallback>CN</AvatarFallback>
//                                   </Avatar>
//                                   <p className='text-sm'>
//                                     <span className='font-bold'>{notification.userDetails?.username}</span> liked your post
//                                   </p>
//                                 </div>
//                               ))
//                             )}
//                           </div>
//                         </PopoverContent>
//                       </Popover>
//                     )}
//                   </div>
//                 ))}
//               </div>
//             </div>
//           </div>
      
//           {/* Mobile Bottom Nav */}
//           <div className='md:hidden fixed bottom-0 z-10 left-0 w-full bg-white border-t border-gray-300 flex justify-around py-2'>
//             {sidebarItems.map((item, index) => (
//               <div
//                 onClick={() => sidebarHandler(item.text)}
//                 key={index}
//                 className='flex flex-col items-center text-sm cursor-pointer relative'
//               >
//                 {item.icon}
//                 {/* Optional: text under icon */}
//                 {/* <span className='text-[10px]'>{item.text}</span> */}
//                 {item.text === "Notifications" && likeNotification.length > 0 && (
//                   <div className='absolute top-0 right-0 bg-red-600 text-white rounded-full h-4 w-4 text-[10px] flex items-center justify-center'>
//                     {likeNotification.length}
//                   </div>
//                 )}
//               </div>
//             ))}
//           </div>
      
//           <CreatePost open={open} setOpen={setOpen} />
//         </>
//       );
      
// }

// export default LeftSidebar













// import { Heart, Home, LogOut, MessageCircle, PlusSquare, Search } from 'lucide-react'
// import React, { useState } from 'react'
// import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar'
// import { toast } from 'sonner'
// import axios from 'axios'
// import { useNavigate } from 'react-router-dom'
// import { useDispatch, useSelector } from 'react-redux'
// import { setAuthUser } from '@/redux/authSlice'
// import CreatePost from './CreatePost'
// import { setPosts, setSelectedPost } from '@/redux/postSlice'
// import { Popover, PopoverContent, PopoverTrigger } from './ui/popover'
// import { Button } from './ui/button'

// const LeftSidebar = () => {
//     const navigate = useNavigate();
//     const { user } = useSelector(store => store.auth);
//     const { likeNotification } = useSelector(store => store.realTimeNotification);
//     const dispatch = useDispatch();
//     const [open, setOpen] = useState(false);

//     const logoutHandler = async () => {
//         try {
//             const res = await axios.get('http://localhost:8000/api/v1/user/logout', { withCredentials: true });
//             if (res.data.success) {
//                 dispatch(setAuthUser(null));
//                 dispatch(setSelectedPost(null));
//                 dispatch(setPosts([]));
//                 navigate("/login");
//                 toast.success(res.data.message);
//             }
//         } catch (error) {
//             toast.error(error.response.data.message);
//         }
//     }

//     const sidebarHandler = (textType) => {
//         if (textType === 'Logout') {
//             logoutHandler();
//         } else if (textType === "Create") {
//             setOpen(true);
//         } else if (textType === "Profile") {
//             navigate(`/profile/${user?._id}`);
//         } else if (textType === "Home") {
//             navigate("/");
//         }
//         else if (textType === "Messages") {
//           navigate("/chat");
//         }
//         else if (textType === "Search") {
//           navigate("/search");
//         }
//     }

//     // Items for mobile bottom nav (without Messages)
//     const mobileSidebarItems = [
//         { icon: <Home />, text: "Home" },
//         { icon: <Search />, text: "Search" },
//         { icon: <PlusSquare />, text: "Create" },
//         {
//             icon: (
//                 <Avatar className='w-6 h-6'>
//                     <AvatarImage src={user?.profilePicture} alt="@shadcn" />
//                     <AvatarFallback>CN</AvatarFallback>
//                 </Avatar>
//             ),
//             text: "Profile"
//         },
//     ]

//     // Items for desktop sidebar (includes Messages)
//     const desktopSidebarItems = [
//         ...mobileSidebarItems,
//         { icon: <MessageCircle />, text: "Messages" },
//         { icon: <LogOut />, text: "Logout" },
//     ]

//     return (
//         <>
//             {/* Desktop Sidebar */}
//             <div className='hidden md:flex fixed top-0 z-10 left-0 px-4 border-r border-gray-300 w-[16%] h-screen'>
//                 <div className='flex flex-col'>
//                     <h1 className='my-8 pl-3 font-bold text-xl'>SheEO</h1>
//                     <div>
//                         {desktopSidebarItems.map((item, index) => (
//                             <div
//                                 onClick={() => sidebarHandler(item.text)}
//                                 key={index}
//                                 className='flex items-center gap-3 relative hover:bg-gray-100 cursor-pointer rounded-lg p-3 my-3'
//                             >
//                                 {item.icon}
//                                 <span>{item.text}</span>
//                                 {item.text === "Notifications" && likeNotification.length > 0 && (
//                                     <span className="absolute left-6 bottom-6 bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs">
//                                         {likeNotification.length}
//                                     </span>
//                                 )}
//                             </div>
//                         ))}
//                     </div>
//                 </div>
//             </div>

//             {/* Mobile Bottom Nav */}
//             <div className='md:hidden fixed bottom-0 z-10 left-0 w-full bg-white border-t border-gray-300 flex justify-around py-2'>
//                 {mobileSidebarItems.map((item, index) => (
//                     <div
//                         onClick={() => sidebarHandler(item.text)}
//                         key={index}
//                         className='flex flex-col items-center cursor-pointer p-2'
//                     >
//                         {item.icon}
//                     </div>
//                 ))}
//                 {/* <div
//                     onClick={() => navigate('/chat')}
//                     className='flex flex-col items-center cursor-pointer p-2'
//                 >
//                     <MessageCircle className="w-6 h-6" />
//                 </div> */}
//                 <div
//                     onClick={logoutHandler}
//                     className='flex flex-col items-center cursor-pointer p-2'
//                 >
//                     <LogOut className="w-6 h-6" />
//                 </div>
//             </div>

//             <CreatePost open={open} setOpen={setOpen} />
//         </>
//     );
// }

// export default LeftSidebar

















import { Heart, Home, LogOut, MessageCircle, PlusSquare, Search, Clapperboard, Book, ChartBar } from 'lucide-react'
import React, { useState } from 'react'
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar'
import { toast } from 'sonner'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { setAuthUser } from '@/redux/authSlice'
import CreatePost from './CreatePost'
import { setPosts, setSelectedPost } from '@/redux/postSlice'
import { Popover, PopoverContent, PopoverTrigger } from './ui/popover'
import { Button } from './ui/button'

const LeftSidebar = () => {
    const navigate = useNavigate();
    const { user } = useSelector(store => store.auth);
    const { likeNotification } = useSelector(store => store.realTimeNotification);
    const dispatch = useDispatch();
    const [open, setOpen] = useState(false);

    const logoutHandler = async () => {
        try {
            const res = await axios.get('http://localhost:8000/api/v1/user/logout', { withCredentials: true });
            if (res.data.success) {
                dispatch(setAuthUser(null));
                dispatch(setSelectedPost(null));
                dispatch(setPosts([]));
                navigate("/login");
                toast.success(res.data.message);
            }
        } catch (error) {
            toast.error(error.response.data.message);
        }
    }

    const sidebarHandler = (textType) => {
        if (textType === 'Logout') {
            logoutHandler();
        } else if (textType === "Create") {
            setOpen(true);
        } else if (textType === "Profile") {
            navigate(`/profile/${user?._id}`);
        } else if (textType === "Home") {
            navigate("/");
        } else if (textType === "Messages") {
            navigate("/chat");
        } else if (textType === "Search") {
            navigate("/search");
        } else if (textType === "Pitches") {
            navigate("/reels");
        }
        else if (textType === "Courses") {
            navigate("/courses");
        }
        else if (textType === "Chatb") {
            navigate("/chatb");
        }
    }

    // Items for mobile bottom nav
    const mobileSidebarItems = [
        { icon: <Home />, text: "Home" },
        { icon: <Search />, text: "Search" },
        { icon: <Clapperboard />, text: "Pitches" },
        { icon: <PlusSquare />, text: "Create" },

        {
            icon: (
                <Avatar className='w-6 h-6'>
                    <AvatarImage src={user?.profilePicture} alt="@shadcn" />
                    <AvatarFallback>CN</AvatarFallback>
                </Avatar>
            ),
            text: "Profile"
        },
    ]

    // Items for desktop sidebar
    const desktopSidebarItems = [
        { icon: <Home/>, text: "Home" },
        { icon: <Search />, text: "Search" },
        { icon: <Clapperboard />, text: "Pitches" },
        { icon: <MessageCircle />, text: "Messages" },
        { icon: <PlusSquare />, text: "Create" },
        { icon: <Book />, text: "Courses" },

        {
            icon: (
                <Avatar className='w-6 h-6'>
                    <AvatarImage src={user?.profilePicture} alt="@shadcn" />
                    <AvatarFallback>CN</AvatarFallback>
                </Avatar>
            ),
            text: "Profile"
        },
        { icon: <ChartBar />, text: "Chatb" },
        { icon: <LogOut />, text: "Logout" },
    ]

    return (
        <>
            {/* Desktop Sidebar */}
            <div className='hidden md:flex fixed top-0 z-10 left-0 px-4 border-r border-gray-300 w-[16%] h-screen' style={{color: "#0077B5"}}>
                <div className='flex flex-col'>
                    <h1 className='my-8 pl-3 font-bold text-xl'>SheEO</h1>
                    <div>
                        {desktopSidebarItems.map((item, index) => (
                            <div
                                onClick={() => sidebarHandler(item.text)}
                                key={index}
                                className='flex items-center gap-3 relative hover:bg-gray-100 cursor-pointer rounded-lg p-3 my-1'
                            >
                                {item.icon}
                                <span>{item.text}</span>
                                {item.text === "Notifications" && likeNotification.length > 0 && (
                                    <span className="absolute left-6 bottom-6 bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs">
                                        {likeNotification.length}
                                    </span>
                                )}
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Mobile Bottom Nav */}
            <div className='md:hidden fixed bottom-0 z-10 left-0 w-full bg-white border-t border-gray-300 flex justify-around py-2' style={{color: "#0077B5"}}>
                {mobileSidebarItems.map((item, index) => (
                    <div
                        onClick={() => sidebarHandler(item.text)}
                        key={index}
                        className='flex flex-col items-center cursor-pointer p-2'
                    >
                        {item.icon}
                    </div>
                ))}
                <div
                    onClick={logoutHandler}
                    className='flex flex-col items-center cursor-pointer p-2'
                >
                    <LogOut className="w-6 h-6" />
                </div>
            </div>

            <CreatePost open={open} setOpen={setOpen} />
        </>
    );
}

export default LeftSidebar