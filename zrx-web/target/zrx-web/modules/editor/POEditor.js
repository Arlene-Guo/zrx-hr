
/**
 * 功能说明：行程编辑器
 */
Math.uuid=(function(){var $="0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz".split("");return function(_,G){var C=$,F=[],D=Math.random;G=G||C.length;if(_){for(var B=0;B<_;B++)F[B]=C[0|D()*G]}else{var A=0,E;F[8]=F[13]=F[18]=F[23]="-";F[14]="4";for(B=0;B<36;B++)if(!F[B]){E=0|D()*16;F[B]=C[(B==19)?(E&3)|8:E&15]}}return F.join("")}})();var randomUUID=Math.uuid;

function POEditor(opt){
	opt.rangy.init();
	$.extend(this,opt || {},{
		rangy: opt.rangy,
		fileSize: 10240,//单位K
		POID: Math.uuid(),
		itemColors: ["#FF0000","#0000FF","#000000"]
	});
	var self = this;
	this.POEvent();
	this.editorArea = this.editContainer();
	this.tourSection = $(".tourSection_" + this.template,this.editorArea);//牛人专线和非牛人专线tourSection分别为".tourSection_niuren",".tourSection_unniuren"
	this.delNode = $(".delNode",this.editorArea);
	this.poeWin = $(".poeWin",this.editorArea);
	this.poeWinLine = $(".poeWinLine",this.editorArea);
	this.msg = $(".poeMsg",this.editorArea);

	this.menu = new Menu(this);
	this.menuContainer = this.menu.initMenu();
	// localStorage.clear();
	this.init();
}

POEditor.prototype.init = function (){
	var div = $("<div/>");
	div.append(this.menuContainer).append(this.editorArea);
	if (this.container){
		this.container.append(this.niurenStyleNode());
		if (this.template && this.template != ""){
			$("head").append("<link type='text/css' rel='stylesheet' href='"+this.menu.cssPath+this.template+".css'/>");
			//var script = $("<script id='POScript'>$(function(){$('.niuren_light').click(function(e){e.preventDefault();});});</script>");
			//$("head").append(script);
		}
	}else{
		if ($("head .POStyle").length == 0){
			$("head").append(this.niurenStyleNode());
		}
	}
	this.container = this.container || $(document.body);
	$(this.container).append(div);
}

POEditor.prototype.editContainer = function (){
	var containerCls = {border: "1px solid #C5C5C5",borderTop:"none",padding:"2px",margin:"0 0 5px",minWidth:"850px",maxHeight:"600px",overflowY:"auto",background:"url('css/POEditor/images/logo.gif') left bottom #FFF no-repeat",minHeight:"250px"}
	var tourSection;
	if(this.template == "niuren" || this.template == "unniuren"){
		tourSection = $("<div class='tourSection_" + this.template + "' />");
	}else if(this.template == "base"){
		tourSection = $("<div class='baseSection' contentEditable='true' style='min-height:400px;' />");
	}
	var delNode = $("<div class='delNode' style='display:none;position:fixed;font-size:13px;cursor:pointer;padding:3px;border:1px solid #CCC;background-color:#FFF;'>删除</div>");
	var win = $("<div class='poeWin' style='display:none;position:fixed;border:1px solid #999;background-color:#FFF;padding:5px;z-index:1000000'></div>");
	var winLine = $("<div class='poeWinLine' style='display:none;position:fixed;height:1px;background-color:#FFF;z-index:1000001'></div>");
	var poeMsg = $("<div class='poeMsg' style='font-size:13px;display:none;position:fixed;height:20px;opacity:0.6;width:auto;background-color:#000;padding: 2px  20px;text-align:center;color:#FFF;z-index:1000002'></div>");
	return $("<div/>").css(containerCls).append(tourSection).append(delNode).append(win).append(winLine).append(poeMsg);
}

POEditor.prototype.POEvent = function (){
	var self = this;
	//模拟编辑器Ctrl+V操作
	$(this.container).unbind("keypress").bind("keypress",function (e){
		if (e.ctrlKey && e.shiftKey && e.charCode == 83){
			self.setLocalStorage.call(self);
		}
	});
	//编辑器粘贴操作
	$(this.container).unbind("paste").bind("paste", function(e) {
		var rng = self.menu.getFirstRange();
		e = window.event || e;
		if (e.target.nodeName === 'INPUT') return true;
		if (!window.clipboardData) {
			//非IE操作
			self.menu.savedSelActiveElement = document.activeElement;

			var contentDiv = $('#tempDivForClipboard');
			if (!contentDiv.length) {
				contentDiv = $('<div id="tempDivForClipboard" style="overflow:hidden;position:absolute; top: 0; left: 0; width:1px; height:1px; border:#000 1px solid" contenteditable="true">originalText</div>');
				contentDiv.css('top', $(rng.rang.startContainer.parentNode).offset().top)
				$('body').append(contentDiv);
			}
			contentDiv.html('');
			contentDiv.focus();
			setTimeout(function() {
				$('div', contentDiv).replaceWith(function() {
					return $(this).html() + '\n';
				});
				contentDiv.html(contentDiv.html().replace(/(\s*<br>\s*)+/g, '\n'));
				var clip = $.trim(contentDiv.text()).split(/\s*\n+\s*/) || [];
				if (clip.length > 0) {
					var createTextNode, brNode;
					for (var i = 0; i < clip.length; i++) {
						createTextNode = document.createTextNode(clip[i]);
						rng.rang.deleteContents();
						rng.rang.insertNode(createTextNode);
						rng.rang.collapseAfter(createTextNode);
						if (i != clip.length - 1) {
							brNode = document.createElement('br');
							rng.rang.insertNode(brNode);
							rng.rang.collapseAfter(brNode);
						}
					};
					rng.sel.setSingleRange(rng.rang);
					contentDiv.remove();
					return true;
				} else {
					contentDiv.remove();
					return false;
				}

			}, 0)
			return true;
		} else {
			//IE浏览器操作
			var clip = self.getClip() || '';
			self.setClip(clip)
			return true;
		}
	});
	$(this.container).unbind("click").click(function (e){
		self.hideWin();
		Event.fireEvent("hideWindow");
	});
	
    //编辑器enter键操作
	$(this.container).unbind("keydown").bind("keydown",function(e){
		var e = e || window.event;
	    var key = e.keyCode || e.charCode;
		if(key==13){
			if(e.preventDefault) {
					e.preventDefault();
				} else {
					e.returnValue = false;
				}
				var rng =self.menu.getFirstRange(),
					brNode = document.createElement('br');
				if (/webkit/.test(navigator.userAgent.toLowerCase())) {
					tempRange = rng.rang.cloneRange();
					tempRange.selectNodeContents(e.target);
					tempRange.setEnd(rng.rang.endContainer, rng.rang.endOffset);
					offset = tempRange.toString().length;
					if (offset == e.target.textContent.length && e.target.querySelectorAll("br[type='_webkit']").length == 0) {
						fixbr = brNode.cloneNode();
						fixbr.setAttribute('type', '_webkit');
						rng.rang.insertNode(fixbr);
					}
				}
				rng.rang.deleteContents();
				rng.rang.insertNode(brNode);
				rng.sel.collapse(rng.rang.endContainer, rng.rang.endOffset + 1);
		}
	});
}

POEditor.prototype.msgShow = function (title,flag){
	this.msg.html(title || "");
	this.msg.css({
		top: this.menuContainer.offset().top+28,
		left: this.menuContainer.offset().left+1
	});
	if (!flag){
		this.msg.fadeIn(1000).fadeOut(3000);
	}else{
		this.msg.fadeIn(1000);
	}
}

POEditor.prototype.msgHide = function (){
	this.msg.hide();
}

POEditor.prototype.setLocalStorage = function (){
	//只处理Firefox 7.0.1,暂未处理多个编辑器实例的信息保存
	try{
		if (!localStorage){
			alert("您所使用的浏览器暂未支持本地存储，请使用Firefox 7.0.1以上版本的浏览器");
			return;
		}
		// localStorage.clear();
		localStorage[this.POID] = this.getPOHtml(true);
		this.msgShow("编辑内容已保存，注意：页面刷新后编辑内容将被清除。");
	}catch(e){return;}
}

POEditor.prototype.getLocalStorage = function (){
	try{
		if (!localStorage){
			alert("您所使用的浏览器暂未支持本地存储，请使用Firefox 7.0.1以上版本的浏览器");
			return;
		}
	}catch(e){return;}
	return localStorage[this.POID];
}

POEditor.prototype.setClip = function (text){
	if (window.clipboardData){
		return	window.clipboardData.setData("Text",text);
    }
    else{
	    if(window.netscape){
		try {
			netscape.security.PrivilegeManager.enablePrivilege("UniversalXPConnect");
		}
		catch (e) {
			alert("您的Firefox安全限制限制您进行剪贴板操作，请按如下步骤进行设置：\n1.请在浏览器地址栏中输入'about:config'。\n2.在过滤器中输入“signed.applets.codebase_principal_support”并按回车。\n3.鼠标双击值，将值设置为'true'之后重试。");
			return false;
		}
		var clip = Components.classes["@mozilla.org/widget/clipboard;1"].getService(Components.interfaces.nsIClipboard);
		if (!clip) {
			return false;
		}

		var trans = Components.classes["@mozilla.org/widget/transferable;1"].createInstance(Components.interfaces.nsITransferable);
		if (!trans) {
			    return false;
		    }
		trans.addDataFlavor("text/unicode");
		var str = new Object();
        var len = new Object();
        var str = Components.classes["@mozilla.org/supports-string;1"].createInstance(Components.interfaces.nsISupportsString);
        str.data = text;
        trans.setTransferData("text/unicode",str,text.length*2);

		    clip.setData(trans, null, clip.kGlobalClipboard);
		    var str = new Object();
		    var strLength = new Object();
		    try //当剪切板中为空时会有问题.
		    {
				trans.getTransferData("text/unicode", str, strLength);
				if (str) {
					str = str.value.QueryInterface(Components.interfaces.nsISupportsString);
				}
				if (str) {
					return str.data.substring(0, strLength.value / 2);
				}
		    }
		    catch (e)//剪切板为空.
		    {
				return "";
		    }
	    }
	}
}

POEditor.prototype.getClip = function (){
	if (window.clipboardData) {
		var tempStr = window.clipboardData.getData("Text");
		var createTextNode = document.createTextNode(tempStr);
		return createTextNode.data;
	} else {
	    if(window.netscape){
		try {
			netscape.security.PrivilegeManager.enablePrivilege("UniversalXPConnect");
		}
		catch (e) {
			alert("您的Firefox安全限制限制您进行剪贴板操作，请按如下步骤进行设置：\n1.请在浏览器地址栏中输入'about:config'。\n2.在过滤器中输入“signed.applets.codebase_principal_support”并按回车。\n3.鼠标双击值，将值设置为'true'之后重试。");
			return false;
		}
		var clip = Components.classes["@mozilla.org/widget/clipboard;1"].getService(Components.interfaces.nsIClipboard);
		if (!clip) {
			    return false;
		    }

		var trans = Components.classes["@mozilla.org/widget/transferable;1"].createInstance(Components.interfaces.nsITransferable);
		if (!trans) {
			    return false;
		    }
		trans.addDataFlavor("text/unicode");
		    clip.getData(trans, clip.kGlobalClipboard);
		    var str = new Object();
		    var strLength = new Object();
		    try //当剪切板中为空时会有问题.
		    {
			trans.getTransferData("text/unicode", str, strLength);
			if (str) {
				str = str.value.QueryInterface(Components.interfaces.nsISupportsString);
			}
			if (str) {
				return str.data.substring(0, strLength.value / 2);
			}
		    }
		    catch (e)//剪切板为空.
		    {
			return "";
		    }
	    }
	}
}

