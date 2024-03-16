"use client";
import Nav from "../components/Nav";
import React, { useEffect, useRef } from "react";
import Footer from "../components/Footer";
import Typed from "typed.js";
import { useRouter } from "next/navigation";
import {
  BiIcons,
  BsIcons,
  LuIcons,
  TbIcons,
  IoIcons,
} from "../components/Icons";
export default function Page() {
  const router = useRouter();
  const el = useRef(null);

  useEffect(() => {
    const typed = new Typed(el.current, {
      strings: ["Web Developer.", "Web Designer.", "Programmer."],
      typeSpeed: 100,
      loop: true,
      smartBackspace: true,
    });

    return () => {
      typed.destroy();
    };
  }, []);
  return (
    <>
    
      <Nav position="fixed" />
      <section className="aboutSection">
        <div
          className="about-header"
          style={{
            background: `linear-gradient(rgba(0,0,0,0.7),rgba(0,0,0,0.8)),url("/header.png")`,
            backgroundPosition: "center",
            backgroundSize: "cover",
            backgroundRepeat: "no-repeat",
          }}
        >
          <h1 id="animationText" ref={el} />
          <button
            onClick={() => {
              router.push("/");
            }}
          >
            <BiIcons.BiHomeAlt />
          </button>
        </div>
        <div className="bannerNumber">
          <div className="projects itms">
            <div className="number">
              <h2>
                <BiIcons.BiGitRepoForked />
              </h2>
              <h3>Projects</h3>
              <h1>100+</h1>
            </div>
          </div>
          <div className="languages itms">
            <div className="number">
              <h2>
                {" "}
                <LuIcons.LuCalendarClock />
              </h2>
              <h3>Experience year</h3>
              <h1>3+</h1>
            </div>
          </div>
          <div className="review itms">
            <div className="number">
              <h2>
                <BsIcons.BsPersonBadge />
              </h2>
              <h3>Clients</h3>
              <h1>5</h1>
            </div>
          </div>
        </div>
        <div className="aboutMainSec">
          <h1>👨‍🎓Description👨‍🎓</h1>
          <p>
            Hello, I'm Shiridhar Khatri, a BIT (Bachelor in Information
            Technology) student at Informatic College Pokhara, affiliated with
            London Metropolitan University. Hailing from Nepal, I am passionate
            about exploring the ever-evolving world of information technology.
            As I navigate through my academic journey, I am driven by a
            curiosity to understand and contribute to the digital landscape.
          </p>
          <h1>🌟 Skills & Strengths 🌟</h1>
          <p>
            I'm great at building both the parts of websites: the stuff you see
            and interact with (like buttons and forms), and the
            behind-the-scenes stuff that makes it all work (like databases and
            servers). I use languages like HTML, CSS, and JavaScript for the
            visible parts, and tools like ReactJS and NextJS to make them even
            cooler. For the hidden stuff, I use NodeJS and ExpressJS to handle
            data and make everything run smoothly. MongoDB is my go-to for
            storing and organizing data securely.
          </p>
          <h1>🚀 Projects & Accomplishments 🚀</h1>
          <p>🔵 I've made various websites:</p>
          <ul>
            <li>
              🔸Blogs and news sites where you can read and share stories, built
              with ReactJS, NodeJS, and MongoDB.
            </li>
            <li>
              🔸My personal portfolio to showcase my work and skills, created
              using NextJS, NodeJS, and MongoDB.{" "}
            </li>
            <li>
              {" "}
              🔸A chat app for real-time conversations, powered by NextJS,
              NodeJS, and MongoDB.
            </li>
            <li>
              {" "}
              🔸An online store for buying and selling stuff, made with NextJS,
              NodeJS, and MongoDB.
            </li>
          </ul>
          <p>
            I'm comfortable using both simple and fancy tools for web
            development, from basic HTML and CSS to advanced frameworks like
            ReactJS and NextJS.
          </p>
          <div className="aboutBelowBtn">
            <button style={{ background: "#7360F2" }}>
              <IoIcons.IoMail />
              &nbsp;Message me
            </button>
            <button style={{ background: "#00b22d" }}>
              <BiIcons.BiLogoUpwork />
              &nbsp;Hire me
            </button>
          </div>
        </div>
      </section>
      <Footer image="./secondLogo.png" />
    </>
  );
}
