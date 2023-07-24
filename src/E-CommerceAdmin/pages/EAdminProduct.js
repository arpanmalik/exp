/** @format */

import React from "react";
import { Badge, Button, Table } from "react-bootstrap";
import { Carousel } from "react-responsive-carousel";
import { useParams } from "react-router-dom";
import HOC from "../layout/HOC";

const EAdminProduct = () => {
  const { id } = useParams();
  const data = [
    {
      image: [
        {
          img: "https://m.media-amazon.com/images/I/61kWB+uzR2L._SL1500_.jpg",
        },
        {
          img: "https://m.media-amazon.com/images/I/71mhfct4GeL._SL1500_.jpg",
        },
      ],
      title: "Headphone",
      price: 500,
      stock: "100",
      category: "Electronics",
      added: "John",
    },
  ];

  return (
    <>
      <p className="headP">Dashboard / Vendor Products</p>
      <section>
        <div
          className="pb-4 sticky top-0  w-full flex justify-between items-center"
          style={{ width: "98%", marginLeft: "2%" }}
        >
          <span
            className="tracking-widest text-slate-900 font-semibold uppercase"
            style={{ fontSize: "1.5rem" }}
          >
            {id} Products (Total : 2)
          </span>
        </div>

        <div className="sectionCont">
          <div className="filterBox">
            <img
              src="https://t4.ftcdn.net/jpg/01/41/97/61/360_F_141976137_kQrdYIvfn3e0RT1EWbZOmQciOKLMgCwG.jpg"
              alt=""
            />
            <input
              type="search"
              placeholder="Start typing to search for products"
            />
          </div>
          <div className="overFlowCont">
            <Table>
              <thead>
                <tr>
                  <th>Sno.</th>
                  <th>Image</th>
                  <th>Title</th>
                  <th>Added By</th>
                  <th>Price</th>
                  <th>Discount</th>
                  <th>Total Stock</th>
                  <th>Category</th>
                  <th> Status </th>
                  <th> Options </th>
                </tr>
              </thead>
              <tbody>
                {data?.map((i, index) => (
                  <tr key={index}>
                    <td> #{index + 1} </td>
                    <td>
                      <Carousel
                        autoPlay={true}
                        interval={1000}
                        className="ImageCarousel"
                        showThumbs={false}
                        infiniteLoop={true}
                        swipeable={true}
                        stopOnHover={true}
                        showStatus={false}
                      >
                        {i.image.map((img, index) => (
                          <div key={index} className="CarouselImages">
                            <img src={img.img} alt="" />
                          </div>
                        ))}
                      </Carousel>
                    </td>
                    <td> {i.title} </td>
                    <td> {i.added} </td>
                    <td> ${i.price} </td>
                    <td> 50% </td>
                    <td>
                      <Badge bg="success"> {i.stock} in Stock </Badge>
                    </td>
                    <td>{i.category}</td>
                    <td> Approved</td>
                    <td>
                    <Button variant="outline-danger"> Disapproved </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </div>
        </div>
      </section>
    </>
  );
};

export default HOC(EAdminProduct);
