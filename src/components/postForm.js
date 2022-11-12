import React, { useEffect, useState } from "react";
import styled from "styled-components";
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import Select from '@mui/material/Select';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import DialogTitle from '@mui/material/DialogTitle';
import axios from "axios";

const startState = {
    title: "",
    subtitle: "",
    body: "",
    category_id: "",
    author_id: 1,
    tag_ids: []
}

const PostForm = ({ isOpen, formState, closeDialog, formStatus, setPosts }) => {
    const [open, setOpen] = useState(false);
    const [categories, setCategories] = useState([]);
    const [initialState, setInitialState] = useState({ ...startState })

    const handleClose = () => {
        setOpen(false);
        closeDialog();
    };

    const handleFormSubmit = () => {
        if(formStatus==="new"){
            axios.request({
                method: 'POST',
                url: process.env.REACT_APP_BASE_URL + "/posts",
                headers: {
                    'Authorization': process.env.REACT_APP_API_TOKEN,
                    'content-type': 'application/json'
                },
                body: {
                  ...initialState
                },
              
              }).then(res => {
                console.log("created successfully");
                axios.get(process.env.REACT_APP_BASE_URL + "/posts").then(res => {
                    setPosts(res.data);
                    handleClose();
                })
            })
        }
        else{
            axios.put(process.env.REACT_APP_BASE_URL + "/posts/" + formState.id, JSON.stringify(initialState), {
                headers: {
                    'Authorization': process.env.REACT_APP_API_TOKEN,
                    'content-type': 'application/json'
                },
                data: initialState,
                body: initialState
            }).then(res => {
                console.log("updated successfully");
                axios.get(process.env.REACT_APP_BASE_URL + "/posts").then(res => {
                    setPosts(res.data);
                    handleClose();
                })
            })
        }
    }

    const handleChange = (key, val) => {
        const values = { ...initialState };
        values[key] = val;
        setInitialState(values);
    }

    useEffect(() => {
        axios.get(process.env.REACT_APP_BASE_URL + "/categories").then(res => {
            setCategories(res.data);
        })
    }, [])

    useEffect(() => {
        if (formStatus === "edit" && Object.keys(formState).length > 0) {
            const values = { ...initialState };
            Object.keys(formState).map((key) => {
                values[key] = formState[key]
            })
            setInitialState(values);
        }
    }, [formStatus])

    useEffect(() => {
        if (isOpen) {
            setOpen(true);
            if (formStatus === "new") {
                setInitialState({ ...startState })
            }
        }
    }, [isOpen])

    return (
        <PostFormContainer>
            <Dialog open={open} onClose={handleClose}>
                <DialogTitle>{formStatus === "new" ? "Create New Post" : "Update Post"}</DialogTitle>
                <DialogContent>
                    <TextField
                        autoFocus
                        margin="dense"
                        value={initialState.title}
                        onChange={(e) => handleChange("title", e.target.value)}
                        id="title"
                        label="Post title"
                        fullWidth
                        variant="standard"
                    />
                    <TextField
                        autoFocus
                        margin="dense"
                        value={initialState.subtitle}
                        onChange={(e) => handleChange("subtitle", e.target.value)}
                        id="subtitle"
                        label="Post Subtitle"
                        fullWidth
                        variant="standard"
                    />
                    <TextField
                        autoFocus
                        margin="dense"
                        value={initialState.body}
                        onChange={(e) => handleChange("body", e.target.value)}
                        id="body"
                        label="Post body"
                        fullWidth
                        variant="standard"
                    />
                    <FormControl variant="standard" sx={{ m: 1, minWidth: 120 }}>
                        <InputLabel id="demo-simple-select-standard-label">Category</InputLabel>
                        <Select
                            labelId="demo-simple-select-standard-label"
                            id="demo-simple-select-standard"
                            value={initialState.category_id}
                            onChange={(e) => handleChange("category_id", e.target.value)}
                            label="Category"
                        >
                            <MenuItem value="">
                                <em>None</em>
                            </MenuItem>
                            {
                                categories.map((category, index) => {
                                    return <MenuItem key={index} value={category.id}>{category.name}</MenuItem>
                                })
                            }
                        </Select>
                    </FormControl>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>Cancel</Button>
                    <Button onClick={handleFormSubmit}>Submit</Button>
                </DialogActions>
            </Dialog>
        </PostFormContainer>
    )
}

const PostFormContainer = styled.section`

`;

export default PostForm;