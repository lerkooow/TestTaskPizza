import s from "./Header.module.scss";

export const Header = () => {
  return (
    <div className={s.header}>
      <img src="pizza.svg" alt="Pizza Logo" className={s.header__imgLogo} />
      <p className={s.header__logo}>Pizza App</p>
    </div>
  );
};
