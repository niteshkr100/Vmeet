import Image from "next/image"

 
const Loader = () => {
  return (
    <div className="flex h-screen w-full justify-center items-center">
      <Image
            src="/icons/loading-circle.svg"
            alt="Loading"
            width={50}
            height={50}
      />
    </div>
  )
}

export default Loader
