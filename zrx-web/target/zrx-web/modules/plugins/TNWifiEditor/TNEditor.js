

function TNEditor(opt){
	var defaults = {
		width: 600,
		height: 400,
		container: $(document.body)
	};
	var self =this;
	$.extend(true, this, defaults, opt || {});
	//this.editbody = new editBody(this);
	//this.loadBody();
	//this.editfooter = new editFooter(self);
	//this.loadFooter();
	//this.editfooter.bindEvent();
	//this.editmenu = new editMenu(self);
	//this.loadMenu();
	//this.editmenu.bindEvent();
	//$('.baseSection',self.editbody.cw.document).focus();//根据实际情况添加
	this.editorKey = this.container.attr('id');
	// console.debug(this.editorKey);
	this.editbody = new editBody(self);
	this.editfooter = new editFooter(self);
	this.editmenu = new editMenu(self);
	// console.debug(this,7777);
	//this.init();
}

TNEditor.prototype.init = function(){
	var self = this;
	this.editbody.initBody();
	this.editfooter.initFooter();
	this.editmenu.initMenu();
	this.loadBody();
	this.loadFooter();
	this.editfooter.bindEvent();
	this.loadMenu();
	this.editmenu.bindEvent();
	//this.frame =
	//$('.baseSection',this.editbody.cw.document).focus();//根据实际情况添加
	this.bindPaste($('.' + self.editbody.bodyInfo.section, self.editbody.cw.document));
}

TNEditor.prototype.loadBody = function (){
	//先加载样式表
	$('head').append('<link type="text/css" rel="stylesheet" href="../../../jsrc/modules/plugins/TNWifiEditor/css/base.css" />');
	var editor = $('<div id="editor_wrap"></div>');
	//editor.css({'width':this.width-2, 'height':this.height-2});
	editor.css('width',this.width-2);
	var bodyDOM = this.editbody.getBody();
	editor.append(bodyDOM);
	this.container.append(editor);
	this.editbody.setbaseSection();
}
TNEditor.prototype.loadFooter = function(){
	var footerDOM = this.editfooter.getFooter();
	this.editbody.getBody().after(footerDOM);
}
TNEditor.prototype.loadMenu = function (){
	var menuDOM = this.editmenu.getMenu();
	this.editbody.getBody().before(menuDOM);
}
TNEditor.prototype.bindPaste = function(dom){
	var self = this;
	dom.unbind('paste').bind('paste',function(e){
		var text = null;
		var div = document.createElement('div');
		div.id = 'divTemp';
		div.innerHTML = '\uFEFF';
		div.style.left="-10000px";
		div.style.height="1px";
		div.style.width="1px";
		div.style.position="absolute";
		div.style.overflow="hidden";
		dom.append(div);
		dom.mousedown(function(e){
			e.preventDefault();
		});
		dom.keydown(function(e){
			e.preventDefault();
		});
		var selection = self.editbody.cw.getSelection();
		var range = selection.getRangeAt(0);
		var docBody = div.firstChild;
		var rng = self.editbody.cw.document.createRange();
		rng.setStart(docBody, 0);
		rng.setEnd(docBody, 1);
		selection.removeAllRanges();
		selection.addRange(rng);
		window.setTimeout(function(){
			text = $('#divTemp',self.editbody.cw.document).html();//这里直接去掉了所有标签和样式，如果想保留也可以，设置过滤数据的函数即可。
			$('#divTemp',self.editbody.cw.document).remove();
			if(range){
				selection.removeAllRanges();
				selection.addRange(range);
			}
			self.editbody.cw.document.execCommand('insertHTML',false,text);
			dom.unbind('mousedown');
			dom.unbind('keydown');
		},0);
	});
}

function editMenu(opt){
	var defaults = {
		imagePath : "../../../jsrc/modules/plugins/TNWifiEditor/image/",
		color: ["#ff0000","#0000ff","#000"],
		colorName: ["红色","蓝色","黑色"]
	};
	$.extend(this, defaults, opt || {});
	this.menuContainer = $('<div id="editMenu"></div>');
	this.popWin = $('<div id="popWin"></div>');
	//this.initMenu();
}

