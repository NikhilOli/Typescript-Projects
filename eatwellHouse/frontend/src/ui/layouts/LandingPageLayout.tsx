import Navbar from '../organisms/Navbar'
import Footer from '../organisms/Footer'
import { ReactNode } from '@tanstack/react-router'

const LandingPageLayout = ({children}: {children : ReactNode}) => {
    return (
        <div>
            <Navbar />
            {children}
            <Footer />
        </div>
    )
}

export default LandingPageLayout