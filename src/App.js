import "./App.css";
import axios from "axios";
import { useState, useEffect } from "react";
import CurrencyRow from "./CurrencyRow";

function App() {
  const url =
    "https://api.apilayer.com/exchangerates_data/latest?apikey=DlSfPaUOUJSuc8jiNqcmcRFBKP2xEwbk&base=USD&symbols";
  const apikey = "DlSfPaUOUJSuc8jiNqcmcRFBKP2xEwbk";

  const [currencyOptions, setCurrencyOptions] = useState([]);
  const [fromCurrency, setFromCurrency] = useState();
  const [toCurrency, setToCurrency] = useState();
  const [rate, setRate] = useState();
  const [amount, setAmount] = useState(1);
  const [amountInFromCurrency, setAmountInFromCurrency] = useState(true);

  let fromAmount, toAmount;
  if (amountInFromCurrency) {
    fromAmount = amount;
    toAmount = amount * rate;
  } else {
    toAmount = amount;
    fromAmount = amount / rate;
  }

  useEffect(() => {
    axios
      .get(url, {
        headers: {
          apikey: apikey,
        },
      })
      .then((res) => {
        const firstCurrency = Object.keys(res.data.rates)[43];
        setCurrencyOptions([res.data.base, ...Object.keys(res.data.rates)]);
        setFromCurrency(res.data.base);
        setToCurrency(firstCurrency);
      });
  }, []);

  useEffect(() => {
    axios
      .get(
        `https://api.apilayer.com/exchangerates_data/latest?apikey=DlSfPaUOUJSuc8jiNqcmcRFBKP2xEwbk&base=${fromCurrency}&symbols=${toCurrency}`
      )
      .then((res) => {
        return res;
      })
      .then((data) => {
        setRate(Object.values(data.data.rates));
        console.log(Object.values(rate));
      });
  }, [fromCurrency, toCurrency]);

  function handleFromAmountChange(e) {
    setAmount(e.target.value);
    setAmountInFromCurrency(true);
  }

  function handleToAmountChange(e) {
    setAmount(e.target.value);
    setAmountInFromCurrency(false);
  }

  return (
    <div className="main">
      <h1>Convert</h1>
      <CurrencyRow
        currencyOptions={currencyOptions}
        selectedCurrency={fromCurrency}
        onChangeCurrency={(e) => setFromCurrency(e.target.value)}
        onChangeInput={handleFromAmountChange}
        amount={fromAmount}
      />
      <span className="equals">=</span>
      <CurrencyRow
        currencyOptions={currencyOptions}
        selectedCurrency={toCurrency}
        onChangeCurrency={(e) => setToCurrency(e.target.value)}
        onChangeInput={handleToAmountChange}
        amount={toAmount}
      />
    </div>
  );
}

export default App;
