/** @jsx React.DOM */

var Container = React.createClass({displayName: 'Container',
	mixins : [Backbone.React.Component.mixin],
	render : function () {
		return (
				FindMe( {players:this.props.players})
		);
	}
});

var FindMe = React.createClass({displayName: 'FindMe',
	getInitialState: function() {
		return { name: "", playerList : [] }
	},
	getPlayers: function() {
		var name = this.state.name;
		this.setState({ playerList : this.props.players.searchByName(name) });
	},
	onInputChanged: function(e) {
		var self = this;
		var s = {};
		s[e.target.name] = e.target.value;
		this.setState(s);
		_.debounce(self.getPlayers, 100)();
	},
	mixins: [Backbone.React.Component.mixin],
	times: function () {
		return (
				React.DOM.div(null, 
				React.DOM.br(null),React.DOM.br(null),
				React.DOM.h4(null, "Pool Times For all games:"),
				React.DOM.ul( {className:"table-view"}, 
								React.DOM.li( {className:"table-view-cell"}, "H Pools: 8am"),
								React.DOM.li( {className:"table-view-cell"}, "I Pools: 10am"),
								React.DOM.li( {className:"table-view-cell"}, "J Pools: Noon"),
								React.DOM.li( {className:"table-view-cell"}, "K Pools: 2pm"),
								React.DOM.li( {className:"table-view-cell"}, "L Pools: 4pm"),
								React.DOM.li( {className:"table-view-cell"}, "M Pools: 6pm"),
								React.DOM.li( {className:"table-view-cell"}, "N Pools: 8pm")
				)
				)
		)
	},
	render: function () {
		var players = [];
		this.state.playerList.forEach(function(p) {
			players.push(Player( {player:p, key:p.cid}));
		});
		return (
			React.DOM.div(null, 
				"Enter a Name/Handle: ", React.DOM.input( {type:"text", name:"name", value:this.state.name, onChange:this.onInputChanged} ),
				React.DOM.br(null),
				this.state.name ? "Results for: " + this.state.name : "Please enter a name above to search", 
				React.DOM.br(null),
				players.length ? players : this.times()
			)
		)
	}
});

var Player = React.createClass({displayName: 'Player',
	mixins: [Backbone.React.Component.mixin],
	clearSearch: function() {
		this.setState({ name: "" });
	},
	render: function() {
		var pools = [];
		_.each(this.props.player.get('pools'), function(p, game) { 
			pools.push( React.DOM.li( {className:"pool"},  " ", game.toUpperCase(),  " : ", p.name, " " ) );
		});
		return (
			React.DOM.ul( {className:"table-view"}, 
				React.DOM.li( {className:"table-view-cell media"}, 
							React.DOM.a(null, 
							React.DOM.div( {className:"media-body"}, 
								React.DOM.h5(null, this.props.player.get('handle'), " | ", this.props.player.get('name')),
								React.DOM.ul(null, 
									pools
								)
							)
							)
				)
			)
		)
	}
});

		$(document).ready(function() {
			window.players = new Players();
			window.players.reset(window.playerData);
			React.renderComponent(new Container({players: window.players } ), document.getElementById('container'));
		});


