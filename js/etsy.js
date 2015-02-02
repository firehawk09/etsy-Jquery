;
(function() {

    //===================================================================================
    //--------------------Two screens, one for item search, one for item detail
    //===================================================================================

    function EtsyClient(key) {
        this.key = key;
        this.users = [];
        this.listingData = [];

        var self = this;

        var EtsyRouter = Backbone.Router.extend({
            routes: {
                ":user_id": "drawUserInfo"
            },
            drawUserInfo: function(user_id) {
                self.drawUser(user_id)
            },
            initialize: function() {
                Backbone.history.start();
            }
        })
        var router = new EtsyRouter();

        this.draw();
    }

    EtsyClient.prototype = {
        URLs: {
            listings: "https://openapi.etsy.com/v2/listings/active"
        },
        access_key: function() {
            return "?api_key=" + this.key
        },
        getData: function() {
            //Pull listing data from etsy
            return $.getJSON("https://openapi.etsy.com/v2/listings/active.js?api_key=hvo4ybhgni81tihncd8wlhv0&callback=?")
                // return $.getJSON(this.URLs.listings + ".js" + this.access_key + "&callback=?")
                .then(function(data) {
                    return data;
                })
        },
        loadTemplate: function(name) {
            //load template file for page
            debugger;
            return $.get("./templates/" + name + ".html").then(function(data) {
                console.log(data);
                return data;
            })
        },
        draw: function() {
            //template and user data loaded, draw page
            $.when(
                this.getData(),
                this.loadTemplate("listingsTemplate")
            ).then(function(listings, html) {
                var listingPage = document.querySelector(".wrapper");
                var listingsId = _.template([html]);
                listingPage.innerHTML = listingsId({
                    listings: listings
                });
            })
        }
    }
    window.EtsyClient = EtsyClient;
})();
