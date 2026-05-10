$(window).load(function(){
	$('.loading').fadeOut('fast');
	$('.container').fadeIn('fast');
});

$('document').ready(function(){
	var vw;
	$(window).resize(function(){
		 vw = $(window).width()/2;
		$('#b1,#b2,#b3,#b4,#b5').stop();
		$('#b11').animate({top:240, left: vw-250},500);
		$('#b22').animate({top:240, left: vw-150},500);
		$('#b33').animate({top:240, left: vw-50},500);
		$('#b44').animate({top:240, left: vw+50},500);
		$('#b55').animate({top:240, left: vw+150},500);
	});

	$('#turn_on').click(function(){
		$('#bulb_yellow').addClass('bulb-glow-yellow');
		$('#bulb_red').addClass('bulb-glow-red');
		$('#bulb_blue').addClass('bulb-glow-blue');
		$('#bulb_green').addClass('bulb-glow-green');
		$('#bulb_pink').addClass('bulb-glow-pink');
		$('#bulb_orange').addClass('bulb-glow-orange');
		$('body').addClass('deep-blue'); // Changed to blue
		$(this).fadeOut('slow').delay(5000).promise().done(function(){
			$('#play').fadeIn('slow');
		});
	});

	$('#play').click(function(){
		var audio = $('.song')[0];
        audio.play();
		$('body').addClass('blue-alive'); // Fancy blue animation
		$(this).fadeOut('slow').delay(6000).promise().done(function(){
			$('#bannar_coming').fadeIn('slow');
		});
	});

	$('#bannar_coming').click(function(){
		$('.bannar').addClass('bannar-come');
		$(this).fadeOut('slow').delay(6000).promise().done(function(){
			$('#balloons_flying').fadeIn('slow');
		});
	});

	function loopOne() {
		var randleft = Math.random() * ($(window).width() - 100);
		var randtop = Math.random() * 500;
		$('#b1').animate({left:randleft,bottom:randtop},10000,function(){ loopOne(); });
	}
	function loopTwo() {
		var randleft = Math.random() * ($(window).width() - 100);
		var randtop = Math.random() * 500;
		$('#b2').animate({left:randleft,bottom:randtop},10000,function(){ loopTwo(); });
	}
	function loopThree() {
		var randleft = Math.random() * ($(window).width() - 100);
		var randtop = Math.random() * 500;
		$('#b3').animate({left:randleft,bottom:randtop},10000,function(){ loopThree(); });
	}
	function loopFour() {
		var randleft = Math.random() * ($(window).width() - 100);
		var randtop = Math.random() * 500;
		$('#b4').animate({left:randleft,bottom:randtop},10000,function(){ loopFour(); });
	}
	function loopFive() {
		var randleft = Math.random() * ($(window).width() - 100);
		var randtop = Math.random() * 500;
		$('#b5').animate({left:randleft,bottom:randtop},10000,function(){ loopFive(); });
	}

	$('#balloons_flying').click(function(){
		$('.balloon-border').animate({top:-500},8000);
		loopOne(); loopTwo(); loopThree(); loopFour(); loopFive();
		$(this).fadeOut('slow').delay(5000).promise().done(function(){
			$('#cake_fadein').fadeIn('slow');
		});
	});	

	$('#cake_fadein').click(function(){
		$('.cake').fadeIn('slow');
		$(this).fadeOut('slow').delay(3000).promise().done(function(){
			$('#light_candle').fadeIn('slow');
		});
	});

	$('#light_candle').click(function(){
		$('.fuego').fadeIn('slow');
		$(this).fadeOut('slow').promise().done(function(){
			$('#wish_message').fadeIn('slow');
		});
	});

	$('#wish_message').click(function(){
		vw = $(window).width()/2;
		$('#b1,#b2,#b3,#b4,#b5').stop();
		$('#b1').attr('id','b11');
		$('#b2').attr('id','b22');
		$('#b3').attr('id','b33');
		$('#b4').attr('id','b44');
		$('#b5').attr('id','b55');
		$('#b11').animate({top:240, left: vw-250},500);
		$('#b22').animate({top:240, left: vw-150},500);
		$('#b33').animate({top:240, left: vw-50},500);
		$('#b44').animate({top:240, left: vw+50},500);
		$('#b55').animate({top:240, left: vw+150},500);
		$('.balloons').css('opacity','0.9');
		$('.balloons h2').fadeIn(3000);
		$(this).fadeOut('slow').delay(3000).promise().done(function(){
			$('#story').fadeIn('slow');
		});
	});
	
	$('#story').click(function(){
		$(this).fadeOut('slow');
		$('.cake').fadeOut('fast').promise().done(function(){
			$('.message').fadeIn('slow');
		});
		
		var i = 1;
		function msgLoop (i) {
			$("p:nth-child("+i+")").fadeOut('slow').delay(800).promise().done(function(){
				i=i+1;
				$("p:nth-child("+i+")").fadeIn('slow').delay(1200);
				if(i == 25){ // Adjusted for the new message length
					$("p:nth-child(24)").fadeOut('slow').promise().done(function () {
						$('.cake').fadeIn('fast');
					});
				} else {
					msgLoop(i);
				}			
			});
		}
		msgLoop(i);
	});
});
