import { Row } from 'react-bootstrap'
import MobileBottomMenu from '../home/MobileBottomMenu'
import HomeNavbar from '../home/HomeNavbar'
import { SearchProvider } from '../contexts/SearchContext'
import SettingsOptions from './SettingsOptions'

function SettingsPage() {
  return (
    <>
      <SearchProvider>
        <HomeNavbar />
        <MobileBottomMenu />
      </SearchProvider>
      <div className='page-content'>
        <Row>
          <SettingsOptions />
        </Row>
      </div>
    </>
  )
}

export default SettingsPage
