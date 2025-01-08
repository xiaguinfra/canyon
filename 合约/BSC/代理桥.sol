// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract 代理桥 {
    address public 管理员;
    mapping(bytes32 => bool) public 已处理交易;
    
    event 跨链请求(bytes32 indexed 交易哈希, address indexed 发送方, uint256 数量);
    
    constructor() {
        管理员 = msg.sender;
    }
    
    modifier 仅管理员() {
        require(msg.sender == 管理员, "仅管理员可调用");
        _;
    }
    
    function 发送跨链请求(bytes32 _交易哈希) external payable {
        require(!已处理交易[_交易哈希], "交易已处理");
        已处理交易[_交易哈希] = true;
        emit 跨链请求(_交易哈希, msg.sender, msg.value);
    }
    
    function 提取(address payable _接收方, uint256 _数量) external 仅管理员 {
        _接收方.transfer(_数量);
    }
} 