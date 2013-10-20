$(window).ready(function () {

    //use module pattern
    var board = {
        init: function () {
            var serverBaseUrl = document.domain;
            var socket = io.connect(serverBaseUrl);

            $("button").on("click", this.addTopic);
            //bind to the socket.io "newTopic" event
            socket.on("newTopic", function (data) {
                    var html = "<li class='col-sm-12'>" + data + "</li>";
                    $("#toDiscuss").append(html);
            });
        },

        addTopic: function () {
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
        }
}

    board.init();
});