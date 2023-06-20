// SPDX-License-Identifier: Apache-2.0

pragma solidity >=0.5.0;

interface ILayerZeroTreasury {
    function getFees(bool payInZro, uint relayerFee, uint oracleFee) external view returns (uint);
}
