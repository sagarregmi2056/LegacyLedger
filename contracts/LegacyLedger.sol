// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/security/ReentrancyGuard.sol";

/**
 * @title LegacyLedger
 * @dev Contract for managing digital asset inheritance
 */
contract LegacyLedger is Ownable, ReentrancyGuard {
    // Replace Counters with a simple uint256
    uint256 private _assetIdCounter;

    struct Asset {
        string id;          // Unique identifier
        string name;        // Asset name
        string assetType;   // Type of asset (crypto, document, etc.)
        string uri;         // IPFS/S3 URI for asset metadata
        address owner;      // Current owner
        bool isTransferable;// Whether the asset can be transferred
        bool isActive;      // Whether the asset is active
    }

    struct Beneficiary {
        address wallet;     // Beneficiary's wallet address
        string name;        // Beneficiary's name
        uint256 sharePercentage; // Percentage share of assets
        bool isActive;      // Whether the beneficiary is active
    }

    // Mapping of asset ID to Asset
    mapping(string => Asset) public assets;
    
    // Mapping of owner to their assets
    mapping(address => string[]) public ownerAssets;
    
    // Mapping of owner to their beneficiaries
    mapping(address => Beneficiary[]) public ownerBeneficiaries;
    
    // Events
    event AssetRegistered(string indexed assetId, address indexed owner, string name);
    event AssetTransferred(string indexed assetId, address indexed from, address indexed to);
    event BeneficiaryAdded(address indexed owner, address indexed beneficiary, uint256 sharePercentage);
    event BeneficiaryRemoved(address indexed owner, address indexed beneficiary);

    constructor() {
        _transferOwnership(msg.sender);
    }

    /**
     * @dev Register a new digital asset
     */
    function registerAsset(
        string memory name,
        string memory assetType,
        string memory uri,
        bool isTransferable
    ) public {
        _assetIdCounter++;
        string memory assetId = string(abi.encodePacked("ASSET-", _assetIdCounter));
        
        Asset memory newAsset = Asset({
            id: assetId,
            name: name,
            assetType: assetType,
            uri: uri,
            owner: msg.sender,
            isTransferable: isTransferable,
            isActive: true
        });
        
        assets[assetId] = newAsset;
        ownerAssets[msg.sender].push(assetId);
        
        emit AssetRegistered(assetId, msg.sender, name);
    }

    /**
     * @dev Add a beneficiary
     */
    function addBeneficiary(
        address beneficiaryAddress,
        string memory name,
        uint256 sharePercentage
    ) public {
        require(beneficiaryAddress != address(0), "Invalid beneficiary address");
        require(sharePercentage > 0 && sharePercentage <= 100, "Invalid share percentage");
        
        // Calculate total shares including new beneficiary
        uint256 totalShares = sharePercentage;
        for(uint i = 0; i < ownerBeneficiaries[msg.sender].length; i++) {
            if(ownerBeneficiaries[msg.sender][i].isActive) {
                totalShares += ownerBeneficiaries[msg.sender][i].sharePercentage;
            }
        }
        require(totalShares <= 100, "Total shares cannot exceed 100%");

        Beneficiary memory newBeneficiary = Beneficiary({
            wallet: beneficiaryAddress,
            name: name,
            sharePercentage: sharePercentage,
            isActive: true
        });
        
        ownerBeneficiaries[msg.sender].push(newBeneficiary);
        emit BeneficiaryAdded(msg.sender, beneficiaryAddress, sharePercentage);
    }

    /**
     * @dev Remove a beneficiary
     */
    function removeBeneficiary(address beneficiaryAddress) public {
        bool found = false;
        for(uint i = 0; i < ownerBeneficiaries[msg.sender].length; i++) {
            if(ownerBeneficiaries[msg.sender][i].wallet == beneficiaryAddress) {
                ownerBeneficiaries[msg.sender][i].isActive = false;
                found = true;
                break;
            }
        }
        require(found, "Beneficiary not found");
        emit BeneficiaryRemoved(msg.sender, beneficiaryAddress);
    }

    /**
     * @dev Transfer an asset to another address
     */
    function transferAsset(string memory assetId, address to) public nonReentrant {
        require(to != address(0), "Invalid recipient address");
        require(assets[assetId].owner == msg.sender, "Not asset owner");
        require(assets[assetId].isTransferable, "Asset is not transferable");
        require(assets[assetId].isActive, "Asset is not active");

        assets[assetId].owner = to;
        
        // Remove asset from sender's list
        for(uint i = 0; i < ownerAssets[msg.sender].length; i++) {
            if(keccak256(bytes(ownerAssets[msg.sender][i])) == keccak256(bytes(assetId))) {
                // Move the last element to this position and pop the last element
                ownerAssets[msg.sender][i] = ownerAssets[msg.sender][ownerAssets[msg.sender].length - 1];
                ownerAssets[msg.sender].pop();
                break;
            }
        }
        
        // Add asset to recipient's list
        ownerAssets[to].push(assetId);
        
        emit AssetTransferred(assetId, msg.sender, to);
    }

    /**
     * @dev Get all assets owned by an address
     */
    function getOwnerAssets(address owner) public view returns (Asset[] memory) {
        string[] memory assetIds = ownerAssets[owner];
        Asset[] memory ownerAssetsList = new Asset[](assetIds.length);
        
        for(uint i = 0; i < assetIds.length; i++) {
            ownerAssetsList[i] = assets[assetIds[i]];
        }
        
        return ownerAssetsList;
    }

    /**
     * @dev Get all beneficiaries of an address
     */
    function getOwnerBeneficiaries(address owner) public view returns (Beneficiary[] memory) {
        return ownerBeneficiaries[owner];
    }
} 