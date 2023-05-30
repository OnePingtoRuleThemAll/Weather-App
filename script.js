var button = document.querySelector('.button')
var inputValue = document.querySelector('.inputValue')
var name = document.querySelector('.name');
var desc = document.querySelector('.desc');
var temp = document.querySelector('.temp');

button.addEventListener('click', function(){
    fetch('https://api.openweathermap.org/data/2.5/forecast?lat={lat}&lon={lon}&appid=a17fdc4c9b073b818693294055558b05')
    .then(response => response.json())
    .then(data => console.log(data))

.catch(err => alert("Wrong city name!"))
})