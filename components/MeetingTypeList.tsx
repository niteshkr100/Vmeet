'use client'

import Image from "next/image"
import HomeCard from "./HomeCard"
import { useState } from "react"
import { useRouter } from "next/navigation"
import MeetingModel from "./MeetingModel"
import { useUser } from "@clerk/nextjs"
import { Call, useStreamVideoClient } from "@stream-io/video-react-sdk"
import { useToast } from "@/components/ui/use-toast"
import { Textarea } from "@/components/ui/textarea"
import { Input } from "@/components/ui/input"

import ReactDatePicker from 'react-datepicker'


const MeetingTypeList = () => {

  const [meetingState, setMeetingState] = useState<'isScheduleMeeting' | 'isJoiningMeeting' | 'isInstantMeeting' | undefined>();
  const [callDetails, setCallDetails] = useState<Call>();

  const [selectDateTimePicker, setSelectDateTimePicker]= useState<Date | null>()

  const route =  useRouter();
  const { toast } = useToast()

  //stream infrastructure for creating call
  const {user}  = useUser();  //from clerk
  const client = useStreamVideoClient(); //from videostream
  const [values, setValues] = useState({
    dateTime : new Date(),
    description: '',
    link: ''
  });

  
 
  //create meeting function-----------------------------
  const createMeeting = async() => {
    if(!user || !client) return;

    try{
        if(!values.dateTime){
            toast({ title: "Please create date and time" })
            return;
        }

        //syntax from api create-part
        const id = crypto.randomUUID(); //this create random number
        const callType = 'default';
        const call = client.call(callType, id);

        if(!call) throw new Error("Failed to connect the call");

        //give current date
        const startAt = values.dateTime.toISOString() || new Date(Date.now()).toISOString();
        const description = values.description || 'Instant meeting';

        try{
          await call.getOrCreate({
            data: {
                 starts_at:startAt,
                 custom:{
                   description
                }
            }
         })
        }catch(error){
          toast({
            title: "Try again later",
      
          })
        }
        

         setCallDetails(call);

         if(!values.description){
            route.push(`/meeting/${call.id}`) //this call make us to go to (meeting folder) room
         }

         toast({ title: "Meeting Created" })
    }catch(error){
     console.log(error);
     toast({
        title: "Failed to create the meeting",
  
      })
    }
  }

  // meetingLink
  const meetingLink = `${process.env.NEXT_PUBLIC_BASE_URL}/meeting/${callDetails?.id}`

  return (
    <section className="grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-4">
       <HomeCard
       img="/icons/add-meeting.svg"
       title="New Meeting"
       description="Start an instant meeting"
       handleClick={()=>setMeetingState('isInstantMeeting')}
       className="bg-cyan-900"
       />
       
       <HomeCard
       img="/icons/schedule.svg"
       title="Schedule Meeting"
       description="Plan your meeting"
       handleClick={()=>setMeetingState('isScheduleMeeting')}
       className="bg-cyan-700"
       />
       <HomeCard
       img="/icons/recordings.svg"
       title="View Recording"
       description="Check out your recordings"
       handleClick={()=>route.push("/recordings")}
       className="bg-cyan-600"
       />
       <HomeCard
       img="/icons/join-meeting.svg"
       title="Join Meeting"
       description="through invitation link"
       handleClick={()=>setMeetingState('isJoiningMeeting')}
       className="bg-cyan-400"
       />

{/* modal on click of video menus */}

{/* schedule meeting*/}
{!callDetails?
( <MeetingModel
  isOpen={meetingState === "isScheduleMeeting"}
  onClose={()=> setMeetingState(undefined)}
  title="Meeting Created"
  handleClick={createMeeting}
  > 
   <div className="flex flex-col gap-2.5">
    <label htmlFor="" className="text-base text-normal leading-[22px] text-sky-1">Add a description</label>
    <Textarea className="rounded border-none bg-dark-3" 
    onChange={(e)=>{setValues({...values, description:e.target.value})}}/>
   </div>
   <div className="flex w-full flex-col gap-2.5">
    <label htmlFor="" className="text-base text-normal leading-[22px] text-sky-1">Selected Date and Time</label>
     <ReactDatePicker
     selected={values.dateTime}
     onChange={(date)=>setValues({...values, dateTime:date!})}
     showTimeSelect
     timeFormat="HH:mm"
     timeIntervals={15}
     timeCaption="time"
     dateFormat="MMMM d, yyyy h:mm aa"
     className="w-full rounded bg-dark-3 p-2 focus:outline-none"
     />
    </div>
  </MeetingModel>
):
( <MeetingModel
  isOpen={meetingState === "isScheduleMeeting"}
  onClose={()=> setMeetingState(undefined)}
  title="Start an Instant Meeting"
  className="text-center"
  handleClick={()=>{
    navigator.clipboard.writeText(meetingLink);
    toast({title:'Link copied'});
  }}
  image="/icons/checked.svg"
  buttonIcon="/icons/copy.svg"
  buttonText="Copy Meeting Link"
  />)
  }
  
  {/* new Meeting */}
    <MeetingModel
  isOpen={meetingState === "isInstantMeeting"}
  onClose={()=> setMeetingState(undefined)}
  title="Start an Instant Meeting"
  className="text-center"
  buttonText="Start Meeting"
  handleClick={createMeeting}
  /> 

  {/* join meeting */}
  <MeetingModel
  isOpen={meetingState === "isJoiningMeeting"}
  onClose={()=> setMeetingState(undefined)}
  title="Type the Link here"
  className="text-center"
  buttonText="Join Meeting"
  handleClick={()=> route.push(values.link)}
  > 
  <Input className="bg-dark-3 border-none rounded" 
  placeholder="Meeting link"
  onChange={(e)=>setValues({...values, link:e.target.value})}
  />
  </MeetingModel>
    </section>
  )
}

export default MeetingTypeList
