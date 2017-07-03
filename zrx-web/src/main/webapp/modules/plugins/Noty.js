

 var Noty = function(){

 }

 Noty.prototype = {
	 alert: function (msg,callback){
		var options = {
			text: msg || "",
			layout: "center",
			type: "alert",
			closable:false,
			timeout: false,
			modal:true
		};
		$.extend(options,{
				buttons: [
					{
						type: "btn btn-primary", text: "<i class='icon-ok'></i>确定", click: function ($noty){
							if(typeof(callback) == 'function'){
								callback($noty);
							}
							$noty.close();
						}
					}
				]
		});
		Notice(options);
	 },
	 info: function (msg,option){
		var options = {
			text: msg || "",
			layout: "topCenter",
			type: "information"
		};
		if(option){
			$.extend(options,option);
		}
		Notice(options);
	 },
	 error: function (msg,option){
		var options = {
			text: msg || "",
			layout: "topCenter",
			type: "error"
		};
		if(option){
			$.extend(options,option);
		}
		Notice(options);
	 },
	 confirm: function (msg,buttons){
		var options = {
			text: msg || "",
			layout: "center",
			closable: false,
			timeout: false,
			modal: true
		};
		if (!buttons){
			$.extend(options,{
				buttons: [
					{
						type: "btn btn-danger", text: "<i class='icon-remove'></i>取消", click: function ($noty){
							$noty.close();
							return false;
						}
					}
				]
			});
		}else{
			$.extend(options,{
				buttons: [buttons,
					{
						type: "btn btn-danger", text: "<i class='icon-remove'></i>取消", click: function ($noty){
							$noty.close();
							return false;
						}
					}
				]
			});
		}
		Notice(options);
	 }
 }