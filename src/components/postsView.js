import React, { useState } from "react";
import styled from "styled-components";
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import { darkBlue, darkGrey, primaryColor, secondaryColor } from "../scss/theme";
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import moment from "moment";

const PostsView = ({ posts, openPost, setOpenPost }) => {
    const [activePost, setActivePost] = useState({});

    const handlePostClick = (post) => {
        setActivePost(post);
        setOpenPost(true);
    }

    return (
        <PostViewContainer>
            {
                openPost ? <OpenPostContainer>
                    <BackContainer onClick={()=>setOpenPost(false)}>
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
                                                <Typography variant="h5" gutterBottom>
                                                    {post.title}
                                                </Typography>
                                                <Typography variant="h6" gutterBottom>
                                                    {post.subtitle}
                                                </Typography>
                                                <Typography variant="p" gutterBottom>
                                                    {post.body.length>50 ?  post.body.substr(0,50) + "..." : post.body}
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
        </PostViewContainer>
    )
}

const PostViewContainer = styled.section`
    cursor: pointer;
    padding: 40px;
    .postItem > div{
        padding: 20px;
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