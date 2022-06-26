var ingredients = [];
var items = []

function studentOnLoad()
{
    // Gets all the documents in the collection
    // Gets each ingredient and its associated fields
    // The data from the database gets sorted into an object
    // Pushes the object into an array for easier processing
    // Loops through each array element and creats a drop down element
    
    db.collection("ingredients").onSnapshot((snapshot) => {
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
            console.log(ingredients[i].information['category']);
            $("#dropdown-items").append("<a id='dropdown-element' onclick='addToCart(this)' data-category-type=" + `${ingredients[i].information['category']}` + " data-measurement-type=" + ingredients[i].information['measurementType'] + ">" + ingredients[i].ingredientName + svg + "</a>");
        }
    }

}

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
    var info = [element.textContent, element.getAttribute("data-category-type"), element.getAttribute("data-measurement-type")]
    items.push(info);
    console.log(items);
    $("#shopping-items").append("<li>" + info[0] + "</li>")
}