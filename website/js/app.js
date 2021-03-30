App = {

    init: async () => {
        // Initialise web3 client with wallet
        try{
            await window.ethereum.enable();
        } catch(e) { }
        App.web3Provider = Web3.givenProvider || 'ws://localhost:7545';
        web3 = new Web3(App.web3Provider);

        // Initialise truffle contracts
        const DappTokenArtefact = await (await fetch('DappToken.json')).json();
        const DappToken = TruffleContract(DappTokenArtefact);
        await DappToken.setProvider(App.web3Provider);
        App.dappToken = await DappToken.deployed();

        const DappTokenSaleArtefact = await (await fetch('DappTokenSale.json')).json();
        const DappTokenSale = TruffleContract(DappTokenSaleArtefact);
        await DappTokenSale.setProvider(App.web3Provider);
        App.dappTokenSale = await DappTokenSale.deployed();

        // Events
        App.listenForEvents();

        // Update
        await App.update();
        setInterval(App.update, 10000);
    },

    update: async () => {
        console.log('---------- UPDATING -----------')

        // Get contract information
        const tokenPrice = await App.dappTokenSale.tokenPrice();
        const numTokensSold = await App.dappTokenSale.tokensSold();
        const numTokensAvailable = await App.dappToken.balanceOf(App.dappTokenSale.address);
        const decimals = await App.dappToken.decimals();
        App.tokenDecimals = decimals; // (decimals come first so conversion functions work)
        App.tokenPrice = tokenPrice;
        App.numTokensSold = numTokensSold;
        App.numTokensAvailable = numTokensAvailable;
        App.numTokensTotal = numTokensAvailable.add(numTokensSold);

        console.log({
            'Token Sale Address:': App.dappTokenSale.address,
            'Token Sale Price:': web3.utils.fromWei(tokenPrice, 'ether') + ' ETH',
            'Token Sale Num Tokens Sold:': App.toDapp(numTokensSold),
            'Token Sale Num Tokens Held:': App.toDapp(numTokensAvailable),
            'Token Decimals:': decimals.toString()
        });

        // Initialise web3 wallet accounts
        const accounts = await web3.eth.getAccounts();
        const etherBalance = await web3.eth.getBalance(accounts[0]);
        const dappBalance = await App.dappToken.balanceOf(accounts[0]);
        App.myAccount = accounts[0];
        App.myDappBalance = dappBalance;
        App.myEtherBalance = etherBalance;

        console.log({
            'Accounts:': accounts,
            'Account has ETH:': web3.utils.fromWei(etherBalance, 'ether'),
            'Account has DAPP:': App.toDapp(dappBalance),
        });

        // Update page render
        App.render();
    },

    render: () => {
        console.log('Rendering...')
        document.querySelector('#accountAddress').innerText = App.myAccount;
        document.querySelector('#dappTokenAddress').innerText = App.dappToken.address;
        document.querySelector('#dappTokenSaleAddress').innerText = App.dappTokenSale.address;

        document.querySelectorAll('.token-price-raw'    ).forEach(e => {
            e.innerText = App.tokenPrice.toNumber().toExponential();
            // wei/mDAPP
        });
        document.querySelectorAll('.token-price'        ).forEach(e => {
            e.innerText = web3.utils.fromWei(App.toMiniDapp(App.tokenPrice.toString()), 'ether');
            // ETH/DAPP
        });
        document.querySelectorAll('.dapp-balance'       ).forEach(e => e.innerText = App.toDapp(App.myDappBalance      ));
        document.querySelectorAll('.tokens-available'   ).forEach(e => e.innerText = App.toDapp(App.numTokensAvailable ));
        document.querySelectorAll('.tokens-sold'        ).forEach(e => e.innerText = App.toDapp(App.numTokensSold      ));
        document.querySelectorAll('.tokens-total'       ).forEach(e => e.innerText = App.toDapp(App.numTokensTotal     ));

        const progressBar = document.querySelector('#progressBar')
        progressBar.setAttribute('aria-valuenow', App.numTokensSold);
        progressBar.setAttribute('aria-valuemax', App.numTokensTotal);
        const percentage = Math.floor((App.numTokensSold.toNumber() / App.numTokensTotal.toNumber())*100) + "%";
        progressBar.style.width = percentage;
        progressBar.innerText = percentage;

        document.querySelector('#loader').style.display = 'none';
        document.querySelector('#content').style.display = 'block';
    },

    onFormUpdate: () => {
        const numTokensToBuy = document.querySelector('#numberOfTokens').value;
        const purchaseNotice = document.querySelector('#purchaseNotice');
        if(numTokensToBuy) {
            // Calculate charge based on wei/mDapp token price
            const dappAmount = new web3.utils.BN(numTokensToBuy);
            const mDappAmount = App.toMiniDapp(dappAmount);
            const price = App.tokenPrice; // wei/mDAPP
            const weiCharge = mDappAmount.mul(price);
            const ethCharge = web3.utils.fromWei(weiCharge, 'ether');

            purchaseNotice.innerText = `Buy ${dappAmount} DAPP for ${ethCharge} ETH`
        } else {
            purchaseNotice.innerText = `Invalid token amount`
        }
    },

    toDapp: amtBn => {
        const factor = new web3.utils.BN(10).pow(new web3.utils.BN(App.tokenDecimals));
        const d = amtBn.div(factor);
        const m = amtBn.mod(factor);
        return `${d}.${m}` // Returns String (decimal)
    },

    toMiniDapp: amtStr => {
        const factor = new web3.utils.BN(10).pow(new web3.utils.BN(App.tokenDecimals));
        return new web3.utils.BN(amtStr).mul(factor); // Returns BigNumber (integer)
    },

    buyTokens: async () => {
        const dappAmount = new web3.utils.BN(document.querySelector('#numberOfTokens').value);
        const mDappAmount = App.toMiniDapp(dappAmount);
        const weiCharge = mDappAmount.mul(App.tokenPrice);

        await App.dappTokenSale.buyTokens({
            from: App.myAccount,
            value: weiCharge,
            gas: 500000
        });
        console.log(`Bought ${mDappAmount} mDAPP for ${weiCharge} wei`);
        document.getElementById('form').reset();
    },

    listenForEvents: async () => {
        // Using crappy old version of Truffle - cannot figure out
        /*
        const sellEvent = await App.dappTokenSale.Sell({}, {
            fromBlock: 0,
            toBlock: 'latest',
        });
        console.log(sellEvent.watch);

        sellEvent.watch((error, event) => {
            console.log(event)
        });
        console.log('!!!', sellEvent)
        sellEvent.on('data', );
        */
    }
}

window.onload = App.init;