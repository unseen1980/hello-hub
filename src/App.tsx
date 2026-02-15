import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { ThemeProvider } from "@ui5/webcomponents-react";
import { AppShell } from "./components/AppShell";
import { FioriAppFrame } from "./components/FioriAppFrame";

function App() {
  return (
    <ThemeProvider>
      <BrowserRouter>
        <Routes>
          <Route element={<AppShell />}>
            <Route path="/" element={<Navigate to="/products" replace />} />
            <Route
              path="/products"
              element={
                <FioriAppFrame
                  appPath="/fiori/products/webapp/index.html"
                  title="Products"
                />
              }
            />
            <Route
              path="/categories"
              element={
                <FioriAppFrame
                  appPath="/fiori/categories/webapp/index.html"
                  title="Categories"
                />
              }
            />
            <Route
              path="/suppliers"
              element={
                <FioriAppFrame
                  appPath="/fiori/suppliers/webapp/index.html"
                  title="Suppliers"
                />
              }
            />
          </Route>
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;
