import { Link } from "react-router-dom";

export interface BlogCardProps {
    authorname : string
    date : string //can be a datetime object
    memberOnlyAccess : boolean
    title : string
    content : string
    id: string
}

export const BlogCard = (blogsProps:BlogCardProps)=> {
    return (
        <>
            <div className="m-5">
                <div>
                    <BlogCardTitle {...blogsProps}></BlogCardTitle>
                    <BlogCardBody {...blogsProps}></BlogCardBody>
                </div>
                <BlogCardBorder></BlogCardBorder>
            </div>
        </>
    )
}

function BlogCardTitle(blogsProps:BlogCardProps){
    return (
        <Link to = {`/blog/${blogsProps.id}`}>
            <div className="flex space-x-1 items-center cursor-pointer"> 
                <span className="inline-flex items-center justify-center size-5 rounded-full bg-gray-500 text-xs font-semibold text-white leading-none">
                    {blogsProps.authorname.slice(0,2)}
                </span>

                <div>
                    {blogsProps.authorname}
                </div>
                <span className="inline-flex items-center justify-center size-1 rounded-full bg-gray-500 text-xs font-semibold text-white leading-none">
                
                </span>
                <div>
                    {blogsProps.date}
                </div>
                {blogsProps.memberOnlyAccess ? <div> Member-only </div> : null}
            </div>
        </Link>
        
    )
}

function BlogCardBody(blogsProps:BlogCardProps) {
    return (
        <div className="grid grid-cols-3 gap-10 m-2">
            <div className="col-span-2">
                <h3> {blogsProps.title}</h3>
                <div className="max-h-[6rem] overflow-hidden"> 
                    <p className="line-clamp-4"> {blogsProps.content} </p>
                </div>
            </div>
            
            <div> {"Image"} </div>
        </div>
    )
}

function BlogCardBorder() {
    return (
        <div className="bg-slate-200 h-0.5 w-full"> </div>
    )
}