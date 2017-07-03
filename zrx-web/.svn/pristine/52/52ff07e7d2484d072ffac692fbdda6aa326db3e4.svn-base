

 var LocalStorage = function (name){
	if (!name) return false;
	this.name = name;
	if (!localStorage) return false;
	var store = localStorage.getItem(this.name);
	this.data = (store && JSON.decode(store)) || {};
 }

 $.extend(LocalStorage.prototype, {
	save: function() {
		localStorage.setItem(this.name, JSON.encode(this.data));
	},
	create: function(model) {
		if (!model.id) model.id = GUID.guid();
		this.data[model.id] = model;
		this.save();
		return model;
	},
	update: function(model) {
		this.data[model.id] = model;
		this.save();
		return model;
	},
	find: function(model) {
		return this.data[model.id];
	},
	findAll: function() {
		return this.data;
	},
	destroy: function(model) {
		delete this.data[model.id];
		this.save();
		return model;
	}
 });