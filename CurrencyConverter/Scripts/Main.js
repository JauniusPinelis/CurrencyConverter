var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var Main = (function (_super) {
    __extends(Main, _super);
    function Main(props) {
        _super.call(this, props);
        this.state = {
            currencies: [],
            currencyFrom: '',
            currencyTo: '',
            amount: '1',
            output: '',
            url: "/api/getCurrencies",
            submitUrl: '/api/calculate'
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleCurrencyFromChange = this.handleCurrencyFromChange.bind(this);
        this.handleCurrencyToChange = this.handleCurrencyToChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }
    Main.prototype.createDropdowns = function (active, fnc) {
        var rows = [];
        for (key in this.state.currencies) {
            if (this.state.currencies[key] == active) {
                rows.push(<MenuItem onClick={fnc} active key={key}>{this.state.currencies[key]}</MenuItem>);
            }
            else {
                rows.push(<MenuItem onClick={fnc} key={key}>{this.state.currencies[key]}</MenuItem>);
            }
        }
        return rows;
    };
    Main.prototype.handleChange = function (event) {
        var _this = this;
        this.setState({ amount: event.target.value }, function () {
            _this.handleSubmit();
        });
    };
    Main.prototype.handleCurrencyFromChange = function (event) {
        var _this = this;
        this.setState({ currencyFrom: event.target.innerText }, function () {
            _this.handleSubmit();
        });
    };
    Main.prototype.handleCurrencyToChange = function (event) {
        var _this = this;
        this.setState({ currencyTo: event.target.innerText }, function () {
            _this.handleSubmit();
        });
    };
    Main.prototype.handleSubmit = function () {
        var _this = this;
        if (this.state.amount == "") {
            // No need to call backend - just set output to empty
            this.setState({ "output": "" });
        }
        self = this;
        axios.post(this.state.submitUrl, {
            currencyFrom: this.state.currencyFrom,
            currencyTo: this.state.currencyTo,
            amount: this.state.amount
        })
            .then(function (response) {
            if (response.statusText == "OK") {
                _this.setState({ "output": response.data });
            }
        })
            .catch(function (error) {
            console.log(error);
        });
    };
    Main.prototype.getCurrencies = function () {
        var _this = this;
        var xhr = new XMLHttpRequest();
        xhr.open('get', this.state.url, true);
        xhr.onload = function () {
            var data = JSON.parse(xhr.responseText);
            _this.setState({ currencies: data });
            if (_this.state.currencies != null && _this.state.currencies.length) {
                _this.setState({ "currencyFrom": data[0] });
                _this.setState({ "currencyTo": data[1] });
            }
        };
        xhr.send();
    };
    Main.prototype.componentWillMount = function () {
        this.getCurrencies();
    };
    Main.prototype.componentDidMount = function () {
        this.handleSubmit();
    };
    Main.prototype.render = function () {
        return (<div className="main">

                <div className="container">
                    <div className="text-center">
                        <h2>Currency Converter</h2>
                        <p> 1 Euros equals</p>
                        <h4>200 pounds</h4>
                    </div>

                    <Form horizontal>
                        <FormGroup controlId="formHorizontalEmail">
                            <Col componentClass={ControlLabel} sm={2}>
                                From
                            </Col>
                            <Col sm={7}>
                                <FormControl value={this.state.amount} onChange={this.handleChange} type="number"/>
                            </Col>
                            <Col sm={3}>
                                <DropdownButton id="input-dropdown-addon" title={this.state.currencyFrom}>
                                    {this.createDropdowns(this.state.currencyFrom, this.handleCurrencyFromChange)}
                                </DropdownButton>
                            </Col>
                        </FormGroup>

                        <h3 className="text-center"> = </h3>

                        <FormGroup controlId="formHorizontalPassword">
                            <Col componentClass={ControlLabel} sm={2}>
                                To
                            </Col>
                            <Col sm={7}>
                                <FormControl readOnly value={this.state.output} type="number"/>
                            </Col>
                            <Col sm={3}>
                                <DropdownButton id="input-dropdown-addon" title={this.state.currencyTo}>
                                    {this.createDropdowns(this.state.currencyTo, this.handleCurrencyToChange)}
                                </DropdownButton>
                            </Col>
                        </FormGroup>
                    </Form>;


                </div>
            </div>);
    };
    return Main;
}(React.Component));
ReactDOM.render(React.createElement(Main, null), document.getElementById('content'));
