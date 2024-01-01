import { memo, useRef } from "react";
import { useFormik } from "formik";

import { convertToBase64 } from "../helpers/convert";
import { addProducts } from "../helpers/request";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";
import "./style.css";

function AddProducts() {
    const thumbRef = useRef();
    const formik = useFormik({
        initialValues: {
            thumbnail: null,
            title: "",
            stock: "",
            images: {},
            description: "",
            category: ""
        },
        validate: () => ({}),
        validateOnBlur: false,
        validateOnChange: false,
        onSubmit: async (values) => {
            let formData = new FormData();
            formData.append("title", values.title);
            formData.append("stock", values.stock);
            formData.append("description", values.description);
            formData.append("thumbnail", values.thumbnail);
            formData.append("category", values.category);
            Object.values(values.images).forEach(file => {
                formData.append("images", file);
            })
            let resPromise = addProducts(formData);
            toast.promise(resPromise, {
                loading: "Uploading...",
                success: (res) => res.data.msg,
                error: (error) => error.response.data.msg
            })
        }
    });
    const handleThumbnail = (e) => {
        convertToBase64(e.target.files[0])
        .then(b64img => {
            thumbRef.current.src = b64img;
        })
        formik.setFieldValue("thumbnail", e.target.files[0])
    }
    return(
        <div className="form-container">
            <Toaster position="top-center" />
        <h2>Add product</h2>
        <form onSubmit={formik.handleSubmit}>
            <div className="avatar-container">
                <img src="/placeholder.jpg" alt="placeholder" ref={thumbRef} />
                <label htmlFor="thumbnail">
                    <span>
                        <img src="/edit-icon.png" alt="edit icon" />
                    </span>
                </label>
            </div>
            <input onChange={handleThumbnail} type="file" name="thumbnail" id="thumbnail" accept="image/*" />
            <input {...formik.getFieldProps("title")} type="text" name="title" id="title" placeholder="title" /><br />
            <input {...formik.getFieldProps("stock")} type="number" name="stock" id="stock" placeholder="stock" /><br />
            <input {...formik.getFieldProps("category")} list="category-list" type="text" name="category" id="category" placeholder="category" /><br />
            <input onChange={e => formik.setFieldValue("images", e.target.files)} type="file" name="images" id="images" accept="image/*" multiple /><br />
            <textarea onChange={e => formik.setFieldValue("description", e.target.value)} name="description" id="description" defaultValue={"description"}>
            </textarea><br />
            <input type="submit" value="add" />
            <datalist id="category-list">
                <option value="v1">Value1</option>
                <option value="v2">Value2</option>
                <option value="v3">Value3</option>
                <option value="v4">Value4</option>
                <option value="v5">Value5</option>
                <option value="v6">Value6</option>
            </datalist>
        </form>
        </div>
    );
}

export default memo(AddProducts);