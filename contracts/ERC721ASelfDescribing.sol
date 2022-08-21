// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

import "@divergencetech/ethier/contracts/erc721/ERC721ACommon.sol";

import "./Self.sol";
import "./As.sol";

abstract contract ERC721ASelfDescribing is ERC721ACommon {
    fallback() external {
        revert Self.Describe(As.ERC721A);
    }
}