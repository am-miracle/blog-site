import moment from 'moment';
import Image from 'next/image';
import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import { getRecentPost, getSimilarPosts } from '../services';


const PostWidget = ({ categories, slug }) => {
  const [relatedPosts, setRelatedPosts] = useState([]);

  useEffect(() => {
    if(slug){
      getSimilarPosts(categories, slug)
       .then((result) => setRelatedPosts(result))
    }else{
      getRecentPost()
      .then((result)=> setRelatedPosts(result))
    }
  }, [slug]);

   console.log(relatedPosts);
   
  return (
      <div className='bg-white shadow-lg rounded-lg p-8 mb-8'>
          <h3 className="text-xl mb-8 font-semibold border-b pb-4">
            {slug ? 'Related Post': 'Recent Posts'}
          </h3>
          {relatedPosts.map((post)=>(
            <div className='flex items-center w-full mb-4' key={post.title}>
              <div className='w-16 flex-none'>
                <Image 
                  alt={post.title}
                  height='70px'
                  width='70px'
                  className='align-middle rounded-full'
                  src={post.featuredimage.url}
                />
              </div>
              <div className='flex-grow ml-4'>
                <p className="text-gray-500 font-xs">
                  {moment(post.createdAt).format('MMM DDD, YYYY')}
                </p>
                <Link href={`/post/${post.slug}`} key={post.title} className='text-md'>
                  {post.title}
                </Link>
              </div>
            </div>
          ))}
      </div>
  );
};

export default PostWidget;
