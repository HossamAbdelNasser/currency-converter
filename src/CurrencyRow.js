import React from "react";
import "./App.css";

export default function CurrencyRow({
  currencyOptions,
  selectedCurrency,
  onChangeCurrency,
  onChangeInput,
  amount,
}) {
  return (
    <div>
      <input
        type="number"
        className="input"
        value={amount}
        onChange={onChangeInput}
      />
      <select value={selectedCurrency} onChange={onChangeCurrency}>
        {currencyOptions.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>
    </div>
  );
}
