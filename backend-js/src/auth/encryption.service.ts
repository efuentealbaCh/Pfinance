import { Injectable } from '@nestjs/common';
import * as crypto from 'crypto';

@Injectable()
export class EncryptionService {
  private readonly algorithm = 'aes-256-ecb';
  private readonly key: Buffer;

  constructor() {
    // Generate a consistent 32-byte key from the JWT_SECRET
    const secret = process.env.JWT_SECRET || 'fallback-secret-key-development';
    this.key = crypto.createHash('sha256').update(secret).digest();
  }

  encrypt(text: string | null | undefined): string | null {
    if (!text) return text as any;
    try {
      // ECB doesn't use an IV
      const cipher = crypto.createCipheriv(this.algorithm, this.key, null);
      let encrypted = cipher.update(text, 'utf8', 'hex');
      encrypted += cipher.final('hex');
      return encrypted;
    } catch (e) {
      console.error('Encryption failed:', e);
      return text;
    }
  }

  decrypt(encryptedText: string | null | undefined): string | null {
    if (!encryptedText) return encryptedText as any;
    try {
      const decipher = crypto.createDecipheriv(this.algorithm, this.key, null);
      let decrypted = decipher.update(encryptedText, 'hex', 'utf8');
      decrypted += decipher.final('utf8');
      return decrypted;
    } catch (e) {
      // If decryption fails (e.g. data wasn't encrypted), return original text
      return encryptedText;
    }
  }
}
