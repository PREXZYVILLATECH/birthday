// ⚙️ ========== CONFIGURATION - EDIT THIS ========== ⚙️
// Set the birthday date and time (Africa/Lagos timezone)
const BIRTHDAY_CONFIG = {
    year: 2026,        // Year of birthday
    month: 4,          // Month (0 = Jan, 1 = Feb, 2 = Mar, 3 = Apr, 4 = May)
    day: 14,           // Day of month
    hour: 0,           // Hour (0-23, 0 = midnight)
    minute: 0,         // Minute
    second: 0,
    timezone: 'Africa/Lagos'
};

// FOR TESTING: Set to true to see birthday content immediately (bypass countdown)
const TEST_MODE = true;  // Change to 'false' for real countdown

// FOR TESTING DIFFERENT DATE: Uncomment below to test countdown
// BIRTHDAY_CONFIG.month = 3;  // Test with April 14th
// BIRTHDAY_CONFIG.day = 10;    // Test with April 10th
// ===================================================

$(window).on('load', function() {
    setTimeout(function() {
        $('.loading').fadeOut('fast');
    }, 1000);
});

$(document).ready(function() {
    // Check if birthday has arrived or test mode is on
    function shouldShowBirthday() {
        if (TEST_MODE) return true;
        
        const now = new Date();
        const birthdayDate = new Date(BIRTHDAY_CONFIG.year, BIRTHDAY_CONFIG.month, 
                                       BIRTHDAY_CONFIG.day, BIRTHDAY_CONFIG.hour,
                                       BIRTHDAY_CONFIG.minute, BIRTHDAY_CONFIG.second);
        
        // Convert to Africa/Lagos time for comparison
        const nowLagos = new Date(now.toLocaleString('en-US', { timeZone: BIRTHDAY_CONFIG.timezone }));
        const birthdayLagos = new Date(birthdayDate.toLocaleString('en-US', { timeZone: BIRTHDAY_CONFIG.timezone }));
        
        return nowLagos >= birthdayLagos;
    }
    
    // Countdown function
    function updateCountdown() {
        const now = new Date();
        const birthdayDate = new Date(BIRTHDAY_CONFIG.year, BIRTHDAY_CONFIG.month,
                                       BIRTHDAY_CONFIG.day, BIRTHDAY_CONFIG.hour,
                                       BIRTHDAY_CONFIG.minute, BIRTHDAY_CONFIG.second);
        
        const nowLagos = new Date(now.toLocaleString('en-US', { timeZone: BIRTHDAY_CONFIG.timezone }));
        const birthdayLagos = new Date(birthdayDate.toLocaleString('en-US', { timeZone: BIRTHDAY_CONFIG.timezone }));
        
        const diff = birthdayLagos - nowLagos;
        
        if (diff <= 0) {
            // Birthday has arrived!
            $('#countdownScreen').fadeOut('slow', function() {
                $('#birthdayContent').fadeIn('slow');
                startBirthdayExperience();
            });
            return true;
        }
        
        const days = Math.floor(diff / (1000 * 60 * 60 * 24));
        const hours = Math.floor((diff % (86400000)) / (1000 * 60 * 60));
        const minutes = Math.floor((diff % (3600000)) / (1000 * 60));
        const seconds = Math.floor((diff % (60000)) / 1000);
        
        $('#days').text(String(days).padStart(2, '0'));
        $('#hours').text(String(hours).padStart(2, '0'));
        $('#minutes').text(String(minutes).padStart(2, '0'));
        $('#seconds').text(String(seconds).padStart(2, '0'));
        
        return false;
    }
    
    // Start countdown timer
    let countdownInterval;
    function startCountdown() {
        if (updateCountdown()) return;
        countdownInterval = setInterval(function() {
            if (updateCountdown()) {
                clearInterval(countdownInterval);
            }
        }, 1000);
    }
    
    // If birthday reached or test mode, show content immediately
    if (shouldShowBirthday()) {
        $('#countdownScreen').hide();
        $('#birthdayContent').show();
        startBirthdayExperience();
    } else {
        startCountdown();
    }
    
    // Balloon position adjustment on resize
    let vw;
    $(window).resize(function() {
        vw = $(window).width() / 2;
        repositionBalloons();
    });
    
    function repositionBalloons() {
        $('#b1,#b2,#b3,#b4,#b5,#b6,#b7').stop();
        $('#b11, #b1').animate({ top: 240, left: vw - 350 }, 500);
        $('#b22, #b2').animate({ top: 240, left: vw - 250 }, 500);
        $('#b33, #b3').animate({ top: 240, left: vw - 150 }, 500);
        $('#b44, #b4').animate({ top: 240, left: vw - 50 }, 500);
        $('#b55, #b5').animate({ top: 240, left: vw + 50 }, 500);
        $('#b66, #b6').animate({ top: 240, left: vw + 150 }, 500);
        $('#b77, #b7').animate({ top: 240, left: vw + 250 }, 500);
    }
    
    function startBirthdayExperience() {
        $('.container').fadeIn('fast');
        
        // Balloon pop effect on click
        $('.balloons').on('click', function() {
            $(this).fadeOut('fast', function() {
                $(this).fadeIn('fast');
            });
        });
        
        // Button sequences
        $('#turn_on').click(function() {
            $('#bulb_yellow').addClass('bulb-glow-yellow');
            $('#bulb_red').addClass('bulb-glow-red');
            $('#bulb_blue').addClass('bulb-glow-blue');
            $('#bulb_green').addClass('bulb-glow-green');
            $('#bulb_pink').addClass('bulb-glow-pink');
            $('#bulb_orange').addClass('bulb-glow-orange');
            $('body').css('background', 'linear-gradient(135deg, #ffecd2 0%, #fcb69f 100%)');
            $(this).fadeOut('slow').delay(5000).promise().done(function() {
                $('#play').fadeIn('slow');
            });
        });
        
        $('#play').click(function() {
            var audio = $('.song')[0];
            audio.play().catch(e => console.log('Audio play failed:', e));
            $('#bulb_yellow').addClass('bulb-glow-yellow-after');
            $('#bulb_red').addClass('bulb-glow-red-after');
            $('#bulb_blue').addClass('bulb-glow-blue-after');
            $('#bulb_green').addClass('bulb-glow-green-after');
            $('#bulb_pink').addClass('bulb-glow-pink-after');
            $('#bulb_orange').addClass('bulb-glow-orange-after');
            $(this).fadeOut('slow').delay(6000).promise().done(function() {
                $('#bannar_coming').fadeIn('slow');
            });
        });
        
        $('#bannar_coming').click(function() {
            $('.banner-img').addClass('bannar-come');
            $(this).fadeOut('slow').delay(6000).promise().done(function() {
                $('#balloons_flying').fadeIn('slow');
            });
        });
        
        // Balloon flying animations
        function createFloatAnimation(balloonId) {
            return function animate() {
                const randleft = ($(window).width() - 100) * Math.random();
                const randtop = ($(window).height() - 200) * Math.random();
                $(balloonId).animate({ left: randleft, bottom: randtop }, 10000, animate);
            };
        }
        
        $('#balloons_flying').click(function() {
            $('.balloon-border').animate({ top: -500 }, 8000);
            $('#b1,#b4,#b5,#b7').addClass('balloons-rotate-behaviour-one');
            $('#b2,#b3,#b6').addClass('balloons-rotate-behaviour-two');
            
            const balloons = ['#b1', '#b2', '#b3', '#b4', '#b5', '#b6', '#b7'];
            balloons.forEach(function(b) {
                const animate = createFloatAnimation(b);
                animate();
            });
            
            $(this).fadeOut('slow').delay(5000).promise().done(function() {
                $('#cake_fadein').fadeIn('slow');
            });
        });
        
        $('#cake_fadein').click(function() {
            $('.cake').fadeIn('slow');
            $(this).fadeOut('slow').delay(3000).promise().done(function() {
                $('#light_candle').fadeIn('slow');
            });
        });
        
        $('#light_candle').click(function() {
            $('.fuego').fadeIn('slow');
            $(this).fadeOut('slow').promise().done(function() {
                $('#wish_message').fadeIn('slow');
            });
        });
        
        $('#wish_message').click(function() {
            vw = $(window).width() / 2;
            $('.balloons').stop();
            
            // Rename balloons for final position
            $('#b1').attr('id', 'b11');
            $('#b2').attr('id', 'b22');
            $('#b3').attr('id', 'b33');
            $('#b4').attr('id', 'b44');
            $('#b5').attr('id', 'b55');
            $('#b6').attr('id', 'b66');
            $('#b7').attr('id', 'b77');
            
            repositionBalloons();
            $('.balloons').css('opacity', '0.95');
            $('.balloons h2').fadeIn(3000);
            
            // Add confetti effect
            for(let i = 0; i < 50; i++) {
                createConfetti();
            }
            
            $(this).fadeOut('slow').delay(3000).promise().done(function() {
                $('#story').fadeIn('slow');
            });
        });
        
        $('#story').click(function() {
            $(this).fadeOut('slow');
            $('.cake').fadeOut('fast').promise().done(function() {
                $('.message-section').fadeIn('slow');
                revealMessageLines();
            });
        });
        
        function revealMessageLines() {
            let i = 0;
            const $paragraphs = $('.message-card p');
            $paragraphs.hide();
            
            function showNext() {
                if (i < $paragraphs.length) {
                    $($paragraphs[i]).fadeIn('slow').delay(800).promise().done(function() {
                        i++;
                        showNext();
                    });
                }
            }
            showNext();
        }
        
        function createConfetti() {
            const colors = ['#4a6fff', '#ff6b6b', '#4ecdc4', '#ffe66d', '#ff6b6b'];
            const confetti = $('<div class="confetti">●</div>');
            confetti.css({
                position: 'fixed',
                top: '-10px',
                left: Math.random() * $(window).width(),
                color: colors[Math.floor(Math.random() * colors.length)],
                fontSize: (10 + Math.random() * 15) + 'px',
                zIndex: 9999,
                pointerEvents: 'none'
            });
            $('body').append(confetti);
            confetti.animate({
                top: $(window).height() + 10,
                left: '+= ' + (Math.random() - 0.5) * 200
            }, 2000 + Math.random() * 1000, function() {
                confetti.remove();
            });
        }
    }
});

