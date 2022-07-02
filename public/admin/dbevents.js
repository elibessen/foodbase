//creates a listener for changes to the ingredients collection in the database
function updateIngredients()
{
   db.collection("ingredients").onSnapshot((snapshot) => { // event that runs when database is changed
        ingredients.length=0;
      snapshot.forEach((doc) => {
          const object = { //creating ingredient object structure
              ingredientName: doc.id,
              information : {
                  category: doc.data().category,
                  measurementType: doc.data().measurementType
              }
          }
          ingredients.push(object);//adding all documents into ingredients[]
          
      })

      //replacing old table elements with new ones
      removeElementsByClass("ingtr");
      makeIngredientTable();
      makeIngredientDropdown();
  })
}
function updateIngredientLists()
{
    db.collection("ingredientLists").onSnapshot((snapshot) => 
    { // event that runs when database is changed
        ingredientLists.length=0;
      snapshot.forEach((doc) => 
      {
          const object = 
          { //creating ingredient object structure
              ingredientListName: doc.id,
              information : 
              {
                  ingredients: doc.data().ingredients,
                  amounts: doc.data().amounts
              }
          }
          ingredientLists.push(object);//adding all documents into ingredients[]
          
      })
      displayIngredientLists()
    })
    console.log(ingredientLists);
}
