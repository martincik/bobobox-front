jQuery(function () {
	jQuery("a.rozvijime__play-video__link").YouTubePopUp();
	jQuery("a.ficury__playbox__play").YouTubePopUp();

	jQuery("a.rozvijime__play-video__link").click(function (e) {
		fbq('trackCustom', 'VideoPlay', {
			type: 'intro'
		});
	});
	jQuery("a.ficury__playbox__play").click(function (e) {
		fbq('trackCustom', 'VideoPlay', {
			type: 'features'
		});
	});

	jQuery("a.objednavka__vybrat, a.button-objednat").click(function (e) {
		fbq('trackCustom', 'OrderFormClick');
	});

	jQuery('#mobile-menu-btn').click(function () {
		if (jQuery("#mobile-menu-btn").hasClass("open")) {
			jQuery("#mobile-menu-btn").removeClass("open");
			jQuery(".page-nav").removeClass("open");
		} else {
			jQuery("#mobile-menu-btn").addClass("open");
			jQuery(".page-nav").addClass("open");
		}
	});

	jQuery('.page-nav ul a').click(function () {
		jQuery("#mobile-menu-btn").removeClass("open");
		jQuery(".page-nav").removeClass("open");
	});

	$('#garance').popup({
		transition: 'all 0.3s',
		scrolllock: true
	});

	var lastId,
			topMenu = $(".page-nav ul"),
			topMenuHeight = topMenu.outerHeight() + 200,
			menuItems = topMenu.find("a.scrollable"),
			scrollItems = menuItems.map(function () {
				var item = $($(this).attr("href"));
				if (item.length) {
					return item;
				}
			});

	jQuery(window).scroll(function () {
		var fromTop = jQuery(this).scrollTop() + topMenuHeight;
		var cur = scrollItems.map(function () {
			if (jQuery(this).offset().top < fromTop)
				return this;
		});

		cur = cur[cur.length - 1];
		var id = cur && cur.length ? cur[0].id : "";

		if (lastId !== id) {
			lastId = id;
			menuItems
					.parent().removeClass("active")
					.end().filter("[href='#" + id + "']").parent().addClass("active");
		}
	});

	// taby
	jQuery(".objednavka__tabs li a").click(function (e) {
		jQuery(".objednavka__tabs li").removeClass("active");
		jQuery(this).parent().addClass('active');

		jQuery(".tab_1, .tab_2, .tab_3").hide();
		var tt = jQuery(this).parent().attr("id");
		/*jQuery("#objednavka__tab_img").prop("src","img/pricing/box_"+tt+".png");*/
		jQuery("." + tt).show();
    prepocet();
		return false;
	});


	var url = {
		"1": "https://shop.bobobox.cz/collections/frontpage/products/bobobox-1-box?variant=9218342649899",
		"1_1": "https://shop.bobobox.cz/collections/frontpage/products/bobobox-1-box?variant=9218247589931",
		"3": "https://shop.bobobox.cz/collections/frontpage/products/predplatne-na-3-mesice?variant=9219646062635",
		"3_1": "https://shop.bobobox.cz/collections/frontpage/products/predplatne-na-3-mesice?variant=9670812106795",
		"5": "https://shop.bobobox.cz/collections/frontpage/products/copy-of-predplatne-na-3-boxy?variant=9747821756459",
		"5_1": "https://shop.bobobox.cz/collections/frontpage/products/copy-of-predplatne-na-3-boxy?variant=9747821789227",
		"10": "https://shop.bobobox.cz/collections/frontpage/products/predplatne-na-10-boxu-2-zdarma-darecek?variant=9749215084587",
		"10_1": "https://shop.bobobox.cz/collections/frontpage/products/predplatne-na-10-boxu-2-zdarma-darecek?variant=9749215117355",
		"christmas": "https://bobobox.typeform.com/to/US4zat",
		"christmas_1": "https://bobobox.typeform.com/to/US4zat?siblings=Sourozenecky"
	};

  function prepocet() {
		var aktivnitab = jQuery(".objednavka__tabs li.active").attr("id");

		if (aktivnitab == 'tab_1') {
			var txt = jQuery(".tab_1 .objednavka__card__summary__2").html();
			var cenabox = 359;
			var druhybox = 129;
			var box = 5;
			if (jQuery("#3boxy").prop('checked')) {
				box = 3;
				txt = 'Vybrány 3 Boxy';
			}
			if (jQuery("#5boxu").prop('checked')) {
				box = 5;
				txt = 'Vybráno 5 Boxů + 1 Zdarma';
			}
			if (jQuery("#10boxu").prop('checked')) {
				box = 10;
				txt = 'Vybráno 10 Boxů + 2 Zdarma + Dárek';
			}
			if (jQuery("#tab_1-material").prop('checked')) sourozenec = druhybox; else sourozenec = 0;
			jQuery(".tab_1 .objednavka__card__summary__1 span").html((cenabox * box) + (sourozenec * box));
			jQuery(".tab_1 .objednavka__card__summary__2").html(txt);
			if (sourozenec != 0) {
				finurl = box + '_1';
			} else {
				finurl = box;
			}
			jQuery(".tab_1 .button-objednat").attr("href", url[finurl]);

		} else if (aktivnitab == 'tab_2') {
			var cenabox = 429;
			var druhybox = 129;
			var box = 1;
			if (jQuery("#tab_2-material").prop('checked')) sourozenec = druhybox; else sourozenec = 0;
			jQuery(".tab_2 .objednavka__card__summary__1 span").html(cenabox + sourozenec);
			if (sourozenec != 0) {
				finurl = box + '_1';
			} else {
				finurl = box;
			}
			jQuery(".tab_2 .button-objednat").prop("href", url[finurl]);

		} else if (aktivnitab == 'tab_3') {

		} else if (aktivnitab === 'tab_christmas') {
			var cenaBox = 429,
					druhyBox = 129,
					boxUrl = 'christmas';

			if (jQuery('#tab_christmas-material').prop('checked')) {
				sourozenec = druhyBox;
			} else {
				sourozenec = 0;
			}

			jQuery('.tab_christmas .objednavka__card__summary__1 span').html(cenaBox + sourozenec);

			if (sourozenec !== 0) {
				finurl = boxUrl + '_1';
			} else {
				finurl = boxUrl;
			}

			jQuery(".tab_christmas .button-objednat").prop("href", url[finurl]);
		}
  }


	// prepocitavani cen, nastaveni nákupního url
	jQuery(".prepocet").click(function (e) {
    prepocet();
	});

	/* typeform přepracování */
	jQuery(".button-objednat").add('.button-blue').click(function (e) {
    window.open(jQuery(this).prop("href"), '_eshop');
		e.preventDefault();
	});
});

