$(document).ready( function(){

	$('#fixed').darkTooltip({
		gravity:'north'
	});

	$('#def').darkTooltip();

	$('#def-html').darkTooltip({
		opacity:1,
		gravity:'west'
	});

	$('#click-me').darkTooltip({
		trigger:'click',
		animation:'flipIn',
		gravity:'west'
	});

	$('#confirm').darkTooltip({
		trigger:'click',
		animation:'flipIn',
		gravity:'west',
		confirm:true,
		yes:'Sure',
		no:'No Way',
		finalMessage: 'It has been deleted'
	});

	$('#confirm-light').darkTooltip({
		trigger:'click',
		animation:'flipIn',
		gravity:'west',
		confirm:true,
		theme:'light',
		onYes: function(){
			alert("This is a custom event for 'Yes' option");
		},
		onNo: function(){
			alert("This is a custom event for 'No' option");
		}
	});

	$('#small-s').darkTooltip({
		size:'small',
		gravity: 'south'
	});
	$('#medium-s').darkTooltip({
		gravity: 'south'
	});
	$('#large-s').darkTooltip({
		size:'large',
		gravity: 'south'
	});

	$('#south').darkTooltip({
		gravity: 'south'
	});
	$('#west').darkTooltip({
		gravity: 'west'
	});
	$('#north').darkTooltip({
		gravity: 'north'
	});
	$('#east').darkTooltip({
		gravity: 'east'
	});


	$('#effect-none').darkTooltip();
	$('#effect-flipin').darkTooltip({
		animation:'flipIn'
	});
	$('#effect-fadein').darkTooltip({
		animation:'fadeIn'
	});

	$('#theme-dark').darkTooltip();
	$('#theme-light').darkTooltip({
		theme:'light'
	});

});
