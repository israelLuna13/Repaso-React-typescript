import './style.css'
import { createOpenRouter } from '@openrouter/ai-sdk-provider'
import {streamText} from 'ai'
const openrouter = createOpenRouter({
  apiKey:import.meta.env.VITE_OPENROUTER_KEY
})


const submitBtn = document.querySelector('#submit')
const spinner = document.querySelector('#spinner')
const form = document.querySelector('#form')
const app = document.querySelector('#app')

form.addEventListener('submit',async(e)=>{
  e.preventDefault()
  const prompt = document.querySelector('#prompt').value

  if(prompt.trim() === ''){
    console.log('The input is required');
    return
  }  

  //we disabled button when the model answers a question
  submitBtn.disabled=true
  showPinner()

  const result =  streamText({
  //  model:openrouter('google/gemini-2.5-pro-exp-03-25:free'),
    // model:openrouter('meta-llama/llama-4-maverick:free'),
     model:openrouter('microsoft/mai-ds-r1:free'),
    // model:openrouter('moonshotai/kimi-vl-a3b-thinking:free'),
    // model:openrouter('bytedance-research/ui-tars-72b:free'),
    prompt:prompt,
    system:'You are programming senior'//give context to model
  })

  //clean last answer
  while(app.firstChild){
    app.removeChild(app.firstChild)
  }

  for await (const text of result.textStream)
      {
       
        app.append(text)
        hiddeSpinner()
      }
  submitBtn.disabled=false
})

const showPinner = ()=>{
  spinner.classList.remove('hidden')
  spinner.classList.add('flex')

}
const hiddeSpinner=()=>{

  spinner.classList.remove('flex')
  spinner.classList.add('hidden')
}