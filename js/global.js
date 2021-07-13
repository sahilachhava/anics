function userLogout(){
	auth.signOut().then(function() {
		localStorage.removeItem("userUID");
        localStorage.removeItem("loginStatus");
		window.location.href="login.html";
	}).catch(function(error) {
	  alert(error);
	});
}