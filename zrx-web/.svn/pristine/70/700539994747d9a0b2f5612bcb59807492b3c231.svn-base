
var Clip = {
	getClip: function(){
		if (window.clipboardData){
			return	window.clipboardData.getData("Text");
		}
		else{
			if(window.netscape){
			try {
				netscape.security.PrivilegeManager.enablePrivilege("UniversalXPConnect");
			}
			catch (e) {
				alert("<p>您的Firefox安全限制限制您进行剪贴板操作，请按如下步骤进行设置：</p><p>1.请在浏览器地址栏中输入'about:config'。</p><p>2.在过滤器中输入“signed.applets.codebase_principal_support”并按回车。</p><p>3.鼠标双击值，将值设置为'true'之后重试。</p>");
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
	},
	setClip: function (text){
		if (window.clipboardData){
			return	window.clipboardData.setData("Text",text);
		}
		else{
			if(window.netscape){
			try {
				netscape.security.PrivilegeManager.enablePrivilege("UniversalXPConnect");
			}
			catch (e) {
				alert("<p>您的Firefox安全限制限制您进行剪贴板操作，请按如下步骤进行设置：</p><p>1.请在浏览器地址栏中输入'about:config'。</p><p>2.在过滤器中输入“signed.applets.codebase_principal_support”并按回车。</p><p>3.鼠标双击值，将值设置为'true'之后重试。</p>");
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
}