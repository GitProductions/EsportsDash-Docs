import { NotFoundPage } from 'nextra-theme-docs'

export default function NotFound() {
    return (

        <NotFoundPage content="Submit an issue" labels="broken-link">
            <style jsx>{`
        @keyframes float {
          0%, 100% {
            transform: translateY(0);
          }
          50% {
            transform: translateY(-20px);
          }
        }
      `}</style>
            <h1
                style={{
                    fontSize: '10rem',
                    animation: 'float 3s ease-in-out infinite',
                }}
            >
                404
            </h1>
            <h1>Oops! Page Not Found</h1>
            <p>The page you are looking for does not exist or has been moved.</p>
        </NotFoundPage>
    )
}