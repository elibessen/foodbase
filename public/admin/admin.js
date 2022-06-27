var currentpage="shoppingListCont";
var pagarray = [];
var ingredients = [];
//for ingredient edit

var dropdown_ingMtype;
var dropdown_ingCat;
var dropdown_ingName;
var ingredientTable;
var firstEditIngredientLoad = true;
//
function removeElementsByClass(className){
   const elements = document.getElementsByClassName(className);
   while(elements.length > 0){
       elements[0].parentNode.removeChild(elements[0]);
   }
}

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
   //ingredients[i].ingredientName);});
   updateIngredients();
   makeIngredientTable();

}

function changepage(newpage)
{

   pagarray[currentpage].style.display = "none";
   currentpage = newpage;
   pagarray[currentpage].style.display = "block";
   switch (currentpage)
   {
      case "editIngredientsCont":
         if (firstEditIngredientLoad)
         {
            firstEditIngredientLoad = !firstEditIngredientLoad;
            makeIngredientTable();
         }
         break;
   }
}

