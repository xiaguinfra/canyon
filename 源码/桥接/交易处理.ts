import { BSC代理 } from '../代理/BSC代理';
import { Solana代理 } from '../代理/Solana代理';
import { ethers } from 'ethers';

export class 交易处理器 {
    private bsc代理: BSC代理;
    private solana代理: Solana代理;
    private 正在处理: Map<string, boolean>;

    constructor(bsc私钥: string, solana私钥: Uint8Array) {
        this.bsc代理 = new BSC代理(bsc私钥);
        this.solana代理 = new Solana代理(solana私钥);
        this.正在处理 = new Map();
    }

    async 开始监听() {
        console.log('启动跨链交易处理器...');
        
        await Promise.all([
            this.bsc代理.监听跨链请求(),
            this.solana代理.监听跨链请求()
        ]);
    }

    async 处理BSC到Solana(
        交易哈希: string,
        发送方: string,
        数量: ethers.BigNumber
    ) {
        if (this.正在处理.get(交易哈希)) {
            return;
        }

        try {
            this.正在处理.set(交易哈希, true);
            
            // 将BNB金额转换为SOL数量
            const sol数量 = ethers.utils.formatEther(数量);
            
            // 在Solana上执行跨链操作
            const 签名 = await this.solana代理.发送跨链请求(
                发送方,
                Math.floor(parseFloat(sol数量) * 1e9) // 转换为lamports
            );

            console.log(`
                BSC -> Solana 跨链完成:
                - BSC交易: ${交易哈希}
                - Solana签名: ${签名}
                - 发送方: ${发送方}
                - 数量: ${sol数量} SOL
            `);

        } catch (错误) {
            console.error('BSC到Solana跨链失败:', 错误);
            throw 错误;
        } finally {
            this.正在处理.delete(交易哈希);
        }
    }

    async 处理Solana到BSC(
        签名: string,
        发送方: string,
        数量: number
    ) {
        if (this.正在处理.get(签名)) {
            return;
        }

        try {
            this.正在处理.set(签名, true);
            
            // 将SOL数量转换为BNB金额
            const bnb数量 = ethers.utils.parseEther(
                (数量 / 1e9).toString() // 从lamports转换
            );
            
            // 在BSC上执行跨链操作
            const 收据 = await this.bsc代理.发送跨链请求(
                发送方,
                bnb数量
            );

            console.log(`
                Solana -> BSC 跨链完成:
                - Solana签名: ${签名}
                - BSC交易: ${收据.transactionHash}
                - 发送方: ${发送方}
                - 数量: ${ethers.utils.formatEther(bnb数量)} BNB
            `);

        } catch (错误) {
            console.error('Solana到BSC跨链失败:', 错误);
            throw 错误;
        } finally {
            this.正在处理.delete(签名);
        }
    }
} 