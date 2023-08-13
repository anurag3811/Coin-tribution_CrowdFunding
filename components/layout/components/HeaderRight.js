import styled from 'styled-components';
import Brightness7Icon from '@mui/icons-material/Brightness7';
import DarkModeIcon from '@mui/icons-material/DarkMode';
import Wallet from './Wallet';

const HeaderRight = () => {
  return (
    <HeaderRightWrapper>
      <Wallet />
    </HeaderRightWrapper>
  );
};

const HeaderRightWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-right: 8px;
  font-size: 14px;

  @media (min-width: 768px) {
    margin-right: 16px;
  }
`;

export default HeaderRight;
