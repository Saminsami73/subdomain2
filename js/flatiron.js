var mobile = false;
var mobileBreak = 768;
if($(window).width() <= mobileBreak){mobile = true;}
var is_firefox = navigator.userAgent.toLowerCase().indexOf('firefox') > -1;
var path;
function freezePage(){$('body').css({'width':'100%','height':'100%','overflow':'hidden'});}
function unfreezePage(){$('body').css({'width':'','height':'','overflow':''});}
function animScroll(sec, speed, offset){
	activeOffset = $(sec).offset().top+offset;	
	TweenMax.to('html,body', speed, {scrollTop:activeOffset, ease:Expo.easeInOut});
}

// disable interval while tab is open

var pageInactive = false;
$(window).focus(function() {
	pageInactive = false;
});

$(window).blur(function() {
    pageInactive = true;
});





/*! - GLOBAL ***************************** */





//! - GLOBAL: 0 RESIZE

var winW = $(window).width();
var winH = window.innerHeight;

$(window).resize(function(){
	winW = $(window).width();
	winH = window.innerHeight;
	//console.log(winW+' / '+winH);
	
	if(winW<=mobileBreak && !mobile){
		mobile = true;
		
		if(stickyOpen){			
			$('#globalHeader').removeClass('sticky');
			stickyOpen = false;
		}
	}
	if(winW>mobileBreak && mobile){
		mobile = false;
		
		// if already scrolled, set sticky
		if(sT>0 && !stickyOpen){
			setSticky();
		}
	}
	
	// toggle slider swipe for mobile
	if($('body').attr('id') == 'home'){
		if(winW<=550){
			if(!draggableOn){
				createSwiper();
			}
		} else {
			if(draggableOn){
				removeSwiper();
			}
		}
	}
	
	// global scale updates
	if($('.hasScale').length > 0){
		updateScales();
	}

})
//$(window).resize();




//! - GLOBAL: 1 HELPERS

function updateScales(){
	$('.hasScale').each(function(){
		if(winW<Number($(this).attr('data-limit'))){
			fullW = Number($(this).attr('data-width'));
			trgW = $(this).find('.sizer').width();
			scDif = Number(trgW/fullW);
			if(scDif > 0){
				TweenMax.set($(this).find('.willScale'), {scaleX:scDif, scaleY:scDif});
			}
		} else {
			$(this).find('.willScale').attr({'style':''});
		}
	})	
}

function sizeRetina(){
	$('.retina').each(function(){
		tmpW = Math.round($(this).find('img').width());
		$(this).find('img').css({'width':'100%','height':'auto','max-width':tmpW/2+'px'});
		$(this).removeClass('retina');
	})
}

$('#globalHeader .logo').click(function(){
	if($('body').attr('id') == 'home'){
		animScroll('body', .75, 0);
	}
})

c = 0;
$('.hasAnim').each(function(){
	if($(this).attr('id') == undefined){
		$(this).attr('id','anim'+c);
		c++;
	}
})


// hand wave hover animation (js required for smooth exit)

var handWave1 = false;
var handWaver1 = new TimelineMax({repeat:-1, onRepeat:checkHover});
handWaver1.set($('#footer').find('.icon-hand'), {rotation:0})
	.to($('#footer').find('.icon-hand'), .5, {rotation:80, ease:Quad.easeInOut})
	.to($('#footer').find('.icon-hand'), .5, {rotation:0, ease:Quad.easeInOut});

var handWave2 = false;
var handWaver2 = new TimelineMax({repeat:-1, onRepeat:checkHover});
handWaver2.set($('#contact-overlay').find('.icon-hand'), {rotation:0})
	.to($('#contact-overlay').find('.icon-hand'), .5, {rotation:80, ease:Quad.easeInOut})
	.to($('#contact-overlay').find('.icon-hand'), .5, {rotation:0, ease:Quad.easeInOut});
	
var handWave3 = false;
var handWaver3 = new TimelineMax({repeat:-1, onRepeat:checkHover});
handWaver3.set($('#globalHeader').find('.icon-hand'), {rotation:0})
	.to($('#globalHeader').find('.icon-hand'), .5, {rotation:80, ease:Quad.easeInOut})
	.to($('#globalHeader').find('.icon-hand'), .5, {rotation:0, ease:Quad.easeInOut});

