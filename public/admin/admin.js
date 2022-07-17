var currentpage="shoppingListCont";//variable stores what is shown in maincontent currently
var pagarray = [];//array of elements that are toggled by side buttons
var ingredients = [];
var ingredientLists = [];

//values for ingredient edit
var dropdown_ingMtype;
var dropdown_ingCat;
var dropdown_ingName;
var ingredientTable;
var firstEditIngredientLoad = true;

//values for ingredient list edit
var dropdown_ingList;
var input_ingAmount;
var input_ingListName;
var ingListCont;
var currentIlist = [];
var currentIvalues = [];
var fullIngListCont;

//values for all orders
function getAmountUnit(ingred)
{
   switch(ingred.information.measurementType)
   {
      case "volume":
         return "mL"
      case "weight":
         return "g";
      default:
         return "";
   }
}

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

   //adding the elements that fill maincontent to the pagarray
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
  

   //for ingredient list edit

   dropdown_ingList = document.getElementById("ingListDropdown");
   input_ingAmount = document.getElementById("ingListAmount");
   ingListCont = document.getElementById("ingListCont");
   input_ingListName = document.getElementById("ingListName");
   fullIngListCont = document.getElementById("fullIngListCont");

   //Database Events
   updateIngredients();
   getOrders();
   updateIngredientLists();

}


//changes the content of maincontent
function changepage(newpage)
{

   pagarray[currentpage].style.display = "none";
   currentpage = newpage;
   pagarray[currentpage].style.display = "block";
}

