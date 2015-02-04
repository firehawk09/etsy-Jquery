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
            listings: "https://openapi.etsy.com/v2/listings/active",
            listingId: "https://openapi.etsy.com/v2/listings/:listing_id"

        },

        access_key: function() {
            return "api_key=" + this.key
        },

        getData: function() {
            //Pull listing data from etsy
            // return $.getJSON("https://openapi.etsy.com/v2/listings/active.js?api_key=hvo4ybhgni81tihncd8wlhv0&callback=?")
            var dataURL = this.URLs.listings + ".js?" + "includes=Images(url_570xN)&" + this.access_key() + "&callback=?"
            //https://openapi.etsy.com/v2/listings/active.js?includes=images(url_570xN)&api_key=hvo4ybhgni81tihncd8wlhv0&callback=?
            //https://openapi.etsy.com/v2/listings/active.js?includes=Images(url_570xN)&api_key=hvo4ybhgni81tihncd8wlhv0&callback=mycallback
            return $.getJSON(dataURL)
                .then(function(data) {
                    console.log(dataURL)
                    console.log(data.results);
                    return data.results;
                })
        },

        getListingData: function() {
            return $.getJSON(this.URLs.listingId + ".js" + "includes=images(url_570xN)&" + this.access_key() + "&callback=?")
            .then(function(data1) {
                return data1.results;
            })
        },

        loadTemplate: function(name) {
            //load template file for page
            // debugger;
            return $.get("./templates/" + name + ".html").then(function(data) {
                return data;
            })
        },


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
