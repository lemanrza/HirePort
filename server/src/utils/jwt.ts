import jwt, { Secret, SignOptions, JwtPayload } from "jsonwebtoken";
import config from "../config/config.js";

const getSecretKey = (secretKey: unknown): Secret => {
    if (typeof secretKey !== "string") {
        throw new Error("JWT_SECRET_KEY must be a valid string.");
    }
    return secretKey;
};

// Generate Token
export const generateAccessToken = (payload: object, expiresIn: string = "15m"): string => {
    const secretKey: Secret = getSecretKey(config.JWT_ACCESS_SECRET_KEY);
    const options: SignOptions = { expiresIn: expiresIn as jwt.SignOptions["expiresIn"] };
    return jwt.sign(payload, secretKey, options);
};

// Generate Refresh Token
export const generateRefreshToken = (payload: object, expiresIn: string = "7d"): string => {
    const secretKey: Secret = getSecretKey(config.JWT_REFRESH_SECRET_KEY);
    const options: SignOptions = { expiresIn: expiresIn as jwt.SignOptions["expiresIn"] };
    return jwt.sign(payload, secretKey, options);
};

// Verify Access Token
export const verifyAccessToken = (token: string): JwtPayload | string | null => {
    try {
        const secretKey: Secret = getSecretKey(config.JWT_ACCESS_SECRET_KEY);
        return jwt.verify(token, secretKey);
    } catch {
        return null;
    }
};

// Verify Refresh Token
export const verifyRefreshToken = (token: string): JwtPayload | string | null => {
    try {
        const secretKey: Secret = getSecretKey(config.JWT_REFRESH_SECRET_KEY);
        return jwt.verify(token, secretKey);
    } catch {
        return null;
    }
};
