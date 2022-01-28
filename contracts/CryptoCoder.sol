pragma solidity ^0.8.0;

import "../client/node_modules/@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "../client/node_modules/@openzeppelin/contracts/token/ERC721/extensions/ERC721Enumerable.sol";


contract CryptoCoder is ERC721, ERC721Enumerable {

    string[] public coders;
    mapping(string => bool) _coderExists;

    constructor() ERC721("CryptoCoder", "CC") {
    }

    function mint(string memory _coder) public {
        // Color 
        require(!_coderExists[_coder]);
        coders.push(_coder);
        uint _id = coders.length - 1;
        _mint(msg.sender, _id);
        _coderExists[_coder] = true;
    }

    function _beforeTokenTransfer(address from, address to, uint256 tokenId)
        internal
        override(ERC721, ERC721Enumerable)
    {
        super._beforeTokenTransfer(from, to, tokenId);
    }

    function supportsInterface(bytes4 interfaceId) public view
        override(ERC721, ERC721Enumerable)
        returns (bool)
    {
        return super.supportsInterface(interfaceId);
    }
}