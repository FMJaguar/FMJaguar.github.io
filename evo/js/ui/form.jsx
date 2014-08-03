/** @jsx React.DOM */

var Container = React.createClass({
	mixins : [Backbone.React.Component.mixin],
	render : function () {
		return (
				<FindMe players={this.props.players}/>
		);
	}
});

var FindMe = React.createClass({
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
				<div>
				<br/><br/>
				<h4>Pool Times For all games:</h4>
				<ul className="table-view">
								<li className="table-view-cell">H Pools: 8am</li>
								<li className="table-view-cell">I Pools: 10am</li>
								<li className="table-view-cell">J Pools: Noon</li>
								<li className="table-view-cell">K Pools: 2pm</li>
								<li className="table-view-cell">L Pools: 4pm</li>
								<li className="table-view-cell">M Pools: 6pm</li>
								<li className="table-view-cell">N Pools: 8pm</li>
				</ul>
				</div>
		)
	},
	render: function () {
		var players = [];
		this.state.playerList.forEach(function(p) {
			players.push(<Player player={p} key={p.cid}/>);
		});
		return (
			<div>
				Enter a Name/Handle: <input type="text" name="name" value={this.state.name} onChange={this.onInputChanged} />
				<br/>
				{this.state.name ? "Results for: " + this.state.name : "Please enter a name above to search" }
				<br/>
				{players.length ? players : this.times()}
			</div>
		)
	}
});

var Player = React.createClass({
	mixins: [Backbone.React.Component.mixin],
	clearSearch: function() {
		this.setState({ name: "" });
	},
	render: function() {
		var pools = [];
		_.each(this.props.player.get('pools'), function(p, game) { 
			pools.push( <li className="pool"> {game.toUpperCase() } : {p.name} </li> );
		});
		return (
			<ul className="table-view">
				<li className="table-view-cell media">
							<a>
							<div className="media-body">
								<h5>{this.props.player.get('handle')} | {this.props.player.get('name')}</h5>
								<ul>
									{pools}
								</ul>
							</div>
							</a>
				</li>
			</ul>
		)
	}
});

		$(document).ready(function() {
			window.players = new Players();
			window.players.reset(window.playerData);
			React.renderComponent(new Container({players: window.players } ), document.getElementById('container'));
		});


