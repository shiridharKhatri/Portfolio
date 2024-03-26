"use client";
import { useEffect, useState } from "react";
import { AiIcons, BiIcons, MdIcons } from "./Icons";
import Image from "next/image";
import Cookies from "js-cookie";
import { Alphabets, Profile } from "./Alphabets";

import Loader from "../tools/Loader";
export default function Testimonial() {
  const [imgs, setImage] = useState("");
  const [currentIndex, setCurrentIndex] = useState(1);
  const [reviews, setReviews] = useState([]);
  const [prLoader, setPrLoader] = useState(true);
  const host =
    process.env.NEXT_PUBLIC_HOST || "https://quaint-gray-ladybug.cyclic.app";

  const handleNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % reviews.length);
  };
  const handlePrev = () => {
    setCurrentIndex(
      (prevIndex) => (prevIndex - 1 + reviews.length) % reviews.length
    );
  };
  function getRatingStars(rating) {
    const fullStars = Math.floor(rating);
    const halfStars = Math.ceil(rating - fullStars);
    const emptyStars = 5 - fullStars - halfStars;
    const stars = [];

    for (let i = 0; i < fullStars; i++) {
      stars.push(
        <h3 key={`full-star-${i}`} className="stars">
          <AiIcons.AiFillStar />
        </h3>
      );
    }

    for (let i = 0; i < halfStars; i++) {
      stars.push(
        <h3 key={`half-star-${i}`} className="stars">
          <AiIcons.AiFillStar style={{ opacity: 0.5 }} />
        </h3>
      );
    }

    for (let i = 0; i < emptyStars; i++) {
      stars.push(
        <h3 key={`empty-star-${i}`} className="stars">
          <AiIcons.AiOutlineStar />
        </h3>
      );
    }

    return stars;
  }

  useEffect(() => {
    const fetchReview = async () => {
      setPrLoader(true);
      let headersList = {
        Accept: "*/*",
      };

      let response = await fetch(`${host}/api/review/fetch`, {
        method: "GET",
        headers: headersList,
      });

      let data = await response.json();
      if (data.success === true) {
        setPrLoader(false);
        setReviews(data.review);
      } else {
        setPrLoader(false);
      }
    };
    fetchReview();
  }, [host]);

  useEffect(() => {
    let name = Cookies.get("name");
    if (Cookies.get("token")) {
      Alphabets.forEach((e) => {
        if (e.letter === name.slice(0, 1).toLowerCase()) {
          setImage(e.image);
        }
      });
    }
  }, []);
  const currentReview = reviews[currentIndex];
  return (
    <>
      <section
        className="testimonial"
        id="testimonialId"
        style={{
          background: `linear-gradient(rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.7)), url("/review.png")`,
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
          backgroundSize: "cover",
        }}
      >
        {currentReview?.source === "upwork" ? (
          <h3 id="reference" style={{ background: "#00b22d" }}>
            <BiIcons.BiLogoUpwork />
          </h3>
        ) : (
          ""
        )}
        <h1>
          Feedback from{" "}
          <span style={{ color: "#f7cd46" }}>Client&apos;s</span>.
        </h1>
        <div className="mainSectiontestimonial">
          {prLoader ? (
            <div className="testimonial-card">
              <Loader />
            </div>
          ) : (
            <div className="testimonial-card">
              <q>{currentReview.review}</q>
              <div className="imageTestimonial">
                {currentIndex <= 0 ? (
                  <Image
                    style={{ opacity: "0" }}
                    id="prevImg"
                    src="/profile.png"
                    alt={reviews[currentIndex].display_name}
                    width={200}
                    height={150}
                    loading="lazy"
                  />
                ) : (
                  <Image
                    id="prevImg"
                    src={
                      reviews[currentIndex - 1].display_name === "unknown"
                        ? "./anonymous.png"
                        : `${host}/reviewImage/${reviews[currentIndex - 1].img}`
                    }
                    alt={reviews[currentIndex - 1].display_name}
                    width={200}
                    height={150}
                  />
                )}

                <Image
                  id="currentImage"
                  src={
                    currentReview.display_name === "unknown"
                      ? "./anonymous.png"
                      : `${host}/reviewImage/${currentReview.img}`
                  }
                  alt={currentReview.display_name}
                  width={200}
                  height={150}
                />
                {currentIndex === reviews.length - 1 ? (
                  <Image
                    style={{ opacity: "0" }}
                    id="nextImg"
                    src="/profile.png"
                    alt={
                      reviews[(currentIndex + 1) % reviews.length].display_name
                    }
                    width={200}
                    height={150}
                  />
                ) : (
                  <Image
                    id="nextImg"
                    src={
                      reviews[(currentIndex + 1) % reviews.length]
                        .display_name === "unknown"
                        ? "./anonymous.png"
                        : `${host}/reviewImage/${
                            reviews[(currentIndex + 1) % reviews.length].img
                          }`
                    }
                    alt={
                      reviews[(currentIndex + 1) % reviews.length].display_name
                    }
                    width={200}
                    height={150}
                  />
                )}
                <div className="nextPrevtest">
                  <button onClick={handlePrev} disabled={currentIndex <= 0}>
                    <MdIcons.MdKeyboardArrowLeft />
                  </button>
                  <button
                    onClick={handleNext}
                    disabled={currentIndex === reviews.length - 1}
                  >
                    <MdIcons.MdKeyboardArrowRight />
                  </button>
                </div>
              </div>
              <h2>{currentReview.display_name}</h2>
              <div className="star">{getRatingStars(currentReview.star)}</div>
            </div>
          )}
        </div>
      </section>
    </>
  );
}
