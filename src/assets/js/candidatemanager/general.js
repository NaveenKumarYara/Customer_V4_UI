/* Custom General jQuery
/*--------------------------------------------------------------------------------------------------------------------------------------*/
;(function($, window, document, undefined) {
	//Genaral Global variables
	//"use strict";
	var $win = $(window);
	var $doc = $(document);
	var $winW = function(){ return $(window).width(); };
	var $winH = function(){ return $(window).height(); };
	var $screensize = function(element){  
			$(element).width($winW()).height($winH());
		};
		
		var screencheck = function(mediasize){
			if (typeof window.matchMedia !== "undefined"){
				var screensize = window.matchMedia("(max-width:"+ mediasize+"px)");
				if( screensize.matches ) {
					return true;
				}else {
					return false;
				}
			} else { // for IE9 and lower browser
				if( $winW() <=  mediasize ) {
					return true;
				}else {
					return false;
				}
			}
		};

	$doc.ready(function() {
/*--------------------------------------------------------------------------------------------------------------------------------------*/		
		// Remove No-js Class
		$("html").removeClass('no-js').addClass('js');
		
		
		
		/* Get Screen size
		---------------------------------------------------------------------*/
		/*$win.load(function(){
			$win.on('resize', function(){
				$screensize('your selector');	
			}).resize();	
		});*/
		
		
		/* Menu ICon Append prepend for responsive
		---------------------------------------------------------------------*/
		$(window).on('resize', function(){
			if (screencheck(767)) {
				if(!$('#menu').length){
					$('#mainmenu').prepend('<a href="#" id="menu" class="menulines-button"><span class="menulines"></span> <em>Menu</em></a>');
				}
			} else {
				$("#menu").remove();
			}
		}).resize();

		/* This adds placeholder support to browsers that wouldn't otherwise support it. 
		---------------------------------------------------------------------*/
		if (document.createElement("input").placeholder === undefined) {
			var active = document.activeElement;
			$(':text').focus(function () {
				if ($(this).attr('placeholder') !== '' && $(this).val() === $(this).attr('placeholder')) {
					$(this).val('').removeClass('hasPlaceholder');
				}
			}).blur(function () {
				if ($(this).attr('placeholder') !== '' && ($(this).val() === '' || $(this).val() === $(this).attr('placeholder'))) {
					$(this).val($(this).attr('placeholder')).addClass('hasPlaceholder');
				}
			});
			$(':text').blur();
			$(active).focus();
			$('form:eq(0)').submit(function () {
				$(':text.hasPlaceholder').val('');
			});
		}
		
		
		/* Tab Content box 
		---------------------------------------------------------------------*/
		var tabBlockElement = $('.tab-data');
			$(tabBlockElement).each(function() {
				var $this = $(this),
					tabTrigger = $this.find(".tabnav li"),
					tabContent = $this.find(".tabcontent");
					var textval = [];
					tabTrigger.each(function() {
						textval.push( $(this).text() );
					});	
				$this.find(tabTrigger).first().addClass("active");
				$this.find(tabContent).first().show();

				
				$(tabTrigger).on('click',function () {
					$(tabTrigger).removeClass("active");
					$(this).addClass("active");
					$(tabContent).hide().removeClass('visible');
					var activeTab = $(this).find("a").attr("data-rel");
					$this.find('#' + activeTab).fadeIn('normal').addClass('visible');
								
					return false;
				});
			
				var responsivetabActive =  function(){
				if (screencheck(767)){
					if( !$('.tabMobiletrigger').length ){
						$(tabContent).each(function(index) {
							$(this).before("<h2 class='tabMobiletrigger'>"+textval[index]+"</h2>");	
							$this.find('.tabMobiletrigger:first').addClass("rotate");
						});
						$('.tabMobiletrigger').click('click', function(){
							var tabAcoordianData = $(this).next('.tabcontent');
							if($(tabAcoordianData).is(':visible') ){
								$(this).removeClass('rotate');
								$(tabAcoordianData).slideUp('normal');
								//return false;
							} else {
								$this.find('.tabMobiletrigger').removeClass('rotate');
								$(tabContent).slideUp('normal');
								$(this).addClass('rotate');
								$(tabAcoordianData).not(':animated').slideToggle('normal');
							}
							return false;
						});
					}
						
				} else {
					$('.tabMobiletrigger').remove();
					$this.find(tabTrigger).removeClass("active").first().addClass('active');
					$this.find(tabContent).hide().first().show();			
				}
			};
			$(window).on('resize', function(){
				if(!$this.hasClass('only-tab')){
					responsivetabActive();
				}
			}).resize();
		});
		
		/* Accordion box JS
		---------------------------------------------------------------------*/
		$('.accordion-databox').each(function() {
			var $accordion = $(this),
				$accordionTrigger = $accordion.find('.accordion-trigger'),
				$accordionDatabox = $accordion.find('.accordion-data');
				
				$accordionTrigger.first().addClass('open');
				$accordionDatabox.first().show();
				
				$accordionTrigger.on('click',function (e) {
					var $this = $(this);
					var $accordionData = $this.next('.accordion-data');
					if( $accordionData.is($accordionDatabox) &&  $accordionData.is(':visible') ){
						$this.removeClass('open');
						$accordionData.slideUp(400);
						e.preventDefault();
					} else {
						$accordionTrigger.removeClass('open');
						$this.addClass('open');
						$accordionDatabox.slideUp(400);
						$accordionData.slideDown(400);
					}
				});
		});
		
		/*Custom Radio and Checkbox
		---------------------------------------------------------------------*/
		/*if($('input[type="checkbox"], input[type="radio"]').length){
			$('input[type="checkbox"], input[type="radio"]').ezMark();
		}*/
		
		/* MatchHeight Js
		-------------------------------------------------------------------------*/
		if($('.matchheightbox').length){
			$('.matchheightbox').matchHeight();
		}
		
		/*Mobile menu click
		---------------------------------------------------------------------*/
		$(document).on('click',"#menu", function(){
			$(this).toggleClass('menuopen');
			$(this).next('ul').slideToggle('normal');
			return false;
		});


		$('.revamp__candidate__grid__list .btn-grid').click(function () {
			$('.revamp__candidate__grid__list .data-grid-table').hide();
			$('.revamp__candidate__grid__list .data-grid-view').show();
			$('.revamp__candidate__grid__list .btn-list').removeClass('active');
			$(this).addClass('active');
		});

		$('.revamp__candidate__grid__list .btn-list').click(function () {
			$('.revamp__candidate__grid__list .data-grid-view').hide();
			$('.revamp__candidate__grid__list .data-grid-table').show();
			$('.revamp__candidate__grid__list .btn-grid').removeClass('active');
			$(this).addClass('active');
		});

		$('.revamp__search__container .btn-filter').click(function () {
			if ($('.revamp__filter__sidebar__box').is(':hidden')) {
				$('.revamp__filter__sidebar__box').not(':animated').fadeIn();
			} else {
				$('.revamp__filter__sidebar__box').fadeOut();
			}
		});

		$('[data-toggle="tooltip"]').tooltip();
		

		$('.data-grid-view .col__container').click(function () {
			if ($('.data-grid-view').hasClass('full')) {
				$('.data-grid-view .btn-cross').show();
				$('.data-grid-view').removeClass('full');
				if ($('.data-grid-slick').length) {
					$('.data-grid-slick').slick({
						dots: false,
						infinite: false,
						speed: 300,
						arrows:true,
						slidesToShow:1,
						slidesToScroll:1
					});
				}
			
			} 
		})

		$('.data-grid-view .btn-cross').click(function () {
			$('.data-grid-view').addClass('full');
			$('.data-grid-slick').slick('unslick');
			$(this).hide();
		});

	

		$(document).on('click touchstart', '.filter-technology', function(e){
			var $dropdown = $(this).parents('.col').find('.filter__by__tech');
			if($dropdown.is(':hidden') ){
				$('.filter__by__loc').hide();
				$dropdown.not(':animated').fadeIn();
				
			}
			return false;
		});

		$(document).on('click touchstart', '.filter-location', function(e){
			var $dropdown = $(this).parents('.col').find('.filter__by__loc');
			if($dropdown.is(':hidden') ){
				$('.filter__by__tech').hide();
				$dropdown.not(':animated').fadeIn();
			}
			return false;
		});
	

		$(document).on('click touchend', function(e){
			if (!$(".filter-location").is(e.target) && $(".filter-location").has(e.target).length==0 && !$(".filter__by__loc").is(e.target) && $(".filter__by__loc").has(e.target).length==0)
  			{
				$('.filter__by__loc').not(':animated').fadeOut();
			}
		});
		

		$(document).on('click touchend', function(e){
			if (!$(".filter-technology").is(e.target) && $(".filter-technology").has(e.target).length==0 && !$(".filter__by__tech").is(e.target) && $(".filter__by__tech").has(e.target).length==0)
  			{
				$('.filter__by__tech').not(':animated').fadeOut();
			}
		});
		
		$('.revamp__filter__sidebar__box > .scroll-box > ul > li').hover(function() {
			if (!screencheck(1023)) {
				if ($(this).find('.filter__sub__search').is(':hidden')) {
					$('.filter__sub__search').fadeOut();
					$(this).find('.filter__sub__search').not(':animated').fadeIn();
				}
			}
		}, function () {
			if (!screencheck(1023)) {
				$('.filter__sub__search').fadeOut();
			}
		})

		$('.revamp__filter__sidebar__box > .scroll-box > ul > li').click(function () {
			if (screencheck(1023)) {
				if ($(this).find('.filter__sub__search').is(':hidden')) {
					$('.filter__sub__search').fadeOut();
					$(this).find('.filter__sub__search').not(':animated').fadeIn();
				} else {
					$('.filter__sub__search').fadeOut();
				}
			}
		});
		

/*--------------------------------------------------------------------------------------------------------------------------------------*/		
	});	

/*All function nned to define here for use strict mode
----------------------------------------------------------------------------------------------------------------------------------------*/


	
/*--------------------------------------------------------------------------------------------------------------------------------------*/
})(jQuery, window, document);