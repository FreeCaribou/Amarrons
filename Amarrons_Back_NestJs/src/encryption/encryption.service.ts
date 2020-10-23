import { Injectable } from '@nestjs/common';
import { hash, compare } from 'bcrypt'

@Injectable()
export class EncryptionService {

  async hash(plain: string): Promise<string> {
    return hash(plain, +process.env.HASH_ROUNDS);
  }

  async compare(plain: string, encrypted: string): Promise<boolean> {
    return compare(plain, encrypted);
  }

}