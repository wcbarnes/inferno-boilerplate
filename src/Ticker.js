import Inferno from 'inferno';
import InfernoDOM from 'inferno-dom';
import Component from 'inferno-component';
import Stock from './stock';
import Search from './Search';
import 'whatwg-fetch';
import $ from 'jquery';
class Ticker extends Component {
  constructor (props) {
    super(props)
    this.buyStock = this.buyStock.bind(this);

    this.state = {
      stocks: [],
      money: 50000
    }
  }

  componentWillUnmount() {
    console.log('unmounting!');
  }

  buyStock (e) {
    e.preventDefault();
    const stock = document.getElementById('stockName').value;
    document.getElementById('stockName').value = "";
    console.log(stock);
    $.ajax({
      url: '/stock/' + stock.toUpperCase(),
      data: JSON.stringify({stock}),
      // errror : (err) =>
      success: (data) =>{
        console.log(data);
        //copy out this.state.stocks
        const newArr = this.state.stocks.slice(0);
        //push new object to copied aray
        newArr.push({
          'BuyPrice' : data.l_cur,
          'BuyTime' : data.lt,
          'BuyId' : data.id,
          'BuySymbol' : data.t
          });
          console.log(this);
        this.setState( {stocks: newArr})
        // this.setState({ testing: 'hello' })
        // this.setState({ stocks : newArr});
      },
    });
  }

  render () {
    return (
      <div>
      <form onSubmit={this.buyStock}>
          Stock Symbol:<br />
          <input type="text" id="stockName" placeholder="Enter Symbol"/>
      </form>
      {this.state.stocks}

      </div>
    )
  }
}






InfernoDOM.render(
  <Ticker/>,
  document.getElementById("app")
)
