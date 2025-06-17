// import React, { useEffect, useState } from 'react'
// import { Input } from './ui/input'
// import { Button } from './ui/button'
// import axios from 'axios';
// import { toast } from 'sonner';
// import { Link, useNavigate } from 'react-router-dom';
// import { Loader2 } from 'lucide-react';
// import { useSelector } from 'react-redux';

// const Signup = () => {
//     const [input, setInput] = useState({
//         username: "",
//         email: "",
//         password: ""
//     });
//     const [loading, setLoading] = useState(false);
//     const {user} = useSelector(store=>store.auth);
//     const navigate = useNavigate();

//     const changeEventHandler = (e) => {
//         setInput({ ...input, [e.target.name]: e.target.value });
//     }

//     const signupHandler = async (e) => {
//         e.preventDefault();
//         try {
//             setLoading(true);
//             // const res = await axios.post('https://instaclone-g9h5.onrender.com/api/v1/user/register', input, {
//                 const res = await axios.post('http://localhost:8000/api/v1/user/register', input, {   
//             headers: {
//                     'Content-Type': 'application/json'
//                 },
//                 withCredentials: true
//             });
//             if (res.data.success) {
//                 navigate("/login");
//                 toast.success(res.data.message);
//                 setInput({
//                     username: "",
//                     email: "",
//                     password: ""
//                 });
//             }
//         } catch (error) {
//             console.log(error);
//             toast.error(error.response.data.message);
//         } finally {
//             setLoading(false);
//         }
//     }

//     useEffect(()=>{
//         if(user){
//             navigate("/");
//         }
//     },[])
//     return (
//         <div className='flex items-center w-screen h-screen justify-center'>
//             <form onSubmit={signupHandler} className='shadow-lg flex flex-col gap-5 p-8'>
//                 <div className='my-4'>
//                     <h1 className='text-center font-bold text-xl'>SheEO</h1>
//                     <p className='text-sm text-center'>Signup to see photos & videos from your friends</p>
//                 </div>
//                 <div>
//                     <span className='font-medium'>Username</span>
//                     <Input
//                         type="text"
//                         name="username"
//                         value={input.username}
//                         onChange={changeEventHandler}
//                         className="focus-visible:ring-transparent my-2"
//                     />
//                 </div>
//                 <div>
//                     <span className='font-medium'>Email</span>
//                     <Input
//                         type="email"
//                         name="email"
//                         value={input.email}
//                         onChange={changeEventHandler}
//                         className="focus-visible:ring-transparent my-2"
//                     />
//                 </div>
//                 <div>
//                     <span className='font-medium'>Password</span>
//                     <Input
//                         type="password"
//                         name="password"
//                         value={input.password}
//                         onChange={changeEventHandler}
//                         className="focus-visible:ring-transparent my-2"
//                     />
//                 </div>
//                 {
//                     loading ? (
//                         <Button>
//                             <Loader2 className='mr-2 h-4 w-4 animate-spin' />
//                             Please wait
//                         </Button>
//                     ) : (
//                         <Button type='submit'>Signup</Button>
//                     )
//                 }
//                 <span className='text-center'>Already have an account? <Link to="/login" className='text-blue-600'>Login</Link></span>
//             </form>
//         </div>
//     )
// }

// export default Signup









// import React, { useEffect, useState } from 'react'
// import { Input } from './ui/input'
// import { Button } from './ui/button'
// import axios from 'axios';
// import { toast } from 'sonner';
// import { Link, useNavigate } from 'react-router-dom';
// import { Loader2 } from 'lucide-react';
// import { useSelector } from 'react-redux';

// // List of available domains
// // const availableDomains = [
// //     "Technology",
// //     "Business",
// //     "Science",
// //     "Health",
// //     "Sports",
// //     "Entertainment",
// //     "Art",
// //     "Education",
// //     "Food",
// //     "Travel"
// // ];

// const availableDomains = [
//     "Health & Wellness",
//     "Education & EdTech",
//     "FinTech (Finance & Technology)",
//     "E-commerce & Retail",
//     "Food & Beverages",
//     "Fashion & Apparel",
//     "Technology",
//     "Travel & Tourism",
//     "Real Estate & Construction",
//     "Beauty & Personal Care",
//     "Arts & Crafts",
//     "Media & Entertainment",
//     "Agriculture & AgriTech",
//     "Parenting & Childcare",
//     "Cybersecurity",
//     "Gaming & Esports",
//     "AI/ML & Data Science",
//     "Blockchain",
//     "Automobile",
//     "Pets & Animal Care"
//   ];
  


