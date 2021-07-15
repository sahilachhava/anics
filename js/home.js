$(document).ready(function () {  
    setTimeout(()=>{
        document.getElementById("hero-video").play();
    }, 5000);

    //onscroll change header color 
    $(window).on("scroll", function() {
        if($(window).scrollTop() > 100) {
            $("header").css("background-color", "black");
            document.getElementById("hero-video").pause();
        } else if($(window).scrollTop() < 10) {
            $("header").css("background-color", "transparent");
            document.getElementById("hero-video").play();
        }
    });
});

