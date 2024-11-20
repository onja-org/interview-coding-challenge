// frontend/src/api.js
const BASE_URL = "http://localhost:4000";

// User registration
export async function signUp(userData) {
  const response = await fetch(`${BASE_URL}/api/sign-up`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(userData),
  });
  return response.json();
}

// User login
export async function login(credentials) {
  const response = await fetch(`${BASE_URL}/api/log-in`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(credentials),
  });
  return response.json();
}

// Get products
export async function getProducts(token) {
  const response = await fetch(`${BASE_URL}/api/products`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.json();
}

// Create product
export async function createProduct(productData, token) {
  const response = await fetch(`${BASE_URL}/api/products`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(productData),
  });
  return response.json();
}
