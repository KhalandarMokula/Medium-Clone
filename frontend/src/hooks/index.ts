import axios from "axios";
import { useEffect, useState } from "react"
import { BACKEND_URL } from "../config";

type user = {
    name :string,
}
export interface BlogPostStruct {
    content: string,
    title : string,
    id : string,
    user : user,
    
}
export const useBlog = ({id}: {id:string}) => {
    const [loading , setLoading] = useState(true);
    const [blog, setBlog] = useState<BlogPostStruct | null>(null);
    console.log("useBlog id: ", id);
    useEffect(()=> {
        axios.get(`${BACKEND_URL}/api/v1/blog/${id}`, {
            headers: {
                Authorization : localStorage.getItem("token")
            }
        })
        .then(response => {
            console.log("post: ", response.data.posts);
            setBlog(response.data.posts);
            setLoading(false);
        })
    }, [id])

    return {
        loading,
        blog
    }
   
}

export const useBlogs = () => {
    const [loading , setLoading] = useState(true);
    const [blogs, setBlogs] = useState<any[]>([]);

    useEffect(()=> {
        axios.get(`${BACKEND_URL}/api/v1/blog/bulk`, {
            headers: {
                Authorization : localStorage.getItem("token")
            }
        })
        .then(response => {
            setBlogs(response.data.posts);
            console.log("blogsdata: ", response.data.posts);
            setLoading(false);
        })
    }, [])

    return {
        loading,
        blogs
    }
}