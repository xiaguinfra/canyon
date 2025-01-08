import { ethers } from 'ethers';
import { Connection, PublicKey } from '@solana/web3.js';
import { 配置 } from '../工具/常量';

export class 交易验证器 {
    private bsc提供者: ethers.providers.JsonRpcProvider;
    private solana连接: Connection;
    private 验证缓存: Map<string, boolean>;

    constructor() {
        this.bsc提供者 = new ethers.providers.JsonRpcProvider(配置.网络.BSC.RPC);
        this.solana连接 = new Connection(配置.网络.Solana.RPC);
        this.验证缓存 = new Map();
    }

    async 验证BSC交易(交易哈希: string): Promise<boolean> {
        // 检查缓存
        if (this.验证缓存.has(交易哈希)) {
            return this.验证缓存.get(交易哈希)!;
        }

        try {
            // 获取交易收据
            const 收据 = await this.bsc提供者.getTransactionReceipt(交易哈希);
            
            if (!收据 || !收据.status) {
                this.验证缓存.set(交易哈希, false);
                return false;
            }

            // 确认区块
            const 当前区块 = await this.bsc提供者.getBlockNumber();
            const 确认数 = 当前区块 - 收据.blockNumber;
            
            if (确认数 < 5) {
                return false;
            }

            this.验证缓存.set(交易哈希, true);
            return true;

        } catch (错误) {
            console.error('验证BSC交易失败:', 错误);
            return false;
        }
    }

    async 验证Solana交易(签名: string): Promise<boolean> {
        // 检查缓存
        if (this.验证缓存.has(签名)) {
            return this.验证缓存.get(签名)!;
        }

        try {
            // 获取交易状态
            const 状态 = await this.solana连接.getSignatureStatus(签名);
            
            if (!状态 || !状态.value || 状态.value.err) {
                this.验证缓存.set(签名, false);
                return false;
            }

            // 确认确认数
            if (!状态.value.confirmations || 状态.value.confirmations < 32) {
                return false;
            }

            this.验证缓存.set(签名, true);
            return true;

        } catch (错误) {
            console.error('验证Solana交易失败:', 错误);
            return false;
        }
    }

    清理缓存(超时时间: number = 3600000) { // 默认1小时
        const 现在 = Date.now();
        this.验证缓存.clear();
        
        // 可以添加定期清理逻辑
        setInterval(() => {
            this.验证缓存.clear();
        }, 超时时间);
    }
} 