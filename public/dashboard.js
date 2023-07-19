// Make an HTTP GET request to the server-side route that handles the getRecipesByUser function
fetch('/recipe/getUserRecipes')
    .then(response => response.json())
    .then(recipes => {

        // Check if there are any recipes
        if (recipes.length > 0) {

            const titleElement = document.createElement('h2');
            titleElement.textContent = 'Your recipes';
            document.body.appendChild(titleElement);

            recipes.forEach(recipe => {
                // Create a new div element for each recipe
                const recipeElement = document.createElement('div');
                recipeElement.classList.add('recipe');

                recipeElement.innerHTML = `
                    <h2>${recipe.title}</h2>
                    <h3>Description:</h3>
                    <p>${recipe.description}</p>
                    <h3>Time:</h3>
                    <p>${recipe.time}</p>
                    <h3>Serving Size:</h3>
                    <p>${recipe.servingSize}</p>
                `;

                // Add the recipeElement to the page
                document.body.appendChild(recipeElement);
            });
        } else {
            // If no recipes
            const messageElement = document.createElement('div');
            messageElement.classList.add('no-recipes');
            messageElement.innerHTML = `
                <h2>Your recipes will appear here</h2>
            `;
            document.body.appendChild(messageElement);
        }
    });
