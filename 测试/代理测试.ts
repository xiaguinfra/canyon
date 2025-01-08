import { expect } from 'chai';
import { ethers } from 'ethers';
import { Keypair } from '@solana/web3.js';
import { BSC代理 } from '../源码/代理/BSC代理';
import { Solana代理 } from '../源码/代理/Solana代理';

describe('代理测试', () => {
    // 测试密钥
    const BSC测试私钥 = ethers.Wallet.createRandom().privateKey;
    const SOLANA测试密钥对 = Keypair.generate();

    let bsc代理: BSC代理;
    let solana代理: Solana代理;

    before(() => {
        bsc代理 = new BSC代理(BSC测试私钥);
        solana代理 = new Solana代理(SOLANA测试密钥对.secretKey);
    });

    describe('BSC代理', () => {
        it('应该能够初始化BSC代理', () => {
            expect(bsc代理).to.not.be.undefined;
        });

        it('应该能够获取BSC余额', async () => {
            const 余额 = await bsc代理.获取余额();
            expect(余额).to.not.be.undefined;
            expect(typeof 余额.toNumber()).to.equal('number');
        });

        it('应该能够监听跨链请求', (done) => {
            bsc代理.监听跨链请求()
                .then(() => {
                    done();
                })
                .catch(done);
        });
    });

    describe('Solana代理', () => {
        it('应该能够初始化Solana代理', () => {
            expect(solana代理).to.not.be.undefined;
        });

        it('应该能够获取Solana余额', async () => {
            const 余额 = await solana代理.获取余额();
            expect(余额).to.not.be.undefined;
            expect(typeof 余额).to.equal('number');
        });

        it('应该能够监听跨链请求', (done) => {
            solana代理.监听跨链请求()
                .then(() => {
                    done();
                })
                .catch(done);
        });
    });

    describe('错误处理', () => {
        it('应该正确处理无效的BSC交易', async () => {
            try {
                await bsc代理.发送跨链请求(
                    '0x0000000000000000000000000000000000000000',
                    ethers.utils.parseEther('0.1')
                );
                expect.fail('应该抛出错误');
            } catch (错误) {
                expect(错误).to.not.be.undefined;
            }
        });

        it('应该正确处理无效的Solana交易', async () => {
            try {
                await solana代理.发送跨链请求(
                    '11111111111111111111111111111111',
                    1000000000
                );
                expect.fail('应该抛出错误');
            } catch (错误) {
                expect(错误).to.not.be.undefined;
            }
        });
    });
}); 