import React from "react";

// Here we are using object destructuring assignment to pluck off our variables from the props object
// We assign them to their own variable names
function Tabs({ currentTab, handleTabChange, tabNames }) {
  return (
    <ul className="nav nav-tabs flex-grow-1">
      {tabNames.map((tab, i) => {
        return (
          <li key={tab} className="nav-item">
            <button
              onClick={() => handleTabChange(tab)}
              // This is a conditional (ternary) operator that checks to see if the current page is "Home"
              // If it is, we set the current page to 'nav-link-active', otherwise we set it to 'nav-link'
              className={
                currentTab === tab
                  ? "nav-link active"
                  : "nav-link text-secondary"
              }
            >
              {tab}
            </button>
          </li>
        );
      })}
    </ul>
  );
}

export default Tabs;
