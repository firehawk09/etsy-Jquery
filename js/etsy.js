;
(function() {

    //===================================================================================
    //--------------------Two screens, one for item search, one for item detail
    //===================================================================================

    function EtsyClient(key) {
        this.key = key;
        this.users = [];
        this.listingData = [];
        this.baseUrl = "https://openapi.etsy.com/v2";
        this.listings = this.baseUrl + "/listings/active";

        var self = this;

        var EtsyRouter = Backbone.Router.extend({

            routes: {
                "": "search",
                "listing/:listing_ID": "details",
                "search/:keywords": "search"
            },
            search: function(keywords) {
                self.draw(keywords);
            },
            details: function(listing_ID) {
                // self.drawDetails(listing_ID)
            },
            initialize:function(){
                Backbone.history.start()
            }
        })
        var router = new EtsyRouter();

        // this.draw();
    }

    EtsyClient.prototype = {

        access_key: function() {
            return "api_key=" + this.key
        },

        keyword: function() {
            return "&keywords=" + this.keywords
        },
        getDataURL: function() {
            return this.listings + ".js?" + "includes=Images&" + this.access_key() + this.keyword() + "&callback=?"
        },

        getData: function() {console.log(this.getDataURL());
            return $.getJSON(this.getDataURL())
                .then(function(data) {
                console.log(data.results);
                    return data;
                })
        },


        // keywordSearch: function() {
        //     keywordURL = getDataURL + "&keywords=" + this.keywords
        //     return keywordURL;
        // },

        loadTemplate: function(name) {
            //load template file for page
            // debugger;
            return $.get("./templates/" + name + ".html").then(function(data) {
                return data;
            })
        },


        draw: function(keywords) {
            this.keywords = keywords;


            //template and user data loaded, draw page
            $.when(
                this.getData(keywords),
                this.loadTemplate("listTemp")
            ).then(function(listings, html) {
                var templatingFn = _.template(html)
                document.querySelector('.wrapper').innerHTML = templatingFn(listings)
            })
        }
    }

    window.EtsyClient = EtsyClient;
})();
