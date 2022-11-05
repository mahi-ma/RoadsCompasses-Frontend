import React from "react";
import styled from "styled-components";
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import { darkBlue } from "../scss/theme";

const PostsView = ({posts}) => {
    return(
        <PostViewContainer>
            <Grid container spacing={2}>
            {
                posts && posts.map((post,index)=>{
                    return(
                        <Grid className="postItem" key={index} item xs={8} md={6}>
                            <div className="post-content">
                                <Typography variant="h5" gutterBottom>
                                    {post.title}
                                </Typography>
                                <Typography variant="h6" gutterBottom>
                                    {post.subtitle}
                                </Typography>
                                <Typography variant="p" gutterBottom>
                                    {post.body}
                                </Typography>
                                <div className="tags">
                                {
                                    post.tag_ids.map((tag,innerIndex)=>{
                                        return(
                                            <TagPill key={index}>
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
        </PostViewContainer>
    )
}

const PostViewContainer = styled.section`
    padding: 40px;
    .postItem > div{
        padding: 20px;
    }
    .post-content{
        background: #fff;
        border-radius: 12px;
        text-align: left;
    }
    .tags{
        display: flex;
        align-items: center;
        justify-content: flex-start;
        margin: 20px 0 0;
        flex-wrap: wrap;
    }
`;

const  TagPill = styled.div`
    padding: 10px 12px;
    background:  ${darkBlue};
    color: #fff;
    border-radius: 8px;
    margin-right: 10px;
    margin-bottom: 5px;
    cursor: pointer;
`;

export default PostsView;