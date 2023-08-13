// import styled from 'styled-components';

// const HeaderLogo = () => {
//   return (
//     <LogoWrapper>
//       <img src="logo.png" alt="Logo" className="h-12 w-12 md:h-24 md:w-24" />
//       <Logo>Coin-tribution</Logo>
//     </LogoWrapper>
//   );
// };

// const LogoWrapper = styled.div`
//   display: flex;
//   align-items: center;
// `;

// const Logo = styled.h1`
//   font-weight: normal;
//   font-size: 20px;
//   margin-left: 10px;
//   letter-spacing: 1px;
//   cursor: pointer;

//   @media (min-width: 768px) {
//     font-size: 24px;
//     margin-left: 20px;
//   }
// `;

// export default HeaderLogo;

import styled from 'styled-components';

const HeaderLogo = () => {
  return (
    <LogoWrapper>
      <img src="logo.png" alt="Logo" className="h-24 w-24 md:h-24 md:w-24" />
      <Logo className='prase' >Coin-tribution</Logo>
    </LogoWrapper>
  );
};

const LogoWrapper = styled.div`
  display: flex;
  align-items: center;

  @media (max-width: 768px) {
    margin-bottom: 10px;
  }
`;

const Logo = styled.h1`
  font-weight: normal;
  font-size: 24px;
  margin-left: 10px;
  letter-spacing: 1px;
  cursor: pointer;

  @media (min-width: 768px) {
    font-size: 24px;
    margin-left: 20px;
  }
`;

export default HeaderLogo;

