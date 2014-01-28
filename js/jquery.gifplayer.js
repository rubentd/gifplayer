/* 
 * Gifplayer v0.1.0
 * Customizable jquery plugin to play and stop animated gifs. Similar to 9gag's
 * (c)2014 Rubén Torres - rubentdlh@gmail.com
 * Released under the MIT license
 */

(function($) {

	function gifplayer(image){
		
	}

	GifPlayer.prototype = {
		activate: function(){
			console.log('activating');
		}
	}

	$.fn.gifplayer = function(options) {
		this.each(function(){
			options = $.extend({}, $.fn.gifplayer.defaults, options);
			
			var gifplayer = new GifPlayer($(this), options);
			gifplayer.activate();

		});	
	}

	$.fn.gifplayer.defaults = {
        
    };

})(jQuery);
