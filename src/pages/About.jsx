import React, { useState } from 'react';
import { BsChevronDown, BsChevronUp } from 'react-icons/bs';
import { FAQ } from '@/constants';

/**
 * About component featuring an accordion-style FAQ section.
 * Only one question can be expanded at a time using 'showInfo' state.
 */
function About() {
  // Use null as initial state since we store the question number
  const [showInfo, setShowInfo] = useState(false);

  // Toggles FAQ visibility: closes if already open, otherwise opens selected
  function openAnswer(number) {
    setShowInfo((prev) => (prev === number ? null : number));
  }

  return (
    <div className="about h-100 pt-5">
      <h1 className="text-primary">Wszystko o "HelpHub":</h1>
      <div className="container">
        <div className="faq row">
          {FAQ.map(({ question, answer, number }) => (
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
                  {/* Conditional rendering: show answer if current question is active */}
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
