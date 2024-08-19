import "./Welcome_Page.css";

export function Welcome() {
    return (
        <div className="container">
            <div className="links">
                <ul>
                    <li>About</li>
                    <li>Contacts</li>
                </ul>
            </div>
            <div className="main-block">
                <div className="slogan">
                    BestDeals - Your<br/>
                    <span className="tech">Tech</span>
                    <span className="supermarket">Supermarket</span>
                    <h5>One place,many choices</h5>
                </div>
                {/* Take Slides component from Online_Store project */}
            </div>
        </div>
    )
}
