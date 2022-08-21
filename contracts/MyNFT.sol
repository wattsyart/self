// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

import "./ERC721ASelfDescribing.sol";

contract MyNFT is ERC721ASelfDescribing {
    constructor(address payable royaltyReceiver, uint96 royaltyBasisPoints)
        ERC721ACommon(
            "A self-describing contract",
            "SELF",
            royaltyReceiver,
            royaltyBasisPoints
        )
    {}
}