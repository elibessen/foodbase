// Making some arrays and variables have a global scope before use.
var ingredients = [];
var items = []
var orderAmount = [];

var ingredientNum = -1;
var orderNum;

var isMiscItem = false;

// The specific collection needed for orders
const orders = db.collection('orders');

// Making the 'order submitted' text hide
document.querySelector('#buffer').style.display = 'none';
// Making the page hidden before use, stops people from ordering without logging in
document.querySelector("#form-content").style.display = 'none';
// Making the add misc items hidden
$("#misc-input").hide();

// This function only runs when the user has logged in

function studentOnLoad()
{

    // When the student login, the page content with be shown
   document.querySelector("#form-content").style.display = ''

    // Gets all the documents in the collection
    // Gets each ingredient and its associated fields
    // The data from the database gets sorted into an object
    // Pushes the object into an array for easier processing
    // Loops through each array element and creats a drop down element
    
    db.collection("ingredients").onSnapshot((snapshot) => {
        ingredients.length = 0;
        $("#dropdown-items").empty();
        snapshot.forEach((doc) => {

            const object = { // Basic object structure
                ingredientName: doc.id,
                information : {
                    category: doc.data().category,
                    measurementType: doc.data().measurementType
                }
            }
            ingredients.push(object);
            console.log(ingredients);
        })
        createDropdown();
    })

    // This function creates the elements within the 'dropdown'
    // It loops through every ingredient in the array
    // Then it appends a new element within the dropdown div with the name of the ingredients
    // Added data to these elements through the use of 'data-'
    // Which makes it easier to transfer data from another function to another

    function createDropdown(){
        const svg = '<svg style="float: right;" width="24" height="24" style="fill: rgba(0, 0, 0, 1);"><path d="M13 7h-2v4H7v2h4v4h2v-4h4v-2h-4z"></path><path d="M12 2C6.486 2 2 6.486 2 12s4.486 10 10 10 10-4.486 10-10S17.514 2 12 2zm0 18c-4.411 0-8-3.589-8-8s3.589-8 8-8 8 3.589 8 8-3.589 8-8 8z"></path></svg>'
        $("#dropdown-items").append("<a style='padding: 0.8rem 0.8rem' id='dropdown-element-misc' onclick='miscItem()'>Add Misc Item</a>");
        for(var i=0; i < ingredients.length; i++){
            // console.log(ingredients[i].information['category']);
            $("#dropdown-items").append("<a style='padding: 0.8rem 0.8rem' id='dropdown-element' onclick='addToCart(this)' data-category-type=" + `${ingredients[i].information['category']}` + " data-measurement-type=" + ingredients[i].information['measurementType'] + ">" + ingredients[i].ingredientName + svg + "</a>");
        }
    };  
}

function miscItem(){
    if(isMiscItem === false){
        $("#misc-input").hide()
        isMiscItem = true;
    } else {
        $("#misc-input").show()
        isMiscItem = false;
    }
}

// Gets the number of orders from the database

orders.doc("OrderAmount").get().then((doc) => {
    orderNum = doc.data();
})

// This function filters through the dropdown elements on keyup through the input element

function filter() {
    var input, filter, ul, li, a, i;
    input = document.getElementById("itemSearch");
    filter = input.value.toUpperCase();
    div = document.getElementById("searchableDropdown");
    a = div.getElementsByTagName("a");
    for (i = 0; i < a.length; i++) {
      txtValue = a[i].textContent || a[i].innerText;
      if (txtValue.toUpperCase().indexOf(filter) > -1) {
        a[i].style.display = "";
      } else {
        a[i].style.display = "none";
      }
    }
  }


// This function adds ingredients, selected by the user, and adds it to a list. 

