/**
 * 功能说明：测评新增
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
		self.bindEvent();
	}
	$.extend(List.prototype, {
		/**
		 * 页面初始化
		 */
		init: function() {
			this.urlJson = tn.json.encode(tn.Base64.decode(location.hash.substr(1)));
			this.add = this.urlJson.add;
			if(this.add == 0) {
				this.id = this.urlJson.id;
				this.showData();
			} else {
				this.id = 0;
			}
		},
		bindEvent: function() {
			var self = this;

		}

	});
	window.List = new List();
})(jQuery, window);
