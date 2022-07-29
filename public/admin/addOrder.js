function updateIngredientListSelect()
{
    removeElementsByClass("iListSelRem");
    for (let i = 0; i < ingredientLists.length; i++)
    {
        let option = document.createElement("option");
        option.classList.add("iListSelRem");
        option.innerHTML = ingredientLists[i].ingredientListName;
        dropdown_ingredientLists.appendChild(option);
    }
    
}
async function addOrderFromList()
{
    let list = dropdown_ingredientLists.value;
    let multiplier  = input_orderNum.value;
    let pracDate = input_pracDate.value;
    let user;
    await users.doc(auth.currentUser.uid).get().then((doc) => {
        if(doc.exists) {
            user = doc.data().username.toUpperCase();
        } 
        else {
            user = null;
        }
      
    })

    console.log(auth.currentUser.email);
    let uid = auth.currentUser.uid;
    console.log(`${list} x${multiplier} ${pracDate} ${user} ${uid}`);
    

}