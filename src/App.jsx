import React, { useState, useEffect } from 'react';
import Header from './Header';
import Pokedex from './Pokedex';

function App() {
   
    const [pokemonList, setPokemonList] = useState([]);

    
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch("https://us-central1-it-sysarch32.cloudfunctions.net/pokemon");
                const data = await response.json();
                setPokemonList(data);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData();
    }, []); 

    return (
        
        <div className="app-container">
            <Header />
            <Pokedex pokemonList={pokemonList} />
        </div>
    );
}

export default App;
