function run() {
    $(document).ready(function () {
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
                

            } else {
                window.location = 'page1.html';
            }
        });
        $("#fileButton").click(function (e) {
            // Get current username
            var userRef = firebase.auth().currentUser;
            // Create a Storage Ref w/ username
            var storageRef = firebase.storage().ref(userRef.uid + '/profilePicture');
            // Get image
            var file = $("#uploader").get(0).files[0];
            // Upload file
            var task = storageRef.put(file);
            // Get response from server
            task.then((snapshot) => {
                console.log('image uploaded to: ' + snapshot.downloadURL);
                storageRef.getDownloadURL().then(onResolve, onReject);
                function onResolve(foundURL) {
                    document.getElementById('usrImage').src = foundURL;
                }

                function onReject(error) {
                    //do nothing
                    console.log(error);
                }
            })
            .catch((error) => {
                console.log(error);
            });
        });

        $("#btnLogout").click(function (e) {
            firebase.auth().signOut();
        });

        $("#btnCont").click(function (e) {
            window.location = 'page3.html';
        });

        function isAuth(email) {
            const emailtxt = document.getElementById("email");
            emailtxt.innerHTML = email;
        }

    });
}

