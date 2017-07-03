// Array Ext
$.extend(Array.prototype, {

	//remove same 
	strip: function() {
		if (this.length < 1) return [];
		if (this.length < 2) return [this[0]];
		var arr = [];
		for (var i = 0; i < this.length; i++) {
			arr.push(this.splice(i--, 1));
			for (var j = 0; j < this.length; j++) {
				if (this[j] == arr[arr.length - 1]) {
					this.splice(j--, 1);
				}
			}
		}
		return arr;
	},
	
	//look content is same
	contains : function(o){
		
		if(!o)
			return false;
			
		var len = this.length;
		for (var index = 0; index < len; index ++ ) { 
			var a = this[index];
			if(a != Eye.empty && a.toString() == o.toString()) return true;
		}
				
		return false;	
	},

	indexOf : function(o) {
		return $.inArray(o, this);
	},
	
	equals : function(o) {
		return $.inArray(o, this) != -1;
	},
	
	getIndex : function(o) {
		return $.inArray(o, this);
	},

	remove : function() {
		var args = [];
		var args = args.concat.apply(args,arguments);	

		var len = args.length;
		for (var i = 0; i < len; i ++ ) { 
			var index = $.inArray(args[i], this);
			if(index != -1) this.splice(index, 1);
		}	
				
		return args;		
	},
	
	removeAt : function(index) {
		if(!this.isIndex(index))
			return;
			
		return this.splice(index, 1)[0];
	},
	
	update : function(s,t) {
		var index = $.inArray(t, this);
		if (index != -1) {
			this.splice(index,1,s);
		}
		return this;
	},
	
	add : function() {
		var args = [];
		var args = args.concat.apply(args,arguments);	

		var len = args.length;
		for (var index = 0; index < len; index ++ ) { 
			this.push(args[index]);
		}					
		
		return args;

	},
	
	addAt : function(v,index) {
		if(!this.isIndex(index))
			return;
					
		this.splice(index,0,v);		
	},
	
	move : function(v,isDown) {
		var index = $.inArray(v, this);
		if(index != -1) this.moveAt(index,isDown);
	},
	
	moveAt : function(index,isDown) {
		
		var selectIndex = index;
		selectIndex = isDown ? selectIndex + 1 : selectIndex - 1;
		
		if(this.isIndex(selectIndex)) {
			var v = this.removeAt(selectIndex);
			index != this.length  ? this.addAt(v,index) : this.push(v);
			return selectIndex;
		}
		
		return index;
	},
	
	isIndex : function(index) {
		return index >=0 && index < this.length;
	},

	isEmpty : function() {
		return this.length == 0;
	},
			
	change : function(s,t) {
		var sIndex = $.inArray(s, this);
		var tIndex = $.inArray(t, this);
		
		if(sIndex == -1 || tIndex == -1)
			return;
		
		this.changeAt(sIndex,tIndex);
	},
	
	changeAt : function(sIndex,tIndex) {
		var v = this.removeAt(tIndex);
		this.addAt(v,sIndex);
	},
	
	indexAt : function(value,pField) {
		
		if(pField) {
			var len = this.length;
			var index = -1;
			for (var i = 0; i < len; i ++ ) {
				if(this[i][pField] == value) {
					index = i;
					break;
				}
			}
			return index;
		}
		return this.indexOf(value);
	},
	
	indexAtValue : function(value,pField,vField) {
		var index = this.indexAt(value,pField);
		return this.isIndex(index) && vField ? this[index][vField] : Eye.empty;
	},
	
	sortField : function(field,isDec){
		return this.sort(
			function(a, b) {
				if(a[field] && a[field]) {
					if(a[field] > b[field]) return isDec ? -1 : 1;
					if(a[field] < b[field]) return isDec ? 1 : -1;
				}
				return 1;
			}
		);	
	},
	
	toField : function(field) {
		var res = [];
		var len = this.length;
		for (var index = 0; index < len; index ++ ) 
			res.push(this[index][field]);
		return res;	
	},

	toFieldFilter : function(filter) {
		var res = [];
		
		if(typeof filter === 'function') {
			var len = this.length,d,field;
			for (var index = 0; index < len; index ++ ) {
				d = this[index];
				field = filter.call(this,d,index)
				if(field)
					res.push(d[field]);		
			}
		}
		return res;	
	},	
	
	filter : function(filter) {
		
		if(typeof filter === 'function') {
			
			var res = [];
			var len = this.length;
			for (var i= 0; i < len; i ++ ) {
				var d = this[i];
				if(filter.call(this,d,i)) res.push(d);		
			}	
			return res;		
		}
		return this;
		
	},
	
	search : function(v,f) {
		var res = [];
		var len = this.length;
		for (var index = 0; index < len; index ++ ) {
			var d = this[index];
			if(f && $.isPlainObject(d) && d[f] == v) {
				res.push(d);
			}
			else if(d == v) {
				res.push(d);
			}		
		}
		return res;
	}

});













