import React from 'react';

// Here we are using object destructuring assignment to pluck off our variables from the props object
// We assign them to their own variable names
function Tabs({ currentTab, handleTabChange }) {
  return (
    <ul className="nav nav-tabs">
      <li className="nav-item">
        <button
          onClick={() => handleTabChange('Saved')}
          // This is a conditional (ternary) operator that checks to see if the current page is "Home"
          // If it is, we set the current page to 'nav-link-active', otherwise we set it to 'nav-link'
          className={currentTab === 'Saved' ? 'nav-link active' : 'nav-link text-secondary'}
        >
          Saved Jobs
        </button>
      </li>
      <li className="nav-item">
        <button
          onClick={() => handleTabChange('Applied')}
          // Check to see if the currentPage is `About`, and if so we use the active link class from bootstrap. Otherwise, we set it to a normal nav-link
          className={currentTab === 'Applied' ? 'nav-link active' : 'nav-link text-secondary'}
        >
          Applications
        </button>
      </li>
    </ul>
  );
}

export default Tabs;
