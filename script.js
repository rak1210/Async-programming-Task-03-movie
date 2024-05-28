document.getElementById('searchForm').addEventListener('submit', function(event) {
    event.preventDefault();
    const searchTerm = document.getElementById('searchInput').value.trim();
    if (searchTerm === '') {
      alert('Please enter a search term');
      return;
    }
    searchMoviesAndShows(searchTerm)
      .then(displayResults)
      .catch(error => {
        console.error('Error fetching data:', error);
        alert('An error occurred while fetching data. Please try again later.');
      });
  });
  
  function searchMoviesAndShows(searchTerm) {
    const apiKey = 'wz5LmvRrmkGBQu3KTtGOanzN1RktvhL5vIw5ydAN';
    const url = `https://api.watchmode.com/v1/autocomplete-search/?apiKey=${apiKey}&search_value=${encodeURIComponent(searchTerm)}&search_type=1`;
    return fetch(url)
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then(data => data.results)
      .catch(error => {
        throw error;
      });
  }
  
  function displayResults(results) {
    const searchResultsContainer = document.getElementById('searchResults');
    searchResultsContainer.innerHTML = '';
    if (results.length === 0) {
      searchResultsContainer.innerHTML = '<p>No results found</p>';
      return;
    }
    const searchTerm = document.getElementById('searchInput').value.trim();
    const filteredResults = results.filter(result => result.name.toLowerCase() === searchTerm.toLowerCase());
    if (filteredResults.length === 0) {
      searchResultsContainer.innerHTML = '<p>No results found for this search term</p>';
      return;
    }
    const result = filteredResults[0];
    const resultElement = document.createElement('div');
    resultElement.classList.add('result');
    resultElement.innerHTML = `
      <h3>${result.name}</h3>
      <p>Type: ${result.type}</p>
      <p>Year: ${result.year}</p>
      <p>relevance: ${result.relevance}</p>
      <p>ID: ${result.id}</p>
      <p>tmdb_type: ${result.tmdb_type}</p>
      <img src="${result.image_url}" alt="${result.name}">
    `;
    searchResultsContainer.appendChild(resultElement);
  }