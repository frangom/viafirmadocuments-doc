/* ----------------------------------------------------------------------------------
	Global JS

	Developed by Servicios Avanzados para las Instituciones S.L. (VIAVANSI)
	Contact: comercial@viavansi.com
	http://www.viavansi.com	
	
	Encoding:	UTF-8
	Author:		Juan G. Hurtado
	e-Mail:		jghurtado@viavansi.com
---------------------------------------------------------------------------------- */

if (typeof jQuery != "undefined") {
	
	/* =DOCUMENT-READY
	---------------------------------------------------------------------------------- */
	jQuery(function() {
		init();
	});
	
	/* =INIT
	---------------------------------------------------------------------------------- */
	function init() {
		if (typeof framework != "undefined") {
			framework.init();
		}
		
		search.init();
		nav.init();
		tabs.init();
		
		if (typeof jQuery.fn.toggleVal == "function") {
			jQuery('input.toggleVal').toggleVal();
		}
	}
	
	/* =SEARCH
	---------------------------------------------------------------------------------- */
	var search = {
		
		init : function() {
			jQuery('form.search').show().each(function() {
				jQuery(this).find('input:text:first').wrap('<span style="display:inline-block;position:relative;"></span>').after('<span class="submit"></span>')
				.parents('form:first').find('button:first').addClass('hide').end().find('.ui-tag-br').hide()
				.parents('form:first').find('span.submit').bind('click', function(e) {
					jQuery(this).parents('form:first').find('button:first').click();
				});
			});
		}
		
	};
	
	/* =TABS
	  ---------------------------------------------------------------------------------- */
	  var tabs = {

	    init : function() {
	      jQuery('.tabs-js').each(function(index) {
	          jQuery(this).find('li a').each(function(index) {
	          if (!jQuery(this).parent().hasClass('current')) {
	            tabs.hideTab(jQuery(this));
	          }

	          jQuery(this).bind('click', function(e) {
	            jQuery(this).parents('ul:first').find('li a').each(function(index) {
	              tabs.hideTab(jQuery(this));
	            });

	            tabs.showTab(jQuery(jQuery(this)));

	            e.preventDefault();
	          });
	        });

	        if (jQuery(this).find('li.current').length <= 0) {
	          tabs.showTab(jQuery(this).find('li:first a'));
	        }
	      });
	    },

	    showTab : function($element) {
	      var hash = $element.parent().addClass('current').find('a')[0].hash;
	      jQuery(hash).show();
	    },

	    hideTab : function($element) {
	      var hash = $element[0].hash;
	      jQuery(hash).hide();
	      $element.parent().removeClass('current');
	    }

	  };
	
	/* =NAV
	---------------------------------------------------------------------------------- */
	var nav = {
		
		init : function() {
			jQuery('#nav ul li.current')
				.prev('li').addClass('prev-current')
				.end().next('li').addClass('post-current');
			
			var t = null;
			jQuery('#nav ul li ul').hide().parent().hover(function() {
				$element = jQuery(this);
				t = setTimeout(function() {
					$element.find('ul').slideDown(250);
				}, 250);
			}, function() {
				jQuery(this).find('ul:visible').slideUp(250);
				clearTimeout(t);
			});
		}
		
	};	
}


//* iOS zooms on form element focus. This script prevents that behavior.
//* <meta name="viewport" content="width=device-width,initial-scale=1">
//   If you dynamically add a maximum-scale where no default exists,
//   the value persists on the page even after removed from viewport.content.
//   So if no maximum-scale is set, adds maximum-scale=10 on blur.
//   If maximum-scale is set, reuses that original value.
//* <meta name="viewport" content="width=device-width,initial-scale=1.0,maximum-scale=2.0,maximum-scale=1.0">
//   second maximum-scale declaration will take precedence.
//* Will respect original maximum-scale, if set.
//* Works with int or float scale values.
function cancelZoom()
{
 var d = document,
     viewport,
     content,
     maxScale = ',maximum-scale=',
     maxScaleRegex = /,*maximum\-scale\=\d*\.*\d*/;

 // this should be a focusable DOM Element
 if(!this.addEventListener || !d.querySelector) {
     return;
 }

 viewport = d.querySelector('meta[name="viewport"]');
 content = viewport.content;

 function changeViewport(event)
 {
     // http://nerd.vasilis.nl/prevent-ios-from-zooming-onfocus/
     viewport.content = content + (event.type == 'blur' ? (content.match(maxScaleRegex, '') ? '' : maxScale + 10) : maxScale + 1);
 }

 // We could use DOMFocusIn here, but it's deprecated.
 this.addEventListener('focus', changeViewport, true);
 this.addEventListener('blur', changeViewport, false);
}

//jQuery-plugin
jQuery(function() {
	jQuery.fn.cancelZoom = function()
	 {
	     return this.each(cancelZoom);
	 };

	 // Usage:
	 jQuery('input:text, input:password,select,textarea').cancelZoom();
});