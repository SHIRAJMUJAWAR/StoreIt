import React from 'react'
import { Button } from './ui/button'
import Search from './Search'
import FileUploader from './FileUploader'

const Header = () => {
  return (
 <header className='header'>
   <Search></Search>
   <div className='header-wrapper'>
    <FileUploader></FileUploader>

    <form >
      <Button type='submit' className='sign-out-button'>
         <img src="/assets/icons/logout.svg" alt="logo" width={24} height={24}  className='w-6'/>
      </Button>
    </form>
   </div>
 </header>
  )
}

export default Header
