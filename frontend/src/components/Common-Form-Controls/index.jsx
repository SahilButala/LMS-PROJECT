
import React from 'react'
import { Button } from '../ui/button'
import FromControls from './FromControls'


function CommonForm({handleSubmit, buttonText, fromcontrols = [], formData, setFromData , isButtonDisabled=false }) {
  return (
      <form  onSubmit={handleSubmit} className='px-5' >
            {/*   render from controls here */}
         <FromControls fromcontrols={fromcontrols} formData={formData} setFromData={setFromData}   />
            <Button disabled={isButtonDisabled} type='submit'  className='mt-5 block w-full'>{buttonText || Submit}</Button>
      </form>
  ) 
}

export default CommonForm