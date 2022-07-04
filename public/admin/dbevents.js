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

function getOrders(){
    var OrderAmount;
    var allOrders = [];


    db.collection('orders').doc('OrderAmount').get().then((doc) => {

        OrderAmount = doc.data().num + 1;
        for(var i=1; i < OrderAmount; i++){
            allOrders.push("Order" + i);
        }
        console.log(allOrders);

        for(var i=0; i < allOrders.length; i++){
            db.collection('orders').doc(allOrders[i]).collection('ingredients').get().then((snapshot) => {
            snapshot.forEach((doc) => {
                db.collection('orders').doc(allOrders[i]).collection('ingredients').doc(doc.id).get().then(snapshot => {
                    var array = [doc.id, doc.data().quantity, doc.data().measurementType]
                    switch(array[2]){
                        case 'volume':
                            $("#shoppingList").append("<li>" + array[0] + " " + array[1] + "mL" + "</li>");
                            break;
                        case 'weight':
                            $("#shoppingList").append("<li>" + array[0] + " " + array[1] + "g" + "</li>");
                            break;
                        default:
                            $("#shoppingList").append("<li>" + array[0] + " " + array[1] + "x" + "</li>");
                            break;
                    }
                })
            });
            }) 
         }
    })
}