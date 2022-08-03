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
    })
}

$(document).on('change', '#filterList', function() {
    writeShoppingList(this.value);
})

async function getUID(){
    allUID.length = 0;
    $("#shoppingList").empty();
    for(var i=0; i < allOrders.length; i++){
        await db.collection('orders').doc(allOrders[i]).get().then((doc) => {
            var array = [allOrders[i], doc.data().uid, doc.data().classCode, doc.data().pracDate];
            allUID.push(array);
        })
    }
    getOrders(allUID);
}

async function getOrders(allUID){
    var array = [];
    var arrayCopy = [];
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
                db.collection('students').where("uid", "==", allUID[i][1]).get().then((snapshot) => {
                    snapshot.forEach((doc) => {
                        object.information.name = `${doc.data().username}`
                    })
                })
                db.collection('users').where("uid", "==", allUID[i][1]).get().then((snapshot) => {
                    snapshot.forEach((doc) => {
                        object.information.name = `${doc.data().username}`
                    })
                })
            })
            arrayCopy = [...array];
            object.ingredients = arrayCopy;
            allStudentsOrders.push(object);
        })
        array.length = 0;
    }
    writeShoppingList('');
}

function writeShoppingList(filter){
    $("#shoppingList").empty();
    switch(filter){
        case 'uid'  :
            filterByName();
            break;
        case 'pracDate':
            filterByDate();
            break;
        case 'classCode':
            filterByClass();
            break;
        default:
            filterByAll();
            return 'all';
    }
}

function filterByName(){
    $("#shoppingList").empty();
    var object = {

    }
    for(var i=0; i<allStudentsOrders.length; i++){
        $("#shoppingList").append("<h3>" + allStudentsOrders[i].information.name + ":" + "</h3>");
        for(var j=0; j<allStudentsOrders[i].ingredients.length; j++){
            $("#shoppingList").append("<li>" + allStudentsOrders[i].ingredients[j][0]);
        }
    }
    // Do stuff
}

function filterByDate(){
    $("#shoppingList").empty();
}

function filterByClass(){
    $("#shoppingList").empty();
}

function filterByAll(){
    $("#shoppingList").empty();
    for(var i=0; i<allStudentsOrders.length; i++){
        for(var j=0; j<allStudentsOrders[i].ingredients.length; j++){
            function checkQuantity(){
                switch(allStudentsOrders[i].ingredients[j][1].measurementType){
                    case 'weight':
                        return 'grams';
                    case 'count':
                        return 'x'
                    case 'volume':
                        return 'mL'
                    default:
                        return ''
                }
            }
            var quantityType = checkQuantity();
            $("#shoppingList").append("<li>" + allStudentsOrders[i].ingredients[j][0] + " " + allStudentsOrders[i].ingredients[j][1].quantity + quantityType + "</li>");
        }
    }
}

// function checkFilter(filter){
//     switch(filter){
//         case 'uid':
//             return 'uid';
//         case 'pracDate':
//             return 'pracDate';
//         case 'classCode':
//             return 'classCode';
//         default:
//             return 'all';
//     }
// }

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
    console.log("Ingredient lists updated!");
}