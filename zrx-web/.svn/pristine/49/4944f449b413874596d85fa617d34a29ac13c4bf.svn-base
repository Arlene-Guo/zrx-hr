
/**
 * 功能说明：Cookie操作
 */
var Cookie = new function() {
	this.set = this.setValue = function(key, value, days, path, domain, secure) {
		var expires = -1;

		if (Type.isNumber(days) && days >= 0) {
			var d = new Date;
			d.setTime(d.getTime() + (days * 86400000)); //24 * 60 * 60 * 1000
			expires = d.toGMTString();
		} else if (Type.isDate(days)) //DSONet added
		{
			expires = days.toGMTString();
		}

		document.cookie = key + "=" + escape(value) + (expires != -1 ? ";expires=" + expires : "") + (path ? ";path=" + path : "") + (domain ? "; domain=" + domain : "") + (secure ? "; secure" : "");
	}
	this.get = this.getValue = function(key) {
		return (new RegExp(" " + key + "=([^;]*)").test(" " + document.cookie)) ? unescape(RegExp.$1) : "";
	}
	this.clear = this.remove = function(name) {
		this.set(name, "", -1);
	}
	this.isEnabled = this.isSupported = function() {
		if (!Type.isBoolean(navigator.cookieEnabled)) {
			var val = "CookieAllowed",
				name = "__BrowserForCookieSupport__";
			this.set(name, test, 90, null);
			navigator.cookieEnabled = (val == this.get(name));

			if (navigator.cookieEnabled) {
				this.remove(name);
			}
		}
		return navigator.cookieEnabled;
	}
}