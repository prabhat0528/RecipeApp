const searchBox=document.querySelector('.searchBox');
const searchBtn=document.querySelector('.searchBtn');

const recipeContainer=document.querySelector('.recipeContainer');
const recipeDetailsContent=document.querySelector('.recipeDetailsContent');
const closeBtn=document.querySelector('.closeBtn');

const fetchRecipe = async (name) => {
    recipeContainer.innerHTML="Fetching Recipes...";
    try{
    const data = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${name}`);
    // console.log(data); // Log the raw response to see its status and content
    const response = await data.json();
    recipeContainer.innerHTML="";

    response.meals.forEach(meal=>{
        // console.log(meal);
        const recipeDiv=document.createElement('div');
        recipeDiv.classList.add('recipe');
        recipeDiv.innerHTML=`
        <img src="${meal.strMealThumb}">
        <h1>${meal.strMeal}</h1>
        <p>${meal.strArea}</p>
        <p>${meal.strCategory}</p>
        `
        const button=document.createElement('button');
        button.innerText='View Recipe';
        recipeDiv.appendChild(button);
        button.addEventListener('click',()=>{
            openRecipePopup(meal);
        })

        recipeContainer.appendChild(recipeDiv);
    })
}
catch(error){
    recipeContainer.innerHTML="Error in fetching recipes";
}
};

const fetchIngredients=(meal)=>{
    let ingredientList="";
    for(let i=1;i<=20;i++){
        const ingredient=meal[`strIngredient${i}`];
        if(ingredient){
            const measure=meal[`strMeasure${i}`];
            ingredientList+=`<li>${measure} ${ingredient}`;
        }
        else{
            break;
        }
    }
    return ingredientList;
}

const openRecipePopup=(meal)=>{
    recipeDetailsContent.innerHTML=`
    <h2 class="recipeName">${meal.strMeal}</h2>
    <h3>Ingredients:</h3>
    <ul class="IngredientList">${fetchIngredients(meal)}</ul>
    <div class="instructions">
    <h3>Instructions: </h3>
    <p >${meal.strInstructions}</p>
    </div>

    `
    recipeDetailsContent.parentElement.style.display="block";
    // console.log('button clicked');
    console.log(recipeDetailsContent.parentElement);
}

closeBtn.addEventListener('click',()=>{
    recipeDetailsContent.parentElement.style.display="none";
});
searchBtn.addEventListener('click',(e)=>{
    e.preventDefault();
    
    const searchInput= searchBox.value.trim();

    if(!searchInput){
        recipeContainer.innerHTML=`<h2>Type the meal in the search box</h2>`;
        return;
    }
    fetchRecipe(searchInput);
    // console.log('Button Clicked');
})