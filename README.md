# Experiment w/ self-describing NFTs

A simple experiment/idea for self-describing NFTs, i.e., contracts that publish their own ABI in response to any unknown function invocation.

This is achieved through Solidity's fallback function. Since fallback functions cannot return any state, a custom error is used to emit the ABI to the caller.

```solidity
abstract contract ERC721ASelfDescribing is ERC721ACommon {
    fallback() external {
        revert Self.Describe(As.ERC721A);
    }
}
```

Inspired by [@0x113d's tweet](https://twitter.com/0x113d/status/1509240522673688582?s=20&t=65IHsHIanz5LJpylDUU6IQ), _"there is no such thing as onchain art"_.