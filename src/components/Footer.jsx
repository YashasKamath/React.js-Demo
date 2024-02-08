import React from "react";
import "mdb-react-ui-kit/dist/css/mdb.min.css";

function Footer() {
  let currentYear = new Date().getFullYear();

  return (
    <footer class="text-center text-lg-start bg-body-tertiary text-muted">
      <hr />
      <section class="">
        <div class="container text-center text-md-start mt-5">
          <div class="row mt-3">
            <div class="col-md-3 col-lg-4 col-xl-3 mx-auto mb-4">
              <h6 class="text-uppercase fw-bold mb-4">
                <i class="fas fa-gem me-3"></i>Biogas
              </h6>
              <p>
                We bridge you and the farmers. Wanna be a part of getting rid of
                biodegradable waste and following sustainable practices at the
                same time? Join us!
              </p>
            </div>

            <div class="col-md-2 col-lg-2 col-xl-2 mx-auto mb-4">
              <h6 class="text-uppercase fw-bold mb-4">Products</h6>
              <p>
                <a href="#!" class="text-reset">
                  Biogas
                </a>
              </p>
              <p>
                <a href="#!" class="text-reset">
                  CNG
                </a>
              </p>
              <p>
                <a href="#!" class="text-reset">
                  LPG
                </a>
              </p>
              <p>
                <a href="#!" class="text-reset">
                  Kerosene
                </a>
              </p>
            </div>

            <div class="col-md-3 col-lg-2 col-xl-2 mx-auto mb-4">
              <h6 class="text-uppercase fw-bold mb-4">Useful links</h6>
              <p>
                <a href="#!" class="text-reset">
                  Pricing
                </a>
              </p>
              <p>
                <a href="#!" class="text-reset">
                  Settings
                </a>
              </p>
              <p>
                <a href="#!" class="text-reset">
                  Orders
                </a>
              </p>
              <p>
                <a href="#!" class="text-reset">
                  Help
                </a>
              </p>
            </div>

            <div class="col-md-4 col-lg-3 col-xl-3 mx-auto mb-md-0 mb-4">
              <h6 class="text-uppercase fw-bold mb-4">Contact</h6>
              <p>
                <i class="fas fa-home me-3"></i> Bagalur Cross, Yelahanka
              </p>
              <p>
                <i class="fas fa-envelope me-3"></i>
                yashaskamath1000@gmail.com
              </p>
              <p>
                <i class="fas fa-phone me-3"></i> + 91 234 567 88
              </p>
              <p>
                <i class="fas fa-print me-3"></i> + 91 234 567 89
              </p>
            </div>
          </div>
        </div>
      </section>

      <div
        className="text-center p-4"
        style={{ backgroundColor: "rgba(0, 0, 0, 0.05)" }}
      >
        © {currentYear} Copyright:
        <a class="text-reset fw-bold" href="https://mdbootstrap.com/">
          Biogas.com
        </a>
      </div>
    </footer>
  );
}

export default Footer;
