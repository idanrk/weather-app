console.log('Client side javascript file is loaded!')


const weatherForm = document.querySelector('form')
const search = document.querySelector('input')
const fmsg = document.querySelector('#m1')
const smsg = document.querySelector('#m2')
weatherForm.addEventListener('submit' , (e) => {
    e.preventDefault()
    fmsg.textContent="Loading..."
    smsg.textContent=""
    fetch('/weather?address=' + search.value).then((response) => {
    response.json().then((data) => {
        if(data.error){
            return fmsg.textContent=data.error
        }
        fmsg.textContent=data.location
        smsg.textContent=data.forecast
    })
})
})


