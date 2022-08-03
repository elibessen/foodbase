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
    if (!confirm(`Place Order?`)) return null;
    let list = dropdown_ingredientLists.value;
    let multiplier  = input_orderNum.value;
    let pracDate = input_pracDate.value;
    let listData;
    let classCode = input_classCode.value;
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

    db.collection("orders").doc("Order" + (OrderAmount)).set({
        classCode: classCode,
        pracDate: pracDate,
        pracTitle: `${list} x${multiplier}`,
        uid:uid
     })
     .then(() => {
        for (let i = 0; i < ingredientLists.length; i++)
        {
            if (ingredientLists[i].ingredientListName == list)
            {
                listData = ingredientLists[i];
                break;
            }
        }
        for (i = 0; i < listData.information.ingredients.length; i++){
            db.collection('orders').doc("Order" + (OrderAmount)).collection('ingredients').doc(listData.information.ingredients[i].ingredientName).set({
                category: listData.information.ingredients[i].information.category,
                measurementType: listData.information.ingredients[i].information.measurementType,
                quantity: listData.information.amounts[i] * multiplier
            }).then(() =>{
                console.log("Ingredient Successfully added");
            }).catch(() => {
                alert("An Error Occurred, Order Was Not Placed");
                console.error("Error writing ingredient: ", error);
            });
        }
        db.collection("orders").doc("OrderAmount").set({
            num: OrderAmount
         });
        console.log("Document Successfully Written!");
        alert("Order Has Been Placed");
     })
     .catch((error) => {
        alert("An Error Occurred, Order Was Not Placed");
        console.error("Error writing document: ", error);
     });
    

}