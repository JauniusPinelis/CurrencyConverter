class Main extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            currencies: [],
            currencyFrom: '',
            currencyTo: '',
            amount: '1',
            output: '',
            url: "/api/getCurrencies",
            submitUrl: '/api/calculate'
        }

        this.handleChange = this.handleChange.bind(this);
        this.handleCurrencyFromChange = this.handleCurrencyFromChange.bind(this);
        this.handleCurrencyToChange = this.handleCurrencyToChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }
    createDropdowns(active, fnc) {
        let rows = [];
        for (key in this.state.currencies) {
            if (this.state.currencies[key] == active) {
                rows.push(<MenuItem onClick={fnc} active key={key} >{this.state.currencies[key]}</MenuItem>);
            }
            else {
                rows.push(<MenuItem onClick={fnc} key={key}>{this.state.currencies[key]}</MenuItem>);
            }
        }
        return rows;
    }
    handleChange(event) {
        this.setState({ amount: event.target.value }, () => {
            this.handleSubmit();
        });
    }
    handleCurrencyFromChange(event) {
        this.setState({ currencyFrom: event.target.innerText }, () => {
            this.handleSubmit();
        });
    }
    handleCurrencyToChange(event) {
        this.setState({ currencyTo: event.target.innerText }, () => {
            this.handleSubmit();
        });
    }

    handleSubmit() {
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
            .then((response) => {
                if (response.statusText == "OK") {
                    this.setState({ "output": response.data });
                }
            })
            .catch(error => {
                console.log(error);
            });
    }
    getCurrencies() {
        const xhr = new XMLHttpRequest();
        xhr.open('get', this.state.url, true);
        xhr.onload = () => {
            const data = JSON.parse(xhr.responseText);
            this.setState({ currencies: data });
            if (this.state.currencies != null && this.state.currencies.length) {
                this.setState({ "currencyFrom": data[0] })
                this.setState({ "currencyTo": data[1] }, () => {
                    this.handleSubmit();
                })
            }
        };
        xhr.send();
    }
    componentWillMount() {
        this.getCurrencies();

    }
    render() {
        return (
            <div className="main">
                <div className="container">
                    <div className="text-center">
                        <h2>Currency Converter</h2>
                    </div>
                    <Form horizontal>
                        <FormGroup controlId="formHorizontalEmail">
                            <Col componentClass={ControlLabel} sm={2}>
                                From
                            </Col>
                            <Col sm={7}>
                                <FormControl value={this.state.amount} onChange={this.handleChange} type="number" />
                            </Col>
                            <Col sm={3}>
                                <DropdownButton
                                    id="input-dropdown-addon"
                                    title={this.state.currencyFrom}
                                >
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
                                <FormControl readOnly value={this.state.output} type="text" />
                            </Col>
                            <Col sm={3}>
                                <DropdownButton
                                    id="input-dropdown-addon"
                                    title={this.state.currencyTo}
                                >
                                    {this.createDropdowns(this.state.currencyTo, this.handleCurrencyToChange)}
                                </DropdownButton>
                            </Col>
                        </FormGroup>
                    </Form>;
                </div>
            </div>
        );
    }
}

ReactDOM.render(
    React.createElement(Main, null),
    document.getElementById('content'),
);