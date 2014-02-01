/* 
 * Gifplayer v0.1.1
 * Customizable jquery plugin to play and stop animated gifs. Similar to 9gag's
 * (c)2014 Rubén Torres - rubentdlh@gmail.com
 * Released under the MIT license
 */

 (function($) {

 	function GifPlayer(preview, options){
 		this.previewElement=preview;
 		this.spinnerElement=$("<div class = 'spinner'></div>");
 		this.options=options;
 	}

 	GifPlayer.prototype = {

 		activate: function(){
 			this.wrap();
 			this.addSpinner();
 			this.addControl();
 			this.addEvents();
 		},

 		wrap: function(){
 			this.wrapper = this.previewElement.wrap("<div class='gifplayer-wrapper'></div>").parent();
 			this.wrapper.css('width', this.previewElement.width());
 			this.wrapper.css('height', this.previewElement.height());
 			this.previewElement.addClass('gifplayer');
 			this.previewElement.css('cursor','pointer');
 		},

 		getGifSrc: function(){
 			console.log(this.previewElement.attr('data-gif'));
 			var gifSrc;
 			if(this.previewElement.attr('data-gif')){
 				gifSrc = this.previewElement.attr('data-gif');
 			}else{
 				gifSrc = this.previewElement.attr('src').replace('.png','.gif');
 			}
 			return gifSrc;
 		},

 		addControl: function(){
 			this.playElement = $("<ins class='play-gif'>" + this.options.playText + "</ins>");
 			this.playElement.css('left', this.previewElement.width()/2 + this.playElement.width()/2);
 			this.wrapper.append(this.playElement);
 		},

 		addEvents: function(){
 			var gp=this;
 			gp.playElement.click( function(e){
 				$(this).hide();
 				gp.spinnerElement.show();
 				gp.loadGif();
 				e.preventDefault();
   				e.stopPropagation();
 			});
 			gp.spinnerElement.click( function(e){
 				$(this).hide();
 				gp.playElement.show();
	 			e.preventDefault();
   				e.stopPropagation();
 			});
 			gp.previewElement.click( function(e){
 				if(gp.playElement.is(':visible')){
	 				gp.playElement.hide();
	 				gp.spinnerElement.show();
	 				gp.loadGif();
 				}
 				e.preventDefault();
   				e.stopPropagation();
 			});
 		},

 		loadGif: function(){
 			var gifSrc=this.getGifSrc();
 			var gifWidth=this.previewElement.width();
 			var gifHeight=this.previewElement.height();
 			var gp=this;
 			$("<img src='" + gifSrc + "' width='"+ gifWidth + "' height=' "+ gifHeight +" '/>").load( function(){
 				$(this).css('cursor','pointer');
 				$(this).css('position','absolute');
 				$(this).css('top','0');
 				$(this).css('left','0');
 				gp.gifElement=$(this);
				gp.previewElement.hide();
 				gp.wrapper.append(gp.gifElement);
 				gp.spinnerElement.hide();
 				
 				$(this).click( function(e){
 					$(this).remove();
 					gp.previewElement.show();
 					gp.playElement.show();
 					e.preventDefault();
 					e.stopPropagation();
 				});
			});
 			
 		},

 		addSpinner: function(){
 			this.wrapper.append(this.spinnerElement);
 			this.spinnerElement.hide();
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
 		playText: 'gif'
 	};

 })(jQuery);
