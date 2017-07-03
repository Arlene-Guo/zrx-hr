//String Ext

TNComponent = (function() {	

	TNComponent = function(config) {
		
		this.noty = new Noty();
		this.ver = new Ver();
		$.extend(this,Eye.applyAll({
			ds : {
				userId : Cookie.get("honeydukesUid") || "99999",
				userName:tn.Base64.decode(Cookie.get("honeydukesUname")) || "TN-Test",
			}			
		},config || {}));
	};
	
	$.extend(TNComponent.prototype,{	
		
		/* 
			初始化控件
			然后分别调用 initDs
					   initHTML
					   initEvents
		*/		
		init : function(dsChains){
			
			var me = this;
			if($.isArray(dsChains) && dsChains.length) {
				var h = dsChains.shift();
				Ajax.request({
					url: h.url,
					type: "get",
					listener: {
						success: function(ds) {
							me.ds[h.field] = ds.data;
							me.init(dsChains);
						}
					}
				});				
			} else {
				if($.isFunction(me.initDs)) me.initDs();
				if($.isFunction(me.initHTML)) me.initHTML();
				if($.isFunction(me.initEvents)) me.initEvents();
			}
		},
		
		
		addDs:function(ds){
			return Eye.apply(this.ds,ds||{});
		}
		
	});
	
	return TNComponent;
	
})();