POEditor.prototype.niurenStyleNode = function (){
	var style = $("<style class='POStyle'/>");
	var str = ".tourSection_" + this.template + " .day_title_new h3 div{border-bottom:1px dashed  #000;min-width:500px;width:700px;height:auto;min-height:22px;}";
	str += ".tourSection_"+this.template+" .day_title_new div.tour_line{border-bottom:1px dashed  #000;min-width:500px;width:720px;height:auto;min-height:22px;}";
	str += ".tourSection_"+this.template+" .time_box_inner .time_num div.tour_con{border-bottom:1px dashed  #000;min-width:65px;width:65px;height:auto;min-height:22px;}";
	str += ".tourSection_"+this.template+" .time_box_inner .time_do_new div.tour_con{border-bottom:1px dashed  #000;min-width:500px;width:720px;height:auto;min-height:22px;}";
	str += ".tourSection_"+this.template+" .time_box_inner .time_do_new div.tour_description{border-bottom:1px dashed  #000;min-width:500px;width:720px;height:auto;min-height:22px;}";
	str += ".tourSection_"+this.template+" .time_box_inner .time_do_new div.tour_con_h4{border-bottom:1px dashed  #000;min-width:500px;width:720px;height:auto;min-height:22px;}";
	str += ".tourSection_"+this.template+" .tour_food .tour_item div{border-bottom:1px dashed  #000;min-width:500px;height:auto;min-height:22px;}";
	str += ".tourSection_"+this.template+" .time_box_inner .time_img_photo li div{border-bottom:1px dashed  #000;min-width:100px;width:auto;height:auto;min-height:22px;}";
	str += "*._FF0000{color:#FF0000}*._0000FF{color:#0000FF}*._000000{color:#000000}";
	str += "*.poeLink{color:blue;cursor:pointer;}";
	str += ".link_span{}";
	str += ".cgrey{ color:#666; text-decoration:underline;}";
	style.html(str);
	return style;
}

POEditor.prototype.getPOHtml = function (isClear){
	if(this.template == "base"){
		return $('.baseSection', this.editorArea).clone().html();
	}else{
		var div = $("<div/>").append(this.tourSection.clone());
		if (!isClear){
			this.clearHtml(div);
		}
		return div.html();
	}
}

POEditor.prototype.setPOHtml = function (obj){
	var self = this;
	this.tourSection.empty();
	if(this.template == "base"){
		$('.baseSection', this.editorArea).empty().append(obj);

	}else{
		this.menu.day = 0;
		this.day = 0;
		var div = $("<div/>").append(obj);
		var html = $(".tourSection_" + this.template,div).html();
		if (this[this.template+"ReloadBindEvent"]){
			this[this.template+"ReloadBindEvent"](html);
		}else{
			this.menu[this.template+"ReloadBindEvent"](html);
		}
	}

}

POEditor.prototype.getPOHtmlByDay = function (){
		var obj = {};
		$(".tourContent_new",this.tourSection).each(function (i,n){
			obj[i+1] = $(n).html();
		})
		return obj;

}

POEditor.prototype.getPOText = function (flag){
	if (!flag){
		return this.tourSection.text();
	}else{
		var obj = {};
		$(".tourContent_new",this.tourSection).each(function (i,n){
			obj[i+1] = $(n).text();
		})
		return obj;
	}
}

POEditor.prototype.clearHtml = function (node){
	//清除节点编辑状态
	$("*[contentEditable='true']",node).removeAttr("contentEditable");
	//清除节点自动增加的最后一个br，由回车生成。
	//$("* br:last",node).remove();
}

POEditor.prototype.showWin = function (e,html){
	var self = this;
	this.poeWin.append(html || "");
	this.poeWin.css({
		left: $(e.target).offset().left - 1,
		top: $(e.target).offset().top + $(e.target).height() - 1
	}).show().data("target",$(e.target).parent());
	var width = $(e.target).width();
	if (width <= 8){
		width = 20;
	}else{
		width = $(e.target).width() + 2
	}
	this.poeWinLine.css({
		left: $(e.target).offset().left - 1,
		top: $(e.target).offset().top + $(e.target).height() - 1,
		width: width,
		marginLeft: "1px"
	}).show();
	$(e.target).parent().css({
		border: "1px solid #999",
		backgroundColor: "#FFF",
		margin: "0px"
	});
	this.poeWin.click(function (e){
		e.stopPropagation();
	})
}

POEditor.prototype.hideWin = function (e){
	this.poeWin.hide();
	this.poeWin.children().hide();
	this.poeWinLine.hide();
	this.poeWin.data("target") && this.poeWin.data("target").css({
		border: "0px solid #999",
		backgroundColor: "transparent",
		margin: "1px"
	})
}

POEditor.prototype.onUploadImgChange = function (e,imgList,fn){
	var self = this;
    var files = $(e.target)[0].files;
	if (files && files.length > 0){
		var flagType = true, flagSize;
		$.each(files,function(i,n){
			var file = n.name.substring(n.name.lastIndexOf(".")).toLowerCase();
			if (!self.checkFileType(file)){
				flagType = false;
			}
		});
		if (!flagType){
			$(".error",imgList).html("您选择的文件不是图片，请重新选择！");
			$(e.target).val("");
			return;
		}
		if(typeof FileReader !== 'undefined'){
			var addImgList = $.grep(files,function (n,i){
				return (n.fileSize || n.size) < (parseInt(self.fileSize) * 1024);
			});
			var errorImgList = $.grep(files,function (n,i){
				return (n.fileSize || n.size) < (parseInt(self.fileSize) * 1024);
			},true);
			if (addImgList.length > 0){
				$(".error",imgList).html("");
			}
			if (errorImgList.length > 0){
				var str = "以下图片文件大小超过"+self.fileSize+"K，请降低图片质量后重试。<br/>图片文件名如下："
				$.each(errorImgList,function(i,n){
					str += n.name + "&#160;&#160;";
				});
				$(".error",imgList).html(str);
			}
			$.each(addImgList,function(i,n){
				var img = $("<img style='margin:-1000000px 10px 10px 0;cursor:pointer;' src=''/>").load(function (e){
					self.autoSizePreview(this,this.offsetWidth,this.offsetHeight);
					$(this).css({marginTop:0});
				});
				img.unbind("click").click(function (e){
					fn.call(self,e);
				})
				$("fieldset div",imgList).append(img);
				var reader = new FileReader();
                reader.readAsDataURL(n);
                reader.onload = function(e){
                    img.attr("src",this.result);
                }
			});
		}
	}
}

POEditor.prototype.checkFileType = function (files){
    if (!files.match(/.jpg|.gif|.png|.bmp|.jpeg/i)) {
        return false;
    }
    return true;
}

POEditor.prototype.checkFileSize = function (fileSize){
    if(fileSize > parseInt(this.fileSize) * 1024){
        return false;
    }
    return true;
}

POEditor.prototype.autoSizePreview = function(objPre,originalWidth,originalHeight){
    var zoomParam = this.clacImgZoomParam( 150, 150, originalWidth, originalHeight );
    objPre.style.width = zoomParam.width + 'px';
    objPre.style.height = zoomParam.height + 'px';
    objPre.style.marginTop = zoomParam.top + 'px';
    objPre.style.marginLeft = zoomParam.left + 'px';
}

POEditor.prototype.clacImgZoomParam = function(maxWidth,maxHeight,width,height){
    var param = { width:width, height:height, top:0, left:0 };
    if( width>maxWidth || height>maxHeight ){
        rateWidth = width / maxWidth;
        rateHeight = height / maxHeight;
        if( rateWidth > rateHeight ){
            param.width =  maxWidth;
            param.height = height / rateWidth;
        }else{
            param.width = width / rateHeight;
            param.height = maxHeight;
        }
    }
    param.left = (maxWidth - param.width) / 2;
    param.top = (maxHeight - param.height) / 2;
    return param;
}

function Menu(opt){
	$.extend(this,opt || {}, {
		doc: document,
		day: 0,
		imagePath: "css/POEditor/images/",
		cssPath: "css/POEditor/",
		imageUri: "http://img.tuniucdn.com/icons/route/", //需要替换成外网交通工具图片绝对地址
		imageHref: "http://jingdian.tuniu.com/fengjing/",//外网旅游景点频道景点图片展示
		shopping_store_id: 0,
		save_flag: false

	});
	this.tlp = new Template(this);
}
var $m = Menu.prototype;

$m.publicMenu = {
	"Save":{
		name: "保存",
		iconCls: "poe_save",
		position: "-640px 0",
		action: "poe_Save"
	},
	"History":{
		name: "返回最近一次的保存内容",
		iconCls: "poe_history",
		position: "-260px 0",
		action: "poe_History"
	},
	"Bold":{
		name: "粗体",
		iconCls: "poe_bold",
		position: "-140px 0",
		action: "poe_Bold"
	},
	"Color":{
		name: "颜色",
		iconCls: "poe_color",
		position: "-220px 0",
		action: "",
		mouseover: "poe_Color"
	},
	"Link":{
		name: "超链接",
		iconCls: "poe_link",
		position: "-380px 0",
		action: "",
		mouseover: "poe_Link"
	},
	"Bus":{
		name: "汽车",
		iconCls: "poe_bus",
		position: "-670px 0",
		action: "poe_Traffic"
	},
	"Plain":{
		name: "飞机",
		iconCls: "poe_plain",
		position: "-690px 0",
		action: "poe_Traffic"
	},
	"Train":{
		name: "火车",
		iconCls: "poe_train",
		position: "-730px 0",
		action: "poe_Traffic"
	},
	"Ship":{
		name: "轮船",
		iconCls: "poe_ship",
		position: "-710px 0",
		action: "poe_Traffic"
	},
	"Preview":{
		name: "预览",
		iconCls: "poe_preview",
		position:"-580px 0",
		action: "poe_Preview"
	}
}

$m.publicMenuAction = {
	poe_Save: function (e){
		this.setLocalStorage.call(this);
		this.save_flag = true;
	},
	poe_Bold: function (e){
		try{
			this.doc.execCommand("bold", false, null);
		}catch(e){}
	},
	poe_History: function (){
		if(this.save_flag){
			var node = this.getLocalStorage();
			this.setPOHtml(node);
		}else{
			this.msgShow('您尚未保存，请先保存',false);
		}

	},
	poe_Color: function (e){
		var self = this;
		var colorBtn = "width:20px;height:10px;border:1px solid #CCC;margin:2px;cursor:pointer;float:left;"
		var html = $("<div class='poe_win_selectColor'></div>");
		var hitemColors = "", css = "";

		$.each(this.itemColors,function(i,n){
			hitemColors += "<div val='"+n+"' style='"+colorBtn+"background-color:"+n+";'></div>";
			css += "*._"+n.substring(1)+"{color:"+n+"}";
		});
		//if($("#POEStyleByFontColor").length == 0)$("head").append("<style id='POEStyleByFontColor'>"+css+"</style>");
		html.html(hitemColors);
		if ($(".poe_win_selectColor",this.poeWin).length == 0){
			this.poeWin.append(html);
			$(".poe_win_selectColor",this.poeWin).siblings().hide();
			this.showWin(e);
		}else{
			$(".poe_win_selectColor",this.poeWin).show();
			$(".poe_win_selectColor",this.poeWin).siblings().hide();
			this.showWin(e);
			return;
		}
		$(".poe_win_selectColor div",this.poeWin).each(function(i,n){
			$(n).bind('mousedown',function(e){
				var color = $(this).attr("val");
				var colorSelecter = self.rangy.createCssClassApplier('colorSelecter_span', true);
				colorSelecter.applyToSelection();
				$('.colorSelecter_span').removeClass().addClass("_"+color.substring(1));
			})
		});
		return false;
	},
	poe_Link: function (e){
		var self = this;
		var linkAppliers = [];
		var rng,linkSpanApplier;
		var colorBtn = "width:20px;height:10px;border:1px solid #CCC;margin:2px;cursor:pointer;float:left;"
		var html = $("<div class='poe_win_insertLink' style='font-size:13px;'>链接地址：<input type='text' value='http://' style='width:200px;'/><div style='text-align:right;margin:10px 0 5px;'><input type='button' id='oklink' value='添加链接' /><input type='button' id='cancellink' value='清除链接' /></div></div>");
		if($("#POEStyleByLink").length == 0)$("head").append("<style id='POEStyleByLink'>*.poeLink{color:blue;cursor:pointer;}</style>");
		rng = self.getFirstRange();
		try{
			linkSpanApplier = self.rangy.createCssClassApplier("link_span", true);
			linkSpanApplier.applyToSelection();
		}catch(e){}

		if ($(".poe_win_insertLink",this.poeWin).length == 0){
			this.poeWin.append(html);
			$(".poe_win_insertLink",this.poeWin).siblings().hide();
			this.showWin(e);
		}else{
			$(".poe_win_insertLink",this.poeWin).show();
			$(".poe_win_insertLink",this.poeWin).siblings().hide();
			this.showWin(e);
			return;
		}
		$("input",html).unbind("focus").bind("focus",function (e){
			//rng = self.getFirstRange();
			$('.link_span').css({'background':'#b0b0b0','color':'#fff'});
		});
		$("#oklink",html).mousedown(function (e){
			$('.link_span').each(function(i, n){
				rng.sel.selectAllChildren(n);
				try{
					var slinkvalue = $("input",html).val();
					// self.doc.execCommand("createLink", false, slinkvalue);
					// 解决chrome下添加链接兼容问题
					$(n).after("<a href='"+slinkvalue+"' target='_blank'>" + $(n).html() + "</a>");
					$(n).remove();
				}catch(e){}
			});
			self.hideWin(e);
			Event.fireEvent("hideWindow");
		});
		$("#cancellink",html).mousedown(function(e){
			var rng = self.getFirstRange();
			$('.link_span').each(function(i, n){
				rng.sel.selectAllChildren(n);
				if($(n).parent().get(0).nodeName == 'A'){
					//rng.sel.selectAllChildren(n.parentNode);
					try{
						self.doc.execCommand("unlink", false, true);
					}catch(e){}
				}
			});
			self.hideWin(e);
			Event.fireEvent("hideWindow");
		});
		return false;
	},
	poe_Traffic: function (e,item){
		var img = $("<img src='"+this.imageUri+item.toLowerCase()+".gif'/>");
		var rng = this.getFirstRange();
		//在文本中插入交通图片时，文本中无子节点。
		var day_title_new, parentElement;
		if (rng.rang.startContainer.parentElement){
			parentElement = rng.rang.startContainer.parentElement;
		}else{
			parentElement = rng.rang.startContainer.parentNode;
		}
		if ($(rng.rang.startContainer).children().size() == 0){
			day_title_new = parentElement.parentNode.parentNode;
		}else{
			day_title_new = parentElement.parentNode;
		}
		//如果假如图片时父节点不是包含在day_title_new中则退出操作
		if (day_title_new.className != "day_title_new"){
			return;
		}
		if (rng.rang){
			rng.rang.deleteContents();
			rng.rang.insertNode(img[0]);
			if (rng.rang.endContainer.nodeName == "DIV"){
				rng.rang.endContainer.focus();
				rng.sel.collapse(rng.rang.endContainer,rng.rang.endOffset+1);
			}else{
				parentElement.focus();
				rng.sel.collapseToEnd();
			}
		}
	},
	poe_Preview: function (){
		var win = window.open("about:blank");
		win.document.write("<html><head><link rel='stylesheet' href='"+this.cssPath+this.template+".css' type='text/css'/></head><body>"+this.getPOHtml()+"</body></html>");
	}
}

