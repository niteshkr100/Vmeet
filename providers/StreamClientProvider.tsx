//  provider folder is basically is used to add special features
'use client'
import { tokenProvider } from '@/actions/stream.actions';
import Loader from '@/components/Loader';
import { useUser } from '@clerk/nextjs';
import {
    StreamCall,
    StreamVideo,
    StreamVideoClient,
    User,
  } from '@stream-io/video-react-sdk';
import { ReactNode, useEffect, useState } from 'react';

// NEXT_PUBLIC_STREAM_API_KEY, this key is expose to client side applications 
//STREAM_SECRET_KEY, secret key are render in server side application, we can only access it from server side for security reason.
  const apiKey = process.env.NEXT_PUBLIC_STREAM_API_KEY;
  const userId = 'user-id';
  const token = 'authentication-token';
  const user: User = { id: userId };
  
//   const client = new StreamVideoClient({ apiKey, user, token });


//   const call = client.call('default', 'my-first-call');
//   call.join({ create: true });
  
  export const StreamClientProvider = ({children}:{children:ReactNode}) => {

    const [videoClient, SetVideoClient] = useState<StreamVideoClient>();
    const {user, isLoaded} = useUser();

    useEffect(()=>{
        if(!user || !isLoaded) return;
        if(!apiKey) throw new Error('Stream API key is missing')

        //if this things are availabel then create new client
        const client = new StreamVideoClient({
            apiKey,
            user:{  //which user creating the client
                id: user?.id,
                name:user?.username || user?.id,
                image:user?.imageUrl
            },
            tokenProvider, //response confirming(action folder)
        });
        //client data is store
        SetVideoClient(client);
    },[user, isLoaded])

    if(!videoClient) return <Loader/>; //loader
    return (
      <StreamVideo client={videoClient}>
        {children}
      </StreamVideo>
    );
  };




 
