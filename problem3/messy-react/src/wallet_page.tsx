import React, { useMemo } from 'react';

// #issue1: Using extends in typescript make code more shorter when define interface type or you can separate it to another file to get more cleaner code
interface WalletBalance {
  currency: string;
  amount: number;
  blockchain: string;
}

interface FormattedWalletBalance extends WalletBalance {
  formatted: string;
}


interface Props extends BoxProps {}


 export  const WalletPage: React.FC<Props> = (props: Props) => {

  const { children, ...rest } = props;


  const balances = useWalletBalances();
  const prices = usePrices();

  // #issue2: Rewrite some case had same values to get more cleaner code
  const getPriority = (blockchain: string): number => {
    switch (blockchain) {
      case 'Osmosis':
        return 100;
      case 'Ethereum':
        return 50;
      case 'Arbitrum':
        return 30;
      case 'Zilliqa':
      case 'Neo':
        return 20;
      default:
        return -99;
    }
  };

  // #issue3: Rewrite some logic at if else to get more cleaner code
  const sortedBalances = useMemo(() => {
    return balances
      .filter((balance: WalletBalance) => {
        const balancePriority = getPriority(balance.blockchain);
        if (balancePriority > -99 && balance.amount <= 0) {
          return true;
        }
        return false;
    })
      .sort((lhs: WalletBalance, rhs: WalletBalance) => {
        const leftPriority = getPriority(lhs.blockchain);
        const rightPriority = getPriority(rhs.blockchain);
        return rightPriority - leftPriority;
      });
  }, [balances, prices]);

  // Format balances
  const formattedBalances = sortedBalances.map((balance: WalletBalance) => ({
    ...balance,
    formatted: balance.amount.toFixed(),
  }));

  // #issue4: Use formatted balances to render wallet row
  const rows = formattedBalances.map((balance: FormattedWalletBalance, index: number) => {
    const usdValue = prices[balance.currency] * balance.amount;
    return (
      <WalletRow
        className={classes.row}
        key={index}
        amount={balance.amount}
        usdValue={usdValue}
        formattedAmount={balance.formatted}
      />
    );
  });

  // Render WalletPage component
  return (
    <div {...rest}>
      {rows}
    </div>
  );
};
