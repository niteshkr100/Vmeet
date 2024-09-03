import MeetingTypeList from "@/components/MeetingTypeList";

const Home = () => {

   const now = new Date();
    // Get the current hours, minutes, and AM/PM
    let hours = now.getHours();
    const minutes = now.getMinutes();
    const ampm = hours >= 12 ? 'PM' : 'AM';

    // Convert hours from 24-hour to 12-hour format
    hours = hours % 12;
    hours = hours ? hours : 12; // The hour '0' should be '12'

    // Format the minutes with leading zero if necessary
    const formattedMinutes = minutes.toString().padStart(2, '0');

    // Combine everything into the desired format
    const currentTime = `${hours}:${formattedMinutes} ${ampm}`;

    //  otherWay
    const present = new Date();
    const time = now.toLocaleTimeString('en-US', {hour:'numeric', minute:'2-digit'});
    const date = (new Intl.DateTimeFormat('en-US', {dateStyle:'full'})).format(present)


  return (
     <section className="flex size-full flex-col gap-10 text-white">
        <div className="h-[300px] w-full rounded-[20px] bg-hero bg-cover">
            <div className="flex h-full flex-col justify-between max-md:px-5 max-md:py-8 lg:p-11">
                  <h2 className="glassmorphism max-w-[270px] rounded text-center py-2 text-base font-normal">
                      Upcoming Meeting at 12:30 PM
                  </h2>
                  <div className="flex flex-col gap-2">
                        <h2 className="text-4xl font-extrabold lg:text-7xl">{time}</h2>
                        <p className="text-lg font-medium text-sky-1 lg:text-2xl">{date}</p>
                  </div>
            </div>
        </div>

      {/* meeting components */}
       <MeetingTypeList/>

     </section>
  )
}

export default Home
