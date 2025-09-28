export interface ProfileImage {
  url: string;
  public_id?: string;
}

export interface BackgroundImage {
  url: string;
  public_id?: string;
}

export interface CvFile {
  url: string | null;
  public_id?: string;
}

export interface Experience {
  company: string;
  role: string;
  from: Date;
  to: Date;
  desc: string;
}

export interface Education {
  school: string;
  degree: string;
  from: Date;
  to: Date;
}

export interface Profile {
  headline?: string;
  skills?: string[];
}

export interface Socials {
  linkedin?: string | null;
  instagram?: string | null;
  github?: string | null;
}

export interface User {
  id: string;
  email: string;
  fullName: string;
  username: string;
  password?: string; // backenddə hash-lanmış olacaq
  profileImage: ProfileImage;
  backgroundImage: BackgroundImage;
  isPremium: boolean;
  role: "USER" | "ADMIN";
  blockedUsers?: string[]; // ObjectId stringlər
  socials: Socials;
  bio?: string | null;
  location?: string | null;
  phoneNumber?: string | null;
  loginAttempts: number;
  lockUntil?: Date | null;
  isBanned: boolean;
  lastLogin?: Date | null;
  isVerified: boolean;
  provider: "local" | "google";
  providerId?: string | null;
  profile?: Profile;
  cvFiles?: CvFile[];
  experience?: Experience[];
  education?: Education[];
  profileViews?: string[]; // User ObjectId
  createdAt?: string;
  updatedAt?: string;
}