editMenu.prototype.menuInfo = {
	baseInfo:{
		undo:{
			name: "撤销",
			imgPath: "undo.png",//这里要使用css雪碧
			action: ""
		},

		redo:{
			name: "重做",
			imgPath: "redo.png",
			action: ""
		},
		center:{
			name: "居中",
			imgPath: "center.png",//这里要使用css雪碧
			action: "setCenter"
		},
		left:{
			name: "居左",
			imgPath: "left.png",//这里要使用css雪碧
			action: "setLeft"
		},
		right:{
			name: "居右",
			imgPath: "right.png",//这里要使用css雪碧
			action: "setRight"
		},
		image:{
			name: "图像",
			imgPath:"image.png",
			action:"addImage"
		},
		bold:{
			name: "加粗",
			imgPath: "bold.png",
			action: "letSelectionBold"
		},
		color:{
			name: "文字颜色",
			imgPath:"color.png",
			action: "setFontColor"
		},
		addLink:{
			name: "添加链接",
			imgPath:"addLink.png",
			action: "addLink"
		},
		cancelLink:{
			name: "取消链接",
			imgPath:"cancelLink.png",
			action: "cancelLink"
		},
		addStar:{
			name: "加星",
			imgPath: "addStar.png",
			action: "addStar"
		},
		addStar2:{
			name: "★",
			imgPath: "",
			action: "addStar2"
		},
		copy:{
			name: "复制",
			imgPath: "copy.png",
			action: "copy"
		},
		past:{
			name: "粘贴",
			imgPath: "past.png",
			action: "past"
		},
		preview:{
			name: "预览",
			imgPath: "preview.png",
			action: "preview"
		}
	},
	action:{
		letSelectionBold:function(){
			this.editbody.cw.document.execCommand("bold", false, null);
		},
		setFontColor:function(e){
			var self = this;
			var t;
			var popBox = $('<div id="colorPopBox" style="width:100px;"></div>');
			for(var i = 0;i < self.color.length; i++){
				var colorInput = $('<input type="button" class="colorSetBtn" />');
				colorInput.css('background',self.color[i]).data('color',self.color[i]);
				colorInput.attr('title',self.colorName[i]);
				popBox.append(colorInput);
			}
			var pos = $(e.target).position();
			self.displayPopWin(pos,popBox);
			$(e.target).parent().append(self.popWin);
			self.popWin.show();

			$('.colorSetBtn', popBox).each(function(i,n){
				$(n).bind('mousedown',function(){
					self.editbody.cw.document.execCommand("foreColor",false,$(this).data('color'));
					self.hidePopWin();
				});
			});

			self.popWin.unbind('mouseleave').mouseleave(function(){
				t = setTimeout(function(){
					self.hidePopWin();
				}, 500);
			});
			self.popWin.unbind('mouseenter').mouseenter(function(){
				if(typeof(t) !== 'undefined'){
					clearTimeout(t);
				}
			});
		},
		addLink: function(e){
			var self = this;
			var popBox = $('<div id="linkPopBox"></div>');
			var popHeader = $('<div class="popHeader"><a href="javascript:void(0);" id="closePopBoxBtn"></a></div>');
			var popBody = $('<div class="popBody"></div>');
			var linkUrlBox = $('<div><span style="font-size:12px;">请输入链接地址：</span></div><div><input id="linkInput" type="text" size="40" value="http://"/></div>');
			popBody.append(linkUrlBox);
			var popFooter = $('<div class="popFooter"><input type="button" id="addLinkBtn" value="添加链接" /></div>')
			popBox.append(popHeader).append(popBody).append(popFooter);
			var pos = $(e.target).position();
			self.displayPopWin(pos,popBox);
			$(e.target).parent().append(self.popWin);
			self.popWin.show();
            $('#closePopBoxBtn').click(function(){
				self.hidePopWin();
			});
			// $('#closePopBoxBtn').click(function(){
			// 	self.hidePopWin();
			// });
			$('#addLinkBtn', popBox).click(function(){
				var linkValue = $('#linkInput', popBox).val();
				self.editbody.cw.document.execCommand("createLink",false,linkValue);
				self.hidePopWin();
				//self.editbody.cw.focus();
			});
			$('#linkInput', popBox).mousedown(function(e){
				e.stopPropagation();
			});
			self.popWin.unbind('mouseleave').unbind('mouseenter');
		},
		setLeft:function(){
            var self = this;
			self.editbody.cw.document.execCommand("JustifyLeft",false,false);
		},
		setRight:function(){
            var self = this;
			self.editbody.cw.document.execCommand("JustifyRight",false,false);
		},
		setCenter:function(){
            var self = this;
			self.editbody.cw.document.execCommand("JustifyCenter",false,false);
		},
		addImage:function(e){
			var self = this;
			var popBox = $('<div id="linkPopBox"></div>');
			var popHeader = $('<div class="popHeader"><a href="javascript:void(0);" id="closePopBoxBtn"></a></div>');
			var popBody = $('<div class="popBody"></div>');
			var linkUrlBox = $('<div><span style="font-size:12px;">请输入链接地址：</span></div><div><input id="linkInput" type="text" size="40" value="http://"/></div>');
			popBody.append(linkUrlBox);
			var popFooter = $('<div class="popFooter"><input type="button" id="addLinkBtn" value="添加链接" /></div>')
			popBox.append(popHeader).append(popBody).append(popFooter);
			var pos = $(e.target).position();
			self.displayPopWin(pos,popBox);
			$(e.target).parent().append(self.popWin);
			self.popWin.show();
            $('#closePopBoxBtn').click(function(){
				self.hidePopWin();
			});
			// $('#closePopBoxBtn').click(function(){
			// 	self.hidePopWin();
			// });
			$('#addLinkBtn', popBox).click(function(){
				var linkValue = $('#linkInput', popBox).val();
				self.editbody.cw.document.execCommand("InsertImage",false,linkValue);
				self.hidePopWin();
				//self.editbody.cw.focus();
			});
           $('#linkInput', popBox).mousedown(function(e){
				e.stopPropagation();
			});
			self.popWin.unbind('mouseleave').unbind('mouseenter');
		},
		cancelLink: function(){
			var self = this;
			self.editbody.cw.document.execCommand("unlink",false,false);
		},
		addStar: function(){
			var self = this;
			var sel = self.editbody.cw.getSelection();
			var range = sel.getRangeAt(0);
			var imgURL = self.imagePath + self.menuInfo.baseInfo.addStar.imgPath;
			//self.editbody.cw.document.execCommand("insertImage",false,imgURL);
			var img = document.createElement('img');
			img.src = imgURL;
			range.surroundContents(img);
			$('.' + self.editbody.bodyInfo.section,self.editbody.cw.document).focus();
			range.collapse(false);
			range.setEndAfter(img);
			range.setStartAfter(img);
			//光标强制刷新
			sel.removeAllRanges();
			sel.addRange(range);
		},
		addStar2: function(){
			var self = this;
			try{
				var sel = self.editbody.cw.getSelection();
				var range = sel.getRangeAt(0);

			}catch(e){
				self.editfooter.setStatusMsg("请先在编辑器中选择插入点。");
			}
			var star = document.createTextNode('★');
			range.insertNode(star);
			$('.' + self.editbody.bodyInfo.section,self.editbody.cw.document).focus();
			range.collapse(false);
			range.setEndAfter(star);
			range.setStartAfter(star);
			//光标强制刷新
			sel.removeAllRanges();
			sel.addRange(range);
		},
		copy: function(){
			var self = this;
			localStorage.setItem("wifiEditor",self.editbody.bodyEvent.getHtmlContent.call(self, false));	
			new Noty().info("复制成功");
		},
		past: function(){
			self.editbody.bodyEvent.setHtmlContent.call(self, localStorage.getItem("wifiEditor"));
			
		},
		preview: function(){
			var self = this;
			var win = window.open("about:blank");
			win.document.write('<html><head><link type="text/css" rel="stylesheet" href="../../../1common/editor_css/base.css" /></head><body>'+self.editbody.bodyEvent.getHtmlContent.call(self, true)+'</body></html>');
			win.document.close();
		}
	}
};
editMenu.prototype.initMenu = function (){
	var self = this;
	var menuItem = $('<ul></ul>');
	//for(var item = 0; item < this.base.length; item++){
		//if(typeof this.menuInfo.baseInfo[this.base[item]] !== 'undefined'){
			//var menuLi = $('<li id="'+this.base[item]+'"></li>');
			//var menuLiA = $('<a href="javascript:void(0);" title="' + this.menuInfo.baseInfo[this.base[item]].name + '"></a>');
			//if(this.menuInfo.baseInfo[this.base[item]].imgPath === ""){
				//menuLiA.append('<span style="margin-left:1px;">' + this.menuInfo.baseInfo[this.base[item]].name + '</span>');
			//}else{
				//menuLiA.css('background','url(' + this.imagePath + this.menuInfo.baseInfo[this.base[item]].imgPath + ')');
			//}
			//menuLi.append(menuLiA);
			//menuItem.append(menuLi);
		//}
	//}
	$.each(this.base, function(i,n){
		if(typeof self.menuInfo.baseInfo[n] !== 'undefined'){
			var menuLi = $('<li id="'+n+'"></li>');
			var menuLiA = $('<a href="javascript:void(0);" title="' + self.menuInfo.baseInfo[n].name + '"></a>');
			if(self.menuInfo.baseInfo[n].imgPath === ""){
				menuLiA.append('<span style="margin-left:1px;">' + self.menuInfo.baseInfo[n].name + '</span>');
				menuLiA.css({'width':'auto', 'font-size':'12px'});
				if(self.menuInfo.baseInfo[n].name == "★"){
					menuLiA.css('font-size','14px');
				}
			}else{
				menuLiA.css('background','url(' + self.imagePath + self.menuInfo.baseInfo[n].imgPath + ')');
			}
			menuLi.append(menuLiA);
			menuItem.append(menuLi);
		}
	});
	this.menuContainer.append(menuItem);

	//提交编辑器内容的时候要记得清空localStorage.lastContent，如果不清空，则保存至下次提示未提交，对用户造成困扰。
	//此功能需要验证，想办法验证一下。localStorage.removeItem("key");
	if(localStorage.getItem(self.editorKey)){
		var remindDiv = $('<div id="remindDiv"><span>您有上次未提交成功的文档</span><span><a href="javascript:void(0);" id="1_recovery">恢复文档</a></span><span><a href="javascript:void(0);" id="remindDivClose"></a></span></div>');
		this.menuContainer.append(remindDiv);
	}
	return this.menuContainer;
}
editMenu.prototype.getMenu = function (){
	return this.menuContainer;
}
editMenu.prototype.bindEvent = function (){
	var self = this;
	if($('#remindDiv',self.container).length > 0){
		$('#1_recovery', self.container).click(function (){
			self.editfooter.recovery();
			$('#remindDiv',self.container).hide();
		});
		$('#remindDivClose', self.container).click(function(){
			$('#remindDiv',self.container).hide();
		});
	}
	function Middle(n){
		this.clickFunction = function(e){
			self.menuInfo.action[self.menuInfo.baseInfo[n].action].call(self, e);
		}
		this.mouseleaveFunction = function(e){
			if($(e.target).has('#popWin').length > 0){
				self.hidePopWin();
			}

		}
	}
	$.each(self.base, function(i,n){
		if(typeof self.menuInfo.baseInfo[n] !== 'undefined'){
			var middler = new Middle(n);
			$('#' + n + " a",self.menuContainer).click(middler.clickFunction);
			if(n == "color"){
				$('#' + n,self.menuContainer).mouseleave(middler.mouseleaveFunction);
			}
		}
	});
}
editMenu.prototype.displayPopWin = function(pos, element){
	//加入了拖拽的功能，还可以更好些。
	var self = this;
	this.popWin.empty().append(element);
	this.popWin.css({'position':'absolute','top':pos.top + 18,'left':pos.left - 3, 'cursor':'move'});
	this.popWin.mousedown(function(e){
		var edges = self.container.offset();
		var posStartX = parseInt($(this).css('left'));
		var posStartY = parseInt($(this).css('top'));
		var cursorStartX = e.pageX;
		var cursorStartY = e.pageY;
		$(this).mousemove(function(e){
			$(this).css({'top':e.pageY - cursorStartY + posStartY, 'left':e.pageX - cursorStartX + posStartX});
		});
		$(this).mouseup(function(){
			$(this).unbind('mousemove');
		});
		$(this).mouseout(function(){
			$(this).unbind('mousemove');
		});
	});
}
editMenu.prototype.hidePopWin = function(){
	var self = this;
	 $("#" + self.editorKey).find('#popWin').hide('fast');
}


