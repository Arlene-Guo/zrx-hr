/**
 * 功能说明：产生GUID
 */
var GUID = {
	S4: function (){
		return (((1+Math.random())*0x10000)|0).toString(16).substring(1);
	},
	guid: function (){
		return (GUID.S4()+GUID.S4()+"-"+GUID.S4()+"-"+GUID.S4()+"-"+GUID.S4()+"-"+GUID.S4()+GUID.S4()+GUID.S4());
	}
};
