import BigNumber from 'bignumber.js'
import PropTypes from 'prop-types'
import { useState } from 'react'
import { approve, deposit } from '../../data/vaults'
import { toNumber } from '../../lib/locales'
import { useStore, dropNotificationGroup } from '../../store'
import { notifySuccess } from '../../store/notifications'
import { classNames, preventDefault } from '../../utils/view'
import { txSent, txSuccess, txError } from './utils/transactions'
import { validateDeposit } from './utils/validations'

const Deposit = ({ vault, onUpdate }) => {
  const [ { wallet }, dispatch ]    = useStore()
  const [ value, setValue ]         = useState('')
  const [ error, setError ]         = useState()
  const [ isPending, setIsPending ] = useState(false)
  const { symbol, balance }         = vault

  const isApproved = isTokenApproved(vault)
  const isDisabled = vault.isPaused || vault.isFull || isPending

  const buttonLabel = (isApproved)
    ? (isPending ? 'Depositing...' : 'Deposit')
    : (isPending ? 'Approving...'  : 'Approve')

  const onApprove = async () => {
    const chainId = vault.chainId

    setIsPending(true)

    try {
      const transaction = await approve(wallet, vault, 1e58)

      dispatch(dropNotificationGroup('deposits'))
      dispatch(approveSent(chainId, transaction.hash))

      const receipt = await transaction.wait()

      onUpdate()
      dispatch(dropNotificationGroup('deposits'))
      dispatch(approveSuccess(chainId, receipt.transactionHash))

    } catch (error) {
      dispatch(dropNotificationGroup('deposits'))
      dispatch(approveError(chainId, error))

    } finally {
      setIsPending(false)
    }
  }

  const onDeposit = async () => {
    const chainId = vault.chainId
    const error   = validateDeposit(vault, value)

    // Update the displayed error message and abort if there's an error
    setError(error)
    if (error) return

    setIsPending(true)

    try {
      const referral    = localStorage.getItem('referral')
      const transaction = await deposit(wallet, vault, value, referral)

      setValue('')
      setIsPending(false)
      dispatch(dropNotificationGroup('deposits'))
      dispatch(depositSent(chainId, transaction.hash))

      const receipt = await transaction.wait()

      onUpdate()
      dispatch(dropNotificationGroup('deposits'))
      dispatch(depositSuccess(chainId, receipt.transactionHash))

    } catch (error) {
      setIsPending(false)
      dispatch(dropNotificationGroup('deposits'))
      dispatch(depositError(chainId, error))
    }
  }

  const onMax = () => {
    // Take time into account, by now the available quota is lower than when
    // data was fetched (rewards are harvested on each block).
    const availableQuota = vault.availableQuota.times(0.99)
    const value          = BigNumber.min(balance, availableQuota)

    setValue(value.toFixed())
  }

  const onChange = ({ target }) => setValue(target.value)
  const onSubmit = (isApproved) ? onDeposit : onApprove

  return (
    <form onSubmit={preventDefault(onSubmit)}>
      <header className="d-flex justify-content-between">
        <label htmlFor="deposit" className="fs-5 fw-bolder">Deposit</label>

        <p className="vault-panel-highlight">
          Balance:{' '}

          <span title={`${balance.toFixed()} ${symbol}`}>
            {toNumber(balance, { precision: { max: 8 } })} {symbol}
          </span>
        </p>
      </header>

      <fieldset className="input-group has-validation" disabled={!isApproved || isDisabled}>
        <input name="deposit" type="number" value={value} onChange={onChange}
               className={classNames({ 'form-control': true, 'is-invalid': error })} />

        <button type="button" className="btn btn-outline-primary" onClick={onMax}>Max</button>

        <div className="invalid-feedback">{error}</div>
      </fieldset>

      <div className="d-flex flex-column align-items-center mt-4">
        <button type="submit" className="btn btn-primary" disabled={isDisabled}>
          {buttonLabel}
        </button>

        <small className="mt-2 text-muted">Deposit fee: 0%</small>
      </div>
    </form>
  )
}

Deposit.propTypes = {
  vault:    PropTypes.object.isRequired,
  onUpdate: PropTypes.func
}

export default Deposit



// -- HELPERS --

const isTokenApproved = ({ chainId, token, allowance, balance }) => {
  if ([ 137, 80001 ].includes(chainId) && token === 'matic') return true
  if ([ 43114, 43113 ].includes(chainId) && token === 'avax') return true

  return allowance.isGreaterThan(balance)
}

const approveSent = (chainId, hash) => {
  return txSent('deposits', 'approval', chainId, hash)
}

const approveSuccess = () => {
  const message = 'The approval was successful, you may deposit now.'

  return notifySuccess('deposits', message)
}

const approveError = (chainId, error) => {
  return txError('deposits', 'approval', chainId, error)
}

const depositSent = (chainId, hash) => {
  return txSent('deposits', 'deposit', chainId, hash)
}

const depositSuccess = (chainId, hash) => {
  return txSuccess('deposits', 'deposit', chainId, hash)
}

const depositError = (chainId, error) => {
  return txError('deposits', 'deposit', chainId, error)
}
