import {useConnection, useWallet} from "@solana/wallet-adapter-react";
import React, {FC, useState, useEffect } from 'react';
import { useStakeEarningsContext } from "../../providers/StakeEarningsProvider";
import { calculateEarnings } from "../../scripts/calculateEarnings";
import { StakeEarningsState } from "../../types/StakeEarnings";
import { ClientMeta } from "../../types/StakingClient";

interface EstimatedEarningsProps {
  stakeEarnings: StakeEarningsState;
  style: React.CSSProperties;
}

export const EstimatedEarnings: FC<EstimatedEarningsProps> = (props) => {
  
  const {stakeEarnings} = useStakeEarningsContext()

  return( 
    <div>
      {stakeEarnings ? (
        <p>
          { stakeEarnings.isLoading ? "Calculating" : "Estimated earnings to claim: "}
          <strong>
            { stakeEarnings.isLoading ? null : `${stakeEarnings.earnings} ${props.stakeEarnings.stakerData?.tokenSymbol}`}
          </strong>
        </p>
  
      ) : <p> Failed To Load Staking Earnings</p>
      }
    </div>
  )
  
}
