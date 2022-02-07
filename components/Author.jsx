import Image from 'next/image';
import React from 'react';

const Author = ({ author }) => {
  return (
      <div className='text-center mt-20 mb-8 p-12 relative rounded-lg bg-black'>
        <Image 
          alt={author.name}
          height='100px'
          width='100px'
          className='alignn-middle rounded-full'
          src={author.photo.url}
        />
      </div>
  );
};

export default Author;