handWaver1.pause();
handWaver2.pause();
handWaver3.pause();
			
$('#footer').find('.cta-bar').mouseenter(function(){
	if(winW>1024){
		handWave1 = true;
		handWaver1.play(0);		
	}
})
$('#footer').find('.cta-bar').mouseleave(function(){
	handWave1 = false;
})
$('#contact-overlay').find('.cta-bar').mouseenter(function(){
	if(winW>1024){
		handWave2 = true;
		handWaver2.play(0);		
	}
})
$('#contact-overlay').find('.cta-bar').mouseleave(function(){
	handWave2 = false;
})
$('#globalHeader').find('.cta-btn').mouseenter(function(){
	if(winW>1024){
		handWave3 = true;
		handWaver3.play(0);		
	}
})
$('#globalHeader').find('.cta-btn').mouseleave(function(){
	handWave3 = false;
})

function checkHover(){
	if(!handWave1){
		handWaver1.pause();
	}
	if(!handWave2){
		handWaver2.pause();
	}
	if(!handWave3){
		handWaver3.pause();
	}
}





//! - GLOBAL: 2 LOADER

var loadReady = false;
	
freezePage();

function animateLogo(){	
	
	TweenMax.to($('#loader').find('.tri'), .75, {x:0, y:0, ease:Elastic.easeInOut.config(2,2)})
	TweenMax.to($('#loader').find('.rect'), .75, {delay:.5, scaleY:1, ease:Elastic.easeInOut.config(2,2), onComplete:function(){
		loadReady = true;
	}})
	TweenMax.to($('#loader').find('.circ'), .75, {delay:1, scaleX:1, scaleY:1, ease:Elastic.easeOut.config(2,2)})	
}

if($('body').attr('id') == 'home'){
	setTimeout(function(){
		TweenMax.to('.logo-shapes', .5, {opacity:1, onComplete:function(){
			animateLogo();
		}})	
	}, 500);
}

$(window).on('load', function(){
	
	if($('body').attr('id') == 'home'){
		
		loadChecker = setInterval(function(){
			if(loadReady){
				
				// slide over
	 			TweenMax.to('.load-clip', .6, {delay:.2, x:0, ease:Power3.easeInOut})
	 			TweenMax.to('.logo-text', .4, {delay:.4, 'width':'208px', opacity:1, ease:Power3.easeInOut})
	 			
	 			loadSC = .8; if(winW<=650){loadSC = .4;}
	
	 			TweenMax.to('.load-clip', .5, {delay:1, opacity:0, ease:Power3.easeInOut})
	 			
	 			TweenMax.to('#loader', .5, {delay:1.2, opacity:0, 'display':'none', onComplete:function(){
	 				unfreezePage();
	 			}});
	 			
				$(window).resize();
				
				// size retina images
				if($('.retina').length>0){
					sizeRetina();
				}
				
				// start ScrollMagic
				initScrollMagic();
		
				clearInterval(loadChecker);
			}
		}, 30)
	
	
	// generic page; skip loader animation
	
	} else {
		TweenMax.to('#loader', .5, {delay:1.2, opacity:0, 'display':'none', onComplete:function(){
 			unfreezePage();
 		}});
 			
		$(window).resize();
	}
	
})





//! - GLOBAL: 3 MENU

var menuOpen = false;

$('.menu-btn').click(function(){				
	if(!menuOpen){		
		
		// set for menu view
		$('#globalMenuConf').addClass('open expanded');
		
		// animate open
		TweenMax.set('#menu-scroll', {scrollTop:0})
		TweenMax.to('.menu-wrap', .75, {opacity:1, 'display':'block', onComplete:function(){freezePage();}})
		
		menuOpen = true;
	} else {			
		closeMenu();	
	}
	return false;
})

function closeMenu(){	
	$('#globalMenuConf').removeClass('open');
	
	TweenMax.to('.menu-wrap', .5, {opacity:0, 'display':'none', onComplete:function(){
		unfreezePage();
		$('.menu-wrap').hide();
		$('#globalMenu').removeClass('expanded');
	}})			

	menuOpen = false;
}





//! - GLOBAL: 4 FORM SUBMIT

var formSent = false;
var formURL = $('#contactForm').attr('action');

