// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "forge-std/Test.sol";
import {XPilotPortfolioRegistry} from "../src/XPilotPortfolioRegistry.sol";

contract XPilotPortfolioRegistryTest is Test {
    XPilotPortfolioRegistry registry;

    function setUp() public {
        registry = new XPilotPortfolioRegistry();
    }

    function testCreatePortfolio() public {
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

        uint256 portfolioId = registry.createPortfolio(
            "Invest in AI leaders",
            "AI Growth",
            "medium",
            assets,
            weights
        );

        (
            address owner,
            string memory prompt,
            string memory strategy,
            string memory risk,
            string[] memory savedAssets,
            uint256[] memory savedWeights,
            uint256 createdAt
        ) = registry.getPortfolio(portfolioId);

        assertEq(owner, address(this));
        assertEq(prompt, "Invest in AI leaders");
        assertEq(strategy, "AI Growth");
        assertEq(risk, "medium");
        assertEq(savedAssets.length, 4);
        assertEq(savedWeights.length, 4);
        assertEq(savedWeights[0], 30);
        assertGt(createdAt, 0);
    }

    function testPortfolioIdsByOwner() public {
        string[] memory assets = new string[](3);
        assets[0] = "SPYx";
        assets[1] = "AAPLx";
        assets[2] = "MSFTx";

        uint256[] memory weights = new uint256[](3);
        weights[0] = 50;
        weights[1] = 25;
        weights[2] = 25;

        registry.createPortfolio(
            "Build a safe portfolio",
            "Defensive",
            "low",
            assets,
            weights
        );

        uint256[] memory ids = registry.getPortfolioIdsByOwner(address(this));
        assertEq(ids.length, 1);
        assertEq(ids[0], 0);
    }

    function testRevertWhenWeightsDoNotSumToHundred() public {
        string[] memory assets = new string[](2);
        assets[0] = "AAPLx";
        assets[1] = "MSFTx";

        uint256[] memory weights = new uint256[](2);
        weights[0] = 60;
        weights[1] = 30;

        vm.expectRevert(bytes("Weights must sum to 100"));
        registry.createPortfolio(
            "Broken portfolio",
            "Tech Leaders",
            "medium",
            assets,
            weights
        );
    }
}
