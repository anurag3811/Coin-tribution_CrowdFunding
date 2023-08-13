import styled, { keyframes } from 'styled-components';
import Image from "next/image";
import {ethers} from 'ethers';
import CampaignFactory from '../artifacts/contracts/Campaign.sol/CampaignFactory.json'
import Campaign from '../artifacts/contracts/Campaign.sol/Campaign.json'
import { useEffect, useState } from "react";
import { useRouter } from "next/router";


export default function Detail() {
  const [mydonations, setMydonations] = useState([]);
  const [story, setStory] = useState('');
  const [amount, setAmount] = useState();
  const [change, setChange] = useState(false);
  const [title, setTitle] = useState('Loading...');
  const [requiredAmount, setrequiredAmount] = useState(0);
  const [receivedAmount, setreceivedAmount] = useState(0);
  const [imgURI, setImgURI] = useState(null);
  const [outsideaddress, setOutsideAddress] = useState("");
  const [toggle, setToggle] = useState(false);
  // const [addressofhere, setAddressofhere] = useState('');
  // const [addressofhere, setAddressofhere] = useState('');

  // const {id} = router.query

  
  // console.log(addressofhere + "heresssss")

  var details;
  var addressofhere;


  const router = useRouter();
useEffect(()=>{
    if(!router.isReady){
      return;
    }
    else{
      console.log(router.isReady)
      console.log(router.asPath)
      const addressofherestr = router.asPath.toString()
      const final = addressofherestr.slice(1,addressofherestr.length)
      addressofhere = final;
      setOutsideAddress(addressofhere);

    // codes using router.query

    const Request = async () => {
      // let storyData;
      await window.ethereum.request({ method: 'eth_requestAccounts' });
      const Web3provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = Web3provider.getSigner();
      const Address = await signer.getAddress();

      const provider = new ethers.providers.JsonRpcProvider(
        process.env.NEXT_PUBLIC_RPC_URL
      );

      const contract = new ethers.Contract(
        addressofhere,
        Campaign.abi,
        provider
      );
       details = await contract.getdetails();
       console.log(details)
       setStory(details?.story);
       setTitle(details?.title);
       setrequiredAmount(details?.requiredAmount.toString());
       setreceivedAmount(details?.receivedAmount.toString());
      //  console.log(details.imgURI)
       setImgURI(details?.image);
    }
      Request();
    
    }

}, [router.isReady, toggle]);
  



  const DonateFunds = async () => {
    try {
      setAmount('');
        await window.ethereum.request({ method: 'eth_requestAccounts' });
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner();
      const contract = new ethers.Contract(outsideaddress, Campaign.abi, signer);
      const transaction = await contract.donate({value: ethers.utils.parseEther(amount)});
      await transaction.wait();
      setChange(true);
     
      setToggle(!toggle);

  } catch (error) {
      console.log(error);
  }

  }

  return (
    <DetailWrapper>
      <LeftContainer>
        {imgURI == null ? (<><div></div><LoaderWrapper><Loader /></LoaderWrapper><div></div></>):<ImageSection>
          <Image
            alt="crowdfunding dapp"
            layout="fill"
            src={
              "https://crowdfunding.infura-ipfs.io/ipfs/" + (imgURI ? imgURI : "")
            }
          />
        </ImageSection>
      }

        <Text>
          {story && story}
        </Text>
      </LeftContainer>
      <RightContainer>
        <Title>{title}</Title>
        <DonateSection>
          <Input value={amount} onChange={(e) => setAmount(e.target.value)} type="number" placeholder="Enter Amount To Donate" />
          <Donate onClick={DonateFunds}>Donate</Donate>
        </DonateSection>
        <FundsData>
          <Funds>
            <FundText>Required Amount</FundText>
            <FundText>{ethers.utils.formatEther(requiredAmount) } Matic</FundText>
          </Funds>
          <Funds>
            <FundText>Received Amount</FundText>
            <FundText>{ethers.utils.formatEther(receivedAmount) } Matic</FundText>
          </Funds>
        </FundsData>
        {/* <Donated>
          <LiveDonation>
            <DonationTitle>Recent Donation</DonationTitle>
            {DonationsData.map((e) => {
              return (
                <Donation key={e.timestamp}>
                <DonationData>{e.donar.slice(0,6)}...{e.donar.slice(39)}</DonationData>
                <DonationData>{e.amount} Matic</DonationData>
                <DonationData>{new Date(e.timestamp * 1000).toLocaleString()}</DonationData>
              </Donation>
              )
            })
            }
          </LiveDonation>
          <MyDonation>
            <DonationTitle>My Past Donation</DonationTitle>
            {mydonations.map((e) => {
              return (
                <Donation key={e.timestamp}>
                <DonationData>{e.donar.slice(0,6)}...{e.donar.slice(39)}</DonationData>
                <DonationData>{e.amount} Matic</DonationData>
                <DonationData>{new Date(e.timestamp * 1000).toLocaleString()}</DonationData>
              </Donation>
              )
            })
            }
          </MyDonation>
        </Donated> */}
      </RightContainer>
    </DetailWrapper>
  );
}

