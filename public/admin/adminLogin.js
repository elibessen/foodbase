const loginpage = document.querySelector("#loginpage");

const txtEmail = document.querySelector('#emailusername');
const txtPassword = document.querySelector('#adminpassword');
const txtUsername = document.querySelector('#adminusername');

const btnSignIn = document.querySelector('#adminbutton');
const btnSignOut = document.querySelector('#adminlogoutbutton');
const btnSignUp = document.querySelector('#signup');
const adminnavlogin = document.querySelector("#adminnavlogin");
const page = document.querySelector("#page");

const returnButton = document.querySelector("#return");

var isClicked = false;

// Firebase reference  

const auth = firebase.auth();
const db = firebase.firestore();

const users = db.collection('users');

loginpage.classList.remove('hidden');

adminnavlogin.addEventListener('click', e => {
    if(isClicked === false){
        loginpage.classList.remove('hidden');
        isClicked = true;
    } else if(isClicked === true){
        loginpage.classList.add('hidden');
        isClicked = false;
    }
})

// Sign existing user in
btnSignIn.addEventListener('click', e => {
    let email = txtEmail.value;
    let password = txtPassword.value;

    const promise = auth.signInWithEmailAndPassword(email, password);
    promise.catch(e => errorlogin(e));
});

// btnSignUp.addEventListener('click', e => {
//     // TODO: Check for real email.
//     let email = txtEmail.value;
//     let password = txtPassword.value;

//     const promise = auth.createUserWithEmailAndPassword(email, password);
//     promise.catch(e => console.log(e.message));
// });


function errorlogin(e){
    console.log(e.message);
    $("#loginerror").remove();
    $('#responsetext').append("<p id='loginerror' class='text-danger'> Wrong email/password </p>");
}

// Sign out current user
btnSignOut.addEventListener('click', e => {
    firebase.auth().signOut();
    location.reload();
    console.log("Logged out");
});

returnButton.addEventListener('click', e => {
    firebase.auth().signOut();
    location.reload();
    console.log("Logged out");
});

// Detect when auth state changes
firebase.auth().onAuthStateChanged(firebaseUser => {
    // If signed in
    if (firebaseUser) {
        console.log(firebaseUser);   
        btnSignOut.classList.remove('hidden');
        btnSignIn.classList.add('hidden');
        $("#loginerror").remove();
        $('#responsetext').append("<p class='text-success'> Successfully logged in </p>");
        page.classList.remove('nonclickable');
         // Check user exists in db
        users.doc(auth.currentUser.uid).get().then((doc) => {
            if (doc.exists) { // User exists
                console.log("Document data:", doc.data());
                btnSignOut.classList.remove('hidden');
                fetchUsername();
                adminOnload();
            } else { // Add user data to db
                console.log("No such document!");
                writeUserToDB();
            }

            loginpage.classList.add('hidden');
        }).catch((error) => { // Catch any errors
            console.log("Error getting document:", error);
            $('#responsetext').append("<p id='loginerror' class='text-danger'> Error retrieving user </p>");
        });

    } else { // Confirm logout
        console.log('not logged in.');
        btnSignOut.classList.add('hidden')
        btnSignIn.classList.remove('hidden');
        loginpage.classList.remove('hidden');
        page.classList.add('nonclickable');
    }
});

// Add new user information to database
function writeUserToDB() {
    let username = txtUsername.value;
    let uid = auth.currentUser.uid;
    let email = txtEmail.value;

    users.doc(uid).set({ // Write to db
            username: username,
            uid: uid,
            email: email
        })
        .then(() => { // If success
            console.log("Document successfully written!");
        })
        .catch((error) => { // Catch errors
            console.error("Error writing document: ", error);
        });
};

function fetchUsername(){
    users.doc(auth.currentUser.uid).get().then((doc) => {
        if(doc.exists) {
            username.innerHTML = doc.data().username.toUpperCase() + ', ADMIN'
        } else {
            console.log("Username doesn't exist");
            username.innerHTML = 'Hey, you do not exist'
        }
    })
}