function addToCart(element){
    console.log(orderNum.num);
    const svg = '<svg onclick=removeFromCart(this) style="float: right;" width="24" height="24" style="fill: rgba(0, 0, 0, 1)"><path d="M7 11h10v2H7z"></path><path d="M12 2C6.486 2 2 6.486 2 12s4.486 10 10 10 10-4.486 10-10S17.514 2 12 2zm0 18c-4.411 0-8-3.589-8-8s3.589-8 8-8 8 3.589 8 8-3.589 8-8 8z"></path></svg>'
    var info = [element.textContent, element.getAttribute("data-category-type"), element.getAttribute("data-measurement-type")];
    console.log(info);
    items.push(info); // Pushes the info from the ingredient into another array, for easier processign
    console.log("Item list:", items);
    // Increases the amount of ingredients by 1
    ingredientNum++;
    // Checks whether the measurement type is weight, volume or neither, then it appends a list item to the list 
    switch(info[2]){
        case 'weight':
            $("#shopping-items").append('<li style="padding: 0.4rem 0.4rem;" id='+ ingredientNum  +'>' + info[0] + svg + '<input style="width: 25%; border: none; border-bottom: 1px solid black; float: right;" placeholder="Grams" onkeyup="updateQuantity(this)">' + '</li>');
            break;
        case 'volume':
            $("#shopping-items").append('<li style="padding: 0.44rem 0.4rem;" id='+ ingredientNum  +'>' + info[0] + svg + '<input style="width: 25%; border: none; border-bottom: 1px solid black; float: right;" placeholder="mL" onkeyup="updateQuantity(this)">' + '</li>');
            break;
        default:
            $("#shopping-items").append('<li style="padding: 0.4rem 0.4rem;" id='+ ingredientNum  +'>' + info[0] + svg + '<input style="width: 25%; border: none; border-bottom: 1px solid black; float: right" placeholder="Amount" onkeyup="updateQuantity(this)">' + '</li>');
    }
}

// This function removes ingredients from the user when they click on the minus symbol

function removeFromCart(element){
    const svg = '<svg onclick=removeFromCart(this) style="float: right;" width="24" height="24" style="fill: rgba(0, 0, 0, 1)"><path d="M7 11h10v2H7z"></path><path d="M12 2C6.486 2 2 6.486 2 12s4.486 10 10 10 10-4.486 10-10S17.514 2 12 2zm0 18c-4.411 0-8-3.589-8-8s3.589-8 8-8 8 3.589 8 8-3.589 8-8 8z"></path></svg>'
    console.log("id", $(element).parent().attr('id'))
    // This is why the ingredientNum from addToCart() is important
    // The app knows which ingredient to remove from the array 
    items.splice($(element).parent().attr('id'), 1);
    // Emptys the div with all the ingredients
    $("#shopping-items").empty();
    // Resets the ingredientNum
    ingredientNum = -1;
    // Loops through the list of ingredients again and appends them with the appropriate ingredientNum
    // This was necessary to remove issues with removing ingredients after the first one is removed.
    for(var i=0; i < items.length; i++){
        ingredientNum++;
        switch(items[i][2]){
            case 'weight':
                $("#shopping-items").append('<li style="padding: 0.4rem 0.4rem;" id='+ ingredientNum  +'>' + items[i][0] + svg + '<input style="width: 25%; border: none; border-bottom: 1px solid black; float: right;" placeholder="Grams" onkeyup="updateQuantity(this)">' + '</li>');                
                break;
            case 'volume':
                $("#shopping-items").append('<li style="padding: 0.44rem 0.4rem;" id='+ ingredientNum  +'>' + items[i][0] + svg + '<input style="width: 25%; border: none; border-bottom: 1px solid black; float: right;" placeholder="mL" onkeyup="updateQuantity(this)">' + '</li>');
                break;
            default:
                $("#shopping-items").append('<li style="padding: 0.4rem 0.4rem;" id='+ ingredientNum  +'>' + items[i][0] + svg + '<input style="width: 25%; border: none; border-bottom: 1px solid black; float: right" placeholder="Amount" onkeyup="updateQuantity(this)">' + '</li>');
        }
    }
    console.log("Item list:", items);
    $(element).parent().remove();
}

// This function is called when the user types in the quantity input element

