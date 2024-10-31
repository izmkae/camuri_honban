// JavaScript Document

$(document).ready(function(){

	$(window).scroll(function () {
		//global menu
		var headerH = $('#mainSlider li').height()/2;
		console.log(headerH);
		var scroll = $(window).scrollTop();
		console.log(scroll);
		if (scroll >= headerH){
			$('#header').addClass('fixed');
		} else {
			$('#header').removeClass('fixed');
		}
	});

	//Slider
	$('#mainSlider').slick({
		autoplay: true,
		pauseOnHover: false,
		autoplaySpeed: 4000,
		arrows: false,
		dots: false,
		speed: 2000,
		fade:true,
	});

	var windowSm = 800;
	if ($(window).width() > windowSm) {
	
	$('#topJournalList').slick({
		slidesToShow: 4,
		slidesToScroll: 1,
		infinite: true,
		arrows: true,
		dots: false,
	});
	}

	
});
