import { useState } from "react";
import SignupFrom from "../components/SignUp";
import UserInfoProvider from "../context/UserInfoContext";

function SignUp(){
    return (
        <div>
            <UserInfoProvider>
                <SignupFrom />
            </UserInfoProvider>
        </div>
    )
}

export default SignUp;