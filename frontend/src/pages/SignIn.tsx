
import { Auth } from "../components/Auth"
import { Quote } from "../components/Quote"
export const SignIn = ()=> {
    return  <div className="grid grid-cols-1 m-5 lg:grid-cols-2">
        
        <Auth type={"signin"}></Auth>
    
        <div className=" hidden lg:block">
            <Quote ></Quote>
        </div>
    

    </div>
}