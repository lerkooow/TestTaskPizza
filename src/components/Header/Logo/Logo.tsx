import s from "../Header.module.scss";

export const Logo = () => {
  return (
    <div className={s.header__logoWrapper}>
      <img src="pizza.svg" alt="Pizza Logo" className={s.header__imgLogo} />
      <p className={s.header__logo}>Pizza App</p>
    </div>
  );
};
