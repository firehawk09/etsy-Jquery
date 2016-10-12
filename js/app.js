window.onload = app;

// runs when the DOM is loaded
function app(){
    "use strict";
    
    document.querySelector("html").style.opacity = 1;
    // start app?
    var key = "hvo4ybhgni81tihncd8wlhv0",
    secret = "donf2ympyi";

    $("form").on("submit", function(event){
        event.preventDefault();
        window.location.hash = '#/search/'+this.querySelector('input').value;
    })


    new EtsyClient(key);
}