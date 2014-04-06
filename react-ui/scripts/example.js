/** @jsx React.DOM */
var app = <div className="appClass">Hello, React!</div>;

var Container = React.createClass({
	render: function() {
		var style = {width: this.state.width, height: this.state.height};
		return <div 
			className="container"
			style = {style}
			>
				<Header/>
				<Footer/>
		       </div>
	},
	updateDimensions: function() {
		this.setState({ width: $(window).width(), height: $(window).height() });
	},
	componentWillMount: function() {
		this.updateDimensions();
	},
	componentDidMount: function() {
		window.addEventListener('resize', this.updateDimensions);
	},
	componentWillUnmount: function() {
		window.removeEventListener('resize', this.updateDimensions);
	}
});

var Footer = React.createClass({
	render: function() {
		var style = {width: this.state.width, height: this.state.height};
		return <div 
			className="footer"
			style = {style}
			>
		       </div>
	},
	updateDimensions: function() {
		this.setState({ width: $(window).width() , height: $(window).height() * .10 });
	},
	componentWillMount: function() {
		this.updateDimensions();
	},
	componentDidMount: function() {
		window.addEventListener('resize', this.updateDimensions);
	},
	componentWillUnmount: function() {
		window.removeEventListener('resize', this.updateDimensions);
	}
});
var Header = React.createClass({
	render: function() {
		var style = {width: this.state.width, height: this.state.height };
		return <div 
			className="header"
			style = {style}
			>
		       </div>
	},
	updateDimensions: function() {
		this.setState({ width: $(window).width() , height: $(window).height() * .10 });
	},
	componentWillMount: function() {
		this.updateDimensions();
	},
	componentDidMount: function() {
		window.addEventListener('resize', this.updateDimensions);
	},
	componentWillUnmount: function() {
		window.removeEventListener('resize', this.updateDimensions);
	}
});

var Window = React.createClass({
	render: function() {
		var style = {
			position: 'relative',
			width: this.state.width, 
			height: this.state.height,
			left: this.state.left,
			top: this.state.top
		};
		return <div className="window" style={style}>
		       </div>
	},
	updateDimensions: function() {
		var offset = 10;
		var newWidth = this.props.containerWidth - (offset * 2);
		var newHeight = this.props.containerHeight - (offset * 2);
		var left = offset;
		var top = offset;
		this.setState({ left: left , top: top, width:newWidth, height:newHeight });
	},
	componentWillMount: function() {
		this.updateDimensions();
	},
	componentDidMount: function() {
		window.addEventListener('resize', this.updateDimensions);
	},
	componentWillUnmount: function() {
		window.removeEventListener('resize', this.updateDimensions);
	}
});

React.renderComponent(Container(), document.getElementById('container'));
