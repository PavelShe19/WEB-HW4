function run() {
    $(document).ready(function () {
        var state = "login";

        $("#btnSignUp").click(function () {
            if (state === "login") {
                $(this).text("want to login?");
                state = "signup";
            } else {
                $(this).text("want to signup?");
                state = "login";
            }
            $("#btnLogin").text(state);
        });

        $("#btnLogin").click(function (e) {
            e.preventDefault(); // so it wouldn't use form functionality
            let email = $("#txtEmail").val();
            let pass = $("#txtPassword").val();
            console.log(email, pass);
            if (state === "login") {
                firebase.auth().signInWithEmailAndPassword(email, pass).catch(function (error) {
                    // Handle Errors here.
                    var errorCode = error.code;
                    var errorMessage = error.message;
                    $("#loginMessage").text(errorMessage);
                });
            } else {
                firebase.auth().createUserWithEmailAndPassword(email, pass).catch(function (error) {
                    // Handle Errors here.
                    var errorCode = error.code;
                    var errorMessage = error.message;
                    $("#loginMessage").text(errorMessage);
                });
            }
        });

        firebase.auth().onAuthStateChanged(function (user) {
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
                window.location = 'page2.html';
            } else {
                // User is signed out.
                // ...
            }
        });

    });

}