import { NotFoundPage } from 'nextra-theme-docs'
import './styles/notfound.css'

export default function NotFound() {
    return (
        <NotFoundPage content="Submit an issue" labels="broken-link">
            <h1 className="float-animation">
                404
            </h1>
            <h1>Oops! Page Not Found</h1>
            <p>The page you are looking for does not exist or has been moved.</p>
        </NotFoundPage>
    )
}