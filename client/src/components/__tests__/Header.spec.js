import React from "react";
import { withRouter } from "react-router-dom";
import { render, cleanup } from "react-testing-library";

import Header from "../Header";

// Automatically unmount and cleanup DOM after the test is finished
afterEach(cleanup);

describe("Header Component", () => {
  describe("isOpen", () => {
    test("isOpen state changes from false to true", () => {
      const { container } = render(withRouter(<Header />));
      const button = container.firstChild;
      console.log(button);
    });
  });
});
