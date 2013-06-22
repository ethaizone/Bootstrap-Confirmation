/* ===========================================================
 * bootstrap-confirmation.js v1.0.0
 * http://ethaizone.github.io/Bootstrap-Confirmation/
 * ===========================================================
 * Copyright 2013 Nimit Suwannagate <ethaizone@hotmail.com>
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =========================================================== */


!function ($) {

	"use strict"; // jshint ;_;


 /* CONFIRMATION PUBLIC CLASS DEFINITION
	* =============================== */

	var Confirmation = function (element, options) {
		var that = this;
		this.init('confirmation', element, options)

		$(element).on('show', function(e) {
			var options = that.options;
			var all = options.all_selector;
			if(options.singleton) {
				$(all).not(that.$element).confirmation('hide');
			}
		});

		$(element).on('shown', function(e) {
			$(this).next('.popover').on('click.dismiss.confirmation', '[data-dismiss="confirmation"]', $.proxy(that.hide, that))
		});
	}


	/* NOTE: CONFIRMATION EXTENDS BOOTSTRAP-TOOLTIP.js
		 ========================================== */

	Confirmation.prototype = $.extend({}, $.fn.tooltip.Constructor.prototype, {

		constructor: Confirmation

	, setContent: function () {
			var $tip = this.tip()
				, title = this.getTitle()
				, href = this.getHref()
				, target = this.getTarget()
				, $e = this.$element

			$tip.find('.popover-title').text(title)

			$tip.find('.popover-content > div > a:eq(0)').attr('href', href).attr('target', target);

			$tip.removeClass('fade top bottom left right in')
		}

	, hasContent: function () {
			return this.getTitle()
		}

	, getHref: function () {
			var href
				, $e = this.$element
				, o = this.options

			href = (typeof o.href == 'function' ? o.href.call($e[0]) :	o.href)
				|| $e.attr('data-href')

			return href
		}

	, getTarget: function () {
			var target
				, $e = this.$element
				, o = this.options

			target = (typeof o.target == 'function' ? o.target.call($e[0]) :	o.target)
				|| $e.attr('data-target')

			return target
		}

	, tip: function () {
			this.$tip = this.$tip || $(this.options.template)
			return this.$tip
		}

	, destroy: function () {
			this.hide().$element.off('.' + this.type).removeData(this.type)
		}

	})


 /* CONFIRMATION PLUGIN DEFINITION
	* ======================= */

	var old = $.fn.confirmation

	$.fn.confirmation = function (option) {
		var that = this
		return this.each(function () {
			var $this = $(this)
				, data = $this.data('confirmation')
				, options = typeof option == 'object' && option
			options = options || {}
			options.all_selector = that.selector
			if (!data) $this.data('confirmation', (data = new Confirmation(this, options)))
			if (typeof option == 'string') data[option]()
		})
	}

	$.fn.confirmation.Constructor = Confirmation

	$.fn.confirmation.defaults = $.extend({} , $.fn.tooltip.defaults, {
		placement: 'top'
		, trigger: 'click'
		, target : '_self'
		, href   : '#'
		, title: 'Are you sure?'
		, template: '<div class="popover">' +
				'<div class="arrow"></div>' +
				'<h3 class="popover-title"></h3>' +
				'<div class="popover-content">' +
				'<div class="btn-group text-center">' +
				'<a class="btn btn-small btn-primary" href="" target=""><i class="icon-ok-sign icon-white"></i> Yes</a>' +
				'<a class="btn btn-small" data-dismiss="confirmation"><i class="icon-remove-sign"></i> No</a>' +
				'</div>' +
				'</div>' +
				'</div>'
		, singleton: false
	})


 /* POPOVER NO CONFLICT
	* =================== */

	$.fn.confirmation.noConflict = function () {
		$.fn.confirmation = old
		return this
	}

}(window.jQuery);
