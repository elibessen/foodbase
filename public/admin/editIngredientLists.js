function makeIngredientDropdown()
{
    for (i=0;i<ingredients.length;i++)
    {
        var option = document.createElement("option");
        option.innerHTML = ingredients[i].ingredientName;
        option.value = i;
        option.classList.add("ingtr");
        dropdown_ingList.appendChild(option)
    }
}

function AddToIngredientList()
{
    if (currentIlist.includes(dropdown_ingList.value))
    {
        currentIvalues[currentIlist.indexOf(dropdown_ingList.value)] = input_ingAmount.value;
    }
    else
    {
        currentIlist.push(dropdown_ingList.value);
        currentIvalues.push(input_ingAmount.value);
    }
    console.log(currentIlist);
    makeCurrentIngredientList();
}

function makeCurrentIngredientList()
{
    removeElementsByClass("ciSpan");
    for (i=0;i<currentIlist.length;i++) {
        let entry =  document.createElement("span");
        entry.innerHTML = `•${ingredients[currentIlist[i]].ingredientName} - ${currentIvalues[i]}${getAmountUnit(ingredients[currentIlist[i]])}`;
        console.log(entry.innerHTML);
        entry.classList.add("ciSpan");
        ingListCont.appendChild(entry);

    }

}
function AddIngredientList()
{
    let temparray = [];
    for (i = 0; i < currentIlist.length; i++)
    {
        temparray.push(ingredients[currentIlist[i]]);
    }
    db.collection("ingredientLists").doc(input_ingListName.value).set({
        ingredients: temparray,
        amounts: currentIvalues
     })
     .then(() => {
        console.log("Document successfully written!");
     })
     .catch((error) => {
        console.error("Error writing document: ", error);
     });
}