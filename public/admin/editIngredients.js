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
  })
}

 //adds rows to the table based off values in ingredients
function makeIngredientTable() 
{
   for (let i=0; i < ingredients.length;i++)
   {
      var row = document.createElement("tr");//row element
      var nam = document.createElement("td");//ingredient name column
      var cat = document.createElement("td");//ingredient category column
      var mes = document.createElement("td");//ingredient measuremnent column
      var del = document.createElement("td");//table element that holds the delete icon
      var delico = document.createElement("img");//delete icon

      //adding classes for styling
      delico.classList.add("delicon");
      del.classList.add("deltable");


      delico.src = "../img/delete.png";//setting delete image
      delico.value=ingredients[i].ingredientName;//storing the ingredient name for use in
      delico.addEventListener('click', DeleteIngredient);//runs delete ingredient when delico is clicked

      //making the table cells display their appropriate values
      nam.innerHTML = ingredients[i].ingredientName;
      cat.innerHTML = ingredients[i].information.category;
      mes.innerHTML = ingredients[i].information.measurementType;
    
      del.appendChild(delico);
      row.classList.add("ingtr");//class is required to remove elements from table on reload

      //adding all the cells to the row
      row.appendChild(nam);
      row.appendChild(cat);
      row.appendChild(mes);
      row.appendChild(del);
      ingredientTable.appendChild(row);//adding the row to the table

   }
}

//deletes the document specified in the value of the element that calls it.
var DeleteIngredient = function ()
{
   db.collection("ingredients").doc(this.value).delete().then(() => { 
        //runs on success
      console.log(this.value + "successfully deleted!");
  }).catch((error) => {
        //runs on failure
      console.error("Error removing document: ", error);
  });
}

//adds an ingredient to the database from the dropdown values
function AddIngredient()
{
   db.collection("ingredients").doc(dropdown_ingName.value).set({
      category: dropdown_ingCat.value,
      measurementType: dropdown_ingMtype.value
   })
   .then(() => {
      console.log("Document successfully written!");
   })
   .catch((error) => {
      console.error("Error writing document: ", error);
   });
}