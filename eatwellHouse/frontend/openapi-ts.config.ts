import { defineConfig } from "@hey-api/openapi-ts";

export default defineConfig({
  input: "http://localhost:3000/swagger.json",
  output: "src/api",
  plugins: ["@hey-api/client-fetch", "@tanstack/react-query"],
});
