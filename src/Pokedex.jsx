import React, { useState, useEffect } from 'react';
import Pokemon from './Pokemon';

function Pokedex({ pokemonList }) {
    const [language, setLanguage] = useState('english');
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);

    // Update total pages when pokemonList changes
    useEffect(() => {
        setTotalPages(Math.ceil(pokemonList.length / 10)); // Assuming 10 items per page
    }, [pokemonList]);

    const handleLanguageChange = (selectedLanguage) => {
        setLanguage(selectedLanguage);
    };

    const goToPage = (page) => {
        setCurrentPage(page);
    };

    const goToNextPage = () => {
        setCurrentPage(prevPage => Math.min(prevPage + 1, totalPages));
    };

    const goToPreviousPage = () => {
        setCurrentPage(prevPage => Math.max(prevPage - 1, 1));
    };

    // Filter pokemonList based on currentPage
    const startIndex = (currentPage - 1) * 10;
    const endIndex = currentPage * 10;
    const displayedPokemon = pokemonList.slice(startIndex, endIndex);

    return (
        <div className="pokedex-container">
            <div className="header-and-pagination">
                <div className="language-buttons">
                    {['english', 'japanese', 'chinese', 'french'].map(lang => (
                        <button className="btnDesign" key={lang} onClick={() => handleLanguageChange(lang)}>
                            {lang.charAt(0).toUpperCase() + lang.slice(1)}
                        </button>
                    ))}
                </div>
                <div className="pagination">
    <button className="pagination-button" onClick={goToPreviousPage} disabled={currentPage === 1}>Back</button>
    {Array.from({ length: totalPages }, (_, i) => (
        <button key={i} className="pagination-button" onClick={() => goToPage(i + 1)} disabled={currentPage === i + 1}>{i + 1}</button>
    ))}
    <button className="pagination-button" onClick={goToNextPage} disabled={currentPage === totalPages}>Next</button>
</div>

            </div>
            <div className="pokemon-list">
                {displayedPokemon.map((pokemon, index) => (
                    <Pokemon
                        key={index}
                        id={pokemon.id}
                        name={pokemon.name[language]}
                        image={pokemon.image}
                        types={pokemon.type}
                        hp={pokemon.base.HP}
                        attack={pokemon.base.Attack}
                        defense={pokemon.base.Defense}
                        spattack={pokemon.base["Sp. Attack"]}
                        spdefense={pokemon.base["Sp. Defense"]}
                        speed={pokemon.base.Speed}
                    />
                ))}
            </div>
            <div>Current Page: {currentPage}</div>
            <div>Total Pages: {totalPages}</div>
        </div>
    );
}

export default Pokedex;
