/* 
* Gifplayer v0.2.2
* Customizable jquery plugin to play and stop animated gifs. Similar to 9gag's
* (c)2014 Rubén Torres - rubentdlh@gmail.com
* Released under the MIT license
*/

(function($) {

	function GifPlayer(preview, options){
		this.previewElement=preview;
		this.options=options;
		this.animationLoaded=false;
	}

	GifPlayer.prototype = {

		activate: function(){
			this.wrap();
			this.addSpinner();
			this.addControl();
			this.addEvents();
		},

		//create a wrapper with relative positioning
		wrap: function(){
			this.previewElement.addClass('gifplayer-ready');
			this.wrapper = this.previewElement.wrap("<div class='gifplayer-wrapper'></div>").parent();
			this.wrapper.css('width', this.previewElement.width());
			this.wrapper.css('height', this.previewElement.height());
			this.previewElement.css('cursor','pointer');
		},

		//Setup loading spinner
		addSpinner: function(){
			this.spinnerElement=$("<div class = 'spinner'></div>");
			this.wrapper.append(this.spinnerElement);
			this.spinnerElement.hide();
		},

		getOption: function(option){
			var dataOption = this.previewElement.data(option.toLowerCase());
			if(dataOption != undefined
				&& dataOption != ''){
				return dataOption;
			}else{
				return this.options[option];
			}
		},

		addControl: function(){
			var label = this.getOption('label');
			this.playElement = $("<ins class='play-gif'>" + label + "</ins>");
			this.wrapper.append(this.playElement);
			this.playElement.css('top', this.previewElement.height()/2 - this.playElement.height()/2);
			this.playElement.css('left', this.previewElement.width()/2 - this.playElement.width()/2);
		},

		addEvents: function(){
			var gp=this;
			var playOn = this.getOption('playOn');
			var mode = this.getOption('mode');

			switch(playOn){
				case 'click':
					gp.playElement.on( 'click', function(e){
						gp.loadAnimation();
					});
					gp.previewElement.on( 'click', function(e){
						gp.loadAnimation();
						e.preventDefault();
						e.stopPropagation();
					});
					break;
				case 'hover':
					gp.previewElement.on( 'click mouseover', function(e){
						gp.loadAnimation();
						e.preventDefault();
						e.stopPropagation();
					});
					break;
			}
		},

		loadAnimation: function(){
			this.spinnerElement.show();
			var mode = this.getOption('mode');
			if(mode == 'gif'){
				this.loadGif();
			}else if(mode == 'video'){
				this.loadVideo();
			}
		},

		stopGif: function(){
			this.gifElement.hide();
			this.previewElement.show();
			this.playElement.show();
			this.resetEvents();
		},

		getGif: function(){
			//Check if data-gif was set
			var gif = this.getOption('gif');
			if(gif != undefined && gif != ''){
				return gif;
			}else{
				return this.previewElement.attr('src').replace('.png', '.gif').replace('.jpg', '.gif');
			}
		},

		getWebm: function(){
			//Check if data-gif was set
			var gif = this.getOption('webm');
			if(gif != undefined && gif != ''){
				return gif;
			}else{
				return this.previewElement.attr('src').replace('.png', '.webm').replace('.jpg', '.webm');
			}
		},

		getMp4: function(){
			//Check if data-gif was set
			var gif = this.getOption('mp4');
			if(gif != undefined && gif != ''){
				return gif;
			}else{
				return this.previewElement.attr('src').replace('.png', '.mp4').replace('.jpg', '.mp4');
			}
		},

		loadGif: function(){
			var gp=this;

			gp.playElement.hide();

			if(!this.animationLoaded){
				this.enableAbort();
			}
			var gifSrc = this.getGif();
			var gifWidth=this.previewElement.width();
			var gifHeight=this.previewElement.height();
			
			this.gifElement=$("<img class='gp-gif-element' width='"+ gifWidth + "' height=' "+ gifHeight +" '/>");

			var wait = this.getOption('wait');
			if(wait){
				//Wait until gif loads
				this.gifElement.load( function(){
					gp.animationLoaded=true;
					gp.resetEvents();
					gp.previewElement.hide();
					gp.wrapper.append(gp.gifElement);
					gp.spinnerElement.hide();
				});
			}else{
				//Try to show gif instantly
				gp.animationLoaded=true;
				gp.resetEvents();
				gp.previewElement.hide();
				gp.wrapper.append(gp.gifElement);
				gp.spinnerElement.hide();
			}
			this.gifElement.css('cursor','pointer');
			this.gifElement.css('position','absolute');
			this.gifElement.css('top','0');
			this.gifElement.css('left','0');
			this.gifElement.attr('src', gifSrc);
			this.gifElement.click( function(e){
				$(this).remove();
				gp.previewElement.show();
				gp.playElement.show();
				gp.resetEvents();
				e.preventDefault();
				e.stopPropagation();
			});
			
		},

 		loadVideo: function(){
 			var gp=this;

 			var videoSrcMp4=this.getMp4();
 			var videoSrcWebm=this.getWebm();
 			var videoWidth=this.previewElement.width();
 			var videoHeight=this.previewElement.height();
 			gp.videoElement=$('<video class="gp-video-element" width="' + videoWidth + 'px" height="' + videoHeight + '" style="margin:0 auto;width:' + videoWidth + 'px;height:' + videoHeight + 'px;" autoplay="autoplay" loop="loop" muted="muted" poster="' + gp.previewElement.attr('src') + '"><source type="video/mp4" src="' + videoSrcMp4 + '"><source type="video/webm" src="' + videoSrcWebm + '"></video>');

 			var playVideo = function(){
 				gp.spinnerElement.hide();
				gp.previewElement.hide();
				gp.playElement.hide();
		 		gp.gifLoaded=true;
		 		gp.previewElement.hide();
		 		gp.wrapper.append(gp.videoElement);
		 		gp.videoPaused = false;
		 		gp.videoElement[0].play();
 			}

 			var checkLoad = function(){
 				if(gp.videoElement[0].readyState === 4){
					playVideo();
					gp.animationLoaded=true;
				}else{
					setTimeout(checkLoad, 100);
				}
 			};

 			var wait = this.getOption('wait');
 			if(wait){
 				checkLoad();
 			}else{
 				playVideo();
 			}
			
			gp.videoElement.on('click', function(){
				if(gp.videoPaused){
					gp.resumeVideo();
				}else{
					gp.pauseVideo();
				}
			});
 		},

 		pauseVideo: function(){
 			var gp = this;
 			gp.videoPaused = true;
 			gp.videoElement[0].pause();
 			gp.playElement.show();
 			gp.mouseoverEnabled = false;
 		},

 		resumeVideo: function(){
 			var gp = this;
 			gp.videoPaused = false;
 			gp.videoElement[0].play();
 			gp.playElement.hide();
 		},

		enableAbort: function(){
			var gp = this;
			this.previewElement.click( function(e){
				gp.abortLoading(e);
			});
			this.spinnerElement.click( function(e){
				gp.abortLoading(e);
			});
		},

		abortLoading: function(e){
			this.spinnerElement.hide();
			this.playElement.show();
			e.preventDefault();
			e.stopPropagation();
			this.gifElement.off('load').on( 'load', function(ev){
				ev.preventDefault();
				ev.stopPropagation();
			});
			this.resetEvents();
		},

		resetEvents: function(){
			this.previewElement.off('click');
			this.previewElement.off('mouseover');
			this.playElement.off('click');
			this.spinnerElement.off('click');
			this.addEvents();
		}

	};

	$.fn.gifplayer = function(options) {

		 // Check if we should operate with some method
		if (/^(play|pause|stop)$/i.test(options)) {
			// Normalize method's name
      		options = options.toLowerCase();
      		if($(this).hasClass('gifplayer-ready')){
      			//Setup gifplayer object
      			var gp = new GifPlayer($(this), null);
      			gp.options = {};
      			gp.options = $.extend({}, $.fn.gifplayer.defaults, gp.options);
      			gp.wrapper = $(this).parent();
      			gp.spinnerElement = gp.wrapper.find('.spinner');
      			gp.playElement = gp.wrapper.find('.play-gif');
      			gp.gifElement = gp.wrapper.find('.gp-gif-element');
      			gp.videoElement = gp.wrapper.find('.gp-video-element');
      			
      			if(gp.gifElement != undefined){
      				gp.options.mode = 'gif';
      			}else if(gp.videoElement != undefined){
      				gp.options.mode = 'video';
      			}

      			switch(options){
      				case 'play':
      					console.log('play');
      					gp.playElement.trigger('click');
      					break;
      				case 'stop':
      					console.log('stop');
      					if(gp.options.mode == 'gif'){
      						gp.stopGif();
      					}else if( gp.options.mode == 'video'){
      						gp.pauseVideo();
      					}
      					break;
      			}
      		}else{
      			console.log('Not a valid gifplayer element');
      		}
		}else{ //Create instance
			return this.each(function(){
				options = $.extend({}, $.fn.gifplayer.defaults, options);
				var gifplayer = new GifPlayer($(this), options);
				gifplayer.activate();
			});
		}	
	};

	$.fn.gifplayer.defaults = {
		label: 'GIF',
		playOn: 'click',
		mode: 'gif',
		gif: '',
		mp4: '',
		webm: '',
		wait: false
	};

})(jQuery);
