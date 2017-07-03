//获取项目名称
var urlArr =  window.location.pathname.split("/");
//系统路径
urlArr.shift();
urlArr.splice(urlArr.length - 2);
//项目名
var pathname = urlArr.join("/");
//文件路径
if(pathname) {
	pathname = pathname + "/";
}
var projectUrl = window.location.protocol+'//'+window.location.host + "/" + pathname;

var firefoxAdd = false;
if(window.jQuery) {
	firefoxAdd = true;
}
document.write("\<script type='text/javascript' src='"+projectUrl+"min/?b="+pathname+"jsrc/modules&amp;f=jquery-1.7.2.js,jquery.tmpl.js,bootstrap/bootstrap.js,config.js,util/JSON.js,util/Type.js,util/GUID.js,util/Base64.js,util/DatePack.js,util/Ver.js,bsplugins/Privileges.js,plugins/Notice.js,plugins/Noty.js,plugins/Message.js,plugins/WinForm.js,plugins/CalendarPanel.js,plugins/Chosens.js,plugins/FastSelectCalendarPanel.js,plugins/HoursPanel.js,plugins/Kalendae.js,plugins/Search.js,plugins/TagsInput.js,plugins/UploadFile.js,plugins/Verify.js,plugins/ZTree.js,plugins/TNEditor/TNEditor.js,plugins/Tel.js,tn/TN.js,tn/pinyinEngine.js,tn/TNQuoteGridPanel/TNQuoteGridPanel.js,tn/TNUploadFile/TNUploadFile.js,tn/TNSearch/TNSearch.js,tn/TNSetNGBOSSCookie.js,tn/GlobalProcess.js,plugins/City.js'\>\<\/script\>");
