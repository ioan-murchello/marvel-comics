import React, { useState } from 'react';
import './accordion.scss';

const Accordion = ({ title, children }) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleAccordion = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className='accordion'>
      <div className='accordion-header' onClick={toggleAccordion}>
        <button
          className={`accordion-button ${isOpen ? '' : 'collapsed'}`}
          type='button'
        >
          {title} 
          <span className='accordion-icon'>{isOpen ? '-' : '+'}</span>
        </button>
      </div>
      
        <div className={`accordion-collapse collapse ${isOpen? 'show' : ''}`}>
          {children}
        </div>
      
    </div>
  );
};
 

export default Accordion;
