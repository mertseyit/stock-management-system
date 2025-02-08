import { NavLink } from 'react-router-dom';
import logo from '../../assets/images/logo.png';
import Container from './Container';
const CustomNavbar = () => {
  return (
    <nav className="p-3 bg-[#091e39]">
      <Container>
        <div className="flex justify-between items-center">
          <NavLink to={'/'}>
            <img src={logo} alt="Brand Logo" className="w-[120px]" />
          </NavLink>
          <div className="flex items-center justify-end gap-4">
            <NavLink
              to={'/'}
              className="text-white font-semibold hover:text-white "
            >
              Ana Sayfa
            </NavLink>
            <NavLink
              to={'/materials'}
              className="text-white font-semibold hover:text-white "
            >
              Malzemeler
            </NavLink>
            <NavLink
              to={'/stock-processes'}
              className="text-white font-semibold hover:text-white "
            >
              Stok İşlemleri
            </NavLink>
            <NavLink
              to={'/supliers'}
              className="text-white font-semibold hover:text-white "
            >
              Tedarikçiler
            </NavLink>
            <NavLink
              to={'/unit'}
              className="text-white font-semibold hover:text-white"
            >
              Birimler
            </NavLink>
          </div>
        </div>
      </Container>
    </nav>
  );
};

export default CustomNavbar;
