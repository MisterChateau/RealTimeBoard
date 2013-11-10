$(function(){

    Parse.$ = jQuery;

    // Initialize Parse API with the application ID key and the application javascript key
    Parse.initialize("Aqrki1CZlZt8zphC3WV3D692sdA9D9M79l1gkvLt",
        "puojbOL9C0d0mzPb1VZE9Lk8B5TyFFbpMpWX5IFc"
    );
    //Model
    var Topic = Parse.Object.extend({
        className: "topic",
        defaults: {
            title: "Enter your Topic",
            state: "toDiscuss"
        }
    });

    //Collection
    var TopicsCollection = Parse.Collection.extend({
        model: Topic
    });

    //View
    var TopicsCollectionView = Parse.View.extend({

        tagName: "ul",
        //class jQuery plugin sortable
        className: "sortable",

        initialize: function(){
            var serverBaseUrl = document.domain;
            var socket = io.connect(serverBaseUrl);
            var self = this;

            $("#toDiscuss").append(this.el);
            console.log(this.el);
            //add topic button event
            $(".newTopicBtn").on("click", this.newTopic);

            //listen for the new topic event and pass the data to the render function
            socket.on("newTopic", function(data){
                self.render(data)
            });
        },



        newTopic: function() {
            console.log("newTopic function called");
            //send Post to express API
            var value = $("input").val();
            $.ajax({
                type: "POST",
                url: "/topic",
                dataType: "JSON",
                data: {topic: value}
            })
                .done(function (msg) {
                    console.log("Success " + msg);
                })
                .fail(function (msg) {
                    console.log("Fail " + msg);
                })
        },

        render: function(data){
            console.log("rendering sub view ==========");
            var topic = new Topic({title: data});
            var topicView = new TopicView({model: topic});
            var state = topicView.model.get("state");
            console.log(topicView);
            $("#"+state+" ul").prepend(topicView.render().el);

        }
    });

    var TopicView = Parse.View.extend({
        tagName:"li",

        initialize: function(){
            console.log("=====> new TopicView initialized")
        },

        events: {
            "mousedown": "sort"
        },

        sort: function(){
            console.log("sort");
            $(".sortable").sortable({
                placeholder: "sortable-placeholder",
                connectWith: ".sortable"
            });
            $( ".sortable li" ).disableSelection();
        },
        template: _.template($("#listItemTemplate").html()),

        render: function(){
             var template = this.template(this.model.toJSON());
             this.$el.html(template);
             return this
        }
    });

    var topicsCollection = new TopicsCollection();
    var topicsCollectionView = new TopicsCollectionView({collection:topicsCollection});

});