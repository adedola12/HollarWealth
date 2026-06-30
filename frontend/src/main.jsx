// src/index.jsx  (or main.jsx)
import React      from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";

import "./index.css";
import App                 from "./App";
import { AuthProvider   }  from "./context/AuthContext";
import ShopContextProvider from "./context/ShopContext";
import { SearchProvider }  from "./context/SearchContext";
import { ThemeProvider }   from "./context/ThemeContext";

createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      <ThemeProvider>
        <AuthProvider>
          <ShopContextProvider>
            <SearchProvider>
              <App />
            </SearchProvider>
          </ShopContextProvider>
        </AuthProvider>
      </ThemeProvider>
    </BrowserRouter>
  </React.StrictMode>
);
