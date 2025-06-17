// import React from 'react'
// import Reel from './Reel'
// import { useSelector } from 'react-redux'

// const ReelList = () => {
//   const {reels} = useSelector(store=>store.reel);
//   return (
//     <div>
//         {
//             reels.map((reel) => <Reel key={reel._id} reel={reel}/>)
//         }
//     </div>
//   )
// }

// export default ReelList











import React from 'react';
import Reel from './Reel';
import { useSelector } from 'react-redux';

const ReelList = () => {
  const { reels } = useSelector(store => store.reel);

  return (
    <div className="snap-y snap-mandatory h-screen w-full overflow-y-scroll">
      {reels.map((reel) => (
        <div key={reel._id} className="snap-start h-screen w-full">
          <Reel reel={reel} />
        </div>
      ))}
    </div>
  );
};

export default ReelList;









// components/ReelList.jsx
// components/ReelList.jsx
// components/ReelList.jsx
// import React, { useEffect, useState } from 'react';
// import { useSelector } from 'react-redux';
// import { useNavigate } from 'react-router-dom';
// import axiosInstance from '../utils/axiosConfig';


// const ReelList = () => {
//   const [reels, setReels] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const { token } = useSelector(store => store.auth);
//   const navigate = useNavigate();

//   useEffect(() => {
//     const fetchReels = async () => {
//       try {
//         setLoading(true);
//         setError(null);
        
//         const response = await axiosInstance.get('/feed/reels');
        
//         if (response.data?.success) {
//           setReels(response.data.reels || []);
//         } else {
//           throw new Error(response.data?.message || 'Failed to load reels');
//         }
//       } catch (err) {
//         console.error('Error fetching reels:', err);
//         setError(err.response?.data?.message || err.message || 'Failed to load reels');
//         if (err.response?.status === 401) {
//           navigate('/login');
//         }
//       } finally {
//         setLoading(false);
//       }
//     };

//     if (token) {
//       fetchReels();
//     } else {
//       setError('Please login to view reels');
//       setLoading(false);
//       navigate('/login');
//     }
//   }, [token, navigate]);

//   if (loading) return <div className="text-center py-8">Loading reels...</div>;
//   if (error) return <div className="text-red-500 text-center py-8">{error}</div>;

//   return (
//     <div className="space-y-6">
//       {reels.map(reel => (
//         <Reel key={reel._id} reel={reel} />
//       ))}
//     </div>
//   );
// };

// export default ReelList;