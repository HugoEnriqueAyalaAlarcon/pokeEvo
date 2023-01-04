import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';


import {Button} from './components/Button';
import { Card } from './components/Card';

import PokemonSpinner from './components/PokemonSpiner';
import "./components/Button.css"
//Hooks
import { useState, useEffect } from 'react';



function App() {
  const [pokemonId , setPokemonId] = useState (1) //inicializamos pokemonId en 1
  const [pokemonEvo , setPokemonEvo] = useState([]) //pasa poder unsar data fuera de su funcion
  const [loading , setLoading] = useState (true);
  /**
   * en useEffect vamos hacer la peticion a la API por que aqwui esta la informacion actualizada antes de renderizar
   * no se puede ocupar la data fuera de esta funcion /almenos que unemos otro estado
  */
 
  useEffect(()=>{ 
    getElvolutions(pokemonId);
  }, [pokemonId])

  //funcion para el nombre del pokemon
  async function getElvolutions (id){
    const response = await fetch (`https://pokeapi.co/api/v2/evolution-chain/${id}`) //busca la datos 
    const data = await response.json();

    let pokemonEvoArr=[];

    //primera evo
    let pokemonLv1 = data.chain.species.name;
    let pokemonLv1Img = await getPokemonImg(pokemonLv1);
    pokemonEvoArr.push([pokemonLv1 , pokemonLv1Img]);   
    
    //segunda evo si hay
    if(data.chain.evolves_to.length !==0){
      let pokemonLv2 = data.chain.evolves_to[0].species.name
      let pokemonLv2Img = await getPokemonImg(pokemonLv2);
      pokemonEvoArr.push([pokemonLv2 , pokemonLv2Img]);
      //terser evo si hay
      if(data.chain.evolves_to[0].evolves_to.length !==0){
        let pokemonLv3 = data.chain.evolves_to[0].evolves_to[0].species.name;
        let pokemonLv3Img = await getPokemonImg(pokemonLv3);
        pokemonEvoArr.push([pokemonLv3 , pokemonLv3Img]);
        console.log(pokemonEvoArr);
        setPokemonEvo(pokemonEvoArr) ; //setiamos nuestro arr para poderlo ocupar en otro sitio
        setLoading(false);
      }else{
        setPokemonEvo(pokemonEvoArr);
        setLoading(false);
      }
    }else{
      setPokemonEvo(pokemonEvoArr);
      setLoading(false);
    }

  }

  //funcion para las img de las evoluciones
  async function getPokemonImg(name){
    setLoading (true);
    const response = await fetch (`https://pokeapi.co/api/v2/pokemon/${name}`) //busca la datos 
    const data = await response.json();
    return (data.sprites.other['official-artwork'].front_default);
  }

  return (
    <div style={{textAlign: "center"}}>

      <img
      alt='pokemon'
      src='https://upload.wikimedia.org/wikipedia/commons/thumb/9/98/International_Pok%C3%A9mon_logo.svg/250px-International_Pok%C3%A9mon_logo.svg.png'
      width={300}
      />
     <div>
        <PokemonSpinner />
        <h1>Evolucioes</h1>
        <div className='card-container'>
          {pokemonEvo.map(pokemon => 
            <Card
              key={pokemon[0]}
              name={pokemon[0]} //passamos el nombre como propiedad a la card
              img={pokemon[1]} //passamos la imagen como propiedad a la card
              loading={loading}
            />)/*por cada poquemon se dibuja una tarjeta*/} 
        </div>
        <div className="btn-container"> 
          <Button 
          text="<< Anterior" 
          handleClick={()=> {
            (pokemonId===1) ?    //preunta si el id es uno
            setPokemonId(1):  //si ** id queda en 1
            setPokemonId(pokemonId-1); //no id -1
          }}
          />
          <Button 
          text="Siguiente >>"
          handleClick={()=> {setPokemonId(pokemonId+1)}}
          />
        </div>
  
     </div>
    </div>
  );
}

export default App;
