import React, { useState } from 'react';
import { Form } from 'react-bootstrap';

const voivodeships = [
    {
        value: '',
        label: 'Wybierz województwo',
        isDisabled: true
    },
    {
        value: "dolnoslaskie",
        label: "Dolnośląskie"
    },
    {
        value: "kujawsko-pomorskie",
        label: "Kujawsko-Pomorskie"
    },
    {
        value: "lubelskie",
        label: "Lubelskie"
    },
    {
        value: "lubuskie", label: "Lubuskie"
    },
    {
        value: "lodzkie",
        label: "Łódzkie"
    },
    {
        value: "malopolskie",
        label: "Małopolskie"
    },
    {
        value: "mazowieckie",
        label: "Mazowieckie"
    },
    {
        value: "opolskie",
        label: "Opolskie"
    },
    {
        value: "podkarpackie",
        label: "Podkarpackie"
    },
    {
        value: "podlaskie",
        label: "Podlaskie"
    },
    {
        value: "pomorskie",
        label: "Pomorskie"
    },
    {
        value: "slaskie",
        label: "Śląskie"
    },
    {
        value: "swietokrzyskie",
        label: "Świętokrzyskie"
    },
    {
        value: "warminsko-mazurskie",
        label: "Warmińsko-Mazurskie"
    },
    {
        value: "wielkopolskie",
        label: "Wielkopolskie"
    },
    {
        value: "zachodniopomorskie",
        label: "Zachodniopomorskie"
    },
];


function SearchBar() {

    const [selectedOption, setSelectedOption] = useState("Wybierz województwo");

    return (
        <Form className="d-flex justify-content-center my-3 form__bar">

        </Form>
    );
}

export default SearchBar;
