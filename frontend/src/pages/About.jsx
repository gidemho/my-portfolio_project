import React from 'react';

const About = () => {
  return (
    <div className="container mx-auto mt-8 flex flex-col justify-center w-1/2">
      <h1 className="text-3xl font-bold mb-4">About Glory's Blog</h1>
      <p className="text-gray-200 leading-relaxed">
        Welcome to Glory's Blog, a place where ideas meet words. Our mission is to provide a platform
        for sharing insightful articles, thought-provoking stories, and engaging discussions on a wide
        range of topics—from technology trends to personal growth and beyond.
      </p>
      <p className="text-gray-200 leading-relaxed mt-4">
        Founded with a passion for knowledge and a commitment to community, Glory's Blog aims to inspire,
        inform, and connect individuals from all walks of life. Whether you're here to explore new ideas,
        share your own experiences, or simply connect with like-minded individuals, we're thrilled to have
        you join us on this journey.
      </p>
    </div>
  );
};

export default About;