$('.global-form').submit(function(){
	if(validateForm($(this))){
		sendForm($(this));
	}
	return false;
});

function sendForm(formObj){

// animation actions
TweenMax.set($(formObj).parents('.overlay').find('.thank-you .txt'), {opacity:0})
TweenMax.to($(formObj).parents('.overlay').find('.thank-you'), .5, {opacity:.7, 'display':'block'})

var formData = formObj.serialize();

$.ajax({
    url: formURL,
    type: 'POST',
    data: formData,
        
    success: function(result){							
		TweenMax.to($(formObj).parents('.overlay').find('.thank-you'), .3, {opacity:1, onComplete:function(){
			shortH = $('.contact-form').outerHeight()-$('.contact-form').find('.cta-bar').height();
			TweenMax.to($('.contact-form'), .5, {'height':shortH, ease:Power3.easeInOut});
			TweenMax.to($(formObj).parents('.overlay').find('.thank-you .txt'), .5, {opacity:1});
			
			// reset form
			tmpid = $(formObj).attr('id');
			document.getElementById(tmpid).reset();
		
			formSent = true;
		}})	
    }
});

}

function validateForm(formObj){	
	var vNum = 0;
	$(formObj).find('[data-type="req"]').each(function(){
		if($(this).val() == ""){
			vNum++;
			$(this).parents('.field-wrap').addClass('error');
		}
	});
	if(vNum==0){
		return true;
	} else {
		return false;
	}
}

function refreshForm(){
	$('.overlay').find('.thank-you').css({'opacity':0,'display':'none'});
	$('.contact-form').height('');
	formSent = false;
}

// reset error on click

$('[data-type="req"]').on('focus click',function(){
	if($(this).parents('.field-wrap').hasClass('error')){
		$(this).parents('.field-wrap').removeClass('error');
	}
})





//! - GLOBAL: 5 OVERLAYS

var overlayOpen = false;

$('[data-rel="contact"]').click(function(){
	$('#globalHeader').find('.cta-btn').addClass('open');
	$('#contact-overlay').addClass('on');
	
	// if form was sent, refresh
	if(formSent){
		refreshForm();
	}
	
	// fade on overlay
	TweenMax.to('#contact-overlay', .5, {opacity:1, 'display':'block'})
	freezePage();
	overlayOpen = true;
	
	return false;
})

$('.close-btn, .overlayWrap').click(function(){
	$('#globalHeader').find('.cta-btn').removeClass('open');
	
	TweenMax.to('#contact-overlay', .5, {opacity:0, 'display':'none', onComplete:function(){
		$('#contact-overlay').removeClass('on');
		overlayOpen = false;
		unfreezePage();
	}})
	return false;
})

$('.contact-form').click(function(e){
	e.stopPropagation();
})






/*! - SCROLLING ***************************** */





//! - SCROLLING: 0 STICKY ELEMENTS

var sT;
var stickyOpen = false;

$(window).on("scrollstart",function(){
	scroll_interval = setInterval(function(){			
	
		sT = $(this).scrollTop();
		
		// set sticky bar
		if(winW>mobileBreak){
			setSticky();
		}	
		
	}, 10);
})

$(window).on("scrollstop",function(){
	if(scroll_interval){
		clearInterval(scroll_interval);
	}
})

function setSticky(){
	
	// drop sticky bar on scroll up
	if(sT>0){	
		if(!stickyOpen){
			$('#globalHeader').addClass('sticky');
			stickyOpen = true;
		}
	} else {	
		if(stickyOpen){
			$('#globalHeader').removeClass('sticky');					
			stickyOpen = false;
		}
	}
	
	lastSt = sT;
}





//! - SCROLLING: 1 SCROLLMAGIC

