import React, { useState, useEffect } from "react";
import CryptoCoder from "./contracts/CryptoCoder.json";
import getWeb3 from "./getWeb3";
import 'bootstrap/dist/css/bootstrap.min.css';

import "./App.css";

const App = () => {
  const [account, setAccount] = useState("");
  const [contract, setContract] = useState("");
  const [mintText, setMintText] = useState("");
  const [coders, setCoders] = useState([]);

  const mint = () => {
    contract.methods.mint(mintText).send({ from: account }, (error)=>{
      console.log("it worked")
      if(!error){
        setCoders([...coders, mintText])
        setMintText("");
      }
    });
  }

  const loadNFTS = async (contract) => {
    const totalSupply = await contract.methods.totalSupply().call();
    console.log(totalSupply);
    console.log("trying again");
    let results = [];
    for(let i = 0; i < totalSupply; i++){
      let coder = await contract.methods.coders(i).call();
      results.push(coder)
    }
    setCoders(results);
  }

  const loadWeb3Account = async (web3) =>{
    const accounts = await web3.eth.getAccounts();
    if(accounts){
      setAccount(accounts[0]);
    }
  }

  const loadWeb3Contract = async (web3) => {
    const networkId = await web3.eth.net.getId();
    const networkData = CryptoCoder.networks[networkId];
    if(networkData){
      const abi = CryptoCoder.abi;
      const address = networkData.address;
      const contract = new web3.eth.Contract(abi, address);
      setContract(contract);
      return contract;
    }
  }

  useEffect(async ()=>{
    const web3 = await getWeb3();
    await loadWeb3Account(web3);
    const contract = await loadWeb3Contract(web3);
    await loadNFTS(contract);
  }, [])

  return (
  <div>
    <nav className="navbar navbar-light bg-light px-4">
      <a className="navbar-brand" href="#">Crypto Coders</a>
      <span>{account}</span>
    </nav>
    <div className="container-fluid mt-5">
      <div className="row">
        <div className="col d-flex flex-column align-items-center">
          <img className="mb-4" src="https://avatars.dicebear.com/api/pixel-art/naz.svg" alt="" width="72"/>
          <h1 className="display-5 fw-bold">Crypto Coders</h1>
          <div className="col-6 text-center mb-3" >
            <p className="lead text-center">These are some of the most highly motivated coders in the world! We are here to learn coding and apply it to the betterment of humanity. We are inventors, innovators, and creators</p>
            <div>
              <input 
                type="text"
                value={mintText}
                onChange={(e)=>setMintText(e.target.value)}
                className="form-control mb-2"
                placeholder="e.g. Naz" />
              <button onClick={mint} className="btn btn-primary">Mint</button>
            </div>
          </div>
          <div className="col-8 d-flex justify-content-center flex-wrap">
            {coders.map((coder, key)=><div className="d-flex flex-column align-items-center" key={key}>
                  <img width="150" src={`https://avatars.dicebear.com/api/pixel-art/${coder.replace("#", "")}.svg`} />
                  <span>{coder}</span>
            </div>)}
          </div>
        </div>
      </div>
    </div>
  </div>);
};

export default App;