function editBody(opt){
	var defaults = {

	};
	$.extend(this, defaults, opt || {});
	this.baseSection = $('<iframe class="TN_iframe" frameborder="0" width="100%" height="100%"></iframe>');
	this.bodyContainer = $('<div id="bodyContainer"></div>');
	this.bodyContainer.append(this.baseSection);
	//this.initBody();
}
editBody.prototype.initBody = function (){
	this.bodyContainer.css('height',this.height-60);
}
editBody.prototype.getBody = function (){
	return this.bodyContainer;
}

editBody.prototype.bodyInfo = {
	section: 'baseSection'
}
editBody.prototype.bodyEvent = {
	getHtmlContent: function(flag){
		var self = this;
		var section = null;
		if (flag){
			section = $('.' + self.editbody.bodyInfo.section,self.editbody.cw.document).parent().clone();
			$('.' + self.editbody.bodyInfo.section + '',section).removeAttr('contenteditable');
		}else{
			section = $('.' + self.editbody.bodyInfo.section,self.editbody.cw.document).clone();
		}
		return section.html();
	},
	setHtmlContent: function(content){
		var self = this;
		$('.' + self.editbody.bodyInfo.section + '',self.editbody.cw.document).empty().append(content);
	}
}

editBody.prototype.setbaseSection = function() {
	var self = this;
	//this.cw = document.getElementById('TN_iframe').contentWindow;
	this.cw = $('.TN_iframe', self.container)[0].contentWindow;
	this.cw.document.open();
	this.cw.document.write('<div contenteditable="true" spellcheck="false" class="' + self.bodyInfo.section + '" style="word-wrap:break-word;word-break:break-all;font-size:12px;cursor:text;outline:none;"></div>');
	$('.' + self.bodyInfo.section + '',this.cw.document).css('height',this.height-76);
	$('head',this.cw.document).append('<link rel="stylesheet" href="../../../jsrc/modules/plugins/TNWifiEditor/css/editableIframe.css" />').append('<style>._0000FF {color:blue;}._FF0000 {color:red;} ._000000 {color:black;}</style>');
	this.cw.document.close();
}
//editBody.prototype.getHtmlContent = function(flag){
	//var self = this;
	//var section = null;
	//if (flag){
		//section = $('.' + self.bodyInfo.section + '',this.cw.document).parent().clone();
		//$('.' + self.bodyInfo.section + '',section).removeAttr('contenteditable');
	//}else{
		//section = $('.' + self.bodyInfo.section + '',this.cw.document).clone();
	//}
	//return section.html();
