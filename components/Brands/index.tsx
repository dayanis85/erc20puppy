"use client";
import React from "react";
import SingleBrand from "./SingleBrand";
import brandData from "./brandData";

const Brands = () => {
  return (
    <>
      {/* <!-- ===== Clients Start ===== --> */}
      <section className="border border-x-0 border-y-stroke bg-alabaster py-11 dark:border-y-strokedark dark:bg-black">
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            marginBottom: "50px",
            fontFamily: "sans-serif",
            fontWeight: "bolder",
          }}
        >
          <p className="friends">Our Friends In Other Chains</p>
        </div>
        <div
          className="mx-auto max-w-c-1390 px-4 md:px-8 2xl:px-0"
          style={{ marginBottom: "100px" }}
        >
          <div className="grid-col-1 grid items-center justify-center gap-7.5 md:grid-cols-5 lg:gap-12.5 xl:gap-29">
            {brandData.map((brand, key) => (
              <SingleBrand brand={brand} key={key} />
            ))}
          </div>
        </div>
      </section>
      {/* <!-- ===== Clients End ===== --> */}
    </>
  );
};

export default Brands;
