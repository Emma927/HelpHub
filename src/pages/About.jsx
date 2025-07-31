import React, { useState } from 'react';
import { BsChevronDown, BsChevronUp } from 'react-icons/bs';

const faq = [
  {
    question: 'Kim jesteśmy?',
    answer:
      'HelpHub– to centralna aplikacja ogłoszeniowa, która łączy użytkowników ze wszystkimi organizacjami, instytucjami, schroniskami, prywatnymi działalnościami przeprowadzającymi zbiórki ubrań i akcesoriów w jednym miejscu. Umożliwia przeglądanie ogłoszeń o organizowanych zbiórkach przez wszystkie organizacje pomocowe w Polsce.',
    number: 1,
  },
  {
    question: 'Czy sami oragnizujemy zbiórki?',
    answer: 'Nie, my tworzy jeden punkt ogłoszeń dla zbiórek.',
    number: 2,
  },
  {
    question: 'Czy aplikacja jest bezpłatna?',
    answer: 'Tak. Nie pobieramy płatności za korzystanie z aplikacji',
    number: 3,
  },
  {
    question:
      'Kiedy pojawi się nowa wersja aplikacji z możliwością dodawania ogłoszeń?',
    answer: 'Najnowsze informacje będziemy publikowali w Nowościach',
    number: 4,
  },
];

function About() {
  const [showInfo, setShowInfo] = useState(false);

  function openAnswer(number) {
    setShowInfo((prev) => (prev === number ? null : number));
  }

  return (
    <div className="about h-100 pt-5">
      <h1 className="text-primary">Wszystko o "HelpHub":</h1>
      <div className="container">
        <div className="faq row">
          {faq.map(({ question, answer, number }) => (
            <React.Fragment key={question}>
              <div className="question col-12">
                <p className="font--resp">
                  Pytanie {number}: {question}
                </p>
                <button
                  onClick={() => openAnswer(number)}
                  className="btn pl-2 border-0 text-primary"
                  key={number}
                >
                  {showInfo === number ? (
                    <BsChevronUp
                      className={`logo-chev--resp ${showInfo === number ? 'rotate' : ''}`}
                    />
                  ) : (
                    <BsChevronDown className="logo-chev--resp" />
                  )}
                </button>
              </div>
              {showInfo === number && (
                <div className="answer font--resp text-primary">{answer}</div>
              )}
            </React.Fragment>
          ))}
        </div>
      </div>
    </div>
  );
}

export default About;
