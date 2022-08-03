//creates a listener for changes to the ingredients collection in the database
function updateIngredients()
{
   db.collection("ingredients").onSnapshot((snapshot) => { // event that runs when database is changed
        ingredients.length=0;
      snapshot.forEach((doc) => {
          const object = { //creating ingredient object structure
              ingredientName: doc.id,
              information : {
                  category: doc.data().category,
                  measurementType: doc.data().measurementType
              }
          }
          ingredients.push(object);//adding all documents into ingredients[]
          
      })

      //replacing old table elements with new ones
      removeElementsByClass("ingtr");
      makeIngredientTable();
      makeIngredientDropdown();
  })
}

function getOrderAmount(){
    db.collection('orders').doc('OrderAmount').get().then((doc) => {

        OrderAmount = doc.data().num + 1;

        for(var i=1; i < OrderAmount; i++){
            allOrders.push("Order" + i)
        }
        
        getUID();
        // getStudentOrder();
    })
}

$(document).on('change', '#filterList', function() {
    console.log(this.value);
    getUID(this.value)
})

async function getUID(filter){
    allUID.length = 0;
    $("#shoppingList").empty();
    for(var i=0; i < allOrders.length; i++){
        await db.collection('orders').doc(allOrders[i]).get().then((doc) => {
            var array = [allOrders[i], doc.data().uid, doc.data().classCode, doc.data().pracDate];
            allUID.push(array);
        })
    }
    console.log(allUID);
    getOrders(allUID, filter);
}

async function getOrders(allUID, filter){
    var array = [];
    // var object ={

    // }
    for(var i=0; i<allUID.length; i++){
        // array.length = 0;
        await db.collection('orders').doc(allUID[i][0]).collection('ingredients').get().then((snapshot) => {
            snapshot.forEach((doc) => {
                array.push([doc.id, doc.data()]);
                object = {
                    information: {
                        order: `${allUID[i][0]}`,
                        uid: `${allUID[i][1]}`,
                        classCode: `${allUID[i][2]}`,
                        pracDate: `${allUID[i][3]}` 
                    }
                }
                // $("#shoppingList").append("<h2>" + allUID[i][0] + "</h2>")
                // $("#shoppingList").append("<li>" + doc.id + " " + doc.data().quantity + "</li>");
            })
            console.log(array);
            object.ingredients = array;
            allStudentsOrders.push(object);
        })
        array.length = 0;
        console.log(allStudentsOrders);
    }
}

function updateIngredientLists()
{
    db.collection("ingredientLists").onSnapshot((snapshot) => 
    { // event that runs when database is changed
        ingredientLists.length=0;
      snapshot.forEach((doc) => 
      {
          const object = 
          { //creating ingredient object structure
              ingredientListName: doc.id,
              information : 
              {
                  ingredients: doc.data().ingredients,
                  amounts: doc.data().amounts
              }
          }
          ingredientLists.push(object);//adding all documents into ingredients[]
          
      })
      displayIngredientLists();
      updateIngredientListSelect();
    })
    console.log("ingredient lists updated");
}
