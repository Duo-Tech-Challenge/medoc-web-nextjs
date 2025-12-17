/**
 * User Service
 * Logique métier pour les utilisateurs
 */

import type { UserDTO, CreateUserDTO, LoginUserDTO } from '@/types/user';
import { userRepository } from '@/app/api/v1/repositories/index';
import { ApiError, ErrorCode } from '@/types/api';
import { validateEmail, validatePassword } from '@/lib/validators';

export class UserService {
  async registerUser(dto: CreateUserDTO): Promise<UserDTO> {
    // Valider email
    if (!validateEmail(dto.email)) {
      throw new ApiError(ErrorCode.BAD_REQUEST, 'Invalid email format');
    }

    // Valider password
    const passwordValidation = validatePassword(dto.password);
    if (!passwordValidation.valid) {
      throw new ApiError(
        ErrorCode.BAD_REQUEST,
        'Password does not meet requirements',
        { password: passwordValidation.errors }
      );
    }

    // Vérifier doublons
    const existing = await userRepository.findByEmail(dto.email);
    if (existing) {
      throw new ApiError(
        ErrorCode.CONFLICT,
        'A user with this email already exists'
      );
    }

    // TODO: Hasher le password avec bcrypt
    const passwordHash = dto.password; // Temp - à remplacer par bcrypt
    return userRepository.createFromDTO(dto, passwordHash);
  }

  async loginUser(dto: LoginUserDTO): Promise<UserDTO> {
    const user = await userRepository.findByEmail(dto.email);
    if (!user) {
      throw new ApiError(ErrorCode.UNAUTHORIZED, 'Invalid credentials');
    }

    // TODO: Vérifier password avec bcrypt
    // const validPassword = await bcrypt.compare(dto.password, user.passwordHash);
    // if (!validPassword) {
    //   throw new ApiError(ErrorCode.UNAUTHORIZED, 'Invalid credentials');
    // }

    return user;
  }

  async getUserById(id: string): Promise<UserDTO> {
    const user = await userRepository.findById(id);
    if (!user) {
      throw new ApiError(ErrorCode.NOT_FOUND, 'User not found');
    }
    return user;
  }

  async getUserByEmail(email: string): Promise<UserDTO> {
    const user = await userRepository.findByEmail(email);
    if (!user) {
      throw new ApiError(ErrorCode.NOT_FOUND, 'User not found');
    }
    return user;
  }
}

export const userService = new UserService();
