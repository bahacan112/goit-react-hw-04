import styles from "./LoadMoreBtn.module.css";
import PropTypes from "prop-types";

function LoadMoreBtn({ onClick }) {
  return (
    <button className={styles.button} onClick={onClick}>
      Load More
    </button>
  );
}
LoadMoreBtn.propTypes = {
  onClick: PropTypes.func.isRequired,
};

export default LoadMoreBtn;
