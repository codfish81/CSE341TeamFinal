//Front end js

function getYourRecipes() {
    app.get('/check-login', (req, res) => {
        let myRecipes;
        if (req.isAuthenticated()) {
            // User is logged in
            document.getElementById('myRecipes').textContent = myRecipes;
        } else {
            // User is not logged in
        }
    });
}