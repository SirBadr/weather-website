const weatherform = document.querySelector('form')
const search = document.querySelector('input')
const messageOne=document.querySelector('#messageOne')
const messageTwo=document.querySelector('#messageTwo')





weatherform.addEventListener('submit',(e)=>{
    e.preventDefault()
    const location = search.value
    messageOne.textContent='loading'
    messageTwo.textContent=''
    fetch('/weather?address='+location).then((response)=>{
    
    response.json().then((data)=>{
        if(data.error){return messageOne.textContent=(data.error)}
        messageOne.textContent=('chosen location is: '+data.location)
        messageTwo.textContent=('temperature is: '+data.forecast.temperature)
    })
})
    console.log(location)
})