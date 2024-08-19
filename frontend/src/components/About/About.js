import './About.scss'

export function About() {
    return(
        <div className='about-container'>
            <div className='logo-container'>
                <div className='logo'>Tech<span>Market</span></div>  
            </div>
            <div className='about'>
                <p>In this project we embodied an idea of choosing tech product for our work and leisure being only in one place.
                    Then we decided to share this place with everybody.
                    Enjoy!
                    We know how hard it is to find a needle in a haystack. This tool is here to solve this problem. We got parts and computers from different sellers collected, sorted, and shown in the same place.  We hope that you will find this useful and recommend it to your friends.
                </p>
            </div>
        </div>
    );
}