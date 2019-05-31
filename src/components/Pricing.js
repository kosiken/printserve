import React from 'react'
export default () => (
    <div className="flexer show">
        <div className="card-columns">
            <div className="card border mb-3" style={{minWidth: '18rem'}}>
                <div className="card-header"><span className="stories">0/M </span></div>
                <div className="card-body">
                    <h3 className="card-title">Chilled Printer <span role={'img'} aria-label={'walk'}>🚶</span></h3>
                    <small>Just Printing</small>
                    <ul className="lists">
                        <li>Normal Print Job</li>
                        <li>Lowest Priority</li>
                        <li>No job Tracking</li>
                    </ul>
                </div>
                <div className="card-footer border">
                    <button id="toggle" className="btn btn-primary">Lets Go</button>
                </div>
            </div>
            <div className="card border mb-3" style={{minWidth: '18rem'}}>
                <div className="card-header"><span className="stories">2000/M </span></div>
                <div className="card-body ">
                    <h3 className="card-title">Regular Printer <span role={'img'} aria-label={'graduate'}>🎓</span></h3>
                    <small className="stories">Probably in Final Year</small>
                    <ul className="lists">
                        <li>Accumulated Print Job</li>
                        <li>Higher Priority</li>
                        <li>No job Tracking</li>

                        <li>File Conversions</li>
                    </ul>
                </div>
                <div className="card-footer border">
                    <button id="toggle" className="btn btn-primary">Lets Go</button>
                </div>
            </div>
            <div className="card border mb-3" style={{minWidth: '18rem'}}>
                <div className="card-header"><span className="stories">5000/M </span></div>
                <div className="card-body ">
                    <h3 className="card-title">Volume Printer <span role={'img'} aria-label={'cool'}>😎</span></h3>
                    <small>Definately serious about paper</small>
                    <ul className="lists">
                        <li>Accumulated Print Job</li>
                        <li>Highest Priority</li>
                        <li>Full job Tracking</li>
                        <li>Error Checking</li>
                        <li>File Conversions</li>
                        <li> Always in color</li>
                    </ul>
                </div>
                <div className="card-footer border">
                    <button id="toggle" className="btn btn-primary">Lets Go</button>
                </div>

            </div>

        </div>
    </div>
)