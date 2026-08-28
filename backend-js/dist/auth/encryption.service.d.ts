export declare class EncryptionService {
    private readonly algorithm;
    private readonly key;
    constructor();
    encrypt(text: string | null | undefined): string | null;
    decrypt(encryptedText: string | null | undefined): string | null;
}
