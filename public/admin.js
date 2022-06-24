var currentpage="shoppingListCont";
var pagarray = [];

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


}
function changepage(newpage)
{
   pagarray[currentpage].style.display = "none";
   currentpage = newpage;
   pagarray[currentpage].style.display = "block";
};