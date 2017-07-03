

 function Privileges(options){
	$.extend(this,options,{
		operators: null
	});
	this._init();
}

$.extend(Privileges.prototype,{
	_getOperatorConfig: function (callback){
		if (!this.operatorConfig){
			throw new Error("缺少参数：请设置权限配置列表operatorConfig");
		}
		if (!this.config.showConfig){
			throw new Error("缺少参数：请设置页面配置config");
		}
		var operatorConfig = this.config.showConfig(this.operatorConfig,2);
		if (operatorConfig){
			callback().call(this,operatorConfig);
		}
	},
	_setUserOperator: function (operatorConfig){
		if (!this.config.util.type.isFunction(this.callback)){
			throw new Error("缺少参数：请设置用户权限回调方法callback");
		}
		if (!this.target){
			throw new Error("缺少参数：请设置回调方法的作用域target");
		}
		if (!this.userOperator){
			throw new Error("缺少参数：请设置权限请求参数userOperator");
		}
		this.config.getUserOperator(operatorConfig, this.callback, this.target, this.userOperator,this);
	},
	isShowView: function (){
		if (!this.operators || this.operators.length == 0 || this.operators[0].item.length == 0){
			location.href = this.config.subSystem + "common/error.html?code=operator";
			return false;
		}else{
			return true;
		}
	},
	_init: function (){
		var self = this;
		this._getOperatorConfig.call(this,function (){
			return self._setUserOperator;
		});
	}
});