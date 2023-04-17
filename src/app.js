App ={
    contracts: {},
    load: async() =>{
        await App.loadWeb3();
        console.log("app loading ..");
        await App.loadAccount();
        await App.loadContract();
        await App.render();
        

    },

    loadWeb3: async () => {
        if (typeof web3 !== 'undefined') {
          App.web3Provider = web3.currentProvider
          web3 = new Web3(web3.currentProvider)
        } else {
          window.alert("Please connect to Metamask.")
        }
        // Modern dapp browsers...
        if (window.ethereum) {
          window.web3 = new Web3(ethereum)
          try {
            // Request account access if needed
            await ethereum.enable()
            // Acccounts now exposed
            web3.eth.sendTransaction({/* ... */})
          } catch (error) {
            // User denied account access...
          }
        }
        // Legacy dapp browsers...
        else if (window.web3) {
          App.web3Provider = web3.currentProvider
          window.web3 = new Web3(web3.currentProvider)
          // Acccounts always exposed
          web3.eth.sendTransaction({/* ... */})
        }
        // Non-dapp browsers...
        else {
          console.log('Non-Ethereum browser detected. You should consider trying MetaMask!')
        }
      },

      async loadAccount(){
      
        console.log("we are almo..")
        web3.eth.defaultAccount=web3.eth.accounts[0]
        App.account=web3.eth.accounts[0]
        console.log(App.account)


      },

      async loadContract(){
        const certificate = await $.getJSON('Certificate.json')
        
        App.contracts.Certificate = TruffleContract(certificate)
        
        App.contracts.Certificate.setProvider(App.web3Provider)

        App.certificate =await App.contracts.Certificate.deployed()
  

      },

      render: async()=>{

        if(App.loading)
        {
          return;
        }
        App.setLoading(true);


        $('#account').html(App.account)


        App.setLoading(false);

      },

      renderCertificate : async()=>{
    

        const $certificateTemplate = $('.certificateTemplate')
      
          var i=$('#find').val()
          
          const certificate =await App.certificate.Certificates(i)
          const Id =certificate[0].toNumber()
          const name = certificate[1]
          const age = certificate[2]

          const $newcertificateTemplate = $certificateTemplate.clone()
          $newcertificateTemplate.find('.name').html(name)
          $newcertificateTemplate.find('.age').html(age)
          $newcertificateTemplate.find('input')
                          .prop('name', Id)
                          
    
       
          $('#Certificate').html($newcertificateTemplate)
          
          $newcertificateTemplate.show()

          
    

      },

      
      uploadCertificate: async()=>{
        App.setLoading=true;
        const name=$('#name').val()
        const age=$('#age').val()
          await App.certificate.createCertificate(name,age)
          const certiId = await App.certificate.certiCount()
          window.alert("Your certificate id is "+ certiId)
          window.location.reload()
        App.setLoading=false;
      },
    
      
     

      setLoading: (boolean) => {
        App.loading = boolean
        const loader = $('#loader')
        const content = $('#content')
        if (boolean) {
          loader.show()
          content.hide()
        } else {
          loader.hide()
          content.show()
        }
      }
      
}

$(()=>{
    $(window).load(()=>{


        App.load()
    })
})
