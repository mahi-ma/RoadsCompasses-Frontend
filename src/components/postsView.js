import React, { useState } from "react";
import styled from "styled-components";
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import { darkBlue, darkGrey, primaryColor, secondaryColor } from "../scss/theme";
import PostForm from "./postForm";
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import Button from '@mui/material/Button';
import moment from "moment";
import axios from "axios";

const headers = {
    'Authorization': process.env.REACT_APP_API_TOKEN,
};

const PostsView = ({ posts, openPost, setOpenPost, setPosts, setActiveCategory }) => {
    const [activePost, setActivePost] = useState({});
    const [dialogOpen, setDialogOpen] = useState(false);
    const [formStatus, setFormStatus] = useState("");
    const [formState,setFormState] = useState({});

    const handlePostClick = (post) => {
        setActivePost(post);
        setOpenPost(true);
    }

    const handleDialogOpen = () => {
        setFormStatus("new");
        setDialogOpen(true);
    }

    const closeDialog = () => {
        setDialogOpen(false);
        setFormStatus("");
    }

    const handlePostEdit = (e,postId) => {
        e.stopPropagation();
        axios.get(process.env.REACT_APP_BASE_URL + "/posts/" + postId).then(res=>{
            setFormState(res.data);
            setFormStatus("edit");
            setDialogOpen(true);
            setActiveCategory(null);
        })
    }

    const handlePostDelete = (e, postId) => {
        e.stopPropagation();
        axios.delete(process.env.REACT_APP_BASE_URL + "/posts/" + postId,{headers}).then(_ => {
            axios.get(process.env.REACT_APP_BASE_URL + "/posts").then(res => {
                setPosts(res.data);
                setActiveCategory(null);
            })
        })
    }

    return [
        <PostViewContainer>
            <div className="flex-end">
                <Button onClick={handleDialogOpen} className="create-new" variant="outlined">Create Post</Button>
            </div>
            {
                openPost ? <OpenPostContainer>
                    <BackContainer onClick={() => setOpenPost(false)}>
                        <ArrowBackIosNewIcon />
                        <span>Back</span>
                    </BackContainer>
                    <div className="post-content">
                        <div className="post-inner-content">
                            <Typography variant="h5" gutterBottom>
                                {activePost.title}
                            </Typography>
                            <Typography variant="h6" gutterBottom>
                                {activePost.subtitle}
                            </Typography>
                            <Typography variant="p" gutterBottom>
                                {activePost.body}
                            </Typography>
                            <Typography className="createdAt" variant="p" gutterBottom>
                                {"Updated on : " + moment(activePost.updated_at).format("MMM DD, YYYY")}
                            </Typography>
                            <Typography className="createdAt" variant="p" gutterBottom>
                                {"Authored by : " + activePost.author_name}
                            </Typography>
                        </div>
                        <div className="tags">
                            {
                                activePost.tag_ids.map((tag, innerIndex) => {
                                    return (
                                        <TagPill key={innerIndex}>
                                            {tag.name}
                                        </TagPill>
                                    )
                                })
                            }
                        </div>
                    </div>
                </OpenPostContainer> :
                    <Grid container spacing={2}>
                        {
                            posts && posts.map((post, index) => {
                                return (
                                    <Grid onClick={() => handlePostClick(post)} className="postItem" key={index} item xs={8} md={6}>
                                        <div className="post-content">
                                            <div className="post-inner-content">
                                                <div className="flex heading-bar">
                                                    <Typography variant="h5" gutterBottom>
                                                        {post.title}
                                                    </Typography>
                                                    <div className="edit-bar flex">
                                                        <img onClick={(e)=>handlePostEdit(e,post.id)} src="edit.png" alt="edit" />
                                                        <img src="bin.png" onClick={(e) => handlePostDelete(e, post.id)} alt="delete" />
                                                    </div>
                                                </div>
                                                <Typography variant="h6" gutterBottom>
                                                    {post.subtitle}
                                                </Typography>
                                                <Typography variant="p" gutterBottom>
                                                    {post.body.length > 50 ? post.body.substr(0, 50) + "..." : post.body}
                                                </Typography>
                                                <Typography className="createdAt" variant="p" gutterBottom>
                                                    {"Updated on : " + moment(post.updated_at).format("MMM DD, YYYY")}
                                                </Typography>
                                                <Typography className="createdAt" variant="p" gutterBottom>
                                                    {"Authored by : " + post.author_name}
                                                </Typography>
                                            </div>
                                            <div className="tags">
                                                {
                                                    post.tag_ids.map((tag, innerIndex) => {
                                                        return (
                                                            <TagPill key={innerIndex}>
                                                                {tag.name}
                                                            </TagPill>
                                                        )
                                                    })
                                                }
                                            </div>
                                        </div>
                                    </Grid>
                                )
                            })
                        }
                    </Grid>
            }
        </PostViewContainer>,
        <PostForm formState={formState} formStatus={formStatus} closeDialog={closeDialog} isOpen={dialogOpen} setPosts={setPosts} />
    ]
}

const PostViewContainer = styled.section`
    cursor: pointer;
    padding: 40px;
    .postItem > div{
        padding: 20px;
    }
    .create-new{
        margin-bottom: 20px;
    }
    .post-content{
        background: #fff;
        border-radius: 12px;
        text-align: left;
        height: 100%;
        display: flex;
        justify-content: space-between;
        flex-direction: column;
    }
    .tags{
        display: flex;
        align-items: center;
        justify-content: flex-start;
        margin: 20px 0 0;
        flex-wrap: wrap;
    }
    .createdAt{
        display: block;
        color: ${darkGrey};
        margin-top: 12px;
    }
    .postItem > div{
        &:hover{
            box-shadow: 6px 12px 22px ${secondaryColor};
        }
    }
    .edit-bar{
        img{
            width: 20px;
            height: auto;
            &:first-child{
                margin: 0 10px;
            }
        }
    }
    .heading-bar{
        align-items: flex-start;
    }
`;

const OpenPostContainer = styled.div`
   .post-content{
    padding: 20px;
   }
`;

const BackContainer = styled.div`
   display: flex;
   align-items: center;
   margin-bottom: 20px;
`;

const TagPill = styled.div`
    padding: 10px 12px;
    background:  ${darkBlue};
    color: #fff;
    border-radius: 8px;
    margin-right: 10px;
    margin-bottom: 5px;
`;

export default PostsView;