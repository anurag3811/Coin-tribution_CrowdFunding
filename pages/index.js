import styled from 'styled-components';
import FilterAltIcon from '@mui/icons-material/FilterAlt';
import AccountBoxIcon from '@mui/icons-material/AccountBox';
import PaidIcon from '@mui/icons-material/Paid';
import EventIcon from '@mui/icons-material/Event';
import Image from 'next/image';
import { ethers } from 'ethers';
import CampaignFactory from '../artifacts/contracts/Campaign.sol/CampaignFactory.json'
import { useState, useEffect } from 'react';
import Link from 'next/link'
import Head from "next/head";

export default function Index() {

  const [query, setquery] = useState("");
  // const [filter, setFilter] = useState();
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

      const getAllCampaigns = contract.filters.campaignCreated(null, null, null);
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

    <>
     <Head>
        <link rel="shortcut icon" href="/favicon.png" />
        <title>Coin-tribution</title>
      </Head>
    <HomeWrapper>

<div className="flex justify-center">
        <input
          placeholder="Search by Name"
          onChange={(e) => setquery(e.target.value.toLowerCase())}
          className="p-4 rounded-full w-96 mt-4 "
          style={{ backgroundColor: "#272727" }}
        />
      </div>

      {/* Filter Section */}
      {/* <FilterWrapper>
        <FilterAltIcon style={{fontSize:40}} />
        <Category onClick={() => setFilter(AllData)}>All</Category>
        <Category onClick={() => setFilter(HealthData)}>Health</Category>
        <Category onClick={() => setFilter(EducationData)}>Education</Category>
        <Category onClick={() => setFilter(AnimalData)}>Animal</Category>
      </FilterWrapper> */}

      {/* Cards Container */}
      <CardsWrapper>

      {/* Card */}
      {campaignsData == null ? (<h1>Loading</h1>) : campaignsData.filter((campaign)=> campaign.title.toLowerCase().includes(query.toLowerCase())).map((e) => {
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
    </HomeWrapper></>
  )
}



// export async function getStaticProps() {
//   const provider = new ethers.providers.JsonRpcProvider(
//     process.env.NEXT_PUBLIC_RPC_URL
//   );

//   const contract = new ethers.Contract(
//     process.env.NEXT_PUBLIC_ADDRESS,
//     CampaignFactory.abi,
//     provider
//   );

//   const getAllCampaigns = contract.filters.campaignCreated();
//   const AllCampaigns = await contract.queryFilter(getAllCampaigns);
//   const AllData = AllCampaigns.map((e) => {
//     return {
//       title: e.args.title,
//       image: e.args.imgURI,
//       owner: e.args.owner,
//       timeStamp: parseInt(e.args.timestamp),
//       amount: ethers.utils.formatEther(e.args.requiredAmount),
//       address: e.args.campaignAddress
//     }
//   });

//   return {
//     props: {
//       AllData,
//       HealthData,
//       EducationData,
//       AnimalData
//     },
//     revalidate: 10
//   }
// }






const HomeWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
`
const FilterWrapper = styled.div`
  display: flex;
  align-items: center;
  width: 80%;
  margin-top: 15px;
`
const Category = styled.div`
  padding: 10px 15px;
  background-color: ${(props) => props.theme.bgDiv};
  margin: 0px 15px;
  border-radius: 8px;
  font-family: 'Poppins';
  font-weight: normal;
  cursor: pointer;
`
const CardsWrapper = styled.div`
  display: flex;
  justify-content: space-around;
  flex-wrap: wrap;
  width: 80%;
  margin-top: 25px;  
`
const Card = styled.div`
  width: 30%;
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