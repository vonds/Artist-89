import React from 'react'
import { Link } from 'react-router-dom'
import GoogleAuth from './GoogleAuth'

const Header = () => {
    return (
        <div className="inverted navbar-expand-lg navbar-dark bg-primary mb-4">
            <div className="ui inverted secondary pointing menu">
                <Link to="/" className="item ui">The Artist Club 89</Link>
                <div className="right menu">
                    <Link to="/" className="item">All Streams</Link>
                    <GoogleAuth />
                </div>
            </div>
        </div>
    )
}

export default Header