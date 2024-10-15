import React, { useState } from 'react'
import '../css/currency.css'
import { FaRegArrowAltCircleRight } from "react-icons/fa";
import axios from 'axios';

const BASE_URL = 'https://api.freecurrencyapi.com/v1/latest';
const API_KEY = 'fca_live_IFuNYwudRYuzTbXDGn4ygV8aTIiglNEPUxfJI0b4';

const currencySymbols = {
    USD: '$',
    EUR: '€',
    RUB: '₽',
    TRY: '₺',
    AUD: 'A$',
    CZK: 'Kč',
    BGN: 'лв',
    BRL: 'R$',
    JPY: '¥',
    KRW: '₩',
    SEK: 'kr',
    PLN: 'zł',
};

function Currency() {

    const [amount, setAmount] = useState('');
    const [from, setFrom] = useState('USD');
    const [to, setTo] = useState('EUR');
    const [result, setResult] = useState('');

    const handleAmountChange = (e) => {
        const value = e.target.value.replace(/[^\d.]/g, '');
        setAmount(value);
    }

    const exchange = async () => {
        const response = await axios(`${BASE_URL}?apikey=${API_KEY}&base_currency=${from}`);
        const result = ((response.data.data[to]) * amount).toFixed(3);
        setResult(result);
    }

    return (
        <div className='container'>
            <div className='title' style={{ fontFamily: 'sans-serif', textAlign: 'center', backgroundColor: '#0A2F52', color: 'white', width: '100%' }}>
                <h2>EXCHANGE - <span style={{backgroundColor:'white', color:'#0A2F52' }}>RATE</span></h2>
            </div>
            <div className='currency'>
                <input
                    type="text"
                    className="amount"
                    placeholder={currencySymbols[from]}
                    value={amount ? `${currencySymbols[from]} ${amount}` : ''}
                    onChange={handleAmountChange}
                    style={{ fontSize: '18px' }}
                />

                <style>
                    {`
                    input[type="number"]::-webkit-inner-spin-button,
                    input[type="number"]::-webkit-outer-spin-button {
                        -webkit-appearance: none;
                        margin: 0;
                    }
                `}
                </style>
                <select className='from' onChange={(e) => setFrom(e.target.value)}>
                    <option>USD</option>
                    <option>RUB</option>
                    <option>TRY</option>
                    <option>EUR</option>
                    <option>AUD</option>
                    <option>CZK</option>
                    <option>BGN</option>
                    <option>BRL</option>
                    <option>JPY</option>
                    <option>KRW</option>
                    <option>SEK</option>
                    <option>PLN</option>
                    <option>PLN</option>
                </select>
                <FaRegArrowAltCircleRight style={{ fontSize: '30px', marginRight: '10px', color: '#0A2F52' }} />
                <select className='to' onChange={(e) => setTo(e.target.value)}>
                    <option>EUR</option>
                    <option>USD</option>
                    <option>TRY</option>
                    <option>RUB</option>
                    <option>AUD</option>
                    <option>CZK</option>
                    <option>BGN</option>
                    <option>BRL</option>
                    <option>JPY</option>
                    <option>KRW</option>
                    <option>SEK</option>
                    <option>PLN</option>
                    <option>PLN</option>
                </select>
                <input
                    type="text"
                    className='result'
                    placeholder={currencySymbols[to]}
                    value={result ? `${currencySymbols[to]} ${result}` : ''}
                    readOnly
                    style={{ fontSize: '18px' }}
                />
            </div>
            <div>
                <button onClick={exchange}>Change</button>
            </div>
        </div>
    )
}

export default Currency