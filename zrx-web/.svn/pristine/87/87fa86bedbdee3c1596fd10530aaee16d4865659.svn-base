/**
 * 数据验证
 */

function Ver(config)
{
	//手机验证
	this.cell = function (cell){
		var test = /^0?1(([3,4,5,7,8]{1}[0-9]{1})|(5[0-9]{1})|(59)){1}[0-9]{8}$/;
		return test.test(cell);
	}
	//固话区号
	this.telCode = function (telCode){
		var test = /^(0[\d]{2,3})$/;
		return test.test(telCode);
	}
	//固话号码
	this.tel = function (tel){
		var test = /^\d{6,8}$/;
		return test.test(tel);
	}
	//固话区号加号码
	this.telAll = function (tel){
		var test = /^(0[\d]{2,3}-)?\d{6,8}(-\d{3,6})?$/;
		return test.test(tel);
	}
	//日期YYYY-MM-DD
	this.date = function (date){
		var test = /^(?:(?!0000)[0-9]{4}-(?:(?:0[1-9]|1[0-2])-(?:0[1-9]|1[0-9]|2[0-8])|(?:0[13-9]|1[0-2])-(?:29|30)|(?:0[13578]|1[02])-31)|(?:[0-9]{2}(?:0[48]|[2468][048]|[13579][26])|(?:0[48]|[2468][048]|[13579][26])00)-02-29)$/;
		return test.test(date);
	}
	//开始日期和结束日期
	this.rangeDate = function (dates){
		var start = dates.slice(0,10);
		var end = dates.slice(-10);
		var test = /(([0-9]{3}[1-9]|[0-9]{2}[1-9][0-9]{1}|[0-9]{1}[1-9][0-9]{2}|[1-9][0-9]{3})-(((0[13578]|1[02])-(0[1-9]|[12][0-9]|3[01]))|((0[469]|11)-(0[1-9]|[12][0-9]|30))|(02-(0[1-9]|[1][0-9]|2[0-8]))))|((([0-9]{2})(0[48]|[2468][048]|[13579][26])|((0[48]|[2468][048]|[3579][26])00))-02-29)/;
		return test.test(start) && test.test(end);
	}
	//电子邮件
	this.email = function (email){
		var test = /^[A-Za-z0-9]+(\.?[\w-]+)*@[\w-]+(\.[\w-]+)+$/;
		return test.test(email);
	}
	//url
	this.url = function (url){
		var test = /(((https?)|(ftp)):\/\/([\-\w]+\.)+\w{2,3}(\/[%\-\w]+(\.\w{2,})?)*(([\w\-\.\?\\\/+@&#;`~=%!]*)(\.\w{2,})?)*\/?)/i;
		return test.test(url);
	}
	//特殊字符
	this.charReg = function (ch){
		var test = /[!@#$%^&*?~\'\"]/;
		return test.test(ch);
	}
	//匹配由数字和26个英文字母组成的字符串
	this.letterAndNum = function (letterAndNum){
		var test = /^[A-Za-z0-9\s]+$/;
		return test.test(letterAndNum);
	}
	//匹配价格(整数和小数)
	this.price = function (price){
		var test = /^\d+[\.]?\d{0,2}$/;
		return test.test(price);
	}
	//匹配价格(整数和小数)
	this.priceNew = function (price){
		var test = /^\d+[\.]?\d{0,4}$/;
		return test.test(price);
	}
	//匹配价格(整数和小数包括负数)
	this.priceNewAll = function (price){
		var test = /^\d+[\.]?\d{0,4}$/;
		var test2 = /^(-\d)+[\.]?\d{0,4}$/;
		return test.test(price)||test2.test(price);
	}
	//正整数
	this.positiveInt = function (positiveInt){
		var test = /^[0-9]*[1-9][0-9]*$/;
		return test.test(positiveInt);
	}
	//非负整数
	this.nonnegativeInt = function (nonnegativeInt){
		var test = /^\d+$/;
		return test.test(nonnegativeInt);
	}
	//年份
	this.yearInt = function (year){
		var test = /^[\d]{4}$/;
		return test.test(year);
	}
	//日期YYYY-MM
	this.dateEx = function (date){
		var test = /([0-9]{3}[1-9]|[0-9]{2}[1-9][0-9]{1}|[0-9]{1}[1-9][0-9]{2}|[1-9][0-9]{3})-((0[1-9])|(1[012])){1}$/;
		return test.test(date);
	}
	//固话区号加号码加分机号
	this.telNum = function (tel){
		var test = /^(0[\d]{2,3}-)\d{6,8}(-\d{3,6})$/;
		return test.test(tel);
	}
	//正数和小数
	this.deduction = function (deduction){
		var test = /^(([1-9]{0,1}\d(\.\d{1,2})?)|100|100.00)$/;
		return test.test(deduction);
	}
	//整数（负数，0，正数）
	this.interger = function(interger){
		var test = /^-?[0-9]+$/;
		return test.test(interger);
	}
	//QQ号 (4-20位数字)  
	this.qqNum = function (qq){
		var test = /^[1-9][0-9]{4,20}$/;
		return test.test(qq);
	}
	//国际国内 固话 手机号 简单验证 只含有数字和"-"符号
	this.worldCell = function(worldCell){
		var test = /^[1-9]([0-9\-]+\d)?$/;
		return test.test(worldCell);
	}

	// 验证60
// 对于分钟,秒数,小时的校验的算法是一样的,本方法被复用
function IsValidNum(psSecond,num)
{
    var second  = new String(psSecond);

    if(second==null)
    {
        return false;
    }

    if(isNaN(second)==true)
    {
        return false;
    }

    if(second == "")
    {
        return true;
    }

    if(second.match(/[^0-9]/g)!=null)
    {
        return false;
    }

    var nSecond = parseInt(second, 10);

    if((nSecond < 0) || (num <= nSecond))
    {
        return false;
    }

    return true;
}


// 验证小时
	this.IsValidHour = function(hour) {
		return IsValidNum(hour,24);
	}

// 验证分钟
	this.IsValidMinute = function(minute) {
		return IsValidNum(minute,60);
	}

// 验证秒数
	this.IsValidSecond = function(second) {
		return IsValidNum(second,60);

	}
}

