export interface Logo {
  url: string;
  public_id?: string;
}

export interface Banner {
  url: string;
  public_id?: string;
}

export interface CompanySocials {
  linkedin?: string | null;
  instagram?: string | null;
}

export interface Company {
  id: string;
  name: string;
  email: string;
  password?: string;
  hrNumber: string;
  hrName: string;
  about?: string | null;
  website?: string | null;
  locations: string[];
  employees?: string[]; // Employee ObjectId list
  logo: Logo;
  banner: Banner;
  status: "pending" | "approved" | "rejected";
  forcePasswordReset: boolean;
  socials: CompanySocials;
  isApproved: boolean;
  isPhoneVerified: boolean;
  otpCode?: string | null;
  otpExpires?: Date | null;
  createdAt?: string;
  updatedAt?: string;
}
