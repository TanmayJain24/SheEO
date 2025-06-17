// import React, { useState, useEffect } from 'react'
// import { Input } from './ui/input'
// import { Search } from 'lucide-react'
// import axios from 'axios'
// import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar'
// import { useSelector } from 'react-redux'
// import { Link } from 'react-router-dom'

// const SearchPage = () => {
//     const [searchQuery, setSearchQuery] = useState('')
//     const [searchResults, setSearchResults] = useState([])
//     const [isSearching, setIsSearching] = useState(false)
//     const { user } = useSelector(store => store.auth)

//     const handleSearch = async (e) => {
//         e.preventDefault()
//         if (!searchQuery.trim()) return

//         setIsSearching(true)
//         try {
//             const res = await axios.get(`http://localhost:8000/api/v1/post/search?query=${searchQuery}`, {
//                 withCredentials: true
//             })
//             setSearchResults(res.data.posts)
//         } catch (error) {
//             console.error('Search error:', error)
//         } finally {
//             setIsSearching(false)
//         }
//     }

//     return (
//         <div className="flex flex-col h-screen md:ml-[16%]">
//             {/* Mobile Header */}
//             <div className="md:hidden flex items-center justify-between px-4 py-3 border-b border-gray-200 sticky top-0 bg-white z-50">
//                 <h1 className="text-xl font-semibold">Search</h1>
//             </div>

//             {/* Search Bar */}
//             <div className="sticky top-0 md:top-0 bg-white z-40 px-4 py-3 border-b border-gray-200">
//                 <form onSubmit={handleSearch} className="relative">
//                     <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
//                     <Input
//                         type="text"
//                         placeholder="Search users..."
//                         className="pl-10 pr-4 py-2 w-full rounded-lg bg-gray-50 focus-visible:ring-0"
//                         value={searchQuery}
//                         onChange={(e) => setSearchQuery(e.target.value)}
//                     />
//                 </form>
//             </div>

//             {/* Search Results */}
//             <div className="flex-1 overflow-y-auto p-4">
//                 {isSearching ? (
//                     <div className="flex justify-center items-center h-40">
//                         <p>Searching...</p>
//                     </div>
//                 ) : searchResults.length > 0 ? (
//                     <div className="grid grid-cols-1 gap-6">
//                         {searchResults.map((post) => (
//                             <div key={post._id} className="border border-gray-200 rounded-lg overflow-hidden">
//                                 {/* Post Header */}
//                                 <div className="flex items-center p-3 border-b border-gray-200">
//                                     <Link to={`/profile/${post.userId}`}>
//                                         <Avatar className="h-8 w-8 mr-3">
//                                             <AvatarImage src={post.userProfilePicture} />
//                                             <AvatarFallback>U</AvatarFallback>
//                                         </Avatar>
//                                     </Link>
//                                     <Link to={`/profile/${post.userId}`} className="font-medium">
//                                         {post.username}
//                                     </Link>
//                                 </div>

//                                 {/* Post Image */}
//                                 <img 
//                                     src={post.image} 
//                                     alt="Post" 
//                                     className="w-full aspect-square object-cover"
//                                 />

//                                 {/* Post Caption */}
//                                 <div className="p-3">
//                                     <p className="text-sm">
//                                         <span className="font-medium mr-2">{post.username}</span>
//                                         {post.caption}
//                                     </p>
//                                 </div>
//                             </div>
//                         ))}
//                     </div>
//                 ) : searchQuery ? (
//                     <div className="flex flex-col items-center justify-center h-40">
//                         <p className="text-gray-500">No results found for "{searchQuery}"</p>
//                     </div>
//                 ) : (
//                     <div className="flex flex-col items-center justify-center h-40">
//                         <Search className="h-10 w-10 text-gray-300 mb-2" />
//                         <p className="text-gray-500">Search for users</p>
//                     </div>
//                 )}
//             </div>
//         </div>
//     )
// }

// export default SearchPage





// import React, { useState, useEffect } from 'react'
// import { Input } from './ui/input'
// import { Search } from 'lucide-react'
// import axios from 'axios'
// import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar'
// import { useSelector } from 'react-redux'
// import { Link } from 'react-router-dom'

// const SearchPage = () => {
//     const [searchQuery, setSearchQuery] = useState('')
//     const [searchResults, setSearchResults] = useState([])
//     const [isSearching, setIsSearching] = useState(false)
//     const { user } = useSelector(store => store.auth)

//     const handleSearch = async (e) => {
//         e.preventDefault()
//         if (!searchQuery.trim()) {
//             setSearchResults([])
//             return
//         }

//         setIsSearching(true)
//         try {
//             const res = await axios.get(`http://localhost:8000/api/v1/user/search?query=${searchQuery}`, {
//                 withCredentials: true
//             })
//             setSearchResults(res.data.users)
//         } catch (error) {
//             console.error('Search error:', error)
//         } finally {
//             setIsSearching(false)
//         }
//     }

//     // Optional: Add debounce to prevent rapid API calls
//     useEffect(() => {
//         const timer = setTimeout(() => {
//             if (searchQuery.trim()) {
//                 handleSearch({ preventDefault: () => {} })
//             }
//         }, 500)

//         return () => clearTimeout(timer)
//     }, [searchQuery])

//     return (
//         <div className="flex flex-col h-screen md:ml-[16%]">
//             {/* Mobile Header */}
//             <div className="md:hidden flex items-center justify-between px-4 py-3 border-b border-gray-200 sticky top-0 bg-white z-50">
//                 <h1 className="text-xl font-semibold">Search</h1>
//             </div>

