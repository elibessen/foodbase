
// creates the option elements for the editor ingredient dropdown from database values
//(run on database.ingredients reload)
function makeIngredientDropdown() 
{
    //iterating through each ingredient and creating an option for each
    for (i=0;i<ingredients.length;i++)
    {
        var option = document.createElement("option"); //creating the element 
        option.innerHTML = ingredients[i].ingredientName;
        option.value = i; //storing the index of this item in the ingredients array
        option.classList.add("ingtr"); //adding class for easy removal on database reload
        dropdown_ingList.appendChild(option); //add the option to the html
    }
}

//adds an ingredient from the editior inputs to the current edited ingredient list
//(run on button press)
function AddToIngredientList()
{
    //if the ingredient in the dropdown is already in the current ingredient list update the amount
    if (currentIlist.includes(dropdown_ingList.value))
    {
        currentIvalues[currentIlist.indexOf(dropdown_ingList.value)] = input_ingAmount.value;
    }

    //if dropdown ingredient is not in list add both the ingredient and amount to the list
    else
    {
        currentIlist.push(dropdown_ingList.value);
        currentIvalues.push(input_ingAmount.value);
    }

    //update the current ingredient list
    makeCurrentIngredientList();
}

//updates the content of the current ingredient list in the editor to match currentIvalues and currentIlist
//(run on function call)
function makeCurrentIngredientList()
{
    removeElementsByClass("ciSpan"); //removing all elements previously created by this function

    //create all necessary elements for each ingredient in list such as text and delete
    for (i=0;i<currentIlist.length;i++) 
    {
        //creating all neccessary elements 
        let trow = document.createElement("tr"); //new row for data and delete
        let entrydata = document.createElement("td"); //container for text 
        let deletedata = document.createElement("td"); //container for delete icon 
        let smldelico  = document.createElement("img"); //delete icon

        //setting up delete element
        smldelico.classList.add("delicon"); //for styling
        smldelico.src = "../img/delete.png"; //setting delete image
        smldelico.value = i; //storing the index in currentIlist for use in function
        smldelico.addEventListener('click', DeleteCurrentIngredient); //adds a listener to run DeleteCurrentIngredient on click

        //removing border from table
        entrydata.classList.add("noborder");
        trow.classList.add("noborder");
        deletedata.classList.add("noborder");

        //creating text element for ingredient name and amount
        let entry =  document.createElement("span"); 

        //setting text in format •<ingredientName> - <ingredientAmount><ingredientUnit>
        entry.innerHTML = `•${ingredients[currentIlist[i]].ingredientName} - ${currentIvalues[i]}${getAmountUnit(ingredients[currentIlist[i]])}`; 

        trow.classList.add("ciSpan"); //setting row to delete on function call

        //adding all elements to row 
        entrydata.appendChild(entry);
        deletedata.appendChild(smldelico);
        trow.appendChild(entrydata);
        trow.appendChild(deletedata);

        //adding row to table
        ingListCont.appendChild(trow);

    }

}


//adds the current ingredient list to the database
function AddIngredientList()
{
    let indb;
   for (let i = 0; i < ingredientLists.length; i++)
   {
      indb = ingredientLists[i].ingredientListName == input_ingListName.value;
      if (indb) break;
   }
   if (indb)
   {
      if (!confirm(`Overwrite ${input_ingListName.value}?`)) 
      {
         return null;
      }
   }



    // array of ingredients described by currentIlist
    let temparray = []; 

    //populate temparray
    for (i = 0; i < currentIlist.length; i++) 
    {
        temparray.push(ingredients[currentIlist[i]]);
    }

    //add ingredient list to database
    db.collection("ingredientLists").doc(input_ingListName.value).set({
        ingredients: temparray,
        amounts: currentIvalues
    })
     .then(() => { // runs on succsess
        console.log("Document successfully written!");
    })
     .catch((error) => {//runs on failure
        console.error("Error writing document: ", error);
    });

    //clearing the editor 
    currentIlist.length = 0; 
    currentIvalues.length = 0;
    input_ingListName.value = "";
    makeCurrentIngredientList();
}

