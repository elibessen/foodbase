function everything()
{
   test = document.getElementById("testowo");
    students.doc(auth.currentUser.uid).get().then((doc) => {
        test.innerHTML = doc.data().username;
    });
 
}