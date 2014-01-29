/* 
 * Gifplayer v0.1.0
 * Customizable jquery plugin to play and stop animated gifs. Similar to 9gag's
 * (c)2014 Rubén Torres - rubentdlh@gmail.com
 * Released under the MIT license
 */

 (function($) {

 	function GifPlayer(preview, options){
 		this.previewElement=preview;
 		this.options=options;
 	}

 	GifPlayer.prototype = {

 		activate: function(){
 			this.wrap();
 			this.setGif();
 			this.addControl();
 			this.addEvents();
 		},

 		wrap: function(){
 			this.wrapper = this.previewElement.wrap("<div class='gifplayer-wrapper'></div>").parent();
 			this.wrapper.css('width', this.previewElement.width());
 			this.wrapper.css('height', this.previewElement.height());
 		},

 		setGif: function(){
 			if(this.previewElement.attr('data-gif').length > 0){
 				this.options.gifSrc = this.previewElement.attr('data-gif');
 			}
 			this.previewElement.addClass('preview');
 			var gifSrc=this.options.gifSrc;
 			var gifWidth=this.previewElement.width();
 			var gifHeight=this.previewElement.height();
 			this.gifElement=$("<img src='" + gifSrc + "' width='"+ gifWidth + "' height=' "+ gifHeight +" '/>");
 			this.gifElement.css('cursor','pointer');
 		},

 		addControl: function(){
 			this.playElement = $("<ins class='play-gif'>" + this.options.playText + "</ins>");
 			this.playElement.css('left', this.previewElement.width()/2 + this.playElement.width()/2);
 			this.wrapper.append(this.playElement);
 		},

 		addEvents: function(){
 			var gp=this;
 			this.playElement.click( function(){
 				gp.previewElement.hide();
 				gp.playElement.hide();
 				gp.wrapper.append(gp.gifElement);
 				gp.gifElement.click( function(){
 					gp.gifElement.remove();
 					gp.previewElement.show();
 					gp.playElement.show();
 				})
 			});
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
 		playText: 'play'
 	};

 })(jQuery);
