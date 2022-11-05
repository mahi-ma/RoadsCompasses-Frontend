import logo from './logo.svg';
import './App.scss';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import { primaryColor } from './scss/theme';
import Header from './components/header';
import PostsView from "./components/postsView";
import axios from "axios";
import { useEffect, useState } from 'react';

function App() {
  const [categories,setCategories] = useState([]);
  const [posts,setPosts] = useState([]);
  const [openPost, setOpenPost] = useState(false);

  const getPosts = () => {
    axios.get(process.env.REACT_APP_BASE_URL + "/posts").then(res=>{
      setPosts(res.data);
    })
  }

  const handleCategoryClick = (catId) => {
    setOpenPost(false);
    if(catId==null){
      getPosts();
      return;
    }
    axios.get(process.env.REACT_APP_BASE_URL + "/posts?category_id=" + catId).then(res=>{
      setPosts(res.data);
    })
  }

  useEffect(()=>{
    getPosts();
    axios.get(process.env.REACT_APP_BASE_URL + "/categories").then(res=>{
      setCategories(res.data);
    })
  },[])

  return (
    <div className="App">
      <CssBaseline />
      <Container>
        <Box sx={{ bgcolor: primaryColor, height: '100vh' }}>
          <Header categories={categories} handleCategoryClick={handleCategoryClick} />
          <PostsView posts={posts} openPost={openPost} setOpenPost={setOpenPost} />
        </Box>
      </Container>
    </div>
  );
}

export default App;