$m.base = {
	menu:{
		"Star":{
		name: "★",
		iconCls: "",
		action: "poe_Star"
		},
		"poe_Picture": {
			name: "添加图片",
			iconCls: "",
			action: "",
			mouseover: "poe_over_Picture"
		}
	},
	action:{
		poe_Star:function(){
			var spn = $("<span>★</span>");
			var rng = this.getFirstRange();
			var base_Section, parentElement;
			base_Section = rng.rang.startContainer;
			//if (rng.rang.startContainer.parentElement){
			//	base_Section = rng.rang.startContainer.parentElement;
			//}else{
			//	base_Section = rng.rang.startContainer.parentNode;
			//}
			if (($(base_Section).hasClass('baseSection')) || (($(base_Section).parentsUntil('.baseSection').length > 0)&& ($(base_Section).parentsUntil('.baseSection').last().get(0).nodeName != "HTML")) || ($(base_Section).parent().hasClass('baseSection'))){
				if (rng.rang){
					rng.rang.deleteContents();
					rng.rang.insertNode(spn[0]);
					// base_Section.focus();
					rng.sel.collapse(rng.rang.endContainer,rng.rang.endOffset+1);
				}
			}

		},
		poe_over_Picture: function (e){
			var self = this;
			var spanBtn = "position: relative;border:1px solid #999;padding:2px 3px;margin:3px;float:left;display:block;cursor: pointer;line-height:18px;";
			var html = $("<div class='poe_win_selectImages'><div style='font-size:13px;'><span title='按Ctrl可进行多选' style='"+spanBtn+"'><span style='cursor: pointer;line-height:18px;display:block;'>选择本地图片</span><input multiple='' type='file' style='opacity:0;position: absolute;left:0;top:0;cursor: pointer;'/></span><span id='uploadPics' style='"+spanBtn+"'>上传</span><!--<span class='selPicSource' style='"+spanBtn+"'>选择资源库图片</span>--><span class='clearView' style='"+spanBtn+"'>清空预览区</span><span style='padding:3px 3px;margin:4px 3px;float:left;display:block;color:red;'>注意：图片宽度不小于1024像素，高度不小于768像素</span></div><div style='clear:both;'></div><div style='margin:3px;font-size:13px;display:none;' class='picSource'>图片ID：<input style='border:1px solid #ccc;' type='text'/><button>图片读取</button></div><div class='poe_win_imgList' style='font-size:13px;'><fieldset style='width:auto;'><legend>图片预览</legend><div style='width:510px;height:200px;overflow-y:auto;'></div></fieldset><span class='error' style='color:red;'></span></div></div>");

			if ($(".poe_win_selectImages",this.poeWin).length == 0){
				this.poeWin.append(html);
				$(".poe_win_selectImages",this.poeWin).siblings().hide();
				this.showWin(e);
			}else{
				$(".poe_win_selectImages",this.poeWin).show();
				$(".poe_win_selectImages",this.poeWin).siblings().hide();
				this.showWin(e);
				return;
			}
			checkUploadBtn();
			function insertImg(e){
				if($(e.target).attr("src").substring(0,5) == 'data:'){
					self.msgShow('请先上传该图片，然后方可插入',false);
					return;
				}
				var rng = this.getFirstRange();
				var img = $(e.target).clone();
				var base_Section = rng.rang.startContainer;
				var aLink = img.attr('src');
				var temp = aLink.split(/\/(?!\/)/);
				var imgName = temp[temp.length-1].split('.')[0].replace('_w320_h240_c1','_w755_h0_c0') + '.' + temp[temp.length-1].split('.')[1];
				temp[temp.length-1] = imgName;
				img.attr('src',temp.join('/')).removeAttr('style');
				if (($(base_Section).hasClass('baseSection')) || (($(base_Section).parentsUntil('.baseSection').length > 0)&& ($(base_Section).parentsUntil('.baseSection').last().get(0).nodeName != "HTML")) || ($(base_Section).parents('').hasClass('baseSection'))){
					if (rng.rang){
						rng.rang.deleteContents();
						rng.rang.insertNode(img[0]);
						rng.sel.collapse(rng.rang.endContainer,rng.rang.endOffset+1);
					}
				}
			}
			$(".clearView",html).click(function (){
				$(".poe_win_imgList fieldset div",html).empty();
				$(".poe_win_imgList .error",html).html("");
				$("input",html).eq(0).val("");
				checkUploadBtn();
			});
			$(".selPicSource",html).click(function (){
				$(".picSource",html).toggle();
				checkUploadBtn();
			});
			function collectImgBase64(array){
				$('.poe_win_imgList img',html).each(function(i,n){
					if($(n).attr('src').substring(0,5) == 'data:'){
						array.push(encodeURIComponent($(n).attr('src')));
						$(n).addClass('base64');
					}
				});
				return array;
			}

			$("#uploadPics",html).unbind('click').bind('click',uploadAction);
			function uploadAction(){
				self.msgShow("正在上传图片，请稍后...",true);
				addGreylay(true);
				var imgbase64 = [];
				collectImgBase64(imgbase64);
				var datas = {
					'photo_info':imgbase64,
					'minPicwidth': self.minPicwidth,
					'minPicheight':self.minPicheight
				}
				var imgData = Base64.encode(JSON.encode(datas));
				$.ajax({
					type: "POST",
					dataType: "text",
					url: self.imageUrl,
					data: imgData,
					success: function(data){
						// var dataObj = JSON.decode(Base64.decode(data));
						var dataObj = JSON.decode(Base64.decode(data));
						if(dataObj.success){
							if(dataObj.data.imagesList.length > 0){
								$('.poe_win_imgList img.base64',html).each(function(i){
									// 正式环境地址解析方式：
									var temp = dataObj.data.imagesList[i].split(/\/(?!\/)/);
									temp[1] = self.imageDisplayUrl.split('//')[1];
									var imgName = temp[temp.length-1].split('.')[0] + "_w320_h240_c1_t0." + temp[temp.length-1].split('.')[1];
									temp[temp.length-1] = imgName;
									// 测试环境地址解析方式：
									// var temp = dataObj.data.imagesList[i].replace(/\/filebroker\//, '/').split(/\/(?!\/)/);
									// var imgName = temp[temp.length-1].split('.')[0] + "_w320_h240_c1_t0." + temp[temp.length-1].split('.')[1];
									// temp[temp.length-1] = imgName;

									$(this).attr('src', temp.join('/'));
									$(this).removeClass('base64');
									// var imgHref = temp[temp.length-1].split('.')[0] + "_w0_h600_c0_t0." + temp[temp.length-1].split('.')[1];
									// temp[temp.length-1] = imgHref;
									// $(this).wrap("<a href='"+temp.join('/')+"' />");
								})
								self.msgShow("图片上传成功",false);
							}else{
								self.msgShow("图片上传失败，请重新上传",false);
							}
							addGreylay(false);
							checkUploadBtn();
						}else{
							addGreylay(false);
							checkUploadBtn();
							self.msgShow(dataObj.msg,false);
						}
					}

				});
			}
			function addGreylay(flag){
				if(flag == true){
					$('.poe_win_imgList', html).after("<div id='greylay' style='position:absolute;top:56px;left:16px;background:black;opacity:0.3;z-index:9999;width:510px;height:200px;'></div>");
				}else if(flag == false){
					$('#greylay').remove();
				}
			}
			function checkUploadBtn(){
				var imgbase64 = [];
				collectImgBase64(imgbase64);
				var flag_a = !!imgbase64.length;
				var flag_b = !!$('.poe_win_imgList',html).has('img').length;
				if(flag_a){
					$('#uploadPics',html).css({'color':'black','cursor':'pointer'});
					$("#uploadPics",html).unbind('click').bind('click',uploadAction);
				}else{
					$('#uploadPics',html).css({'color':'grey','cursor':'default'});
					$("#uploadPics",html).unbind('click').unbind('click');
				}
			}
			function checkUploadBtnForFileinput(){
				var flag_b = !!$('.poe_win_imgList',html).has('img').length;
				if(flag_b){
					$('#uploadPics',html).css({'color':'black','cursor':'pointer'});
					$("#uploadPics",html).unbind('click').bind('click',uploadAction);
				}else{
					$('#uploadPics',html).css({'color':'grey','cursor':'default'});
					$("#uploadPics",html).unbind('click').unbind('click');
				}
			}
			
			$("input",html).change(function (e){
				self.onUploadImgChange(e,$(".poe_win_imgList",html),function (e){
					insertImg.call(self,e);
				});
				checkUploadBtnForFileinput();
			});
		},
	}
}

