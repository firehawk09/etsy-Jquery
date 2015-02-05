//===========================================================================================

//================================> Old Way <================================================

//===========================================================================================
draw: function() {
    //template and user data loaded, draw page
    $.when(
        this.getData(),
        this.loadTemplate("listingsTemplate")
    ).then(function(listings, html) {
        console.log(listings);
        var listingPage = document.querySelector(".wrapper");
        var listingsId = _.template(html);
        console.log(listingsId)
        listingPage.innerHTML = listingsId({
            listings: listings //TH- the data we want is in listings.results,,,,but remember,
                ///also, that listings.results is an array
            console.log(listingsId);
        });





        //TH-so here we go: each item in listing.results had a data object with properties: title, price, etc
        // therefore, we have to loop over listing.results and create HTML for each one

        // (1) we create an empty string where we will add our compiled templates
        var allCompiledTemplates = "";

        // (2) we iniitate the loop over the listings.results array that was returned from our etsy query
        listings.results.forEach(function(someListing, index) {

            //Remember: We tell the forEach loop to do something for each item in the array
            // in this case, since listings.results is an array of objects
            // someListing is each object

            //(3) We are going to compile **one instance** of our html template
            var compiledTemplate = _.template(html, someListing)

            //Note1: with _.template(a,b) you it's easer to pass all at once:
            //a) the template-text
            //b) the data

            //Note2:   _.template([text],[data]) will return  a string: you've seen this in the console b4

            //(4)...So here we're just concatenating those strings together
            allCompiledTemplates += compiledTemplate
        })

        //(5) and here we insert the html-text-string into the DOM
        document.querySelector('wherever-it-goes').innerHTML = allCompiledTemplates

    })
}




// =======================================

//=====================================> New Way <========================================

//========================================




draw: function() {
    //template and user data loaded, draw page
    $.when(
        this.getData(),
        this.loadTemplate("listingsTemplate")
    ).then(function(listings, html) {
        var allCompiledTemplates = "";
        var compiledTemplate = _.template(html)
        listings.forEach(function(someListing, index) {
            allCompiledTemplates += compiledTemplate({
                l: someListing
            })
        })
        document.querySelector('.wrapper').innerHTML = allCompiledTemplates
    });
}
}
window.EtsyClient = EtsyClient;
})();








// =======================================





window.addEventListener('input', callback);

function callback(event) {
    console.log(event); // prints out all the properties of the event; check them out!
    console.log(event.newURL);

    // var newID = window.location.target;
    // or
    var newID = event.newURL.substring(event.newURL.indexOf('#'));

    console.log(newID); // #target
}









//========================================




< ul class = "grid grid-2-400 grid-4-600 listings" >
    <% results.forEach(function(i) { %>
        < a href = "#listing/<%= i.listing_id %>" >
            // <%=i.listing_id %>
            // <%=i.state %>
            // <%=i.user_id %>
            // <%=i.category_id %>
            < h6 > <%= i.title %> < /h6>

        <%
        if (i.Images instanceof Array) { %>
            < img src = "<%= i.Images[0].url_570xN %>" >
                <%
        } %>

        <!-- <p><%=i.description %></p> -->
        < p > <%= "$" + i.price %> < /p> < /a> <%
    }) %>
    < /ul>




//=======================================



//=======================================
draw: function() {
        $.when(
            this.getData(),
            this.loadTemplate("home")
        ).then(function(apidata, template) {
            var templatingFn = _.template(template);
            document.querySelector(".container").innerHTML = templatingFn(apidata);

        });
    },

    // drawlisting: function(items) {

    // }
};
//====================================



$("form").on("submit", function(event){
            event.preventDefault();
            window.location.hash = '#/search/'+this.querySelector('input').value;
        })



//====================================

























