(function() {
	var honeydukesSessionID = localStorage.getItem("honeydukesSessionID"),
		honeydukesUname = localStorage.getItem("honeydukesUname"),
		honeydukesUspelling = localStorage.getItem("honeydukesUspelling"),
		honeydukesUid = localStorage.getItem("honeydukesUid"),
		honeydukesUNum = localStorage.getItem("honeydukesUNum"),
		honeydukesTelExt = localStorage.getItem("honeydukesTelExt"),
		isLogin = sessionStorage.getItem("isLogin");

	if (honeydukesSessionID && honeydukesSessionID.length !== 0) {
		tn.cookie.set("honeydukesSessionID", honeydukesSessionID);
	}
	if (honeydukesUname && honeydukesUname.length !== 0 && isLogin && isLogin.length !== 0) {
		tn.cookie.set("honeydukesUname", honeydukesUname);
	}
	if (honeydukesUspelling && honeydukesUspelling.length !== 0) {
		tn.cookie.set("honeydukesUspelling", honeydukesUspelling);
	}
	if (honeydukesUid && honeydukesUid.length !== 0) {
		tn.cookie.set("honeydukesUid", honeydukesUid);
	}
	if (honeydukesUNum && honeydukesUNum.length !== 0) {
		tn.cookie.set("honeydukesUNum", honeydukesUNum);
	}
	if (honeydukesTelExt && honeydukesTelExt.length !== 0) {
		tn.cookie.set("honeydukesTelExt", honeydukesTelExt);
	}
})()
