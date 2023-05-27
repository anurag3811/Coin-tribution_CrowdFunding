import styled from 'styled-components';
// import { Praise } from "@next/font/google"

const HeaderLogo = () => {
  return (
    <>
    <img src="logo.png" className=' h-24 w-24' />
    <Logo className='prase' >Coin-tribution</Logo>
    </>
  )
}

const Logo = styled.h1`
  font-weight: normal;
  font-size: 40px;
  margin-left: -210px;
  letter-spacing: 3px;
  ${'' /* font-family: "Praise" */}
  cursor: pointer;
`

export default HeaderLogo