// const Signup = () => {
//     const [input, setInput] = useState({
//         username: "",
//         email: "",
//         password: "",
//         domains: [] // Add domains to state
//     });
//     const [loading, setLoading] = useState(false);
//     const {user} = useSelector(store=>store.auth);
//     const navigate = useNavigate();

//     const changeEventHandler = (e) => {
//         setInput({ ...input, [e.target.name]: e.target.value });
//     }

//     // Handle domain selection
//     const handleDomainSelect = (domain) => {
//         setInput(prev => {
//             if (prev.domains.includes(domain)) {
//                 return {
//                     ...prev,
//                     domains: prev.domains.filter(d => d !== domain)
//                 };
//             } else {
//                 return {
//                     ...prev,
//                     domains: [...prev.domains, domain]
//                 };
//             }
//         });
//     }

//     const signupHandler = async (e) => {
//         e.preventDefault();
//         try {
//             if (input.domains.length === 0) {
//                 toast.error("Please select at least one domain");
//                 return;
//             }
            
//             setLoading(true);
//             const res = await axios.post('http://localhost:8000/api/v1/user/register', input, {   
//                 headers: {
//                     'Content-Type': 'application/json'
//                 },
//                 withCredentials: true
//             });
            
//             if (res.data.success) {
//                 navigate("/login");
//                 toast.success(res.data.message);
//                 setInput({
//                     username: "",
//                     email: "",
//                     password: "",
//                     domains: []
//                 });
//             }
//         } catch (error) {
//             console.log(error);
//             toast.error(error.response?.data?.message || "An error occurred");
//         } finally {
//             setLoading(false);
//         }
//     }

//     useEffect(()=>{
//         if(user){
//             navigate("/");
//         }
//     }, [user, navigate]);

//     return (
//         <div className='flex items-center w-screen h-screen justify-center'>
//             <form onSubmit={signupHandler} className='shadow-lg flex flex-col gap-5 p-8'>
//                 <div className='my-4'>
//                     <h1 className='text-center font-bold text-xl'>SheEO</h1>
//                     <p className='text-sm text-center'>Signup to see photos & videos from your friends</p>
//                 </div>
                
//                 <div>
//                     <span className='font-medium'>Username</span>
//                     <Input
//                         type="text"
//                         name="username"
//                         value={input.username}
//                         onChange={changeEventHandler}
//                         className="focus-visible:ring-transparent my-2"
//                         required
//                     />
//                 </div>
                
//                 <div>
//                     <span className='font-medium'>Email</span>
//                     <Input
//                         type="email"
//                         name="email"
//                         value={input.email}
//                         onChange={changeEventHandler}
//                         className="focus-visible:ring-transparent my-2"
//                         required
//                     />
//                 </div>
                
//                 <div>
//                     <span className='font-medium'>Password</span>
//                     <Input
//                         type="password"
//                         name="password"
//                         value={input.password}
//                         onChange={changeEventHandler}
//                         className="focus-visible:ring-transparent my-2"
//                         required
//                     />
//                 </div>
                
//                 <div>
//                     <span className='font-medium'>Select Domains (Select at least one)</span>
//                     <div className="grid grid-cols-2 gap-2 mt-2">
//                         {availableDomains.map(domain => (
//                             <div key={domain} className="flex items-center">
//                                 <input
//                                     type="checkbox"
//                                     id={domain}
//                                     checked={input.domains.includes(domain)}
//                                     onChange={() => handleDomainSelect(domain)}
//                                     className="mr-2"
//                                 />
//                                 <label htmlFor={domain}>{domain}</label>
//                             </div>
//                         ))}
//                     </div>
//                 </div>
                
//                 {loading ? (
//                     <Button>
//                         <Loader2 className='mr-2 h-4 w-4 animate-spin' />
//                         Please wait
//                     </Button>
//                 ) : (
//                     <Button type='submit'>Signup</Button>
//                 )}
                
//                 <span className='text-center'>Already have an account? <Link to="/login" className='text-blue-600'>Login</Link></span>
//             </form>
//         </div>
//     )
// }

// export default Signup










import React, { useEffect, useState } from 'react'
import { Input } from './ui/input'
import { Button } from './ui/button'
import axios from 'axios';
import { toast } from 'sonner';
import { Link, useNavigate } from 'react-router-dom';
import { Loader2 } from 'lucide-react';
import { useSelector } from 'react-redux';

// List of available domains
const availableDomains = [
    // "Health & Wellness",
    // "Education & EdTech",
    // "FinTech (Finance & Technology)",
    // "E-commerce & Retail",
    // "Food & Beverages",
    // "Fashion & Apparel",
    // "Technology",
    // "Travel & Tourism",
    // "Real Estate & Construction",
    // "Beauty & Personal Care",
    // "Arts & Crafts",
    // "Media & Entertainment",
    // "Agriculture & AgriTech",
    // "Parenting & Childcare",
    // "Cybersecurity",
    // "Gaming & Esports",
    // "AI/ML & Data Science",
    // "Blockchain",
    // "Automobile",
    // "Pets & Animal Care"



    "Health",
    "Education",
    "E-commerce",
    "Food",
    "Fashion",
    "Technology",
    "Travel",
    "Beauty",
    "Agriculture",
    "Animal"
  ]
  
