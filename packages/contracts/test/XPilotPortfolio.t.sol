// SPDX-License-Identifier: MIT
pragma solidity ^0.8.26;

import "forge-std/Test.sol";
import "../src/XPilotPortfolio.sol";

contract XPilotPortfolioTest is Test {
    XPilotPortfolio internal portfolio;
    address internal user = address(0xBEEF);

    function setUp() public {
        portfolio = new XPilotPortfolio();
    }

    function testCreatePortfolio() public {
        string[] memory symbols = new string[](2);
        symbols[0] = "NVDAx";
        symbols[1] = "MSFTx";

        uint16[] memory weights = new uint16[](2);
        weights[0] = 6000;
        weights[1] = 4000;

        vm.prank(user);
        uint256 id = portfolio.createPortfolio("AI Growth", "moderate", 1000, symbols, weights);

        (address owner, string memory strategyName,,,,,, XPilotPortfolio.Allocation[] memory allocations) = portfolio.getPortfolio(id);
        assertEq(owner, user);
        assertEq(strategyName, "AI Growth");
        assertEq(allocations.length, 2);
    }
}
