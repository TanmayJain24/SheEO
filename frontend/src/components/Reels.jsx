// import React from 'react'
// import ReelsFeed from './ReelsFeed'
// import { Link, Outlet } from 'react-router-dom'
// import useGetAllReels from '@/hooks/useGetAllReels'
// import useGetSuggestedUsers from '@/hooks/useGetSuggestedUsers'
// import { MessageCircle } from 'lucide-react'

// const Reels = () => {
//     useGetAllReels();
//     useGetSuggestedUsers();
//     return (
//         <div className="flex flex-col h-screen">
//             {/* Top Bar - Mobile Only */}
//             <div className="md:hidden flex items-center justify-between px-4 py-3 border-b border-gray-200 sticky top-0 bg-white z-50">
//                 <h1 className="text-xl font-semibold">Reels</h1>
//                 <Link to="/chat">
//                     <MessageCircle className="w-6 h-6" />
//                 </Link>
//             </div>

//             {/* Main Content */}
//             <div className='flex flex-col md:flex-row flex-1 overflow-hidden'>
//                 <div className='w-full md:flex-grow overflow-y-auto'>
//                     <ReelsFeed />
//                     <Outlet />
//                 </div>
//             </div>
//         </div>
//     )
// }

// export default Reels




// import React from 'react'
// import ReelsFeed from './ReelsFeed'
// import { Link, Outlet } from 'react-router-dom'
// import useGetAllReels from '@/hooks/useGetAllReels'
// import { MessageCircle } from 'lucide-react'

// const Reels = () => {
//     useGetAllReels();
//     return (
//         <div className="flex flex-col h-screen">
//             {/* Top Bar - Mobile Only */}
//             <div className="md:hidden flex items-center justify-between px-4 py-3 border-b border-gray-200 sticky top-0 bg-white z-50">
//                 <h1 className="text-xl font-semibold">Reels</h1>
//                 <Link to="/chat">
//                     <MessageCircle className="w-6 h-6" />
//                 </Link>
//             </div>

//             {/* Main Content */}
//             <div className='flex flex-col md:flex-row flex-1 overflow-hidden'>
//                 <div className='w-full md:flex-grow overflow-y-auto'>
//                     <ReelsFeed />
//                     <Outlet />
//                 </div>
//             </div>
//         </div>
//     )
// }

// export default Reels










import React from 'react';
import ReelsFeed from './ReelsFeed';
import useGetAllReels from '@/hooks/useGetAllReels';

const Reels = () => {
  useGetAllReels();
  
  return (
    <div className="relative h-screen w-full">
      <ReelsFeed />
    </div>
  );
};

export default Reels;