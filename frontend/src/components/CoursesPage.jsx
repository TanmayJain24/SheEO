// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import { toast } from 'sonner';

// const CoursesPage = () => {
//   const [courses, setCourses] = useState([]);
//   const [enrolledCourses, setEnrolledCourses] = useState([]);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     // Fetch all available courses
//     const fetchCourses = async () => {
//       try {
//         const res = await axios.get('http://localhost:8000/api/v1/courses');
//         setCourses(res.data.courses);
//         setLoading(false);
//       } catch (error) {
//         toast.error('Failed to fetch courses');
//         setLoading(false);
//       }
//     };

//     // Fetch user's enrolled courses
//     const fetchEnrolledCourses = async () => {
//       try {
//         const res = await axios.get('http://localhost:8000/api/v1/courses/enrolled', {
//           withCredentials: true
//         });
//         setEnrolledCourses(res.data.courses);
//       } catch (error) {
//         toast.error('Failed to fetch enrolled courses');
//       }
//     };

//     fetchCourses();
//     fetchEnrolledCourses();
//   }, []);

//   const handleEnroll = async (courseId) => {
//     try {
//       const res = await axios.post(
//         `http://localhost:8000/api/v1/courses/${courseId}/enroll`,
//         {},
//         { withCredentials: true }
//       );
      
//       if (res.data.success) {
//         toast.success('Course enrolled successfully');
//         // Add to enrolled courses
//         const enrolledCourse = courses.find(c => c._id === courseId);
//         setEnrolledCourses(prev => [...prev, enrolledCourse]);
//       }
//     } catch (error) {
//       toast.error(error.response?.data?.message || 'Failed to enroll');
//     }
//   };

//   const isEnrolled = (courseId) => {
//     return enrolledCourses.some(c => c._id === courseId);
//   };

//   if (loading) {
//     return <div className="text-center py-8">Loading courses...</div>;
//   }

//   return (
//     <div className="container mx-auto px-4 py-8">
//       <h1 className="text-3xl font-bold mb-8">Available Courses</h1>
      
//       <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
//         {courses.map(course => (
//           <div key={course._id} className="bg-white rounded-lg shadow-md overflow-hidden">
//             <div className="relative pb-[56.25%]"> {/* 16:9 aspect ratio */}
//               <img 
//                 src={course.thumbnail} 
//                 alt={course.title}
//                 className="absolute h-full w-full object-cover"
//               />
//             </div>
//             <div className="p-4">
//               <h3 className="text-xl font-semibold mb-2">{course.title}</h3>
//               <div className="flex justify-between items-center">
//                 <span className="text-gray-600">{course.instructor}</span>
//                 {isEnrolled(course._id) ? (
//                   <span className="text-green-600">Enrolled</span>
//                 ) : (
//                   <button
//                     onClick={() => handleEnroll(course._id)}
//                     className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
//                   >
//                     Enroll Now
//                   </button>
//                 )}
//               </div>
//             </div>
//           </div>
//         ))}
//       </div>

//       {enrolledCourses.length > 0 && (
//         <>
//           <h2 className="text-2xl font-bold mb-6">Your Enrolled Courses</h2>
//           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
//             {enrolledCourses.map(course => (
//               <div 
//                 key={course._id} 
//                 className="bg-white rounded-lg shadow-md overflow-hidden cursor-pointer hover:shadow-lg transition"
//                 onClick={() => window.open(course.videoUrl, '_blank')}
//               >
//                 <div className="relative pb-[56.25%]">
//                   <img 
//                     src={course.thumbnail} 
//                     alt={course.title}
//                     className="absolute h-full w-full object-cover"
//                   />
//                 </div>
//                 <div className="p-4">
//                   <h3 className="text-xl font-semibold mb-2">{course.title}</h3>
//                   <div className="flex justify-between items-center">
//                     <span className="text-gray-600">{course.instructor}</span>
//                     <span className="text-green-600">Watch Now →</span>
//                   </div>
//                 </div>
//               </div>
//             ))}
//           </div>
//         </>
//       )}
//     </div>
//   );
// };

// export default CoursesPage;










// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import { toast } from 'sonner';
// import { useNavigate } from 'react-router-dom';

// const CoursesPage = () => {
//   const [courses, setCourses] = useState([]);
//   const [enrolledCourses, setEnrolledCourses] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [enrollmentStatus, setEnrollmentStatus] = useState({});
//   const navigate = useNavigate();

//   // Fetch all courses and enrollment status
//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         setLoading(true);
        
//         // Fetch all available courses
//         const coursesRes = await axios.get('http://localhost:8000/api/v1/courses');
//         setCourses(coursesRes.data.courses);
        
//         // Fetch user's enrolled courses
//         const enrolledRes = await axios.get('http://localhost:8000/api/v1/courses/enrolled', {
//           withCredentials: true
//         });
//         setEnrolledCourses(enrolledRes.data.courses);
        
//         // Initialize enrollment status
//         const status = {};
//         enrolledRes.data.courses.forEach(course => {
//           status[course._id] = true;
//         });
//         setEnrollmentStatus(status);
        
//       } catch (error) {
//         toast.error('Failed to fetch courses data');
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchData();
//   }, []);

//   const handleEnroll = async (courseId) => {
//     try {
//       const res = await axios.post(
//         `http://localhost:8000/api/v1/courses/${courseId}/enroll`,
//         {},
//         { withCredentials: true }
//       );
      
//       if (res.data.success) {
//         toast.success('Course enrolled successfully');
//         // Update enrollment status
//         setEnrollmentStatus(prev => ({ ...prev, [courseId]: true }));
        
//         // Fetch the enrolled course details and add to enrolled courses list
//         const course = courses.find(c => c._id === courseId);
//         setEnrolledCourses(prev => [...prev, course]);
//       }
//     } catch (error) {
//       toast.error(error.response?.data?.message || 'Failed to enroll');
//     }
//   };

//   const handleCourseClick = (courseId, isEnrolled) => {
//     if (isEnrolled) {
//       // Find the course and redirect to YouTube
//       const course = courses.find(c => c._id === courseId);
//       if (course && course.videoUrl) {
//         window.open(course.videoUrl, '_blank');
//       }
//     }
//   };

//   if (loading) {
//     return (
//       <div className="flex justify-center items-center h-64">
//         <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
//       </div>
//     );
//   }

//   return (
//     <div className="container mx-auto px-4 py-8">
//       <h1 className="text-3xl font-bold mb-8">Available Courses</h1>
      
//       {/* Available Courses Section */}
//       <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
//         {courses.map(course => (
//           <div 
//             key={course._id} 
//             className={`bg-white rounded-lg shadow-md overflow-hidden transition-transform hover:scale-105 ${
//               enrollmentStatus[course._id] ? 'border-2 border-green-500' : ''
//             }`}
//           >
//             <div 
//               className="relative pb-[56.25%] cursor-pointer" // 16:9 aspect ratio
//               onClick={() => handleCourseClick(course._id, enrollmentStatus[course._id])}
//             >
//               <img 
//                 src={course.thumbnail} 
//                 alt={course.title}
//                 className="absolute h-full w-full object-cover"
//               />
//               {enrollmentStatus[course._id] && (
//                 <div className="absolute bottom-2 right-2 bg-green-500 text-white px-2 py-1 rounded-md text-sm">
//                   Enrolled
//                 </div>
//               )}
//             </div>
//             <div className="p-4">
//               <h3 className="text-xl font-semibold mb-2">{course.title}</h3>
//               <p className="text-gray-600 mb-3 line-clamp-2">{course.description}</p>
//               <div className="flex justify-between items-center">
//                 <span className="text-gray-600">{course.instructor}</span>
//                 <span className="text-gray-500">{course.duration} min</span>
//               </div>
//               <div className="mt-4">
//                 {enrollmentStatus[course._id] ? (
//                   <button
//                     onClick={() => handleCourseClick(course._id, true)}
//                     className="w-full bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 transition"
//                   >
//                     Watch Now
//                   </button>
//                 ) : (
//                   <button
//                     onClick={() => handleEnroll(course._id)}
//                     className="w-full bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
//                   >
//                     Enroll Now
//                   </button>
//                 )}
//               </div>
//             </div>
//           </div>
//         ))}
//       </div>

