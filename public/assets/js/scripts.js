'use strict';

$(document).ready(function() {
	$.get('/app/templates/topbar.html', function(topbar) {
		$('.sidebar').before(topbar);
	});

	$.get('/app/templates/sidebar.html', function(sidebar) {
		$('.sidebar').html(sidebar);
	}).done(function(){
		$('#side-menu').metisMenu();
	});
});