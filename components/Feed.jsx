'use client';
import { useState, useEffect } from 'react';

import PromptCard from './PromptCard';

const PromptCardList = ({ data, handleTagClick }) => {
  return (
    <div className="mt-16 prompt_layout">
      {data?.map((post) => (
        <PromptCard
          key={post._id}
          post={post}
          handleTagClick={handleTagClick}
        />
      ))}
    </div>
  );
};

const Feed = () => {
  const [searchText, setSearchText] = useState('');
  const [posts, setPosts] = useState([]);
  const [filteredPosts, setfilteredPosts] = useState([]);

  const fetchPosts = async () => {
    const response = await fetch('/api/prompt');
    const data = await response.json();
    setfilteredPosts(data);
    setPosts(data);
  };
  // Using Back-end
  const fetchSearchPosts = async (searchText) => {
    const response = await fetch(`/api/search/${searchText}`);
    const data = await response.json();
    console.log(data);
    setfilteredPosts(data);
  };

  const handleSearchChange = (e) => {
    // Learn JavaScript Nuggets !!!!
    setSearchText(e.target.value);
  };
  useEffect(() => {
    // Learn JavaScript Nuggets !!!!
    const filteredPosts = posts.filter(
      (p) =>
        p.prompt.toLowerCase().includes(searchText.toLowerCase()) ||
        p.tag.toLowerCase().includes(searchText.toLowerCase()) ||
        p.creator?.username.toLowerCase().includes(searchText.toLowerCase())
    );
    setfilteredPosts(filteredPosts);
  }, [posts, searchText]);

  const handleTagClick = (tag) => {
    scrollTo({
      top: 350,
      left: 0,
      behavior: 'smooth',
    });
    // setfilteredPosts(posts.filter((p) => p.tag.toLowerCase().includes(tag)));
    setSearchText(tag);
  };
  useEffect(() => {
    fetchPosts();
  }, []);

  return (
    <section className="feed">
      <form className="relative w-full flex-center">
        <input
          type="text"
          placeholder="Search for a tag or a username..."
          value={searchText}
          onChange={handleSearchChange}
          required
          className="search_input peer"
        />
      </form>
      <PromptCardList data={filteredPosts} handleTagClick={handleTagClick} />
    </section>
  );
};

export default Feed;