//       {/* Enrolled Courses Section */}
//       {enrolledCourses.length > 0 && (
//         <>
//           <h2 className="text-2xl font-bold mb-6">Your Enrolled Courses</h2>
//           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
//             {enrolledCourses.map(course => (
//               <div 
//                 key={course._id} 
//                 className="bg-white rounded-lg shadow-md overflow-hidden border-2 border-green-500 cursor-pointer hover:shadow-lg transition"
//                 onClick={() => handleCourseClick(course._id, true)}
//               >
//                 <div className="relative pb-[56.25%]">
//                   <img 
//                     src={course.thumbnail} 
//                     alt={course.title}
//                     className="absolute h-full w-full object-cover"
//                   />
//                   <div className="absolute bottom-2 right-2 bg-green-500 text-white px-2 py-1 rounded-md text-sm">
//                     Enrolled
//                   </div>
//                 </div>
//                 <div className="p-4">
//                   <h3 className="text-xl font-semibold mb-2">{course.title}</h3>
//                   <div className="flex justify-between items-center">
//                     <span className="text-gray-600">{course.instructor}</span>
//                     <span className="text-green-600 font-medium">Watch Now →</span>
//                   </div>
//                 </div>
//               </div>
//             ))}
//           </div>
//         </>
//       )}
//     </div>
//   );
// };

// export default CoursesPage;










// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import { toast } from 'sonner';

// const CoursesPage = () => {
//   const [courses, setCourses] = useState([]);
//   const [enrolledCourses, setEnrolledCourses] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [enrollmentStatus, setEnrollmentStatus] = useState({});

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         setLoading(true);
        
//         const [coursesRes, enrolledRes] = await Promise.all([
//           axios.get('http://localhost:8000/api/v1/courses'),
//           axios.get('http://localhost:8000/api/v1/courses/enrolled', {
//             withCredentials: true
//           })
//         ]);
        
//         setCourses(coursesRes.data.courses || []);
//         setEnrolledCourses(enrolledRes.data.courses || []);
        
//         const status = {};
//         (enrolledRes.data.courses || []).forEach(course => {
//           status[course._id] = true;
//         });
//         setEnrollmentStatus(status);
        
//       } catch (error) {
//         toast.error('Failed to fetch courses data');
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchData();
//   }, []);

//   const handleEnroll = async (courseId) => {
//     try {
//       const res = await axios.post(
//         `http://localhost:8000/api/v1/courses/${courseId}/enroll`,
//         {},
//         { withCredentials: true }
//       );
      
//       if (res.data.success) {
//         toast.success('Course enrolled successfully');
//         setEnrollmentStatus(prev => ({ ...prev, [courseId]: true }));
//         const course = courses.find(c => c._id === courseId);
//         setEnrolledCourses(prev => [...prev, course]);
//       }
//     } catch (error) {
//       toast.error(error.response?.data?.message || 'Failed to enroll');
//     }
//   };

//   const handleCourseClick = (courseId, isEnrolled) => {
//     if (isEnrolled) {
//       const course = courses.find(c => c._id === courseId);
//       if (course?.videoUrl) window.open(course.videoUrl, '_blank');
//     }
//   };

//   if (loading) {
//     return (
//       <div className="flex justify-center items-center h-screen ml-0 md:ml-64 p-4 md:p-8">
//         <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
//       </div>
//     );
//   }

//   return (
//     <div className="ml-64 p-8"> {/* Adjust ml-64 based on your sidebar width */}
//       <h1 className="text-3xl font-bold mb-8">Available Courses</h1>
      
