"use client"
import { sidebarLinks } from "@/constants";
import { cn } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

const Sidebar = () => {

 // usePathname is a Client Component hook that lets you read the current URL's pathname.
  const pathname = usePathname();

  return (
     <section className="sticky left-0 top-0 flex h-screen w-fit flex-col justify-between bg-dark-1 p-6 pt-28 text-white max-sm:hidden lg:w-[264px]">
        <div className="flex flex-1 flex-col gap-6">
            {sidebarLinks.map((link)=>{
                // https://chatgpt.com/share/c522af44-7c9d-4217-9cf0-a542c5e01a27
                // about/nitesh ---> link.route check /about/nitesh (return false)
                //-----> it check start with /about/ (return true)
              const isActive = pathname === link.route || pathname.startsWith(`${link.route}/`);

              return(
                // <Link> is a React component that extends the HTML <a> element to provide prefetching and client-side navigation between routes. It is the primary way to navigate between routes in Next.js.
                <Link
                 href={link.route}
                 key={link.label}
                 //cn allows us to add multiple and dynamic class name.
                 //second parameter is optional.
                 className={cn('flex gap-4 items-center p-4 rounded justify-start',  {'bg-blue-1': isActive,})}
                >
                  <Image
                    src={link.imgUrl}
                    alt={link.label}
                    width={24}
                    height={24}
                  />
                  <p className="text-lg font-semibold max-lg:hidden">
                  {link.label}
                  </p>
                
                </Link>
              )
            })
            }
        </div>
     </section>
  )
}

export default Sidebar
