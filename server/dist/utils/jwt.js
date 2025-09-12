import jwt from "jsonwebtoken";
import config from "../config/config";
const getSecretKey = (secretKey) => {
    if (typeof secretKey !== "string") {
        throw new Error("JWT_SECRET_KEY must be a valid string.");
    }
    return secretKey;
};
// Generate Token
export const generateAccessToken = (payload, expiresIn = "15m") => {
    const secretKey = getSecretKey(config.JWT_ACCESS_SECRET_KEY);
    const options = { expiresIn: expiresIn };
    return jwt.sign(payload, secretKey, options);
};
// Generate Refresh Token
export const generateRefreshToken = (payload, expiresIn = "7d") => {
    const secretKey = getSecretKey(config.JWT_REFRESH_SECRET_KEY);
    const options = { expiresIn: expiresIn };
    return jwt.sign(payload, secretKey, options);
};
// Verify Access Token
export const verifyAccessToken = (token) => {
    try {
        const secretKey = getSecretKey(config.JWT_ACCESS_SECRET_KEY);
        return jwt.verify(token, secretKey);
    }
    catch {
        return null;
    }
};
// Verify Refresh Token
export const verifyRefreshToken = (token) => {
    try {
        const secretKey = getSecretKey(config.JWT_REFRESH_SECRET_KEY);
        return jwt.verify(token, secretKey);
    }
    catch {
        return null;
    }
};
