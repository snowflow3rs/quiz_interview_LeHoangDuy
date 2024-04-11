import { useEffect, useState } from "react";
import axios from "axios";
import { Select } from "antd";

import { Input } from "./components/ui/input";
import { Separator } from "@/components/ui/separator";

import { ArrowLeftRight } from "lucide-react";
import { Button } from "./components/ui/button";
const iconCurrency = [
  "BLUR.svg",
  "bNEO.svg",
  "BUSD.svg",
  "USD.svg",
  "ETH.svg",
  "GMX.svg",
  "stEVMOS.svg",
  "LUNA.svg",
  "rATOM.svg",
  "STRD.svg",
  "EVMOS.svg",
  "IBCX.svg",
  "IRIS.svg",
  "ampLUNA.svg",
  "KUJI.svg",
  "stOSMO.svg",
  "USDC.svg",
  "axlUSDC.svg",
  "ATOM.svg",
  "stATOM.svg",
  "OSMO.svg",
  "rSWTH.svg",
  "stLUNA.svg",
  "LSI.svg",
  "OKB.svg",
  "OKT.svg",
  "SWTH.svg",
  "USC.svg",
  "USDC.svg",
  "WBTC.svg",
  "wstETH.svg",
  "YieldUSD.svg",
  "ZIL.svg",
];
function App() {
  const [exchangeRates, setExchangeRates] = useState([]);
  const [fromCurrency, setFromCurrency] = useState("USD");
  const [toCurrency, setToCurrency] = useState("ETH");
  const [amount, setAmount] = useState(0);
  const [convertedAmount, setConvertedAmount] = useState(0);

  useEffect(() => {
    fetchExchangeRates();
  }, []);

  const fetchExchangeRates = async () => {
    try {
      const response = await axios.get(
        "https://interview.switcheo.com/prices.json"
      );
      const data = response.data;

      // Create a map to store prices and currency name  for each currency
      const currencyMap = {};

      // Loop through the data and populate the currency map
      data.forEach(({ currency, price }) => {
        if (!currencyMap[currency]) {
          currencyMap[currency] = { prices: [], index: -1 }; // Store prices and index for each currency
        }
        currencyMap[currency].prices.push(price);
      });

      // Calculate the average price for each currency and set the index
      const formattedData = Object.entries(currencyMap).map(
        ([currency, { prices }], index) => {
          return {
            currency,
            price: prices.reduce((acc, curr) => acc + curr, 0) / prices.length,
            index, // Store the index of each currency
          };
        }
      );

      // Set the formatted data in state
      setExchangeRates(formattedData);
    } catch (error) {
      console.error("Error fetching exchange rates:", error);
    }
  };
  const { Option } = Select;
  const handleAmountChange = (event) => {
    const value = parseFloat(event.target.value);
    setAmount(value);
  };

  const handleConvert = () => {
    const fromRate =
      exchangeRates.find((rate) => rate.currency === fromCurrency)?.price || 1;
    const toRate =
      exchangeRates.find((rate) => rate.currency === toCurrency)?.price || 1;
    const result = (amount / fromRate) * toRate;
    setConvertedAmount(result);
  };
  const handleSwapCurrencies = () => {
    // Swap the currencies
    const temp = fromCurrency;
    setFromCurrency(toCurrency);
    setToCurrency(temp);
  };
  return (
    <div className=" font-fontOpen h-screen w-screen bg-[#e7f4fd] flex items-center justify-center ">
      <div className=" rounded-[30px] w-[600px]  bg-black p-8 relative">
        <div className="flex items-center  ">
          <h1 className=" text-white mr-4 "> Swap </h1>
          <h1 className=" text-[#585858] "> Track </h1>
        </div>
        <div className=" bg-[#101010] w-full h-[150px]  rounded-xl p-6 mt-2 ">
          <h1 className="text-[#eaeef0] text-sm">you send exactly</h1>
          <div className="flex justify-between mt-2">
            <Select
              value={fromCurrency}
              onChange={setFromCurrency}
              className="w-[128px] h-12 rounded-3xl"
            >
              {exchangeRates.map((rate, index) => (
                <Option key={index} value={rate.currency}>
                  <div className="flex items-center py-3">
                    <img
                      className="w-6 h-6 mr-2 "
                      src={`/tokens/${iconCurrency[index]}`}
                      alt=""
                    />
                    <h4 className=" font-semibold">
                     
                      {rate.currency.toUpperCase()}
                    </h4>
                  </div>
                </Option>
              ))}
            </Select>
            <Input
              value={amount}
              onChange={handleAmountChange}
              className=" w-[100px]"
            />
          </div>
        </div>

        <div className=" absolute top-[195px] right-[270px]">
          <div
            onClick={handleSwapCurrencies}
            className="  bg-[#1a279d] rounded-full w-12 h-12 flex items-center justify-center hover: "
          >
            <ArrowLeftRight className=" w-5 h-5 rotate-90 text-white  " />
          </div>
        </div>

        <div className=" mt-4 bg-[#101010] h-[150px]  rounded-xl p-6">
          <h1 className="text-[#eaeef0]  text-sm">recipient gets</h1>
          <div className="flex justify-between mt-2">
            <Select
              value={toCurrency}
              onChange={setToCurrency}
              className="w-[128px] h-12 rounded-3xl"
            >
              {exchangeRates.map((rate, index) => (
                <Option key={index} value={rate.currency}>
                  <div className="flex items-center py-3">
                    <img
                      className="w-4 h-4 mr-2 "
                      src={`/tokens/${iconCurrency[index]}`}
                      alt=""
                    />
                    <h4 className=" font-semibold">
                    
                      {rate.currency.toUpperCase()}
                    </h4>
                  </div>
                </Option>
              ))}
            </Select>
            <Input value={convertedAmount.toFixed(2)} className=" w-[100px]" />
          </div>
        </div>
        <div className="mt-3">
          <div className="flex justify-between">
            <p className="text-[#585858]">Expected Output</p>
            <span className="text-[#eaeef0] bg-[#101010] rounded-xlp p-2 rounded-xl">{`${convertedAmount.toFixed(
              2
            )} $`}</span>
          </div>

          <p className="text-[#585858]">
            Should arrive in <span className="  font-semibold">40 minutes</span>
          </p>
        </div>
        <div className="mt-4  ">
          <Separator className=" bg-[#585858]" />
          <div className="flex items-center justify-center">
            <h4 className="text-[#eaeef0] py-3 ">{`1 ${fromCurrency} = ${convertedAmount} ${toCurrency}`}</h4>
          </div>
          <Separator className=" bg-[#585858]" />
        </div>

        <Button onClick={handleConvert} className=" w-full bg-[#1a279d] text-white mt-5">
        Convert
        </Button>
      </div>
    </div>
  );
}

export default App;
