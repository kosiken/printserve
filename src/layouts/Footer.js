import React from 'react'

export default () => (
    <footer>
        <div className="container flex">
            <div className="logo-div">
                <a href="./" className="home-link">
                    <img src="965cc7af2b5badfb827a8814d9303adb.svg" alt="LOGO" id="home-logo" style={{width:"80px"}} />

                </a>
            </div>
            <div className="meta-links">
                <span className="descr accent">Links</span>
                <ul className="unstyled">
                    <li className="light"><a href="/admin" className="footer-link">Admin</a></li>
                    <li className="light"><a href="/issues" className="footer-link">Issues</a></li>
                    <li className="light"><a href="/privacy.html" className="footer-link">Privacy</a></li>

                </ul>
            </div>
            <div className="meta-links">
                <span className="descr accent">Other</span>
                <ul className="unstyled">
                    <li className="light"><a href="/admin" className="footer-link">Blog</a></li>
                    <li className="light"><a href="./krc.html" className="footer-link">About KRC</a></li>
                    <li className="light"><a href="krc/iot" className="footer-link">KRC IOT</a></li>
                    <li className="light"><a href="krc/buzz" className="footer-link">KRC Buz</a></li>

                </ul>
            </div>

        </div>
        <hr/>


            <div className="light" style={{textAlign:'center'}}>&copy; 2019 KRC MEDIA</div>
    </footer>
)