import styles from "./ImageCard.module.css";
import PropTypes from "prop-types";

function ImageCard({ image, onClick }) {
  return (
    <li className={styles.card} onClick={() => onClick(image)}>
      <img
        className={styles.image}
        src={image.urls.small}
        alt={image.alt_description}
      />
    </li>
  );
}
ImageCard.propTypes = {
  image: PropTypes.shape({
    urls: PropTypes.shape({
      small: PropTypes.string.isRequired,
    }),
    alt_description: PropTypes.string,
  }).isRequired,
  onClick: PropTypes.func.isRequired,
};

export default ImageCard;
