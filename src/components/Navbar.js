import React, { useEffect, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';

export default function Navbar() {
    const location = useLocation();
    const navigate = useNavigate();

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');

    const handleLogout = () => {
        localStorage.removeItem('token');
        navigate("/login");
    };

    const getUser = async () => {
        try {
            const response = await fetch('http://localhost:5000/api/auth/getuser', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'auth-token': localStorage.getItem('token')
                }
            });
            const json = await response.json();
            setName(json.username);
            setEmail(json.email);
        } catch (error) {
            console.error("Error fetching user:", error);
        }
    };

    useEffect(() => {
        if (localStorage.getItem('token')) {
            getUser();
        }
    }, [location]); // Problem: when we logged out and logged in with another user it still showed the username and email of previous user until you reload again because the useEffect got triggered only once earlier during the first mounting, to resolve this we added location in the dependency array of useEffect, so now it will load every time our url gets changed, hence the problem solved

    return (
        <div>
            <nav className="navbar navbar-expand-lg bg-body-tertiary shadow-sm border-bottom">
                <div className="container-fluid">
                    <Link className="navbar-brand" to="/">iNotebook</Link>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent"
                        aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                            <li className="nav-item">
                                <Link className={`nav-link ${location.pathname === '/' ? 'active' : ''}`} to="/">Home</Link>
                            </li>
                            <li className="nav-item">
                                <Link className={`nav-link ${location.pathname === '/about' ? 'active' : ''}`} to="/about">About</Link>
                            </li>
                        </ul>

                        {localStorage.getItem('token') && (
                            <div className="d-flex align-items-center ms-auto gap-3">
                                {/* Profile Avatar Dropdown */}
                                <div className="dropdown">
                                    <button
                                        className="btn d-flex align-items-center justify-content-center dropdown-toggle p-0 border-0 bg-transparent"
                                        type="button"
                                        data-bs-toggle="dropdown"
                                        aria-expanded="false"
                                        style={{
                                            width: '42px',
                                            height: '42px',
                                            borderRadius: '50%',
                                            backgroundColor: '#f1f3f5',
                                            transition: 'all 0.3s ease',
                                        }}
                                        onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#e2e6ea'}
                                        onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#f1f3f5'}
                                    >
                                        <i className="fa-solid fa-user" style={{ color: '#343a40', fontSize: '20px' }}></i>
                                    </button>

                                    <ul className="dropdown-menu dropdown-menu-end shadow-sm border-0 rounded-3 p-2" style={{ minWidth: '220px' }}>
                                        <li className="dropdown-item text-dark">
                                            <strong>Username:</strong><br /><span>{name}</span>
                                        </li>
                                        <li className="dropdown-item text-dark">
                                            <strong>Email:</strong><br /><span>{email}</span>
                                        </li>
                                    </ul>
                                </div>

                                {/* Logout Button */}
                                <button
                                    className="btn btn-outline-primary btn-sm"
                                    onClick={handleLogout}
                                    style={{
                                        borderRadius: '20px',
                                        padding: '6px 16px',
                                        transition: 'all 0.3s ease',
                                        fontWeight: '500',
                                        color: '#0d6efd',
                                        borderColor: '#0d6efd',
                                    }}
                                    onMouseEnter={(e) => {
                                        e.currentTarget.style.backgroundColor = '#0d6efd';
                                        e.currentTarget.style.color = '#ffffff';
                                    }}
                                    onMouseLeave={(e) => {
                                        e.currentTarget.style.backgroundColor = 'transparent';
                                        e.currentTarget.style.color = '#0d6efd';
                                    }}
                                >
                                    Logout
                                </button>
                            </div>
                        )}

                    </div>
                </div>
            </nav>
        </div>
    );
}
