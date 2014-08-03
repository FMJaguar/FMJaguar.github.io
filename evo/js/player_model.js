var Player = Backbone.Model.extend({});

var Players = Backbone.Collection.extend({
	model: Player
});

Players.prototype.searchByName = function(name) {
		if (name.trim() === "") {
			return [];
		};
		if (name.length < 3) {
			return [];
		};
	return this.filter(function(p) {
		return (
			p.get('handle').toLowerCase().indexOf(name.toLowerCase()) > -1 || 
			p.get('name').toLowerCase().indexOf(name.toLowerCase()) > -1
		)
	});
};


var Pool = Backbone.Model.extend({});

var Pools = Backbone.Collection.extend({
	model: Pool
});

Pools.prototype.searchByGame = function(game) {
	return this.filter(function(p) {
		
	});
};
