import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

// pages
import  { Main } from './pages/Main'
import { Repositorio } from './pages/Repository'

export function Rotas() {
  return (
    <>
    <BrowserRouter>
      <Routes>
        <Route exact path="/" element={ <Main /> } />
        <Route exact path="/repository/:id" element={ <Repositorio /> } />
      </Routes>
    </BrowserRouter>
    </>
  )
}
