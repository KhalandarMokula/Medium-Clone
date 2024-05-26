    import { useLocation, useParams } from "react-router-dom";
    import { BlogPostStruct, useBlog } from "../hooks";
    import { BlogCardProps } from "./Blog";
import { TitleBar } from "../components/TitleTabBar";
import { LoadingView } from "../components/LoadingView";

    export const BlogPost = () => {
        const {id} = useParams(); //here useParams gives the parameters passed in routing.
       
        const userName = localStorage.getItem("username") || "";
        
        const {loading, blog} = useBlog({id : id  || ""});
        console.log("blog post data : ", blog);
        if (loading) {
            return <LoadingView className="flex w-full m-20"/>
        } 
        const post = blog?.content;
        return (
            <div className="ml-20 mr-20">
                 <TitleBar name={userName}></TitleBar>
                 <div className="grid grid-cols-3 gap-10 mt-10 ">
                    <div className="col-span-2">
                        <BlogHeader {...blog } ></BlogHeader>
                        <BlogContent {...blog}></BlogContent>
                    </div>
                    <RenderAuthorDetails {...blog}></RenderAuthorDetails>
                    <div> </div>
                </div>
            </div>
           
        )
    }

    function BlogHeader(blog: Partial<BlogPostStruct>) {
        return (
            <div> 
                <div className="text-4xl font-bold mb-2"> {blog.title} </div>
                <div className="mb-2"> Posted on Aug 24, 2023</div>
            </div>
        )
    }

    function BlogContent(blog: Partial<BlogPostStruct>) {
        return (
            <div>
                {blog.content}
            </div>
        )
    }
    function RenderAuthorDetails(blog: Partial<BlogPostStruct>) {
        return (
            <div>
                <div> Author </div>
                <div className="flex space-x-2 items-center"> 
                    <span className="inline-flex items-center justify-center size-4 rounded-full bg-gray-500 text-xs font-semibold text-white leading-none"></span>
                    <div className="">
                        <div className="font-bold">{blog.user?.name} </div>
                        <div> Master of Mirth , legend of kids, story teller, brother of william shakesphere</div>
                    </div>
                </div>
            </div>
        )
    }