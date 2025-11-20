// JavaScript Document

$(document).ready(function () {

	$(window).scroll(function () {
		//global menu
		var headerH = $('#mainSlider li').height() / 2;
		var scroll = $(window).scrollTop();
		if (scroll >= headerH) {
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
		fade: true,
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

	let basePath = document.body.dataset.basepath;

	if (!basePath) {
		basePath = "./_asset/images/top/style/";
	}

	const styleImages = {
		winter24: ['top_style_winter24-1.jpg', 'top_style_winter24-2.jpg', 'top_style_winter24-3.jpg', 'top_style_winter24-4.jpg', 'top_style_winter24-5.jpg', 'top_style_winter24-6.jpg', 'top_style_winter24-7.jpg', 'top_style_winter24-8.jpg', 'top_style_winter24-9.jpg', 'top_style_winter24-10.jpg', 'top_style_winter24-11.jpg', 'top_style_winter24-12.jpg', 'top_style_winter24-13.jpg', 'top_style_winter24-14.jpg', 'top_style_winter24-15.jpg', 'top_style_winter24-16.jpg', 'top_style_winter24-17.jpg', 'top_style_winter24-18.jpg', 'top_style_winter24-19.jpg', 'top_style_winter24-20.jpg', 'top_style_winter24-21.jpg', 'top_style_winter24-22.jpg', 'top_style_winter24-23.jpg'],
		spring25: ['top_style_spring25-1.jpg', 'top_style_spring25-2.jpg', 'top_style_spring25-3.jpg', 'top_style_spring25-4.jpg', 'top_style_spring25-5.jpg', 'top_style_spring25-6.jpg', 'top_style_spring25-7.jpg', 'top_style_spring25-8.jpg', 'top_style_spring25-9.jpg', 'top_style_spring25-10.jpg', 'top_style_spring25-11.jpg'],
		summer25: ['top_style_summer25-1.jpg', 'top_style_summer25-2.jpg', 'top_style_summer25-3.jpg', 'top_style_summer25-4.jpg', 'top_style_summer25-5.jpg', 'top_style_summer25-6.jpg', 'top_style_summer25-7.jpg', 'top_style_summer25-8.jpg', 'top_style_summer25-9.jpg', 'top_style_summer25-10.jpg', 'top_style_summer25-11.jpg', 'top_style_summer25-12.jpg', 'top_style_summer25-13.jpg', 'top_style_summer25-14.jpg', 'top_style_summer25-15.jpg', 'top_style_summer25-16.jpg', 'top_style_summer25-17.jpg', 'top_style_summer25-18.jpg', 'top_style_summer25-19.jpg'],
		autumn25: ['top_style_autumn25-1.jpg', 'top_style_autumn25-2.jpg', 'top_style_autumn25-3.jpg', 'top_style_autumn25-4.jpg', 'top_style_autumn25-5.jpg', 'top_style_autumn25-6.jpg', 'top_style_autumn25-7.jpg', 'top_style_autumn25-8.jpg', 'top_style_autumn25-9.jpg']
	};

	const modal = document.getElementById('modal');
	const closeBtn = document.querySelector('.close-btn');
	const sliderContainer = document.querySelector('.slider');

	// 背景クリックでモーダル閉じる
	modal.addEventListener('click', e => {
		if (e.target === modal) {
			closeModal();
		}
	});

	function initSlick() {
		$(sliderContainer).slick({
			dots: true,
			arrows: true,
			infinite: true,
			slidesToShow: 1,
			adaptiveHeight: true
		});

		// 念のためレイアウト再計算
		$(sliderContainer).slick('setPosition');
	}

	function openModal(key) {
		// 既存スライダーがあれば破棄
		if ($(sliderContainer).hasClass('slick-initialized')) {
			$(sliderContainer).slick('unslick');
		}

		// スライド中身差し込み
		sliderContainer.innerHTML = styleImages[key]
			.map(img => `<div><img src="${basePath}${img}" alt=""></div>`)
			.join('');

		// モーダル表示
		modal.classList.add('active');

		// 1枚目の画像ロードを待ってから slick 初期化
		const firstImg = sliderContainer.querySelector('img');
		if (!firstImg) return; // 念のため

		const start = () => {
			initSlick();
		};

		if (firstImg.complete) {
			// すでにキャッシュ済みなら即実行
			start();
		} else {
			firstImg.addEventListener('load', start, { once: true });
			firstImg.addEventListener('error', start, { once: true });
		}
	}

	function closeModal() {
		modal.classList.remove('active');
		if ($(sliderContainer).hasClass('slick-initialized')) {
			$(sliderContainer).slick('unslick');
		}
	}

	// サムネクリックでモーダルオープン
	document.querySelectorAll('.thumbItem').forEach(item => {
		item.addEventListener('click', () => {
			const key = item.dataset.style;
			openModal(key);
		});
	});

	closeBtn.addEventListener('click', closeModal);


});
