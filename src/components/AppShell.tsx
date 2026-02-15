import React from "react";
import { Outlet, useNavigate, useLocation } from "react-router-dom";
import {
  ShellBar,
  SideNavigation,
  SideNavigationItem,
} from "@ui5/webcomponents-react";
import "@ui5/webcomponents-icons/dist/product.js";
import "@ui5/webcomponents-icons/dist/category.js";
import "@ui5/webcomponents-icons/dist/supplier.js";

export function AppShell() {
  const navigate = useNavigate();
  const location = useLocation();

  return (
    <div style={{ display: "flex", flexDirection: "column", height: "100vh" }}>
      <ShellBar primaryTitle="Catalog Admin" />
      <div style={{ display: "flex", flex: 1, overflow: "hidden" }}>
        <SideNavigation
          style={{ width: "240px" }}
          onSelectionChange={(e: any) => {
            const path = e.detail.item.dataset.path;
            if (path) navigate(path);
          }}
        >
          <SideNavigationItem
            text="Products"
            icon="product"
            data-path="/products"
            selected={location.pathname === "/products"}
          />
          <SideNavigationItem
            text="Categories"
            icon="category"
            data-path="/categories"
            selected={location.pathname === "/categories"}
          />
          <SideNavigationItem
            text="Suppliers"
            icon="supplier"
            data-path="/suppliers"
            selected={location.pathname === "/suppliers"}
          />
        </SideNavigation>
        <div style={{ flex: 1, overflow: "hidden" }}>
          <Outlet />
        </div>
      </div>
    </div>
  );
}
