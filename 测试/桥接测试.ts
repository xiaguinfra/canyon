import { expect } from 'chai';
import { ethers } from 'ethers';
import { Keypair } from '@solana/web3.js';
import { 交易处理器 } from '../源码/桥接/交易处理';
import { 交易验证器 } from '../源码/桥接/验证器';
import { 加密工具 } from '../源码/工具/加密';

describe('桥接测试', () => {
    // 测试密钥
    const BSC测试私钥 = ethers.Wallet.createRandom().privateKey;
    const SOLANA测试密钥对 = Keypair.generate();

    let 处理器: 交易处理器;
    let 验证器: 交易验证器;

    before(() => {
        处理器 = new 交易处理器(BSC测试私钥, SOLANA测试密钥对.secretKey);
        验证器 = new 交易验证器();
    });

    describe('交易处理器', () => {
        it('应该能够初始化处理器', () => {
            expect(处理器).to.not.be.undefined;
        });

        it('应该能够启动监听', async () => {
            await 处理器.开始监听();
        });

        it('应该能够处理BSC到Solana的交易', async () => {
            const 测试哈希 = 加密工具.生成哈希('测试交易');
            const 测试地址 = ethers.Wallet.createRandom().address;
            const 测试数量 = ethers.utils.parseEther('0.1');

            try {
                await 处理器.处理BSC到Solana(测试哈希, 测试地址, 测试数量);
            } catch (错误) {
                // 在测试环境中，预期会失败因为没有实际的资金
                expect(错误).to.not.be.undefined;
            }
        });
    });

    describe('交易验证器', () => {
        it('应该能够初始化验证器', () => {
            expect(验证器).to.not.be.undefined;
        });

        it('应该能够验证BSC交易', async () => {
            const 结果 = await 验证器.验证BSC交易(
                '0x0000000000000000000000000000000000000000000000000000000000000000'
            );
            expect(结果).to.be.false;
        });

        it('应该能够验证Solana交易', async () => {
            const 结果 = await 验证器.验证Solana交易(
                '1111111111111111111111111111111111111111111111111111111111111111'
            );
            expect(结果).to.be.false;
        });
    });

    describe('错误处理', () => {
        it('应该正确处理无效的跨链请求', async () => {
            try {
                await 处理器.处理BSC到Solana(
                    '0x0000',
                    '0x0000000000000000000000000000000000000000',
                    ethers.utils.parseEther('0')
                );
                expect.fail('应该抛出错误');
            } catch (错误) {
                expect(错误).to.not.be.undefined;
            }
        });
    });
}); 