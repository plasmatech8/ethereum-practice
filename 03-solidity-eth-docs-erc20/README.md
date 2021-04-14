# etherium-practice

Looking at:

- [Ethereum ERC20 docs](https://ethereum.org/en/developers/docs/standards/tokens/erc-20/)
- [Ethereum EIP20 docs](https://eips.ethereum.org/EIPS/eip-20)
- [Ethereum ERC20 tutorial](https://ethereum.org/en/developers/tutorials/understand-the-erc-20-token-smart-contract/)
- [Remix IDE for Ethereum prototyping](https://remix.ethereum.org/)

## ERC20 Interface

```solidity
pragma solidity ^0.6.0;

interface IERC20 {
    // Optional
    function name() public view returns (string)
    function symbol() public view returns (string)
    function decimals() public view returns (uint8)

    // Getter
    function totalSupply() external view returns (uint256);
    function balanceOf(address account) external view returns (uint256);
    function allowance(address owner, address spender) external view returns (uint256);

    // Functions
    function transfer(address recipient, uint256 amount) external returns (bool);
    function approve(address spender, uint256 amount) external returns (bool);
    function transferFrom(address sender, address recipient, uint256 amount) external returns (bool);

    // Events
    event Transfer(address indexed from, address indexed to, uint256 value);
    event Approval(address indexed owner, address indexed spender, uint256 value);
}
```

Optional:
* `name()` name of token (e.g. MyToken)
* `symbol()` symbol of token (e.g. TOK)
* `decimals()` decimal places for the token (e.g. 8 -> devide by 10000000)


Getter:
* `totalSupply()` number of tokens in existence (in smallest unit).
* `balanceOf(address account)` number of tokens owned by address.
* `function allowance(address owner, address spender) ` number of tokens that a spender may spend on behalf of the owner.

Functions:
* `transfer(address recipient, uint256 amount)` number of tokens to transfer to from msg.sender to recipient. Emits `Transfer` event.
* `approve(address spender, uint256 amount)` allow a spender to transfer tokens. Emits `Approval` event.
* `transferFrom(address sender, address recipient, uint256 amount)` move funds on behalf of the sender to the recipient. Amount is deducted from callers allowance. Emits `Transfer`.

In the case of minting new tokens, the transfer is usually from the 0x00..0000 address while in
the case of buning tokens the transfer is to 0x00..0000.