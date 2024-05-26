import { Auth } from "../components/Auth"
import { Quote } from "../components/Quote"


export const SignUp = ()=> {
    return (
        /*
         lg:grid-cols-2 - used for transition effects.
        */
        <div className="grid grid-cols-1 m-5 lg:grid-cols-2">
            <Auth type={"signup"}></Auth>
           
           <div className=" hidden lg:block">
            <Quote ></Quote>
           </div>
            

        </div>
    )
    
  
}