function initScrollMagic(){

var controller = new ScrollMagic.Controller();	
	
// global: sections with animations

$('.hasAnim').each(function(){
    var currentElem = '#'+$(this).attr('id');
    var scene = new ScrollMagic.Scene({triggerElement: currentElem, triggerHook: 2, duration: winH+$(currentElem).outerHeight()})
        .addTo(controller);
        scene.setClassToggle(currentElem, "on");
});



// individual section functions start/stop

// hero paths
	
var heroScene = new ScrollMagic.Scene({
		triggerElement: "#hero",
		triggerHook: 2,
		duration: winH+$('#hero').outerHeight()
	})
	.on('enter',function(){
		turnOnHero();
	})
	.on('leave',function(){
		turnOffHero();
	})
	.addTo(controller);


// approach layer 1 - animations on enter
	
var approach1Scene = new ScrollMagic.Scene({
		triggerElement: "#approach1",
		triggerHook: 2,
		duration: winH+$('#approach1').outerHeight()
	})
	.on('enter',function(){
		turnOnApproach1();
	})
	.on('leave',function(){
		turnOffApproach1();
	})
	.addTo(controller);
	
	
// approach layer 2 - animations on enter
	
var approach2Scene = new ScrollMagic.Scene({
		triggerElement: "#approach2",
		triggerHook: 2,
		duration: winH+$('#approach2').outerHeight()
	})
	.on('enter',function(){
		turnOnApproach2();
	})
	.on('leave',function(){
		turnOffApproach2();
	})
	.addTo(controller);
		

// about anim

var scene = new ScrollMagic.Scene({triggerElement: '#about', triggerHook: 2, duration: winH+$('#about').outerHeight()+200})
    .addTo(controller);
    scene.setClassToggle('#about', "on");


// stats parallax

var stats_tl = new TimelineMax();
var stats_tween1 = new TweenMax($('#stats-pattern1'), 1, {startAt:{x:-200}, x:200, ease:Linear.easeNone});
	stats_tl.add(stats_tween1);
	  
	stats_tween1 = new ScrollMagic.Scene({
			triggerElement: "#stats",
			triggerHook: 2,
			duration: winH+$('#stats').outerHeight()		
		})
		.setTween(stats_tl)
		.addTo(controller);

}



/*! - SECTION ***************************** */





//! - SECTION: 0 HERO

function turnOnHero(){	
	// animate data lines along path
	
	// level 1
	hero1_path1.seek(0).play();
	hero1_path2.seek(.75).play();
	hero1_path3.seek(1.875).play();
	
	// level 2
	hero2_path1.seek(.675).play();
	hero2_path2.seek(0).play();
	hero2_path3.seek(0).play();
	
	// level 3
	hero3_path1.seek(1.8).play();
	
	// level 5
	hero5_path1.seek(0).play();
}

function turnOffHero(){
	// level 1
	hero1_path1.pause(0);
	hero1_path2.pause(0);
	hero1_path3.pause(0);
	
	// level 2
	hero2_path1.pause(0);
	hero2_path2.pause(0);
	hero2_path3.pause(0);
	
	// level 3
	hero3_path1.pause(0);
	
	// level 5
	hero5_path1.pause(0);
}




//! - SECTION: 2 APPROACH

// layer 1

function turnOnApproach1(){
	// reset positions
	TweenMax.set($('#approach1').find('.bar'), {scaleX:0});
	TweenMax.set($('.draw-pie1'), {drawSVG:'25% 25%'});
	TweenMax.set($('.draw-pie2'), {drawSVG:'25% 25%'});

	// draw pie chart 1	
	TweenMax.to($('.draw-pie1'), 1.5, {delay:.5, startAt:{'display':'block'}, drawSVG:'25% 50%', ease:Quad.easeInOut});
	
	// animate graph 1
	$('#approach1').find('.bar-graph[data-num="1"]').find('.bar').each(function(i){
		TweenMax.to($(this), 1.5, {delay:.75+(i*.3), scaleX:1, ease:Power3.easeInOut});
	})	
	
	// draw pie chart 2	
	TweenMax.to($('.draw-pie2'), 1.5, {delay: 1.75, startAt:{'display':'block'}, drawSVG:'25% 49%', ease:Quad.easeInOut});
	
	// animate graph 1
	$('#approach1').find('.bar-graph[data-num="2"]').find('.bar').each(function(i){
		TweenMax.to($(this), 1.5, {delay:2+(i*.3), scaleX:1, ease:Power3.easeInOut});
	})
	
	// animate data lines along path
	approach1_path1.seek(0).play();
	approach1_path2.seek(.2).play();
	approach1_path3.seek(.3).play();
	approach1_path4.seek(.7).play();
}

// starting position
TweenMax.set($('.draw-pie1'), {drawSVG:'25% 25%', 'display':'none'});
TweenMax.set($('.draw-pie2'), {drawSVG:'25% 25%', 'display':'none'});

