var ingredients = [];
var items = []

var ingredientNum = -1;
var orderNum;

const orders = db.collection('orders');

volume.classList.add('hidden');
weight.classList.add('hidden');
count.classList.add('hidden');



function studentOnLoad()
{
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

    function createDropdown(){
        const svg = '<svg style="float: right;" width="24" height="24" style="fill: rgba(0, 0, 0, 1);"><path d="M13 7h-2v4H7v2h4v4h2v-4h4v-2h-4z"></path><path d="M12 2C6.486 2 2 6.486 2 12s4.486 10 10 10 10-4.486 10-10S17.514 2 12 2zm0 18c-4.411 0-8-3.589-8-8s3.589-8 8-8 8 3.589 8 8-3.589 8-8 8z"></path></svg>'
        for(var i=0; i < ingredients.length; i++){
            // console.log(ingredients[i].information['category']);
            $("#dropdown-items").append("<a id='dropdown-element' onclick='addToCart(this)' data-category-type=" + `${ingredients[i].information['category']}` + " data-measurement-type=" + ingredients[i].information['measurementType'] + ">" + ingredients[i].ingredientName + svg + "</a>");
        }
    };


}

orders.doc("OrderAmount").get().then((doc) => {
    orderNum = doc.data();
})

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

function addToCart(element){
    const svg = '<svg style="float: right;" width="24" height="24" style="fill: rgba(0, 0, 0, 1)"><path d="M7 11h10v2H7z"></path><path d="M12 2C6.486 2 2 6.486 2 12s4.486 10 10 10 10-4.486 10-10S17.514 2 12 2zm0 18c-4.411 0-8-3.589-8-8s3.589-8 8-8 8 3.589 8 8-3.589 8-8 8z"></path></svg>'
    var info = [element.textContent, element.getAttribute("data-category-type"), element.getAttribute("data-measurement-type")]
    switch (info[2]){
        case 'count':
            count.classList.remove('hidden');
            volume.classList.add('hidden');
            weight.classList.add('hidden');
            console.log("Count");
            break;
        case 'volume':
            volume.classList.remove('hidden');
            count.classList.add('hidden');
            weight.classList.add('hidden');
            console.log("Volume");
            break;
        case 'weight':
            weight.classList.remove('hidden');
            volume.classList.add('hidden');
            count.classList.add('hidden');
            console.log("Weight");
            break;
        default:
            console.log("That measurement type doesn't exist")
    }
    // volume.classList.add('hidden');
    // weight.classList.add('hidden');
    // count.classList.add('hidden');
    items.push(info);
    console.log("Ingredients", items);
    ingredientNum++;
    if($("#shopping-items").children() === 0){ // This is just a fail safe just in case something doesn't work
        console.log("No ingredients in shopping cart!");
        ingredientNum = 0;
    } else {
        $("#shopping-items").append('<li onclick=removeFromCart(this) id='+ ingredientNum +'>' + info[0] + svg + '</li>');
    }
    // orders.doc("orders")
}

function removeFromCart(element){
    // console.log("Amount of orders: ", orderNum);
    const svg = '<svg style="float: right;" width="24" height="24" style="fill: rgba(0, 0, 0, 1)"><path d="M7 11h10v2H7z"></path><path d="M12 2C6.486 2 2 6.486 2 12s4.486 10 10 10 10-4.486 10-10S17.514 2 12 2zm0 18c-4.411 0-8-3.589-8-8s3.589-8 8-8 8 3.589 8 8-3.589 8-8 8z"></path></svg>'
    console.log("id", $(element).attr('id'))
    items.splice($(element).attr('id'), 1);
    $("#shopping-items").empty();
    ingredientNum = -1;
    for(var i=0; i < items.length; i++){
        ingredientNum++;
        $("#shopping-items").append('<li onclick=removeFromCart(this) id='+ ingredientNum +'>' + items[i][0] + svg + '</li>');
    }
    console.log(items);
    $(element).remove();
}


function submitOrder(){
    
}