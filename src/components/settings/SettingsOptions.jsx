import { useState } from 'react'
import DeleteAccountModal from './DeleteAccountModal'
function SettingsOptions() {
  const [showDeleteAccountModal, setShowDeleteAccountModal] = useState(false)
  return (
    <div className='d-flex justify-content-center align-items-center'>
      <div className='w-50'>
        <button
          className='negative-btn d-block mx-auto mt-5'
          onClick={() => {
            setShowDeleteAccountModal(true)
          }}
        >
          Delete Account
        </button>
        <DeleteAccountModal show={showDeleteAccountModal} onHide={() => setShowDeleteAccountModal(false)} />
      </div>
    </div>
  )
}

export default SettingsOptions
