import multer from "multer";

const storage = multer.memoryStorage(); // or diskStorage
export const upload = multer({ storage });
