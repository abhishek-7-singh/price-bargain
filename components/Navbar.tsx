import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
// import Search from '/assets/icons/search.svg'
// import Heart from '/assets/icons/black-heart.svg'
// import User from '/assets/icons/user.svg'
const navIcons = [
  {src:'/assets/icons/search.svg',alt: 'search'},
  {src:'/assets/icons/black-heart.svg',alt: 'heart'},
  {src:'/assets/icons/user.svg',alt: 'user'},
]
const Navbar = () => {
  return (
    <header className="w-full">
        <nav className='nav'>
            <Link href = "/" className='flex items-center gap-1'>
                <Image 
                src = "/assets/icons/logo.svg"
                width = {27}
                height = {27}
                alt = "logo"
                />
                <p className='nav-logo'>
                  Bargain<span className='text-primary'>Buddy</span>
                </p>
            </Link>
            {/* <Link href = "/" className='flex items-center gap-1'> */}
                {/* <Image 
                src = "/assets/icons/logo.svg"
                width = {27}
                height = {27}
                alt = "logo"
                />
                <p className='nav-logo'>
                  Bargain<span className='text-primary'>Buddy</span>
                </p> */}
                {/* {
                navIcons.map((icon) => (
                  <Image
                  key={icon.alt}
                  src = {icon.src}
                  alt = {icon.alt}
                  width={28}
                  height={28}
                  className='object-contain'
                  />

                ))
              } */}
              {/* <Image
                  key="search"
                  src = '/assets/icons/search.svg'
                  alt = "search"
                  width={28}
                  height={28}
                  className='object-contain'
                  />
              <Image
                  key="heart"
                  src = '/assets/icons/black-heart.svg'
                  alt = "heart"
                  width={28}
                  height={28}
                  className='object-contain'
                  />
              <Image
                  key="user"
                  src = '/assets/icons/user.svg'
                  alt = "user"
                  width={28}
                  height={28}
                  className='object-contain'
                  />
            </Link> */}
            <div className='flex items-center gap-5'>
            <Image
                  key="search"
                  src = '/assets/icons/search.svg'
                  alt = "search"
                  width={28}
                  height={28}
                  className='object-contain'
                  />
              <Image
                  key="heart"
                  src = '/assets/icons/black-heart.svg'
                  alt = "heart"
                  width={28}
                  height={28}
                  className='object-contain'
                  />
              <Link href = "/profile" className='flex items-center gap-1'>
              <Image
                  key="user"
                  src = '/assets/icons/user.svg'
                  alt = "user"
                  width={28}
                  height={28}
                  className='object-contain'
                  />
              </Link>

            </div>
            {/* <div className='flex items-center gap-5'>
              {
                navIcons.map((icon) => (
                  <Image
                  key={icon.alt}
                  src = {icon.src}
                  alt = {icon.alt}
                  width={28}
                  height={28}
                  className='object-contain'
                  />

                ))
              }

            </div> */}

        </nav>
    </header>
  )
}

export default Navbar