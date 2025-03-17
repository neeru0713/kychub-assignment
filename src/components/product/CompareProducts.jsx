import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import { Table, Button, Modal, Tag, Image } from "antd";
import { isProductAlreadyInCompareList, getColorForCategory } from "../../utils/utils";
const CompareProducts = () => {
  const location = useLocation();
  const [compareList, setCompareList] = useState(
    location.state?.compareList || []
  );
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [allProducts, setAllProducts] = useState([]);

  const removeProduct = (id) => {
    const updatedList = compareList.filter((product) => product.id !== id);
    setCompareList(updatedList);
  };

  const openModal = () => {
    fetch("https://dummyjson.com/products")
      .then((res) => res.json())
      .then((data) => setAllProducts(data.products));
    setIsModalOpen(true);
  };

  const addToCompare = (product) => {
    if (compareList.length < 4) {
      if (!compareList.some((p) => p.id === product.id)) {
        setCompareList([...compareList, product]);
      }
    }
  };

  const attributesToCompare = [
    { key: "brand", label: "Brand" },
    { key: "price", label: "Price ($)" },
    { key: "discountPercentage", label: "Discount (%)" },
    { key: "category", label: "Category" },
    { key: "thumbnail", label: "Image" },
    { key: "remove", label: "Remove" },
  ];

  const transposedData = attributesToCompare.map((attr) => {
    const rowData = { attribute: attr.label };

    compareList.forEach((product) => {
      if (attr.key === "category") {
        rowData[product.title] = (
          <Tag color={getColorForCategory(product.category)}>
            {product.category}
          </Tag>
        );
      } else if (attr.key === "thumbnail") {
        rowData[product.title] = (
          <Image
            src={product.thumbnail}
            alt={product.title}
            width={80}
          />
        );
      } else if (attr.key === "remove") {
        rowData[product.title] = (
          <Button onClick={() => removeProduct(product.id)} danger>
            Remove
          </Button>
        );
      } else {
        rowData[product.title] = product[attr.key];
      }
    });

    return rowData;
  });

  const tableColumns = [
    {
      title: "Attribute",
      dataIndex: "attribute",
      key: "attribute",
      fixed: "left",
      width: "20%"
    },
    ...compareList.map((product) => ({
      title: product.title,
      dataIndex: product.title,
      key: product.id,
      width: `${80 / compareList?.length}%`
    })),
  ];



  const modalColumns = [
    { title: "Title", dataIndex: "title", key: "title" },
    { title: "Price ($)", dataIndex: "price", key: "price" },
    {
      title: "Category",
      dataIndex: "category",
      key: "category",
      render: (ctg) => <Tag color={getColorForCategory(ctg)}>{ctg}</Tag>,
    },
    {
      title: "Action",
      key: "action",
      render: (text, product) => (
        <Button
          onClick={() => addToCompare(product)}
          disabled={isProductAlreadyInCompareList(product.id, compareList)}
        >
          {isProductAlreadyInCompareList(product.id, compareList) ? "Added" : "Compare"}
        </Button>
      ),
    },
  ];

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4 text-slate-900">
        Compare Products
      </h2>

      {compareList.length > 0 && (
        <Table
          dataSource={transposedData}
          columns={tableColumns}
          pagination={false}
          rowKey="attribute"
          bordered
        />
      )}

      <Button className="mt-4" type="primary" onClick={openModal}>
        Add {compareList.length > 0 ? "More" : "Products to Compare"}
      </Button>

      <Modal
        title="Add More Products"
        open={isModalOpen}
        onCancel={() => setIsModalOpen(false)}
        footer={null}
      >
        <Table
          dataSource={allProducts}
          columns={modalColumns}
          rowKey="id"
          pagination={{ pageSize: 5 }}
        />
      </Modal>
    </div>
  );
};

export default CompareProducts;
