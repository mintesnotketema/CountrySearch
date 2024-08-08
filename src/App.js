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
          throw new Error('Country not found');       
      }
      const data = await res.json();
      const country = data[0];
      console.log(data[0])
     
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
 
   )
}

export default App;
