import { ChangeEvent, ChangeEventHandler, useState } from "react"
import { Link , useNavigate} from "react-router-dom"
import { SignInInput, SignUpInput } from "@khalandar/medium-clone-common"
import { Button } from "./Button"
import axios from "axios"
import {BACKEND_URL} from "../config"
export const Auth = ({type}: {type :"signup" | "signin"})=> {

    const navigate = useNavigate();

    //Validating the type of input accepted by the backend signup route alongside creating hook to get the input fields data.
    const [postInputs, setPostInputs] =  useState<SignUpInput>({
        email: "",
        name:"",
        password: ""

    });

    /*
        Note : setPostInputs(c => ({
                                ...c, 
                                name : e.target.value
                            })) 
                        }}/> : null}

        Here the parameter c cannot be of type any if we do the following approach c will be of type any so cannot do.
           const [postSignInInputs, setPostSignInputs] = useState<SignInInput>({
            email: "",
            password : ""
        })

        const setDataType = (type == "signin") ? setPostSignInputs : setPostInputs;
    */
 

    async function sendRequest(){
        try {
            const response = await axios.post(`${BACKEND_URL}/api/v1/user/${type}`, postInputs)
            console.log("response: ", response.data);
            const token = response.data["token"];
            console.log("response token: ", token)
            //save the token
            localStorage.setItem("token", token);
            localStorage.setItem("username", response.data["name"]);
            console.log("postInputs: ", postInputs);
            // if response is valid i.e either signup or signin is done, then route to blogs page.
            navigate('/blogs', {state: response.data["name"]});
        } catch(e) {
            console.log("failed to send SignUp/SignIn request");
            alert("invalid Inputs");
        }
      
    }
    console.log(postInputs);
    return (
        <div className="flex  justify-center"> 
            <div className="flex flex-col justify-center space-y-5">
                <div>
                    <div className="text-3xl font-bold ">
                        Create Account
                    </div>
                    <div className="flex justify-between  space-x-1">
                        <div> Already have an account?</div>
                        <Link className="underline" to={'/signin'}> SignIn </Link>
                    </div>
                </div>
                
                <div>
                    {type=="signup" ?  <LabledInput fieldName={"Username"} ph={"Enter your username"} onChangeCb={(e)=> {
                            setPostInputs(c => ({
                                ...c, 
                                name : e.target.value
                            })) 
                        }}/> : null}
                </div>
               

                <LabledInput fieldName={"Email"} ph={"Enter your email"} onChangeCb={(e)=> {
                    setPostInputs(c=> ({
                        ...c,
                        email : e.target.value
                    }))
                }}></LabledInput>

                <LabledInput fieldName={"Password"} ph={"Enter your password"} onChangeCb={(e)=> {
                    setPostInputs(c => ({
                        ...c,
                        password : e.target.value
                    }))
                }}></LabledInput>

                <Button label="Sign Up" onClickCb={()=> {
                    sendRequest();
                }}></Button>
            </div>
        </div>
    )
    
}

interface LabledInputType {
    fieldName: string,
    ph : string
    onChangeCb : ( e:ChangeEvent<HTMLInputElement>)=> void
}

function LabledInput({fieldName, ph, onChangeCb}:LabledInputType) {
    return (
        <div>
            <div className="font-bold">
                {fieldName}
            </div>
            <input onChange={onChangeCb} type="text" className="border-2 w-full" placeholder={ph}></input>
        </div>
    )
}