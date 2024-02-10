import logo from "../assets/APP-LOGO-LIGHT-THEME.png"

export default function SplashScreenPage(): React.JSX.Element{
    return (
        <div className="splashScreenPage">
            <div className="img">
                <img src={logo} alt="app logo" />
            </div>
        </div>
    )
}