function turnOffApproach1(){
	TweenMax.killTweensOf('.draw-pie1, .draw-pie2, .bar');
	TweenMax.set($('#approach1').find('.bar'), {scaleX:0});
	TweenMax.set($('.draw-pie1'), {drawSVG:'25% 25%', 'display':'none'});
	TweenMax.set($('.draw-pie2'), {drawSVG:'25% 25%', 'display':'none'});
	
	// stop all timelines
	approach1_path1.pause(0);
	approach1_path2.pause(0);
	approach1_path3.pause(0);
	approach1_path4.pause(0);
}



// layer 2

function turnOnApproach2(){	
	// animate data lines along path
	approach2_path1.seek(0).play();
	approach2_path2.seek(.6).play();
}

function turnOffApproach2(){
	// stop all timelines
	approach2_path1.pause(0);
	approach2_path2.pause(0);
}





//! - SECTION: 4 STATS

var swW;
var swGap;
var swCur;
var nextCur = 0;
var totSwSlides;
var swActive = 0;
var draggableOn = false;
var draggable;

function updateSwipe(){	
	totalSwW = (swW*totSwSlides)+(swGap*(totSwSlides-1));	
	swGridW = (swW+swGap);
	swBoundX = totalSwW-swW;
	
	// update draggable instance for mobile
	if(draggable){
		updateSwipeBounds();
	}
	
	// position timeline if moved
	swX = (swW*swActive)+(swGap*swActive);
	TweenMax.set('#swipe-slider', {'transform':'translate3d('+-swX+'px,0,0)'})
}

function buildSwiper(trg){

	Draggable.create("#swipe-slider", {
		type:"x",
		cursor:"move",
		throwProps:true,
		zIndexBoost:false,
		edgeResistance:0.65,
		allowNativeTouchScrolling: true,
		bounds: {minX:-swBoundX, maxX:0, minY:0, maxY:0},
		
		snap: {
	        x: function(endValue) {
	            return Math.round(endValue / swGridW) * swGridW;
	            
	        },
	    },
	    onThrowComplete: function(){		   
		    updateSwActive(draggable.x);
	    }
	});
	draggable = Draggable.get("#swipe-slider");	
	draggableOn = true;
}

function updateSwipeBounds(){
	draggable.applyBounds({minX:-swBoundX, maxX:0, minY:0, maxY:0});
}

function removeSwiper(){
	draggable.kill();
	draggableOn = false;
	$('#swipe-slider').attr('style','');
}

function updateSwActive(endX){
	swActive = Math.round(-endX/(swW+swGap));
	swCur = swActive;
	nextCur = swActive;
	updateSwDots();
}

function createSwiper(){
	swW = 200;
	swGap = 40;
	swActive = 0;
	swCur = 0;
	totSwSlides = $('.stats-box').length;
	
	updateSwDots();
	updateSwipe();
	buildSwiper();
}

function updateSwDots(){
	$('#stats').find('.dot-btn').removeClass('on');
	$('#stats').find('.dot-btn[data-num="'+swCur+'"]').addClass('on');
}

// dot navigation

$('#stats').find('.dot-btn').click(function(){
	$('#stats').find('.dot-btn').removeClass('on');
	$(this).addClass('on');
	
	swCur = $(this).attr('data-num');
	nextCur = $(this).attr('data-num');
	changeSwSlider();
})

function changeSwSlider(){	
	// change active num, get new offset position
	newPos = (swW*swCur)+(swGap*swCur);
	
	// slide over
	TweenMax.to($('#swipe-slider'), 1, {x:-newPos, ease:Power3.easeInOut});	
}





//! - SECTION: 5 PARTNERS

$('.partner-grid').each(function(){
	
	// add forced line break for flex spacing
	$(this).find('.partner-box:nth-child(4n)').after('<span class="break"></span>');
	
	// add fillers to keep last row aligned left
	partnerRem = Number($(this).find('.partner-box').length%4);

	if(partnerRem != 0){
		
		partnerFillers = '';
		for(i=0;i<partnerRem;i++){
			partnerFillers += '<div class="partner-box filler"></div>';
		}	
		$(this).append(partnerFillers);
	}	
})





//! - ANIMATION: 0 LINE MOVERS

