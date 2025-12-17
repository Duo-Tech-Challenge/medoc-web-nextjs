/**
 * Types utilisateur (public + connecté)
 */

export interface UserDTO {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  role: 'user';
  createdAt: Date;
  updatedAt: Date;
}

export interface UserProfileDTO {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
}

export interface CreateUserDTO {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
}

export interface LoginUserDTO {
  email: string;
  password: string;
}

export interface AuthTokensDTO {
  accessToken: string;
  refreshToken: string;
}

export interface AuthResponseDTO {
  user: UserDTO;
  tokens: AuthTokensDTO;
}

export interface FavoriteDTO {
  id: string;
  userId: string;
  pharmacyId: string;
  medicationId?: string;
  createdAt: Date;
}
