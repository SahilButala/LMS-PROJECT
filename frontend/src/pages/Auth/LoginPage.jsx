import CommonForm from "@/components/Common-Form-Controls";
import { RegisterFormControls, SigneUpFormControls } from "@/config";
import React, { useContext, useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { LoginRegister } from "@/Context/auth/Register";





function LoginPage() {
  const {signeInData,
    setSigneindata,
    RegisterData,setRegisterdata,handleRegister,handleLogin} = useContext(LoginRegister)
    const [activeTab, setActiveTab] = useState("sign-in");

    function handleTabChange(value){
           setActiveTab(value)
    }

    
  // const [activetab, setactiveTab] = useState("sign-in");

    // functions
function CheckdetailisFillSignIn(){
        return signeInData && signeInData.email !== '' && signeInData.password !== ''
}

function CheckdetailisFillRegister(){
     return RegisterData && RegisterData.email !== '' && RegisterData.password !== '' && RegisterData.name !== ''
}
    
  return (
    <div className="container px-3 mx-auto h-screen flex  justify-center items-center">
      <div className="form  w-[600px] mx-auto py-10 ">
        <b className="">Select The Control</b>
        <Tabs className=" w-full  md:w-[600px] mt-2"
            value={activeTab}
            defaultValue="sign-in"
            onValueChange={handleTabChange}
        >
          <TabsList className="ml-4 mb-4 ">
            <TabsTrigger value="sign-in" className="">
              {" "}
              Sign in
            </TabsTrigger>
            <TabsTrigger value="Register">Register</TabsTrigger>
          </TabsList>
          <TabsContent value="sign-in">
            <Card>
              <CardHeader>
                <CardTitle>Sign in to your account</CardTitle>
                <CardDescription>
                  Enter your email and password your account
                </CardDescription>
                <CardContent>
                  <CommonForm fromcontrols={SigneUpFormControls} buttonText={"Sign in"} formData={signeInData}  setFromData={setSigneindata}
                  isButtonDisabled={!CheckdetailisFillSignIn()}
                  handleSubmit = {handleLogin}
                  />
                </CardContent>
              </CardHeader>
            </Card>
          </TabsContent>
          <TabsContent value="Register">
            {" "}
            <Card>
              <CardHeader>
                <CardTitle>Register your self   to create your account</CardTitle>
                <CardDescription>
                  Enter your details
                </CardDescription>
                <CardContent>
                <CommonForm fromcontrols={RegisterFormControls} buttonText={"Register"}  formData={RegisterData} setFromData={setRegisterdata} 
                isButtonDisabled={!CheckdetailisFillRegister()}
                handleSubmit = {handleRegister}
                />
                </CardContent>
              </CardHeader>
            </Card>
            
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}

export default LoginPage;
