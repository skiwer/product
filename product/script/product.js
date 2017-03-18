/* --FilterableProductTable
		--SearchBar
		--ProductTable
			--ProductCategoryRow
			--ProductRow
*/

//ProductRow
var ProductRow = React.createClass({
	render:function(){
		var name = this.props.product.stocked ? 
			this.props.product.name : 
			<span style={{color:"red"}}>{this.props.product.name}</span>;
		return (
			<tr>
				<td>{name}</td>
				<td>{this.props.product.price}</td>
			</tr>
		);
	}
});

//ProductCategoryRow
var ProductCategoryRow = React.createClass({
	render:function(){
		return (
			<tr>
				<th colSpan="2">{this.props.category}</th>
			</tr>
		);
	}
});

//ProductTable
var ProductTable = React.createClass({
	render:function(){
		var rows = [];
		var lastCategory = null;
		this.props.products.forEach(function(product){
			if(product.name.indexOf(this.props.search) === -1 || (!product.stocked && 
			this.props.inStockedOnly)){
				return;
			}
			if(product.category !== lastCategory){
				rows.push(<ProductCategoryRow category={product.category} key={product.category} />);
			}
			rows.push(<ProductRow product={product} key={product.name} />);
			lastCategory = product.category;
		}.bind(this));
		return (
			<table>
				<thead>
					<tr>
						<th>Name</th>
						<th>Price</th>
					</tr>
				</thead>
				<tbody>
					{rows}
				</tbody>
			</table>
		);
	}
});

//SearchBar
var SearchBar = React.createClass({
	handleChange:function(){
		var searchInput = this.refs.searchInput.value;
		var checked = this.refs.checkedValue.checked;
		this.props.onSearchChange(searchInput,checked);
	},
	render:function(){
		return (
			<form>
				<input type="text" onChange={this.handleChange} ref="searchInput" value={this.props.search} placeholder="search something here" />
				<p>
				<input type="checkbox" onChange={this.handleChange} ref="checkedValue" checked={this.props.inStockedOnly} />Only show products in stock</p>
			</form>
		);
	}
});

//FilterableProductTable
var FilterableProductTable = React.createClass({
	getInitialState:function(){
		return {
			search:"",
			inStockedOnly:false
		};
	},
	handleSearchChange:function(search,inStockedOnly){
		this.setState({
			search:search,
			inStockedOnly:inStockedOnly
		});
	},
	render:function(){
		return (
			<div>
				<SearchBar search={this.state.search} onSearchChange={this.handleSearchChange} inStockedOnly={this.state.inStockedOnly} />
				<ProductTable products={this.props.products} search={this.state.search} inStockedOnly={this.state.inStockedOnly} />
			</div>
		);
	}
});


var PRODUCTS = [
  {category: "Sporting Goods", price: "$49.99", stocked: true, name: "Football"},
  {category: "Sporting Goods", price: "$9.99", stocked: true, name: "Baseball"},
  {category: "Sporting Goods", price: "$29.99", stocked: false, name: "Basketball"},
  {category: "Electronics", price: "$99.99", stocked: true, name: "iPod Touch"},
  {category: "Electronics", price: "$399.99", stocked: false, name: "iPhone 5"},
  {category: "Electronics", price: "$199.99", stocked: true, name: "Nexus 7"}
];


ReactDOM.render(
	<FilterableProductTable products={PRODUCTS} />,
	document.getElementById("container")
);