// setup all paths for animations

$('.data-path').each(function(){
	for(i=0;i<2;i++){
		$(this).find('.dp-base').clone().removeClass('dp-base').addClass('dp-draw').attr('data-num',(i+1)).appendTo($(this).find('svg'));
	}
})





// APPROACH LAYER 1

// animate paths in timeline (start bottom path draw, then slight delay cover path to look like it is moving)

var approach1_path1 = new TimelineMax({repeat:-1, repeatDelay:1});
	approach1_path1.set($('#approach1').find('.data-path[data-num="1"]').find('.dp-draw'), {drawSVG:'0% 0%'})
	.to($('#approach1').find('.data-path[data-num="1"]').find('.dp-draw[data-num="1"]'), 1.5, {startAt:{drawSVG:'0% 0%'}, drawSVG:'0% 100%', ease:Linear.easeNone}, 0)
	.to($('#approach1').find('.data-path[data-num="1"]').find('.dp-draw[data-num="2"]'), 1.5, {delay:.15, startAt:{drawSVG:'0% 0%'}, drawSVG:'0% 100%', ease:Linear.easeNone}, 0)

var approach1_path2 = new TimelineMax({repeat:-1, repeatDelay:1});
	approach1_path2.set($('#approach1').find('.data-path[data-num="1"]').find('.dp-draw'), {drawSVG:'0% 0%'})
	.to($('#approach1').find('.data-path[data-num="2"]').find('.dp-draw[data-num="1"]'), 1.125, {startAt:{drawSVG:'0% 0%'}, drawSVG:'0% 100%', ease:Linear.easeNone}, 0)
	.to($('#approach1').find('.data-path[data-num="2"]').find('.dp-draw[data-num="2"]'), 1.125, {delay:.18, startAt:{drawSVG:'0% 0%'}, drawSVG:'0% 100%', ease:Linear.easeNone}, 0)

var approach1_path3 = new TimelineMax({repeat:-1, repeatDelay:1});
	approach1_path3.set($('#approach1').find('.data-path[data-num="1"]').find('.dp-draw'), {drawSVG:'0% 0%'})
	.to($('#approach1').find('.data-path[data-num="3"]').find('.dp-draw[data-num="1"]'), 3, {startAt:{drawSVG:'100% 100%'}, drawSVG:'0% 100%', ease:Linear.easeNone}, 0)
	.to($('#approach1').find('.data-path[data-num="3"]').find('.dp-draw[data-num="2"]'), 3, {delay:.15, startAt:{drawSVG:'100% 100%'}, drawSVG:'0% 100%', ease:Linear.easeNone}, 0)

var approach1_path4 = new TimelineMax({repeat:-1, repeatDelay:1});
	approach1_path4.set($('#approach1').find('.data-path[data-num="1"]').find('.dp-draw'), {drawSVG:'0% 0%'})
	.to($('#approach1').find('.data-path[data-num="4"]').find('.dp-draw[data-num="1"]'), 1.5, {startAt:{drawSVG:'100% 100%'}, drawSVG:'0% 100%', ease:Linear.easeNone}, 0)
	.to($('#approach1').find('.data-path[data-num="4"]').find('.dp-draw[data-num="2"]'), 1.5, {delay:.225, startAt:{drawSVG:'100% 100%'}, drawSVG:'0% 100%', ease:Linear.easeNone}, 0)

approach1_path1.pause();
approach1_path2.pause();
approach1_path3.pause();
approach1_path4.pause();





// APPROACH LAYER 2

var approach2_path1 = new TimelineMax({repeat:-1, repeatDelay:1});
	approach2_path1.set($('#approach2').find('.data-path[data-num="1"]').find('.dp-draw'), {drawSVG:'0% 0%'})
	.to($('#approach2').find('.data-path[data-num="1"]').find('.dp-draw[data-num="1"]'), 1.125, {startAt:{drawSVG:'0% 0%'}, drawSVG:'0% 100%', ease:Linear.easeNone}, 0)
	.to($('#approach2').find('.data-path[data-num="1"]').find('.dp-draw[data-num="2"]'), 1.125, {delay:.18, startAt:{drawSVG:'0% 0%'}, drawSVG:'0% 100%', ease:Linear.easeNone}, 0)

