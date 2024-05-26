import { FormEventHandler, useState } from "react";
import { Link } from "react-router-dom"
import { BACKEND_URL } from "../config";
import axios from "axios"


interface PostData {
    title: string,
    content: string 
}

export const WriteBlog = () => {

    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");
    
    const userName = localStorage.getItem("username") || "";

    console.log("state: ", userName);

    const publishPost: FormEventHandler<HTMLButtonElement> = (event) => {
        // Handle the form event
        console.log('Value changed:', event.currentTarget.value);
        saveBlogIntoDb({title,content});
    };
    return <div className="ml-20 mr-20"> 
           <HeaderBar userName={userName} publishPost={publishPost}/>
           <Content setTitle={setTitle} setContent={setContent}></Content>
        </div>
    
}

async function saveBlogIntoDb({title, content} : PostData){

    const postData = {title : title, content : content}
    try {
        const response = await axios.post(`${BACKEND_URL}/api/v1/blog`,postData,{
            headers: {
                Authorization : localStorage.getItem("token")
            }
        });
        console.log("response post id: ", response.data);
    } catch(e) {
        console.log("filed to post : ", e);
    }
   
}

const  HeaderBar = ({userName, publishPost}:{userName:string, publishPost:FormEventHandler<HTMLButtonElement>})=>{
    console.log("us: ", userName);
    return (
        <div className="flex justify-between items-center ">
            <div className="flex space-x-3 items-center">
                <Link to='/blogs'> 
                    <div className="font-bold text-xl"> Medium</div>
                </Link>
                <div className="text-sm text-black font-medium"> Draft in {userName}</div>
                <div className="text-sm"> Saved</div>
            </div>
            <div className="flex space-x-3 items-center">
                <button className="rounded-full bg-green-500 text-sm text-white p-2 border-green-500"
                    onClick={publishPost}
                > Publish </button>
                <div className="items-center font-bold text-gray">...</div>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M14.857 17.082a23.848 23.848 0 0 0 5.454-1.31A8.967 8.967 0 0 1 18 9.75V9A6 6 0 0 0 6 9v.75a8.967 8.967 0 0 1-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 0 1-5.714 0m5.714 0a3 3 0 1 1-5.714 0M3.124 7.5A8.969 8.969 0 0 1 5.292 3m13.416 0a8.969 8.969 0 0 1 2.168 4.5" />
                </svg>
                <span className="inline-flex items-center justify-center size-5 rounded-full bg-gray-500 text-xs font-semibold text-white leading-none ">
                    {userName.slice(0,2)}
                </span>
            </div>
        </div>
        
    );
}

function Content({setTitle, setContent}:{setTitle: React.Dispatch<React.SetStateAction<string>>, setContent: React.Dispatch<React.SetStateAction<string>>}) {
    return (
        <div className=" m-20">
            <textarea id="message" className=" pl-2.5 pt-2.5 w-full text-4xl text-gray-900  rounded-lg " placeholder="Title..."
                onChange={(e) => {
                    setTitle(e.target.value);
                }}
            ></textarea>
            <textarea id="message" className=" p-2.5 w-full text-sm text-gray-900  rounded-lg border-none" placeholder="Tell your story..."
                 onChange={(e) => {
                    setContent(e.target.value);
                }}
            ></textarea>

        </div>
    )
}