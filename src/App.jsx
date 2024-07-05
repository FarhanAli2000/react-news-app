import { useState } from 'react';
import axios from 'axios';
import './App.css';

const countryCodes = [
  'ae', 'ar', 'at', 'au', 'be', 'bg', 'br', 'ca', 'ch', 'cn', 'co', 'cu', 'cz', 'de', 'eg', 'fr', 'gr', 'hk', 'hu', 'id', 'ie', 'il', 'in', 'it', 'jp', 'kr', 'lt', 'lv', 'ma', 'mx', 'my', 'ng', 'nl', 'no', 'nz', 'ph', 'pl', 'pt', 'ro', 'rs', 'ru', 'sa', 'se', 'sg', 'si', 'sk', 'th', 'tr', 'tw', 'ua', 'us', 've', 'za'
];
const categories = ['business', 'entertainment', 'general', 'health', 'science', 'sports', 'technology'];

function App() {
  const [country, setCountry] = useState('us'); 
  const [category, setCategory] = useState('general'); 
  const [mydata, setMyData] = useState([]);
  const [suggestions, setSuggestions] = useState([]);

  const fetchNews = () => {
    // axios.get(`https://newsapi.org/v2/top-headlines?country=${country}&category=${category}&apiKey=d9f757d26a5946a8aa9752bacc5f5522`)
      .then((response) => {
        setMyData(response.data.articles);
      })
      .catch((error) => {
        console.error('Error fetching data: ', error);
      });
  };

  const handleCountryChange = (e) => {
    const input = e.target.value.toLowerCase();
    setCountry(input);
    if (input) {
      const filteredSuggestions = countryCodes.filter(code => code.startsWith(input));
      setSuggestions(filteredSuggestions);
    } else {
      setSuggestions([]);
    }
  };

  const handleCategoryChange = (e) => {
    setCategory(e.target.value);
  };

  const handleSuggestionClick = (suggestion) => {
    setCountry(suggestion);
    setSuggestions([]);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    fetchNews();
  };

  return (
    <div className="App">
      <form onSubmit={handleSubmit}>
        <input
          className="mr-64 mb-2 p-2 w-[50%]"
          type="text"
          placeholder="Enter country code (e.g., us)"
          value={country}
          onChange={handleCountryChange}
        />
        <select className="mr-11 p-2 w-[50%]" value={category} onChange={handleCategoryChange}>
          {categories.map((cat, index) => (
            <option key={index} value={cat}>{cat}</option>
          ))}
        </select>
        <button className="mr-36 border border-black p-2 rounded-md hover:bg-slate-400" type="submit">
          Submit
        </button>
        {suggestions.length > 0 && (
          <ul className="suggestions-list text-center">
            {suggestions.map((suggestion, index) => (
              <li className='text-center' key={index} onClick={() => handleSuggestionClick(suggestion)}>
                {suggestion}
              </li>
            ))}
          </ul>
        )}
      </form>

      <div className="cards-container">
        {mydata.map((item, index) => (
          <div
            className="card"
            key={index}
          >
            <img
              className="card-image"
              src={item.urlToImage || 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSosMm4I13FJmm7-nYRYYeBnE8lfBhv_ErMlQ&s'}
              alt="my news"
              onError={(e) => {
                e.target.onerror = null; 
                e.target.src = ''; 
              }}
            />
            <h3 className="card-title">{item.author}</h3>
            <p>{item.description}<a className="card-link" href={item.url}>
              Read more
            </a></p>
            
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
