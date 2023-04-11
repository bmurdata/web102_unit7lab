import React from 'react';
import { useParams } from 'react-router-dom';
import { useState,useEffect } from 'react';
import './EditPost.css'
import { supabase } from '../client'

const EditPost = ({data}) => {

    const {id} = useParams();
    const post = data.filter(item => item.id === id)[0];
    console.log(data)
    const [posts, setPost] = useState([]);

    useEffect(() => {
        const fetchData= async () =>{
            const {data} = await supabase
            .from('Posts')
            .select()
            .eq('id',id);
            // set state of posts
            setPost(data);
        }
        
        fetchData().catch(console.error());
        setPost(data);
    }, [data]);
    // UPDATE post
    const updatePost = async (event) => {
    event.preventDefault();

    await supabase
    .from('Posts')
    .update({ title: post.title, author: post.author,  description: post.description})
    .eq('id', id);


    window.location = "/";
}


    return (
        <div>
            <form>
                <label for="title">Title</label> <br />
                <input type="text" id="title" name="title" value={post.title} /><br />
                <br/>

                <label for="author">Author</label><br />
                <input type="text" id="author" name="author" value={post.author} /><br />
                <br/>

                <label for="description">Description</label><br />
                <textarea rows="5" cols="50" id="description" value={post.description} >
                </textarea>
                <br/>
                <input type="submit" value="Submit" />
                <button className="deleteButton">Delete</button>
            </form>
        </div>
    )
}

export default EditPost