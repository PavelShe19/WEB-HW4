function run() {
    $(document).ready(function () {
        //check if user logged in
        firebase.auth().onAuthStateChanged(function (user) {
            if (user) {
                var displayName = user.displayName;
                var email = user.email;
                var emailVerified = user.emailVerified;
                var photoURL = user.photoURL;
                var isAnonymous = user.isAnonymous;
                var uid = user.uid;
                var providerData = user.providerData;
                //load email address
                isAuth(email);
                //load image
                var userRef = firebase.auth().currentUser;
                //var storageRef = firebase.storage().ref(userRef.uid + '/profilePicture/');
                //storageRef.child(userRef.uid + '/profilePicture/').getDownloadURL().then(onResolve, onReject);
                firebase.storage().ref(userRef.uid + '/profilePicture/').getDownloadURL().then(onResolve, onReject);

                function onResolve(foundURL) {
                    document.getElementById('usrImage').src = foundURL;
                }

                function onReject(error) {
                    //do nothing
                    console.log(error);
                }
            //go to login page if not logged in
            } else {
                window.location = 'page1.html';
            }
        });
        //logout button
        $("#btnLogout").click(function (e) {
            firebase.auth().signOut();
        });
        function isAuth(email) {
            const emailtxt = document.getElementById("email");
            emailtxt.innerHTML = email;
        }
    });
}