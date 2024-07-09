import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

import bg1 from '../assets/images/hero/bg.jpg'
import Navbar from "../componants/navbar";
import Footer from "../componants/footer";
import ScrollTop from "../componants/scrollTop";

export default function JobPost(){
    return(
        <>
        <Navbar navClass="defaultscroll sticky" navLight={true}/>

        <section className="bg-half-170 d-table w-100" style={{backgroundImage:`url(${bg1})`, backgroundPosition:'top'}}>
            <div className="bg-overlay bg-gradient-overlay"></div>
            <div className="container">
                <div className="row mt-5 justify-content-center">
                    <div className="col-12">
                        <div className="title-heading text-center">
                            <h5 className="heading fw-semibold mb-0 sub-heading text-white title-dark">Create a Job Post</h5>
                        </div>
                    </div>
                </div>

                <div className="position-middle-bottom">
                    <nav aria-label="breadcrumb" className="d-block">
                        <ul className="breadcrumb breadcrumb-muted mb-0 p-0">
                            <li className="breadcrumb-item"><Link to="/">Jobnova</Link></li>
                            <li className="breadcrumb-item active" aria-current="page">Job Post</li>
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

        <section className="section bg-light">
            <div className="container">
                <div className="row justify-content-center">
                    <div className="col-xl-7 col-lg-8">
                        <div className="card border-0">
                            <form className="rounded shadow p-4">
                                <div className="row">
                                    <h5 className="mb-3">Job Details:</h5>                                    
                                    <div className="col-12">
                                        <div className="mb-3">
                                            <label className="form-label fw-semibold">Job Title :</label>
                                            <input name="subject" id="subject2" className="form-control" placeholder="Title :"/>
                                        </div>                                                                               
                                    </div>
                                    <div className="col-12">
                                        <div className="mb-3">
                                            <label className="form-label fw-semibold">Description :</label>
                                            <textarea name="comments" id="comments2" rows="4" className="form-control" placeholder="Describe the job :"></textarea>
                                        </div>
                                    </div>
                                    <div className="col-md-6">
                                        <div className="mb-3">
                                            <label className="form-label fw-semibold">Job Type:</label>
                                            <select className="form-control form-select" id="Type">
                                                <option value="WD">Web Designer</option>
                                                <option value="WD">Web Developer</option>
                                                <option value="UI">UI / UX Desinger</option>
                                            </select>
                                        </div>
                                    </div>

                                    <div className="col-md-6">
                                        <div className="mb-3">
                                            <label className="form-label fw-semibold">Job Categories:</label>
                                            <select className="form-control form-select" id="Categories">
                                                <option>All Jobs</option>
                                                <option>Full Time</option>
                                                <option>Half Time</option>
                                                <option>Remote</option>
                                                <option>In Office</option>
                                            </select>
                                        </div>
                                    </div>

                                    <div className="col-md-6">
                                        <div className="mb-3">
                                            <label className="form-label fw-semibold">Salary:</label>
                                            <select className="form-control form-select" id="Salary">
                                                <option value="HOURL">Hourly</option>
                                                <option value="MONTH">Monthly</option>
                                            </select>
                                        </div>
                                    </div>

                                    <div className="col-md-3">
                                        <div className="mb-3 mt-md-4 pt-md-1">
                                            <label className="form-label small fw-bold d-none"></label>
                                            <div className="input-group mb-3">
                                                <span className="input-group-text border" id="basic-addon1">$</span>
                                                <input type="number" className="form-control" min="1" max="1000" placeholder="Min" id="MIn" aria-describedby="inputGroupPrepend" required/>
                                            </div>
                                        </div>
                                        <div className="col-md-6">
                                            <div className="mb-3">
                                                <label className="form-label fw-semibold">Maximum Salary:</label>
                                                <input name="maxSalary" type="number" className="form-control" placeholder="Maximum Salary" value={formData.maxSalary} onChange={handleChange} />
                                            </div>
                                        </div>
                                        <div className="col-12">
                                            <div className="mb-3">
                                                <label className="form-label fw-semibold">Skills:</label>
                                                <input name="skills" className="form-control" placeholder="Skills" value={formData.skills} onChange={handleChange} />
                                            </div>
                                        </div>
                                        <div className="col-12">
                                            <div className="mb-3">
                                                <label className="form-label fw-semibold">Qualifications:</label>
                                                <input name="qualifications" className="form-control" placeholder="Qualifications" value={formData.qualifications} onChange={handleChange} />
                                            </div>
                                        </div>
                                        <div className="col-12">
                                            <div className="mb-3">
                                                <label className="form-label fw-semibold">Experience:</label>
                                                <input name="experience" className="form-control" placeholder="Experience" value={formData.experience} onChange={handleChange} />
                                            </div>
                                        </div>
                                        <div className="col-12">
                                            <div className="mb-3">
                                                <label className="form-label fw-semibold">Industry:</label>
                                                <input name="industry" className="form-control" placeholder="Industry" value={formData.industry} onChange={handleChange} />
                                            </div>
                                        </div>
                                        <div className="col-12">
                                            <div className="mb-3">
                                                <label className="form-label fw-semibold">Address:</label>
                                                <input name="address" className="form-control" placeholder="Address" value={formData.address} onChange={handleChange} />
                                            </div>
                                        </div>
                                        <div className="col-md-6">
                                            <div className="mb-3">
                                                <label className="form-label fw-semibold">Country:</label>
                                                <input name="country" className="form-control" placeholder="Country" value={formData.country} onChange={handleChange} />
                                            </div>
                                        </div>
                                        <div className="col-md-6">
                                            <div className="mb-3">
                                                <label className="form-label fw-semibold">State:</label>
                                                <input name="state" className="form-control" placeholder="State" value={formData.state} onChange={handleChange} />
                                            </div>
                                        </div>
                                        <div className="col-md-6">
                                            <div className="d-grid">
                                                <button type="submit" className="btn btn-primary">Post Job</button>
                                            </div>
                                        </div>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            <Footer />
            <ScrollTop />
        </>
    );
}
