import React from 'react';
import './CreatePost.css'

import { supabase } from '../client'
import { useEffect,useState } from 'react';

console.log("About to run Post")
const CreatePost = ()=> {
    const [post, setPost] = useState({title: "", author: "", description: ""})
    console.log("Running Post")
    const createPost = async (event) => {
        event.preventDefault();
       await supabase
        .from('Posts')
        .insert({title: post.title, author: post.author, description: post.description})
        .select();
    
        window.location = "/";
    }
    const handleChange = (event) => {
        const {name, value} = event.target;
        setPost( (prev) => {
            return {
                ...prev,
                [name]:value,
            }
        })
    }
    return (
        <div>
            <form >
                <label for="title">Title</label> <br />
                <input onChange={handleChange} value={post.title} type="text" id="title" name="title" /><br />
                <br/>

                <label for="author">Author</label><br />
                <input onChange={handleChange} value={post.author} type="text" id="author" name="author" /><br />
                <br/>

                <label for="description">Description</label><br />
                <textarea onChange={handleChange} value={post.description} rows="5" cols="50" id="description" name="description">
                </textarea>
                <br/>
                <input onClick={createPost} type="submit" value="Submit" />
            </form>
        </div>
    )
}

export default CreatePost