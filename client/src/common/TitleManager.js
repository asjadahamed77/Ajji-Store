import { useEffect } from "react";
import { useLocation } from "react-router-dom";

const titles = {
  "/": "Home | AjjiStore",
  "/login": "Login | AjjiStore",
  "/register-user": "Register | AjjiStore",
  "/cart": "My Cart | AjjiStore",
  "/checkout": "Checkout | AjjiStore",
  "/my-orders": "My Orders | AjjiStore",
};

export default function TitleManager() {
  const location = useLocation();

  useEffect(() => {
    // Default fallback title
    let pageTitle = "AjjiStore";

    // If route is exact match in our map
    if (titles[location.pathname]) {
      pageTitle = titles[location.pathname];
    }

    // For dynamic routes like product/:id or products/:category
    if (location.pathname.startsWith("/product/")) {
      pageTitle = "Product Details | AjjiStore";
    } else if (location.pathname.startsWith("/products/")) {
      pageTitle = "Products | AjjiStore";
    }

    document.title = pageTitle;
  }, [location]);

  return null;
}
