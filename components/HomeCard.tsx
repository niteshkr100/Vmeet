'use client'

import { cn } from "@/lib/utils"
import Image from "next/image"

interface HomeCardProps{
    img:string,
    title:string,
    description:string,
    className:string,
    handleClick :  ()=> void
}

const HomeCard = ( {img,
    title,
    description,
    handleClick,
    className}:HomeCardProps) => {

  return (
    <div>
      <div className={cn("py-6 px-4 flex flex-col justify-between w-full min-h-[260px] xl:max-w-[270px] rounded-[14px] cursor-pointer", className)} 
      onClick={handleClick}>
            <div className="size-12 glassmorphism rounded-[10px] flex-center">
                <Image src={img} width={27} height={27} alt="meeting"/>
            </div>
            <div className="flex flex-col gap-2">
                <h1 className="text-2xl font-bold">{title}</h1>
                <p className="text-md font-normal">{description}</p>
            </div>
       </div>
    </div>
  )
}

export default HomeCard
