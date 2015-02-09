;
(function() {
"use strict";
    //===================================================================================
    //--------------------Two screens, one for item search, one for item detail
    //===================================================================================

    function EtsyClient(key) {
        this.key = key;
        this.users = [];
        this.listingData = [];
        this.baseUrl = "https://openapi.etsy.com/v2";
        this.listings = this.baseUrl + "/listings/active";
        this.details = this.baseUrl + "/listings/";

        var self = this;

        var EtsyRouter = Backbone.Router.extend({

            routes: {
                "": "search",
                "search/:keywords": "search",
                "listing/:listing_id": "details"

            },
            search: function(keywords) {
                self.draw(keywords);
            },
            details: function(listing_id) {
                self.drawDetails(listing_id)
            },
            initialize:function(){
                Backbone.history.start()
            }
        })
        var router = new EtsyRouter();

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

        getDetailURL: function(){
            return this.details + this.listing_id + ".js?" + "includes=Images&" + this.access_key() + "&callback=?"
        },

        getData: function() {
            return $.getJSON(this.getDataURL()
                ).then(function(data) {
                    return data;
                })
        },

        getDetailData: function() {
            return $.getJSON(this.getDetailURL()
                ).then(function(data) {
                    return data.results;
                })
        },

        loadTemplate: function(name) {
            //load template file for page
            // debugger;
            return $.get("./templates/" + name + ".html"
                ).then(function(data) {
                // console.log(data);
                return data;
            })
        },


        draw: function(keywords) {
            this.keywords = keywords;
            //template and active listings data loaded, draw page
            $.when(
                this.getData(keywords),
                this.loadTemplate("listTemp")
            ).then(function(listings, html) {
                var templatingFn = _.template(html)
                document.querySelector('.wrapper').innerHTML = templatingFn(listings)
            })
        },

        drawDetails: function(listing_id){
            this.listing_id = listing_id;
            //template and listing data loaded, now draw page
            $.when(
                this.getDetailData(this.listing_id),
                this.loadTemplate("detailsTemp")
                ).then(function(data, html) {

                    console.log(data)
                    var templatingFn2 = _.template(html)
                    document.querySelector('.wrapper').innerHTML = templatingFn2({key: data})
                })
        }
    }

    window.EtsyClient = EtsyClient;
})();