function updateQuantity(input){
    // Gets the id of the input and its parent element
    var id = $(input).parent().attr('id');
    // Variable for the specific ingredient in the items array 
    var arrayToBePushed = items[id]
    // Removes the old quantity number from the array
    arrayToBePushed.splice(3, 1);
    // Pushes the value of the quantity into the array
    arrayToBePushed.push($(input).val());
    console.log(items);
}

// This function allows the user to add misc items to their shopping cart

function addMiscItem(){
    const svg = '<svg onclick=removeFromCart(this) style="float: right;" width="24" height="24" style="fill: rgba(0, 0, 0, 1)"><path d="M7 11h10v2H7z"></path><path d="M12 2C6.486 2 2 6.486 2 12s4.486 10 10 10 10-4.486 10-10S17.514 2 12 2zm0 18c-4.411 0-8-3.589-8-8s3.589-8 8-8 8 3.589 8 8-3.589 8-8 8z"></path></svg>'
    // Grabs the value of the inputs when the submit button has been clicked by the user
    var name = $("#misc-name").val();
    var measurementType = $("#misc-measurementType").val();
    var category = $("#misc-category").val();

    // Puts each variable into an array
    var info = [name, measurementType, category];

    // Pushes the array into the items list
    items.push(info);

    // Increases ingredientsNum by one
    ingredientNum++;

    console.log("Added misc item:", info);
    console.log("Item list:", items)

    // Checks whether the measurement tpye is weight, volume or neither 
    switch(info[1]){
        case 'weight':
            $("#shopping-items").append('<li style="padding: 0.4rem 0.4rem;" id='+ ingredientNum  +'>' + info[0] + svg + '<input style="width: 25%; border: none; border-bottom: 1px solid black; float: right;" placeholder="Grams" onkeyup="updateQuantity(this)">' + '</li>');
            break;
        case 'volume':
            $("#shopping-items").append('<li style="padding: 0.44rem 0.4rem;" id='+ ingredientNum  +'>' + info[0] + svg + '<input style="width: 25%; border: none; border-bottom: 1px solid black; float: right;" placeholder="mL" onkeyup="updateQuantity(this)">' + '</li>');
            break;
        default:
            $("#shopping-items").append('<li style="padding: 0.4rem 0.4rem;" id='+ ingredientNum  +'>' + info[0] + svg + '<input style="width: 25%; border: none; border-bottom: 1px solid black; float: right" placeholder="Amount" onkeyup="updateQuantity(this)">' + '</li>');
    }
}

// This function is only ran when the use clicks the submit order button.

function submitOrder(){
    if (!confirm(`Place Order?`)) return null;
    // Before fully submitting the order, I check if the order number has changed after the app has loaded
    orders.doc("OrderAmount").get().then((doc) => {
        orderNum = doc.data();
    })
    // These three variables gets the value of the input fields
    var pracDate = $("#pracDate").val();
    var pracTitle = $("#pracTitle").val()
    var classCode = $("#classCode").val()
    // Increases the orderNum num value by one
    orderNum.num++;
    console.log(auth.currentUser.uid);
    // Creats a document within the collection called Order with the specific orderNum button
    orders.doc("Order" + orderNum.num).set({
        uid: auth.currentUser.uid,
        classCode: classCode,
        pracDate: pracDate,
        pracTitle: pracTitle,
    });
    // Sets the orderNum document accordingly
    orders.doc("OrderAmount").set({
        num: orderNum.num
    })
    // Loops through each item within the items array
    for(var i=0; i < items.length; i++){
        console.log(items[i]);
        // Adds the ingredients to the specific document, creates another collection and creates a document named the ingredient
        // Which then it sets the specific info about that ingredient
        orders.doc("Order" + orderNum.num).collection('ingredients').doc(items[i][0]).set({
            "category": items[i][1],
            "measurementType": items[i][2],
            "quantity": items[i][3],
        })
    };
    // Displays 'Order submitted' and hides the page
    // Which stops users from spamming the submit button after they have actually submitted
    document.querySelector('#buffer').style.display = '';
    document.querySelector('#form-content').style.display = 'none';
}