// CSS animations for bulbs need to be added dynamically
const bulbStyles = `
    .bulb-glow-yellow { background-image: url('bulb_yellow.png'); animation: bulbGlow 0.5s ease; }
    .bulb-glow-red { background-image: url('bulb_red.png'); animation: bulbGlow 0.5s ease; }
    .bulb-glow-blue { background-image: url('bulb_blue.png'); animation: bulbGlow 0.5s ease; }
    .bulb-glow-green { background-image: url('bulb_green.png'); animation: bulbGlow 0.5s ease; }
    .bulb-glow-pink { background-image: url('bulb_pink.png'); animation: bulbGlow 0.5s ease; }
    .bulb-glow-orange { background-image: url('bulb_orange.png'); animation: bulbGlow 0.5s ease; }
    .bulb-glow-yellow-after { background-image: url('bulb_yellow.png'); animation: bulbPulse 1s infinite; }
    .bulb-glow-red-after { background-image: url('bulb_red.png'); animation: bulbPulseRed 1.2s infinite; }
    .bulb-glow-blue-after { background-image: url('bulb_blue.png'); animation: bulbPulseBlue 1.4s infinite; }
    .bulb-glow-green-after { background-image: url('bulb_green.png'); animation: bulbPulseGreen 1.6s infinite; }
    .bulb-glow-pink-after { background-image: url('bulb_pink.png'); animation: bulbPulsePink 1.8s infinite; }
    .bulb-glow-orange-after { background-image: url('bulb_orange.png'); animation: bulbPulseOrange 2s infinite; }
    
    @keyframes bulbGlow { 0% { opacity: 0; } 100% { opacity: 1; } }
    @keyframes bulbPulse { 0%, 100% { opacity: 1; } 50% { opacity: 0.5; } }
    @keyframes bulbPulseRed { 0%, 100% { opacity: 1; } 50% { opacity: 0.4; } }
    @keyframes bulbPulseBlue { 0%, 100% { opacity: 1; } 50% { opacity: 0.6; } }
    @keyframes bulbPulseGreen { 0%, 100% { opacity: 1; } 50% { opacity: 0.5; } }
    @keyframes bulbPulsePink { 0%, 100% { opacity: 1; } 50% { opacity: 0.7; } }
    @keyframes bulbPulseOrange { 0%, 100% { opacity: 1; } 50% { opacity: 0.4; } }
`;

$('head').append('<style>' + bulbStyles + '</style>');
