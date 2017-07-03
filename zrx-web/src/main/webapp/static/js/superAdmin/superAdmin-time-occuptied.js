/**
 * 功能说明：纪念册列表
 */
;
(function($, window) {
	function List() {
		var self = this;
		$.extend(this, {
			noty: new Noty(),
			ver: new Ver()
		});
		self.init();
	}
	$.extend(List.prototype, {
		/**
		 * 页面初始化
		 */
		init: function() {
			this.urlJson = tn.json.encode(tn.Base64.decode(location.hash.substr(1)));
      this.showMessage();
			this.bindEvent();
		},
    showMessage: function() {
      var self = this;
      $('#message').html(this.urlJson);
    },
		bindEvent: function() {

		},
		/**
		 * 页面AJAX请求URL统一处理
		 */

	});
	window.List = new List();
})(jQuery, window);
