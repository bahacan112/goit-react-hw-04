import Modal from "react-modal";
import styles from "./ImageModal.module.css";
import PropTypes from "prop-types";

Modal.setAppElement("#root");

function ImageModal({ image, onClose }) {
  return (
    <Modal
      isOpen={!!image}
      onRequestClose={onClose}
      className={styles.modal}
      overlayClassName={styles.overlay}
    >
      <img src={image.urls.regular} alt={image.alt_description} />
      <p>Author: {image.user.name}</p>
      <button onClick={onClose}>Close</button>
    </Modal>
  );
}
ImageModal.propTypes = {
  image: PropTypes.shape({
    urls: PropTypes.shape({
      regular: PropTypes.string.isRequired,
    }),
    alt_description: PropTypes.string,
    user: PropTypes.shape({
      name: PropTypes.string,
    }),
  }),
  onClose: PropTypes.func.isRequired,
};

export default ImageModal;
