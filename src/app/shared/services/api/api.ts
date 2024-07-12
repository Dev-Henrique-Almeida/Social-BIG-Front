"use client";
import axios from "axios";

const kBaseUrl = "http://localhost:3001";
export const api = axios.create({
  baseURL: kBaseUrl,
});

const configHeaders = {
  headers: {
    "Content-Type": "application/json",
  },
};

export { kBaseUrl, configHeaders };
