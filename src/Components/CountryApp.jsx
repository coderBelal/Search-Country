import React, { useState } from "react";

const CountryApp = () => {
  const [countryName, setCountryName] = useState("");
  const [countryData, setCountryData] = useState([]);
  const [errorMessage, setErrorMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const fetchCountryData = () => {
    if (countryName.trim() === "") {
      setErrorMessage("The input field cannot be empty");
      setCountryData([]);
      return;
    }

    setLoading(true);
    const finalURL = `https://restcountries.com/v3.1/name/${countryName}`;

    fetch(finalURL)
      .then((response) => response.json())
      .then((data) => {
        if (data.status === 404) {
          setErrorMessage("No matching countries found.");
          setCountryData([]);
        } else {
          setCountryData(data);
          setErrorMessage("");
        }
      })
      .catch(() => {
        setErrorMessage("Something went wrong. Please try again later.");
        setCountryData([]);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-slate-900 text-white">
      <div className="p-6 bg-white shadow-lg rounded-lg text-black w-full max-w-md mb-6">
        <div className="flex flex-col items-center">
          <input
            type="text"
            className="w-full p-3 mb-4 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:border-blue-500"
            placeholder="Enter a country name here..."
            value={countryName}
            onChange={(e) => setCountryName(e.target.value)}
          />
          <button
            id="search-btn"
            className="w-full p-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition duration-300"
            onClick={fetchCountryData}
          >
            Search
          </button>
        </div>
      </div>

      <div id="result" className="mt-6 w-full max-w-6xl">
        {loading && <h3 className="text-center text-white">Loading...</h3>}
        {errorMessage && (
          <h3 className="text-red-500 text-center">{errorMessage}</h3>
        )}

        {!loading && !errorMessage && countryData.length > 0 && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 xl:grid-cols-5 gap-6 p-4">
            {countryData.map((country, index) => (
              <div
                key={index}
                className="p-6 bg-white text-gray-800 rounded-xl shadow-lg hover:shadow-2xl transition-shadow duration-300 ease-in-out transform hover:scale-105 flex flex-col items-center"
                style={{ height: "400px", width: "220px" }}
              >
                <img
                  src={country.flags.svg}
                  alt={`${country.name.common} flag`}
                  className="w-28 h-20 rounded-lg mb-4 shadow-md border border-gray-200"
                />
                <h2 className="text-lg font-semibold mb-2 text-center text-gray-900">
                  {country.name.common}
                </h2>
                <p className="text-base     text-slate-950  mb-1">
                  <strong>Capital:</strong> {country.capital ? country.capital[0] : "N/A"}
                </p>
                <p className="text-sm  text-slate-950 mb-1">
                  <strong>Population:</strong> {country.population.toLocaleString()}
                </p>
                <p className="text-sm  text-slate-950 mb-1">
                  <strong>Region:</strong> {country.continents[0]}
                </p>
                <p className="text-sm  text-slate-950 mb-1">
                  <strong>Currency:</strong> {country.currencies ? Object.values(country.currencies)[0].name : "N/A"} - {country.currencies ? Object.values(country.currencies)[0].symbol : ""}
                </p>
                <p className="text-sm  text-slate-950 mb-1">
                  <strong>Language:</strong> {country.languages ? Object.values(country.languages).join(", ") : "N/A"}
                </p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default CountryApp;
