import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

import bg1 from '../../assets/images/hero/bg.jpg';
import Navbar from "../../components/navbar";
import Faq from "../../components/faq";
import Footer from "../../components/footer";
import ScrollTop from "../../components/scrollTop";

import { FiMapPin } from '../../assets/icons/vander';

export default function Employers() {
    const [enterprises, setEnterprises] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 12; // Number of items per page

    useEffect(() => {
        const fetchEnterprises = async () => {
            try {
                const response = await fetch('http://localhost:8080/enterprises/list');
                if (!response.ok) {
                    throw new Error('Failed to fetch enterprises');
                }
                const data = await response.json();
                const transformedData = data.map(item => ({
                    id: item.eid,
                    name: item.enterprise_name,
                    image: item.avatar_url,
                    state: item.state,
                    employees: item.employees,
                }));
                setEnterprises(transformedData);
            } catch (error) {
                setError(error.message);
            } finally {
                setLoading(false);
            }
        };

        fetchEnterprises();
    }, []);

    // Pagination logic
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = enterprises.slice(indexOfFirstItem, indexOfLastItem);
    const totalPages = Math.ceil(enterprises.length / itemsPerPage);

    const paginate = (pageNumber) => setCurrentPage(pageNumber);

    return (
        <>
            <Navbar navClass="defaultscroll sticky" navLight={true} />
            <section className="bg-half-170 d-table w-100" style={{ backgroundImage: `url(${bg1})`, backgroundPosition: 'top' }}>
                <div className="bg-overlay bg-gradient-overlay"></div>
                <div className="container">
                    <div className="row mt-5 justify-content-center">
                        <div className="col-12">
                            <div className="title-heading text-center">
                                <h5 className="heading fw-semibold mb-0 sub-heading text-white title-dark">Enterprise</h5>
                            </div>
                        </div>
                    </div>

                    <div className="position-middle-bottom">
                        <nav aria-label="breadcrumb" className="d-block">
                            <ul className="breadcrumb breadcrumb-muted mb-0 p-0">
                                <li className="breadcrumb-item"><Link to="/">Jobnova</Link></li>
                                <li className="breadcrumb-item active" aria-current="page">Enterprise</li>
                            </ul>
                        </nav>
                    </div>
                </div>
            </section>
            <div className="position-relative">
                <div className="shape overflow-hidden text-white">
                    <svg viewBox="0 0 2880 48" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M0 48H1437.5H2880V0H2160C1442.5 52 720 0 720 0H0V48Z" fill="currentColor"></path>
                    </svg>
                </div>
            </div>

            <section className="section">
                <div className="container">
                    <div className="row g-4 gy-5">
                        {loading && <p>Loading...</p>}
                        {error && <p>{error}</p>}
                        {!loading && !error && currentItems.map((item, index) => (
                            <div className="col-lg-3 col-md-4 col-sm-6 col-12" key={index}>
                                <div className="employer-card position-relative bg-white rounded shadow p-4 mt-3">
                                    <div className="employer-img d-flex justify-content-center align-items-center bg-white shadow-md rounded">
                                        <img src={item.image} className="avatar avatar-ex-small" alt="" />
                                    </div>

                                    <div className="content mt-3">
                                        <Link to={`/employer-profile/${item.id}`} className="title text-dark h5">{item.name}</Link>

                                        <p className="text-muted mt-2 mb-0">Digital Marketing Solutions for Tomorrow</p>
                                    </div>

                                    <ul className="list-unstyled d-flex justify-content-between align-items-center border-top mt-3 pt-3 mb-0">
                                        <li className="text-muted d-inline-flex align-items-center"><FiMapPin className="fea icon-sm me-1 align-middle" />{item.state}</li>
                                        <li className="list-inline-item text-primary fw-medium">{item.employees} employees</li>
                                    </ul>
                                </div>
                            </div>
                        ))}
                    </div>

                    <div className="row">
                        <div className="col-12 mt-4 pt-2">
                            <ul className="pagination justify-content-center mb-0">
                                <li className={`page-item ${currentPage === 1 ? 'disabled' : ''}`}>
                                    <Link className="page-link" to="#" aria-label="Previous" onClick={() => paginate(currentPage - 1)}>
                                        <span aria-hidden="true"><i className="mdi mdi-chevron-left fs-6"></i></span>
                                    </Link>
                                </li>
                                {[...Array(totalPages)].map((_, index) => (
                                    <li className={`page-item ${currentPage === index + 1 ? 'active' : ''}`} key={index}>
                                        <Link className="page-link" to="#" onClick={() => paginate(index + 1)}>
                                            {index + 1}
                                        </Link>
                                    </li>
                                ))}
                                <li className={`page-item ${currentPage === totalPages ? 'disabled' : ''}`}>
                                    <Link className="page-link" to="#" aria-label="Next" onClick={() => paginate(currentPage + 1)}>
                                        <span aria-hidden="true"><i className="mdi mdi-chevron-right fs-6"></i></span>
                                    </Link>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
                <div className="container mt-100 mt-60">
                    <Faq />
                </div>
            </section>
            <Footer top={true} />
            <ScrollTop />
        </>
    );
}
