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

	//var for check event at body can have only one.
	var event_body = false;

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
			var options = that.options;
			var all = options.all_selector;
			$(this).next('.popover').one('click.dismiss.confirmation', '[data-dismiss="confirmation"]', $.proxy(that.hide, that))
			if(that.isPopout()) {
				if(!event_body) {
					event_body = $('body').on('click', function (e) {
						if($(all).is(e.target)) return;
						if($(all).next('div').has(e.target).length) return;

						$(all).confirmation('hide');
						$('body').unbind(e);
						event_body = false;
						
						return;
					});
				}
			}
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
					, btnokclass = this.getbtnokclass()
					, btncancelclass = this.getbtncancelclass()
					, btnoklabel = this.getbtnoklabel()
					, btncancellabel = this.getbtncancellabel()

				$tip.find('.popover-title').text(title);

				var btnOk = $tip.find('.popover-content > div > a:not([data-dismiss="confirmation"])');
				var btnCancel = $tip.find('.popover-content > div > a[data-dismiss="confirmation"]');

				btnOk.addClass(btnokclass).html(btnoklabel).attr('href', href).attr('target', target);
				btnCancel.addClass(btncancelclass).html(btncancellabel);

				$tip.removeClass('fade top bottom left right in')
			}

		, hasContent: function () {
				return this.getTitle()
			}

		, isPopout: function () {
				var popout
					, $e = this.$element
					, o = this.options

				popout = (typeof o.popout == 'function' ? o.popout.call($e[0]) :	o.popout)
					|| $e.attr('data-popout')

				if(popout == 'false') popout = false;

				return popout
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

		, getbtnokclass: function () {
				var btnokclass
					, $e = this.$element
					, o = this.options

				btnokclass = (typeof o.btnokclass == 'function' ? o.btnokclass.call($e[0]) :	o.btnokclass)
					|| $e.attr('data-btnokclass')

				return btnokclass
			}

		, getbtncancelclass: function () {
				var btncancelclass
					, $e = this.$element
					, o = this.options

				btncancelclass = (typeof o.btncancelclass == 'function' ? o.btncancelclass.call($e[0]) :	o.btncancelclass)
					|| $e.attr('data-btncancelclass')

				return btncancelclass
			}

		, getbtnoklabel: function () {
				var btnoklabel
					, $e = this.$element
					, o = this.options

				btnoklabel = (typeof o.btnoklabel == 'function' ? o.btnoklabel.call($e[0]) :	o.btnoklabel)
					|| $e.attr('data-btnoklabel')

				return btnoklabel
			}

		, getbtncancellabel: function () {
				var btncancellabel
					, $e = this.$element
					, o = this.options

				btncancellabel = (typeof o.btncancellabel == 'function' ? o.btncancellabel.call($e[0]) :	o.btncancellabel)
					|| $e.attr('data-btncancellabel')

				return btncancellabel
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
				'<div class="popover-content text-center">' +
				'<div class="btn-group">' +
				'<a class="btn btn-small" href="" target=""></a>' +
				'<a class="btn btn-small" data-dismiss="confirmation"></a>' +
				'</div>' +
				'</div>' +
				'</div>'
		, btnokclass:  'btn-primary'
		, btncancelclass:  ''
		, btnoklabel: '<i class="icon-ok-sign icon-white"></i> Yes'
		, btncancellabel: '<i class="icon-remove-sign"></i> No'
		, singleton: false
		, popout: false
	})


 /* POPOVER NO CONFLICT
	* =================== */

	$.fn.confirmation.noConflict = function () {
		$.fn.confirmation = old
		return this
	}

}(window.jQuery);
