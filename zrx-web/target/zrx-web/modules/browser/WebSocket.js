

var webSocket = function (options){
	this.defaults = {
		domain: "localhost",
		port: 8080,
		protocol: ""
	}
	this.opts = $.extend(this.defaults,options);
	this.szServer = "ws://" + this.opts.domain + ":" + this.opts.port + "/" + this.opts.protocol;
	this.isOpen = false;
	this.startTime = 0;
	this.endTime = 0;
	this.socket = this.initialize();
	if (this.socket){
		this.listeners();
	}
}

 $.extend(webSocket.prototype, {
	initialize: function (){
		if(!("WebSocket" in window) && !("MozWebSocket" in window)){
			return false;
		}
		if(("MozWebSocket" in window)){
			return new MozWebSocket(this.szServer);
		}
		if(("WebSocket" in window)){
			return new WebSocket(this.szServer);
		}
	},
	listeners: function (){
		this.socket.onopen = this.opts.onOpen || $.noop;
		this.socket.onmessage = this.opts.onMessage || $.noop;
		this.socket.onerror = this.opts.onError || $.noop;
		this.socket.onclose = this.opts.onClose || $.noop;
	},
	onOpen: function (event){
		this.isOpen = true;
		if (this.opts.onOpen){
			this.opts.onOpen.call(this,event);
		}
	},
	onSend: function (msg){
		this.startTime = new Date().getTime();
		if (this.opts.onSend){
			this.opts.onSend.call(this,msg);
		}
		this.socket.send(msg);
	},
	onMessage: function (msg){
		this.endTime = new Date().getTime();
		if (this.opts.onMessage){
			this.opts.onMessage.call(this,msg,this.startTime,this.endTime);
		}
	},
	onError: function (event){
		if(this.opts.onError){
			this.opts.onError.call(this,event);
		}
	},
	onClose: function (event){
		if(this.opts.onClose){
			this.opts.onClose.call(this,event);
		}
		if (this.socket.close() != null){
			this.socket = null;
		}
	},
	send: function (data){
		if (!this.isOpen){
			return false;
		}
		this.onSend.call(this,data);
		return true;
	},
	close: function (){
		this.onClose();
	}
 });
