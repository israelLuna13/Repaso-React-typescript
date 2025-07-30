import type React from "react";

export default function Heading({children}:{children:React.ReactNode}) {
  return (
      <div className='bg-amber-400 rounded-xl px-4 mb-4 w-fit max-w-full mx-auto'>
       <h1 className="text-2xl mb-10 font-black">
        {children}
      </h1>
    </div>
  )
}
