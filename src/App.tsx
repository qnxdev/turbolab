import "./styles/App.css";
import { ArticleList, Article } from "./components/Article";
import { Layout } from "./components/Layout";
import { ArticleProps } from "./lib/types";
import { useEffect, useState } from "react";

let Sample: ArticleProps = {
  date: "2020-12-02T00:00:00Z",
  sentiment: "Positive",
  title: "How To Find The Best Deal When You Switch Gas Supplier",
  content:
    "Switching to a new gas supplier could lower your energy bill by hundreds of pounds a year, so if you haven’t switched in a while, why not make time to do so this week? Finding a new tariff to switch to should only take around 10 minutes. \n If you rent your home you can still switch gas supplier providing it’s your name on the bills, although it’s best to let your landlord know you’d like to switch before proceeding. If your bills are added to your rent or the landlord pays the supplier directly, you will need to ask your landlord whether it’s possible to switch to a better deal.  \nHere we run through the steps to take to ensure you find the best deal on your gas supply. \n1. Use a comparison service \nYour first step should be to use our comparison service which will enable you to search for the most competitive gas tariffs available. To do this, you’ll need to have the following information to hand: \n· Your postcode \n· The name of your current supplier \n· The name of your gas tariff \n· How much gas you use in kilowatt hours (kWh) per year \nYour most recent bill or online account should contain all of this information, although you can still run a quote with estimated values to get an idea of what’s available. You’ll then be presented with a list of gas tariffs and how much they could potentially save you each year. \nAlthough you can choose a separate tariff for your gas supply, if you also need an electricity tariff, ‘dual fuel’ tariffs combine both types of energy together under one contract with one supplier which can often save you money. \n2. Consider whether fixed or variable is best \nWhen comparing deals, you’ll come across both fixed and variable rate options, so you’ll need to decide which would best suit you. \nWith a variable rate tariff, the amount you pay per unit of gas can change during the term of the plan (your supplier must give you 30 days’ notice). \nWith a fixed rate tariff, the amount you pay per unit of gas remains unchanged for the term of the deal, which is typically 12 or 24 months. Note this doesn’t mean your monthly payments will be fixed as these will still vary depending on the amount of gas you use. \nFixed rate tariffs often work out cheaper than many variable rate plans and if wholesale gas prices rise, you can rest assured that you’ll be protected from any price hikes. But on the flipside, should gas prices fall, you won’t see any benefit. \nAnother drawback to a fixed rate tariff is that you could face exit fees (usually around £30 per fuel) should you decide to switch supplier before your contract ends. \nIf you choose a fixed rate tariff, it’s important to make a note of when it will end and be ready to switch again, otherwise you’ll be moved on to your suppliers’ uncompetitive standard variable tariff. \n3. Consider your payment options \nThere are a number of different ways to pay for your gas bills, but the cheapest option tends to be monthly direct debit. Energy suppliers often offer a discount for this method of payment.If you set up a direct debit, your gas payments will be taken from your bank account around the same date each month. Just be aware that the amount you pay may not always reflect the amount of gas used that particular month as this will vary throughout the year depending on seasonal fluctuations. You can learn more about the different ways to pay for your energy bills in our guide. \n4. Think about a smart meter \nSome energy tariffs will require you to have a smart meter fitted which your supplier will arrange on your behalf. All households in England, Scotland and Wales must be offered a smart meter by the middle of 2025. \nThe big advantage of a smart meter is that it will monitor and display your home’s energy usage in real time and send this data to your gas supplier over a wireless network. As a result, there’s no need for you to provide your own meter readings and you can rest assured your bills will be based on accurate readings, not estimates. \nIf you do not have a smart meter fitted, make sure you submit your own regular meter readings so that you’re not paying more (or less) than you should be. \n5. Complete your switch \nOnce you’ve found a gas tariff to switch to, you’ll be directed from our comparison service to a confirmation page where you’ll need to provide your full address and bank details. Your new supplier will then handle the entire switching process and arrange a switching date. \nIt typically takes up to 21 days to switch energy supplier, including a 14-day cooling-off period, during which you can cancel your switch free of charge. There will be no interruption to your gas supply during the switch as your new supplier will use the same pipes.You can read more about the switching process in our guide. \nPrepayment tariffs (where you pay for your gas on a pay-as-you-go basis via a pre-loaded card, key or app) are far less competitive than tariffs where you pay in arrears, so if you have a prepayment meter it may be worth asking your supplier whether you can switch to a credit meter instead. \nWhether or not you’ll be able to will depend on your credit rating and whether you are in debt with your supplier. If you are able to, a new meter will be installed in your home and you’ll then be able to move to a cheaper gas tariff. ",
  url: "https://www.forbes.com/uk/advisor/energy/how-to-find-the-best-deal-when-you-switch-gas-supplier/",
  id: "e954b1db-61b0-5747-a4c4-b6fbea064bf7",
  parent_classification: "economy, business and finance",
  child_classification: "business",
  publication: "Forbes",
};

function App() {
  const [userPref, setUserPref] = useState({});
  const [datePref, setDatePref] = useState({});
  const [selected, setSelected] = useState(0);

  useEffect(() => {
    if (localStorage) {
      if (userPref === "") {
        try {
          const user = localStorage.getItem("user-pref");
          const recent = localStorage.getItem("datePref");
        } catch (e) {
          console.log(e);
        }
      }
    }
  });

  return (
    <div className="App">
      <Layout filter={userPref} setFilter={setUserPref}>
        <div className="main-container df">
          <ArticleList selected={selected} setSelected={setSelected} articles={[Sample, Sample]} />
          <Article {...[Sample, Sample][selected]} />
        </div>
      </Layout>
    </div>
  );
}

export default App;
