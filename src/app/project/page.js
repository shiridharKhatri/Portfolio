"use client";
import React, { useEffect, useState } from "react";
import {
  AiIcons,
  BiIcons,
  IoIcons,
  SiIcons,
  FaIcons,
  GrIcons,
  PiIcons,
  RiIcons,
  CiIcons,
} from "../components/Icons";
import moment from "moment";
import Image from "next/image";
import Loader from "../tools/Loader";
import Footer from "../components/Footer";
import Nav from "../components/Nav";
import { useRouter } from "next/navigation";
import Cookies from "js-cookie";
import { Alphabets } from "../components/Alphabets";
export default function Page() {
  const host =
    process.env.NEXT_PUBLIC_HOST || "https://quaint-gray-ladybug.cyclic.app";
  // const host = "https://portfolio-backend-0roz.onrender.com";
  const [data, setData] = useState([]);
  const [loader, setLoader] = useState(true);
  const [comment, setComment] = useState("");
  // const [isOpen, setIsOpen] = useState(false);
  const router = useRouter();
  const commentInpOnChange = (e, id) => {
    setComment(e.target.value);
    let sendBtn = document.getElementById(id);
    if (e.target.value.length > 0) {
      sendBtn.style.transform = "rotate(45deg)";
    } else {
      sendBtn.style.transform = "rotate(0deg)";
    }
  };
  const showCommentSec = (id) => {
    const commentSec = document.getElementById(id);
    commentSec.style.bottom = "0";
    commentSec.style.opacity = "1";
  };
  const hideCommentSec = (id) => {
    const commentSec = document.getElementById(id);
    commentSec.style.bottom = "-100%";
    commentSec.style.opacity = "0";
  };
  const commentOnClick = async (id) => {
    try {
      let headersList = {
        Accept: "*/*",
        "auth-token": Cookies.get("token"),
        "Content-Type": "application/json",
      };

      let bodyContent = JSON.stringify({
        projectId: id,
        comment: comment,
      });

      let response = await fetch(`${host}/api/project/comment`, {
        method: "POST",
        body: bodyContent,
        headers: headersList,
      });

      let data = await response.json();
      if (data.success) {
      }
    } catch (error) {
      // Handle errors that may occur during the 'like' action
      console.error("Error during 'like' action:", error.message);
      // You may choose to log the error, show a user-friendly message, or take other appropriate actions
    }
  };
  const tech = [
    {
      name: "nextjs",
      icons: <SiIcons.SiNextdotjs />,
      color: "var(--color)",
    },
    {
      name: "nodejs",
      icons: <FaIcons.FaNodeJs />,
      color: "#3C873A",
    },
    {
      name: "reactjs",
      icons: <GrIcons.GrReactjs />,
      color: "#61dafb",
    },
    {
      name: "mongodb",
      icons: <BiIcons.BiLogoMongodb />,
      color: "#589636",
    },
    {
      name: "css",
      icons: <IoIcons.IoLogoCss3 />,
      color: "#264de4",
    },
    {
      name: "javascript",
      icons: <BiIcons.BiLogoJavascript />,
      color: "#F0DB4F",
    },
    {
      name: "html",
      icons: <AiIcons.AiFillHtml5 />,
      color: "#ea4335",
    },
  ];
  // Check if window is defined (client-side)
  const isClient = typeof window !== "undefined";
  let likeAudio = isClient ? new Audio("./audio/like.mp3") : null;
  let unLikeAudio = isClient ? new Audio("./audio/unlike.mp3") : null;

  const likeOnClick = async (id) => {
    try {
      // Prepare headers for the HTTP request
      const headers = {
        Accept: "*/*",
        "auth-token": Cookies.get("token"),
        "Content-Type": "application/json",
      };

      // Prepare the request body
      const body = JSON.stringify({
        productId: id,
      });

      // Perform the 'like' action by sending a POST request to the server
      await fetch(`${host}/api/project/like`, {
        method: "POST",
        body,
        headers,
      });

      // If the 'like' action is successful, you may choose to perform additional actions
      // For example, reloading the page
      // Uncomment the following lines if needed:
      // const data = await response.json();
      // if (data.success === true) {
      //   location.reload();
      // }
    } catch (error) {
      // Handle errors that may occur during the 'like' action
      console.error("Error during 'like' action:", error.message);
      // You may choose to log the error, show a user-friendly message, or take other appropriate actions
    }
  };
  const changeLike = (input, button, path, span, id) => {
    let spns = document.getElementById(span);
    let inpt = document.getElementById(input);
    let btns = document.getElementById(button);
    let svg = document.getElementById(path);
    // console.log(Number(spns.innerText));

    if (inpt.checked) {
      likeAudio.play();
      btns.style.color = "#FF5353";
      svg.style.fill = "#FF5353";
      svg.style.stroke = "#FF5353";
      svg.style.transition = "100ms";
      spns.style.color = "#FF5353";
      spns.innerHTML = Number(spns.innerText) + 1;
      likeOnClick(id);
    } else {
      unLikeAudio.play();
      btns.style.color = "#000000";
      svg.style.fill = "none";
      svg.style.stroke = "var(--color)";
      svg.style.transition = "100ms";
      spns.style.color = "var(--color)";
      spns.innerHTML = Number(spns.innerText) - 1;
      likeOnClick(id);
    }
  };
  const likeOnDoubleClick = (likeBtn, heart, input, button, path, span, id) => {
    const likeSec = document.getElementById(likeBtn);
    const inputHeart = document.getElementById(heart);
    const inpts = document.getElementById(input);
    let spns = document.getElementById(span);
    let btns = document.getElementById(button);
    let svg = document.getElementById(path);

    likeSec.style.opacity = "1";
    inputHeart.checked = true;
    likeAudio.play();
    if (!inpts.checked) {
      inpts.checked = true;
      likeAudio.play();
      btns.style.color = "#FF5353";
      svg.style.fill = "#FF5353";
      svg.style.stroke = "#FF5353";
      svg.style.transition = "100ms";
      spns.style.color = "#FF5353";
      spns.innerHTML = Number(spns.innerText) + 1;
      likeOnClick(id);
    } else {
      btns.style.color = "#FF5353";
      svg.style.fill = "#FF5353";
      svg.style.stroke = "#FF5353";
      svg.style.transition = "100ms";
      spns.style.color = "#FF5353";
    }
    setTimeout(() => {
      likeSec.style.opacity = "0";
      inputHeart.checked = false;
    }, 1000);
  };
  useEffect(() => {
    const fetchProjects = async () => {
      setLoader(true);
      let headersList = {
        Accept: "*/*",
      };

      let response = await fetch(`${host}/api/project/fetch`, {
        method: "GET",
        headers: headersList,
      });

      let data = await response.json();
      if (data.success === true) {
        setLoader(false);
        setData(data);
      } else {
        setLoader(false);
      }
    };
    fetchProjects();
  }, [host]);
  return (
    <>
      <Nav position="relative" background="#000000" image="./logo.png" />
      <section
        id="projectSec"
        className="projects"
        style={{ margin: "0rem 0 5rem 0" }}
      >
        {loader ? (
          <div className="loaderSection">
            <Loader />
          </div>
        ) : (
          <>
            <div className="titleHead">
              <h3>Total projects ({data.total}) </h3>
            </div>
            <div className="projectCards">
              {data.project?.map((e, index) => {
                return (
                  <div className="card" key={e._id}>
                    <div className="project-card-items">
                      <div
                        className="image"
                        style={{ position: "relative", userSelect: "none" }}
                        onDoubleClick={() => {
                          !Cookies.get("token")
                            ? router.push("/login")
                            : likeOnDoubleClick(
                                `${index}likeBtn`,
                                `${index}heartInImage`,
                                `${index}input`,
                                index,
                                `${index}path`,
                                `${index}span`,
                                e._id
                              );
                        }}
                      >
                        <div
                          id={`${index}likeBtn`}
                          className="likeBtnImg"
                          style={{ position: "absolute" }}
                        >
                          <div className="heart-container" title="Like">
                            <input
                              type="checkbox"
                              className="checkbox"
                              id={`${index}heartInImage`}
                            />
                            <div className="svg-container">
                              <svg
                                viewBox="0 0 24 24"
                                className="svg-outline"
                                xmlns="http://www.w3.org/2000/svg"
                              >
                                <path d="M17.5,1.917a6.4,6.4,0,0,0-5.5,3.3,6.4,6.4,0,0,0-5.5-3.3A6.8,6.8,0,0,0,0,8.967c0,4.547,4.786,9.513,8.8,12.88a4.974,4.974,0,0,0,6.4,0C19.214,18.48,24,13.514,24,8.967A6.8,6.8,0,0,0,17.5,1.917Zm-3.585,18.4a2.973,2.973,0,0,1-3.83,0C4.947,16.006,2,11.87,2,8.967a4.8,4.8,0,0,1,4.5-5.05A4.8,4.8,0,0,1,11,8.967a1,1,0,0,0,2,0,4.8,4.8,0,0,1,4.5-5.05A4.8,4.8,0,0,1,22,8.967C22,11.87,19.053,16.006,13.915,20.313Z"></path>
                              </svg>
                              <svg
                                viewBox="0 0 24 24"
                                className="svg-filled"
                                xmlns="http://www.w3.org/2000/svg"
                              >
                                <path d="M17.5,1.917a6.4,6.4,0,0,0-5.5,3.3,6.4,6.4,0,0,0-5.5-3.3A6.8,6.8,0,0,0,0,8.967c0,4.547,4.786,9.513,8.8,12.88a4.974,4.974,0,0,0,6.4,0C19.214,18.48,24,13.514,24,8.967A6.8,6.8,0,0,0,17.5,1.917Z"></path>
                              </svg>
                              <svg
                                className="svg-celebrate"
                                width="100"
                                height="100"
                                xmlns="http://www.w3.org/2000/svg"
                              >
                                <polygon points="10,10 20,20"></polygon>
                                <polygon points="10,50 20,50"></polygon>
                                <polygon points="20,80 30,70"></polygon>
                                <polygon points="90,10 80,20"></polygon>
                                <polygon points="90,50 80,50"></polygon>
                                <polygon points="80,80 70,70"></polygon>
                              </svg>
                            </div>
                          </div>
                        </div>
                        <Image
                          style={{ userSelect: "none" }}
                          src={`${host}/projectImage/${e.image[0]}`}
                          // src={e.image}
                          alt="projectPicture"
                          layout="responsive"
                          width={200}
                          height={150}
                        />
                      </div>
                      <div className="techUsed">
                        <ul id="techUsed">
                          {tech.map((e, index) => {
                            return (
                              <li key={index} style={{ color: e.color }}>
                                {e.icons}
                              </li>
                            );
                          })}
                        </ul>
                      </div>
                      <div className="details">
                        <h2>{e.title}</h2>
                        <p>
                          {e.description.length > 210
                            ? e.description.slice(0, 210) + "..."
                            : e.description}
                        </p>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </>
        )}
      </section>
      <Footer image="./secondLogo.png" />
    </>
  );
}
