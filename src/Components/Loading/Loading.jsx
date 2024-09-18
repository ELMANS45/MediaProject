import React from 'react';
import { ScaleLoader } from 'react-spinners';

export default function Loading() {
  return (
    <div className="fixed top-0 left-0 w-full h-full bg-indigo-900 opacity-90 flex justify-center items-center z-50">
            <ScaleLoader color="white" speedMultiplier={2} radius={5} width={6} height={55} />    
    </div>
  );
}
// import React from 'react'
// import { ScaleLoader } from 'react-spinners'

// export default function Loading() {
//   return (
//     <div className="w-full h-screen bg-red-600 opacity-100 flex justify-center items-center z-50 bg-fixed">
//         <ScaleLoader className='text-indigo-900 opacity-100' />
//     </div>
//   )
// }