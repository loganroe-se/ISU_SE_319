import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

const About = () => {
    return (
        <div className="main album py-5 bg-body-tertiary">
            <div className="container">
                <h2>General Information</h2><hr />
                <p>
                    Course Identifier: Sofware Engineering 3190 (SE 3190)<br />
                    Course Name: Construction of User Interfaces<br />
                    Course Instructor: Abraham Netzahualcoyotl Aldaco Gastelum<br /><br />
                    Date: December 12th, 2024
                </p><br /><br />

                <h2>Meet the Authors</h2><hr />
                <div className="row row-cols-1 row-cols-md-2 g-4">
                    <div className="col">
                        <div className="card">
                            <img src="/images/Authors/logan.jpg" alt="Headshot of Logan Roe" />
                            <div className="card-body">
                                <h5 className="card-title">Logan Roe</h5>
                                <p className="card-text">Email: lroe@iastate.edu</p>
                            </div>
                        </div>
                    </div>
                    <div className="col">
                        <div className="card">
                            <img src="/images/Authors/zach.jpg" alt="Headshot of Zachary Foote" />
                            <div className="card-body">
                                <h5 className="card-title">Zachary Foote</h5>
                                <p className="card-text">Email: zdfoote@iastate.edu</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default About;