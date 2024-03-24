"use client"
import { scrapeAndStoreProduct } from '@/lib/actions';
import React, { FormEvent } from 'react'
import { useState } from "react"

const isVaalidAmazonProductURL = (url: string)=> {
  try{
  const parsedURL = new URL(url);
  const hostname = parsedURL.hostname;

  if(hostname.includes('amazon.com') ||
  hostname.includes('amazon.') || 
  hostname.endsWith('amazon')
  ) {
    return true;
}
  }
catch (error) {
  return false;
  }
  return false;
}


const Searchbar = () => {
  const [searchPrompt, setSearchPrompt] = useState('');
  const [isLoading, setIsloading] = useState(false);
  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const isValidLink = isVaalidAmazonProductURL(searchPrompt);
    if (!isValidLink) return alert('Please enter a valid Amazon link to search')

    try {
      setIsloading(true);
      //scraper 
      const product = await scrapeAndStoreProduct(searchPrompt);


    }
    catch (error) {
      console.log(error);

    }
    finally{
      setIsloading(false);
    }
  
  
  
  }
  return (
    <form className='flex flex-wrap gap-4 mt-12'
    onSubmit={handleSubmit}>
      <input 
      type='text' 
      value = {searchPrompt}
      onChange={(e) => setSearchPrompt(e.target.value)}
      placeholder='Enter product link to search'
      className='searchbar-input'
      />
      <button type = "submit" className='serchbar-btn'
      disabled={searchPrompt ===''}
      >
        {isLoading ? 'Searching...': 'Search'}
      </button>

    </form>
  )
}


export default Searchbar