var approach2_path2 = new TimelineMax({repeat:-1, repeatDelay:1});
	approach2_path2.set($('#approach2').find('.data-path[data-num="1"]').find('.dp-draw'), {drawSVG:'0% 0%'})
	.to($('#approach2').find('.data-path[data-num="2"]').find('.dp-draw[data-num="1"]'), 3.3, {startAt:{drawSVG:'0% 0%'}, drawSVG:'0% 100%', ease:Linear.easeNone}, 0)
	.to($('#approach2').find('.data-path[data-num="2"]').find('.dp-draw[data-num="2"]'), 3.3, {delay:.15, startAt:{drawSVG:'0% 0%'}, drawSVG:'0% 100%', ease:Linear.easeNone}, 0)

approach2_path1.pause();
approach2_path2.pause();





// HERO LEVEL 1

var hero1_path1 = new TimelineMax({repeat:-1, repeatDelay:0});
	hero1_path1.set($('#hero .level1').find('.data-path[data-num="1"]').find('.dp-draw'), {drawSVG:'0% 0%'})
	.to($('#hero .level1').find('.data-path[data-num="1"]').find('.dp-draw[data-num="1"]'), 3.75, {startAt:{drawSVG:'0% 0%'}, drawSVG:'0% 100%', ease:Linear.easeNone}, 0)
	.to($('#hero .level1').find('.data-path[data-num="1"]').find('.dp-draw[data-num="2"]'), 3.75, {delay:.15, startAt:{drawSVG:'0% 0%'}, drawSVG:'0% 100%', ease:Linear.easeNone}, 0)

var hero1_path2 = new TimelineMax({repeat:-1, repeatDelay:.2});
	hero1_path2.set($('#hero .level1').find('.data-path[data-num="1"]').find('.dp-draw'), {drawSVG:'0% 0%'})
	.to($('#hero .level1').find('.data-path[data-num="2"]').find('.dp-draw[data-num="1"]'), 2.625, {startAt:{drawSVG:'0% 0%'}, drawSVG:'0% 100%', ease:Linear.easeNone}, 0)
	.to($('#hero .level1').find('.data-path[data-num="2"]').find('.dp-draw[data-num="2"]'), 2.625, {delay:.18, startAt:{drawSVG:'0% 0%'}, drawSVG:'0% 100%', ease:Linear.easeNone}, 0)

var hero1_path3 = new TimelineMax({repeat:-1, repeatDelay:1});
	hero1_path3.set($('#hero .level1').find('.data-path[data-num="3"]').find('.dp-draw'), {drawSVG:'0% 0%'})
	.to($('#hero .level1').find('.data-path[data-num="3"]').find('.dp-draw[data-num="1"]'), 3.75, {startAt:{drawSVG:'0% 0%'}, drawSVG:'0% 100%', ease:Linear.easeNone}, 0)
	.to($('#hero .level1').find('.data-path[data-num="3"]').find('.dp-draw[data-num="2"]'), 3.75, {delay:.15, startAt:{drawSVG:'0% 0%'}, drawSVG:'0% 100%', ease:Linear.easeNone}, 0)

hero1_path1.pause();
hero1_path2.pause();
hero1_path3.pause();




// HERO LEVEL 2

var hero2_path1 = new TimelineMax({repeat:-1, repeatDelay:.8});
	hero2_path1.set($('#hero .level2').find('.data-path[data-num="1"]').find('.dp-draw'), {drawSVG:'0% 0%'})
	.to($('#hero .level2').find('.data-path[data-num="1"]').find('.dp-draw[data-num="1"]'), 1.125, {startAt:{drawSVG:'0% 0%'}, drawSVG:'0% 100%', ease:Linear.easeNone}, 0)
	.to($('#hero .level2').find('.data-path[data-num="1"]').find('.dp-draw[data-num="2"]'), 1.125, {delay:.165, startAt:{drawSVG:'0% 0%'}, drawSVG:'0% 100%', ease:Linear.easeNone}, 0)