//updates the ingredient list displays based off database
//(run on database.ingredientLists ) 
function displayIngredientLists()
{
    removeElementsByClass("rmIngList"); //removing all elements created by this function
    
    //create elements for each ingredient list in array 
    for (let i = 0; i < ingredientLists.length; i++)
    {
        let ingContainer = document.createElement("div"); //now table element
        
        //set classes for ingContainer
        ingContainer.classList.add("rmIngList"); // class to mark removal 
        ingContainer.classList.add("ingListContainer");  //class for styling 
        ingContainer.classList.add("cflex"); // make column flexbox

        let deletecolumn = document.createElement("div");
        deletecolumn.classList.add("rflex");

        var delico = document.createElement("img"); //delete icon
        delico.classList.add("delicon"); //class for styling
        delico.src = "../img/delete.png"; //setting delete image
        delico.value = ingredientLists[i].ingredientListName; //storing the ingredient list name for use in function
        delico.addEventListener('click', DeleteIngredientList); //runs delete ingredient list when delico is clicked

        var editico = document.createElement("img"); //edit icon
        editico.classList.add("delicon");
        editico.src = "../img/edit.svg"; //setting delete image
        editico.value = ingredientLists[i]; //storing the ingredient List for use in function
        editico.addEventListener('click', EditIngredientList); //runs EditIngredient lists on click 
        
        let ingListHeader = document.createElement("h5"); // name of ingredient lists
        ingListHeader.innerHTML = ingredientLists[i].ingredientListName;

        //adding the delete, edit icons and header to the list 
        deletecolumn.appendChild(ingListHeader);
        deletecolumn.appendChild(delico);
        deletecolumn.appendChild(editico);
        ingContainer.appendChild(deletecolumn);

        //creating, populating, and inserting text elements.
        try{
            for (let j = 0; j < ingredientLists[i].information.ingredients.length; j++)
            {
                let line = document.createElement("span");
                line.innerHTML = `•${ingredientLists[i].information.ingredients[j].ingredientName} - ${ingredientLists[i].information.amounts[j]}${getAmountUnit(ingredientLists[i].information.ingredients[j])} `;
                ingContainer.appendChild(line);
            }
            
            fullIngListCont.appendChild(ingContainer); //adding list element to list container
            }
        catch
        {
            continue;
        }
    }
}

//deletes ingredient List from database
//(run on button click)
var DeleteIngredientList = function ()
{
    if (!confirm(`Delete ${this.value}?`)) return null;
   db.collection("ingredientLists").doc(this.value).delete().then(() => { 
        //runs on success
      console.log(this.value + "successfully deleted!");
  }).catch((error) => {
        //runs on failure
      console.error("Error removing document: ", error);
  });
}

//removes ingredient from current ingredientList editor 
//(run on button click)
var DeleteCurrentIngredient = function ()
{   
    //remove value from current ingredient list 
    currentIlist.splice(parseInt(this.value), 1);
    currentIvalues.splice(parseInt(this.value), 1);

    //reload current ingredient List 
    makeCurrentIngredientList();
}

//copies all data from database ingredient list into current ingredient list
var EditIngredientList = function ()
{
    input_ingListName.value = this.value.ingredientListName;//set input name to ingredient name

    //populate currentIlist with values from database
    for (i = 0; i < this.value.information.ingredients.length; i++)
    {
        for (j = 0; j < ingredients.length; j++)
        {
            if(this.value.information.ingredients[i].ingredientName == ingredients[j].ingredientName)
            {
                currentIlist[i] = j.toString();
            }
        }
    }
    
    //copy database amounts into currentIvalues
    currentIvalues = [...this.value.information.amounts];

    //reload current Ingredient list
    makeCurrentIngredientList();

}