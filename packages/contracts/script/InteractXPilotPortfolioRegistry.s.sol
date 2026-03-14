// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "forge-std/Script.sol";
import "forge-std/console2.sol";
import {XPilotPortfolioRegistry} from "../src/XPilotPortfolioRegistry.sol";

contract InteractXPilotPortfolioRegistry is Script {
    function run() external {
        address registryAddress = vm.envAddress("REGISTRY_ADDRESS");

        XPilotPortfolioRegistry registry = XPilotPortfolioRegistry(registryAddress);

        string[] memory assets = new string[](4);
        assets[0] = "NVDAx";
        assets[1] = "MSFTx";
        assets[2] = "METAx";
        assets[3] = "GOOGLx";

        uint256[] memory weights = new uint256[](4);
        weights[0] = 30;
        weights[1] = 25;
        weights[2] = 25;
        weights[3] = 20;

        vm.startBroadcast();

        uint256 portfolioId = registry.createPortfolio(
            "Invest in AI leaders",
            "AI Growth",
            "medium",
            assets,
            weights
        );

        vm.stopBroadcast();

        (
            address owner,
            string memory prompt,
            string memory strategy,
            string memory risk,
            string[] memory savedAssets,
            uint256[] memory savedWeights,
            uint256 createdAt
        ) = registry.getPortfolio(portfolioId);

        console2.log("Portfolio ID:", portfolioId);
        console2.log("Owner:", owner);
        console2.log("Prompt:", prompt);
        console2.log("Strategy:", strategy);
        console2.log("Risk:", risk);
        console2.log("Created At:", createdAt);
        console2.log("Asset Count:", savedAssets.length);
        console2.log("First Asset:", savedAssets[0]);
        console2.log("First Weight:", savedWeights[0]);
    }
}
