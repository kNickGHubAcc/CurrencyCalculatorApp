const currencies = [
    'EURO',
    'US DOLLAR',
    'SWISS FRANC',
    'BRITISH POUND',
    'JPY',
    'CAD'
]

let exchangeRates = [
    {
        from: currencies[0],
        to: currencies[1],
        rate: '1.3764'
    },
    {
        from: currencies[0],
        to: currencies[2],
        rate: '1.2079'
    },
    {
        from: currencies[0],
        to: currencies[3],
        rate: '0.8731'
    },
    {
        from: currencies[1],
        to: currencies[4],
        rate: '76.7200'
    },
    {
        from: currencies[2],
        to: currencies[1],
        rate: '1.1379'
    },
    {
        from: currencies[3],
        to: currencies[5],
        rate: '1.5648'
    },
]

module.exports = {currencies, exchangeRates}