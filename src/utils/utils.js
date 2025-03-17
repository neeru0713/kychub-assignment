export const isProductAlreadyInCompareList = (productId, compareList) => {
  return compareList.some((p) => p.id === productId);
};

export const getColorForCategory = (category) => {
    const colors = ["red", "orange", "green", "blue", "purple", "cyan"];
    let index = [...category].reduce((acc, char) => acc + char.charCodeAt(0), 0) % colors.length;
    return colors[index];
  };
  