//牛人模板Journey行程，FParagraph一级段落，STitle二级标题，SParagraph二级段落，Picture图片添加，Preview预览
$m.niuren = {
	menu:{
		"poe_Journey":{
			name: "添加行程",
			iconCls: "",
			action: "poe_niuren_Journey"
		},
		"poe_Description":{
			name: "行程描述",
			iconCls: "",
			action: "poe_niuren_Description"
		},
		"poe_FParagraph":{
			name: "时间段",
			iconCls: "",
			action: "poe_niuren_FParagraph"
		},
		"poe_STitle":{
			name: "小标题",
			iconCls: "",
			action: "poe_niuren_STitle"
		},
		"poe_SParagraph": {
			name: "小标题正文",
			iconCls: "",
			action: "poe_niuren_SParagraph"
		},
		"poe_Picture": {
			name: "添加图片",
			iconCls: "",
			action: "",
			mouseover: "poe_niuren_over_Picture"
		},
		"poe_Dining": {
			name: "用餐",
			iconCls: "",
			action: "poe_niuren_Dining"
		},
		"poe_Accommodation": {
			name: "住宿",
			iconCls: "",
			action: "poe_niuren_Accommodation"
		},
		"poe_ShoppingStores": {
			name: "购物店",
			iconCls: "",
			action: "",
			mouseover:"poe_niuren_ShoppingStores"
		}
	},
	action: {
		poe_niuren_Journey: function (title, em, flag){
			var self = this;
			this.day = $('.tourContent_new').length + 1;
			var journey = this.tlp["tlp"+this.template].poe_Journey().replace(/{day}/g,this.day);
			journey = $(journey);
			this.tourSection.append(journey);
			if (arguments.length == 3 && title && em && flag){
				$(".day_title_new h3 em",journey).html(em);
				$(".day_title_new h3 div",journey).html(title);
			}
			$(".day_title_new:last div",this.tourSection).bind("focus",function (){
				self.setActiveElement();
			})
			$(".day_title_new:last div",this.tourSection).focus();
			var rng = this.getFirstRange();
			rng.sel.selectAllChildren($(".day_title_new:last div",this.tourSection)[0]);
			this.setActiveElement();
			$(".day_title_new h3 em",this.tourSection).each(function (i,n){
				self[self.template+"DelContent"].poe_niuren_del_Journey.call(self,i,n,$(n).parent().parent().parent());
			});
		},
		poe_niuren_Description: function (cnt){
			var self = this;
			var rng = this.getFirstRange();
			var activeElm = this.getActiveElement();
			var day_title_new = $(activeElm).parent().parent();
			var description = $(this.tlp["tlp"+this.template].poe_Description());
			if (arguments.length == 1 && cnt){
				description.html(cnt);
			}
			if (day_title_new.length == 0)return;
			if (day_title_new.length>0 && (day_title_new[0].className != "day_title_new" && day_title_new[0].className != "tourContent_new" && day_title_new[0].className != "time_box_inner clearfix" && day_title_new[0].className != "tour_con")){
				return;
			}
			if (day_title_new[0].className == "day_title_new"){
				day_title_new.append(description);
			}else{
				if (day_title_new[0].className == "time_box_inner clearfix"){
					day_title_new.parent().children().first().children().last().after(description);
				}else{
					$(activeElm).after(description);
				}
			}
			$("div.tour_line",$(day_title_new)).unbind("focus").bind("focus",function (){
				self.setActiveElement();
			})
			description.focus();
			try{
				rng.sel.selectAllChildren(description[0]);
				self.setActiveElement();
			}catch(e){}
			$("div.tour_line",$(this.tourSection)).each(function (i,n){
				self[self.template+"DelContent"].poe_niuren_del_Description.call(self,i,n,n);
			});
		},
		poe_niuren_FParagraph: function (cnt){
			var self = this;
			var rng = this.getFirstRange();
			var activeElm = this.getActiveElement();
			var time_do_new = $(activeElm).parent();
			var insertNodeParent = $(activeElm).parent().parent();
			var tourContent_new = $(activeElm).parent().parent().parent();
			var time_num = $(this.tlp["tlp"+this.template].poe_FParagraph());
			if (arguments.length == 1 && cnt){
				var cnthtml = cnt.split("%^&");
				var tourconhtml = cnthtml[0];
				var tourdeschtml = cnthtml[1];
				$(".tour_con",time_num).html(tourconhtml);
				$(".tour_description",time_num).html(tourdeschtml);



			}
			if ((insertNodeParent.length>0 && insertNodeParent[0].className != "day_title_new") && (time_do_new.length>0 && time_do_new[0].className != "time_num" && time_do_new[0].className != "time_do_new" && activeElm.className != "tour_line")){
				return;
			}
			if (activeElm && activeElm.className == "tour_line"){
				insertNodeParent = $(activeElm).parent();
			}
			if (insertNodeParent.length>0 && insertNodeParent[0].className == "day_title_new"){
				if (insertNodeParent.nextAll().last().length>0){
					insertNodeParent.nextAll().last().after(time_num);
				}else{
					insertNodeParent.after(time_num);
				}
			}else{
				$(insertNodeParent).after(time_num);
			}
			$("div.tour_con",time_num).unbind("focus").bind("focus",function (){
				self.setActiveElement();
			})
			$("div.tour_con",time_num).focus();
			$("div.tour_description",time_num).unbind("focus").bind("focus",function (){
				self.setActiveElement();
			})
			try{
				rng.sel.selectAllChildren($("div.tour_con",time_num)[0]);
				self.setActiveElement();
			}catch(e){}
			$("div.tour_con",$(time_num,this.tourSection)).each(function (i,n){
				self[self.template+"DelContent"].poe_niuren_del_FParagraph.call(self,i,n,$(n).parent().parent());
			});
		},
		poe_niuren_STitle: function (cnt){
			var self = this;
			var rng = this.getFirstRange();
			var activeElm = this.getActiveElement();
			var time_do_new = $(activeElm).parent();
			var time_box_inner = $(activeElm).parent().parent();
			var h4 = $(this.tlp["tlp"+this.template].poe_STitle());
			if (arguments.length == 1 && cnt){
				h4.html(cnt);
			}else{
				if (time_do_new.length==0)return;
				if (time_do_new.length>0 && time_do_new[0].className != "time_num" && time_do_new[0].className != "time_do_new" && time_do_new[0].nodeName != "LI"){
					return;
				}
			}
			if (time_do_new[0].className == "time_num"){
				time_do_new.next().append(h4);
			}else if (time_do_new[0].nodeName == "LI"){
				time_do_new.parent().after(h4);
			}else{
				$(activeElm).after(h4);
			}

			$("div.tour_con_h4",$(time_box_inner)).unbind("focus").bind("focus",function (){
				self.setActiveElement();
			})
			$(h4).focus();
			try{
				rng.sel.selectAllChildren(h4[0]);
				self.setActiveElement();
			}catch(e){}
			$("div.tour_con_h4",$(h4).parent()).each(function (i,n){
				self[self.template+"DelContent"].poe_niuren_del_STitle.call(self,i,n,n);
			});
		},
		poe_niuren_SParagraph: function (cnt){
			var self = this;
			var rng = this.getFirstRange();
			var activeElm = this.getActiveElement();
			var time_do_new = $(activeElm).parent();
			var time_box_inner = $(activeElm).parent().parent();
			var p = $(this.tlp["tlp"+this.template].poe_SParagraph());
			if (arguments.length == 1 && cnt){
				p.html(cnt);
			}else{
				if (time_do_new.length == 0)return;
				if (time_do_new.length>0 && time_do_new[0].className != "time_num" && time_do_new[0].className != "time_do_new" && time_do_new[0].nodeName != "LI"){
					return;
				}
			}
			if (time_do_new[0].className == "time_num"){
				time_do_new.next().append(p);
			}else if (time_do_new[0].nodeName == "LI"){
				time_do_new.parent().after(p);
			}else{
				$(activeElm).after(p);
			}
			$("div.tour_con",$(time_box_inner)).unbind("focus").bind("focus",function (){
				self.setActiveElement();
			});
			p.focus();
			try{
				rng.sel.selectAllChildren(p[0]);
				self.setActiveElement();
			}catch(e){}
			$("div.tour_con",$(p).parent()).each(function (i,n){
				self[self.template+"DelContent"].poe_niuren_del_SParagraph.call(self,i,n,n);
			});
		},
		poe_niuren_over_Picture: function (e){
			var self = this;
			var spanBtn = "position: relative;border:1px solid #999;padding:2px 3px;margin:3px;float:left;display:block;cursor: pointer;line-height:18px;";
			var html = $("<div class='poe_win_selectImages'><div style='font-size:13px;'><span title='按Ctrl可进行多选' style='"+spanBtn+"'><span style='cursor: pointer;line-height:18px;display:block;'>选择本地图片</span><input multiple='' type='file' style='opacity:0;position: absolute;left:0;top:0;cursor: pointer;'/></span><span id='uploadPics' style='"+spanBtn+"'>上传</span><!--<span class='selPicSource' style='"+spanBtn+"'>选择资源库图片</span>--><span class='clearView' style='"+spanBtn+"'>清空预览区</span><span style='padding:3px 3px;margin:4px 3px;float:left;display:block;color:red;'>注意：图片宽度不小于1024像素，高度不小于768像素</span></div><div style='clear:both;'></div><div style='margin:3px;font-size:13px;display:none;' class='picSource'>图片ID：<input style='border:1px solid #ccc;' type='text'/><button>图片读取</button></div><div class='poe_win_imgList' style='font-size:13px;'><fieldset style='width:auto;'><legend>图片预览</legend><div style='width:510px;height:200px;overflow-y:auto;'></div></fieldset><span class='error' style='color:red;'></span></div></div>");

			if ($(".poe_win_selectImages",this.poeWin).length == 0){
				this.poeWin.append(html);
				$(".poe_win_selectImages",this.poeWin).siblings().hide();
				this.showWin(e);
			}else{
				$(".poe_win_selectImages",this.poeWin).show();
				$(".poe_win_selectImages",this.poeWin).siblings().hide();
				this.showWin(e);
				return;
			}
			checkUploadBtn();
			function insertImg(e){
				if($(e.target).attr("src").substring(0,5) == 'data:'){
					self.msgShow('请先上传该图片，然后方可插入',false);
					return;
				}
				var rng = this.getFirstRange();
				var activeElm = this.getActiveElement();
				var ul = $(this.tlp["tlp"+this.template].poe_ImgList());
				var li = $(this.tlp["tlp"+this.template].poe_ImgListItem());
				var img = $(e.target).clone();
				var imgTitle = $("div",li);
				$("a",li).append(img.removeAttr("style"));
				var aLink = $('a img',li).attr('src');
				var temp = aLink.split(/\/(?!\/)/);
				var imgName = temp[temp.length-1].split('.')[0].replace('_w320_h240_c1','_w0_h600_c0') + '.' + temp[temp.length-1].split('.')[1];
				temp[temp.length-1] = imgName;
				$("a",li).attr('href',temp.join('/')).attr('rel','nofollow').addClass('niuren_light');
				if ($(activeElm).parent().length == 0)return;
				if ($(activeElm).parent()[0].className != "time_do_new" && $(activeElm).parent()[0].nodeName != "LI")return;
				if ($(activeElm).next().length == 0 || ($(activeElm).next().length>0&&$(activeElm).next()[0].nodeName != "UL")){
					if ($(activeElm).parent()[0].nodeName !="LI"){
						$(activeElm).after(ul);
						ul.append(li);
					}else{
						$(activeElm).parent().after(li);
					}
				}else{
					$(activeElm).next().append(li);
				}
				$("li div",$(activeElm).parent()).unbind("focus").bind("focus",function (){
					self.setActiveElement();
				});
				imgTitle.focus();
				rng.sel.selectAllChildren(imgTitle[0]);
				self.setActiveElement();
				this[this.template+"DelContent"].poe_niuren_del_over_Picture.call(this,0,img,li);
				$('.niuren_light').click(function(e){e.preventDefault();});
			}
			$(".clearView",html).click(function (){
				$(".poe_win_imgList fieldset div",html).empty();
				$(".poe_win_imgList .error",html).html("");
				$("input",html).eq(0).val("");
				checkUploadBtn();
			});
			$(".selPicSource",html).click(function (){
				$(".picSource",html).toggle();
				checkUploadBtn();
			});
			function collectImgBase64(array){
				$('.poe_win_imgList img',html).each(function(i,n){
					if($(n).attr('src').substring(0,5) == 'data:'){
						array.push(encodeURIComponent($(n).attr('src')));
						$(n).addClass('base64');
					}
				});
				return array;
			}

			$("#uploadPics",html).unbind('click').bind('click',uploadAction);
			function uploadAction(){
				self.msgShow("正在上传图片，请稍后...",true);
				addGreylay(true);
				var imgbase64 = [];
				collectImgBase64(imgbase64);
				var datas = {
					'photo_info':imgbase64,
					'minPicwidth': self.minPicwidth,
					'minPicheight':self.minPicheight
				}
				var imgData = Base64.encode(JSON.encode(datas));
				$.ajax({
					type: "POST",
					dataType: "text",
					url: self.imageUrl,
					data: imgData,
					success: function(data){
						var dataObj = JSON.decode(Base64.decode(data));
						if(dataObj.success){
							if(dataObj.data.imagesList.length > 0){
								$('.poe_win_imgList img.base64',html).each(function(i){
									var temp = dataObj.data.imagesList[i].split(/\/(?!\/)/);
									temp[1] = self.imageDisplayUrl.split('//')[1];
									var imgName = temp[temp.length-1].split('.')[0] + "_w320_h240_c1_t0." + temp[temp.length-1].split('.')[1];
									temp[temp.length-1] = imgName;
									$(this).attr('src', temp.join('/'));
									$(this).removeClass('base64');
									// var imgHref = temp[temp.length-1].split('.')[0] + "_w0_h600_c0_t0." + temp[temp.length-1].split('.')[1];
									// temp[temp.length-1] = imgHref;
									// $(this).wrap("<a href='"+temp.join('/')+"' />");
								})
								self.msgShow("图片上传成功",false);
							}else{
								self.msgShow("图片上传失败，请重新上传",false);
							}
							addGreylay(false);
							checkUploadBtn();
						}else{
							addGreylay(false);
							checkUploadBtn();
							self.msgShow(dataObj.msg,false);
						}
					}

				});
			}
			function addGreylay(flag){
				if(flag == true){
					$('.poe_win_imgList', html).after("<div id='greylay' style='position:absolute;top:56px;left:16px;background:black;opacity:0.3;z-index:9999;width:510px;height:200px;'></div>");
				}else if(flag == false){
					$('#greylay').remove();
				}
			}
			function checkUploadBtn(){
				var imgbase64 = [];
				collectImgBase64(imgbase64);
				var flag_a = !!imgbase64.length;
				var flag_b = !!$('.poe_win_imgList',html).has('img').length;
				if(flag_a){
					$('#uploadPics',html).css({'color':'black','cursor':'pointer'});
					$("#uploadPics",html).unbind('click').bind('click',uploadAction);
				}else{
					$('#uploadPics',html).css({'color':'grey','cursor':'default'});
					$("#uploadPics",html).unbind('click').unbind('click');
				}
			}
			function checkUploadBtnForFileinput(){
				var flag_b = !!$('.poe_win_imgList',html).has('img').length;
				if(flag_b){
					$('#uploadPics',html).css({'color':'black','cursor':'pointer'});
					$("#uploadPics",html).unbind('click').bind('click',uploadAction);
				}else{
					$('#uploadPics',html).css({'color':'grey','cursor':'default'});
					$("#uploadPics",html).unbind('click').unbind('click');
				}
			}
			$("button",html).click(function (){
				self.msgShow("正在读取图片资源请稍后...",true);
				$.ajax({
					type: "POST",
					dataType: "json",
					url: "../editor/data.js",
					data:{},
					// url: "/main.php?r="+Math.random(),
					// data: {
					// 	"photo_id": $("input[type='text']",html).val(),
					// 	"do": "route_ajax_new",
					// 	"method": "getPhotoPathById",
					// 	"size": "n",
					// 	"jsonFlag": true
					// },
					success: function(data){
						if (data.imgUrl.length != 0){
							var flag = false;
							$('.poe_win_imgList img').each(function(i,n){
								if($(n).attr('src') == data.imgUrl){
									self.msgShow("该ID的图片已经存在，您可以添加其他ID的图片",false);
									flag = true;
									return false;
								}
							});
							if(!flag){
								var img = $("<img style='margin:-1000000px 10px 10px 0;cursor:pointer;' src='"+data.imgUrl+"'/>").load(function (e){
									self.autoSizePreview(this,this.offsetWidth,this.offsetHeight);
									$(this).css({marginTop:0});
								});
								img.unbind("click").click(function (e){
									insertImg.call(self,e)
								});
								$("fieldset div",html).append(img);
								self.msgHide();
							}

						}else{
							self.msgShow("图片读取错误，请重新输入图片ID后重试",false);
						}
					}
				});
				return false;
			})
			$("input",html).change(function (e){
				self.onUploadImgChange(e,$(".poe_win_imgList",html),function (e){
					insertImg.call(self,e);
				});
				checkUploadBtnForFileinput();
			});
		},
		poe_niuren_Dining: function (cnt,template){
			var template = template && template != "poe_Dining" ? template : this.template;
			var self = this;
			var rng = this.getFirstRange();
			var activeElm = this.getActiveElement();
			var day_title_new = $(activeElm).parent().parent();
			var insertNode;
			if (day_title_new.length == 0)return;
			if (day_title_new.length>0 && (day_title_new[0].className != "day_title_new" && day_title_new[0].className != "tourContent_new" && day_title_new[0].className != "time_box_inner clearfix" && day_title_new[0].className != "tour_con")){
				return;
			}
			var tourfood = $(this.tlp["tlp"+template].poe_Tourfood());
			var dining = $(this.tlp["tlp"+template].poe_Dining());
			if (arguments.length == 1 && cnt){
				dining.html(cnt);
			}
			if (arguments.length == 2 && typeof cnt == "string" && template == "niuren"){
				dining.html(cnt);
			}
			if (day_title_new[0].className == "tourContent_new"){
				insertNode = day_title_new;
			}else{
				insertNode = day_title_new.parent();
			}
			if($('.tour_shop', insertNode).length > 0 && $(".tour_food",insertNode).size() == 0){
				tourfood.append(dining);
				$('.tour_shop', insertNode).before(tourfood);
			}else{
				if ($(".tour_food",insertNode).size() == 0){
					tourfood.append(dining);
					insertNode.append(tourfood);
				}else{
					$(".tour_food",insertNode).append(dining);
				}
			}
			$("div",dining).attr('contenteditable','true');
			$("div",dining).focus();
			try{
				//rng.sel.collapse($("div",dining)[0].childNodes[0],3);
				rng.sel.selectAllChildren($('.po_dining_diy', dining)[0]);
			}catch(e){}
			$("div.tour_item em",$(insertNode)).each(function (i,n){
				self[template+"DelContent"].poe_niuren_del_Dining.call(self,i,n,$(n).parent());
			});
		},
		poe_niuren_Accommodation: function (cnt,template){
			var template = template && template != "poe_Accommodation" ? template : this.template;
			var self = this;
			var rng = this.getFirstRange();
			var activeElm = this.getActiveElement();
			var day_title_new = $(activeElm).parent().parent();
			var insertNode;
			if (day_title_new.length == 0)return;
			if (day_title_new.length>0 && (day_title_new[0].className != "day_title_new" && day_title_new[0].className != "tourContent_new" && day_title_new[0].className != "time_box_inner clearfix" && day_title_new[0].className != "tour_con")){
				return;
			}
			var tourfood = $(this.tlp["tlp"+template].poe_Tourfood());
			var accommodation = $(this.tlp["tlp"+template].poe_Accommodation());
			if (day_title_new[0].className == "tourContent_new"){
				insertNode = day_title_new;
			}else{
				insertNode = day_title_new.parent();
			}
			if ($(".tour_food",insertNode).size() == 0){
				tourfood.append(accommodation);
				insertNode.append(tourfood);
			}else{
				$(".tour_food",insertNode).append(accommodation);
			}
			$("div",accommodation).focus();
			try{
				rng.sel.selectAllChildren($("div",accommodation)[0]);
			}catch(e){}
			$("div.tour_item em",$(insertNode)).each(function (i,n){
				self[template+"DelContent"].poe_niuren_del_Accommodation.call(self,i,n,$(n).parent());
			});
		},
		poe_niuren_ShoppingStores: function (e, template){
			var template = template && template != "poe_ShoppingStores" ? template : this.template;
			var self = this;
			var spanBtn = "position: relative;border:1px solid #999;padding:2px 3px;margin:3px;float:left;display:block;cursor: pointer;line-height:18px;";
			var html = $("<div id='poe_win_addShoppingStores'><div><input type='text' id='sp_searchbox' name='sp_searchbox' /><input type='hidden' id='shoppingStoreId_box' name='sp_shoppingStoreId' /><button type='button' id='addTotable' disabled='disabled'>确定</button><a href='javascript:void(0);' id='searchAllShoppingStores' style='font-size:12px;margin-left:20px;'>搜索</a></div><div id='sp_searchHint' style='position:absolute; top:28px;left:5px;width:250px;background:#fff;border:1px solid grey;display:none;font-size:12px;'><ul style='margin:0;padding:0;list-style:none;'><li style='padding:2px;'>abcde</li><li style='padding:2px;'>bcdef</li><li style='padding:2px;'>cdefg</li></ul></div><div><table id='shopppingStoreTable_" + self.shopping_store_id + "' border='1' bordercolor='#ddd' cellspacing='0' cellpadding='4' style='border-collapse:collapse;font-size:12px;'><tr><th style='width:90px;background-color: #F6F6F6;padding: 2px;text-align: center;'>名称</th><th style='width:150px;background-color: #F6F6F6;padding: 2px;text-align: center;'>营业产品</th><th style='width:60px;background-color: #F6F6F6;padding: 2px;text-align: center;'>停留时间</th><th style='width:300px;background-color: #F6F6F6;padding: 2px;text-align: center;'>说明</th><th style='width:32px;background-color: #F6F6F6;padding: 2px;text-align: center;'>操作</th></tr></table></div><div style='text-align:left;padding-top:5px;'><button type='button' id='insertShoppingStore'>添加</button></div></div>");
			if ($("#poe_win_addShoppingStores").length == 0){
				this.poeWin.append(html);
				$("#poe_win_addShoppingStores").siblings().hide();
				this.showWin(e);
			}else{
				$("#poe_win_addShoppingStores").show();
				$("#poe_win_addShoppingStores").siblings().hide();
				this.showWin(e);
				return;
			}

			$('#sp_searchbox').keyup(showHint);
			var shoppingStoreData;
			function showHint(){
				if(!!$('#sp_searchbox').val()){
					$('#sp_searchHint').show();
					$.ajax({
						type: "POST",
						dataType: "json",
						url: "../editor/searchHint.js?r=" + Math.random(),
						data: $('#sp_searchbox').val(),
						// url: "main.php?r=" + Math.random(),
						// data: {
						// 		"do": "route_ajax_new",
						// 		"method": "getShopInfoByKeywordAndCity",
						// 		"keyword": $('#sp_searchbox').val()
						// },
						success:function(data){
							shoppingStoreData = data;
							$('#sp_searchHint ul').empty();
							for(var i in data){
									if(data[i].name != null){
									$('#sp_searchHint ul').append("<li style='padding:2px;'><span id='shoppingStoreName'>" + data[i].name+ "</span><span style='visibility:hidden;' id='shoppingStoreID'>" + data[i].id + "</span></li>");
									}
							}
							$('#sp_searchHint ul li').hover(
								function(){
									$(this).css({'background':'#ddd', 'cursor':'pointer'});
								},
								function(){
									$(this).css({'background':'#fff', 'cursor':'default'});
							});
							$('#sp_searchHint ul li').click(function(){
								var searchbox_text = $(this).children('#shoppingStoreName').text();
								var shoppingStoreId = $(this).children('#shoppingStoreID').text();
								$('#sp_searchbox').val(searchbox_text);
								$('#shoppingStoreId_box').val(shoppingStoreId);
								$('#addTotable').removeAttr('disabled');
								$('#sp_searchHint').hide();
							});
						}
					});
				}else{
					$('#sp_searchHint').hide();
				}
			}

			$('#searchAllShoppingStores').click(function(){
				searchAndReturnShoppingStore(addToTable);
			});

			$('#addTotable').click(function(){
				addToTable();
				$('#sp_searchbox').val('');
				$('#addTotable').attr('disabled','disabled');
			});
			function addToTable(str){
				if(!!str){
					var json_str = eval(str);
					$('#shopppingStoreTable_' + self.shopping_store_id).append("<tr><td>" + json_str[0].name + "</td><td>" + json_str[0].products + "</td><td>" + json_str[0].times + "</td><td>" + json_str[0].details + "</td><td><a href='javascript:void(0)'>删除</a></td></tr>");
					$('#shopppingStoreTable_' + self.shopping_store_id + ' a').click(function(e){
						$(e.target).parent().parent().remove();
					});
				}else if(str == undefined){
					var index;
					for(var i in shoppingStoreData){
						if(shoppingStoreData[i].id == $('#shoppingStoreId_box').val()){
							index = i;
							break;
						}else{index = -1;}
					}
					$('#shopppingStoreTable_' + self.shopping_store_id).append("<tr><td>" + shoppingStoreData[i].name + "</td><td>" + shoppingStoreData[i].products + "</td><td>" + shoppingStoreData[i].times + "</td><td>" + shoppingStoreData[i].details + "</td><td><a href='javascript:void(0)'>删除</a></td></tr>");
					$('#shopppingStoreTable_' + self.shopping_store_id + ' a').click(function(e){
						$(e.target).parent().parent().remove();
					});
				}
			}

			$('#insertShoppingStore').click(function(){
				self["niuren"].action["poe_niuren_insertShoppingStores"].call(self, null, e);
			});
		},
		poe_niuren_insertShoppingStores: function (cnt, e){
			var self = this;
			var activeElm = self.getActiveElement();
			var day_title_new = $(activeElm).parent().parent();
			var tourshop = $(self.tlp["tlp"+self.template].poe_ShoppingStore());
			var insertNode;
			if (day_title_new.length == 0)return;
			if (day_title_new.length>0 && (day_title_new[0].className != "day_title_new" && day_title_new[0].className != "tourContent_new" && day_title_new[0].className != "time_box_inner clearfix" && day_title_new[0].className != "tour_con")){
				return;
			}
			if (day_title_new[0].className == "tourContent_new"){
				insertNode = day_title_new;
			}else{
				insertNode = day_title_new.parent();
			}
			if (arguments.length == 1 && cnt){
				tourshop.html(cnt);
				insertNode.append(tourshop);
			}else{
				var shopping_store = $('#shopppingStoreTable_' + self.shopping_store_id).find('tr:gt(0)').clone();
				shopping_store.find('td:last-child').remove();
				tourshop.find('tbody').append(shopping_store);
				insertNode.append(tourshop);
				$('#poe_win_addShoppingStores').remove();
				self.hideWin(e);
				self.shopping_store_id++;
			}
			$('.tour_shop').unbind("focus").bind("focus",function (){
				self.setActiveElement();
			});
			$('.tour_shop').focus();
			$('.tour_shop').removeAttr('contenteditable');
			$('.tour_shop tr td:even').attr('contenteditable','true');
			$('.tour_shop thead').each(function(i,n){
				self["niurenDelContent"].poe_niuren_ShoppingStores.call(self,i,n,$(n).parent().parent());
			});
			$('.tour_shop tbody tr').each(function(i,n){
				self["niurenDelContent"].poe_niuren_ShoppingStores.call(self,i,n,$(n));
			});
		}
	}
}

