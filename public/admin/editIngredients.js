
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
   if (!confirm(`Delete ${this.value}?`)) {
      return null;
   }
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
   let indb;
   for (let i = 0; i < ingredients.length; i++)
   {
      indb = ingredients[i].ingredientName == dropdown_ingName.value;
      if (indb) break;
   }
   if (indb)
   {
      if (!confirm(`Overwrite ${dropdown_ingName.value}?`)) 
      {
         return null;
      }
   }
   db.collection("ingredients").doc(dropdown_ingName.value).set({
      category: dropdown_ingCat.value,
      measurementType: dropdown_ingMtype.value
   })
   .then(() => {
      console.log("Document successfully written!");
      alert("Ingredient Added");
   })
   .catch((error) => {
      console.error("Error writing document: ", error);
      alert("An Error Occurred, Ingredient Was Not Added");
   });
}