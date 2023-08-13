// HeaderNav.js
import styled from 'styled-components';
import { useRouter } from 'next/router';
import Link from 'next/link';

const HeaderNav = () => {
  const Router = useRouter();

  return (
    <HeaderNavWrapper>
      <Link passHref href={'/'}>
        <HeaderNavLinks active={Router.pathname === '/'}>
          Campaigns
        </HeaderNavLinks>
      </Link>
      <Link passHref href={'/createcampaign'}>
        <HeaderNavLinks active={Router.pathname === '/createcampaign'}>
          Create Campaign
        </HeaderNavLinks>
      </Link>
      <Link passHref href={'/dashboard'}>
        <HeaderNavLinks active={Router.pathname === '/dashboard'}>
          Dashboard
        </HeaderNavLinks>
      </Link>
    </HeaderNavWrapper>
  );
};

const HeaderNavWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 10px;
  background-color: black;
  border-radius: 20px;
  margin-bottom:10px;


  @media (min-width: 500px) {
    flex-direction: row;
    margin-top: 0px;

    
  }

  @media (min-width: 976px) {

    margin-bottom:0px;
  }
`;

const HeaderNavLinks = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: ${(props) =>
    props.active ? props.theme.bgSubDiv : props.theme.bgDiv};
  height: 100%;
  font-family: 'Roboto', sans-serif;
  margin: 5px;
  border-radius: 5px;
  padding: 13px 5px 13px 5px;
  cursor: pointer;
  text-transform: uppercase;
  font-weight: bold;
  font-size: 16px;
  text-align:center;

  @media (min-width: 500px) {
    margin: 5px 8px;
    padding: 10px 15px;
    font-size: 14px;
  }
  @media only screen and (max-width: 500px) {

    width:90%;
 
}
`;

export default HeaderNav;
