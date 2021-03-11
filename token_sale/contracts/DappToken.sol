pragma solidity ^0.7.0;

library SafeMath {
    function sub(uint256 a, uint256 b) internal pure returns (uint256) {
      assert(b <= a);
      return a - b;
    }
    function add(uint256 a, uint256 b) internal pure returns (uint256) {
      uint256 c = a + b;
      assert(c >= a);
      return c;
    }
}

interface IERC20 {
    function totalSupply() external view returns (uint256);
    function balanceOf(address account) external view returns (uint256);
    function allowance(address owner, address spender) external view returns (uint256);
    function transfer(address recipient, uint256 amount) external returns (bool);
    function approve(address spender, uint256 amount) external returns (bool);
    function transferFrom(address sender,address recipient,uint256 amount) external returns (bool);
    event Transfer(address indexed from, address indexed to, uint256 value);
    event Approval(address indexed owner, address indexed spender, uint256 value);
}

contract DappToken is IERC20 {
    // Initialisation
    using SafeMath for uint256;
    constructor() {
        balances_[msg.sender] = totalSupply_;
    }

    // Token Metadata
    string constant name_ = "DappToken";
    string constant symbol_ = "DAPP";
    uint8 constant decimals_ = 18;
    uint256 totalSupply_ = 1000000;

    function name() public pure returns (string memory) {
        return name_;
    }

    function symbol() public pure returns (string memory) {
        return symbol_;
    }

    function decimals() public pure returns (uint8) {
        return decimals_;
    }

    function totalSupply() public override view returns (uint256) {
        return totalSupply_;
    }

    // Token Ledger
    mapping(address => uint256) balances_;
    mapping(address => mapping(address => uint256)) allowed_;

    function balanceOf(address tokenOwner)
        public
        override
        view
        returns (uint256)
    {
        return balances_[tokenOwner];
    }

    function allowance(address owner, address delegate)
        public
        override
        view
        returns (uint256)
    {
        return allowed_[owner][delegate];
    }

    // Transaction Methods
    function transfer(address receiver, uint256 numTokens)
        public
        override
        returns (bool)
    {
        require(numTokens <= balances_[msg.sender]);
        balances_[msg.sender] = balances_[msg.sender].sub(numTokens);
        balances_[receiver] = balances_[receiver].add(numTokens);
        emit Transfer(msg.sender, receiver, numTokens);
        return true;
    }

    function approve(address delegate, uint256 numTokens)
        public
        override
        returns (bool)
    {
        allowed_[msg.sender][delegate] = numTokens;
        emit Approval(msg.sender, delegate, numTokens);
        return true;
    }

    function transferFrom(address owner, address buyer, uint256 numTokens)
        public
        override
        returns (bool)
    {
        require(numTokens <= balances_[owner]);
        require(numTokens <= allowed_[owner][msg.sender]);

        balances_[owner] = balances_[owner].sub(numTokens);
        allowed_[owner][msg.sender] = allowed_[owner][msg.sender].sub(
            numTokens
        );
        balances_[buyer] = balances_[buyer].add(numTokens);
        emit Transfer(owner, buyer, numTokens);
        return true;
    }
}
