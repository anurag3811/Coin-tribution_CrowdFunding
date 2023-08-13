import styled, { keyframes } from 'styled-components';
import FilterAltIcon from '@mui/icons-material/FilterAlt';
import AccountBoxIcon from '@mui/icons-material/AccountBox';
import PaidIcon from '@mui/icons-material/Paid';
import EventIcon from '@mui/icons-material/Event';
import Image from 'next/image';
import { ethers } from 'ethers';
import CampaignFactory from '../artifacts/contracts/Campaign.sol/CampaignFactory.json'
import { useEffect, useState } from 'react';
import Link from 'next/link';

export default function Dashboard() {
  const [campaignsData, setCampaignsData] = useState(null);

  useEffect(() => {
    const Request = async () => {
      await window.ethereum.request({ method: 'eth_requestAccounts' });
      const Web3provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = Web3provider.getSigner();
      const Address = await signer.getAddress();

      const provider = new ethers.providers.JsonRpcProvider(
        process.env.NEXT_PUBLIC_RPC_URL
      );
  
      const contract = new ethers.Contract(
        process.env.NEXT_PUBLIC_ADDRESS,
        CampaignFactory.abi,
        provider
      );
  
      const getAllCampaigns = contract.filters.campaignCreated(null, null, Address);
      const AllCampaigns = await contract.queryFilter(getAllCampaigns);
      const AllData = AllCampaigns.map((e) => {
      return {
        title: e.args.title,
        image: e.args.imgURI,
        owner: e.args.owner,
        timeStamp: parseInt(e.args.timestamp),
        amount: ethers.utils.formatEther(e.args.requiredAmount),
        address: e.args.campaignAddress
      }
      })  
      setCampaignsData(AllData)
    }
    Request();
  }, [])

  return (
    <HomeWrapper>

      {/* Cards Container */}
      <CardsWrapper>

      {campaignsData == null ? (<><div></div><LoaderWrapper><Loader /></LoaderWrapper><div></div></>) : campaignsData.map((e) => {
        return (
          <Card key={e.title}>
          <CardImg>
          <Image 
              alt="Crowdfunding dapp"
              objectFit='cover'
              layout='fill'
              className=' rounded-t-xl'
              src={"https://crowdfunding.infura-ipfs.io/ipfs/" + e.image} 
            />
          </CardImg>
          <Title>
            {e.title}
          </Title>
          <CardData>
            <Text>Owner<AccountBoxIcon /></Text> 
            <Text>{e.owner.slice(0,6)}...{e.owner.slice(39)}</Text>
          </CardData>
          <CardData>
            <Text>Amount<PaidIcon /></Text> 
            <Text>{e.amount} Matic</Text>
          </CardData>
          <CardData>
            <Text><EventIcon /></Text>
            <Text>{new Date(e.timeStamp * 1000).toLocaleString()}</Text>
          </CardData>
          <Link passHref href={'/' + e.address}><Button>
            Go to Campaign
          </Button></Link>
        </Card>
        )
      })}

        {/* Card */}

      </CardsWrapper>
    </HomeWrapper>
  )
}



const HomeWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
`
// const CardsWrapper = styled.div`
//   display: flex;
//   justify-content: space-around;
//   flex-wrap: wrap;
//   width: 80%;
//   margin-top: 25px;
// `

const CardsWrapper = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-gap: 20px;
  width: 80%;
  margin-top: 25px;
  justify-items: space-between;

  @media (max-width: 976px) {
    grid-template-columns: repeat(2, 1fr);
    justify-items: space-between;
    width: 90%;
  }

  @media (max-width: 600px) {
    grid-template-columns: 1fr;
    justify-items: space-between;
    width: 90%;
  }
`;


const Card = styled.div`
  width: 90%;
  margin-top: 20px;
  ${'' /* background-color: ${(props) => props.theme.bgDiv}; */}
  border-radius: 8px;

  &:hover{
    transform: translateY(-10px);
    transition: transform 0.5s;
  }
  
  &:not(:hover){
    transition: transform 0.5s;
  }
`
const CardImg = styled.div`
  position: relative;
  height: 120px;
  width: 100%;
  border-radius: 12px 12px 0 0;
  ${'' /* opacity: 0; */}
  ${'' /* object-fit: cover; */}
  backgroundColor: #000000;
  `
const Title = styled.h2`
  font-family: 'Roboto';
  font-size: 18px;
  margin: 2px 0px;
  background-color: ${(props) => props.theme.bgSubDiv};
  padding: 5px;
  cursor: pointer;
  font-weight: normal;
`
const CardData = styled.div`
  display: flex;
  justify-content: space-between;
  margin: 2px 0px;
  background-color: ${(props) => props.theme.bgSubDiv};
  padding: 5px;
  cursor: pointer;
  `
const Text = styled.p`
  display: flex;
  align-items: center;
  margin: 0;
  padding: 0;
  font-family: 'Roboto';
  font-size: 18px;
  font-weight: bold;
`
const Button = styled.button`
  padding: 8px;
  text-align: center;
  width: 100%;
  background-color:#00b712 ;
  background-image:
      linear-gradient(180deg, #00b712 0%, #5aff15 80%); 
  border: none;
  cursor: pointer;
  font-family: 'Roboto';
  text-transform: uppercase;
  color: #fff;
  font-size: 14px;
  font-weight: bold;
`

const rotate = keyframes`
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
`;

// Styled components for the loader
const LoaderWrapper = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 45px; /* Adjust the margin as needed */
`;

const Loader = styled.div`
  border: 4px solid transparent; /* Transparent border for outer circle */
  border-top: 4px solid rgba(255, 255, 255, 0.5); /* Semi-transparent white border for spinning effect */
  border-radius: 50%;
  width: 40px;
  height: 40px;
  animation: ${rotate} 1.2s linear infinite; /* Apply the rotation animation */
`;