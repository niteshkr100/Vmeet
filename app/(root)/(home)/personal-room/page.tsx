'use client' //since using hook of clerk, so it is client component

import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { useGetCallById } from "@/hooks/useGetCallById";
import { useUser } from "@clerk/nextjs";
import { useStreamVideoClient } from "@stream-io/video-react-sdk";
import Image from "next/image";
import { useRouter } from "next/navigation";
 
 
//table components
 const Table = ({title, description}: {title:string, description:string}) => (
  <div className="flex flex-col items-start gap-2">
    <h1>{title}:</h1>
    <h1 className="flex flex-wrap font-bold text-sky-1">{description}</h1>
  </div>
 )

const PersonalRoom = () => {
  
  const router = useRouter();//router-->next/navigation
  const { toast } = useToast();//toaster shadcn
  const {user} = useUser();//clerk
  const client = useStreamVideoClient();//videostream

  //meeeting Id = userID from clerk
  const meetingId = user?.id;

  // meetingLink
  const meetingLink = `${process.env.NEXT_PUBLIC_BASE_URL}/meeting/${meetingId}?personal=true`;

 //hook
  const {call} = useGetCallById(meetingId!);

  const startRoom = async() =>{
    if(!client || !user) return;

    const newCall = client.call('default', meetingId!);

    //create new call
    if(!call){
      await newCall.getOrCreate({
        data: {
             starts_at: new Date().toISOString(),
              
        }
     })
    }
    router.push(`/meeting/${meetingId}?personal=true`)
  }

  return (
    <section className="flex size-full flex-col gap-10 text-white">
    <h1 className="text-3xl font-bold">PersonalRoom</h1>

    <div className="flex w-full flex-col gap-8 xl:max-w-[900px]">
    <Table title="Topic" description={`${user?.username}'s Meeting Room`} />
    <Table title="Meeting ID" description={`${meetingId!}`} />
    <Table title="Invite Link" description={`${meetingLink}`} />
    </div>

    <div className="flex gap-5">
      <Button className="bg-blue-1 rounded hover:bg-blue-800" onClick={startRoom}>
        Start Meeting
      </Button>
      <Button className="bg-dark-4 px-6 rounded hover:bg-blue-900"
      onClick={()=>{ navigator.clipboard.writeText(meetingLink);
        toast({title: "Link Copied", });
      }}
      >
      <Image
      src="/icons/copy.svg"
      alt="copy clip"
      width={20}
      height={20}
      className="mr-1"
      />
       Invite Link
      </Button>
    </div>
  </section>
  )
}

export default PersonalRoom
