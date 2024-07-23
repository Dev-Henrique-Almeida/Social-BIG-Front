"use client";
import axios from "axios";

const kBaseUrl = "https://social-big-back.vercel.app/";
export const api = axios.create({
  baseURL: kBaseUrl,
});

const configHeaders = {
  headers: {
    "Content-Type": "application/json",
  },
};

export { kBaseUrl, configHeaders };