//       <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
//         {courses.map(course => (
//           <div 
//             key={course._id} 
//             className={`bg-white rounded-lg shadow-md overflow-hidden transition-transform hover:scale-105 ${
//               enrollmentStatus[course._id] ? 'border-2 border-green-500' : ''
//             }`}
//           >
//             <div 
//               className="relative pb-[56.25%] cursor-pointer"
//               onClick={() => handleCourseClick(course._id, enrollmentStatus[course._id])}
//             >
//               <img 
//                 src={course.thumbnail} 
//                 alt={course.title}
//                 className="absolute h-full w-full object-cover"
//               />
//               {enrollmentStatus[course._id] && (
//                 <div className="absolute bottom-2 right-2 bg-green-500 text-white px-2 py-1 rounded-md text-sm">
//                   Enrolled
//                 </div>
//               )}
//             </div>
//             <div className="p-4">
//               <h3 className="text-xl font-semibold mb-2">{course.title}</h3>
//               <p className="text-gray-600 mb-3 line-clamp-2">{course.description}</p>
//               <div className="flex justify-between items-center">
//                 <span className="text-gray-600">{course.instructor}</span>
//                 <span className="text-gray-500">{course.duration} min</span>
//               </div>
//               <div className="mt-4">
//                 {enrollmentStatus[course._id] ? (
//                   <button
//                     onClick={() => handleCourseClick(course._id, true)}
//                     className="w-full bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 transition"
//                   >
//                     Watch Now
//                   </button>
//                 ) : (
//                   <button
//                     onClick={() => handleEnroll(course._id)}
//                     className="w-full bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
//                   >
//                     Enroll Now
//                   </button>
//                 )}
//               </div>
//             </div>
//           </div>
//         ))}
//       </div>

//       {enrolledCourses.length > 0 && (
//         <>
//           <h2 className="text-2xl font-bold mb-6">Your Enrolled Courses</h2>
//           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
//             {enrolledCourses.map(course => (
//               <div 
//                 key={course._id} 
//                 className="bg-white rounded-lg shadow-md overflow-hidden border-2 border-green-500 cursor-pointer hover:shadow-lg transition"
//                 onClick={() => handleCourseClick(course._id, true)}
//               >
//                 <div className="relative pb-[56.25%]">
//                   <img 
//                     src={course.thumbnail} 
//                     alt={course.title}
//                     className="absolute h-full w-full object-cover"
//                   />
//                   <div className="absolute bottom-2 right-2 bg-green-500 text-white px-2 py-1 rounded-md text-sm">
//                     Enrolled
//                   </div>
//                 </div>
//                 <div className="p-4">
//                   <h3 className="text-xl font-semibold mb-2">{course.title}</h3>
//                   <div className="flex justify-between items-center">
//                     <span className="text-gray-600">{course.instructor}</span>
//                     <span className="text-green-600 font-medium">Watch Now →</span>
//                   </div>
//                 </div>
//               </div>
//             ))}
//           </div>
//         </>
//       )}
//     </div>
//   );
// };

// export default CoursesPage;











import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { toast } from 'sonner';

