// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

contract XPilotPortfolioRegistry {
    struct PortfolioProfile {
        address owner;
        string prompt;
        string strategy;
        string risk;
        string[] assets;
        uint256[] weights;
        uint256 createdAt;
        bool exists;
    }

    uint256 public nextPortfolioId;
    mapping(uint256 => PortfolioProfile) private portfolios;
    mapping(address => uint256[]) private portfoliosByOwner;

    event PortfolioCreated(
        uint256 indexed portfolioId,
        address indexed owner,
        string strategy,
        string risk
    );

    function createPortfolio(
        string memory prompt,
        string memory strategy,
        string memory risk,
        string[] memory assets,
        uint256[] memory weights
    ) external returns (uint256 portfolioId) {
        require(bytes(prompt).length > 0, "Prompt required");
        require(bytes(strategy).length > 0, "Strategy required");
        require(bytes(risk).length > 0, "Risk required");
        require(assets.length > 0, "Assets required");
        require(assets.length == weights.length, "Length mismatch");

        uint256 totalWeight = 0;
        for (uint256 i = 0; i < weights.length; i++) {
            totalWeight += weights[i];
        }

        require(totalWeight == 100, "Weights must sum to 100");

        portfolioId = nextPortfolioId;

        PortfolioProfile storage profile = portfolios[portfolioId];
        profile.owner = msg.sender;
        profile.prompt = prompt;
        profile.strategy = strategy;
        profile.risk = risk;
        profile.createdAt = block.timestamp;
        profile.exists = true;

        for (uint256 i = 0; i < assets.length; i++) {
            profile.assets.push(assets[i]);
            profile.weights.push(weights[i]);
        }

        portfoliosByOwner[msg.sender].push(portfolioId);
        nextPortfolioId += 1;

        emit PortfolioCreated(portfolioId, msg.sender, strategy, risk);
    }

    function getPortfolio(uint256 portfolioId)
        external
        view
        returns (
            address owner,
            string memory prompt,
            string memory strategy,
            string memory risk,
            string[] memory assets,
            uint256[] memory weights,
            uint256 createdAt
        )
    {
        PortfolioProfile storage profile = portfolios[portfolioId];
        require(profile.exists, "Portfolio not found");

        return (
            profile.owner,
            profile.prompt,
            profile.strategy,
            profile.risk,
            profile.assets,
            profile.weights,
            profile.createdAt
        );
    }

    function getPortfolioIdsByOwner(address owner)
        external
        view
        returns (uint256[] memory)
    {
        return portfoliosByOwner[owner];
    }
}
