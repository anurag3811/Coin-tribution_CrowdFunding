// import styled from 'styled-components';
// import HeaderLogo from './components/HeaderLogo';
// import HeaderNav from './components/HeaderNav';
// import HeaderRight from './components/HeaderRight';

// const Header = () => {
//   return (
//     <HeaderWrapper>
//       <HeaderLeft>
//         <HeaderLogo />
//       </HeaderLeft>
//       <HeaderMiddle>
//         <HeaderNav />
//       </HeaderMiddle>
//       <HeaderRight />
//     </HeaderWrapper>
//   );
// };

// const HeaderWrapper = styled.div`
//   width: 100%;
//   height: auto;
//   display: flex;
//   flex-wrap: wrap;
//   justify-content: space-between;
//   align-items: center;
//   padding: 10px;
// `;

// const HeaderLeft = styled.div`
//   display: flex;
//   align-items: center;
// `;

// const HeaderMiddle = styled.div`
//   flex-grow: 1;
//   display: flex;
//   align-items: center;
//   justify-content: center;
// `;

// export default Header;

import styled from 'styled-components';
import HeaderLogo from './components/HeaderLogo';
import HeaderNav from './components/HeaderNav';
import HeaderRight from './components/HeaderRight';
import Link from 'next/link';

const Header = () => {
  return (
    <HeaderWrapper>
      <HeaderLeft>
      <Link href="/">
          <a>
            <HeaderLogo />
          </a>
        </Link>
      </HeaderLeft>
      <HeaderMiddle>
        <HeaderNav />
      </HeaderMiddle>
      <HeaderRightwrapper>
      <HeaderRight />
      </HeaderRightwrapper>
    </HeaderWrapper>
  );
};

const HeaderWrapper = styled.div`
  width: 100%;
  height: auto;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 10px;

  @media (min-width: 976px) {
    flex-direction: row;
    justify-content: space-between;
  }
`;

const HeaderLeft = styled.div`
  display: flex;
  align-items: center;

  @media (max-width: 768px) {
    margin-bottom: 10px;
  }
  
`;

const HeaderMiddle = styled.div`
@media only screen and (max-width: 500px) {

    width:264px;
 
}

`;
const HeaderRightwrapper = styled.div`


`;

export default Header;
