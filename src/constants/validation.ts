import * as yup from "yup";

export const searchSchema = yup.object({
  search: yup
    .string()
    .required("Search query cannot be empty")
    .min(2, "Minimum 2 characters are required for search"),
});
