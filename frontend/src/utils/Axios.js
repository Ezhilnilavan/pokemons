import axios from "axios";
export const ENDPOINT = "http://localhost:4000/graphql/"

const headers = {
  "Content-Type": "application/json",
  'Content-Type': 'application/json',
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': '*',
  'Cache-Control': 'no-cache',
  'Pragma': 'no-cache',
  'Expires': '0',
};

export const useAxios = axios.create({
  headers
});