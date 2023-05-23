import React, { useState } from "react";
import { FaImage } from "react-icons/fa";
import { useRouter } from "next/router";
import Image from "next/image";
import Link from "next/link";
import { API_URL } from "@/config/index";
import Layout from "@/components/Layout";
import { toast } from "react-toastify";
import axios from "axios";
import dayjs from "dayjs";
import styles from "@/styles/Form.module.css";

export default function EditEventPage({ event }) {
  const router = useRouter();
  const [values, setValues] = useState({
    name: event?.attributes?.name,
    performers: event?.attributes?.performers,
    venue: event?.attributes?.venue,
    address: event?.attributes?.address,
    date: dayjs(event?.attributes?.date).format("YYYY-MM-DD"),
    time: event?.attributes?.time,
    description: event?.attributes?.description,
  });
  const [imagePreview, setImagePreview] = useState(
    event?.attributes?.image?.data?.attributes?.formats?.thumbnail?.url ||
      event?.attributes?.image?.data?.attributes?.url
  );
  const [showModal, setShowModal] = useState(false);
  const [image, setImage] = useState(null);
  const [isUploading, setIsUploading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validation
    const hasEmptyFields = Object.values(values).some(
      (element) => element === ""
    );
    if (hasEmptyFields) {
      return toast.error("Please fill in all fields");
    }

    const str = values.name;
    const modifiedStr = str.replace(/\s+/g, "-").toLowerCase();

    try {
      const res = await axios.put(`${API_URL}/api/events/${event?.id}`, {
        data: {
          name: values.name,
          performers: values.performers,
          venue: values.venue,
          address: values.address,
          date: values.date,
          time: values.time,
          description: values.description,
          slug: modifiedStr,
        },
      });

      const evt = res.data.data.attributes;
      router.push(`/events/${evt?.slug}`);
      console.log(evt);
    } catch (error) {
      console.log(error.response.data);
      return toast.error("Something Went Wrong");
    }
  };

  const onHandleChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  const imageUploaded = async (e) => {
    e.preventDefault();

    setIsUploading(true);

    console.log(image);

    const formData = new FormData();
    formData.append("files", image);
    formData.append("ref", "api::event.event");
    formData.append("refId", event?.id);
    formData.append("field", "image");

    try {
      const res = await axios.post(`${API_URL}/api/upload`, formData);
      const ImageData = res.data[0];

      console.log(res.data[0]);

      console.log(ImageData?.formats?.thumbnail?.url);
      console.log(ImageData?.url);

      setImagePreview(
        ImageData?.formats?.thumbnail?.url
          ? ImageData?.formats?.thumbnail?.url
          : ImageData?.url
      );
      setShowModal(false);
      setImage(null);
      setIsUploading(false);
    } catch (error) {
      console.log(error.response.data);
      setIsUploading(false);
      return toast.error("Something Went Wrong");
    }
  };

  const handleFileChange = (e) => {
    setImage(e.target.files[0]);
    setShowModal(true);
  };

  return (
    <Layout title="Add new event">
      <Link href="/events">Go Back</Link>
      <h1>Edit Event</h1>

      <form onSubmit={handleSubmit} className={styles.form}>
        <div className={styles.grid}>
          <div>
            <label htmlFor="name">Event Name</label>
            <input
              type="text"
              id="name"
              name="name"
              value={values.name}
              onChange={onHandleChange}
            />
          </div>
          <div>
            <label htmlFor="performers">Performers</label>
            <input
              type="text"
              id="performers"
              name="performers"
              value={values.performers}
              onChange={onHandleChange}
            />
          </div>
          <div>
            <label htmlFor="venue">Venue</label>
            <input
              type="text"
              id="venue"
              name="venue"
              value={values.venue}
              onChange={onHandleChange}
            />
          </div>
          <div>
            <label htmlFor="address">Address</label>
            <input
              type="text"
              id="address"
              name="address"
              value={values.address}
              onChange={onHandleChange}
            />
          </div>
          <div>
            <label htmlFor="date">Date</label>
            <input
              type="date"
              id="date"
              name="date"
              value={values.date}
              onChange={onHandleChange}
            />
          </div>
          <div>
            <label htmlFor="time">Time</label>
            <input
              type="text"
              id="time"
              name="time"
              value={values.time}
              onChange={onHandleChange}
            />
          </div>
        </div>
        <div>
          <label htmlFor="description">Event Description</label>
          <textarea
            type="text"
            id="description"
            name="description"
            value={values.description}
            onChange={onHandleChange}
          ></textarea>
        </div>
        <input type="submit" value="Update Event" className="btn" />
      </form>

      <h2>Event Image</h2>
      {imagePreview ? (
        <Image src={imagePreview} width={170} height={100} alt="image" />
      ) : (
        <div>
          <p>No image uploaded</p>
        </div>
      )}

      <div>
        <button className="btn-secondary" onClick={() => setShowModal(true)}>
          <FaImage /> Set Image
        </button>
      </div>

      {showModal && (
        <div className={styles.modal}>
          <div className={styles.modalBody}>
            <div className={styles.modalHeader}>
              <h4>Image Upload</h4>
              <button
                className="btn-secondary"
                onClick={() => setShowModal(false)}
              >
                Close
              </button>
            </div>
            <div className={styles.modalGrid}>
              <form onSubmit={imageUploaded} className={styles.form}>
                <input
                  type="file"
                  onChange={handleFileChange}
                  className={styles.file}
                />
                <button className="btn" disabled={isUploading}>
                  {isUploading ? "Uploading..." : "Upload"}
                </button>
              </form>
            </div>
          </div>
        </div>
      )}
    </Layout>
  );
}

export async function getServerSideProps({ params: { slug } }) {
  try {
    const res = await axios.get(`${API_URL}/api/events/${slug}?populate=*`);
    const event = res?.data?.data;

    return {
      props: {
        event,
      },
    };
  } catch (error) {
    console.log(error);
    return {
      props: {
        event: {},
      },
    };
  }
}
