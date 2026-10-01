import React from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchTokenDetailRequest,
  clearTokenDetail,
} from "../redux/actions/tokenAction";
import { formatNumber, removeW } from "../utils/funcs";
import { svg2img } from "../utils/randomAvatar";
import "./style.css";

const tokenLogo = (token) =>
  token.logo
    ? `https://assets.thetatoken.org/tokens/${token.logo}`
    : svg2img(token);

const DetailRow = ({ label, value }) => (
  <div className="token-detail-row">
    <span className="token-detail-label">{label}</span>
    <span>{value}</span>
  </div>
);

const TokenDetails = () => {
  const dispatch = useDispatch();
  const tokenList = useSelector((state) => state.tokenReducer.tokenList);
  const { selectedTokenId, tokenDetail, detailLoading, detailError } =
    useSelector((state) => state.tokenReducer);

  // Token list view
  if (!selectedTokenId) {
    return (
      <div className="token-details-panel font-header">
        <div className="token-details-title">TOKENS</div>
        {tokenList.map((token) => (
          <div
            key={token.id}
            className="token-details-item"
            onClick={() => dispatch(fetchTokenDetailRequest(token.id))}
          >
            <img src={tokenLogo(token)} alt={token.symbol} />
            <span>{removeW(token.symbol)}</span>
            <span className="token-details-name font-regular">
              {token.name}
            </span>
          </div>
        ))}
      </div>
    );
  }

  // Detail view
  const listItem = tokenList.find((t) => t.id === selectedTokenId) || {};
  const token = tokenDetail && tokenDetail.token;

  return (
    <div className="token-details-panel font-header">
      <button
        className="token-details-back"
        onClick={() => dispatch(clearTokenDetail())}
      >
        ‹ Back
      </button>

      {detailLoading && <div className="font-regular">Loading...</div>}
      {detailError && (
        <div className="font-regular" style={{ color: "#cb4348" }}>
          {detailError}
        </div>
      )}

      {token && (
        <>
          <div className="token-details-header">
            <img
              src={tokenLogo({ ...token, logo: listItem.logo })}
              alt={token.symbol}
            />
            <div>
              <div>{removeW(token.symbol)}</div>
              <div className="token-details-name font-regular">
                {token.name}
              </div>
            </div>
          </div>

          <div className="font-regular">
            <DetailRow label="Price" value={"$" + token.derivedUSD} />
            <DetailRow
              label="Price (TFUEL)"
              value={formatNumber(token.derivedETH * 1)}
            />
            <DetailRow
              label="24h Change"
              value={
                <span style={{ color: "#449782" }}>
                  {"+" +
                    (token.tradeVolumeETH * 1
                      ? (
                          ((token.volume24HrsETH * 1) /
                            (token.tradeVolumeETH * 1)) *
                          100
                        ).toFixed(2)
                      : "0") +
                    "%"}
                </span>
              }
            />
            <DetailRow
              label="Liquidity"
              value={"$" + formatNumber(token.totalLiquidityUSD * 1)}
            />
            <DetailRow
              label="Liquidity (tokens)"
              value={formatNumber(token.totalLiquidity * 1)}
            />
            <DetailRow
              label="Volume 24h"
              value={"$" + formatNumber(token.volume24HrsUSD * 1)}
            />
            <DetailRow
              label="Volume 48h"
              value={"$" + formatNumber(token.volume48HrsUSD * 1)}
            />
            <DetailRow
              label="Total Volume"
              value={"$" + formatNumber(token.tradeVolumeUSD * 1)}
            />
            <DetailRow label="Txns 24h" value={token.txCount24Hrs} />
            <DetailRow label="Txns 48h" value={token.txCount48Hrs} />
            <DetailRow label="Total Txns" value={token.txCount} />
            <DetailRow
              label="Contract"
              value={
                <a
                  href={`https://explorer.thetatoken.org/account/${token.id}`}
                  target="_blank"
                  rel="noreferrer"
                >
                  {token.id.slice(0, 6) + "..." + token.id.slice(-4)}
                </a>
              }
            />
          </div>

          {tokenDetail.pairs.length > 0 && (
            <>
              <div className="token-details-title">PAIRS</div>
              <div className="font-regular">
                {tokenDetail.pairs.map((pair) => (
                  <DetailRow
                    key={pair.id}
                    label={`${removeW(pair.token0.symbol)} / ${removeW(
                      pair.token1.symbol
                    )}`}
                    value={"$" + formatNumber(pair.reserveUSD * 1)}
                  />
                ))}
              </div>
            </>
          )}
        </>
      )}
    </div>
  );
};

export default TokenDetails;
