var currentpage="shoppingListCont";
var pagarray = [];
var ingredients = [];
//for ingredient edit

var dropdown_ingMtype;
var dropdown_ingCat;
var dropdown_ingName;
var ingredientTable;
//
function adminOnload()
{
   var page = document.getElementById("page");
   console.log(page.style.display)
   page.style.display = "flex";
   pagarray["shoppingListCont"] = document.getElementById("shoppingListCont");
   pagarray["studentOrdersCont"] = document.getElementById("studentOrdersCont");
   pagarray["editOrdersCont"] = document.getElementById("editOrdersCont");
   pagarray["addOrderCont"] = document.getElementById("addOrderCont");
   pagarray["editIListsCont"] = document.getElementById("editIListsCont");
   pagarray["editIngredientsCont"] = document.getElementById("editIngredientsCont");

   //for ingredient edit
   dropdown_ingCat = document.getElementById("ingCat");
   dropdown_ingName = document.getElementById("ingName");
   dropdown_ingMtype = document.getElementById("ingMtype");
   ingredientTable = document.getElementById("ingredientTable");
   //
  updateIngredients();


}
function changepage(newpage)
{
   pagarray[currentpage].style.display = "none";
   currentpage = newpage;
   pagarray[currentpage].style.display = "block";
};
function updateIngredients()
{
   ingredients = [];
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
          console.log(ingredients);
      })
  })
}
function AddIngredient()
{
   /*await setDoc(doc(db, "ingredients", dropdown_ingName.value), {
      category: dropdown_ingCat.value,
      measurementType: dropdown_ingMtype.value
    });*/


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