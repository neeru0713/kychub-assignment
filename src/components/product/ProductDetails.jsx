import React, { useEffect, useState } from "react";
import { Table, Image, Tag } from "antd";

const ProductDetails = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetch("https://dummyjson.com/products")
      .then((res) => res.json())
      .then((data) => {
        setProducts(data.products);
      })
      .catch((error) => console.error("Error fetching products:", error));
  }, []);


  const columns = [
    {
      title: "Thumbnail",
      dataIndex: "thumbnail",
      key: "thumbnail",
      render: (imgSrc) => <Image width={50} src={imgSrc} />,
    },
    {
      title: "Title",
      dataIndex: "title",
      key: "title",
    },
    {
      title: "Description",
      dataIndex: "description",
      key: "description",
      ellipsis: true,
    },
    {
      title: "Price ($)",
      dataIndex: "price",
      key: "price",
    },
    {
      title: "Discount (%)",
      dataIndex: "discountPercentage",
      key: "discountPercentage",
    },
    {
      title: "Brand",
      dataIndex: "brand",
      key: "brand",
    },
    {
      title: "Category",
      dataIndex: "category",
      key: "category",
      render: (ctg) =>  <Tag color="blue" key={ctg}>
      {ctg}
    </Tag>
       
    },
  ];

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4 text-slate-900">Product Details</h2>
      <Table
        dataSource={products}
        columns={columns}
        rowKey="id"
        bordered
        pagination={{ pageSize: 6 }}
      />
    </div>
  );
};

export default ProductDetails;