$m.unniuren = {
	menu:{
		"poe_Journey":{
			name: "添加行程",
			iconCls: "",
			action: "poe_unniuren_Journey"
		},
		"poe_Description":{
			name: "行程描述",
			iconCls: "",
			action: "poe_unniuren_Description"
		},
		"poe_Picture": {
			name: "行程图片",
			iconCls: "",
			action: "poe_unniuren_Picture",
			mouseover: ""
		},
		"poe_Dining": {
			name: "用餐",
			iconCls: "",
			action: "poe_unniuren_Dining"
		},
		"poe_Accommodation": {
			name: "住宿",
			iconCls: "",
			action: "poe_unniuren_Accommodation"
		},
		"poe_ShoppingStores": {
			name: "购物店",
			iconCls: "",
			action: "",
			mouseover:"poe_unniuren_ShoppingStores"
		}
	},
	action: {
		poe_unniuren_Journey: function (title){
			var self = this;
			this.day++;
			var journey = this.tlp["tlp"+this.template].poe_Journey().replace(/{day}/g,this.day);
			journey = $(journey);
			this.tourSection.append(journey);
			if (arguments.length == 1 && title){
				$(".day_title_new h3 div",journey).html(title);
			}
			$(".day_title_new:last div",this.tourSection).bind("focus",function (){
				self.setActiveElement();
			})
			$(".day_title_new:last div",this.tourSection).focus();
			var rng = this.getFirstRange();
			rng.sel.selectAllChildren($(".day_title_new:last div",this.tourSection)[0]);
			this.setActiveElement();
			$(".day_title_new h3 em",this.tourSection).each(function (i,n){
				self[self.template+"DelContent"].poe_unniuren_del_Journey.call(self,i,n,$(n).parent().parent().parent());
			});
		},
		poe_unniuren_Description: function (cnt){
			var self = this;
			var rng = this.getFirstRange();
			var activeElm = this.getActiveElement();
			var day_title_new = $(activeElm).parent().parent();
			var description = $(this.tlp["tlp"+this.template].poe_Description());
			if (arguments.length == 1 && cnt){
				description.html(cnt);
			}
			if (day_title_new.length == 0)return;
			if (day_title_new.length>0 && (day_title_new[0].className != "day_title_new" && day_title_new[0].className != "tourContent_new" && day_title_new[0].className != "time_box_inner clearfix" && day_title_new[0].className != "tour_con")){
				return;
			}
			if (day_title_new[0].className == "day_title_new"){
				day_title_new.append(description);
			}else{
				if (day_title_new[0].className == "time_box_inner clearfix"){
					day_title_new.parent().children().first().children().last().after(description);
				}else{
					$(activeElm).after(description);
				}
			}
			$("div.tour_line_f",$(day_title_new)).unbind("focus").bind("focus",function (){
				self.setActiveElement();
			})
			description.focus();
			try{
				rng.sel.selectAllChildren(description[0]);
				self.setActiveElement();
			}catch(e){}
			$("div.tour_line_f",$(this.tourSection)).each(function (i,n){
				self[self.template+"DelContent"].poe_unniuren_del_Description.call(self,i,n,n);
			});
		},
		poe_unniuren_Picture: function (cnt,index){
			var self = this;
			if ($(".tourContent_new",self.tourSection).size() == 0)return;
			if (arguments.length == 2 && cnt && typeof index !== "string"){
				createImgList(cnt,index);
			}else if(arguments.length == 2 && cnt == '' && typeof index !== "string"){
				return;
			}else{
				this.msgShow("正在读取图片资源请稍后...",true);
				$.ajax({
					type: "POST",
					dataType: "json",
					url: "../editor/imglist.js?r="+Math.random(),
					data: this.getPOHtmlByDay(),
					//url: "/main.php?r="+Math.random(),
					//data: {
					//	'do':'route_ajax_new',
					//	'method':'matchSchedulePlacePhoto',
					//	'schedule_info':this.getPOHtmlByDay()
					//	},
					success: function(data){
						if (!$.isEmptyObject(data)){
							createImgList(data);
							self["unniuren"].action["poe_unniuren_BindImgHint"].call(self, null);
						}
					}
				});
			}
			function createImgList(data,index){
				if (typeof data === "string"){
					var ul = $(self.tlp.tlpunniuren.poe_SImgList());
					ul.html(data);
					$(".day_title_new h3",$(".tourContent_new",self.tourSection).eq(index)).after(ul);
					$("a",$(".day_title_new",$(".tourContent_new",self.tourSection).eq(index))).each(function (i,j){
						self[self.template+"DelContent"].poe_unniuren_del_Picture.call(self,i,j,$(j).parent());
					});
				}else{
					$(".tourContent_new",self.tourSection).each(function (i,n){
						if ($(".day_title_new ul.time_s_photo",n).size() !=0){
							$(".day_title_new ul.time_s_photo",n).remove();
						}
						if ($(".day_title_new ul.time_s_photo",n).size() == 0){
							var ul = $(self.tlp.tlpunniuren.poe_SImgList());
							if (data[i+1].length>0){
								$.each(data[i+1],function(i,m){
									var li = $(self.tlp.tlpunniuren.poe_SImgListItem());
									var img = $("<img id='"+m.id+"' src='"+m.imgUrl+"' alt='" + m.address + "' onmouseout='hidePreview(event);' onmouseover='showPreview(event, " + m.id + ", 0);' />");
									$("a",li).append(img);
									var imglink = $('<a class="cgrey" target="_blank" href="' + self.imageHref + m.id + '">' + m.name + '</a>');
									$("div",li).append(imglink);
									ul.append(li);
								});
							}
							$(".day_title_new h3",n).after(ul);
							self.msgHide();
							$("a",$(".day_title_new",n)).each(function (i,j){
								self[self.template+"DelContent"].poe_unniuren_del_Picture.call(self,i,j,$(j).parent());
							});
						}
					})
				}
			}
			return false;
		},
		poe_unniuren_Dining: function (cnt, template){
			//this.niuren.action.poe_niuren_Dining.call(this,cnt,"niuren");
			var template = template && template != "poe_Dining" ? template : this.template;
			var self = this;
			var rng = this.getFirstRange();
			var activeElm = this.getActiveElement();
			var day_title_new = $(activeElm).parent().parent();
			var insertNode;
			if (day_title_new.length == 0)return;
			if (day_title_new.length>0 && (day_title_new[0].className != "day_title_new" && day_title_new[0].className != "tourContent_new" && day_title_new[0].className != "time_box_inner clearfix" && day_title_new[0].className != "tour_con")){
				return;
			}
			var tourfood = $(this.tlp["tlp"+template].poe_Tourfood());
			var dining = $(this.tlp["tlp"+template].poe_Dining());
			if (arguments.length == 1 && cnt){
				dining.html(cnt);
			}
			if (arguments.length == 2 && typeof cnt == "string" && template == "unniuren"){
				dining.html(cnt);
			}
			if (day_title_new[0].className == "tourContent_new"){
				insertNode = day_title_new;
			}else{
				insertNode = day_title_new.parent();
			}
			if($('.tour_shop_f', insertNode).length > 0 && $(".tour_food_f",insertNode).size() == 0){
				tourfood.append(dining);
				$('.tour_shop_f', insertNode).before(tourfood);
			}else{
				if ($(".tour_food_f",insertNode).size() == 0){
					tourfood.append(dining);
					insertNode.append(tourfood);
				}else{
					$(".tour_food_f",insertNode).append(dining);
				}
			}
			$("div",dining).attr('contenteditable','true');
			$("div",dining).focus();
			try{
				//rng.sel.collapse($("div",dining)[0].childNodes[0],3);
				rng.sel.selectAllChildren($('.po_dining_diy', dining)[0]);
			}catch(e){}
			$("div.tour_item em",$(insertNode)).each(function (i,n){
				self["niuren"+"DelContent"].poe_niuren_del_Dining.call(self,i,n,$(n).parent());
			});

		},
		poe_unniuren_Accommodation: function (cnt, template){
			//this.niuren.action.poe_niuren_Accommodation.call(this,cnt,"niuren");
			var template = template && template != "poe_Accommodation" ? template : this.template;
			var self = this;
			var rng = this.getFirstRange();
			var activeElm = this.getActiveElement();
			var day_title_new = $(activeElm).parent().parent();
			var insertNode;
			if (day_title_new.length == 0)return;
			if (day_title_new.length>0 && (day_title_new[0].className != "day_title_new" && day_title_new[0].className != "tourContent_new" && day_title_new[0].className != "time_box_inner clearfix" && day_title_new[0].className != "tour_con")){
				return;
			}
			var tourfood = $(this.tlp["tlp"+template].poe_Tourfood());
			var accommodation = $(this.tlp["tlp"+template].poe_Accommodation());
			if (day_title_new[0].className == "tourContent_new"){
				insertNode = day_title_new;
			}else{
				insertNode = day_title_new.parent();
			}
			if ($(".tour_food_f",insertNode).size() == 0){
				tourfood.append(accommodation);
				insertNode.append(tourfood);
			}else{
				$(".tour_food_f",insertNode).append(accommodation);
			}
			$("div",accommodation).focus();
			try{
				rng.sel.selectAllChildren($("div",accommodation)[0]);
			}catch(e){}
			$("div.tour_item em",$(insertNode)).each(function (i,n){
				self["niuren"+"DelContent"].poe_niuren_del_Accommodation.call(self,i,n,$(n).parent());
			});
		},
		poe_unniuren_ShoppingStores: function (e, template){
			//this.niuren.action.poe_niuren_ShoppingStores.call(this, e,"niuren");
			var template = template && template != "poe_ShoppingStores" ? template : this.template;
			var self = this;
			var spanBtn = "position: relative;border:1px solid #999;padding:2px 3px;margin:3px;float:left;display:block;cursor: pointer;line-height:18px;";
			var html = $("<div id='poe_win_addShoppingStores'><div><input type='text' id='sp_searchbox' name='sp_searchbox' /><input type='hidden' id='shoppingStoreId_box' name='sp_shoppingStoreId' /><button type='button' id='addTotable' disabled='disabled'>确定</button><a href='javascript:void(0);' id='searchAllShoppingStores' style='font-size:12px;margin-left:20px;'>搜索</a></div><div id='sp_searchHint' style='position:absolute; top:28px;left:5px;width:250px;background:#fff;border:1px solid grey;display:none;font-size:12px;'><ul style='margin:0;padding:0;list-style:none;'><li style='padding:2px;'>abcde</li><li style='padding:2px;'>bcdef</li><li style='padding:2px;'>cdefg</li></ul></div><div><table id='shopppingStoreTable_" + self.shopping_store_id + "' border='1' bordercolor='#ddd' cellspacing='0' cellpadding='4' style='border-collapse:collapse;font-size:12px;'><tr><th style='width:90px;background-color: #F6F6F6;padding: 2px;text-align: center;'>名称</th><th style='width:150px;background-color: #F6F6F6;padding: 2px;text-align: center;'>营业产品</th><th style='width:60px;background-color: #F6F6F6;padding: 2px;text-align: center;'>停留时间</th><th style='width:300px;background-color: #F6F6F6;padding: 2px;text-align: center;'>说明</th><th style='width:32px;background-color: #F6F6F6;padding: 2px;text-align: center;'>操作</th></tr></table></div><div style='text-align:left;padding-top:5px;'><button type='button' id='insertShoppingStore'>添加</button></div></div>");
			if ($("#poe_win_addShoppingStores").length == 0){
				this.poeWin.append(html);
				$("#poe_win_addShoppingStores").siblings().hide();
				this.showWin(e);
			}else{
				$("#poe_win_addShoppingStores").show();
				$("#poe_win_addShoppingStores").siblings().hide();
				this.showWin(e);
				return;
			}

			$('#sp_searchbox').keyup(showHint);
			var shoppingStoreData;
			function showHint(){
				if(!!$('#sp_searchbox').val()){
					$('#sp_searchHint').show();
					$.ajax({
						type: "POST",
						dataType: "json",
						url: "../editor/searchHint.js?r=" + Math.random(),
						data: $('#sp_searchbox').val(),
						// url: "main.php?r=" + Math.random(),
						// data: {
						// 		"do": "route_ajax_new",
						// 		"method": "getShopInfoByKeywordAndCity",
						// 		"keyword": $('#sp_searchbox').val()
						// },
						success:function(data){
							shoppingStoreData = data;
							$('#sp_searchHint ul').empty();
							for(var i in data){
									if(data[i].name != null){
									$('#sp_searchHint ul').append("<li style='padding:2px;'><span id='shoppingStoreName'>" + data[i].name+ "</span><span style='visibility:hidden;' id='shoppingStoreID'>" + data[i].id + "</span></li>");
									}
							}
							$('#sp_searchHint ul li').hover(
								function(){
									$(this).css({'background':'#ddd', 'cursor':'pointer'});
								},
								function(){
									$(this).css({'background':'#fff', 'cursor':'default'});
							});
							$('#sp_searchHint ul li').click(function(){
								var searchbox_text = $(this).children('#shoppingStoreName').text();
								var shoppingStoreId = $(this).children('#shoppingStoreID').text();
								$('#sp_searchbox').val(searchbox_text);
								$('#shoppingStoreId_box').val(shoppingStoreId);
								$('#addTotable').removeAttr('disabled');
								$('#sp_searchHint').hide();
							});
						}
					});
				}else{
					$('#sp_searchHint').hide();
				}
			}

			$('#searchAllShoppingStores').click(function(){
				searchAndReturnShoppingStore(addToTable);
			});

			$('#addTotable').click(function(){
				addToTable();
				$('#sp_searchbox').val('');
				$('#addTotable').attr('disabled','disabled');
			});
			function addToTable(str){
				if(!!str){
					var json_str = eval(str);
					$('#shopppingStoreTable_' + self.shopping_store_id).append("<tr><td>" + json_str[0].name + "</td><td>" + json_str[0].products + "</td><td>" + json_str[0].times + "</td><td>" + json_str[0].details + "</td><td><a href='javascript:void(0)'>删除</a></td></tr>");
					$('#shopppingStoreTable_' + self.shopping_store_id + ' a').click(function(e){
						$(e.target).parent().parent().remove();
					});
				}else if(str == undefined){
					var index;
					for(var i in shoppingStoreData){
						if(shoppingStoreData[i].id == $('#shoppingStoreId_box').val()){
							index = i;
							break;
						}else{index = -1;}
					}
					$('#shopppingStoreTable_' + self.shopping_store_id).append("<tr><td>" + shoppingStoreData[i].name + "</td><td>" + shoppingStoreData[i].products + "</td><td>" + shoppingStoreData[i].times + "</td><td>" + shoppingStoreData[i].details + "</td><td><a href='javascript:void(0)'>删除</a></td></tr>");
					$('#shopppingStoreTable_' + self.shopping_store_id + ' a').click(function(e){
						$(e.target).parent().parent().remove();
					});
				}
			}

			$('#insertShoppingStore').click(function(){
				self["unniuren"].action["poe_unniuren_insertShoppingStores"].call(self, null, e);
			});
		},
		poe_unniuren_insertShoppingStores:function (cnt, e){
			var self = this;
			var activeElm = self.getActiveElement();
			var day_title_new = $(activeElm).parent().parent();
			var tourshop = $(self.tlp["tlp"+self.template].poe_ShoppingStore());
			var insertNode;
			if (day_title_new.length == 0)return;
			if (day_title_new.length>0 && (day_title_new[0].className != "day_title_new" && day_title_new[0].className != "tourContent_new" && day_title_new[0].className != "time_box_inner clearfix" && day_title_new[0].className != "tour_con")){
				return;
			}
			if (day_title_new[0].className == "tourContent_new"){
				insertNode = day_title_new;
			}else{
				insertNode = day_title_new.parent();
			}
			if (arguments.length == 1 && cnt){
				tourshop.html(cnt);
				insertNode.append(tourshop);
			}else{
				var shopping_store = $('#shopppingStoreTable_' + self.shopping_store_id).find('tr:gt(0)').clone();
				shopping_store.find('td:last-child').remove();
				tourshop.find('tbody').append(shopping_store);
				insertNode.append(tourshop);
				$('#poe_win_addShoppingStores').remove();
				self.hideWin(e);
				self.shopping_store_id++;
			}
			$('.tour_shop_f').unbind("focus").bind("focus",function (){
				self.setActiveElement();
			});
			$('.tour_shop_f').focus();
			$('.tour_shop_f').removeAttr('contenteditable');
			$('.tour_shop_f tr td:even').attr('contenteditable','true');
			$('.tour_shop_f thead').each(function(i,n){
				self["niurenDelContent"].poe_niuren_ShoppingStores.call(self,i,n,$(n).parent().parent());
			});
			$('.tour_shop_f tbody tr').each(function(i,n){
				self["niurenDelContent"].poe_niuren_ShoppingStores.call(self,i,n,$(n));
			});
		},
		poe_unniuren_BindImgHint: function (){
			var img_m = $("<div style='position:absolute;z-index:99999;border:1px solid #ccc;background:#efefef;display:none'><img src='' style='border:2px solid #fff' /><span style='display:block;text-align:right;font-weight:bold;color:#333;padding-right:10px;'></span></div>");
			$('.day_title_new').append(img_m);
			$(".day_title_new ul.time_s_photo img").each(function(i, n){
			$(n).unbind('mouseover').bind('mouseover', function(e){
				var x = e.pageX + "px";
				var y = e.pageY + "px";
				img_m.css({'top' : y, 'left' : x});
				img_m.css('display', 'block');
				var srcString = $(this).attr('src');
				var index = srcString.lastIndexOf('.');
				var srcString_x = srcString.slice(0, index-1) + srcString.slice(index-1, index).replace('s','m') + srcString.slice(index);
				$('img', img_m).attr('src',srcString_x);
				$('span', img_m).text($(n).attr('alt'));
			}).unbind('mouseout').bind('mouseout',function(e){
				img_m.css('display','none');
			});
			});
		}
	}
}

