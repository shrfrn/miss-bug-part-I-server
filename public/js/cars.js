'use strict'

async function onGetCars() {
    const elCars = document.querySelector('pre')

    const res = await fetch('/api/car')
    const cars = await res.json()

    elCars.innerText = JSON.stringify(cars, null, 2)
}