import constants from "../constants";
import { getToken } from "./AuthService";

// Normalize host (remove trailing slashes) to avoid double-slash URLs
const HOST = String(constants.HOST || "http://localhost:8000/api").replace(
  /\/+$/,
  "",
);
const API_BASE = `${HOST}/users`;

// eslint-disable-next-line no-console
console.log("[UserService] Resolved HOST:", HOST, "API_BASE:", API_BASE);

const jsonHeaders = () => {
  const token = getToken();
  return {
    "Content-Type": "application/json",
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
  };
};

const handleResponse = async (response) => {
  const body = await response.json().catch(() => null);

  if (!response.ok) {
    const message =
      body?.message ||
      body?.error ||
      response.statusText ||
      "API request failed";
    throw new Error(message);
  }

  return body;
};

export const fetchUsers = async () => {
  const response = await fetch(API_BASE, {
    headers: jsonHeaders(),
  });
  return handleResponse(response);
};

export const createUser = async (user) => {
  const response = await fetch(`${API_BASE}/`, {
    method: "POST",
    headers: jsonHeaders(),
    body: JSON.stringify(user),
  });
  return handleResponse(response);
};

export const updateUser = async (id, user) => {
  const response = await fetch(`${API_BASE}/${id}`, {
    method: "PUT",
    headers: jsonHeaders(),
    body: JSON.stringify(user),
  });
  return handleResponse(response);
};

export const deleteUser = async (id) => {
  const response = await fetch(`${API_BASE}/${id}`, {
    method: "DELETE",
    headers: jsonHeaders(),
  });
  return handleResponse(response);
};

export const loginUser = async (credentials) => {
  const url = `${API_BASE}/login`;
  const body = JSON.stringify(credentials);
  const headers = jsonHeaders();

  // Helpful debug logs during development — remove or gate behind env check if needed
  try {
    // eslint-disable-next-line no-console
    console.log("[UserService] POST", url, { headers, body });

    const response = await fetch(url, {
      method: "POST",
      headers,
      body,
    });

    return handleResponse(response);
  } catch (err) {
    // Network-level error (DNS, refused connection, CORS preflight failure, etc.)
    // eslint-disable-next-line no-console
    console.error("[UserService] Network error when calling", url, err);
    throw new Error(
      `Cannot reach the backend API at ${HOST}. Make sure the server is running and accessible (check port and CORS).`,
    );
  }
};

export default {
  fetchUsers,
  createUser,
  updateUser,
  deleteUser,
  loginUser,
};
