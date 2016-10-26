import Inferno from 'inferno';
import InfernoDOM from 'inferno-dom';
import Ticker from './Ticker.js';
const Stock = (props) => {
    console.log(props.ok.money);
    return <span> {props.ok.money}</span>

}
module.exports = Stock;
