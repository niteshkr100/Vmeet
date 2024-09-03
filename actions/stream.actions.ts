//STREAM_SECRET_KEY, secret key are render in server side application, we can only access it from server side for security reason.
//server side file

"use server"

import { currentUser } from "@clerk/nextjs/server";
import { StreamClient } from '@stream-io/node-sdk';

const apiKey = process.env.NEXT_PUBLIC_STREAM_API_KEY;
const apiSecret = process.env.STREAM_SECRET_KEY;

export const tokenProvider = async()=>{
    const user = await currentUser();

    if(!user) throw new Error('user is not logged in');
    if(!apiKey) throw new Error('apiKey is not not founded');
    if(!apiSecret) throw new Error('apiSecret is not not founded');

    //create server client
    const client = new StreamClient(apiKey, apiSecret);

    // exp is optional (by default the token is valid for an hour)
    const exp = Math.round(new Date().getTime() / 1000) + 60 * 60;
    const issued = Math.round(Date.now() / 1000) - 60;

    //token
    const token = client.createToken(user.id, exp, issued);
    return token;
}