$m.niurenDelContent = {
	poe_niuren_del_Journey: function (i,n,del){
		this.delNodeShow.call(this,i,n,del,function (node){
			if (node.attr("class") == "tourContent_new"){
				this.menu.day--;
				var nextall = node.nextAll();
				nextall.each(function (i,n){
					var nextday = $(".day_title_new h3 em",n).text();
					nextday = nextday.substring(1,nextday.length-1);
					nextday -= 1;
					$(".day_title_new h3 em",n).html("第"+nextday+"天");
				})
			}
		});
	},
	poe_niuren_del_Description: function (i,n,del){
		this.delNodeShow.call(this,i,n,del);
	},
	poe_niuren_del_FParagraph: function (i,n,del){
		this.delNodeShow.call(this,i,n,del);
	},
	poe_niuren_del_STitle: function (i,n,del){
		this.delNodeShow.call(this,i,n,del,function (node){
			$m.niurenDelContent.poe_niuren_del_publicByTimeDo.call(this,node);
		});
	},
	poe_niuren_del_SParagraph: function (i,n,del){
		this.delNodeShow.call(this,i,n,del,function (node){
			$m.niurenDelContent.poe_niuren_del_publicByTimeDo.call(this,node);
		});
	},
	poe_niuren_del_Dining: function (i,n,del){
		this.delNodeShow.call(this,i,n,del,function (node){
			$m.niurenDelContent.poe_niuren_del_publicByTourItem.call(this,node);
		});
	},
	poe_niuren_del_Accommodation: function (i,n,del){
		this.delNodeShow.call(this,i,n,del,function (node){
			$m.niurenDelContent.poe_niuren_del_publicByTourItem.call(this,node);
		});
	},
	poe_niuren_ShoppingStores: function (i,n,del){
		this.delNodeShow.call(this,i,n,del,function (node){
			$m.niurenDelContent.poe_niuren_del_publicByTourShop.call(this,node);
		});
	},
	poe_niuren_del_over_Picture: function (i,n,del){
		this.delNodeShow.call(this,i,n,del,function (node){
			if (node.parent().attr("class") == "time_img_photo clearfix"){
				if ($("li",node.parent()).size() == 1){
					node.parent().remove();
				}
			}
		});
	},
	poe_niuren_del_publicByTimeDo: function (node){
		if (node.parent().attr("class") == "time_do_new"){
			node.parent().prev().find("p").focus();
			this.setActiveElement();
		}
	},
	poe_niuren_del_publicByTourItem: function (node){
		if (node.attr("class") == "tour_item"){
			if ($("em",node.parent()).size() == 1){
				node.parent().remove();
			}
		}
	},
	poe_niuren_del_publicByTourShop: function (node){
		if (node.attr("class") == "tour_shop"){
			node.remove();
		}
	}
}

