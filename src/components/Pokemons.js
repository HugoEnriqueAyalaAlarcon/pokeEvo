import React from 'react';
import axios from 'axios';

export default function Pokemons() {
    const URL="https://jsonplaceholder.typicode.com/users"
    const $axios= document.getElementById("axios");
    const $fragment = document.createDocumentFragment();

    axios
    .get(URL)
    .then(res =>{
        console.log(res);
        res.data.forEach(el => {
            const $li = document.createElement("li");//creamos elementos li
            $li.innerHTML=`${el.name}--${el.email}--${el.phone}`;
            $fragment.appendChild($li);
        });
        $axios.appendChild($fragment);
    })
   .catch(erro => {
        console.log("Error Estamos en el catch");
    })
    .finally(() => {
        console.log("Estamos en el finaly");
    })
  return (
    <div>Pokemon 
        <ol id='axios'></ol>
    </div>

  )
}
