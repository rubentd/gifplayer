/* 
 * Gifplayer v0.1.1
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
 			this.addControl();
 			if(this.options.linkEnabled){
 				this.addViewFullSizeLink();
 			}
 			this.addEvents();
 		},

 		wrap: function(){
 			this.wrapper = this.previewElement.wrap("<div class='gifplayer-wrapper'></div>").parent();
 			this.wrapper.css('width', this.previewElement.width());
 			this.wrapper.css('height', this.previewElement.height());
 		},


 		getGifSrc: function(){
 			var size = "-" + this.previewElement.width() + 'x' + this.previewElement.height();
 			var linkHref = 	this.previewElement.attr('src').replace(size, '').replace('.png','.gif');
 			return linkHref;
 		},

 		addControl: function(){
 			this.playElement = $("<ins class='play-gif'>" + this.options.playText + "</ins>");
 			this.playElement.css('left', this.previewElement.width()/2 + this.playElement.width()/2);
 			this.wrapper.append(this.playElement);
 		},

 		addEvents: function(){
 			var gp=this;
 			gp.playElement.click( function(){
 				gp.playElement.hide();
 				gp.addLoadingImage();
 				gp.loadGif();
 			});
 			if(this.options.linkEnabled){
	 			gp.wrapper.mouseover(function(){
	 				gp.linkElement.show();
	 			});
	 			gp.wrapper.mouseout(function(){
	 				gp.linkElement.hide();
	 			});
 			}
 		},

 		loadGif: function(){
 			var gifSrc=this.getGifSrc();
 			var gifWidth=this.previewElement.width();
 			var gifHeight=this.previewElement.height();
 			var gp=this;
 			$("<img src='" + gifSrc + "' width='"+ gifWidth + "' height=' "+ gifHeight +" '/>").load( function(){
 				$(this).css('cursor','pointer');
 				gp.gifElement=$(this);
				gp.previewElement.hide();
 				gp.wrapper.append(gp.gifElement);
 				gp.loadingElement.hide();
 				
 				$(this).click( function(){
 					$(this).remove();
 					gp.previewElement.show();
 					gp.playElement.show();
 				});
			});
 			
 		},

 		addLoadingImage: function(){
 			var loadingImg="img/loading.gif";
 			this.loadingElement=$("<img src='" + loadingImg + "' class='gif-loading'>");
 			this.wrapper.append(this.loadingElement);
 		},

 		addViewFullSizeLink: function(){
 			var linkHref= this.wrapper.parent().attr('href');
 			this.linkElement = $("<a href='" + linkHref + "' class='gif-view-full'>View full size</a>");
 			this.wrapper.append(this.linkElement);
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
 		playText: 'play',
 		linkEnabled: true
 	};

 })(jQuery);