$m.unniurenDelContent = {
	poe_unniuren_del_Journey: function (i,n,del){
		this.delNodeShow.call(this,i,n,del,function (node){
			if (node.attr("class") == "tourContent_new"){
				this.day--;
				var nextall = node.nextAll();
				nextall.each(function (i,n){
					var nextday = $(".day_title_new h3 em",n).text();
					nextday = nextday.substring(1,nextday.length-1);
					nextday -= 1;
					$(".day_title_new h3 em",n).html("第"+nextday+"天");
				})
			}
		});
	},
	poe_unniuren_del_Description: function (i,n,del){
		this.delNodeShow.call(this,i,n,del);
	},
	poe_unniuren_del_Picture: function (i,n,del){
		this.delNodeShow.call(this,i,n,del,function (node){
			if (node.parent().attr("class") == "time_s_photo clearfix"){
				if ($("li",node.parent()).size() == 1){
					node.parent().remove();
				}
			}
		});
	}
}

$m.niurenReloadBindEvent = function (html){
	var self = this;
	var div = $("<div/>").append(html);
	$(".tourContent_new",div).each(function (i,m){
		var em = $(".day_title_new h3 em",$(m));
		var journey = $(".day_title_new h3 div",$(m));
		var description = $(".day_title_new h3",$(m)).nextAll();
		var stitle = $(".time_box_inner",$(m));
		var food = $(".tour_food",$(m));
		var tourshop = $(".tour_shop",$(m));
		if (journey.length> 0){
			self["niuren"].action["poe_niuren_Journey"].call(self,journey.html(), em.html(), true);
		}
		if (description.length > 0){
			description.each(function (i,n){
				self["niuren"].action["poe_niuren_Description"].call(self,$(n).html());
			});
		}
		if (stitle.length > 0){
			stitle.each(function (i,n){
				var activeTime_num = $(".tour_con",n).html();
				var tourdescription = $(".tour_description",n).html();
				var fparagraph = activeTime_num + "%^&" +tourdescription;
				self["niuren"].action["poe_niuren_FParagraph"].call(self,fparagraph);
				var time_do_new = $(".time_do_new",n);
				if (time_do_new.children().length > 0){
							var imgs = [];
							time_do_new.children().each(function (i,n){
								if (n.className == "tour_con_h4"){
									self["niuren"].action["poe_niuren_STitle"].call(self,$(n).html());
								}
								if (n.className == "tour_con"){
									self["niuren"].action["poe_niuren_SParagraph"].call(self,$(n).html());
								}
								if (n.className == "time_img_photo clearfix"){
									imgs.push({
										index: $(n).index(),
										node: $(n)
									});
								}
							});
							if (imgs.length > 0){
								var activeElm = self.getActiveElement();
								$.each(imgs,function(i,n){
									$(n.node).find('div').attr('contenteditable',true);
									if(!$(activeElm).parent().hasClass('time_num')){
										$($(activeElm).parent().children()[n.index-1]).after(n.node);
									}else{
										$($(activeElm).parent().siblings('.time_do_new').children()[n.index-1]).after(n.node);
									}
									$('.niuren_light').click(function(e){e.preventDefault();});
									$("img",n.node).each(function (i,m){
										self[self.template+"DelContent"].poe_niuren_del_over_Picture.call(self,0,m,$(m).parent().parent());
										$("div",$(m).parent().parent()).unbind("focus").bind("focus",function (){
											self.setActiveElement();
										});
									});
								});
							}
						}
			});
		}
		if (food.length > 0 && food.children().length > 0){
			food.children().each(function (i,n){
				self["niuren"].action["poe_niuren_Dining"].call(self,$(n).html());
			});
		}
		if(tourshop.length > 0){
			self["niuren"].action["poe_niuren_insertShoppingStores"].call(self, tourshop.html());
		}
	});
}

