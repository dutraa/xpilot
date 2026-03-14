// SPDX-License-Identifier: MIT
pragma solidity ^0.8.26;

import "forge-std/Script.sol";
import "../src/XPilotPortfolio.sol";

contract Deploy is Script {
    function run() external returns (XPilotPortfolio deployed) {
        uint256 deployerKey = vm.envUint("PRIVATE_KEY");
        vm.startBroadcast(deployerKey);
        deployed = new XPilotPortfolio();
        vm.stopBroadcast();
    }
}
