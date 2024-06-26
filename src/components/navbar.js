import React, { useEffect, useState, useRef } from "react";
import { Link, useLocation, useNavigate } from 'react-router-dom'
import logoDark from "../assets/images/logo-dark.png"
import logoWhite from "../assets/images/logo-white.png"
import logoLight from "../assets/images/logo-light.png"
import { LuSearch, FiUser, FiSettings, FiLogOut, FiLogIn } from "../assets/icons/vander";

import useEnterpriseInfo from '../hook/useEnterpriseInfo';
import useJobSeekerInfo from "../hook/useJobSeekerInfo";

export default function Navbar({ navClass, navLight }) {
    let [isOpen, setMenu] = useState(true);
    let [scroll, setScroll] = useState(false);
    let [search, setSearch] = useState(false);
    let [cartitem, setCartitem] = useState(false);

    let [manu, setManu] = useState('');
    let location = useLocation();
    const cartDropdownRef = useRef(null);
    const navigate = useNavigate();

    const { data: jobseekerData } = useJobSeekerInfo();
    const { data: enterpriseData } = useEnterpriseInfo();
    const jobSeekerRole = localStorage.getItem("roleJobSeeker");
    const enterpriseRole = localStorage.getItem("roleEnterprise");
    const jobseeker = jobseekerData?.data;
    const enterprise = enterpriseData?.data;

    useEffect(() => {
        const current = location.pathname.substring(location.pathname.lastIndexOf('/') + 1);
        setManu(current);
    }, [location.pathname]);


    useEffect(() => {
        function scrollHandler() {
            setScroll(window.scrollY > 50);
        }

        window.addEventListener('scroll', scrollHandler);

        const searchModal = () => setSearch(false);
        document.addEventListener('mousedown', searchModal);

        const cartModal = (event) => {
            if (cartDropdownRef.current && !cartDropdownRef.current.contains(event.target)) {
                setCartitem(false);
            }
        };
        document.addEventListener('mousedown', cartModal);
        window.scrollTo(0, 0);

        return () => {
            window.removeEventListener('scroll', scrollHandler);
            document.removeEventListener('mousedown', searchModal);
            document.removeEventListener('mousedown', cartModal);
        };
    }, []);

    const toggleMenu = () => {
        setMenu(!isOpen)
        if (document.getElementById("navigation")) {
            const anchorArray = Array.from(document.getElementById("navigation").getElementsByTagName("a"));
            anchorArray.forEach(element => {
                element.addEventListener('click', (elem) => {
                    const target = elem.target.getAttribute("href")
                    if (target !== "") {
                        if (elem.target.nextElementSibling) {
                            var submenu = elem.target.nextElementSibling.nextElementSibling;
                            submenu.classList.toggle('open');
                        }
                    }
                })
            });
        }
    }
    // Function to get avatar_url from user or enterprise
    const getAvatarUrl = () => {
        if (jobSeekerRole && jobseeker?.avatar_url) {
            return jobseeker.avatar_url;
        }
        else if (enterpriseRole && enterprise?.avatar_url) {
            return enterprise.avatar_url;
        }

    };
    const renderUser = () => (
        <div className="dropdown dropdown-primary" ref={cartDropdownRef}>
            <button type="button" onClick={() => setCartitem(!cartitem)} className="dropdown-toggle btn btn-sm btn-icon btn-pills btn-primary">
                <img src={getAvatarUrl()} className="img-fluid rounded-pill" alt="" />

            </button>
            <div style={{ display: cartitem === true ? 'block' : 'none' }}>
                <div className={`dropdown-menu dd-menu dropdown-menu-end bg-white rounded shadow border-0 mt-3 show`}>
                    {jobSeekerRole && (
                        <Link to="/candidate-profile" className="dropdown-item fw-medium fs-6"><FiUser className="fea icon-sm me-2 align-middle" />Profile</Link>
                    )}{enterpriseRole && (
                        <Link to="/employer-profile" className="dropdown-item fw-medium fs-6"><FiUser className="fea icon-sm me-2 align-middle" />Profile</Link>
                    )}
                    {jobSeekerRole
                        && (
                            <Link to="/candidate-profile-setting" className="dropdown-item fw-medium fs-6"><FiSettings className="fea icon-sm me-2 align-middle" />Settings</Link>
                        )}{enterpriseRole && (
                            <Link to="/employer-profile" className="dropdown-item fw-medium fs-6"><FiSettings className="fea icon-sm me-2 align-middle" />Settings</Link>
                        )}
                    <div className="dropdown-divider border-top"></div>

                    {/* <Link to="/lock-screen" className="dropdown-item fw-medium fs-6"><FiLock className="fea icon-sm me-2 align-middle" />Lockscreen</Link> */}

                    <span onClick={() => {
                        localStorage.clear();
                        navigate("/");
                        window.location.reload();
                    }} className="dropdown-item fw-medium fs-6"><FiLogOut className="fea icon-sm me-2 align-middle" />Logout</span>
                </div>
            </div>
        </div>
    );

    return (
        <header id="topnav" className={`${scroll ? 'nav-sticky' : ''} ${navClass}`}>
            <div className="container">
                {navLight === true ?
                    <Link className="logo" to="/">
                        <span className="logo-light-mode">
                            <img src={logoDark} className="l-dark" alt="" />
                            <img src={logoLight} className="l-light" alt="" />
                        </span>
                        <img src={logoLight} className="logo-dark-mode" alt="" />
                    </Link> :
                    <Link className="logo" to="/">
                        <span className="logo-light-mode">
                            <img src={logoDark} className="l-dark" alt="" />
                            <img src={logoWhite} className="l-light" alt="" />
                        </span>
                        <img src={logoWhite} className="logo-dark-mode" alt="" />
                    </Link>
                }
                <div className="menu-extras">
                    <div className="menu-item">
                        <Link to='#' className="navbar-toggle" id="isToggle" onClick={toggleMenu}>
                            <div className="lines">
                                <span></span>
                                <span></span>
                                <span></span>
                            </div>
                        </Link>
                    </div>
                </div>

                <ul className="buy-button list-inline mb-0">
                    <li className="list-inline-item ps-1 mb-0">
                        <div className="dropdown">
                            <button type="button" onClick={() => setSearch(!search)} className="dropdown-toggle btn btn-sm btn-icon btn-pills btn-primary">
                                <LuSearch className="icons" />
                            </button>
                            <div style={{ display: search === true ? 'block' : 'none' }}>
                                <div className={`dropdown-menu dd-menu dropdown-menu-end bg-white rounded border-0 mt-3 p-0 show`} style={{ width: '240px', position: 'absolute', right: '0' }}>
                                    <div className="search-bar">
                                        <div id="itemSearch" className="menu-search mb-0">
                                            <form role="search" method="get" id="searchItemform" className="searchform">
                                                <input type="text" className="form-control rounded border" name="s" id="searchItem" placeholder="Search..." />
                                                <input type="submit" id="searchItemsubmit" value="Search" />
                                            </form>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </li>

                    <li className="list-inline-item ps-1 mb-0">
                        {jobseeker || enterprise ? (
                            renderUser()
                        ) : (
                            <div className="dropdown dropdown-primary">
                                <Link to="/login" className="btn btn-sm btn-icon btn-pills btn-primary">
                                    <FiLogIn />
                                </Link>
                            </div>
                        )}
                    </li>
                </ul>

                <div id="navigation">
                    <ul className="navigation-menu nav-right nav-light">
                        <li className={manu === "index-two" ? "active" : ""}>
                            <Link to="/index-two">Home</Link>
                        </li>

                        <li className={`${["job-categories", "job-grid-two", "job-list-one", "job-detail-three", "job-apply", "job-post", "career"].includes(manu) ? "active" : ""} has-submenu parent-menu-item`}><Link to="#"> Jobs </Link><span className="menu-arrow"></span>
                            <ul className="submenu">
                                {/* Job Categories */}
                                <li className={manu === "job-categories" ? "active" : ""}><Link to="/job-categories" className="sub-menu-item">Job Categories</Link></li>
                                {/* Job Grids Two */}
                                <li className={manu === "job-grid-two" ? "active" : ""}><Link to="/job-grid-two" className="sub-menu-item"> Job Grids</Link>
                                </li>
                                {/* Job Lists One */}
                                <li className={manu === "job-list-one" ? "active" : ""}> <Link to="/job-list-one" className="sub-menu-item"> Job Lists</Link>
                                </li>
                            </ul>
                        </li>

                        {enterpriseRole && (
                            <li className={manu === "job-post" ? "active" : ""}><Link to="/job-post" className="sub-menu-item">Post Job</Link></li>
                        )}

                        <li className={`${["aboutus", "services", "pricing", "helpcenter-overview", "helpcenter-faqs", "helpcenter-guides", 'helpcenter-support', "blogs", "blog-sidebar", "blog-detail", "login", "signup", "reset-password", "lock-screen", "terms", "privacy"].includes(manu) ? "active" : ""} has-submenu parent-menu-item`}>
                            <Link to="#">Support</Link><span className="menu-arrow"></span>
                            <ul className="submenu">
                                <li className={manu === "aboutus" ? "active" : ""}><Link to="/aboutus" className="sub-menu-item">About Us</Link></li>
                                <li className={manu === "services" ? "active" : ""}><Link to="/services" className="sub-menu-item">Services</Link></li>
                                <li className={manu === "pricing" ? "active" : ""}><Link to="/pricing" className="sub-menu-item">Pricing </Link></li>

                                <li className={`${["helpcenter-overview", "helpcenter-faqs", "helpcenter-guides", 'helpcenter-support'].includes(manu) ? "active" : ""} has-submenu parent-menu-item`}>
                                    <Link to="#"> Helpcenter </Link><span className="submenu-arrow"></span>
                                    <ul className="submenu">
                                        <li className={manu === "helpcenter-overview" ? "active" : ""}><Link to="/helpcenter-overview" className="sub-menu-item">Overview</Link></li>
                                        <li className={manu === "helpcenter-faqs" ? "active" : ""}><Link to="/helpcenter-faqs" className="sub-menu-item">FAQs</Link></li>
                                        <li className={manu === "helpcenter-guides" ? "active" : ""}><Link to="/helpcenter-guides" className="sub-menu-item">Guides</Link></li>
                                        <li className={manu === "helpcenter-support" ? "active" : ""}><Link to="/helpcenter-support" className="sub-menu-item">Support</Link></li>
                                    </ul>
                                </li>



                            </ul>
                        </li>

                        <li className={`${["blogs", "blog-sidebar", "blog-detail"].includes(manu) ? "active" : ""} has-submenu parent-menu-item`}>
                            <Link to="#"> Blog </Link><span className="submenu-arrow"></span>
                            <ul className="submenu">
                                <li className={manu === "blogs" ? "active" : ""}><Link to="/blogs" className="sub-menu-item"> Blogs</Link></li>
                                <li className={manu === "blog-sidebar" ? "active" : ""}><Link to="/blog-sidebar" className="sub-menu-item"> Blog Sidebar</Link></li>
                                <li className={manu === "blog-detail" ? "active" : ""}><Link to="/blog-detail" className="sub-menu-item"> Blog Detail</Link></li>
                            </ul>
                        </li>
                        {jobSeekerRole && (
                            <li className={manu === "createCV" ? "active" : ""}><Link to="/template" className="sub-menu-item">Create CV</Link></li>
                        )}
                        <li className={manu === "contactus" ? "active" : ""}><Link to="/contactus" className="sub-menu-item">Contact Us</Link></li>
                    </ul>
                </div>
            </div>
        </header >
    )
}