//}
//editBody.prototype.setHtmlContent = function(content){
	//var self = this;
	//$('.' + self.bodyInfo.section + '',self.cw.document).empty().append(content);
//}

function editFooter(opt){
	var defaults = {

	};
	$.extend(this, defaults, opt || {});
	this.footerContainer = $('<div id="editFooter"></div>');
	//   this.initFooter();
}
editFooter.prototype.initFooter = function (){
	var statusdiv = $('<div id="statusDiv"></div>');
	var otherFunctiondiv = $('<div id="otherFunctionDiv"><span id="remindTime"></span><span><a href="javascript:void(0);" id="manualSave">保存文档</a></span><span>|</span><span><a href="javascript:void(0);" id="2_recovery">恢复文档</a></span><span style="margin-left:20px;"><a href="javascript:void(0);" id="emptyDoc">清空文档</a></span></div>');
	this.footerContainer.append(statusdiv).append(otherFunctiondiv);
	this.footerContainer.css('width',this.width-6);
}
editFooter.prototype.bindEvent = function(){
	var self = this;
	$('#manualSave',self.container).click(function(){
		self.justSave();
	});
	$('#2_recovery',self.container).click(function(){
		self.recovery();
	});
	$('#emptyDoc',self.container).click(function(){
		self.emptyDocument();
	});
	self.autoSave();
}
editFooter.prototype.justSave = function(){
	var self = this;
	var d = new Date();
	localStorage.setItem(self.editorKey, self.editbody.bodyEvent.getHtmlContent.call(self, false));//try...catch
	self.setStatusMsg("文档已于" + d.getHours() + ":" + d.getMinutes() + "保存");
}
editFooter.prototype.autoSave = function(){
	var self = this;
	var i = 30;
	function remind(){
		$('#remindTime',self.container).text(i + "秒后自动保存");
		i = i - 10;
		if(i == 0){
			i = 30;
		}
		setTimeout(remind, 10000);
	}
	function save(){
		self.justSave();
	}
	remind();
	setInterval(save, 30000);
}
editFooter.prototype.recovery = function(){
	var self = this;
	var flag = confirm("此操作将覆盖当前文档内容，确定要恢复文档吗？");
	if(flag){
		var lastContentHtml = localStorage.getItem(self.editorKey);
		self.editbody.bodyEvent.setHtmlContent.call(self, lastContentHtml);//try...catch
		self.setStatusMsg("已恢复");
	}else{
		return;
	}
}
editFooter.prototype.emptyDocument = function(){
	var self = this;
	var flag = confirm("确定要清空文档吗？");
	if(flag){
		$('.' + self.editbody.bodyInfo.section + '', self.editbody.cw.document).empty();
	}else{
		return;
	}
}
editFooter.prototype.getFooter = function (){
	return this.footerContainer;
}

editFooter.prototype.setStatusMsg = function (msg){
	$('#statusDiv', this.footerContainer).text(msg);
}