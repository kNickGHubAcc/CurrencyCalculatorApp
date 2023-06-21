const {currencies, exchangeRates} = require('./initialData')


//Προσθήκη νέου ζευγαριού ανταλλαγής νομισμάτων στον πίνακα exchangeRates
const addNewPair = async (req, res) => {
    let from = req.body.from
    let to = req.body.to
    let rate = req.body.rate

    if (isNaN(rate)) {
        res.status(405).send('Ratio must be real number')
        return
    }
    if (from != '' && from != undefined && to != '' && to != undefined && rate != '' && rate != undefined) 
    {
        if (from === to) {
            res.status(405).send('You Cant Add Two Times The Same Currency!')
            return
        }
        const results = getRates(from, to)
        if (results == 0) {
            exchangeRates.push({
                from: from,
                to: to,
                rate: rate
            })
            if (!currencies.includes(from)) {
                currencies.push(from)
            }
            if (!currencies.includes(to)) {
                currencies.push(to)
            }
        } else {
            res.status(405).send('There is already a similar pair!')
            return
        }
    } else {
        res.status(405).send('Please Fill All Inputs!')
        return
    }
    res.status(200).send('Pair Added Successfully!')
}


const updateRate = (from, to, rate) => {
    for (var i = 0; i < exchangeRates.length; i++) {
        if (exchangeRates[i].from == from && exchangeRates[i].to == to) {
            exchangeRates[i].rate = rate
            break
        }
    }
}


//Ενημερώνει το rate για ένα συγκεκριμένο ζευγάρι νομισμάτων του πίνακα exchangeRates
const updatePair = async (req, res) => {
    let from = req.body.from
    let to = req.body.to
    const rate = req.body.rate

    if (isNaN(rate)) {
        res.status(405).send('Ratio must be real number')
        return
    }
    if (from != '' && from != undefined && to != '' && to != undefined && rate != '' && rate != undefined) 
    {
        const results = getRates(from, to)
        if (results !== 0) {
            updateRate(from, to, rate)
        } 
    } else {
        res.status(405).send('Please choose pair!')
        return
    }
    res.status(200).send('Pair Updated Successfully!')
}


//Διαγράφει ένα ζευγάρι νομισμάτων από τον πίνακα exchangeRates
const deleteFromArray = (from, to) => {
    for (var i = 0; i < exchangeRates.length; i++) {
        if (exchangeRates[i].from == from && exchangeRates[i].to == to) {
            exchangeRates.splice(i, 1)
            break
        }
    }
}


//Ελέγχει αν το νόμισμα που δέχεται ως παράμετρο υπάρχει στα from ή to
//του πίνακα exchangeRates. Αν όχι ελέγχει στον πίνακα currencies και αν το βρει, το διαγράφει
const checkCurrencyInPairsAndDelete = (value) => {
    const from_arr = exchangeRates.filter((name) => name.from === value)
    const to_arr = exchangeRates.filter((name) => name.to === value)

    if (from_arr.length === 0) {
        if (to_arr.length === 0) {
            for (var i = 0; i < currencies.length; i++) {
                if (currencies[i] == value) {
                    currencies.splice(i, 1)
                    break
                }
            }
        }
    }
}


//Διαγράφει ένα ζεύγος συναλλάγματος από τον πίνακα exChangeRates
const deletePair = async (req, res) => {
    let from = req.body.from
    let to = req.body.to

    if (from != '' && from != undefined && to != '' && to != undefined) 
    {
        const results = getRates(from, to)
        if (results !== 0) {
            deleteFromArray(from, to)
            checkCurrencyInPairsAndDelete(from)
            checkCurrencyInPairsAndDelete(to)
        } else {
            res.status(200).send('Pair Not Found To Delete!!')
            return
        }
    } else {
        res.status(200).send('Please Fill All Inputs!')
        return
    }
    res.status(200).send('Pair Deleted Successfully!')
}


//Επιστρέφει το rate μεταξύ συναλλαγματικού ζεύγους from-to ή το 1/rate μεταξύ του συναλλαγματικού ζεύγους to-from
const getRates = (from, to) => {
    const from_arr = exchangeRates.filter((name) => name.from === from)
    const to_arr = from_arr.filter((name) => name.to === to)

    if (to_arr.length > 0) {
        let converteValue = Number(to_arr[0].rate).toFixed(4)
        return converteValue
    } else {
        const check_from_sec_arr = exchangeRates.filter((name) => name.from === to)
        const check_to_arr = check_from_sec_arr.filter((name) => name.to === from)
        if (check_to_arr.length > 0) {
            let converteValue = 1 / check_to_arr[0].rate
            converteValue = Number(converteValue).toFixed(4)
            return converteValue
        }
        return 0
    }
}


//Υπολογίζει το μετατραπέν ποσό ενός συναλλαγματικού ζεύγους
const getConverteCurrencies = async (req, res) => {
    const amount = req.body.amount
    const from = req.body.from
    const to = req.body.to

    if (isNaN(amount)) {
        res.send('Amount must be real number')
        return
    }
    if (from === to) {
        res.send(`${amount} ${from} ➙ ${amount} ${to}`)
        return
    }

    const rates = getRates(from, to)
    if (rates != 0 && amount != undefined && amount != '') {
        let converted = amount * rates
        converted = Number(converted).toFixed(4)
        res.send(`${amount} ${from} ➙ ${converted} ${to}`)
    } else {
        res.send(`Pair (${from}/${to}) Not Found In Database!`)
    }
}


//Επιστρέφει τον πίνακα currencies ως response στον client
const getCurrencies = (req, res) => {
    res.send(currencies)
}


//Επιστρέφει τον πίνακα exchangeRates ως response στον client
const getPairs = async (req, res) => {
    res.send(exchangeRates)
}

module.exports = {getCurrencies,getPairs,getConverteCurrencies,addNewPair,updatePair,deletePair}