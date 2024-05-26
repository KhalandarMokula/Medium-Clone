import { Link } from "react-router-dom"

export const TitleBar = ({name} : {name: string})=> {
   
    return (
        <Link to='/blogs'>
            <div className="flex  justify-between border p-5">
                <div className="flex space-x-3"> 
                
                    {/*<img  className="h-auto max-w-full" src='../assets/mediumLogo.jpg' alt="image description"> </img>*/}
                    <div className="font-bold text-xl"> Medium</div>
                </div>
                <div className="flex space-x-3 items-center">
                    <Link className="text-md" to ={`/blog/createblog`}> Write </Link>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M14.857 17.082a23.848 23.848 0 0 0 5.454-1.31A8.967 8.967 0 0 1 18 9.75V9A6 6 0 0 0 6 9v.75a8.967 8.967 0 0 1-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 0 1-5.714 0m5.714 0a3 3 0 1 1-5.714 0M3.124 7.5A8.969 8.969 0 0 1 5.292 3m13.416 0a8.969 8.969 0 0 1 2.168 4.5" />
                    </svg>
                    <span className="inline-flex items-center justify-center size-5 rounded-full bg-gray-500 text-xs font-semibold text-white leading-none ">
                        {name.slice(0,2)}
                    </span>
                </div> 
            </div>
        </Link>
       
    )
}