import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer id="footer">
        <div className="footer-top">

            <div className="container">

                <div className="row  justify-content-center">
                    <div className="col-lg-6">
                        <h3>Eventique</h3>
                        <p>On a mission to revolutionize the way you discover, attend, and host events.</p>
                    </div>
                </div>

            </div>
        </div>

        <div className="container footer-bottom clearfix">
            <div className="copyright">&copy; Copyright <strong><span>Eventique</span></strong>. All Rights Reserved</div>
            <div className="credits">Designed by <Link href="https://bootstrapmade.com/">Team 7</Link></div>
        </div>
        
  </footer>
  );
};

export default Footer;