const Signup = () => {
    const [input, setInput] = useState({
        username: "",
        email: "",
        password: "",
        role: "", // Add role to state
        domains: []
    });
    const [loading, setLoading] = useState(false);
    const {user} = useSelector(store=>store.auth);
    const navigate = useNavigate();

    const changeEventHandler = (e) => {
        setInput({ ...input, [e.target.name]: e.target.value });
    }

    // Handle domain selection
    const handleDomainSelect = (domain) => {
        setInput(prev => {
            if (prev.domains.includes(domain)) {
                return {
                    ...prev,
                    domains: prev.domains.filter(d => d !== domain)
                };
            } else {
                return {
                    ...prev,
                    domains: [...prev.domains, domain]
                };
            }
        });
    }

    const signupHandler = async (e) => {
        e.preventDefault();
        try {
            if (!input.role) {
                toast.error("Please select your role");
                return;
            }
            if (input.domains.length === 0) {
                toast.error("Please select at least one domain");
                return;
            }
            
            setLoading(true);
            const res = await axios.post('http://localhost:8000/api/v1/user/register', input, {   
                headers: {
                    'Content-Type': 'application/json'
                },
                withCredentials: true
            });
            
            if (res.data.success) {
                navigate("/login");
                toast.success(res.data.message);
                setInput({
                    username: "",
                    email: "",
                    password: "",
                    role: "",
                    domains: []
                });
            }
        } catch (error) {
            console.log(error);
            toast.error(error.response?.data?.message || "An error occurred");
        } finally {
            setLoading(false);
        }
    }

    useEffect(()=>{
        if(user){
            navigate("/");
        }
    }, [user, navigate]);

    return (
        <div className='flex items-center w-screen  justify-center'>
            <form onSubmit={signupHandler} className='shadow-lg flex flex-col gap-5 p-8 w-full max-w-md'>
                <div className='my-4'>
                    <h1 className='text-center font-bold text-xl'>SheEO</h1>
                    <p className='text-sm text-center'>Signup to see photos & videos from your friends</p>
                </div>
                
                <div>
                    <span className='font-medium'>Username</span>
                    <Input
                        type="text"
                        name="username"
                        value={input.username}
                        onChange={changeEventHandler}
                        className="focus-visible:ring-transparent my-2"
                        required
                    />
                </div>
                
                <div>
                    <span className='font-medium'>Email</span>
                    <Input
                        type="email"
                        name="email"
                        value={input.email}
                        onChange={changeEventHandler}
                        className="focus-visible:ring-transparent my-2"
                        required
                    />
                </div>
                
                <div>
                    <span className='font-medium'>Password</span>
                    <Input
                        type="password"
                        name="password"
                        value={input.password}
                        onChange={changeEventHandler}
                        className="focus-visible:ring-transparent my-2"
                        required
                    />
                </div>
                
                {/* Add Role Dropdown */}
                <div>
                    <span className='font-medium'>Role</span>
                    <select
                        name="role"
                        value={input.role}
                        onChange={changeEventHandler}
                        className="w-full p-2 border rounded-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 mt-2"
                        required
                    >
                        <option value="">Select your role</option>
                        <option value="entrepreneur">Entrepreneur</option>
                        <option value="investor">Investor</option>
                    </select>
                </div>
                
                <div>
                    <span className='font-medium'>Select Domains (Select at least one)</span>
                    <div className="grid grid-cols-2 gap-2 mt-2">
                        {availableDomains.map(domain => (
                            <button
                                key={domain}
                                type="button"
                                onClick={() => handleDomainSelect(domain)}
                                className={`p-2 rounded-md border text-sm ${input.domains.includes(domain) 
                                    ? 'bg-blue-500 text-white border-blue-500' 
                                    : 'bg-white text-gray-800 border-gray-300'}`}
                            >
                                {domain}
                            </button>
                        ))}
                    </div>
                </div>
                
                {loading ? (
                    <Button>
                        <Loader2 className='mr-2 h-4 w-4 animate-spin' />
                        Please wait
                    </Button>
                ) : (
                    <Button type='submit'>Signup</Button>
                )}
                
                <span className='text-center'>Already have an account? <Link to="/login" className='text-blue-600'>Login</Link></span>
            </form>
        </div>
    )
}

export default Signup