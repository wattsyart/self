const { loadFixture } = require("@nomicfoundation/hardhat-network-helpers");
const { anyValue } = require("@nomicfoundation/hardhat-chai-matchers/withArgs");
const { expect } = require("chai");
const fs = require('fs');

describe("ERC721ASelfDescribing", function () {

  async function deployFixture() {
    const [owner, otherAccount] = await ethers.getSigners();
    const MyNFT = await ethers.getContractFactory("MyNFT");
    const myNft = await MyNFT.deploy(owner.address, 0);
    const Self = await ethers.getContractFactory("Self");
    return { myNft, Self, owner, otherAccount };
  }

  describe("Deployment", function () {
    it("should display the ABI on fallback", async function () {

      const { myNft, Self, owner } = await loadFixture(deployFixture);

      // workaround for hardhat to invoke the fallback function
      const anyFunc = 'anyFunc()';
      const myNftWithAnyFunc = new ethers.Contract(
        myNft.address,
        [
          ...myNft.interface.fragments,
          `function ${anyFunc}`,
        ],
        owner
      );

      // normal test
      await expect(myNftWithAnyFunc.connect(owner)[anyFunc]()).to.be.revertedWithCustomError(Self, "Describe");

      // hacky test to produce the ABI description
      try {
        await myNftWithAnyFunc.connect(owner)[anyFunc]();
      } catch (error) {
        const dataURI = hex2ascii(error.reason.substring("VM Exception while processing transaction: reverted with custom error 'Describe(\"".length).slice(0, -3));
        const expected = fs.readFileSync("./test/erc721a.json", 'utf8');
        const actual = Buffer.from(dataURI.substring(29), "base64").toString();        
        expect(expected).to.equal(actual);
        console.log(actual);
      };

    });
  });
});

function hex2ascii(hex) {
  var str = '';
  for (var i = 0; i < hex.length; i += 2)
    str += String.fromCharCode(parseInt(hex.substr(i, 2), 16));
  return str;
}
