/*----- ADD CUSTOM JAVASCRIPT HERE ----*/
//====================================

$(function () {

	// Toggle "active" class on click
	//$(".navBottom a").click(function () {
		//$(this).toggleClass("active");
		//e.preventDefault(); /*ignores actual link*/
	//});

	/*---- CALL METHOD for Collapsible SIDEBAR MENU plugin ----*/
	$.slidebars();

	/*---- LEFT SIDEBAR NAVIGATION and Collapsible SubMenus ----*/
	$("#leftNavMainParent").click(function(){
		$(".sidebarLeft").animate({
			width:'toggle'
		});
	});

	/*---- SWIPING ----*/
	$("#swipeTest").swipe( {
		//Generic swipe handler for all directions
		swipeLeft: function(event, direction, distance, duration, fingerCount) {
			//window.location.href = "http://salesforce.com";
			$("#swipeTest").animate({width:'toggle'},250);
			$("#swipeTest").animate({width:'toggle'},250);
			//$("#swipeTest").hide(".slide").animate({right:'0'});
			//$("#swipeTest").show(".slide").animate({right:'0'});
		},
		swipeRight: function(event, direction, distance, duration, fingerCount) {
			window.location.href = "http://google.com";
		},

		//Generic swipe handler for all directions
		/*swipe:function(event, direction, distance, duration, fingerCount) {
			$(this).html("<h2>You swiped</h2> " + direction );
		},*/
		//Default is 75px, set to 0 for demo so any distance triggers swipe
		threshold:0
	});

});
