const resultContainer = document.getElementById("result");
const searchBtn = document.getElementById("search-button");
const searchInput = document.getElementById("search-input");
const seachContainer = document.querySelector("search-box");

// Api url to fetch meal data
const apiUrl = "https://www.themealdb.com/api/json/v1/1/search.php?s=";

// Event listeners for search and input (when press enter)
searchBtn.addEventListener("click", searchMeal);
searchInput.addEventListener("keydown", (e) => {
  if (e.keyCode === 13) {
    e.preventDefault();
    searchMeal();
  }
});

// Handle meal function
function searchMeal() {
  const userInput = searchInput.value.trim();
  if (!userInput) {
    resultContainer.innerHTML = `<h3>Input Field Cannot Be Empty</h3>`;
    return;
  }

  // Fetch meal data using api with user input
  fetch(apiUrl + userInput)
    .then((response) => response.json())
    .then((data) => {
      const meal = data.meals[0];

      if (!meal) {
        resultContainer.innerHTML = `<h3>No Meal Found, Please Try Again!</h3>`;
        return;
      }

      const ingredients = getIngredients(meal);
      // Generate Html to display meal data
      const recipeHtml = `
        <div class="details">
          <h2>${meal.strMeal}</h2>
          <h4>${meal.strArea}</h4>
        </div>
        <img src=${meal.strMealThumb} alt=${meal.strMeal} />
        <div id="ingre-container">
          <h3>Ingredients:</h3>
          <ul>${ingredients}</ul>
        </div>
        <div id="recipe">
          <button id="hide-recipe">X</button>
          <pre id="instructions">${meal.strInstructions}</pre>
        </div>
        <button id="show-recipe">View Recipe</button>
      `;
      resultContainer.innerHTML = recipeHtml;
    });
}
