// import React from 'react'
// import Feed from './Feed'
// import { Outlet } from 'react-router-dom'
// import RightSidebar from './RightSidebar'
// import useGetAllPost from '@/hooks/useGetAllPost'
// import useGetSuggestedUsers from '@/hooks/useGetSuggestedUsers'

// const Home = () => {
//     useGetAllPost();
//     useGetSuggestedUsers();
//     return (
//         // <div className='flex'>
//         //     <div className='flex-grow'>
//         <div className='flex flex-col md:flex-row'>
//             <div className='w-full md:flex-grow'>
//                 <Feed />
//                 <Outlet />
//             </div>
//             {/* <RightSidebar /> */}
//         </div>
//     )
// }

// export default Home




// import React from 'react'
// import Feed from './Feed'
// import { Outlet } from 'react-router-dom'
// import RightSidebar from './RightSidebar'
// import useGetAllPost from '@/hooks/useGetAllPost'
// import useGetSuggestedUsers from '@/hooks/useGetSuggestedUsers'
// import { Camera, Send } from 'lucide-react' // Import icons if needed

// const Home = () => {
//     useGetAllPost();
//     useGetSuggestedUsers();
//     return (
//         <div className="flex flex-col h-screen">
//             {/* Top Bar - Mobile Only */}
//             <div className="md:hidden flex items-center justify-between px-4 py-3 border-b border-gray-200 sticky top-0 bg-white z-50">
//                 <h1 className="text-xl font-semibold">SheEO</h1>
//                 <div className="flex space-x-4">
//                     {/* <Camera className="w-5 h-5" /> */}
//                     <Send className="w-5 h-5" />
//                 </div>
//             </div>

//             {/* Main Content */}
//             <div className='flex flex-col md:flex-row flex-1 overflow-hidden'>
//                 <div className='w-full md:flex-grow overflow-y-auto'>
//                     <Feed />
//                     <Outlet />
//                 </div>
//                 {/* <RightSidebar /> */}
//             </div>
//         </div>
//     )
// }

// export default Home




import React from 'react'
import Feed from './Feed'
import { Link, Outlet } from 'react-router-dom'
import RightSidebar from './RightSidebar'
import useGetAllPost from '@/hooks/useGetAllPost'
import useGetSuggestedUsers from '@/hooks/useGetSuggestedUsers'
import { Book, ChartBar, MessageCircle } from 'lucide-react'
import ChatPage from './ChatPage'

const Home = () => {
    useGetAllPost();
    useGetSuggestedUsers();
    return (
        <div className="flex flex-col h-screen ">
            {/* Top Bar - Mobile Only */}
            {/* <div className="md:hidden flex items-center justify-between px-4 py-3 border-b border-gray-200 sticky top-0 z-50" style={{color: "white", backgroundColor: "#0077B5"}}>
                <h1 className="text-xl font-semibold">SheEO</h1>
                <Link to="/courses">
                    <Book className="w-6 h-6" />
                </Link>
                <Link to="/chat">
                    <MessageCircle className="w-6 h-6" />
                </Link>
            </div> */}

            <div className="md:hidden flex items-center justify-between px-4 py-3 border-b border-gray-200 sticky top-0 z-50" style={{ color: "white", backgroundColor: "#0077B5" }}>
            <h1 className="text-xl font-semibold">SheEO</h1>
            
            <div className="flex items-center space-x-4 ml-auto">
                <Link to="/chatb">
                    <ChartBar className="w-6 h-6" />
                </Link>
                <Link to="/courses">
                    <Book className="w-6 h-6" />
                </Link>
                <Link to="/chat">
                    <MessageCircle className="w-6 h-6" />
                </Link>
            </div>
            </div>


            {/* Main Content */}
            <div className='flex flex-col md:flex-row flex-1 overflow-hidden'>
                <div className='w-full md:flex-grow overflow-y-auto'>
                    <Feed />
                    <Outlet />
                </div>
                {/* <RightSidebar /> */}
            </div>
        </div>
    )
}

export default Home