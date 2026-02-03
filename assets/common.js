var SP_MAX_WIDTH = 800;
$(document).ready(function(){

// -------------------------------------------------------------------
//   グローバルナビ
// -------------------------------------------------------------------
$('.hNavBtn').on('click', function() {
	$(this).toggleClass('active');
	$('#header').toggleClass('active');
	$('#gNaviWrapper').fadeToggle();

	$('.mvNavBtn').toggleClass('active');

	return false;
});

$('.mvNavBtn').on('click', function() {
	$(this).toggleClass('active');
	$('.hNavBtn').toggleClass('active');
	$('#header').toggleClass('active');
	$('#gNaviWrapper').fadeToggle();

	return false;
});

$('#gNaviWrapper').on('click', 'a', function() {
  $('.hNavBtn, .mvNavBtn').removeClass('active');
  $('#header').removeClass('active');
  $('#gNaviWrapper').fadeOut();
});

$('a[href^=#]').click(function(){
	var speed = 500;
	var href= $(this).attr("href");
	var target = $(href == "#" || href == "" ? 'html' : href);
	var header = $('#header').innerHeight();
	var position = target.offset().top - (header);

	$("html, body").animate({scrollTop:position}, speed, "swing");
	return false;
	});

// -------------------------------------------------------------------
//   タブ切り替え
// -------------------------------------------------------------------

// -------------------------------------------------------------------
//　content 高さ 幅
// -------------------------------------------------------------------
$(document).ready(function(){
	var $setContent = $('.jsH100');
	
	$setContent.each(function(){
		function contSize(){
			var winHeight=$(window).height();
			var winWidth=$(window).width();
			var wrap=$('.wrapper').outerHeight();

			if(wrap < winHeight) {
				
				var header=$("#header").outerHeight();
				var footer=$("#footer").outerHeight();
				$(".jsH100").css("height", winHeight - footer);
				$(".cmnSidebar").css("height", winHeight - footer - header);
			}
		}
		
		$(window).on('load resize', function(){contSize();});
			contSize();
	});
});

// -------------------------------------------------------------------
//   フェイドイン
// -------------------------------------------------------------------
$(document).ready(function(){
	$('.fadeIn').each(function() {
		var pos = $(this).offset().top;
		var scroll = $(window).scrollTop();
		var wHeight = $(window).height();
		if (scroll > pos - wHeight + wHeight/100){
			$(this).addClass('inview');
		}
	});
});
$(window).scroll(function() {
  $('.fadeIn').each(function() {
    var pos = $(this).offset().top;
    var scroll = $(window).scrollTop();
    var wHeight = $(window).height();
    if (scroll > pos - wHeight + wHeight/100){
      $(this).addClass('inview');
    }
  });
});

// -------------------------------------------------------------------
//   トップに戻るボタン
// -------------------------------------------------------------------

	$(".pageTop").hide();
	$(window).on("scroll", function() {

		if ($(this).scrollTop() > 200) {
			$('.pageTop').fadeIn("fast");
		} else {
			$('.pageTop').fadeOut("fast");
		}
		
		// フッター固定
		var scrollHeight = $(document).height(); 
		var scrollPosition = $(window).height() + $(window).scrollTop();
		var w = parseInt(window.innerWidth);
		
		var footHeight = $("#footer").outerHeight() + 20;

		if ( scrollHeight - scrollPosition <= footHeight ) {
			$(".pageTop").css({
				"position":"fixed",
				"bottom": footHeight
			});
		} else {
			// それ以外の場合は元のcssスタイルを指定
			if (w < SP_MAX_WIDTH) {
				$(".pageTop").css({
					"position":"fixed",
					"bottom":"15px"
				});
			} else {
				$(".pageTop").css({
					"position":"fixed",
					"bottom":"25px"
				});
			}
		}
	});

// -------------------------------------------------------------------
// common：PC/SP用画像切り替え
// jsImgSwitchクラスを持つ、ファイル名末尾(拡張子除く)が「_pc/_sp」の
// 画像のみに有効
// -------------------------------------------------------------------

// img switch _pc _sp
var $setElem = $('.jsImgSwitch');
var pcName = '_pc';
var spName = '_sp';
var x = 768;

$setElem.each(function () {
	var $this = $(this);

	function imgSwitch() {
		var w = parseInt(window.innerWidth);
		if (w >= x) {
			$this.attr('src', $this.attr('src').replace(spName, pcName)).css({
				visibility: 'visible'
			});
		} else if (w < x) {
			$this.attr('src', $this.attr('src').replace(pcName, spName)).css({
				visibility: 'visible'
			});
		}
	}
	$(window).resize(function () {
		imgSwitch();
	});
	imgSwitch();
});

// -------------------------------------------------------------------
//   ロールオーバー画像切替え
// -------------------------------------------------------------------
$(".over").mouseover(function(){
	$(this).attr("src",$(this).attr("src").replace(/^(.+)(\.[a-zA-Z]+)$/, "$1_on$2"))
}).mouseout(function(){
	$(this).attr("src",$(this).attr("src").replace(/^(.+)_on(\.[a-zA-Z]+)$/, "$1$2"));
})

// -------------------------------------------------------------------
//   ロールオーバー画像切替え
// -------------------------------------------------------------------
if(document.getElementById("sideCurrentBar")) {
	//サイドバースクロール
	var $w = $(window);
	const $scBar = $('#sideCurrentBar');
	var scrollRatio;
	$w.on('load scroll resize', function(){
		var winSc = $w.scrollTop();
		var wH = $w.innerHeight();
		var perVal=  winSc / ($(document).innerHeight() - wH);
		scrollRatio = perVal * ($('.cmnSidebar').outerHeight() - $('#pageTtl01').outerHeight() - $scBar.outerHeight()) ;
		$scBar.css('top', scrollRatio + $('#pageTtl01').outerHeight() + 'px');
	});
}

// -------------------------------------------------------------------
//   ページ内リンク
// -------------------------------------------------------------------



	// -------------------------------------------------------------------
	// common：電話番号リンクの制御(PCの場合はtelリンクを無効化)
	// jsTelLinkクラスを持つ、リンクタグ(aタグ)のみに有効
	// -------------------------------------------------------------------
	var strMode = 'ua';
	var bEnable = false;
	switch(strMode){
		//ユーザーエージェント判定
		case 'ua': {
			var ua = navigator.userAgent.toLowerCase();
			
			//どれにも当てはまらなければ、PC(リンク無効)
			bEnable = (ua.indexOf('phone') == -1 //iPhoneとWindows phone
						&& ua.indexOf('ipad') == -1 //iPad
						&& ua.indexOf('android') == -1); //AndroidとAndroidタブレット
			
			break;
		}
		
		//画面幅判定
		default: {
			bEnable = (elmWin.width() > SP_MAX_WIDTH);
			break;
		}
	}
	
	//リンクを無効にする
	if(bEnable){
		$('a.jsTelLink').each(function(){
			var elmNew = $('<span/>', {
				'class': $(this).attr('class')
			});
			elmNew.html($(this).html());

			$(this).replaceWith(elmNew);
		});
	}
});


(function () {


  // ② 別ページから /#about で来た時：読み込み後にもう一回スクロール
  window.addEventListener('load', () => {
    if (!window.location.hash) return;

    // load直後でもズレるサイトがあるので軽く遅延
    setTimeout(() => scrollToHash(window.location.hash, 'auto'), 50);
  });
})();
