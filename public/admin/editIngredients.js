function updateIngredients()
{
   ingredients = [];
   console.log(ingredients);
   db.collection("ingredients").onSnapshot((snapshot) => {
      snapshot.forEach((doc) => {
          const object = { // Basic object structure
              ingredientName: doc.id,
              information : {
                  category: doc.data().category,
                  measurementType: doc.data().measurementType
              }
          }

          ingredients.push(object);
      })
  })
  console.log(ingredients);
}

function makeIngredientTable()
{
   for (let i=0; i < ingredients.length;i++)
   {
      var row = document.createElement("tr");
      var nam = document.createElement("td");
      var cat = document.createElement("td");
      var mes = document.createElement("td");
      var del = document.createElement("td");
      var delico = document.createElement("img");
      delico.classList.add("delicon");
      delico.src = "../img/delete.png";
      delico.value=ingredients[i].ingredientName;
      delico.addEventListener('click', DeleteIngredient);
      del.classList.add("deltable");
      nam.innerHTML = ingredients[i].ingredientName;
      cat.innerHTML = ingredients[i].information.category;
      mes.innerHTML = ingredients[i].information.measurementType;
     del.appendChild(delico);
      row.classList.add("ingtr");
      row.appendChild(nam);
      row.appendChild(cat);
      row.appendChild(mes);
      row.appendChild(del);
      ingredientTable.appendChild(row);

   }
}

var DeleteIngredient = function ()
{
   console.log(this.value)
   db.collection("ingredients").doc(this.value).delete().then(() => {
      console.log(this.value + "successfully deleted!");
  }).catch((error) => {
      console.error("Error removing document: ", error);
  });
}

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
   removeElementsByClass("ingtr");
   makeIngredientTable();
}