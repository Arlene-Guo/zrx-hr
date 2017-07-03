

function phoneCall(node, phoneNum, flag) {
	var noty = new Noty();
	var ver = new Ver();

	var phoneNum = phoneNum + ""; //转成字符串格式
	
	//校验是手机号 需要隐藏中间四位  还是座机号
	// if (ver.cell(phoneNum)) {
	// 	var start = phoneNum.length - 4;
	// 	var end = phoneNum.length - 8; 
	// 	var telNum = phoneNum.replace(phoneNum.substring(start, end),"****");
	// } else {
		var telNum = phoneNum;
	// }

	if(node){
		node.data("phoneNum", phoneNum);
		if (flag) {
			//客户端软电话传值
			var phone = /0?(13|14|15|18)[0-9]{9}/;
			var value = phoneNum;
			var phoneStr = value.match(phone);
			if(phoneStr && phoneStr[0]){
				var p3 = phoneStr[0].substring(0, 3);
				var p7 = phoneStr[0].substring(0, 7);
				var index = $.inArray(p7, PhoneRange.nj[p3]);
				if (index !== -1) {
					value = "3" + phoneStr[0];
				} else {
					value = "30" + phoneStr[0];
				}
			}else{
				//固话号码
				var tel = /^\d{6,8}$/;
				if(tel.test(value)){
					value = "3" + value;
				}else {
					if(value.substring(0,3) == "025" || $.inArray(value.substring(0,4), ["0510", "0516", "0519", "0512", "0513", "0518", "0517", "0515", "0514", "0511", "0523", "0527"]) !== -1){
						value = "3" + value;
					}else{
						value = "30" + value;
					}
				}
				value = value.replace("-","");
			}

			node.html("<a href='tuniucom://callfun/?param1="+value+"'>"+ phoneNum +"</a>");
			node.unbind("click").click(function() {
				var aicState = parseInt(localStorage.getItem("aicState"));
				if (aicState == 1 ) {
					var phoneNum = $(this).data("phoneNum");
					//校验号码是否合法
					if (ver.cell(phoneNum) || ver.telAll(phoneNum) || ver.tel(phon) || ver.telNum(phoneNum)) {
						sbCall(phoneNum);
					} else {
						noty.alert("号码有误，请核实！");
						return false;
					}
				}
				
			});
		} else {
			node.html(telNum);
		}
	}
	
	//telNum如果为手机号则隐藏中间四位
	return telNum;
}


// (function() {
// 	setTimeout(function() {
// 		replaceTel();
// 	}, 5000);
// })(document);