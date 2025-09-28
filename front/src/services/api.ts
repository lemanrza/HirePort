export const API_BASE_URL: string = import.meta.env.VITE_SERVER_URL;

const endpoints = {
  users: "/auth",
  company: "/company",
};

export default endpoints;
