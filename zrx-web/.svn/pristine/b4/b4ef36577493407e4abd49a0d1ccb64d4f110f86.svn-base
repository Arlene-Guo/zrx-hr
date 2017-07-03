XTemplate = (function() {	

	XTemplate = function() {

		var opt = {};
		var xTemplate = new String();
		$.each(arguments,function(i,t){
			if(typeof(t) === 'string')
				xTemplate += t;
		});
		
		this.tmplId = Eye.UID();
		this.xTemplate = $.template(this.tmplId , xTemplate);
	};
	
	
	
	$.extend(XTemplate.prototype,{	
		tmpl : function(data,opt){
			return $.tmpl(this.tmplId, data, opt)
		}
	});
	
	return XTemplate;
})();