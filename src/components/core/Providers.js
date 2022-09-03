import { LayoutProvider } from "../../hooks/useLayout";

import { createElement } from "react";

//* Usage:
// add a new [Provider] to the `combinedProviders` array
// to add a new context provider across the application.
const combinedProviders = [[LayoutProvider]];

//* Documentation:
// The following snippet is used to cascade
// the context providers down the tree.

const Providers = ({ children }) => {
  return combinedProviders.reduceRight(
    (a, c) => createElement(c[0], c[1], a),
    children
  );
};

export default Providers;
