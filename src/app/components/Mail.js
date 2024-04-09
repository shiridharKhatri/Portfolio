import Image from "next/image";
import React, { useRef, useState } from "react";

export default function Mail() {
  const [input, setInput] = useState({ email: "", message: "" });
  const successRef = useRef(null);
  const host =
    process.env.NEXT_PUBLIC_HOST || "https://quaint-gray-ladybug.cyclic.app";
  const inpValOnChange = (e) => {
    const { name, value } = e.target;

    setInput({ ...input, [name]: value });
  };
  const sendMessage = async (e) => {
    e.preventDefault();
    let headersList = {
      Accept: "*/*",
      "Content-Type": "application/json",
    };

    let bodyContent = JSON.stringify({
      email: input.email,
      message: input.message,
    });

    let response = await fetch(`${host}/message/messagePost`, {
      method: "POST",
      body: bodyContent,
      headers: headersList,
    });

    let data = await response.json();
    if (data.success === true) {
      successRef.current.style.top = "4rem";
      successRef.current.innerHTML = `   <div class="success">
                      <div class="success__icon">
                        <svg
                          fill="none"
                          height="24"
                          viewBox="0 0 24 24"  
                          width="24"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            clip-rule="evenodd"
                            d="m12 1c-6.075 0-11 4.925-11 11s4.925 11 11 11 11-4.925 11-11-4.925-11-11-11zm4.768 9.14c.0878-.1004.1546-.21726.1966-.34383.0419-.12657.0581-.26026.0477-.39319-.0105-.13293-.0475-.26242-.1087-.38085-.0613-.11844-.1456-.22342-.2481-.30879-.1024-.08536-.2209-.14938-.3484-.18828s-.2616-.0519-.3942-.03823c-.1327.01366-.2612.05372-.3782.1178-.1169.06409-.2198.15091-.3027.25537l-4.3 5.159-2.225-2.226c-.1886-.1822-.4412-.283-.7034-.2807s-.51301.1075-.69842.2929-.29058.4362-.29285.6984c-.00228.2622.09851.5148.28067.7034l3 3c.0983.0982.2159.1748.3454.2251.1295.0502.2681.0729.4069.0665.1387-.0063.2747-.0414.3991-.1032.1244-.0617.2347-.1487.3236-.2554z"
                            fill="#393a37"
                            fill-rule="evenodd"
                          ></path>
                        </svg>
                      </div>
                      <div class="success__title">Success! message sent successfully.</div>
                      <div class="success__close">
                        <svg
                          height="20"
                          viewBox="0 0 20 20"
                          width="20"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="m15.8333 5.34166-1.175-1.175-4.6583 4.65834-4.65833-4.65834-1.175 1.175 4.65833 4.65834-4.65833 4.6583 1.175 1.175 4.65833-4.6583 4.6583 4.6583 1.175-1.175-4.6583-4.6583z"
                            fill="#393a37"
                          ></path>
                        </svg>
                      </div>
                    </div>`;
      setTimeout(() => {
        successRef.current.style.top = "-40rem";
      }, 3000);
    } else {
      successRef.current.style.top = "4rem";
      successRef.current.innerHTML = ` 
      <div class="error">
          <div class="error__icon">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              viewBox="0 0 24 24"
              height="24"
              fill="none"
            >
              <path
                fill="#393a37"
                d="m13 13h-2v-6h2zm0 4h-2v-2h2zm-1-15c-1.3132 0-2.61358.25866-3.82683.7612-1.21326.50255-2.31565 1.23915-3.24424 2.16773-1.87536 1.87537-2.92893 4.41891-2.92893 7.07107 0 2.6522 1.05357 5.1957 2.92893 7.0711.92859.9286 2.03098 1.6651 3.24424 2.1677 1.21325.5025 2.51363.7612 3.82683.7612 2.6522 0 5.1957-1.0536 7.0711-2.9289 1.8753-1.8754 2.9289-4.4189 2.9289-7.0711 0-1.3132-.2587-2.61358-.7612-3.82683-.5026-1.21326-1.2391-2.31565-2.1677-3.24424-.9286-.92858-2.031-1.66518-3.2443-2.16773-1.2132-.50254-2.5136-.7612-3.8268-.7612z"
              ></path>
            </svg>
          </div>
          <div class="error__title">Failed! Failed to send message.</div>
          <div class="error__close">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              viewBox="0 0 20 20"
              height="20"
            >
              <path
                fill="#393a37"
                d="m15.8333 5.34166-1.175-1.175-4.6583 4.65834-4.65833-4.65834-1.175 1.175 4.65833 4.65834-4.65833 4.6583 1.175 1.175 4.65833-4.6583 4.6583 4.6583 1.175-1.175-4.6583-4.6583z"
              ></path>
            </svg>
          </div>
        </div>`;
      setTimeout(() => {
        successRef.current.style.top = "-40rem";
      }, 3000);
    }
    console.log(data);
    setInput({ email: "", message: "" });
  };
  return (
    <section className="mainMailSection">
      <div className="successMessage" ref={successRef}></div>
      <div className="mailSection" id="mailId">
        <div className="cardMail">
          <div className="mailImage">
            <Image src="/mail.gif" alt="message" width={300} height={50} />
          </div>
          <div className="mailContent">
            <h2>
              Do you have any{" "}
              <span style={{ color: "var(--btn-text-color)" }}>message</span>{" "}
              for me?
            </h2>
            <h4>
              Send me your message by entering your valid email address. Thank
              you for visiting this website.
            </h4>
            <form action="">
              <input
                onChange={inpValOnChange}
                value={input.email}
                type="email"
                name="email"
                id="email"
                placeholder="example@gmail.com"
              />
              <textarea
                onChange={inpValOnChange}
                value={input.message}
                name="message"
                id="message"
                placeholder="Type your mesage here..."
              />
              <p>
                Note: Kindly refrain from using any inappropriate language. Only
                reach out through messaging if you have specific questions or
                require assistance. Thank you.
              </p>
              <button onClick={sendMessage}>Send</button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
