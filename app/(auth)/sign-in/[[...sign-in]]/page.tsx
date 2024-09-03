import Navbar from "@/components/Navbar"
import { SignIn } from "@clerk/nextjs"

 

const SignInPage = () => {
  return (
    <div>
      {/* <Navbar/> */}
    <main className="flex h-screen w-full items-center justify-center">
      
            <SignIn/>
    </main>
    </div>
  )
}

export default SignInPage
