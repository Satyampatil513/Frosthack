import {React, useState} from 'react';
import { ethers } from 'ethers';
import { money } from '../assets';
import { CustomButton, FormField } from '../components';
import {checkIfImage} from '../utils';
import { useStateContext } from '../contexts';


const CreateStartup = () => {
  const [isLoading, setIsLoading] = useState(false);
  const {createStartup} = useStateContext();
const [form, setForm] = useState({
    owner: '',
    title: '',
    description: '',
    target: '', 
    deadline: '', 
    image: '',
    equity: '',
  });
  const handleFormFieldChange = (fieldName, e) => {
    setForm({ ...form, [fieldName]: e.target.value })
  };
  const handleSubmit = async (e) => {
    e.preventDefault();

    checkIfImage(form.image, async (exists) => {
      if(exists) {
        setIsLoading(true)
        await createStartup({ ...form, target: ethers.utils.parseUnits(form.target, 18)})
        setIsLoading(false);
        window.location.href = '/CreateStartup';
      } else {
        alert('Provide valid image URL')
        setForm({ ...form, image: '' });
      }
    })
  }
  return (
    <div className="bg-[#1c1c24] flex justify-center items-center flex-col rounded-[10px] sm:p-10 p-4">
      {isLoading && '<Loader />'}
      <div className="flex justify-center items-center p-[16px] sm:min-w-[380px] bg-[#3a3a43] rounded-[10px]">
        <h1 className="font-epilogue font-bold sm:text-[25px] text-[18px] leading-[38px] text-white">Create a Startup</h1>
      </div>
      <form onSubmit={handleSubmit} className="w-full mt-[65px] flex flex-col gap-[30px]">
        <div className="flex flex-wrap gap-[40px]">
          <FormField 
          labelName="Your address *"
          placeholder="0xabcdef"
          inputType="text"
          value={form.owner}
          handleChange={(e) => handleFormFieldChange('owner', e)}
          />
          <FormField 
          labelName="Your Title *"
          placeholder="Phone Follower Trolly"
          inputType="text"
          value={form.title}
          handleChange={(e) => handleFormFieldChange('title', e)}
          />
        </div>
        <FormField 
            labelName="Story *"
            placeholder="Write your story"
            inputType="text"
            isTextArea
            value={form.description}
            handleChange={(e) => handleFormFieldChange('description', e)}
            
          />
        

        <div className="w-full flex justify-start items-center p-4 bg-[#8c6dfd] h-[120px] rounded-[10px]">
          <img src={money} alt="money" className="w-[40px] h-[40px] object-contain"/>
          <h4 className="font-epilogue font-bold text-[25px] text-white ml-[20px]">You will get 100% funding from all over the world!!!!! </h4>
        </div>

        <div className="flex flex-wrap gap-[40px]">
        <FormField 
            labelName="Ask *"
            placeholder="10,000000 Rs"
            inputType="text"
            value={form.target}
            handleChange={(e) => handleFormFieldChange('target', e)}
          />
          <FormField 
            labelName="Equity *"
            placeholder="20%"
            inputType="text"
            value={form.equity}
            handleChange={(e) => handleFormFieldChange('equity', e)}
          />
          <FormField 
            labelName="End Date *"
            placeholder="End Date"
            inputType="date"
            value={form.deadline}
            handleChange={(e) => handleFormFieldChange('deadline', e)}
          />
        </div>
        <FormField 
            labelName="Startup image *"
            placeholder="Place image URL of your startup"
            inputType="url"
            value={form.image}
            handleChange={(e) => handleFormFieldChange('image', e)}
          />
       
          <div className="flex justify-center items-center mt-[40px]">
            <CustomButton 
              btnType="submit"
              title="Submit new Startup"
              styles="bg-[#1dc071]"
            />
          </div>
      </form>
      </div>
  )
}

export default CreateStartup