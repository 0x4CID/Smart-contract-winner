// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.9;

// Uncomment this line to use console.log
// import "hardhat/console.sol";

contract callingContract {
    
    function callemitWinner() external {
        (bool success,) = address(0xcF469d3BEB3Fc24cEe979eFf83BE33ed50988502).call(abi.encodeWithSignature("attempt()"));
        require(success);
    }
}