$m.unniurenReloadBindEvent = function (html){
	var self = this;
	var div = $("<div/>").append(html);
	$(".tourContent_new",div).each(function (i,m){
		var journey = $(".day_title_new h3 div",$(m));
		var imglist = $(".day_title_new ul",$(m));
		var description = $(".day_title_new .tour_line_f",$(m));
		var food = $(".tour_food_f",$(m));
		var tourshop = $(".tour_shop_f",$(m));
		if (journey.length > 0){
			self["unniuren"].action["poe_unniuren_Journey"].call(self,journey.html());
		}
		if (imglist.length > 0){
			self["unniuren"].action["poe_unniuren_Picture"].call(self,$(imglist).html(),i);
			self["unniuren"].action["poe_unniuren_BindImgHint"].call(self, null);
		}
		if (description.length > 0){
			description.each(function (i,n){
				self["unniuren"].action["poe_unniuren_Description"].call(self,$(n).html());
			});
		}
		if (food.length > 0 && food.children().length > 0){
			food.children().each(function (i,n){
				self["unniuren"].action["poe_unniuren_Dining"].call(self,$(n).html(), "unniuren");
			});
		}
		if(tourshop.length > 0){
			self["unniuren"].action["poe_unniuren_insertShoppingStores"].call(self, tourshop.html());
		}
	});
}

$m.delNodeShow = function (i,n,del,fn){
	var self = this;
	$(n).unbind("mouseover").mouseover(function (e){
		if (e.target.nodeName == "SPAN" || e.target.nodeName == "A")return false;
		if(e.target.nodeName != "TH" && e.target.nodeName != "TD"){
			self.delNode.toggle().css({
				left: $(e.target).offset().left - 35 + 1 + "px",
				top: $(e.target).offset().top+1 + "px"
		}).data("node",$(del));
		}else {
			self.delNode.toggle().css({
				left: $(e.target).parent().offset().left - 35 + 1 + "px",
				top: $(e.target).parent().offset().top+1 + "px"
		}).data("node",$(del));
		}
		if (fn){
			self.delNode.data("action",fn);
		}
	}).unbind("mouseout").mouseout(function (e){
		if (e.target.nodeName == "SPAN" || e.target.nodeName == "A")return false;
		self.delNode.toggle();
	});
}

$m.initMenu = function (){
	var self = this;
	//默认菜单“牛人专线”
	this.menu = this[this.template] || null;

	//默认菜单样式
	var menuBarCls = {background: "none repeat scroll 0 0 #f0f0ee",height: "26px",border: "1px solid #C5C5C5",minWidth: "870px",margin: "0px",padding: "0px"},
	menuBarCls_Span = {"float": "left",margin: "2px",fontSize: "13px",height: "22px"},
	menuBarCls_A = {border: "0 none",cursor: "pointer",display: "inline-block",margin: "1px",textDecoration: "none",background: "none repeat scroll 0 0 transparent"},
	menuBarCls_A_Hover = {background: "none repeat scroll 0 0 #ffffff",border: "1px solid #999999",margin:"0px"},
	menuBarCls_Icon_Button = {cursor: "pointer",border:"none",display:"block",height:"20px",margin:"0",overflow:"hidden",width:"20px",background: "url('"+this.imagePath+"icons.gif') no-repeat scroll 20px 20px transparent"},
	menuBarCls_Button = {cursor: "pointer",border:"none",display:"block",height:"20px",margin:"0",overflow:"hidden",width:"auto",background: "none repeat scroll 0 0 transparent",padding:"0 1px"}

	//创建基本编辑器功能节点
	var menuContainer = this.menuContainer = $("<div/>").css(menuBarCls);
	$.each(this.publicMenu,function (i,n){
		var positionCls = {backgroundPosition:n.position};
		var span = $("<span><a href='javascript:void(0);' onclick='return false;'><button title='"+n.name+"' class='"+n.iconCls+"'></button></a></span>").css(menuBarCls_Span);
		$("button",span).css(menuBarCls_Icon_Button).css(positionCls).click(function (e){
			self.publicMenuAction[n.action].call(self,e,i);
		});
		if (n.mouseover){
			$("button",span).css(menuBarCls_Icon_Button).css(positionCls).unbind("click");
			$("button",span).data("mouseover",true);
			$("button",span).css(menuBarCls_Icon_Button).css(positionCls).mouseover(function (e){
				e.stopPropagation();
				self.clearMenuBtnStyle(e);
				self.publicMenuAction[n.mouseover].call(self,e,i);
			});
		}
		menuContainer.append(span);
	});
	if (this.menu){
		$.each(this.menu.menu,function (i,n){
			var span = $("<span><a href='javascript:void(0);' onclick='return false;'><button id='"+i+"_btn' title='"+n.name+"' class='"+n.iconCls+"'>"+n.name+"</button></a></span>").css(menuBarCls_Span);
			$("button",span).css(menuBarCls_Button).click(function (e){
				self.menu.action[n.action] && self.menu.action[n.action].call(self,e,i);
			});
			if (n.mouseover){
				$("button",span).css(menuBarCls_Button).unbind("click");
				$("button",span).data("mouseover",true);
				$("button",span).css(menuBarCls_Button).mouseover(function (e){
					e.stopPropagation();
					self.clearMenuBtnStyle(e);
					self.menu.action[n.mouseover].call(self,e,i);
				});
			}
			menuContainer.append(span);
		});
	}
	if(this.template == "base"){
		$(".poe_bus", menuContainer).parent().parent().remove();
		$(".poe_plain", menuContainer).parent().parent().remove();
		$(".poe_train", menuContainer).parent().parent().remove();
		$(".poe_ship", menuContainer).parent().parent().remove();
		if (!this.plus) {
			$("#poe_Picture_btn", menuContainer).parent().parent().remove();
		}
		var poe_preview_spn = $(".poe_preview", menuContainer).parent().parent().detach();
		menuContainer.append(poe_preview_spn);
	}
	$("a",menuContainer).css(menuBarCls_A).unbind("mouseover").mouseover(function (e){
		$(this).css(menuBarCls_A_Hover);
	}).unbind("mouseout").mouseout(function (e){
		if (!$("button",$(this)).data("mouseover")){
			$(this).css(menuBarCls_A);
		}
	});
	this.delNode.mouseover(function (e){
		$(this).show();
		e.stopPropagation();
		$(this).data("node").css({
			border: "1px solid red",
		});
	}).mouseout(function (e){
		$(this).hide();
		e.stopPropagation();
		$(this).data("node").removeAttr("style");
	}).click(function (e){
		$(this).hide();
		if ($(this).data("action")){
			$(this).data("action").call(self,$(this).data("node"),e);
		}
		$(this).data("node").remove();
	});
	return menuContainer;
}

$m.clearMenuBtnStyle = function (e){
	if (!this.activeMenuByWin){
		this.activeMenuByWin = e.target;
	}else{
		if (this.activeMenuByWin.className != e.target.className && $(this.activeMenuByWin).data("mouseover")){
			$(this.activeMenuByWin).parent().css({
				border: "0px solid #999",
				backgroundColor: "transparent",
				margin: "1px"
			});
			this.activeMenuByWin = e.target;
		}
	}
}
$m.getFirstRange = function (){
	var sel = this.rangy.getSelection ? this.rangy.getSelection() : this.rangy.getNativeSelection();
	return {
		sel: sel,
		rang: (sel.rangeCount ? sel.getRangeAt(0) : null)
	}
}
//设置当前焦点所在节点的激活状态
$m.setActiveElement = function (){
	this.activeElement = this.doc.activeElement;
}

$m.getActiveElement = function (){
	return this.activeElement;
}
function Template(opt){
	$.extend(this,opt || {}, {});
}

var $t = Template.prototype;

$t.tlpniuren = {
	poe_Journey: function (){
		return "<div class='tourContent_new'><div class='day_title_new'><h3><em contentEditable='true'>第{day}天</em><div contentEditable='true'>请在这里输入行程标题</div></h3></div></div>";
	},
	poe_Description: function (){
		return "<div class='tour_line' contentEditable='true'>请在这里输入行程描述，内容可以为“航班信息”、“游览路线”等相关内容</div>";
	},
	poe_FParagraph: function (){
		return "<div class='time_box_inner clearfix'><div class='time_num'><div class='tour_con' contentEditable='true'>输入时间</div></div><div class='time_do_new'><div class='tour_description' contentEditable='true'>请在这里输入行程时间段描述</div></div></div>";
	},
	poe_STitle: function (){
		return "<div class='tour_con_h4' contentEditable='true'>请在这里输入行程小标题</div>";
	},
	poe_SParagraph: function (){
		return "<div class='tour_con' contentEditable='true'>请在这里输入行程小标题正文</div>";
	},
	poe_Tourfood: function (){
		return "<div class='tour_food'></div>";
	},
	poe_Dining: function (){
		return "<div class='tour_item'><em>用餐</em><div contentEditable='true'>早餐：<span class='po_dining_diy'>敬请自理</span>&#160;午餐：<span class='po_dining_diy'>敬请自理</span>&#160;晚餐：<span class='po_dining_diy'>敬请自理</span></div></div>";
	},
	poe_Accommodation: function (){
		return "<div class='tour_item'><em>住宿</em><div contentEditable='true'>请在这里输入当天住宿情况</div></div>";
	},
	poe_ImgList: function (){
		return "<ul class='time_img_photo clearfix'></ul>";
	},
	poe_ImgListItem: function (){
		return "<li><a href='#' onclick='return false;'></a><div contentEditable='true'></div></li>";
	},
	poe_ShoppingStore: function(){
		return "<div class='tour_shop' contenteditable='true'><p><b>购物店信息</b>（如因游客购物造成时间延长，延长时间不计入旅行社的客观安排停留时间）</p><table><thead><tr><th class='w160'>名称</th><th class='w200'>营业产品</th><th class='w160'>停留时间 </th><th class='w200'>说明</th></tr></thead><tbody></tbody></table></div>";
	}
}
$t.tlpunniuren = {
	poe_Journey: function (){
		return "<div class='tourContent_new'><div class='day_title_new'><h3><em contentEditable='true'>第{day}天</em><div contentEditable='true'>请在这里输入行程标题</div></h3></div></div>";
	},
	poe_SImgList: function (){
		return "<ul class='time_s_photo clearfix'></ul>";
	},
	poe_SImgListItem: function (){
		return "<li><a href='javascript:void(0);' onclick='return false;' style='cursor:default;'></a><div></div></li>";
	},
	poe_Description: function (){
		return "<div class='tour_line_f' contentEditable='true'>请在这里输入行程描述，内容可以为“航班信息”、“游览路线”等相关内容</div>";
	},
	poe_Tourfood: function (){
		return "<div class='tour_food_f'></div>";
	},
	poe_Dining: function (){
		return "<div class='tour_item'><em>用餐</em><div contentEditable='true'>早餐：<span class='po_dining_diy'>敬请自理</span>&#160;午餐：<span class='po_dining_diy'>敬请自理</spam>&#160;晚餐：<span class='po_dining_diy'>敬请自理</span></div></div>";
	},
	poe_Accommodation: function (){
		return "<div class='tour_item'><em>住宿</em><div contentEditable='true'>请在这里输入当天住宿情况</div></div>";
	},
	poe_ShoppingStore: function(){
		return "<div class='tour_shop_f' contenteditable='true'><p><b>购物店信息</b>（如因游客购物造成时间延长，延长时间不计入旅行社的客观安排停留时间）</p><table><thead><tr><th width='160'>名称</th><th width='200'>营业产品</th><th width='100'>停留时间 </th><th>说明</th></tr></thead><tbody></tbody></table></div>";
	}
}

var Event = {
    _listeners: {},
    // 添加
    addEvent: function(type, fn) {
        if (typeof this._listeners[type] === "undefined") {
            this._listeners[type] = [];
        }
        if (typeof fn === "function") {
            this._listeners[type].push(fn);
        }
        return this;
    },
    // 触发
    fireEvent: function(type) {
        var arrayEvent = this._listeners[type];
        if (arrayEvent instanceof Array) {
            for (var i=0, length=arrayEvent.length; i<length; i+=1) {
                if (typeof arrayEvent[i] === "function") {
                    arrayEvent[i]({ type: type });
                }
            }
        }
        return this;
    },
    // 删除
    removeEvent: function(type, fn) {
    	var arrayEvent = this._listeners[type];
        if (typeof type === "string" && arrayEvent instanceof Array) {
            if (typeof fn === "function") {
                // 清除当前type类型事件下对应fn方法
                for (var i=0, length=arrayEvent.length; i<length; i+=1){
                    if (arrayEvent[i] === fn){
                        this._listeners[type].splice(i, 1);
                        break;
                    }
                }
            } else {
                // 如果仅仅参数type, 或参数fn邪魔外道，则所有type类型事件清除
                delete this._listeners[type];
            }
        }
        return this;
    }
};

Event.addEvent("hideWindow", function() {
    if($('.link_span').length != 0){
		$('.link_span').each(function(i, n){
			$(n).after($(n).text());
			$(n).remove();
		});

	}
});



































