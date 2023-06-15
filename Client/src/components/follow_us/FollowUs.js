import React, { useRef } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faInstagram } from "@fortawesome/free-brands-svg-icons";
import { Spring } from "react-spring/renderprops";
import { useInView } from "react-intersection-observer";
import "./FollowUs.css";
import "./Instagram.css";
import composeRefs from "@seznam/compose-react-refs";
import FrontDecal from "../../images/FollowUsImages/FrontDecal.jpg";
import FrontCouch from "../../images/FollowUsImages/FrontCouch.jpg";
import FrontDesk from "../../images/FollowUsImages/FrontDesk.jpg";
import SaltCave from "../../images/FollowUsImages/SaltCave.jpg";
import LED from "../../images/FollowUsImages/LED.jpg";
import DimRoom from "../../images/FollowUsImages/DimRoom.jpg";
import NeonSign from "../../images/FollowUsImages/NeonSign.jpg";
import Dermaplaning from "../../images/FollowUsImages/Dermaplaning.jpg";

const FollowUs = React.forwardRef((props, ref) => {
  const { InstagramRef, initialScreenSize, name } = props;
  const followUsHeaderRef = useRef(null);

  const [inViewRef, inView] = useInView({
    triggerOnce: true,
    threshold: initialScreenSize >= 1200 ? 0.3 : 0.2,
  });

  return (
    <div
      className="follow_us_container"
      id={name}
      ref={composeRefs(InstagramRef, inViewRef)}
    >
      {inView ? (
        <>
          <header className="follow_us_sub_container_header">
                  <h1
                    ref={followUsHeaderRef}
                  >
                    SEGUICI
                  </h1>
                  <span
                    className="follow_us_underline"
                  />
          </header>
                <div
                  className="follow_us_sub_container_left"
                >
                  <div className="insta_photo_1">
                    <img
                      alt="Front_Decal"
                      src={FrontDecal}
                    />
                  </div>
                  <div className="insta_photo_2">
                    <img
                      alt="Front_Couch"
                      src={FrontCouch}
                    />
                  </div>
                  <div className="insta_photo_3">
                    <img
                      alt="Front_Desk"
                      src={FrontDesk}
                    />
                  </div>
                  <div className="insta_photo_4">
                    <img
                      alt="Salt_Cave"
                      src={SaltCave}
                    />
                  </div>
                </div>

                <div
                  className="follow_us_sub_container_middle"
                >
                  <p style={{fontWeight: '450', color: 'rgba(0, 0, 0, 0.546)'}}>
                    Connettiti con noi <br />
                    su Instagram <br />
                    per vedere i <br />
                    nostri trattamenti.
                    <br />
                  </p>
                  <FontAwesomeIcon
                    className="instagram_icon"
                    icon={faInstagram}
                    onClick={() =>
                      window.open("https://instagram.com/glow.labs", "_blank")
                    }
                  />
                  <p>@glow.labs</p>
                </div>

                <div
                  className="follow_us_sub_container_right"

                >
                  <div className="insta_photo_5">
                    <img
                      alt="LED"
                      src={LED}
                    />
                  </div>
                  <div className="insta_photo_6">
                    <img
                      alt="Dim_Room"
                      src={DimRoom}
                    />
                  </div>
                  <div className="insta_photo_7">
                    <img
                      alt="Neon_Sign"
                      src={NeonSign}
                    />
                  </div>
                  <div className="insta_photo_8">
                    <img
                      alt="Dermaplaning"
                      src={Dermaplaning}
                    />
                  </div>
                </div>
              </>
      ) : null}
    </div>
  );
});

export default FollowUs;
