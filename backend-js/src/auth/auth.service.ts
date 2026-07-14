import { Injectable, UnauthorizedException, BadRequestException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    private prisma: PrismaService,
    private jwtService: JwtService,
  ) {}

  async register(data: any) {
    const existingUser = await this.prisma.users.findUnique({
      where: { email: data.email },
    });
    if (existingUser) {
      throw new BadRequestException('El correo ya está en uso');
    }

    const hashedPassword = await bcrypt.hash(data.password, 10);
    const user = await this.prisma.users.create({
      data: {
        name: data.name,
        email: data.email,
        password: hashedPassword,
        created_at: new Date(),
        updated_at: new Date(),
      },
    });

    const payload = { email: user.email, sub: user.id };
    return {
      user: { id: user.id.toString(), name: user.name, email: user.email },
      token: this.jwtService.sign(payload),
    };
  }

  async login(data: any) {
    const user = await this.prisma.users.findUnique({
      where: { email: data.email },
    });
    if (!user) {
      throw new UnauthorizedException('Credenciales incorrectas');
    }

    const isPasswordValid = await bcrypt.compare(data.password, user.password);
    if (!isPasswordValid) {
      throw new UnauthorizedException('Credenciales incorrectas');
    }

    const payload = { email: user.email, sub: user.id };
    return {
      user: { id: user.id.toString(), name: user.name, email: user.email },
      token: this.jwtService.sign(payload),
    };
  }

  async updateProfile(userId: bigint, data: any) {
    const updatedUser = await this.prisma.users.update({
      where: { id: userId },
      data: {
        name: data.name,
        email: data.email,
        updated_at: new Date(),
      },
    });
    return { id: updatedUser.id.toString(), name: updatedUser.name, email: updatedUser.email };
  }

  async updatePassword(userId: bigint, data: any) {
    const user = await this.prisma.users.findUnique({ where: { id: userId } });
    if (!user) throw new UnauthorizedException('Usuario no encontrado');

    const isValid = await bcrypt.compare(data.current_password, user.password);
    if (!isValid) throw new BadRequestException('La contraseña actual es incorrecta');

    const newHashedPassword = await bcrypt.hash(data.password, 10);
    await this.prisma.users.update({
      where: { id: userId },
      data: { password: newHashedPassword, updated_at: new Date() },
    });
    return { message: 'Contraseña actualizada correctamente' };
  }
}
