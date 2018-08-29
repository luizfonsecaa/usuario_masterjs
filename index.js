let nome  = document.querySelector('#exampleInputName');
let gender = document.querySelector('#form-user-create [name=gender]:checked');
let birth = document.querySelector('#exampleInputBirth');
let country  = document.querySelector('#exampleInputCountry');
let email  = document.querySelector('#exampleInputEmail');
let password  = document.querySelector('#exampleInputPassword');
let photo  = document.querySelector('#exampleInputFile');
let admin = document.querySelector('#exampleInputAdmin');

var fields = document.querySelectorAll('#form-user-create [name]');

// let elementos = [];

// fields.forEach((field, index)=>{
//     //console.log(index);
//     elementos.push(nome.value);

// });
var user = {};


// document.querySelectorAll("button").forEach( ()=>{
//     this.addEventListener("click", ()=>{
//         console.log('clicou');
//     });
// });


document.getElementById("form-user-create").addEventListener("submit", (event)=>{
    event.preventDefault();
    fields.forEach((field, index)=>{
        if(field.name == "gender" && field.checked){
            user[field.name] = field.value;
        }else{
            user[field.name] = field.value;
        }
    });
    console.log(user);
})

