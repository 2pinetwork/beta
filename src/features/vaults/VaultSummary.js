import PropTypes from 'prop-types'
import Image from 'next/image'
import { toNumber, toCurrency, toPercentage } from '../../lib/locales'

const VaultSummary = ({ vault, connected }) => {
  const { price, symbol, token, uses } = vault

  const apy      = toPercentage(vault.apy, { precision: 3 })
  const daily    = toPercentage(vault.daily, { precision: 3 })
  const tvl      = toCurrency(vault.tvl.times(price), { compact: true })
  const tokenSrc = `/images/tokens/${token}.svg`

  const balance = (vault.balance?.isGreaterThan(0))
    ? toNumber(vault.balance, { compact: true, precision: { max: 3 } })
    : undefined

  const balanceUsd = (vault.balance?.isGreaterThan(0))
    ? toCurrency(vault.balance.times(price), { compact: true })
    : toCurrency(0)

  const deposited = (vault.deposited?.isGreaterThan(0))
    ? toNumber(vault.deposited, { compact: true, precision: { max: 3 } })
    : undefined

  const depositedUsd = (vault.deposited?.isGreaterThan(0))
    ? toCurrency(vault.deposited.times(price), { compact: true })
    : toCurrency(0)

  return (
    <div className="vault-summary row">
      <div role="gridcell"  className="col d-flex align-items-center py-5 px-5" tabIndex="-1">
        <div>
          <div className="vault-summary-symbol">
            <figure className="vault-summary-logo">
              <Image src={tokenSrc} alt={token} height="36" width="36" unoptimized={true} />
            </figure>

            <span>{symbol}</span>
          </div>

          <small className="vault-summary-platform">Uses: {uses}</small>
        </div>
      </div>

      {(connected) &&
        <div role="gridcell" className="col d-flex align-items-center py-4 px-5" tabIndex="-1">
          <div>
            <small>{balanceUsd}</small>

            <p className="vault-summary-stat" title={`${vault.balance} ${symbol}`}>
              {(balance) ? balance : '-.--' }
            </p>
          </div>
        </div>
      }

      {(connected) &&
        <div role="gridcell" className="col d-flex align-items-center py-4 px-5" tabIndex="-1">
          <div>
            <small>{depositedUsd}</small>

            <p className="vault-summary-stat" title={`${vault.deposited} ${symbol}`}>
              {(deposited) ? deposited : '-.--' }
            </p>
          </div>
        </div>
      }

      <div role="gridcell" className="col d-flex align-items-center py-4 px-5" tabIndex="-1">
        <p className="vault-summary-stat">{apy}</p>
      </div>

      <div role="gridcell" className="col d-flex align-items-center py-4 px-5" tabIndex="-1">
        <p className="vault-summary-stat">{daily}</p>
      </div>

      <div role="gridcell" className="col d-flex align-items-center py-4 px-5" tabIndex="-1">
        <p className="vault-summary-stat">{tvl}</p>
      </div>

      <div role="gridcell" className="col d-flex align-items-center justify-content-end py-4" tabIndex="-1">
        <button className="btn btn-crosshairs me-5" data-bs-toggle="collapse"
                data-bs-target={`#vault-panel-${vault.id}`}>
          <span></span>
          <span></span>
        </button>
      </div>
    </div>
  )
}

VaultSummary.propTypes = {
  vault: PropTypes.object.isRequired,
  connected: PropTypes.bool
}

export default VaultSummary