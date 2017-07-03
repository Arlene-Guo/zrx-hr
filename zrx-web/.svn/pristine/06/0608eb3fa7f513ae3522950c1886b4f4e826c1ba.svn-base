//String Ext
$.extend(String.prototype, {

	getNum: function() {
		return this.replace(/[^\d]/g, "");
	},

	getEn: function() {
		return this.replace(/[^A-Za-z]/g, "");
	},

	getCn: function() {
		return this.replace(/[^\u4e00-\u9fa5\uf900-\ufa2d]/g, "");
	},

	subEnd: function() {
		return this.length ? this.substring(0, this.length - 1) : "";
	},
	
	upperCase : function(index){
		return this.substring(0,index).toUpperCase() + this.substring(index);
	},

	compare: function(str,p) {
		var arr = typeof (str) == "string" ? str.split(p || ",") : str;
		if (typeof arr != 'object') return;
		return arr.indexOf(this.toString());
	},

	trim: function() { 
		var re = /^\s+|\s+$/g;
		return function() { return this.replace(re, ""); }
	},
	
	toField : function(data,thiv) {
		return this.replace(/(?:\$\{([^{}]+)\})/gi,
		function(f) {
			f = f.replace(/\$|\{|\}/gi,'');
			return f.toValue(data,thiv);
		});		
	},
	
		/*
		var d = { 
			depart : { name : 'anan'}
		}
		
		'depart.name'.toValue(d);		
		return anan;
	*/
	toValue : function(d,thiv) {
		d = d || {};
		var sf = this.split(":");
		var s = sf[0].split(".");
		var p = s[0];
		var v = d[p];
		if(v &&　$.isPlainObject(v)) {
			for (j = 1; j < s.length; ++j) {
				v = v[s[j]];
			}		
		}
		
		if(thiv && sf[1]) {
			var f = "thiv." + sf[1];
			eval("if (typeof " + f + " === 'function') v = "+f+".call(thiv,v,d);");
		}
		
		if($.isArray(v) && v.length > 0) {
			if($.isPlainObject(v[0]) && s[1]) {
				v = v.toField(s[1]);
			}
			if(!$.isPlainObject(v[0]))
				v = v.join(thiv ? (thiv.sp || ",") : ",");
		}	
			
		return v != undefined ? v : "";		
	},
	
	toDate : function(){
		var temp = this.replace(/-/g, "/"); 
		return new Date(Date.parse(temp)); 
	},
	
	
	allReplace : function(args) {
		var result = this;
		for (var key in args) {
			if(args[key] != undefined){
				result = result.replace(new RegExp("(" + key + ")", "g"), args[key]);
			}
		}
		return result;
	}
});












