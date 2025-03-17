import React, { useEffect, useState } from "react";
import { Table, Image, Tag, Button } from "antd";
import { useNavigate } from "react-router-dom";
import { isProductAlreadyInCompareList, getColorForCategory } from "../../utils/utils";
const ProductDetails = () => {
  const [products, setProducts] = useState([]);
  const [compareList, setCompareList] = useState([]);
  const navigate = useNavigate();
  useEffect(() => {
    fetch("https://dummyjson.com/products")
      .then((res) => res.json())
      .then((data) => {
        setProducts(data.products);
      })
      .catch((error) => console.error("Error fetching products:", error));
  }, []);

  const goToComparePage = () => {
    navigate("/compare-products", { state: { compareList } });
  };

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
      sorter: (a, b) => a.price - b.price,
    },
    {
      title: "Discount (%)",
      dataIndex: "discountPercentage",
      key: "discountPercentage",
      sorter: (a, b) => a.discountPercentage - b.discountPercentage,
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
      render: (ctg) => {
        return (
          <Tag color={getColorForCategory(ctg)} key={ctg}>
            {ctg}
          </Tag>
        );
      },
      sorter: (a, b) => a.category.localeCompare(b.category),
    },
    {
      title: "Compare",
      key: "compare",
      render: (text, product) => (
        <Button
          onClick={() =>
            handleCompare(
              product,
              isProductAlreadyInCompareList(product?.id, compareList) ? "remove" : "compare"
            )
          }
          type="primary"
          danger={isProductAlreadyInCompareList(product?.id, compareList)}
        >
          {isProductAlreadyInCompareList(product?.id, compareList) ? "Remove" : "Compare"}
        </Button>
      ),
    },
  ];

  const handleCompare = (product, btnType) => {
    if (btnType === "compare") {
      if (compareList.length < 4) {
        setCompareList([...compareList, product]);
      }
    } else {
      const updatedList = compareList.filter((e) => e.id !== product.id);
      setCompareList([...updatedList]);
    }
  };

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

      {compareList.length > 0 && (
        <Button className="mt-4" type="primary" onClick={goToComparePage}>
          Compare {compareList.length} product(s)
        </Button>
      )}
    </div>
  );
};

export default ProductDetails;
