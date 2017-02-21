console.log(hickey_json);
(function(){
	document.getElementById('content').style.visibility = 'visible';
	var sidebar = new Vue({
		el: '#content',
		data: hickey_json
	});
	
})();