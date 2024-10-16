// JavaScript Document

$(document).ready(function(){

	//Slider
	$('.mainImgList').slick({
		infinite: true,
		fade: true,
		arrows: false,
	});

	$('.thumbImgList').slick({
		infinite: true,
		slidesToShow: 20,
		focusOnSelect: true,
		asNavFor: '.mainImgList',
		variableWidth: true,
	});

	$('.mainImgList').on('beforeChange', function(event, slick, currentSlide, nextSlide) {
		var index = nextSlide;
		$(".thumbImgList .slick-slide").removeClass("slick-current").eq(index).addClass("slick-current");
	});

	$('#openModal').click(function(){
		$('#modalSec').fadeIn();
		slider.slick('setPosition');
	});
	$('#closeModal , #modalBg').click(function(){
		$('#modalSec').fadeOut();
  	});

	//MordalSlider
  	var slider = $('.zoomImgList');
	slider.slick({});

});