var hero2_path2 = new TimelineMax({repeat:-1, repeatDelay:.8});
	hero2_path2.set($('#hero .level2').find('.data-path[data-num="2"]').find('.dp-draw'), {drawSVG:'0% 0%'})
	.to($('#hero .level2').find('.data-path[data-num="2"]').find('.dp-draw[data-num="1"]'), 1.125, {startAt:{drawSVG:'0% 0%'}, drawSVG:'0% 100%', ease:Linear.easeNone}, 0)
	.to($('#hero .level2').find('.data-path[data-num="2"]').find('.dp-draw[data-num="2"]'), 1.125, {delay:.165, startAt:{drawSVG:'0% 0%'}, drawSVG:'0% 100%', ease:Linear.easeNone}, 0)

var hero2_path3 = new TimelineMax({repeat:-1, repeatDelay:.2});
	hero2_path3.set($('#hero .level2').find('.data-path[data-num="3"]').find('.dp-draw'), {drawSVG:'0% 0%'})
	.to($('#hero .level2').find('.data-path[data-num="3"]').find('.dp-draw[data-num="1"]'), 3, {startAt:{drawSVG:'0% 0%'}, drawSVG:'0% 100%', ease:Linear.easeNone}, 0)
	.to($('#hero .level2').find('.data-path[data-num="3"]').find('.dp-draw[data-num="2"]'), 3, {delay:.15, startAt:{drawSVG:'0% 0%'}, drawSVG:'0% 100%', ease:Linear.easeNone}, 0)

hero2_path1.pause();
hero2_path2.pause();
hero2_path3.pause();





// HERO LEVEL 3

var hero3_path1 = new TimelineMax({repeat:-1});
	hero3_path1.set($('#hero .level3').find('.data-path[data-num="1"]').find('.dp-draw'), {drawSVG:'0% 0%'})
	.set($('#hero .level3').find('.data-path[data-num="1"]'), {'zIndex':2})
	.to($('#hero .level3').find('.data-path[data-num="1"]').find('.dp-draw[data-num="1"]'), 3, {startAt:{drawSVG:'0% 0%'}, drawSVG:'0% 100%', ease:Linear.easeNone}, 0)
	.to($('#hero .level3').find('.data-path[data-num="1"]').find('.dp-draw[data-num="2"]'), 3, {delay:.15, startAt:{drawSVG:'0% 0%'}, drawSVG:'0% 100%', ease:Linear.easeNone}, 0)

	.set($('#hero .level3').find('.data-path[data-num="2"]'), {'zIndex':2}, 3.15)
	.to($('#hero .level3').find('.data-path[data-num="2"]').find('.dp-draw[data-num="1"]'), 3.75, {startAt:{drawSVG:'100% 100%'}, drawSVG:'0% 100%', ease:Linear.easeNone}, 3.15)
	.to($('#hero .level3').find('.data-path[data-num="2"]').find('.dp-draw[data-num="2"]'), 3.75, {delay:.15, startAt:{drawSVG:'100% 100%'}, drawSVG:'0% 100%', ease:Linear.easeNone}, 3.15)





// HERO LEVEL 5

var hero5_path1 = new TimelineMax({repeat:-1});
	hero5_path1.set($('#hero .level5').find('.data-path[data-num="1"]').find('.dp-draw'), {drawSVG:'0% 0%'})
	.set($('#hero .level5').find('.data-path[data-num="1"]'), {'zIndex':-1})
	.to($('#hero .level5').find('.data-path[data-num="1"]').find('.dp-draw[data-num="1"]'), 2.625, {startAt:{drawSVG:'0% 0%'}, drawSVG:'0% 100%', ease:Linear.easeNone}, 0)
	.to($('#hero .level5').find('.data-path[data-num="1"]').find('.dp-draw[data-num="2"]'), 2.625, {delay:.21, startAt:{drawSVG:'0% 0%'}, drawSVG:'0% 100%', ease:Linear.easeNone}, 0)

	.set($('#hero .level5').find('.data-path[data-num="2"]'), {'zIndex':-1}, 2.835)
	.to($('#hero .level5').find('.data-path[data-num="2"]').find('.dp-draw[data-num="1"]'), 2.625, {startAt:{drawSVG:'0% 0%'}, drawSVG:'0% 100%', ease:Linear.easeNone}, 2.835)
	.to($('#hero .level5').find('.data-path[data-num="2"]').find('.dp-draw[data-num="2"]'), 2.625, {delay:.21, startAt:{drawSVG:'0% 0%'}, drawSVG:'0% 100%', ease:Linear.easeNone}, 2.835)



