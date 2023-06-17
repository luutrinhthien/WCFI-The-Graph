import { Address, BigInt } from "@graphprotocol/graph-ts"
import {
  Approval as ApprovalEvent,
  ApprovalForAll as ApprovalForAllEvent,
  BatchMetadataUpdate as BatchMetadataUpdateEvent,
  BuyNFT as BuyNFTEvent,
  ListNFT as ListNFTEvent,
  MetadataUpdate as MetadataUpdateEvent,
  OwnershipTransferred as OwnershipTransferredEvent,
  Transfer as TransferEvent,
  UnlistNFT as UnlistNFTEvent,
  UpdateListingNFTPrice as UpdateListingNFTPriceEvent,
  minted as mintedEvent
} from "../generated/WCFIMarketplace/WCFIMarketplace"
import {
  Token
} from "../generated/schema"

export function handleApprovalForAll(event: ApprovalForAllEvent): void {

}

export function handleBuyNFT(event: BuyNFTEvent): void {
}

export function handleListNFT(event: ListNFTEvent): void {
  let token = Token.load(getIdFromEventParams(event.params._tokenId))
  token!.price = event.params._price;
  token!.save()
}

export function handleUnlistNFT(event: UnlistNFTEvent): void {

}

export function handleUpdateListingNFTPrice(
  event: UpdateListingNFTPriceEvent
): void {
  let token = Token.load(getIdFromEventParams(event.params._tokenId))
  token!.price = event.params._price
  token!.save()
}

export function handleminted(event: mintedEvent): void {
  let token = Token.load(getIdFromEventParams(event.params.tokenId))
  token!.country = event.params.country
  token!.save()
}

export function handleTransfer(event: TransferEvent): void {
  let token = Token.load(getIdFromEventParams(event.params.tokenId))
  if (!token) {
    token = new Token(
      getIdFromEventParams(event.params.tokenId)
    )
    token.country = "";
  }
  token.tokenId = event.params.tokenId
  token.owner = event.params.to
  token.creator = event.params.from
  token.save()
}

function getIdFromEventParams(tokenId: BigInt): string {
  return tokenId.toHexString()
}