var rellax = new Rellax('.ficury__background');
var aos = AOS.init();

if (typeof zenscroll != 'undefined') {
	var defaultDuration = 777; // ms
	var edgeOffset = 56; // px
	zenscroll.setup(defaultDuration, edgeOffset);
}

;(function ($) {

	$('.card-lightbox').magnificPopup({
		gallery: {
			enabled: true
		},
		type: 'image',
		iframe: {
			markup: '<div class="mfp-iframe-scaler">' +
			'<div class="mfp-close"></div>' +
			'<iframe class="mfp-iframe" frameborder="0" allowfullscreen></iframe>' +
			'</div>', // HTML markup of popup, `mfp-close` will be replaced by the close button

			patterns: {
				youtube: {
					index: 'youtube.com/', // String that detects type of video (in this case YouTube). Simply via url.indexOf(index).

					id: 'v=', // String that splits URL in a two parts, second part should be %id%
					// Or null - full URL will be returned
					// Or a function that should return %id%, for example:
					// id: function(url) { return 'parsed id'; }

					src: 'https://www.youtube.com/embed/%id%?autoplay=1' // URL that will be set as a source for iframe.
				}

			},

			srcAction: 'iframe_src' // Templating object key. First part defines CSS selector, second attribute. "iframe_src" means: find "iframe" and set attribute "src".
		}
	});

	/* Setting initial height for foto_reference__cards section */
	$(window).on('load orientationchange resize', function () {
		var fotoReferenceCards = $('.foto_reference__cards'),
				picHeight = fotoReferenceCards.find('.card-lightbox:first-of-type img').height(),
				sectionMaxHeight = parseInt(fotoReferenceCards.css('max-height'));

		if ((picHeight + 10) !== sectionMaxHeight) {
			fotoReferenceCards.css({
				maxHeight: picHeight + 10
			})
		}
	});

	/* whole section toggle for foto_reference__cards */
	var isCardSectionExtended = false,
			showMoreText = $('.foto_reference__show-more__text'),
			fotoReferenceCards = $('.foto_reference__cards'),
			initialShowMoreText = showMoreText.text();

	showMoreText.on('click', function () {
		if (!isCardSectionExtended) {
			fotoReferenceCards.addClass('foto_reference__cards--extended');
			showMoreText.text('Skrýt');
			isCardSectionExtended = true;
		} else {
			fotoReferenceCards.removeClass('foto_reference__cards--extended');
			showMoreText.text(initialShowMoreText);
			isCardSectionExtended = false;
		}

	});

	// lightbox for christmas minisite
	$('.christmas-lightbox').magnificPopup({
		gallery: {
			enabled: true
		},
		type: 'image',
		iframe: {
			markup: '<div class="mfp-iframe-scaler">' +
			'<div class="mfp-close"></div>' +
			'<iframe class="mfp-iframe" frameborder="0" allowfullscreen></iframe>' +
			'</div>', // HTML markup of popup, `mfp-close` will be replaced by the close button

			patterns: {
				youtube: {
					index: 'youtube.com/', // String that detects type of video (in this case YouTube). Simply via url.indexOf(index).

					id: 'v=', // String that splits URL in a two parts, second part should be %id%
					// Or null - full URL will be returned
					// Or a function that should return %id%, for example:
					// id: function(url) { return 'parsed id'; }

					src: 'https://www.youtube.com/embed/%id%?autoplay=1' // URL that will be set as a source for iframe.
				}

			},

			srcAction: 'iframe_src' // Templating object key. First part defines CSS selector, second attribute. "iframe_src" means: find "iframe" and set attribute "src".
		}
	})

})(jQuery);
