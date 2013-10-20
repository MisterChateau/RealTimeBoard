var board = {

	init: function(){
		var serverBaseUrl = document.domain;
		var socket = io.connect(serverBaseUrl);

		$("button").on("click", this.addTopic);

		socket.on("newTopic", function(data){
		var html = "<li class='col-sm-12'>"+data+"</li>";
		console.log(html);
		$("#toDiscuss").append(html);
		});
	},

	addTopic: function(){

		var value = $("input").val();

		$.ajax({
			type: "POST",
			url: "/topic",
			dataType: "JSON",
			data: {topic: value}
		})
		.done(function(msg){
			console.log("Success");
		})
		.fail(function(textstatus){
			console.log("Fail");
		})
	}
};

board.init();