import React, {useState,useEffect} from 'react'
import './MainPart.css'
import ChatBot from "/src/components/ChatBot/ChatBot"
import {auth,db} from '../../../firebase'
import { collection, addDoc } from "firebase/firestore"; 
import { useSpeechSynthesis } from "react-speech-kit";
import { crop_model_predict } from '../../../data_portal';

const FeedMainPart = () => {
  const [imageUpload, setImageUpload] = useState(null)
  const [base64, setBase64] = useState(null)
  const [form,setForm]=useState({
      name:'',
      prompt:'',
      photo:'',
  })
  const [predictedDisease,setPredictedDisease]=useState("No Species Detected")
   
    //speech
    const { speak } = useSpeechSynthesis();
    const convert = () => {
      speak({ text: predictedDisease });
    };
  
    const view=()=>{
      setButtonPopup(true);
    }
    
    useEffect(() => {
      convert()
    }, [predictedDisease])

  console.log(imageUpload)
  const handleUpload = (e) => {
    const file=e.target.files[0]
    setImageUpload(file);

    if(file && file.type.substr(0,5)==='image'){
        const reader=new FileReader()
        reader.onloadend=()=>{
            setForm({...form,photo:reader.result})
        }
        reader.readAsDataURL(file)
    }
    else{
        alert('Please upload animage')
    }
    }
   
    const handleChange=(e)=>{
      setForm({...form,[e.target.name]:e.target.value})
  }

  //Most Important Function
  const user=auth.currentUser
  const addDisease = async(e) => {
    try{
      const userdata= await addDoc(collection(db, "eggquality"), {
        name:predictedDisease,
        time:new Date().toLocaleString(),
        user:user.uid
       });
    }catch{
      ((error) => {
        alert(error.message)
    })
  }}
  const handlPrediction= async(e)=>{
    e.preventDefault()
    const response = await crop_model_predict()
    console.log(100)
    console.log(response.crop)
    setPredictedDisease(response.crop)
     try {
       addDisease()
     } catch (error) {
        console.log(error)
     }
    
  }
  
  return (
    <>
      {/* <NavBar /> */}
      <div className='main flex lg:flex-row flex-col    justify-between mt-10 lg:mt-5'>
       <div className="model flex flex-col  justify-center items-center  lg:w-[950px]  lg:h-[600px] border-solid border-[2px] lg:m-3 m-5 ">
         <h1 className='lg:text-2xl text-1xl mb-10  font-bold'>Realtime Analysis</h1>
         <form className='flex flex-col items-center justify center' onSubmit={handlPrediction}>
         
                <button className='m-3 text-white bg-[#6469ff] hover:text-[#6469ff] hover:bg-blue-200 font-medium rounded-md text-sm w-full sm:w-auto px-5 py-2.5 text-center'  type='submit'>Predict</button>
            </form>
           <h1 className='lg:text-2xl text-1xl font-bold  m-5'>{predictedDisease}</h1>
       </div>
       <h1 className="font-bold flex justify-center lg:hidden">
          HelperBot
       </h1>
       <ChatBot/>
    </div>
    </>
  )
}

export default FeedMainPart
