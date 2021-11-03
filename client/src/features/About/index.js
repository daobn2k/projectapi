import React from "react";
import About from "../../components/about/about";

export default function AboutPage({ getListCart }) {
  return (
    <>
      <About getListCart={getListCart} />
    </>
  );
}
