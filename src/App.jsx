import {useEffect, useState} from 'react'
import Search from './components/Search.jsx'
import Spinner from './components/Spinner.jsx'
import MovieCard from './components/MovieCard.jsx';
import { useDebounce } from 'react-use';
import { getTrendingMovies, updateSearchCount } from './appwrite.js';



const API_BASE_URL = 'https://api.themoviedb.org/3';
const API_KEY = import.meta.env.VITE_TMDB_API_KEY;

const API_OPTIONS = {
  method: 'GET',
  headers : {
    accept: 'application/json',
    Authorization: `Bearer ${API_KEY}`
  }
}

const App = () => {

  const [searchTerm, setSearchTerm] = useState('');  //Props  
  const [errorMessage, setErrorMessage] = useState('');  // Caso de erro na chamada da api o erro aparecera na tela
  const [movieList, setMovieList] = useState([]);
  const [trendingMovies, setTrendingMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(false); // Quando faz um requisição por API ele demora entao ele mostra algo ao usuario enquanto carrega
  const [debouncedSearchTerm, setDebouncedSearchTerm] = useState('');

  // Debounce prevene que muitas requisiçoes sejam feitas a API, esperando 500 miliseconds
  useDebounce( () => setDebouncedSearchTerm(searchTerm), 500, [searchTerm]) // Tempo de espera 500 antes de mudar o valor do state

  const fetchMovies = async (query = '') => {   // Boa tratica usar o try na chamada da api
    setIsLoading(true); // Para começar a contagem do tempo de carregamento da API
    setErrorMessage(''); 

    try {
      const endpoint = query
      ? `${API_BASE_URL}/search/movie?query=${encodeURIComponent(query)}`
      : `${API_BASE_URL}/discover/movie?sort_by=popularity.desc`;
      const response = await fetch(endpoint, API_OPTIONS);      
      
      if(!response.ok) {
        throw new Error('Failed to fetch movies');
      }

      const data = await response.json();
      
      if(data.Response == 'False') {
        setErrorMessage(data.Error || 'Failed to fetch movies');
        setMovieList([]); // Se o tempo exceder ele retorna e mostra e chama o setMovieList(data.results || []);
        return;
      }
      setMovieList(data.results || []);

      if(query && data.results.length > 0) {
        await updateSearchCount(query, data.results[0]);
      }
      
    } catch (error){
      console.error(`Error fetching movies: ${error}`);  // Erro aparecera no console do browser 
      setErrorMessage('Error fetching movies. Please try again later.');   // Erro aparecera na tela

    } finally { // Não importa o que aconteça erro ou acerto ele para o looping
      setIsLoading(false);
    }
  }

  const loadTrendingMovies = async () => {
    try {
      const movies = await getTrendingMovies();
      setTrendingMovies(movies);

    } catch (error) {
      console.error(`Error fetching treding movies: ${error}`);      
    }
  }

  useEffect(() => {
    fetchMovies(debouncedSearchTerm);
  }, [debouncedSearchTerm]); // [] O searchTerm é passado dentro da array para que ele atualize o serchTerm toda vez que ele muda

  useEffect(() => {
    loadTrendingMovies();
  }, []);

  return (
    <main>
      <div className="pattern" />

      <div className="wrapper">
        <header>
          <img src='./hero.png' alt='Hero Banner' />
          <h1>Find <span className="text-gradient">Movies</span>Search for your favorite movie</h1>
          <Search searchTerm={searchTerm} setSearchTerm={setSearchTerm} /> 
        </header>

        {trendingMovies.length > 0 && (
          <section className='trending'>
            <h2>Trending Movies</h2>

            <ul>
              {trendingMovies.map((movie, index) => (
                <li key={movie.$id}>
                  <p>{index + 1}</p>
                  <img src={movie.poster_url} alt={movie.title} />
                </li>
              ))}
            </ul>

          </section>
        )}

        <section className='all-movies'>
          <h2 >All Movies</h2>

          {isLoading ? (
            <Spinner />            
          ) : errorMessage ? (
            <p className='text-red-500'>{errorMessage}</p>
          ) : (
            <ul>
              {movieList.map((movie) => (
                <MovieCard key={movie.id} movie={movie} />
              ))}
            </ul>
          )}

        </section>        
        
      </div>
    </main>
  )
}

export default App
