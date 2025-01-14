const categoryOptionsMap = {
    men: "Men",
    women: "Women",
    kids: "Kids",
    accessories: "Accessories",
    footwear: "Footwear",
};

const brandOptionsMap = {
    nike: "Nike",
    adidas: "Adidas",
    puma: "Puma",
    levi: "Levi",
    zara: "Zara",
    "h&m": "H&M",
};

const filterOptions = {
    category: [
        { id: "men", label: "Men" },
        { id: "women", label: "Women" },
        { id: "kids", label: "Kids" },
        { id: "accessories", label: "Accessories" },
        { id: "footwear", label: "Footwear" },
    ],
    brand: [
        { id: "nike", label: "Nike" },
        { id: "adidas", label: "Adidas" },
        { id: "puma", label: "Puma" },
        { id: "levi", label: "Levi's" },
        { id: "zara", label: "Zara" },
        { id: "h&m", label: "H&M" },
    ],
};

const sortOptions = [
    { id: "price-lowtohigh", label: "Price: Low to High", field: "price", value: 1 },
    { id: "price-hightolow", label: "Price: High to Low", field: "price", value: -1 },
    { id: "title-atoz", label: "Title: A to Z", field: "title", value: 1 },
    { id: "title-ztoa", label: "Title: Z to A", field: "title", value: -1 },
];

module.exports = { categoryOptionsMap, brandOptionsMap, filterOptions, sortOptions };