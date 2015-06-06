$(document).ready(function() {


/* -- globals -- */
	var step = 0;
	var valid = false;
	var guests = '';
	var persons = 0;
	var beef = 0;
	var fish = 0;
	var canoe = 1;
	var yoga = 1;
	var activities = '';


/* -- functions -- */
	
// input check
	function inputCheck(callback) {
		if (step === 0) {
				
			if ($('#name').val().length < 1) {
				var alertTxt = $('#name').attr('data-alert-txt');
					
				$('#alert-txt').text(alertTxt);
				$('#alert').addClass('in');
	
				valid = false;
			} else if ($('#guest').val().length < 1) {
				var alertTxt = $('#guest').attr('data-alert-txt');
					
				$('#alert-txt').text(alertTxt);
				$('#alert').addClass('in');

				valid = false;
			} else {
				valid = true;
				callback();
			}
		} else if (step === 1) {
				
			if ($('#arrival').val().length < 1) {
				var alertTxt = $('#arrival').attr('data-alert-txt');
					
				$('#alert-txt').text(alertTxt);
				$('#alert').addClass('in');

				valid = false;
			} else if (parseInt( $('#arrival').val() ) === 9) {
				valid = true;
				callback();
			} else {
				timeCheck(function() {
					
					if (!valid) {
						var alertTxt = 'Vous devez choisir au moins une activité!';
					
						$('#alert-txt').text(alertTxt);
						$('#alert').addClass('in');

						valid = false;
					} else {
						callback();
					}
				});
			}
		} else if (step === 2) {
			var dishCount = beef+fish;
			var guestCount = persons+1;

			if (guestCount < dishCount && $('#dinner').val() === '1') {
				var dishDiff = dishCount-guestCount;
				var alertTxt = 'Selon le nombre de personnes dans votre groupe, vous avez ' + dishDiff + ' plats de trop, SVP vérifier!';

				$('#alert-txt').text(alertTxt);
				$('#alert').addClass('in');

				valid = false;
			} else if (dishCount < guestCount && $('#dinner').val() === '1') {
				var dishDiff = guestCount-dishCount;
				var alertTxt = 'Selon le nombre de personnes dans votre groupe, il vous manque ' + dishDiff + ' plats, SVP vérifier!';

				$('#alert-txt').text(alertTxt);
				$('#alert').addClass('in');

				valid = false;
			} else if (canoe > guestCount) {
				var canoeDiff = canoe-guestCount;
				var alertTxt = 'Selon le nombre de personnes dans votre groupe, vous avez inscrit ' + canoeDiff + ' personnes de trop pour le canot, SVP vérifier!';

				$('#alert-txt').text(alertTxt);
				$('#alert').addClass('in');

				valid = false;
			} else if (yoga > guestCount) {
				var yogaDiff = yoga-guestCount;
				var alertTxt = 'Selon le nombre de personnes dans votre groupe, vous avez inscrit ' + yogaDiff + ' personnes de trop pour le yoga, SVP vérifier!';

				$('#alert-txt').text(alertTxt);
				$('#alert').addClass('in');

				valid = false;
			} else {
				valid = true;
				callback();
			}
		}
	}

// time check
	function timeCheck(callback) {
		$('.time-check').each(function(index) {
			
			if (parseInt( $(this).val() ) === 1) {
				valid = true;
				callback();
				return false;
			} else if (index === 6) {
				valid = false;
				callback();
				return false;
			}
		});
	}

// concactenate time
	function concTime(callback) {
		$('.time-check').each(function(index) {
			if ($(this).val() === '1') {
				
				if (activities === '') {
					var thisActivity = $(this).attr('data-activity');
				} else {
					var thisActivity = ', ' + $(this).attr('data-activity');
				}
				
				activities += thisActivity;
			}

			if (index === 6) {
				callback();
			}
		});
	}

// next form
	function nextForm() {
		var thisStep = $('.step').eq(step);
		var nextIndex = step+1;

		if (step === 1 && $('#dinner').val() === '0' && $('#canoe').val() === '0' && $('#yoga').val() === '0') {
			buildReview();
			$('.prog').addClass('complete');
		} else {

			if (step === 0 && $('#guest').val() === '1') {
				var nextStep = $('#guest-inputs');
			} else {
				var nextStep = $('.step').eq(nextIndex);
			}
	
			if (step === 0 && $('#guest').val() === '0') {
				$('.date').removeClass('toggle');
			}

			if (step === 1) {

				if ($('#dinner').val() === '0') {
					$('.dish-clickers').addClass('toggle');
				}

				if ($('#canoe').val() === '0' && $('#yoga').val() === '0') {
					$('.activity-clickers').addClass('toggle');
				} else if ($('#canoe').val() === '0') {
					$('.canoe-clicker').addClass('hide');
				} else if ($('#yoga').val() === '0') {
					$('.yoga-clicker').addClass('hide');
				}
			}
	
			thisStep.removeClass('in');
			$('.prog').eq(step).addClass('complete');
	
			setTimeout(function() {
				nextStep.addClass('in');
				$('html,body').animate({'scrollTop' : $('#rsvp').offset().top}, 600);
				step = nextIndex;
			}, 300);
		}
	}

// build review
	function buildReview() {
		$('#name-output').text( $('#name').val() );
		
		$('#email-output').text( $('#email').val() );

		$('#persons-output').text(persons);

		$('#guests-output').text(guests + '.');

		$('#arrival-output').text( $('#arrival').val() );

		concTime(function() {
			activities += '.';
		});

		$('#beef-output').text(beef);
		$('#fish-output').text(fish);
		$('#canoe-output').text(canoe);
		$('#yoga-output').text(yoga);

		if ($('#arrival').val() === '9') {
			canoe = 0;
			yoga = 0;
			$('#brunch').val(1);
		}

		if (persons === 0) {
			$('#guest-txt-arrival').text("J'arriverai");
			$('#guest-txt-activity').text("Je serai présent");
			$('.guest-output').hide();
		}

		if ($('#dinner').val() === '1') {
			$('.dinner-output').removeClass('toggle');
		}

		if ($('#canoe').val() === '1' || $('#yoga').val() === '1') {
			$('.activity-output').removeClass('toggle');
		}

		if ($('#canoe').val() === '0') {
			$('.canoe-txt').hide();
			canoe = 0;
		} else if ($('#yoga').val() === '0') {
			$('.yoga-txt').hide();
			yoga = 0;
		}

		$('.step').removeClass('in');
		$('#form-top').addClass('hide');
		$('#mobile-dinners').addClass('toggle');
		
		setTimeout(function() {
			$('#review').addClass('in');
			$('.prog').addClass('complete');
			$('html,body').animate({'scrollTop' : $('#rsvp').offset().top}, 600);
		}, 300);
	}	

// send form
	function sendForm() {
		var name = $('#name').val();
		var email = $('#email').val();
		var guestCount = persons+1;
		var guestList = guests;
		var arrivalDate = $('#arrival').val();
		var activityList = activities;
		var canoeCount = canoe;
		var yogaCount = yoga;
		var beefCount = beef;
		var fishCount = fish;
		var allergies = $('#allergies').val();

		if ($('#wine').val() === '0') {
			var wineCount = 0;
		} else {
			var wineCount = guestCount;
		}

		if ($('#bbq').val() === '0') {
			var bbqCount = 0;
		} else {
			var bbqCount = guestCount;
		}

		if ($('#ceremony').val() === '0') {
			var ceremonyCount = 0;
		} else {
			var ceremonyCount = guestCount;
		}

		if ($('#dinner').val() === '0') {
			var dinnerCount = 0;
		} else {
			var dinnerCount = guestCount;
		}

		if ($('#brunch').val() === '0') {
			var brunchCount = 0;
		} else {
			var brunchCount = guestCount;
		}

		$.ajax({
			url: 'https://docs.google.com/forms/d/1n95PUantyl8Uy9CQesh_TkjHLcusDQs53Bb3emIG-uQ/formResponse',
			data: {
				'entry_1006749345' : name,
				'entry_670681084' : email,
				'entry_312169536' : guestCount,
				'entry_523301761' : guestList,
				'entry_1479682375' : arrivalDate,
				'entry_952611846' : activityList,
				'entry_200406935' : canoeCount,
				'entry_539762186' : yogaCount,
				'entry_1031868582' : beefCount,
				'entry_54150522' : fishCount,
				'entry_1797105352' : wineCount,
				'entry_416670619' : bbqCount,
				'entry_1428051523' : ceremonyCount,
				'entry_1229432818' : dinnerCount,
				'entry_1140251040' : brunchCount,
				'entry_1336867684' : allergies,
			},
			type: "POST",
			dataType: "xml",
			statusCode: {
				0 : function() {
					$('#alert').add( $('#spinner') ).removeClass('in');
					$('#review').removeClass('in');
					$('#confirm').addClass('in');
					$('html,body').animate({'scrollTop' : $('#rsvp').offset().top}, 600);
				},
				200 : function() {
					$('#alert').add( $('#spinner') ).removeClass('in');
					$('#review').removeClass('in');
					$('#confirm').addClass('in');
					$('html,body').animate({'scrollTop' : $('#rsvp').offset().top}, 600);
				}
			}
		});
	}

// send contact
	function sendContact() {
		var contactTxt = $('#message').val();
		var contactName = $('#name-contact').val();
		var contactEmail = $('#email-contact').val();

		$.ajax({
			url: 'https://docs.google.com/forms/d/1SpWMqi2Apq1_H_3eTmXWQaDWta47lvWwD48Hp0ZFI4k/formResponse',
			data: {
				'entry_1706086327' : contactTxt,
				'entry_2108161003' : contactName,
				'entry_1061641666' : contactEmail,
			},
			type: "POST",
			dataType: "xml",
			statusCode: {
				0 : function() {
					$('#alert-txt').text('');
					$('#alert-title').text('succès!');
					$('#spinner').removeClass('in');
					$('#message').val('');
					$('#name-contact').val('');
					$('#email-contact').val('');

					setTimeout(function() {
						$('#alert').removeClass('in');
					}, 3500);
				},
				200 : function() {
					$('#alert-txt').text('');
					$('#alert-title').text('succès!');
					$('#spinner').removeClass('in');
					$('#message').val('');
					$('#name-contact').val('');
					$('#email-contact').val('');

					setTimeout(function() {
						$('#alert').removeClass('in');
					}, 3500);
				}
			}
		});
	}

// set responsive
	function xsResponsive() {
		if ($(window).width() < 505) {
			$('#first-step').removeClass('in');
		}
	}

	function smResponsive(callback) {
		if ($(window).width() < 650) {
			$('.panel').each(function() {
				
				if ( $(this).hasClass('header') || $(this).hasClass('rsvp') || $(this).hasClass('info') ) {
					var loadHeight = $(this).height();

					$(this).css('height', loadHeight);

					if ( $(this).hasClass('info') ) {
						callback();
					}
				}
			});
		}
	}


/* -- triggers -- */

// load
	setTimeout(function() {
		smResponsive(function() {
			xsResponsive();
		});
	}, 750);

// click rsvp scroll
	$('#rsvp-scroll').click(function() {
		$('html,body').animate({'scrollTop' : $('#rsvp').offset().top}, 600);
	});

// click schedule scroll
	$('#schedule-scroll').click(function() {
		$('html,body').animate({'scrollTop' : $('#schedule').offset().top}, 600);
	});

// click checkbox
	$('.checkbox').click(function() {
		if ( ! $(this).hasClass('active') ) {
			var input = $('#' + $(this).attr('data-input') );
			var value = $(this).attr('data-input-value');
			
			if ( $(this).attr('data-radio') ) {
				var group = $('.' + $(this).attr('data-input') );
				group.not(this).removeClass('active');
			}

			$(this).addClass('active');
			input.val(value);
		} else {
			var input = $('#' + $(this).attr('data-input') );
			
			$(this).removeClass('active');
			
			if ( $(this).hasClass('time') ) {
				input.val('0');
			} else {
				input.val('');
			}
		}
	});

// click next
	$('.next-btn').click(function() {
		inputCheck(function() {
			
			if (valid) {
				nextForm();
			}
		});
	});

// click done
	$('#done').click(function() {
		inputCheck(function() {
			
			if (valid) {
				buildReview();
			}
		});
	});

// click alert btn
	$('#alert-btn').click(function() {
		$('#alert').removeClass('in');
		$('html,body').animate({'scrollTop' : $('#rsvp').offset().top}, 600);
	});

// click next guest
	$('#guest-btn').click(function() {
		$('.add-guest').each(function(index) {
			if(index === 0) {	
				var thisGuest = $(this).val();
			} else {
				var thisGuest = ', ' + $(this).val();
			}

			if ($(this).val().length > 0) {
				guests += thisGuest;
				persons += 1;
			}
		});

		$('#guest-inputs').removeClass('in');

		setTimeout(function() {
			$('.step').eq(step).addClass('in');
			$('.date').removeClass('toggle');
			$('html,body').animate({'scrollTop' : $('#rsvp').offset().top}, 600);
		}, 600);
	});

// click friday
	$('#friday').click(function() {
		$('.date').addClass('toggle');
		$('.friday').removeClass('toggle');
		$('html,body').animate({'scrollTop' : $('#rsvp').offset().top}, 600);
	});

// click saturday
	$('#saturday').click(function() {
		$('.date').addClass('toggle');
		$('.saturday').removeClass('toggle');
		$('html,body').animate({'scrollTop' : $('#rsvp').offset().top}, 600);
	});

// click plus
	$('.plus').click(function() {
		var thisClicker = $(this).parent('.clicker').attr('data-var');
		var thisSpan = $(this).siblings('span');
		
		if (thisClicker === 'beef') {
			beef += 1;
			thisSpan.text(beef);
		} else if (thisClicker === 'fish') {
			fish += 1;
			thisSpan.text(fish);
		} else if (thisClicker === 'canoe') {
			canoe += 1;
			thisSpan.text(canoe);
		} else if (thisClicker === 'yoga') {
			yoga += 1;
			thisSpan.text(yoga);
		}
	});

// click minus
	$('.minus').click(function() {
		var thisClicker = $(this).parent('.clicker').attr('data-var');
		var thisSpan = $(this).siblings('span');
			
		if (thisClicker === 'beef' && beef > 0) {
			beef -= 1;
			thisSpan.text(beef);
		} else if (thisClicker === 'fish' && fish > 0) {
			fish -= 1;
			thisSpan.text(fish);
		} else if (thisClicker === 'canoe' && canoe > 1) {
			canoe -= 1;
			thisSpan.text(canoe);
		} else if (thisClicker === 'yoga' && yoga > 1) {
			yoga -= 1;
			thisSpan.text(yoga);
		}
	});

// click submit
	$('#submit-btn').click(function() {
		$('#alert-txt').text('');
		$('#alert-title').text('traitement')
		$('#alert-btn').hide();
		$('#alert, #spinner').addClass('in');
		sendForm();
	});

// click contact
	$('#contact-btn').click(function() {
		$('#alert-txt').text('');
		$('#alert-title').text('traitement');
		$('#alert-btn').hide();
		$('#alert, #spinner').addClass('in');
		sendContact();
	});

// click mobile-start-btn
	$('#mobile-start-btn').click(function() {
		$('#form-top').addClass('hide');

		if ( $(window).scrollTop() !== $('#rsvp').offset().top && ! $(this).hasClass('contact') ) {
			$('html,body').animate({'scrollTop' : $('#rsvp').offset().top}, 300);
		}

		setTimeout(function() {
			$('#first-step').addClass('in mobile-toggled');
		}, 300);
	});

// click to-clickers
	$('#to-clickers').click(function() {
		$('#mobile-activities').removeClass('toggle');
		$('html,body').animate({'scrollTop' : $('#rsvp').offset().top}, 600);
	});

// click mobile-cont-btn
	$('#mobile-cont-btn').click(function() {
		$('#mobile-activities').addClass('toggle');
		$('#mobile-dinners').removeClass('toggle');
		$('html,body').animate({'scrollTop' : $('#rsvp').offset().top}, 600);
	});

// click anchor
	$('.anchor').click(function(e) {
		e.preventDefault();
		var target = $( $(this).attr('href') ).offset().top;
		$('html,body').animate({'scrollTop' : target}, 900);
	});

// blur input
	$('input').blur(function() {
		if ($(this).val().length > 0) {
			$(this).parent('.input-container').addClass('active');
		} else {
			$(this).parent('.input-container').removeClass('active');
		}
	});

// blur add guest
	$('.add-guest').blur(function() {
		var thisIndex = $('.add-guest').index(this);
		var thisRow = $('.add-row').eq(thisIndex);
		var thisVal = $(this).val().length;
		if ( thisIndex > 0 && ! thisRow.hasClass('toggle') && ! thisVal > 0) {
			thisRow.addClass('toggle');
		}
	});

// keyup add guest
	$('.add-guest').keyup(function() {
		var thisIndex = $('.add-guest').index(this);
		var nextIndex = thisIndex+1;
		var nextGuest = $('.add-row').eq(nextIndex);
		
		if ( $(this).val().length > 0 && nextGuest.hasClass('toggle') ) {
			nextGuest.removeClass('toggle');
		} else if ($(this).val().length < 1) {
			nextGuest.addClass('toggle');
		}
	});

/* resize window check
	$(window).resize(function() {
		if ( $(window).width() < 505 && ! $('#first-step').hasClass('mobile-toggled') ) {
			xsResponsive();
		}

		if ($(window).width() < 650) {
			smResponsive(function() {
				$.noop();
			});
		} else {
			$('#first-step').addClass('in');
		}
	});*/

});

