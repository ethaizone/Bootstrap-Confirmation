/* ========================================================================
 * bootstrap3-confirmation.js v1.0.1
 * Adaptation of bootstrap-confirmation.js 
 * from Nimit Suwannagate <ethaizone@hotmail.com>
 * http://ethaizone.github.io/Bootstrap-Confirmation/
 * ========================================================================
 * Copyright 2013 Thomas Jacquart <thomas.jacquart@gmail.com>.
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
 * ======================================================================== */


+function ($) { "use strict";

  // COMFIRMATION PUBLIC CLASS DEFINITION
  // ====================================
  var Confirmation = function (element, options) {
    // First init from popover
    this.init('confirmation', element, options)
    
    var options = this.options
    
    if (options.singleton) {
      // remove others when I show me
    }
    var that = this;
    if (options.popout) {
      // close when I click outside the box
      var $tip = this.tip()
//      $('html').on('click', function(){
//	  that.leave(that)
//      })
    }
  }

  if (!$.fn.popover || !$.fn.tooltip) throw new Error('Confirmation requires popover.js and tooltip.js')

  Confirmation.DEFAULTS = $.extend({} , $.fn.popover.Constructor.DEFAULTS, {
    placement	    : 'top'
    , title	    : 'Are you sure ?'
    , btnOkClass    : 'btn btn-primary'
    , btnOkLabel    : 'Yes'
    , btnOkIcon	    : 'glyphicon glyphicon-ok' 
    , btnCancelClass: 'btn btn-default'
    , btnCancelLabel: 'No'
    , btnCancelIcon : 'glyphicon glyphicon-remove' 
    , singleton	    : false
    , popout	    : false
    , href	    : '#'
    , target	    : '_self'
    , onConfirm	    : function(){}
    , onCancel	    : function(){}
    , template	    :   '<div class="popover">'
		      + '<div class="arrow"></div>'
		      + '<h3 class="popover-title"></h3>'
		      + '<div class="popover-content">'
		      + '<a data-apply="confirmation">Yes</a>'
		      + ' <a data-dismiss="confirmation">No</a>'
		      + '</div>'
		      + '</div>'
  })


  // NOTE: CONFIRMATION EXTENDS popover.js
  // ================================

  Confirmation.prototype = $.extend({}, $.fn.popover.Constructor.prototype)

  Confirmation.prototype.constructor = Confirmation

  Confirmation.prototype.getDefaults = function () {
    return Confirmation.DEFAULTS
  }
  
  Confirmation.prototype.setContent = function () {
    var that	    = this;
    var $tip	    = this.tip()
    var title	    = this.getTitle()
    var $btnOk	    = $tip.find('[data-apply="confirmation"]');
    var $btnCancel  = $tip.find('[data-dismiss="confirmation"]');
    var options	    = that.options
    
    $btnOk.addClass(this.getBtnOkClass())
      .html(this.getBtnOkLabel())
      .prepend($('<i></i>').addClass(this.getBtnOkIcon()), " ")
      .attr('href', this.getHref())
      .attr('target', this.getTarget())
      .one('click', function() {
        options.onConfirm()
        that.leave(that)
	  })
    
    $btnCancel.addClass(this.getBtnCancelClass())
	      .html(this.getBtnCancelLabel())
	      .prepend($('<i></i>').addClass(this.getBtnCancelIcon()), " ")      
	      .one('click', function(){
          options.onCancel()
          that.leave(that)
	      })
    
    $tip.find('.popover-title')[this.options.html ? 'html' : 'text'](title)

    $tip.removeClass('fade top bottom left right in')

    // IE8 doesn't accept hiding via the `:empty` pseudo selector, we have to do
    // this manually by checking the contents.
    if (!$tip.find('.popover-title').html()) $tip.find('.popover-title').hide()
  }

  Confirmation.prototype.getBtnOkClass = function () {
    var $e = this.$element
    var o  = this.options

    return $e.attr('data-btnOkClass')
      || (typeof o.btnOkClass == 'function' ? 
	    o.btnOkClass.call($e[0]) : 
	    o.btnOkClass)
  }
  
  Confirmation.prototype.getBtnOkLabel = function () {
    var $e = this.$element
    var o  = this.options

    return $e.attr('data-btnOkLabel')
      || (typeof o.btnOkLabel == 'function' ?
            o.btnOkLabel.call($e[0]) :
            o.btnOkLabel)
  }
  
  Confirmation.prototype.getBtnOkIcon = function () {
    var $e = this.$element
    var o  = this.options

    return $e.attr('data-btnOkIcon')
      || (typeof o.btnOkIcon == 'function' ?
            o.btnOkIcon.call($e[0]) :
            o.btnOkIcon)
  }

  Confirmation.prototype.getBtnCancelClass = function () {
    var $e = this.$element
    var o  = this.options

    return $e.attr('data-btnCancelClass')
      || (typeof o.btnCancelClass == 'function' ? 
	    o.btnCancelClass.call($e[0]) : 
	    o.btnCancelClass)
  }
  
  Confirmation.prototype.getBtnCancelLabel = function () {
    var $e = this.$element
    var o  = this.options

    return $e.attr('data-btnCancelLabel')
      || (typeof o.btnCancelLabel == 'function' ?
            o.btnCancelLabel.call($e[0]) :
            o.btnCancelLabel)
  }
  
  Confirmation.prototype.getBtnCancelIcon = function () {
    var $e = this.$element
    var o  = this.options

    return $e.attr('data-btnCancelIcon')
      || (typeof o.btnCancelIcon == 'function' ?
            o.btnCancelIcon.call($e[0]) :
            o.btnCancelIcon)
  }
  
  Confirmation.prototype.getHref = function () {
    var $e = this.$element
    var o  = this.options

    return $e.attr('data-href')
      || (typeof o.href == 'function' ?
            o.href.call($e[0]) :
            o.href)
  }

  Confirmation.prototype.getTarget = function () {
    var $e = this.$element
    var o  = this.options

    return $e.attr('data-target')
      || (typeof o.target == 'function' ?
            o.target.call($e[0]) :
            o.target)
  }

  // CONFIRMATION PLUGIN DEFINITION
  // ==============================

  var old = $.fn.confirmation

  $.fn.confirmation = function (option) {
    var that = this
    return this.each(function () {
      var $this   = $(this)
      var data    = $this.data('bs.confirmation')
      var options = typeof option == 'object' && option

      if (!data) $this.data('bs.confirmation', (data = new Confirmation(this, options)))
      if (typeof option == 'string') data[option]()
    })
  }

  $.fn.confirmation.Constructor = Confirmation


  // CONFIRMATION NO CONFLICT
  // ===================

  $.fn.confirmation.noConflict = function () {
    $.fn.confirmation = old
    return this
  }

}(jQuery);