//             {/* Search Bar */}
//             <div className="sticky top-0 md:top-0 bg-white z-40 px-4 py-3 border-b border-gray-200">
//                 <form onSubmit={handleSearch} className="relative">
//                     <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
//                     <Input
//                         type="text"
//                         placeholder="Search users..."
//                         className="pl-10 pr-4 py-2 w-full rounded-lg bg-gray-50 focus-visible:ring-0"
//                         value={searchQuery}
//                         onChange={(e) => setSearchQuery(e.target.value)}
//                         autoFocus
//                     />
//                 </form>
//             </div>

//             {/* Search Results */}
//             <div className="flex-1 overflow-y-auto p-4">
//                 {isSearching ? (
//                     <div className="flex justify-center items-center h-40">
//                         <p>Searching...</p>
//                     </div>
//                 ) : searchResults.length > 0 ? (
//                     <div className="grid grid-cols-1 gap-4">
//                         {searchResults.map((user) => (
//                             <Link 
//                                 to={`/profile/${user._id}`} 
//                                 key={user._id}
//                                 className="flex items-center p-3 hover:bg-gray-50 rounded-lg transition-colors"
//                             >
//                                 <Avatar className="h-12 w-12 mr-4">
//                                     <AvatarImage src={user.profilePicture} />
//                                     <AvatarFallback>
//                                         {user.username?.charAt(0).toUpperCase()}
//                                     </AvatarFallback>
//                                 </Avatar>
//                                 <div>
//                                     <p className="font-medium">{user.username}</p>
//                                     <p className="text-sm text-gray-500">{user.fullName || user.username}</p>
//                                 </div>
//                             </Link>
//                         ))}
//                     </div>
//                 ) : searchQuery ? (
//                     <div className="flex flex-col items-center justify-center h-40">
//                         <p className="text-gray-500">No users found for "{searchQuery}"</p>
//                     </div>
//                 ) : (
//                     <div className="flex flex-col items-center justify-center h-40">
//                         <Search className="h-10 w-10 text-gray-300 mb-2" />
//                         <p className="text-gray-500">Search for users by username or name</p>
//                     </div>
//                 )}
//             </div>
//         </div>
//     )
// }

// export default SearchPage




import React, { useState, useEffect } from 'react'
import { Input } from './ui/input'
import { Search } from 'lucide-react'
import axios from 'axios'
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'

const SearchPage = () => {
    const [searchQuery, setSearchQuery] = useState('')
    const [searchResults, setSearchResults] = useState([])
    const [isSearching, setIsSearching] = useState(false)
    const { user } = useSelector(store => store.auth)

    const handleSearch = async (e) => {
        e.preventDefault()
        if (!searchQuery.trim()) {
            setSearchResults([])
            return
        }

        setIsSearching(true)
        try {
            const res = await axios.get(`http://localhost:8000/api/v1/user/search?query=${searchQuery}`, {
                withCredentials: true
            })
            setSearchResults(res.data.users)
        } catch (error) {
            console.error('Search error:', error)
        } finally {
            setIsSearching(false)
        }
    }

    // Debounce search
    useEffect(() => {
        const timer = setTimeout(() => {
            if (searchQuery.trim()) {
                handleSearch({ preventDefault: () => {} })
            }
        }, 500)

        return () => clearTimeout(timer)
    }, [searchQuery])

    return (
        <div className="flex flex-col h-screen md:ml-[16%]">
            {/* Mobile Header */}
            <div className="md:hidden flex items-center justify-between px-4 py-3 border-b border-gray-200 sticky top-0 bg-white z-50">
                <h1 className="text-xl font-semibold">Search</h1>
            </div>

            {/* Search Bar */}
            <div className="sticky top-0 md:top-0 bg-white z-40 px-4 py-3 border-b border-gray-200">
                <form onSubmit={handleSearch} className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                    <Input
                        type="text"
                        placeholder="Search users..."
                        className="pl-10 pr-4 py-2 w-full rounded-lg bg-gray-50 focus-visible:ring-0"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        autoFocus
                    />
                </form>
            </div>

            {/* Search Results */}
            <div className="flex-1 overflow-y-auto p-4">
                {isSearching ? (
                    <div className="flex justify-center items-center h-40">
                        <p>Searching...</p>
                    </div>
                ) : searchResults.length > 0 ? (
                    <div className="grid grid-cols-1 gap-4">
                        {searchResults.map((user) => (
                            <Link 
                                to={`/profile/${user._id}`} 
                                key={user._id}
                                className="flex items-center p-3 hover:bg-gray-50 rounded-lg transition-colors"
                            >
                                <Avatar className="h-12 w-12 mr-4">
                                    <AvatarImage src={user.profilePicture} />
                                    <AvatarFallback>
                                        {user.username?.charAt(0).toUpperCase()}
                                    </AvatarFallback>
                                </Avatar>
                                <div className="flex-1">
                                    <p className="font-medium">{user.username}</p>
                                    <p className="text-sm text-gray-500">
                                        {user.fullName || user.username}
                                    </p>
                                </div>
                                <div className="text-sm text-gray-500">
                                    {user.followers?.length || 0} followers
                                </div>
                            </Link>
                        ))}
                    </div>
                ) : searchQuery ? (
                    <div className="flex flex-col items-center justify-center h-40">
                        <p className="text-gray-500">No users found for "{searchQuery}"</p>
                    </div>
                ) : (
                    <div className="flex flex-col items-center justify-center h-40">
                        <Search className="h-10 w-10 text-gray-300 mb-2" />
                        <p className="text-gray-500">Search for users by username or name</p>
                    </div>
                )}
            </div>
        </div>
    )
}

export default SearchPage