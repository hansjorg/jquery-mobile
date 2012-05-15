(function($){

	asyncTest( "Opening two popups and calling 'Back' causes them both to close", function() {
		var initialHRef = location.href;

		expect( 7 );

		$.testHelper.detailedEventCascade([
			function() {
				$( "#test-popup" ).popup( "open" );
				$( "#test-popup-2" ).popup( "open" );
			},
			{
				opened1: { src: $( "#test-popup" ), event: "opened.stackCloseStep1Popup1" },
				opened2: { src: $( "#test-popup-2" ), event: "opened.stackCloseStep1Popup2" },
				hashchange: { src: $( window ), event: "hashchange.stackCloseStep1" }
			},
			function( result ) {
				ok( !result.opened1.timedOut, "#test-popup opened" );
				ok( !result.opened2.timedOut, "#test-popup-2 opened" );
				ok( !result.hashchange.timedOut, "hashchange happened" );
				window.history.back();
			},
			{
				closed1: { src: $( "#test-popup" ), event: "closed.stackCloseStep2Popup1" },
				closed2: { src: $( "#test-popup" ), event: "closed.stackCloseStep2Popup2" },
				hashchange: { src: $( window ), event: "hashchange.stackCloseStep2" }
			},
			function( result ) {
				ok( !result.closed1.timedOut, "#test-popup closed" );
				ok( !result.closed2.timedOut, "#test-popup-2 closed" );
				ok( !result.hashchange.timedOut, "hashchange happened" );
				ok( location.href === initialHRef, "Location has not changed" );
				setTimeout( function() { start(); }, 300 );
			}
		]);
	});

})( jQuery );
