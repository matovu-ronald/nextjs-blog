import classes from "./hero.module.css";
import Image from "next/image";

function Hero() {
  return (
    <section className={classes.hero}>
      <div className={classes.image}>
        <Image
          src="/images/site/maron.jpeg"
          alt="Image for Matovu Ronald"
          width={300}
          height={300}
        />
      </div>
      <h1>Hi, I am Matovu Ronald</h1>
      <p>
        I blog about web development – especially fullstack development with
        Laravel & React
      </p>
    </section>
  );
}

export default Hero;
