import { ethers } from 'ethers';
import { Keypair } from '@solana/web3.js';
import * as crypto from 'crypto';

export class 加密工具 {
    /**
     * 生成消息哈希
     * @param 数据 要哈希的数据
     * @returns 哈希值
     */
    static 生成哈希(数据: string): string {
        return ethers.utils.keccak256(
            ethers.utils.toUtf8Bytes(数据)
        );
    }

    /**
     * 验证BSC签名
     * @param 消息 原始消息
     * @param 签名 签名数据
     * @param 公钥 BSC地址
     */
    static 验证BSC签名(
        消息: string,
        签名: string,
        公钥: string
    ): boolean {
        try {
            const 恢复的地址 = ethers.utils.verifyMessage(消息, 签名);
            return 恢复的地址.toLowerCase() === 公钥.toLowerCase();
        } catch {
            return false;
        }
    }

    /**
     * 验证Solana签名
     * @param 消息 原始消息
     * @param 签名 签名数据
     * @param 公钥 Solana公钥
     */
    static 验证Solana签名(
        消息: Uint8Array,
        签名: Uint8Array,
        公钥: Uint8Array
    ): boolean {
        try {
            return Keypair.fromSecretKey(签名).publicKey.equals(
                Keypair.fromSecretKey(公钥).publicKey
            );
        } catch {
            return false;
        }
    }

    /**
     * AES加密
     * @param 数据 要加密的数据
     * @param 密钥 加密密钥
     */
    static 加密(数据: string, 密钥: string): string {
        const iv = crypto.randomBytes(16);
        const cipher = crypto.createCipheriv(
            'aes-256-gcm',
            Buffer.from(密钥),
            iv
        );
        
        let 加密数据 = cipher.update(数据, 'utf8', 'hex');
        加密数据 += cipher.final('hex');
        
        return iv.toString('hex') + ':' + 加密数据;
    }

    /**
     * AES解密
     * @param 加密数据 要解密的数据
     * @param 密钥 解密密钥
     */
    static 解密(加密数据: string, 密钥: string): string {
        const [iv, 数据] = 加密数据.split(':');
        const decipher = crypto.createDecipheriv(
            'aes-256-gcm',
            Buffer.from(密钥),
            Buffer.from(iv, 'hex')
        );
        
        let 解密数据 = decipher.update(数据, 'hex', 'utf8');
        解密数据 += decipher.final('utf8');
        
        return 解密数据;
    }

    /**
     * 生成随机密钥
     * @param 长度 密钥长度
     */
    static 生成密钥(长度: number = 32): string {
        return crypto.randomBytes(长度).toString('hex');
    }
} 