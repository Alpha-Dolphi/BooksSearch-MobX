import styles from "./styles.module.scss";

const NotFound = () => {
  return (
    <div className={styles.box}>
      <h1>404</h1>
      <h3>PAGE NOT FOUND</h3>
      <p>
        Sorry, the page you're looking for doesn't exist. If you think something
        is broken, please report a problem
      </p>
    </div>
  );
};

export default NotFound;
