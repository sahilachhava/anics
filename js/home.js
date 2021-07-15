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

    //autoplay video on hover over an video item
    var figure = $(".video").hover(hoverVideo, hideVideo);
    function hoverVideo(e) {
        $('video', this).get(0).play();
    }
    function hideVideo(e) {
        $('video', this).get(0).pause();
        $('video', this).get(0).load();
    } 
});

