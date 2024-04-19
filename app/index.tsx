// pages/index.tsx
import React from 'react';
import { useRouter } from 'next/router';

const IndexPage = () => {
  const router = useRouter();

  const handleLoginRedirect = () => {
    router.push('/login');
  };

  return (
    <div className="flex justify-center items-center h-screen">
      <button
        onClick={handleLoginRedirect}
        className="px-4 py-2 bg-blue-500 text-white rounded"
      >
    
      </button>
    </div>
  );
};

export default IndexPage;
