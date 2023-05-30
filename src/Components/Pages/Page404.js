import React from "react";
import { Link } from "react-router-dom";

function Page404() {
  return (
    <section class="page_404">
      <div class="container">
        <div class="row">
          <div class="col-sm-12 ">
            <div class="col-sm-10 col-sm-offset-1  text-center">
              <div class="four_zero_four_bg">
                <h1 class="text-center ">404</h1>
              </div>

              <div class="contant_box_404">
                <h3 class="h3">Page Not Found</h3>

                <p>the page you are looking for not avaible!</p>

                {localStorage.getItem("Role")=="admin" ? (
                  <Link class="link_404" to={"/admin"}>
                    Go to Home
                  </Link>
                ) : localStorage.getItem("Role")=="user" ? (
                  <Link class="link_404" to={"/"}>
                    Go to Home
                  </Link>
                ) : (
                  <Link class="link_404" to={"/login"}>
                    Go to Home
                  </Link>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Page404;
