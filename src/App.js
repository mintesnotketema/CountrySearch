import React, { useState } from 'react';
import '../src/App.css'

function App() {
  const [countryName, setCountryName] = useState('');
  const [result, setResult] = useState(null);
  const [error, setError] = useState(null);

  const handleSearch = async () => {
    if (countryName === ""){
      alert("Please Enter Country Name");
      return;
    }
    setError(null);
    setResult(null);

    try {
      const res = await fetch(`https://restcountries.com/v3.1/name/${countryName}`);

    //  to stop the execution of the current function
        if (!res.ok) {
          // throw new Error('Country not found');  
          throw new Error('Country not found');      
      }
      const data = await res.json();
      const country = data[0];
     // console.log(country)
     
      setResult({
        name: country.name.common ,
        flag: country.flags?.svg ,
        capital: country.capital ? country.capital[0] : 'not found',
        population: country.population ? country.population.toLocaleString() : 'not found',
        languages: country.languages ? Object.values(country.languages).join(', ') : 'not found',
      });
    }catch (error) {
      setError(error.message);
    }
  };
  return (
    <>
    <nav className='navbar'>
    <h1 className='logoo'>Find Your Country</h1>
    <button className='btn'>SignUp</button>
    </nav>
    <div className='container'>
      <div className='form'>
        <div className='frm'>
            <h1>Countries Information</h1>
            <input 
            className='inpt'
              type='text'
              value={countryName}
              onChange={(e) => setCountryName(e.target.value)}
              placeholder='Enter Country Name'
            />
            <button className='btn2' onClick={handleSearch}>Search</button>
            </div>
            
      </div>

      {error && <p >{error}</p>}
            
      {result && (
        <div className="country-card">
          <h2 className='countryname'>{result.name}</h2> 
          <img src={result.flag} alt={result.name}className="flag" />
          <p><strong>Capital:</strong> {result.capital}</p>
          <p><strong>Population:</strong> {result.population}</p>
          <p><strong>Languages:</strong> {result.languages}</p> 
          </div>
        
      )}

    </div>
   </>
   )
}

export default App;
