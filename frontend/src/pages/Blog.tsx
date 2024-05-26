import { Link, useNavigate } from "react-router-dom";
import { BlogCard } from "../components/BlogCard";
import { useBlogs } from "../hooks";
import { TitleBar } from "../components/TitleTabBar";
import { LoadingView } from "../components/LoadingView";


export const Blog = ()=> {

    const {loading, blogs} = useBlogs();
    const navigate = useNavigate();
    const userName = localStorage.getItem("username") || "";
    
    if (loading) {
       return <LoadingView/> //use skeleton instead
    }

    function toggleTab(tabId : string) {
        // Hide all tab panels
        console.log("toggleTab");
        const tabPanels = document.querySelectorAll('.tab-panel');
        tabPanels.forEach(panel => {
            console.log("panels: ", panel);
            panel.classList.add('hidden');
        });
    
        // Show the selected tab panel
        const selectedTabPanel = document.getElementById(tabId);
        console.log(selectedTabPanel?.classList);
        selectedTabPanel?.classList.remove('hidden');
    }
    
    return (
        <>
         
        <div className="border-b border-gray-200 ml-20 mr-20">
            <TitleBar name={userName}></TitleBar>
            <nav className="flex space-x-1" aria-label="Tabs" role="tablist">
                <button type="button" className="hs-tab-active:font-semibold hs-tab-active:border-gray-900 hs-tab-active:text-black py-4 px-1 inline-flex items-center gap-x-2 border-b-2 border-transparent text-sm whitespace-nowrap text-gray-500 hover:text-black focus:outline-none focus:text-black disabled:opacity-50 disabled:pointer-events-none active" id="tabs-with-underline-item-1" data-hs-tab="#tabs-with-underline-1" aria-controls="tabs-with-underline-1" role="tab"
                    onClick={()=> {
                        toggleTab("tabs-with-underline-1");
                        console.log("userName 56546: ", userName);
                        navigate(`/blog/createblog`, {state: userName});
                    }}
                >
                    +
                </button>
                <button type="button" className="hs-tab-active:font-semibold hs-tab-active:border-gray-900 hs-tab-active:text-black py-4 px-1 inline-flex items-center gap-x-2 border-b-2 border-transparent text-sm whitespace-nowrap text-gray-500 hover:text-black focus:outline-none focus:text-black disabled:opacity-50 disabled:pointer-events-none active" id="tabs-with-underline-item-2" data-hs-tab="#tabs-with-underline-2" aria-controls="tabs-with-underline-2" role="tab"
                     onClick={()=> {
                       toggleTab("tabs-with-underline-2");
                    }}
                >
                    For you
                </button>
                <button type="button" className="hs-tab-active:font-semibold hs-tab-active:border-gray-900 hs-tab-active:text-black py-4 px-1 inline-flex items-center gap-x-2 border-b-2 border-transparent text-sm whitespace-nowrap text-gray-500 hover:text-black focus:outline-none focus:text-black disabled:opacity-50 disabled:pointer-events-none active" id="tabs-with-underline-item-3" data-hs-tab="#tabs-with-underline-3" aria-controls="tabs-with-underline-3" role="tab"
                    onClick={()=> {
                        toggleTab("tabs-with-underline-3");
                    }}
                >
                    Following
                </button>
            </nav>
        </div>

        <div className="mt-3 m-20">
            <Link to ={`/blog/createblog`} id="tabs-with-underline-1"  className="tab-panel hidden" role="tabpanel" aria-labelledby="tabs-with-underline-item-1"> 
                <div id="tabs-with-underline-1"  className="tab-panel hidden" role="tabpanel" aria-labelledby="tabs-with-underline-item-1">
                    
                </div>
            </Link>
            <div id="tabs-with-underline-2" className="tab-panel hidden" role="tabpanel" aria-labelledby="tabs-with-underline-item-2">
                
                {blogs.map(blog => <BlogCard key={blog.id} authorname={blog.user.name} title={blog.title} content={blog.content} date={"dec 2"} memberOnlyAccess={true} id ={blog.id}/>)}

               
            </div>
            <div id="tabs-with-underline-3" className="tab-panel hidden" role="tabpanel" aria-labelledby="tabs-with-underline-item-3">
                <p className="text-gray-500">
                    This is the <em className="font-semibold text-gray-800">third</em> item's tab body.
                </p>
            </div>
            </div>
        </>
    )
}