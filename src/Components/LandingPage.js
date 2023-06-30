import React from 'react'
import notes_img from "./Images/notes_img.png";
import Header from './Header/Header';

function LandingPage() {

//   useEffect(() => {
//     const userInfo = localStorage.getItem('userInfo')

//     if(userInfo){
//         navigate('/mynotes')
//     }
// },[navigate])
  return (
    <>
    <Header/>
         <div className="relative text-center">
        <img
          src={notes_img}
          alt="notes_img"
          className="w-[100%]  h-[100vh] bg-cover"
        />
       
      </div>
    </>
  )
}

export default LandingPage