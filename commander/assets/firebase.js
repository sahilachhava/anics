var firebaseConfig = {
    apiKey: "AIzaSyAGgJw-wuH_DX0kkEkG-BPxTZQ4dn6mFeQ",
    authDomain: "anicss.firebaseapp.com",
    projectId: "anicss",
    storageBucket: "anicss.appspot.com",
    messagingSenderId: "333363172134",
    appId: "1:333363172134:web:040a918d82d158bcdbe7e7",
    measurementId: "G-T7LXHQV9VH"
};

firebase.initializeApp(firebaseConfig);
firebase.analytics();

const db = firebase.firestore();
const storage = firebase.storage();
const auth = firebase.auth();

function logOut(){
	auth.signOut().then(function() {
		sessionStorage.removeItem("adminUID");
		window.location.href="../index.html";
	}).catch(function(error) {
	  alert(error);
	});
}

function getUrlParameter(sParam) {
    var sPageURL = window.location.search.substring(1),
        sURLVariables = sPageURL.split('&'),
        sParameterName,
        i;

    for (i = 0; i < sURLVariables.length; i++) {
        sParameterName = sURLVariables[i].split('=');

        if (sParameterName[0] === sParam) {
            return sParameterName[1] === undefined ? true : decodeURIComponent(sParameterName[1]);
        }
    }
}

function getDate(timeStamp){
    return timeStamp.toDate().toDateString();
}



