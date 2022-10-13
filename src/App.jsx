import React from "react";
import {
  Cart,
  FlexContent,
  Footer,
  Hero,
  Navbar,
  Sales,
  Stories,
} from "./components";
import {
  heroapi,
  popularsales,
  toprateslaes,
  highlight,
  sneaker,
  story,
  footerAPI,
} from "./data/data.js";

const App = () => {
  return (
    <>
      <Navbar />
      <Cart />
      <main className="flex flex-col gap-16 relative">
        <Hero heroapi={heroapi} />
        <Sales endpoint={popularsales} ifExist />
        <FlexContent endpoint={sneaker} ifExist />
        <Sales endpoint={toprateslaes} />
        <FlexContent endpoint={highlight} />
        <Stories story={story} />
      </main>
      <Footer endpoint={footerAPI} />
    </>
  );
};

export default App;
