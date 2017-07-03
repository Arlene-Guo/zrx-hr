/**
 * 功能说明：DatePack日期处理
 */
var DatePack = {
	toString: function (date,format){
		if(!date) return "";
		if (!Type.isDate(date)) return "";
		format = format ? format : "y-m-d";
		switch(format){
			case "y-m":
				return date.getFullYear() + "-" + DatePack.pad( date.getMonth() + 1, 2 );
			case "y-m-d":
				return date.getFullYear() + "-" + DatePack.pad( date.getMonth() + 1, 2 ) + "-" + DatePack.pad( date.getDate(), 2 );
			case "h-m-s":
				return DatePack.pad( date.getHours(), 2 ) + ":" + DatePack.pad( date.getMinutes(), 2 ) + ":" + DatePack.pad( date.getSeconds(), 2);
			case "y-m-d-h-m-s":
				return date.getFullYear() + "-" + DatePack.pad( date.getMonth() + 1, 2 ) + "-" + DatePack.pad( date.getDate(), 2 ) + " " + DatePack.pad( date.getHours(), 2 ) + ":" + DatePack.pad( date.getMinutes(), 2 ) + ":" + DatePack.pad( date.getSeconds(), 2);
		}
	},
	pad: function (num, n){
		if( ( num + "" ).length >= n )
			return num;
		return arguments.callee( "0" + num, n );
	},
	parseDate: function (string){
		var matches;
		if (matches = string.match(/^(\d{4,4})-(\d{2,2})-(\d{2,2})$/)) {
			return new Date(matches[1], matches[2] - 1, matches[3]);
		} else {
			return null;
		};
	},
	addDate: function (date, days, format){
		var dateLong = new Date(date).valueOf();
		dateLong += 24 * 60 * 60 * 1000 * days;
		return this.toString(new Date(dateLong),format || "y-m-d");
	},
	delDate: function (date, days, format){
		var dateLong = new Date(date).valueOf();
		dateLong -= 24 * 60 * 60 * 1000 * days;
		return this.toString(new Date(dateLong),format || "y-m-d");
	},
	getDay: function (days){
		return new Date(days).getDay();
	},
	getTime: function (date){
		return new Date(date).getTime();
	},
	defaultConfig: {
		weekNames: ["星期日","星期一","星期二","星期三","星期四","星期五","星期六"],
		format: "YYYY-MM-DD",
		seconds: 1000, // 1000
		minutes: 60000, // 60 * 1000
		hours: 3600000, // 60 * 60 * 1000
		days: 86400000, // 24 * 60 * 60 * 1000
		weeks: 604800000, // 7 * 24 * 60 * 60 * 1000
		months: 2592000000, // 30 * 24 * 60 * 60 * 1000
		years: 31536000000 // 365 * 24 * 60 * 60 * 1000
	}
};