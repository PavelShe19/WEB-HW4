function run() {
    

    //Get elements
    // const txtEmail = document.getElementById("txtEmail");
    // const txtPassword = document.getElementById("txtPassword");
    // const btnLogin = document.getElementById("btnLogin");
    // const btnSignUp = document.getElementById("btnSignUp");
    // const btnLogout = document.getElementById("btnLogout");

$(document).ready(function(){
    const firebaseConfig = {
        apiKey: "AIzaSyBNjPHaWRz4JKP1ILu0W5ytx2SNSDaDrTo",
        authDomain: "web-hw4-94bdf.firebaseapp.com",
        databaseURL: "https://web-hw4-94bdf.firebaseio.com",
        projectId: "web-hw4-94bdf",
        storageBucket: "",
        messagingSenderId: "125611020423",
        appId: "1:125611020423:web:40fe186330f2f934"
    };
    // Initialize Firebase
    firebase.initializeApp(firebaseConfig);
    var state = "login";
    
    $("#btnSignUp").click(function(){
        if(state === "login"){
            $(this).text("Want to Login?");
            state = "signup";
        } else{
            $(this).text("Want to Sign Up?");
            state = "login";
        }
        $("#btnLogin").text(state);
    });
    
    $("#btnLogin").click(function(e){
        e.preventDefault(); // so it wouldn't use form functionality
        let email = $("#txtEmail").val();
        let pass = $("#txtPassword").val();
        console.log(email, pass);
        if(state === "login"){
            firebase.auth().signInWithEmailAndPassword(email, pass).catch(function(error) {
                // Handle Errors here.
                var errorCode = error.code;
                var errorMessage = error.message;
                $("#loginMessage").text(errorMessage);
            });
        } else{
            firebase.auth().createUserWithEmailAndPassword(email, pass).catch(function(error) {
                // Handle Errors here.
                var errorCode = error.code;
                var errorMessage = error.message;
                $("#loginMessage").text(errorMessage);
            });
        }
    });
    
    firebase.auth().onAuthStateChanged(function(user) {
        if (user) {
            var displayName = user.displayName;
            var email = user.email;
            var emailVerified = user.emailVerified;
            var photoURL = user.photoURL;
            var isAnonymous = user.isAnonymous;
            var uid = user.uid;
            var providerData = user.providerData;
            localStorage['user'] = user;
            location.href = "page1.html";
        } else {
            // User is signed out.
            // ...
        }
    });
    
});

}