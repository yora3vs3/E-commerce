export const categories = [
    { id: 1, name: "Laptop" },
    { id: 2, name: "Electronics" },
    { id: 3, name: "Fashion" },
    { id: 4, name: "Phone" },
];

export const initialState = {
    name: "",
    imageURL: "",
    price: 0,
    category: "",
    brand: "",
    desc: "",
};

export const getImageFilename = (url) => {
    const filenameWithParams = url.substring(url.lastIndexOf('%') + 1);
    const filename = filenameWithParams.split('?')[0];

    return filename;
  }