const CoursesPage = () => {
  const [courses, setCourses] = useState([]);
  const [enrolledCourses, setEnrolledCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [enrollmentStatus, setEnrollmentStatus] = useState({});
  const [sidebarOpen, setSidebarOpen] = useState(false); // State for mobile sidebar toggle

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        
        const [coursesRes, enrolledRes] = await Promise.all([
          axios.get('http://localhost:8000/api/v1/courses'),
          axios.get('http://localhost:8000/api/v1/courses/enrolled', {
            withCredentials: true
          })
        ]);
        
        setCourses(coursesRes.data.courses || []);
        setEnrolledCourses(enrolledRes.data.courses || []);
        
        const status = {};
        (enrolledRes.data.courses || []).forEach(course => {
          status[course._id] = true;
        });
        setEnrollmentStatus(status);
        
      } catch (error) {
        toast.error('Failed to fetch courses data');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleEnroll = async (courseId) => {
    try {
      const res = await axios.post(
        `http://localhost:8000/api/v1/courses/${courseId}/enroll`,
        {},
        { withCredentials: true }
      );
      
      if (res.data.success) {
        toast.success('Course enrolled successfully');
        setEnrollmentStatus(prev => ({ ...prev, [courseId]: true }));
        const course = courses.find(c => c._id === courseId);
        setEnrolledCourses(prev => [...prev, course]);
      }
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to enroll');
    }
  };

  const handleCourseClick = (courseId, isEnrolled) => {
    if (isEnrolled) {
      const course = courses.find(c => c._id === courseId);
      if (course?.videoUrl) window.open(course.videoUrl, '_blank');
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  return (
    // <div className="lg:ml-64 p-4 md:p-8 transition-all duration-300">
    <div className="lg:ml-64 p-4 md:p-8">
      {/* Mobile Sidebar Toggle Button */}
      {/* <button 
        className="lg:hidden fixed top-4 left-4 z-50 bg-gray-800 text-white p-2 rounded-md"
        onClick={() => setSidebarOpen(!sidebarOpen)}
      >
        {sidebarOpen ? (
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        ) : (
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        )}
      </button> */}

      <h1 className="text-2xl md:text-3xl font-bold mb-6 md:mb-8">Available Courses</h1>
      
      {/* Available Courses Section */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 mb-8 md:mb-12">
        {courses.map(course => (
          <div 
            key={course._id} 
            className={`bg-white rounded-lg shadow-md overflow-hidden transition-transform hover:scale-[1.02] ${
              enrollmentStatus[course._id] ? 'border-2 border-green-500' : ''
            }`}
          >
            <div 
              className="relative pb-[56.25%] cursor-pointer"
              onClick={() => handleCourseClick(course._id, enrollmentStatus[course._id])}
            >
              <img 
                src={course.thumbnail} 
                alt={course.title}
                className="absolute h-full w-full object-cover"
                loading="lazy"
              />
              {enrollmentStatus[course._id] && (
                <div className="absolute bottom-2 right-2 bg-green-500 text-white px-2 py-1 rounded-md text-xs md:text-sm">
                  Enrolled
                </div>
              )}
            </div>
            <div className="p-3 md:p-4">
              <h3 className="text-lg md:text-xl font-semibold mb-1 md:mb-2">{course.title}</h3>
              <p className="text-gray-600 text-sm md:text-base mb-2 md:mb-3 line-clamp-2">{course.description}</p>
              <div className="flex justify-between items-center text-xs md:text-sm">
                <span className="text-gray-600">{course.instructor}</span>
                <span className="text-gray-500">{course.duration} min</span>
              </div>
              <div className="mt-2 md:mt-4">
                {enrollmentStatus[course._id] ? (
                  <button
                    onClick={() => handleCourseClick(course._id, true)}
                    className="w-full bg-green-600 text-white px-3 py-1 md:px-4 md:py-2 rounded text-sm md:text-base hover:bg-green-700 transition"
                  >
                    Watch Now
                  </button>
                ) : (
                  <button
                    onClick={() => handleEnroll(course._id)}
                    className="w-full bg-blue-600 text-white px-3 py-1 md:px-4 md:py-2 rounded text-sm md:text-base hover:bg-blue-700 transition"
                  >
                    Enroll Now
                  </button>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Enrolled Courses Section */}
      {enrolledCourses.length > 0 && (
        <>
          <h2 className="text-xl md:text-2xl font-bold mb-4 md:mb-6">Your Enrolled Courses</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
            {enrolledCourses.map(course => (
              <div 
                key={course._id} 
                className="bg-white rounded-lg shadow-md overflow-hidden border-2 border-green-500 cursor-pointer hover:shadow-lg transition"
                onClick={() => handleCourseClick(course._id, true)}
              >
                <div className="relative pb-[56.25%]">
                  <img 
                    src={course.thumbnail} 
                    alt={course.title}
                    className="absolute h-full w-full object-cover"
                    loading="lazy"
                  />
                  <div className="absolute bottom-2 right-2 bg-green-500 text-white px-2 py-1 rounded-md text-xs md:text-sm">
                    Enrolled
                  </div>
                </div>
                <div className="p-3 md:p-4">
                  <h3 className="text-lg md:text-xl font-semibold mb-1 md:mb-2">{course.title}</h3>
                  <div className="flex justify-between items-center text-xs md:text-sm">
                    <span className="text-gray-600">{course.instructor}</span>
                    <span className="text-green-600 font-medium">Watch Now →</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default CoursesPage;