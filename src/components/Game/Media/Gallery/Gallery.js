import { useState } from "react";
import { Image } from "semantic-ui-react";
import { map } from "lodash";
import Slider from "react-slick";
import styles from "./Gallery.module.scss";
import { FullModal } from "@/components/Shared/FullModal/FullModal";
import { ENV } from "@/utils/constants";

export function Gallery(props) {
  const { screenshots } = props;
  const [show, setShow] = useState(false);

  const onOpenClose = () => setShow((prevState) => !prevState);

  const screenshotsClone = [...screenshots];
  const principalImage = screenshotsClone.shift();

  const settings = {
    arrows: false,
    dots: true,
    dotsClass: styles.dots,
  lazyLoad: true,
    infinite: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    vertical: true,


  
    customPaging: function (index) {
      return <Image src={ENV.SERVER_HOST+screenshots[index].url} />;
    },
  };

  return (
    <>
      <div className={styles.gallery}>
        <div className={styles.principal}>
          <Image src={ENV.SERVER_HOST+principalImage.url} onClick={onOpenClose} />
        </div>

        <div className={styles.grid}>
          {map(screenshotsClone, (screenshot) => (
            <div key={screenshot.id}>
              <Image src={ENV.SERVER_HOST+screenshot.url} onClick={onOpenClose} />
            </div>
          ))}
        </div>
      </div>

      <FullModal show={show} onClose={onOpenClose}>
        <div className={styles.carouselContainer}>
          <Slider {...settings}>
            {map(screenshots, (screenshot) => (
              <div key={screenshot.id}>
                <Image src={ENV.SERVER_HOST+screenshot.url} />
              </div>
            ))}
          </Slider>
        </div>
      </FullModal>
    </>
  );
}
