 //dynamic route ([id]) 
//https://nextjs.org/docs/app/building-your-application/routing/dynamic-routes
//Every page in app router receives route parameters as a prop and we destructure it by using keyword params and the params object contains the route parameters as key value pairs
'use client'

import Loader from "@/components/Loader";
import MeetingRoom from "@/components/MeetingRoom";
import MeetingSetup from "@/components/MeetingSetup";
import { useGetCallById } from "@/hooks/useGetCallById";
import { useUser } from "@clerk/nextjs"
import { StreamCall, StreamTheme } from "@stream-io/video-react-sdk"
import { useState } from "react";

 
const Meeting = ({ params:{id} }: { params: { id: string } }) => {

  const {user, isLoaded} = useUser();
  const [isSetupCompleted, setIsSetCompleted] = useState(false);

  //custom Hook
  const {call, isCallLoading} = useGetCallById(id);

  if(!isLoaded || isCallLoading) return <Loader/>
  
  return (
    
      <main className="h-screen w-full">
       
       <StreamCall call={call}>  {/* ensure which call is in */}
          <StreamTheme>
            {!isSetupCompleted ? 
             (<MeetingSetup setIsSetCompleted={setIsSetCompleted}/>)
              : 
             (<MeetingRoom/>)}
          </StreamTheme>
       </StreamCall>
      

      </main>
      
  )
}

export default Meeting
