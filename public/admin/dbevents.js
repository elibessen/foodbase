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
        
        getOrders();
        // getStudentOrder();
    })
}

// $("#filterList").change(function () {
//     console.log("Yo: ", this.value);
// })
$(document).on('change', '#filterList', function() {
    console.log(this.value);
})

async function getOrders(filter){
        // Loops through all of the orders found in the previous for loop
        for(var i=0; i < allOrders.length; i++){
            // Gets all of the ingredients documents in every students orders
            await db.collection('orders').doc(allOrders[i]).get().then((doc) => {
                console.log(doc.data().uid);
                db.collection('orders').doc(allOrders[i]).collection('ingredients').get().then((snapshot) => {
                    snapshot.forEach((doc) => {
                        // Gets the ingredient names and their associated quantity and measurement type
                        db.collection('orders').doc(allOrders[i]).collection('ingredients').doc(doc.id).get().then(snapshot => {
                            // Pushes all of the data into an array for easier processing
                            var array = [doc.id, doc.data().quantity, doc.data().measurementType];
                            // Checks the quantity and appends the correct measurement type
                            
                            console.log(array);
                            
                            switch(array[2]){
                                case 'volume':
                                    $("#shoppingList").append("<li>" + array[0] + " " + array[1] + "mL" + "</li>");
                                    break;
                                case 'weight':
                                    $("#shoppingList").append("<li>" + array[0] + " " + array[1] + "g" + "</li>");
                                    break;
                                default:
                                    $("#shoppingList").append("<li>" + array[0] + " " + array[1] + "x" + "</li>");
                            }
                        })
                    });
                    }) 
            })
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
      displayIngredientLists()
    })
    console.log("ingredient lists updated");
}

// async function getStudentOrder(){
//     var studentsloc = [];
//     db.collection('students').onSnapshot((snapshot) => {
//         snapshot.forEach((doc) => {
//             studentsloc.push(doc.data());
//         })
//         console.log('All student data:', studentsloc);
//     })

//     for(var i=0; i < allOrders.length; i++){

//         await db.collection('orders').doc(allOrders[i]).get().then((doc) => {
//             console.log(doc.data());
//             db.collection('orders').doc(allOrders[i]).collection('ingredients').onSnapshot((snapshot) => {
//                 snapshot.forEach((doc) => {
//                     console.log(doc.id, doc.data());
//                 })
//             })
//         })

//     }
// }