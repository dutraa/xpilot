// SPDX-License-Identifier: MIT
pragma solidity ^0.8.26;

contract XPilotPortfolio {
    error NotOwner();
    error LengthMismatch();
    error EmptyPortfolio();

    struct Allocation {
        string symbol;
        uint16 weightBps;
    }

    struct PortfolioProfile {
        address owner;
        string strategyName;
        string riskLevel;
        uint256 amountUsd;
        uint256 createdAt;
        uint256 updatedAt;
        bool active;
        Allocation[] allocations;
    }

    uint256 public nextPortfolioId;
    mapping(uint256 => PortfolioProfile) private portfolios;
    mapping(address => uint256[]) public portfoliosByOwner;

    event PortfolioCreated(uint256 indexed portfolioId, address indexed owner, string strategyName, string riskLevel);
    event PortfolioUpdated(uint256 indexed portfolioId, address indexed owner);
    event PortfolioStatusChanged(uint256 indexed portfolioId, bool active);

    function createPortfolio(
        string memory strategyName,
        string memory riskLevel,
        uint256 amountUsd,
        string[] memory symbols,
        uint16[] memory weightsBps
    ) external returns (uint256 portfolioId) {
        if (symbols.length == 0) revert EmptyPortfolio();
        if (symbols.length != weightsBps.length) revert LengthMismatch();

        portfolioId = nextPortfolioId++;
        PortfolioProfile storage profile = portfolios[portfolioId];
        profile.owner = msg.sender;
        profile.strategyName = strategyName;
        profile.riskLevel = riskLevel;
        profile.amountUsd = amountUsd;
        profile.createdAt = block.timestamp;
        profile.updatedAt = block.timestamp;
        profile.active = true;

        for (uint256 i = 0; i < symbols.length; i++) {
            profile.allocations.push(Allocation({symbol: symbols[i], weightBps: weightsBps[i]}));
        }

        portfoliosByOwner[msg.sender].push(portfolioId);
        emit PortfolioCreated(portfolioId, msg.sender, strategyName, riskLevel);
    }

    function updatePortfolio(
        uint256 portfolioId,
        string memory strategyName,
        string memory riskLevel,
        uint256 amountUsd,
        string[] memory symbols,
        uint16[] memory weightsBps
    ) external {
        PortfolioProfile storage profile = portfolios[portfolioId];
        if (profile.owner != msg.sender) revert NotOwner();
        if (symbols.length == 0) revert EmptyPortfolio();
        if (symbols.length != weightsBps.length) revert LengthMismatch();

        delete profile.allocations;
        for (uint256 i = 0; i < symbols.length; i++) {
            profile.allocations.push(Allocation({symbol: symbols[i], weightBps: weightsBps[i]}));
        }

        profile.strategyName = strategyName;
        profile.riskLevel = riskLevel;
        profile.amountUsd = amountUsd;
        profile.updatedAt = block.timestamp;

        emit PortfolioUpdated(portfolioId, msg.sender);
    }

    function setActive(uint256 portfolioId, bool active) external {
        PortfolioProfile storage profile = portfolios[portfolioId];
        if (profile.owner != msg.sender) revert NotOwner();

        profile.active = active;
        profile.updatedAt = block.timestamp;
        emit PortfolioStatusChanged(portfolioId, active);
    }

    function getPortfolio(uint256 portfolioId)
        external
        view
        returns (
            address owner,
            string memory strategyName,
            string memory riskLevel,
            uint256 amountUsd,
            uint256 createdAt,
            uint256 updatedAt,
            bool active,
            Allocation[] memory allocations
        )
    {
        PortfolioProfile storage profile = portfolios[portfolioId];
        return (
            profile.owner,
            profile.strategyName,
            profile.riskLevel,
            profile.amountUsd,
            profile.createdAt,
            profile.updatedAt,
            profile.active,
            profile.allocations
        );
    }
}