// export async function getStaticPaths() {
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

//   return {
//     paths: AllCampaigns.map((e) => ({
//         params: {
//           address: e.args.campaignAddress.toString(),
//         }
//     })),
//     fallback: "blocking"
//   }
// }

// export async function getStaticProps(context) {

//   const Data = {
//       address: context.params.address,
//   }
//   return {
//     props: {
//       Data,
//     },
//   }}





const DetailWrapper = styled.div`
display: flex;
flex-direction: row;
justify-content: space-between;
margin-top: 45px;
padding: 20px;
width: 98%;

@media (max-width: 738px) {
  flex-direction: column;
  justify-content: center;
}

`;



const LeftContainer = styled.div`
  width: 90%;
  margin-right:36px;
`;
const RightContainer = styled.div`
  width: 95%;
`;
const ImageSection = styled.div`
  width: 100%;
  position: relative;
  height: 350px;
  border-radius:20px;
`;
const Text = styled.p`
  font-family: "Roboto";
  font-size: large;
  color: ${(props) => props.theme.color};
  text-align: justify;
`;
const Title = styled.h1`
  padding: 0;
  margin: 0;
  font-family: "Poppins";
  font-size: x-large;
  color: ${(props) => props.theme.color};
`;
const DonateSection = styled.div`
  display: flex;
  width: 100%;
  justify-content: space-between;
  align-items: center;
  margin-top: 10px;
`;
const Input = styled.input`
  padding: 8px 15px;
  background-color: ${(props) => props.theme.bgDiv};
  color: ${(props) => props.theme.color};
  border: none;
  border-radius: 8px;
  outline: none;
  font-size: large;
  width: 40%;
  height: 40px;
`;
const Donate = styled.button`
  display: flex;
  justify-content: center;
  width: 40%;
  padding: 15px;
  color: white;
  background-color: #00b712;
  background-image: linear-gradient(180deg, #00b712 0%, #5aff15 80%);
  border: none;
  cursor: pointer;
  font-weight: bold;
  border-radius: 8px;
  font-size: large;
`;
const FundsData = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  margin-top: 10px;
`;
const Funds = styled.div`
  width: 45%;
  background-color: ${(props) => props.theme.bgDiv};
  padding: 8px;
  border-radius: 8px;
  text-align: center;
`;
const FundText = styled.p`
  margin: 2px;
  padding: 0;
  font-family: "Poppins";
  font-size: normal;
`;
const Donated = styled.div`
  height: 280px;
  margin-top: 15px;
  background-color: ${(props) => props.theme.bgDiv};
`;
const LiveDonation = styled.div`
  height: 65%;
  overflow-y: auto;
`;
const MyDonation = styled.div`
  height: 35%;
  overflow-y: auto;
`;
const DonationTitle = styled.div`
  font-family: "Roboto";
  font-size: x-small;
  text-transform: uppercase;
  padding: 4px;
  text-align: center;
  background-color: #4cd137;
`;
const Donation = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 4px;
  background-color: ${(props) => props.theme.bgSubDiv};
  padding: 4px 8px;
`;
const DonationData = styled.p`
  color: ${(props) => props.theme.color};
  font-family: "Roboto";
  font-size: large;
  margin: 0;
  padding: 0;
`;

const rotate = keyframes`
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
`;

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