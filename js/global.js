setTimeout(()=>{
	$('.preloaderBody').attr('hidden', 'true');
	$('.mainBody').removeAttr('hidden');
}, 2700);

function userLogout(){
	auth.signOut().then(function() {
		localStorage.removeItem("userUID");
        localStorage.removeItem("loginStatus");
		window.location.href="logout.html";
	}).catch(function(error) {
	  alert(error);
	});
}

function showDetails(showID) {
	localStorage.setItem('showID', showID);
	location.href = "details.html";
}
