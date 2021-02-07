
const searchBtn = document.getElementById('search-btn');
const mealList = document.getElementById('meal');
const mealDetailsContent = document.querySelector('meal-details-content');
const recipeCloseBtn = document.getElementById('recipe-close-btn');

searchBtn.addEventListener('click', getMealList);
mealList.addEventListener('click', getMealRecipe);
recipeCloseBtn.addEventListener('click', () => {
    mealDetailsContent.parentElement.classList.remove('getRecipe')
})

function getMealList() {
    let searchInputTxt = document.getElementById('search-input').value.trim();
    fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?i=${searchInputTxt}`)
        .then(response => response.json())
        .then(data => {
            let html = "";
            if (data.meals) {
                data.meals.forEach(meal => {
                    html = `
                    
               <div class="meal-item" data-id = "${meal.idMeal}">
                    <div class="meal-image">
                        <img src="${meal.strMealThumb}" alt="food">
                    </div>
                    <div class="meal-name">
                        <h3> ${meal.strMeal}</h3>
                        <a href="getRecipe" class="recipe">Get recipe</a>
                    </div>
                </div> 
           
           `;
            });
            mealList.classList.remove('notFound');
            }
            else{
                html= "Sorry, no meal matched!";
                mealList.classList.add('notFound');
            }
            mealList.innerHTML = html;
        });

}
function getMealRecipe(e){
    e.preventDefault();
    if(e.target.classList.contains('recipe-btn')){
        let mealItem = e.target.parentElement.parentElement;
        fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealItem.dataset.id}`)
        .then(response => response.json())
        .then(data => mealRecipeModal(data.meals));
    }
}

function mealRecipeModal(meals){
    console.log(meals);
    meal = meals[0];
    let html = `
    <div class="meal-details-content">  
        <h2 class="recipe-title">${meal.strMeal}</h2>
        <p class="recipe-category">${meal.strCategory}</p>
    <div class="instruct">
        <h3>Details:</h3>
        <p>${meal.strInstructions}</p>
    </div>
    <div class="recipe-meal-img">
        <img src="${meal.strMealThumb}" alt="">
    </div>
    </div>
    `
    mealDetailsContent.innerHTML = html;
    mealDetailsContent.parentElement.className.add('getRecipe');
}
