// import { useEffect } from 'react'
// import { useDispatch } from 'react-redux'
// import axios from 'axios'
// import { setReels } from '@/redux/reelSlice'

// const useGetAllReels = () => {
//     const dispatch = useDispatch();

//     useEffect(() => {
//         const fetchReels = async () => {
//             try {
//                 const res = await axios.get('http://localhost:8000/api/v1/reel/all', {
//                     withCredentials: true
//                 });
//                 if (res.data.success) {
//                     dispatch(setReels(res.data.reels));
//                 }
//             } catch (error) {
//                 console.log('Error fetching reels:', error);
//             }
//         };

//         fetchReels();
//     }, [dispatch]);
// };

// export default useGetAllReels;






// import { useEffect } from 'react'
// import { useDispatch } from 'react-redux'
// import axios from 'axios'
// import { setReels } from '@/redux/reelSlice'

// const useGetAllReels = () => {
//     const dispatch = useDispatch();

//     useEffect(() => {
//         const fetchReels = async () => {
//             try {
//                 const res = await axios.get('http://localhost:8000/api/v1/reel/all', {
//                     withCredentials: true
//                 });
//                 if (res.data.success) {
//                     dispatch(setReels(res.data.reels));
//                 }
//             } catch (error) {
//                 console.error('Error fetching reels:', error);
//             }
//         };

//         fetchReels();
//     }, [dispatch]);
// };

// export default useGetAllReels;
















import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import axios from 'axios';
import { setReels } from '@/redux/reelSlice';

const useGetAllReels = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchReels = async () => {
      try {
        const res = await axios.get('http://localhost:8000/api/v1/reel/all', {
          withCredentials: true
        });
        if (res.data.success) {
          dispatch(setReels(res.data.reels));
        }
      } catch (error) {
        console.error('Error fetching reels:', error);
      }
    };

    fetchReels();
  }, [dispatch]);
};

export default useGetAllReels;