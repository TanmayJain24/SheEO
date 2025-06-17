import React from 'react'
import Posts from './Posts'

const Feed = () => {
  return (
    // <div className='flex-1 my-8 flex flex-col items-center pl-[20%]'>
    <div className='w-full px-4 sm:px-8 md:px-16 lg:px-32 my-8 flex flex-col items-center'>

        <Posts/>
    </div>
  )
}

export default Feed