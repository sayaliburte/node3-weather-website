

// fetch('https://puzzle.mead.io/puzzle').then(response=>{
//     response.json().then((data)=>{
//         console.log(data)
//     })
// })



const weatherform = document.querySelector('form');
const search = document.querySelector('input');
const messageOne = document.querySelector('#messageOne');
const messageTwo = document.querySelector('#messageTwo');

weatherform.addEventListener('submit',(e)=>{
    e.preventDefault();
  const  location = search.value;
  messageOne.textContent = 'loading';
  messageTwo.textContent = '...';
    fetch('http://localhost:3000/weather?address='+location).then(response=>{
        response.json().then((data)=>{
            if(data.error){
              messageOne.textContent = data.error;
         }
             else{
                 messageOne.textContent = data.location;
                messageTwo.textContent = data.forecast;
           }
        })
    })
})
