import berrySonarLogo from '../Images/berry-sonar-logo.png';
import { signOutUser } from '../Functions/Firebase';

export default function Nav() {
    return (
        <nav className="navbar bg-dark border-bottom border-body navbar-expand-lg"  data-bs-theme="dark">
            <div className="container-fluid">
                <a className="navbar-brand" href="" onClick={signOutUser}>
                    <img src={berrySonarLogo} style={{height:"50px"}}/>
                </a>

            </div>
        </nav>
    );
}