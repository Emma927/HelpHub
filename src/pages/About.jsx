import React, { useState } from 'react';
import { BsChevronDown, BsChevronUp } from 'react-icons/bs';
import { faq } from '@/constants';

/**
 * Komponent sekcji "O nas" z najczęściej zadawanymi pytaniami (FAQ).
 * - Renderuje listę pytań i odpowiedzi pobranych z `faq`.
 * - Pozwala użytkownikowi rozwijać i zwijać odpowiedzi, klikając ikonę.
 * - Jednocześnie rozwinięte może być tylko jedno pytanie (przechowywane w stanie `showInfo`).
 */
function About() {
  const [showInfo, setShowInfo] = useState(false);

  /**
   * Funkcja przełączająca rozwinięcie odpowiedzi:
   * - jeśli kliknięte pytanie jest już otwarte → zamyka je (ustawia `null`),
   * - w przeciwnym razie otwiera wybrane pytanie.
   */
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
