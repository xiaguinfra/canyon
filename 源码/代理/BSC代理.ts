import { ethers } from 'ethers';
import { 配置 } from '../工具/常量';

export class BSC代理 {
    private provider: ethers.providers.JsonRpcProvider;
    private 合约: ethers.Contract;
    private 钱包: ethers.Wallet;

    constructor(私钥: string) {
        this.provider = new ethers.providers.JsonRpcProvider(配置.网络.BSC.RPC);
        this.钱包 = new ethers.Wallet(私钥, this.provider);
        this.合约 = new ethers.Contract(
            配置.网络.BSC.代理桥合约,
            [
                "event 跨链请求(bytes32 indexed 交易哈希, address indexed 发送方, uint256 数量)",
                "function 发送跨链请求(bytes32 _交易哈希) external payable",
                "function 提取(address payable _接收方, uint256 _数量) external"
            ],
            this.钱包
        );
    }

    async 监听跨链请求() {
        console.log('开始监听BSC跨链请求...');
        this.合约.on('跨链请求', async (交易哈希, 发送方, 数量) => {
            try {
                console.log(`
                    收到跨链请求:
                    - 交易哈希: ${交易哈希}
                    - 发送方: ${发送方}
                    - 数量: ${ethers.utils.formatEther(数量)} BNB
                `);
                
                await this.处理跨链请求(交易哈希, 发送方, 数量);
            } catch (错误) {
                console.error('处理跨链请求失败:', 错误);
            }
        });
    }

    private async 处理跨链请求(交易哈希: string, 发送方: string, 数量: ethers.BigNumber) {
        // 这里实现具体的跨链逻辑
        console.log(`处理来自 ${发送方} 的跨链请求`);
    }

    async 发送跨链请求(目标地址: string, 数量: ethers.BigNumber) {
        const 交易哈希 = ethers.utils.keccak256(
            ethers.utils.defaultAbiCoder.encode(
                ['address', 'uint256', 'uint256'],
                [目标地址, 数量, Date.now()]
            )
        );

        const 交易 = await this.合约.发送跨链请求(交易哈希, {
            value: 数量
        });

        return await 交易.wait();
    }

    async 获取余额() {
        return await this.provider.getBalance(this.钱包.address);
    }
} 